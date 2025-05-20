---
title: Token types
---
# Token types
##

This describes the types of tokens issued by Mosaic, how to obtain them, and other usage details.

| Tokens | Used to | Obtained | Consumed by | Default TTL |
|---|---|---|---|---|
| [ID tokens](/openapi/id_token_reference.md) | Identify users and get their profile data | Returned upon user authentication | App | 1 hour |
| [User access tokens](/openapi/user_access_tokens.md) | Grant user access to your app or authorize Mosaic actions that require a logged-in user | Returned upon user authentication | App and Mosaic | 1 hour |
| [Client access tokens](/openapi/client_access_tokens.md) | Authorize app-level management actions (magic link auth, updating user profiles, etc.) | Generated using [end-user app](/guides/user/manage_apps.md) client creds| Mosaic | 1 hour |
| Admin access tokens | Authorize backend services to perform tenant-level management actions (retrieving all users, etc.) | Generated using [management app](/guides/user/management_apps.md) client creds | Mosaic | 1 hour |
| [Refresh tokens](/openapi/refresh_tokens.md) | Renew expired tokens for offline access| Returned upon user authentication | Mosaic | 14 days |
| Reset tokens | Reset passwords | Returned when user authenticates for a reset flow | Mosaic | 5 min |

:::info Notes

* Access token and refresh token time-to-live can be customized by creating [resources](/openapi/user/resources/#operation/createResource).
* All tokens are JWT, except for refresh tokens.
* You can only refresh ID and user access tokens. See [guide](/guides/user/auth_oidc.md#step-6-refresh-access-tokens).

:::

<style>
table th:nth-child(1)  {min-width: 175px}
table th:nth-child(4)  {min-width: 130px}
table th:nth-child(5)  {min-width: 115px}

</style>
