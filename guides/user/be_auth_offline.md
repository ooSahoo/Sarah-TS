---
title: Refresh app's access
---

# Refresh app's access in backend integrations

Clients can maintain offline access to resources and continue operating on behalf of the user even after the user leaves and is no longer actively interacting with the app. Since the access tokens are short-lived, they need to be reissued once they expire. OAuth 2.0 enables applications to obtain new access tokens without requiring a user to authenticate by exchanging refresh tokens for new access tokens. By default, refresh tokens expire after 14 days unless rotated.

For example, the Cloud hosting platform enables you to deploy your service on-demand or according to a preset schedule. To deploy the service on your behalf, the hosting platform has to maintain access by issuing new access token in exchange for refresh tokens.

<a href="https://github.com/TransmitSecurity/ciam-expressjs-vanilla-samples/tree/main/silent-and-offline-be-auth" target=_blank>Check out our sample app <img src="../../images/external-link-light.svg"></a>

:::info Note
For use cases when the user is present, consider implementing [session management for backend authentication](/guides/user/be_manage_sessions.md). For example, you can obtain new access tokens by authenticating a session.
:::

## Step 1: Obtain refresh tokens

In [backend-to-backend integrations](/guides/user/be_auth_overview/), Mosaic returns a refresh token upon successful authentication along with access and ID tokens, and a session ID which should be stored in your application backend. For example:

```json
{
  "access_token": "string",
  "id_token": "string",
  "refresh_token": "string",
  "token_type": "string",
  "expires_in": 3600,
  "session_id": "string"
}
```

## Step 2: Request new access tokens

To continue operating while the user is away, get new access tokens in exchange for a refresh token by sending a POST request to `/auth/token/refresh` endpoint.

```js
import fetch from 'node-fetch';

async function run() {
  const resp = await fetch(
    `https://api.transmitsecurity.io/cis/v1/auth/token/refresh`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer [TOKEN]' // Client access token
      },
      body: JSON.stringify({refresh_token: '[REFRESH_TOKEN]'}) // Refresh token returned in Step 1
    }
  );

  const data = await resp.json();
  console.log(data);
}

run();
```

This call returns a new set of tokens. Since getting a new access token in exchange for a refresh token doesn't affect the session, the session ID isn't returned.

```json
{
  "access_token": "string",
  "id_token": "string",
  "refresh_token": "string",
  "token_type": "string",
  "expires_in": 3600
}
```

## Next steps

By default, refresh tokens are valid for 14 days. The maximum period of time the app can operate in the offline mode without requesting a user to re-authenticate is also 14 days. You can modify the access duration for your client by updating token timeout configuration in the OIDC client's [advanced settings](/guides/user/manage_clients.md#advanced-settings). You can extend or reduce the length of the access token, refresh token, and the maximum rotation time. Alternatively, you can create a custom [resource](/guides/user/resources_overview.md) and target it during authentication. For each resource, the expirations are configured in the [Resource settings](/guides/user/manage_resources#session-management-settings).