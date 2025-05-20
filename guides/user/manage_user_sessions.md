# Manage sessions
Manage sessions to allow your users to securely access your application, without needing to reauthenticate for every request. This provides a better identity experience with no cost to security (see [Session management](/guides/user/how_sessions_work.md)).

:::info
This article explains how to manage sessions created using [these](/guides/user/auth_overview.md) authentication flows. For backend-to-backend integrations, see [Manage sessions for backend authentication](/guides/user/be_manage_sessions.md).
:::

Common use cases that rely on the session management:
- [Silent authentication](/guides/user/sso_across_apps.md#step-1-request-silent-auth) within the context of the same app or across apps (SSO)
- [Multi-factor authentication](/guides/user/auth_mfa_guide.md)

There are many ways to implement sessions, which may depend on factors like whether the app is highly secure. This describes only one example of a session lifecycle, which includes the basic tasks you'll need to do as part of any session management flow you create. See [Session cookie](/guides/user/how_sessions_work.md#session-cookie) for security recommendations for creating a session cookie.

## Create sessions

When a user requests to log in, create a new session by authenticating the user using our Authentication APIs. Regardless of authentication method, Mosaic returns an access token and refresh token (if `offline_access` was requested). For example:

```json
{
  "access_token": "[ACCESS_TOKEN]",
  "id_token": "[ID_TOKEN]",
  "refresh_token": "[REFRESH_TOKEN]",
  "expires_in": 3600
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
Once the access token is validated, you'll need to store it so that it can be used to grant access in subsequent requests.

:::attention Security
We recommend binding the session to your app's local session. For example, save a reference from the local session ID to the access token in your backend. And then when receiving the session cookie from the frontend, “link” it to Mosaic access token and IDP session.
:::

## Extend access
When a user returns to your website, you'll want to try to provide them access without requiring them to log in. Implement the following session management logic that determines the user's eligibility to log in without authentication.

Start by checking for a session cookie, which indicates a local session already exists. If not found, redirect the user to login. If found, send the cookie to your backend and use it to retrieve the tokens.

- If the access token is valid, you can allow the user to continue to your website without having to log in again.
- If the access token has expired, delete your session cookie and prompt the user to log in. Alternatively, try [authenticating a user silently](/guides/user/sso_across_apps.md#step-1-request-silent-auth) based on an existing IDP session.

:::info Note
Refresh tokens shouldn't be used to extend access and renew sessions. Refresh tokens are reserved for offline access scenarios.
:::

<!-- To perform a silent authentication and extend a session, send an [OIDC authorization](/openapi/user/oidc/#operation/oidcAuthenticate) call like the one below with `prompt` set to `none`.

```shell
curl -i -X GET \
  'https://api.transmitsecurity.io/cis/oidc/auth?client_id=CLIENT_ID&scope=openid&prompt=none&response_type=code&redirect_uri=REDIRECT_URI&resource=RESOURCE_URI'
```

The response is one of the following:
- If there is a valid session, the user is not prompted to authenticate and an authorization code is returned to your redirect URI in the `code` query parameter. This code should be exchanged for user tokens.
- If there isn't a valid session, a `login_required` error is returned to the redirect URI in the `error` query parameter. The user will need to be prompted to authenticate.
-->

## Logout session

When the user requests to logout from your app, the session cookie should be deleted and the user should be taken back to the login page (or a page that doesn't require authentication). Since the stored session is bound to the cookie, it should no longer be accessible. However, as a precaution, it's recommended to also logout of the IDP session. This will terminate all user's sessions for this application.

To logout the user from the session, use the [logout API](/openapi/user/one-time-login/#operation/logout):

```shell
curl -i -X POST \
  'https://api.transmitsecurity.io/cis/v1/auth/logout' \
  -H 'Authorization: Bearer [TOKEN]' # User's access token
```