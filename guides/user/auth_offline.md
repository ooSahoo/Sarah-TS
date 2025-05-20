---
title: Refresh app's access
---

# Refresh app's access without the user

Clients can maintain offline access to resources and continue operating on behalf of the user even after the user leaves and is no longer actively interacting with the app. Since the access tokens are short-lived, they need to be reissued once they expire. OAuth 2.0 enables applications to obtain new access tokens without requiring a user to authenticate by exchanging refresh tokens for new access tokens. By default, refresh tokens expire after 14 days unless rotated.

For example, the Cloud hosting platform enables you to deploy your service on-demand or according to preset schedule. To deploy the service on your behalf, the hosting platform has maintain access by issuing new access token in exchange for refresh tokens.

:::info Note
For use cases when the user is present, consider implementing [session management](/guides/user/manage_user_sessions.md). For example, you can obtain new access tokens based on the existing IDP session by performing silent authentication.

:::

## Step 1: Obtain refresh tokens

In authentication flows, refresh tokens can be returned along with access and ID tokens in exchange for an auth code. See [OIDC authorization code flow](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth).

- In email magic link, email OTP, social login, and other Mosaic auth flows, Mosaic returns the refresh tokens automatically.
- In pure OIDC integrations, to ensure the refresh tokens are returned, the auth call to `/oidc/auth`  must explicitly request the `offline_access` scope and set the `prompt` to `consent`.

Below is a sample request (breaks and spaces were added for readability):

```js
  https://api.transmitsecurity.io/cis/oidc/auth?
    client_id=[CLIENT_ID]& // Client ID found in the app settings in the Admin Portal
    scope=openid%20offline_access& // Must include offline_access in addition to openid
    response_type=code&
    redirect_uri=[REDIRECT_URI]&  // Redirect URI found in the app settings in the Admin Portal
    prompt=consent // Allows obtaining user consent which is required for offline access
```

This returns an authorization code to your redirect URI upon successful authentication; otherwise, an error. The code should be exchanged for tokens by calling the [/oidc/token](/openapi/user/oidc/#operation/oidcToken) endpoint. See [Integrate login using OIDC](/guides/user/auth_oidc.md) for more details.

The `/oidc/token` returns the access token, ID token, and refresh token that should be stored in your application backend. For example:

```json
{
  "access_token": "[ACCESS_TOKEN]",
  "id_token": "[ID_TOKEN]",
  "refresh_token": "[REFRESH_TOKEN]",
  "expires_in": 3600
}
```

## Step 2: Request new access tokens

To issue a new user access token using the refresh token, send a POST request to the  `/oidc/token` endpoint like the one below. The call returns new access and ID tokens which can be used for offline access. Since refresh tokens are rotated upon each use, a new refresh token is returned as well.

```shell
curl -i -X POST \
https://api.transmitsecurity.io/oidc/token \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d grant_type=refresh_token \ # Must be set to 'refresh token'
-d client_id=[CLIENT_ID] \ # Found in the app settings in the Admin Portal
-d client_secret=[CLIENT_SECRET] \ # Found in the app settings in the Admin Portal
-d refresh_token=[REFRESH_TOKEN] # Returned upon successful authentication
```

## Next steps

By default, refresh tokens are valid for 14 days. The maximum period of time the app can operate in the offline mode without requesting a user to re-authenticate is also 14 days. You can modify the access duration for your client by updating token timeout configuration in the OIDC client's [advanced settings](/guides/user/manage_clients.md#advanced-settings). You can extend or reduce the length of the access token, refresh token, and the maximum rotation time. Alternatively, you can create a custom [resource](/guides/user/resources_overview.md) and target it during authentication. For each resource, the expirations are configured in the [Resource settings](/guides/user/manage_resources#session-management-settings).