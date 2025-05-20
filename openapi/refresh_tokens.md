---
title: Refresh tokens
---
# Refresh tokens

Access tokens are short-lived and once the access token expires, the refresh token can be used to retrieve a new access token. The refresh tokens are used for offline access, i.e., when the user is no longer actively interacting with an app but the app continues operating.

By default, access tokens expire after 1 hour, while refresh tokens expire after 2 weeks. The maximum period of time the token can be rotated is also 2 weeks, by default. Once expired, refresh tokens cannot be used to retrieve new access and ID tokens. Default expirations can be customized in the [client settings](/guides/user/manage_clients.md#advanced-settings). Alternatively, you can create [resources](/guides/user/resources_overview.md) that allow shorter or longer token lifespan.
<!--I.e., you can retrieve new access tokens in exchange for a refresh token up to a year, provided that the refresh token is rotated less than every two weeks and doesn't go stale.  -->

Refresh tokens are always returned along with other tokens in [backend authentication flows](/openapi/user/backend-one-time-login/#operation/authenticateMagicLink) and [Mosaic redirect-based flows](/guides/user/auth_passwords/), such as email magic link and SMS OTP.

In pure [OIDC itegrations](/guides/user/auth_oidc/), refresh tokens must be requested explicitly. The `oidc/auth` request must include `scope` set to `offline_access` and `prompt` set to `consent`. Since refresh tokens are rotated upon each use, a new refresh token is returned too.

