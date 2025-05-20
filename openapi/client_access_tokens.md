---
title: Client access tokens
---
# Client access tokens

Client access tokens are used to authorize backend API calls to Mosaic services. They are retrieved by calling the [`/oidc/token`](/openapi/user/oidc/#operation/oidcToken) endpoint using a client credentials flow (see [Get client access tokens](/guides/user/retrieve_client_tokens.md)), and passed in the Authorization header of API calls to authorize them. This describes the structure and semantics of the client access tokens returned by Mosaic.

## Claims
The access token is a JWT ([Json Web Token](https://jwt.io/introduction)) signed by Mosaic. It contains standard JWT claims, and describes the access context (such as the client/app/tenant for which it was generated, which resources it can access, scope of permissions, etc.).

| Claim | Description |Type
| ------- | --------------------|--
| **sub** | Subject of the token (`client_id`) |String
| **iss** | Issuer of the token, which should match the issuer returned from the [`/oidc/jwks`](/openapi/user/oidc/#operation/oidcGetKeys) endpoint. |String
| **iat** | Time the token was issued. |Number
| **exp** | Expiration time, in epoch time format. The token will not be accepted on or after this time. | Number
| **aud** | Audience, which is the intended recipient of the token. If a specific resource is requested, this contains the resource URI. Default is `userid-api`. |String
| **scope**| Requested scopes, as a space delimited string |String
| **role** | Contains the `Admin` role for an admin access token (which are generated using credentials of a Management Application). | Array
| **client_id** | Identifer of the client that requested the access. |String
| **app_name** | Friendly name of the application that requested the access. |String
| **app_id** | Identifer of the application that requested the access. |String
| **tid** | Identifer of the tenant that requested the access. |String
| **ts_roles** | Lists roles assigned to the client. | Array
| **ts_permissions** | Contains the effective access permissions granted to the client through assigned roles. Any changes to client roles take up to 5 minutes to propagate, meaning that updated permissions will appear in new client access tokens generated no sooner than in 5 minutes after the change was made. | Array
| **cnf** | Contains X.509 certificate thumbprint (SHA-256) as a confirmation of token being bound to a specific certificate (only if token binding is enabled for mTLS or private key JWT authentication). Includes `x5t#S256` key and its value. | Object

<!--CHECK: automatically grant a permission (e.g., client:credentials:exchange) so each client can swap its credentials for tokens without manual permission -->


## Token example

Here's an example of a decoded client access token:

```json
{
  "tid": "6oi3tjkijshdfgekwjfwey9",
  "app_name": "Acme",
  "app_id": "zl2trg3sanjsd63qs7se",
  "roles": [],
  "jti": "ABCSrjsReaYKk-FSHHZU",
  "sub": "u6jkjhsdf87efbwv57u",
  "iat": 1675590719,
  "exp": 1675594319,
  "scope": "openid offline_access",
  "client_id": "pVEZaxjhbdshcudsLe",
  "iss": "https://userid.security",
  "aud": "userid-api",
  "ts_roles": ["reader"],
  "ts_permissions": ["read:user"]
}
```