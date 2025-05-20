# Manage sessions for backend authentication

Manage backend sessions to authenticate users and issue new tokens without unnecessary user interaction that provides a better identity experience with no cost to security (see [Session management](/guides/user/be_how_sessions_work.md)).

Backend sessions are created as a result of backend authentication. While the session is valid, you can leverage it to silently authenticate users. Backend sessions can be shared among multiple backend authentication methods which makes it possible to implement secure scenarios such as [Backend multi-factor authentication](/guides/user/be_auth_mfa/) and [single sign-on across the apps](/guides/user/be_sso_across_apps.md).

:::info
This article explains how to manage sessions created using [backend authentication](/guides/user/be_auth_overview.md) flows.
:::

Common use cases that rely on the session management:
- [Silent authentication](/guides/user/be_sso_across_apps.md#step-1-request-silent-auth-for-a-session) within the context of the same app or across apps (SSO)
- [Multi-factor authentication](/guides/user/be_auth_mfa.md)

## Create sessions

Upon completing the backend authentication process, Mosaic creates a backend session and your server receives a response that includes an access token, ID token, refresh token, and the session ID (`session_id`) of the new session.

```json
{
  "access_token": "string",
  "id_token": "string",
  "refresh_token": "string",
  "token_type": "string",
  "expires_in": 3600,
  "session_id": "string" // Session ID of the created session
}
```
## Validate tokens

The access token is a JWT ([Json Web Token](https://jwt.io/introduction)) signed by Mosaic (see [Token reference](/openapi/user_access_tokens/) for the claim structure). We strongly recommend validating it using [these](validate_tokens.md) guidelines before you can use it to grant the user access.

:::attention Security
It is highly discouraged to use a token without validating it as it may lead to authorizing malicious tokens.
:::

Here's an example of a decoded token:

```json
{
  "tid": "",
  "app_name": "Acme",
  "app_id": "8flFllgrd1Wqiru4IGai0",
  "roles": [
    "smP3MD65l7hKXG6qJ-S5d"
  ],
  "jti": "IJMTqbmijVG7_LsJz-y5U",
  "sub": "bb8dc75.8AEM5PpWyJBH6opzIOrJ2.transmit",
  "iat": 1658056533,
  "exp": 1658060133,
  "scope": "offline_access",
  "client_id": "bb8dc75.8AEM5PpWyJBH6opzIOrJ2.transmit",
  "iss": "https://userid.security",
  "aud": "userid-api"
}
```

## Store session
Once the access token is validated, you'll need to store the access token and the session ID so that they can be used to grant access in subsequent requests.

:::attention Security
We recommend binding the session to your app's local session. For example, save a reference from the local session ID to the access token and session ID in your backend. And then when receiving the session cookie from the frontend, “link” it to Mosaic access token and IDP session.
:::

## Extend access

When a user returns to your website, you'll want to try to provide them access without requiring them to log in. Implement the following session management logic that determines the user's eligibility to log in without authentication.

Start by checking for a session cookie, which indicates a local session already exists. If not found, redirect the user to login. If found, send the cookie to your backend and use it to retrieve the tokens.

- If the access token is still valid, you can allow the user to continue to your website without having to log in again.
- If the access token has expired, delete the cookie and prompt the user to log in. Alternatively, try [authenticating a user silently](/guides/user/be_sso_across_apps.md#step-1-request-silent-auth-for-a-session) based on an existing IDP session.

:::info Note
Refresh tokens returned upon completing backend authentication flows shouldn't be used to extend access and renew sessions. Refresh tokens are reserved for offline access scenarios.
:::

<!-- You can silently authenticate users based on the active session by sending a POST request to `/v1/auth/session/authenticate` endpoint. To run this request, you don't need the user's access or refresh token. In the example below, replace `[SESSION_ID]` with the ID of the backend session created as a result of the backend authentication. If the session is valid, Mosaic will return a new token and update the session expiration time. Authenticating sessions enables you to perform silent authentication and avoid unnecessary user interactions.

```js
import fetch from 'node-fetch';

async function run() {
  const resp = await fetch(
    `https://api.transmitsecurity.io/cis/v1/auth/session/authenticate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer [TOKEN]'
      },
      body: JSON.stringify({
        session_id: '[SESSION_ID]'
      })
    }
  );

  const data = await resp.json();
  console.log(data);
}

run();
```
-->

## Add authentications to a session

You can add multiple authentication methods within the context of the same session. To do this, specify the session ID in the subsequent authentication request. It allows supporting scenarios like [Multi-factor authentication](/guides/user/be_auth_mfa.md). New authentication extends the session lifetime.

The example below demonstrates a magic link authentication request used as a second factor in MFA.

```js
import fetch from 'node-fetch';

async function run() {
  const resp = await fetch(
    `https://api.transmitsecurity.io/cis/v1/auth/link/email/authenticate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer [TOKEN]' // Client access token
      },
      body: JSON.stringify({
        session_id: '[SESSION_ID]', // Session ID of the active session
        code: '[CODE]' // Code returned to your redirect URI
      })
    }
  );

  const data = await resp.json();
  console.log(data);
}

run();
```

## Logout sessions

Logging out immediately terminates a session even if it hasn't expired yet. Use [Logout API](/openapi/user/backend-sessions/#operation/logout) to revoke a session.

```js
import fetch from 'node-fetch';

async function run() {
  const resp = await fetch(
    `https://api.transmitsecurity.io/cis/v1/auth/session/logout`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer [TOKEN]' // Client access token
      },
      body: JSON.stringify({session_id: '[SESSION_ID]'}) // ID of the session to terminate
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


