---
title: "Create an Authentication Hub"
toc:
  maxDepth: 2
---

# Create an Authentication Hub for backend authentication

The Mosaic Authentication Hub allows you to create a centralized authentication experience across all your business lines. Use it to unify and centralize user identities, with an option to provide seamless single sign-on (SSO) across multiple apps.

:::info IMPORTANT
Note that, although the Authentication Hub handles authentication requests related to backend authentication methods, your end-user app will initiate authentication requests to Mosaic using OIDC.
:::

## How it works

Whenever a user requests to log in to your app, they're redirected to the Authentication Hub - a dedicated web application that you create for authenticating users via Mosaic. It can be used by multiple apps in your tenant. This allows you to provide a uniform authentication experience across all your apps, and simplifies your implementation.

The Authentication Hub also allows you to silently authenticate the user (without user interaction) if the user is already logged into any app in your tenant. These sessions are managed by Mosaic in the backend. This removes friction from the login process without compromising on security.

## Step 1: Set up your user apps

Set up your apps to perform a centralized login flow using the Authentication Hub. Instead of performing the end-user authentication, these apps will delegate it to the Authentication Hub:

![](../../images/UserID/auth_hub_1.png)

To set up centralized login for an app:
1. [Create your redirect endpoint](#1-create-your-redirect-endpoint)
1. [Configure your user app](#2-configure-your-user-app)
1. [Request centralized login](#3-request-centralized-login)
1. [Get user tokens](#4-get-user-tokens)

### 1. Create your redirect endpoint

Create the redirect endpoint that will receive an authorization code when the Authentication Hub completes the user authentication process. This code will be exchanged for user tokens, as described in  [Step 1.4](#4-get-user-tokens). The redirect URI should accept `code` as a query parameter. For example, if `https://domain.com/verify` is your redirect URI, Mosaic will redirect to `https://domain.com/verify?code=123abc` when the centralized login flow is complete.

:::info Note

If an authentication error occurs, the redirect URI will contain the error instead.

:::

### 2. Configure your user app

From the [Applications](https://portal.transmitsecurity.io/applications) page of the Admin Portal, select your application to edit its settings. If you don't already have an application, [create an application](create_new_application.md). Under **Redirect URIs**, add the URI created in [Step 1.1](#1-create-your-redirect-endpoint) as an allowed redirect URI for your Mosaic application. Enable **Public sign-up** to allow passing the `createNewUser` field in the centralized login request (see code snippet in next step). This will enable the creation of new users in the user app upon their first login using centralized login flows.

### 3. Request centralized login

When a user requests to log in, send a centralized login request like the one below. This is an [OIDC authorization](/openapi/user/oidc/#operation/oidcAuthenticate) call that requests `urn:transmit:centralized` in the `acr_values`. Pass your client ID and your redirect URI. Once the centralized login is completed, an authorization code is returned to the requested redirect URI in the `code` parameter. This code will be exchanged for a token in the next step.

```js
// Note: line breaks and notes were added for readability
'https://api.transmitsecurity.io/cis/oidc/auth?'
client_id=CLIENT_ID&  // Client ID from the Mosaic app setting
scope=openid&
response_type=code&
redirect_uri=REDIRECT_URI&  // Redirect URI created in Step 1.1
acr_values=urn:transmit:centralized&
createNewUser=true // Sign-up a new user to the app
```

### 4. Get user tokens

To obtain an ID and access token, your server can send a request like the one below to the [OIDC token](/openapi/user/oidc/#operation/oidcToken) endpoint. Replace placeholders with the code you received in [Step 1.3](#3-request-centralized-login), your redirect URI, and your client credentials that can be found in your application settings from the Mosaic Admin Portal.

:::attention Note

Returned tokens must be validated as described [here](/guides/user/validate_tokens/).

:::

```js

import fetch from 'node-fetch';

async function run() {
  const formData = {
    client_id: '[CLIENT_ID]',   // Client ID from the Mosaic app settings
    client_secret: '[CLIENT_SECRET]',   // Client secret from the Mosaic app settings
    code: '[CODE]',   // Authorization code returned to the redirect URI
    grant_type: 'authorization_code',
    redirect_uri: 'REDIRECT_URI'   // URI that receives the authorization code
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

```

## Step 2: Set up your centralized auth app

Centralized authentication is performed using a dedicated web application - your Authentication Hub:

![](../../images/UserID/auth_hub_2.png)

To set up an Authentication Hub:
1. [Create your login page](#1-create-your-login-page)
2. [Create your login endpoint](#2-create-your-login-endpoint)
2. [Configure your Authentication Hub](#3-configure-your-authentication-hub)

### 1. Create your login page
<div class="badge-wrapper">
    <div class="badge">Client</div>
</div>

When your end-user app requests centralized login, Mosaic redirects to your login page, that prompts the execution of the authentication process (as described in [step 2/A](#a-execute-the-backend-auth-flow)). Create a login URI that accepts calls including the `src_interaction` query parameter, that marks the state of the login flow.

### 2. Create your login endpoint
<div class="badge-wrapper">
    <div class="badge">Backend</div>
</div>

When your end-user app requests centralized login, Mosaic redirects to your login page, that prompts the execution of the authentication process (as described in step 2.1). Create a login URI that accepts calls including the src_interaction query parameter, that marks the state of the login flow.

For your login page to prompt the execution of the backend authentication flow, create a dedicated login endpoint.

The login endpoint must do the following:

#### A. Execute the backend auth flow

Once invoked by the login page, the login endpoint should prompt the execution of the backend authentication flow described in the next step ([Step 3](#step-3-implement-auth-flows)).


#### B. Handle successful login

Upon successful backend authentication, the flow returns user access tokens and a `session_id`. In this case, send a backend POST request to `/auth/centralized/callback` as shown below.

```js
fetch('https://api.transmitsecurity.io/cis/auth/centralized/callback', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer [USER_ACCESS_TOKEN]`, // User access token returned in Step 1.4
  },
  body: JSON.stringify({
    src_interaction: "[SRC_INTERACTION_ID]", // Returned upon backend authentication
    session_id: "[SESSION_ID]", // Returned upon backend authentication
  }),
})
.then((res) => res.json())
.then((data) => {
  if (data.error_code) {
    // error
  } else {
    // redirect the user
    console.log('Redirect the user to ', data.result.url);
  }
})
.catch((err) => {
  // error
})
```

The response will include a `result` field with a URL. Your client should send a GET request to this URL to get forwarded to your redirect URI with the code that you should exchange for the token in the next step.

```json
  {
    "result" : "[URL]" // Corresponds to your redirect URI with an auth code
  }
```

#### C. Handle failed login

If the Mosaic authentication fails or another application error occurs (unrelated to Transmit), an error needs to be reported back to Mosaic so it can be returned to your end-user app to handle. In this case, the Auth Hub should send a request like the one below from the **client-side** with the error. In response, Mosaic will redirect to your redirect URI with this error.

```js
const query = new URLSearchParams({
  error: '[ERROR]' // Error that will be returned to the redirect URI
}).toString();

const resp = await fetch(
  `https://api.transmitsecurity.io/cis/auth/centralized/callback?${query}`,
  {method: 'GET'}
);

const data = await resp.text();
console.log(data);
```

### 3. Configure your Authentication Hub
<div class="badge-wrapper">
    <div class="badge">Admin Portal</div>
</div>

From the [Applications](https://portal.transmitsecurity.io/applications) page of the Admin Portal, [create the application](create_new_application.md) that will be used as your Authentication Hub. Configure the application as needed for the backend authentication method you choose to implement, ensuring to enable user creation as described in the authentication guides.

Under **Authentication Hub**, select `Set as authentication hub` and set your login URI as the **Authentication hub URL**.

:::info Note

Each tenant can set a single application as the Authentication Hub for the tenant.

:::

## Step 3: Implement auth flows

Implement the backend authentication methods used to authenticate the user. Since backend login flows can only be completed by existing users that are associated with the application, the user will also need to be signed up to the Auth Hub app. For details on implementing backend authentication (including user sign-up), see the [backend authentication guides](/guides/user/be_auth_email_magic_link.md). Here's an example of a basic authentication flow (without SSO):

![](../../images/UserID/be_auth_hub_3.png)

:::info Note

To add SSO login, implement the setup described in [Set up SSO across your apps](/guides/user/be_auth_email_magic_link.md). The silent authentication will be requested using the `session_id` returned to the Authentication Hub in [Step 2.2](#3-configure-your-authentication-hub).

:::

<style>
    hr {
      border: 2px solid #C6F5F5 !important;
    }
    section article ol li {
      margin-top: 6px !important;
    }
    section article ul li {
      margin-top: 10px !important;
    }
</style>
