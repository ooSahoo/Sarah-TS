---
toc:
  enabled: true
  maxDepth: 2
---

# Delegate access to users

To support your business needs, Mosaic allows configuring access delegation within your apps which includes users granting permissions and operating on behalf of other users. For example, consider a family booking a vacation. While each family member has their own account with the airline app, they all grant access to their accounts to the head of the family in order to make a group reservation. Such authorizations always require obtaining consent from the "subject" users to ensure they have control over personal data. The access cannot be delegated unless the user consents to it.

User consent is a fundamental aspect of privacy and data protection laws in many jurisdictions. It ensures that individuals have control over their personal information, especially when sensitive data is involved. By obtaining user consent, organizations demonstrate transparency and build trust with their users, reducing the risk of legal repercussions and reputational damage.

:::info Note
This guide explains how to approach this task in the API way. Alternatively, you can delegate access to users with the help of identity ochestration (see [About journeys](/guides/orchestration/concepts/journeys_overview.md)).

:::


## How it works

Below is an example of the authorization flow that grants access to an "actor" user after obtaining consent from the "subject" user. Mosaic APIs are shown in pink along with the relevant integration steps, described below.

![](../../images/UserID/delegated_access.png)

1. The logged-in user ("actor") requests to act on behalf of another user ("subject"). ([Step 2](#step-2-request-access))
2. Mosaic sends an email to the "subject" user to consent to access delegation. ([Step 3.1](#1-collect-consent))
3. The logged-in "subject" user proceeds to the consent page and approves access delegation. ([Step 3.2](#2-grant-access))
4. The app obtains a token from Mosaic for an actor with the scope of permissions delegated to them. ([Step 4](#step-4-impersonate))


## Before you start

Before you can start implementing this flow, make sure all prerequisites are in place.

1. The app and its client are created in Mosaic. Client settings contain Client ID and Client Secret, which you'll need later. If you don't already have an application, you'll need to create one first (see [Create application](create_new_application.md)).

2. Your application implements a permission model, which defines the actions users can perform. For example, a permission model might specify that family members can view profile data, flight history, and payment data, allowing a designated user to book flights on their behalf.

3. The users are logged-in to the app and have their emails registered.

## Step 1: Configure client

1. From the Admin Portal under Applications, click on your application to edit client settings.
2. Add the Consent URI to the list of **Redirect URIs**. This URI will be used to obtain the user's consent as described in [Step 3.1](#1-collect-consent).

## Step 2: Request access

The flow is initiated when a logged-in user requests to act on behalf of another user by sending the delegation request to Mosaic like the one below. For example, this can be done from the "Request access" page where the "actor" user specifies the "subject" user (the one to grant access to the actor) and selects permissions and duration of the consent.

```js
import fetch from 'node-fetch';

async function run() {
  const resp = await fetch(
    `https://api.transmitsecurity.io/cis/v1/delegated-access/consents/me/request`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer <USER_ACCESS_TOKEN>' // Logged-in user requesting access to another account
      },
      body: JSON.stringify({
        permissions: ['PERMISSIONS'], // The list of requested permissions
        consent_uri: 'CONSENT_URI', // The consent page
        subject_id: 'SUBJECT_ID', // ID of the user to obtain consent from
        consent_expiration: 600 // Validity in seconds
      })
    }
  );

  const data = await resp.json();
  console.log(data);
}

run();
```

## Step 3: Delegate access

After the "actor" user initiates the flow, the other user has to approve or decline the delegation request. This includes the following implementation steps:

1. [Collect consent](#1-collect-consent)
2. [Grant access](#2-grant-access)

### 1. Collect consent

Mosaic sends an email to an email address associated with the "subject" user. The email contains a link to the consent URI specified in [Step 2](#step-2-request-access). Upon following the link, the user proceeds to the webpage that collects consent.

Create a frontend page (Consent URI) that the browser will redirect to in order to obtain user consent. When invoked, it accepts a `consent_params` query parameter (string), which contains a token. Decoding this token provides consent-related details, including:
- `actorUserId` (string): The user requesting access.
- `subjectUserId` (string): The user being asked to grant access.
- `permissions` (array of strings): The requested permissions.
- `consentId` (string): The unique identifier for the consent request.

The page must clearly present the requested permissions and allow the user to approve or decline the request. If the user approves, proceed to granting permissions.

Below is example Consent URI Mosaic redirects to in order to obtain user consent:

```shell
https://acme.com/consent?consent_params=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXAiOiJDb25zZW50TWFnaWNMaW5rIiwiYWN0b3JVc2VySWQiOiI3Nms1OXhnMm0xdjJycGRwNmFwZWQiLCJzdWJqZWN0VXNlcklkIjoiaTd5YWFyYXJ1cTF6ZzJvenFkY29sIiwicGVybWlzc2lvbnMiOlsiYWRkIl0sImNvbnNlbnRJZCI6InRxT1dyYWhpRjM5b1R0RFdMZkp4bSIsImlhdCI6MTczMTQxNjY3NiwiZXhwIjoxNzMxNTAzMDc2fQ.KiDkhQa7B37Vf4zNF1kFSyUQVXpZCNNc3vh8DNPwnNQ
```


### 2. Grant access

Having collected user's approval, notify Mosaic by sending a request like the one below. To grant access, the user has to be logged-in since the call is authorized with the user access token.

```js
import fetch from 'node-fetch';

async function run() {
  const resp = await fetch(
    `https://api.transmitsecurity.io/cis/v1/delegated-access/consents/me/grant`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer <USER_ACCESS_TOKEN>' // Logged-in user who approves delegation request
      },
      body: JSON.stringify({consent_id: 'string'}) // ID of the consent
    }
  );

  if (resp.status === 204) {
    console.log('success');
  } else {
    const data = await resp.json();
    console.log(data);
  }
}

run();
```


## Step 4: Impersonate

To act on behalf of another user, the actor has to obtain a special delegation token as described below. If the consent is valid, Mosaic will return an access token that enables the requesting user to act on behalf of the other user.

:::info Note
The permissions listed in the permissions field must align with the permission model implemented in your application. Mosaic does not enforce specific permissions but validates them based on the application's configuration. Ensure that your application backend is designed to recognize and enforce the permissions included in the delegation token.
:::

```js
import fetch from 'node-fetch';

async function run() {
  const formData = {
    client_id: '[CLIENT_ID]', // Found in client settings
    client_secret: '[CLIENT_SECRET]', // Found in client settings
    actor_token: '[USER_ACCESS_TOKEN]', // Actor's token obtained previously upon successful authentication
    actor_token_type: 'urn:ietf:params:oauth:token-type:access_token',
    subject_identifier: '[USER_ID]', // ID of the "subject" user
    subject_identifier_type: 'user_id',
    scope: '[PERMISSIONS]', // The list of delegated permissions
    grant_type: 'urn:transmit:grant-type:delegated-access'
  };

  const resp = await fetch(
    `https://api.transmitsecurity.io/cis/oidc/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(formData).toString()
    }
  );

  const data = await resp.text();
  console.log(data);
}

run();
```

## Step 5. Validate token

The tokens must be validated as described [here](/guides/user/validate_tokens/). Make sure that the subject (`sub`) corresponds to ID of the user who granted permissions, the actor (`act`) corresponds to the user ID of the user who requested access, and `permissions` align with the scope the subject has consented to.

## Next steps

Manage user consents in the Admin Portal. By default, the consent expires after 30 days and needs to be requested again. You can review consents and revoke them earlier if necessary using [Delegated Access APIs](/openapi/user/delegated-access/).

<!-- TBD: Create dependent user -- >
