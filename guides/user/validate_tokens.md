---
  title: Validate tokens
---

# Validate tokens to protect your APIs

All user tokens returned by Mosaic should be validated, as described below. This helps guard your endpoints and ensure users have indeed authenticated with Mosaic before you can proceed with granting them access to resources. Note, that client app tokens and management app tokens are consumed and validated by Mosaic, you don't need to validate them.

## Verify token signatures

Verify that the token is signed by Mosaic. To do it, retrieve the public key by sending a GET request to the [`/oidc/jwks`](/openapi/user/oidc/#operation/oidcGetKeys) endpoint. The endpoint returns a set of keys, along with a name, algorithm used, etc. for each key.

```shell

curl -i -X GET \
  https://api.transmitsecurity.io/cis/oidc/jwks

```

Check the `kid` claim in the token–it helps identify the key used to sign this particular token. Then locate the key with the same `kid` in the key array returned by JWKS response to find the right key to compare the signature against. Mismatching signatures might indicate that the token could have been stolen and replaced by bad actors.

:::info Note

Instead of querying public keys every time you need to validate an ID or access token, consider caching a response returned by `/oidc/jwks`. It helps avoid reaching API rate limits and prevent latency issues. Signing keys don't change often. However, if token validation fails, try clearing the cache and fetching new keys before revalidating the token signature.

:::

## Validate user access tokens

:::info Important

User access tokens must be validated on your side if you plan on using them to authorize internal API calls. If you plan on passing these tokens to other services, they should validate tokens as well.
:::

Validate access tokens returned upon successful authentication or fetched for API authorization, as follows:

- Validate that the issuer of the access token (`iss`) is equal to https://userid.security (for global tenants, except EU and CA), https://eu.userid.security (for EU tenants), or https://ca.userid.security (for CA tenants)
- Validate that the expiry time (`exp`) of the access token has not passed
- Validate that the tenant ID (`tid`) corresponds to your tenant
- Validate the audience (`aud`) if you want to limit access to a specific [resource](/guides/user/manage_resources.md). The access token will only include the resource in the `aud` claim if the client it's issued for is connected to this resource.
- Validate that `sub` corresponds to the user identity stored in Mosaic.
- Validate that the client ID (`client_id`) corresponds to the application client ID stored in Transmit
- Validate that roles (`roles`) correspond to the roles assigned to the user

See [User access tokens](/openapi/user_access_tokens.md) for more details on token claims.

## Validate ID tokens

Validate ID tokens returned upon successful authentication as follows:

- Validate that the issuer of the ID token (`iss`) is equal to https://userid.security (for global tenants, except EU and CA), https://eu.userid.security (for EU tenants), or https://ca.userid.security (for CA tenants)
- Validate that the audience of the ID token (`aud`) is equal to the client ID related to the authentication
- Validate that the expiry time (`exp`) of the ID token has not passed
- Validate that the tenant ID (`tid`) corresponds to your tenant

See [ID tokens](/openapi/id_token_reference.md) for more details on ID token claims.