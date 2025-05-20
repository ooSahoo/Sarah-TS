---
title: User access tokens
---
# User access tokens

A user access token is returned upon each successful user authentication, and describes the access that was granted to the user. Access tokens are obtained by calling the [`/oidc/token`](/openapi/user/oidc/#operation/oidcToken) endpoint. These tokens are also used to authorize Mosaic API requests that require the context of a logged-in user, such as [Verification APIs](/openapi/user/verification/). This describes the structure and semantics of the user access tokens returned by Mosaic.

## Claims
The access token is a JWT ([Json Web Token](https://jwt.io/introduction)) signed by Mosaic, which includes the following claims:

| Claim | Description |Type
| ------- | --------------------|---
| **sub** | Subject of the JWT (`user_id`). |String
| **iss** | Issuer of the token, which should match the issuer returned from the [`/oidc/jwks`](/openapi/user/oidc/#operation/oidcGetKeys) endpoint.
| **iat** | Time the token was issued. |Number
| **exp** | Expiration time, in epoch time format. The token must NOT be accepted on or after this time. |Number
| **aud** | Audience, which is the intended recipient of the token. If a specific resource is requested, this contains the resource URI. Default is `userid-api`. |String
| **scope**| Requested scopes, as a space delimited string |String
| **roles** | Roles of the user, used to determine their permissions. |Array
| **tid** | Identifer of the tenant the user requested to access. |String
| **client_id** | Identifer of the client the user requested to access. |String
| **app_name** | Friendly name of the application the user requested to access. |String
| **app_id** | Identifer of the application the user requested to access. |String
| **act** | Returned only in delegated access flows. Contains identifer of user to whom access was delegated in the `sub` subclaim. |Object
| **permissions** |Returned only in delegated access flows. Contains a list of delegated permissions. |Array
| **cnf** | Contains X.509 certificate thumbprint (SHA-256) as a confirmation of token being bound to a specific certificate (only if token binding is enabled for mTLS or private key JWT authentication). Includes `x5t#S256` key and its value. | Object

## Token example

Here's an example of a decoded user access token:

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