# Introduction

Mosaic builds every feature using an API-first approach, to give you APIs that are consistent, reusable, and well-designed. This lets you create great identity experiences for your users, and develop better products—faster.

## Base URL

Mosaic APIs are served over HTTPS. The endpoint paths are relative to the base URL, which consists of:

- **Scheme**, which defines the protocol used. Always `https`.
- **Host**, which determines the environment type:
    - **Production environments** (region-specific):
        - `api.transmitsecurity.io` (Global, US)
        - `api.eu.transmitsecurity.io` (EU)
        - `api.ca.transmitsecurity.io` (Canada)
        - `api.au.transmitsecurity.io` (Australia)
    - **Sandbox environment** (for testing and development without affecting production data):
        - `api.sbx.transmitsecurity.io`
- **Service ID**, which identifies the type of service:
    - `cis`&mdash;Identity Management and Authentication services
    - `risk`&mdash;Fraud Prevention services
    - `verify`&mdash;Identity Verification services

<!--For internal reference (Jan 3, 2024):
| Mosaic service | Global, US | EU (European Union)| CA (Canada) | AU (Australia) |
|------------------|------------|----|----|-----------|
| `cis`            | X | X | X | n/a |
| `webauthn` (SDK) | X | X | X | X |
| `risk`           | X | X | n/a | n/a |
| `verify`         | X | X | n/a | n/a |
| `xdv`            | X | n/a | n/a | n/a |

-->
For example:

- ` https:   //  api.transmitsecurity.io /    risk    /v1/recommendation`

- `\_scheme_/\__________host___________/\_serviceID_/\__endpoint_path__/`

:::info Note
Examples in Mosaic documentation always leverage the global host (`api.transmitsecurity.io`). Make sure to check the correct base URL for your region and adjust code snippets as needed.
:::

## Authentication
All API requests must be made over HTTPS. Depending on the API and client settings, authentication is performed either using:
- Client ID only
- Client ID with PKCE
- PKCE only
- Client ID and client secret
- Client ID and client assertion (private key JWT)
- Client ID, PKCE, and client assertion (private key JWT)
- Client ID and self-signed certificate (mTLS)
- Client ID, PKCE, and self-signed certificate (mTLS)
- OAuth2 access token in the `Authorization` header using Bearer authentication scheme

### Access tokens

These are the types of access tokens that can be used to authorize API calls in Mosaic.

- Client access tokens&mdash;generated using your app credentials
- Admin access tokens&mdash;generated using credentials of management apps
- User access tokens&mdash;returned upon successful user authentication

For more information about token types, see [Token reference](/openapi/token_reference.md).


:::warning Important
In some cases, client access tokens must be generated for the specific service you want to use. For **Fraud Prevention**, and **Identity Verification** services, specify the relevant resource when generating the token. See [Authorization](/openapi/token.page.yaml).

To generate access tokens to run API calls right from the docs, using the **Try it** button.

:::

### Access to APIs

Mosaic restricts access to some APIs authorized by **client access tokens** by enforcing client role-based access. To be able to run calls to a specific endpoint, a client must be assigned a role that grants appropriate permissions. For details, see [Manage client roles](/guides/user/manage_client_roles.md). APIs currently protected with RBAC:

- [Backend authentication APIs](/openapi/user/backend-one-time-login/)
- [OIDC and Hosted authentication APIs](/openapi/user/one-time-login/)
- [Identity management APIs](/openapi/user/user/)

APIs authorized using **user access tokens** or **admin access token** don't impose any role requirements.

## Errors

Conventional HTTP response codes are used to indicate the success or failure of an API call:
- `2xx` or `3xx` codes indicate success
- `5xx` codes indicate a Mosaic Server server error (rare)
- `4xx` codes indicate other failures (missing params, unauthorized, applicative errors, etc.)

