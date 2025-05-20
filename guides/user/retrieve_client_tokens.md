# Get client access tokens

Most Mosaic APIs are authorized using Bearer access tokens in the header of the request. These tokens are retrieved from the `/oidc/token` endpoint (defined by the [OIDC standard](https://openid.net/specs/openid-connect-core-1_0.html#TokenEndpoint)). The tokens are JWT tokens and are valid for one hour&mdash;you can reuse tokens multiple times when calling Mosaic APIs during this hour. For the token structure, see our [Token reference](/openapi/client_access_tokens/).

:::info Note
This guide covers the most common basic sceranio when an **OIDC client** is authenticated using the **client ID and client secret**. For other authentication methods, refer to respective guides ([Authenticate with private key JWT](/guides/user/auth_fapi_private_key_jwt.md) and [Authenticate using mTLS](/guides/user/auth_fapi_mtls.md)).

:::

## Retrieve access tokens

To retrieve a client access token, send the following HTTP POST request:

```shell
curl -i -X POST \
https://api.transmitsecurity.io/oidc/token \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d grant_type=client_credentials \
-d client_id=[CLIENT_ID] \
-d client_secret=[CLIENT_SECRET]
```
where `[CLIENT_ID]` and `[CLIENT_SECRET]` should be substituted with your app's client credentials. They can be found in the Mosaic Admin Portal by selecting your application from **Applications** and proceeding to OIDC client settings. If you don't already have an application, you'll need to create one first (see [Create application](create_new_application.md)).

:::info Notes

- When generating access tokens for **Fraud Prevention** or **Identity Verification** services, target them to the relevant resources by passing their URLs in the `resource` parameter. See [Authorization](/openapi/token.page.yaml)
- With the `resource` parameter, you can restrict access to a specific resource within your application. A resource should be configured for this application (see [Manage resources](manage_resources.md)). The targeted resource will be reflected in the audience (`aud` claim) of the access token.
- To authorize operations across all apps of your tenant, you'll need a **admin access token**. This is a token retrieved using client credentials that corresponds to a Management Application created from the **Settings** page of the Admin Portal.

:::

:::warning FAPI 2.0

To ensure compliance with [FAPI 2.0](/guides/user/fapi_flows.md), clients should use mTLS or private key JWT instead of client secret.

:::

## Check token expiration

Client access tokens are valid for one hour since the time they were generated. Since they are JWT tokens, you can check expiration from the `exp` claim of the token. Expired client access tokens cannot be refreshed.

Here are some basic claims included in the token:

| Claim | Description |
| ------- | --------------------|
| sub | Subject of the token. This is the client-id |
| iss | Issuer, identifies the principal that issued the JWT |
| aud | Audience, identifies the recipients that the JWT is intended for |
| exp | Expiration time, in epoch time format. The token will not be accepted on or after this time |
| iat | Issued At, identifies the time the JWT was issued. |