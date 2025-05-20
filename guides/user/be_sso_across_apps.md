---
title: "Set up SSO across your apps"
toc:
  maxDepth: 2
---

# Set up SSO across your apps

Create a seamless single sign-on (SSO) experience across your apps using backend authentication methods. You choose to silently authenticate the user (without user interaction) if an active backend session exists within any app in your tenant. This removes friction from the login process without compromising on security.

<a href="https://github.com/TransmitSecurity/ciam-expressjs-vanilla-samples/tree/main/silent-and-offline-be-auth" target=_blank>Check out our sample app <img src="../../images/external-link-light.svg"></a>

:::info Note

This describes how to implement SSO using a backend-to-backend integration for authentication. See [Sessions APIs](/openapi/user/backend-sessions/#operation/authenticateSession).

For information about how to implement [SSO using Mosaic's Journeys](/guides/user/sso_orchestration/sso_overview/), refer to the relevant documentation. 
:::

## How it works

Your app can manage user sessions based on the local session created by the application, and the IDP session created by Mosaic. When possible, users are granted access to the app without re-authentication based on an existing access token (if valid). Without a valid access token, your app will need to authenticate the user.

With backend authentication, your app can re-authenticate the user without any user interaction based on a valid IDP session. Since an IDP session is shared across apps in the tenant, the session may have been created in the context of a different app, which provides the SSO login experience. See [Backend session management](/guides/user/be_how_sessions_work.md)

Session authentication request always returns tokens but you should silently authenticate a user in the app only if the session satisfies the auth requirements of the app. For example, if an app requires a second factor, a user has to actively authenticate using another backend method. See [Multi-factor authentication](/guides/user/be_auth_mfa.md)

Here's an example of login logic that supports this, which begins with checking the local application session:

![](../../images/UserID/be_sso_with_session_mgmt.png)

The diagram below illustrates the integration flow for a silent authentication process that leverages a backend session previously created by successful backend authentication to a different app. The flow assumes apps share a single backend. When authentication is required, your app will first look up a session ID stored on the backend and try to obtain a token based on the active session ID. If there's no such session, or it's no longer valid (i.e., the user is logged out or the session expired), the user will need to actively authenticate.

For example:

![](../../images/UserID/be_sso_across_apps.png)

## Before you start

This solution relies upon both session management and silent authentication. Backend sessions can be authenticated and renewed based on the active session ID. IDP sessions are valid for two weeks unless authentication occurs. With each new authentication, the session expiration is updated. The steps below describe how to implement silent authentication. Before you start, implement the session management flow described in [Manage backend sessions](/guides/user/be_manage_sessions.md).

:::info Note

Excessive silent authentication requests are subject to rate limits. Polling for session status isn't supported, and excessive calls should be avoided.

:::

## Step 1: Request silent auth for a session

To support SSO across your apps, you'll need to ensure that the end-user won't be asked to re-authenticate if they're currently logged in (even if that login occurred in the context of another app). You can do this by first trying to perform a silent authentication to get an access token without prompting the user to authenticate.

To request silent authentication, send a [session authentication](/openapi/user/backend-sessions/#operation/authenticateSession) call like the one below:

```js
import fetch from 'node-fetch';

async function run() {
  const resp = await fetch(
    `https://api.transmitsecurity.io/cis/v1/auth/session/authenticate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer [TOKEN]' // Client access token
      },
      body: JSON.stringify({
        session_id: '[SESSION_ID]' // ID of the session you want to authenticate
      })
    }
  );

  const data = await resp.json();
  console.log(data);
}

run();
```

The response is one of the following:
- If there is a valid session, the user is not prompted to authenticate and Mosaic returns a token to your backend.
- If there isn't a valid session, a 400 error is returned with the `Session not found` message. Prompt the user to authenticate.

:::info Note
Check the values in the `amr` claim of the received ID token. The session must satisfy auth requirements of the app. For example:
- If the app requires a specific auth method, silently authenticate a user only if the session was created using this method.
- If the app enforces multi-factor authentication, check for `mfa` and implement a second factor if it's not listed in `amr`. See [Multi-factor authentication](/guides/user/be_auth_mfa.md)
:::

## Step 2: Authenticate users

If silent authentication fails, you'll need to authenticate the user to obtain the access token and session ID. You can do this using any of the supported backend authentication method (see [backend authentication guides](/guides/user/be_auth_overview/)). Returned session ID can be used for further silent authentication attempts coming from other different apps.

## Step 3: Logout users

When the user requests to logout from your app, the user should be logged out of the IDP session. This will ensure the session can no longer be used for an SSO login. You can use the [logout session API](/openapi/user/backend-sessions/#operation/logout) as shown below:

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
      body: JSON.stringify({session_id: '[SESSION_ID]'}) // ID of the session used for authentication
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
