---
title: Session management
---

# Session management

Sessions track user interactions with a resource within a given time frame. For example, the resource may be an application (app), or identity provider (IDP)—a service that creates, manages, and stores digital identities like Mosaic. By managing sessions, you can allow your users to securely access your application, without needing to re-authenticate for every request. This provides an enhanced identity experience that doesn't compromise on security.

:::info
This article explains how sessions work when created using [OIDC and other redirect-based](/guides/user/auth_overview.md) authentication flows. For backend-to-backend integrations, see [Backend session management](/guides/user/be_how_sessions_work.md).
:::

## Application sessions
An application session (also known as a local session) is created by the app when the user logs in. By default, a session ends when the user leaves the website or closes the browser. However, an app can extend the session by storing information in a cookie so the user won't need to authenticate each time they return. The session lifetime is managed by the app. Once the application session is over, the user must re-authenticate.

## IDP sessions
An IDP session is created by Mosaic when a user logs into the app. Each IDP session is bound to a specific user. Mosaic creates a client-side cookie that is used to track the IDP session. The IDP session is active until it expires, unless terminated before (see [Session lifetime](how_sessions_work.md#session-lifetime)).

Typically, both the application session and IDP session are used to determine if the user is authenticated whenever access is requested. Once the application session is over, authentication is always required. Authentication is also required if the session doesn't fulfill the session criteria. Once the IDP session is over, the app may rely on the current authentication until it expires, but access can no longer be extended without re-authentication.

:::info Note
In our documentation, **sessions** will refer exclusively to IDP sessions unless stated otherwise.
:::

## Tokens and sessions

Every user authentication creates a new session and returns an access token, ID token, and refresh token (if `offline_access` was requested). These tokens are bound to the session, user, and client. A valid access token is required to authorize user access to the application, even if there's an active session. The access token (JWT) contains the expiration, user ID, and authorization information—including which [resource](resources_overview.md) can be accessed and the user's [roles](how_rbac_works.md) to determine their permissions.

## Session lifetime
The session is valid for 2 weeks. Sessions gets extended every time new access tokens are issued during the session lifetime.

A session terminates if the end-user initiates an IDP logout using the [Logout API](/openapi/user/one-time-login/#operation/logout), or if an admin revokes the session using the [Session Revocation API](/openapi/user/sessions/#operation/deleteUserSessions). A logout will delete all the sessions for the relevant user. The session revocation call will delete all the sessions for the specified user, as well as revoke the corresponding refresh tokens.

:::note Note
The session length cannot be customized. The "session expiration" setting configured in resources corresponds to the maximum period of time the refresh token can be rotated.
:::

## Session cookie

Mosaic creates a session cookie that stores the information needed to obtain user access and authorization, without requiring the user to authenticate. Here are some security guidelines when creating application sessions using cookies:

:::attention Security Recommendations
- Set `HttpOnly` flags on your cookies to ensure they won't be accessible to JavaScript
- Set `secure` flags on your cookies to ensure they are sent only over HTTPS
- Set the `SameSite` cookie attribute to `Strict` if possible (note that this setting might interfere with SSO implementation), and `Lax` otherwise ([learn more](<https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#security>))
- Generate new session cookies upon each authentication to prevent session fixation attacks
- Bind local session ID stored in the cookie to other user or client properties (client IP address, User-Agent, client-based digital certificate, etc.)
- If possible (also considering your UX requirements), use non-persistent cookies or at least exclude `Max-Age` or `Expires` cookie attributes since they will make the cookie persistent
- Use `Cache-Control` headers for sensitive content
- Use `Cache-Control: no-cache="Set-Cookie, Set-Cookie2"` directive, to allow caching everything except the session ID
- Logout to invalidate the session
:::