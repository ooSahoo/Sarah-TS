# Secure login with PKCE

[Proof key of code exchange](https://oauth.net/2/pkce/) (PKCE) extends 0Auth 2.0 and adds an extra layer of assurance that the access is granted to the client that originally requested authentication. PKCE enhances security in [OIDC authorization code flow](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth) when used together with Client ID and Secret. Native clients that cannot store a secret may solely rely on PKCE for user authentication.


## How it works

When the user requests to log in, the app generates a random string ([Step 3](#step-3-generate-pkce-code)) and sends its hash (`code_challege`) along with other parameters in the authorization request to Mosaic ([Step 4](#step-4-authorize-user)). Upon authenticating the user, Mosaic redirects back to the Redirect URI with the authorization code. To obtain tokens, the client has to pass this code and PKCE string (`code_verifier`) back to Mosaic ([Step 5](#step-5-get-user-tokens)). Mosaic will only return tokens if `code_verifier` hash corresponds to the hash received in the initial auth request, i.e., PKCE confirms that the client that requests tokens is the same one that initiated authentication. Upon receiving the tokens, the app validates the tokens ([Step 6](#step-6-validate-tokens)).

Below is an example of a login flow leveraging PKCE that can be implemented using the steps in this guide. Mosaic APIs are shown in pink along with the relevant integration step, described below.

![](../../images/UserID/auth_oidc_pkce.png)


## Step 1: Set up login method

Before you add login to your application, set up the login method you plan to use by completing the provider-specific setup, as described in these dedicated guides:

- [Google](/guides/user/auth_google/): Set up Google credentials and consent screen using steps 1-3
- [Apple](/guides/user/auth_apple/): Set up Apple credentials using steps 1-2
- [Facebook](/guides/user/auth_facebook/): Set up Facebook credentials using steps 1-2
- [LINE](/guides/user/auth_line/): Set up LINE credentials using steps 1-2
- [Authentication Hub](/guides/user/authentication_hub.md): Set up an app using step 1
- [Hosted login](/guides/user/hosted_login_quick_start/)

Alternatively, you can use the [SSO Service](/guides/user/SSO_orchestration/SSO_overview.md) by Mosaic.

## Step 2: Configure PKCE settings

Mosaic provides certain flexibility when it comes to the usage of PKCE. Configure PKCE settings for each client in your application or SSO Service.

:::info Note
If you don't already have a client set up in your application or SSO Service, you'll need to create one first and register the redirect URI in its settings.

- For pure OIDC implementation: from the Admin Portal under **Applications**, click your application and proceed to the client settings.

- If using SSO Service: from the Admin Portal under **SSO and Federation**, navigate to **Configuration** > **Client groups**  and proceed to the client settings.

:::

Select one of the following PKCE settings:

- **Allow PKCE alongside client credentials**: (default) allows auth requests with and without PKCE, provided that they use client credentials
- **Enforce PKCE alongside client credentials**: requires all authentication requests to include PKCE in addition to client credentials
- **Enforce PKCE instead of client credentials**: retrieves user access tokens only. For security reasons, Mosaic doesn't recommend using PKCE as a standalone method for authenticating users without the Client Secret.


## Step 3: Generate PKCE code

To support PKCE flow, implement a mechanism for generating random strings and hashing. Whenever a user requests to log in, generate a string, store it as `code_verifier` along with other session details, and generate its hash (known as `code_challenge`). Both a string and its hash are used as PKCE parameters to prove the origin of the request. For details, see [RFC 7636: Proof key of code exchange](https://datatracker.ietf.org/doc/html/rfc7636#section-4).

## Step 4: Authorize user

Authorize the user by sending a GET request to `/oidc/auth`, which initiates an [OIDC authorization code flow](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth). The request should include PKCE parameters: `code_challenge` and `code_challenge_method`. This returns an authorization code to your redirect URI upon successful authentication; otherwise, an error.

Here are some basic parameters of the OIDC authorization request with PKCE (see [OIDC API Reference](/openapi/user/oidc)):

<div>

|Field |Description
|--- |--- |
|`client_id` |Client ID. Can be obtained from client settings in the Mosaic Admin Portal.
|`scope` |Scopes of the access (as a space-delimited string). May include `openid` (required), `offline_access` (to allow refreshing access tokens), `email`, and `phone`.
|`prompt` | (Optional) Determines if to force re-authentication for every login (`login`) and/or to obtain user consent (`consent`) which is required for offline access.
|`response_type` |Should be set to `code` for an authorization code flow
|`redirect_uri` |Redirect URI configured in Step 2 that will receive the authorization code (or error)
|`code_challenge` |A hashed value of `code_verifier` string created in Step 3
|`code_challenge_method` |Hashing mechanism used to transform `code_verifier`, such as S256

</div>

Below is a sample OIDC request with PKCE that starts authentication with hosted experience:

```shell
// Line breaks and spaces were added for readability
  https://api.transmitsecurity.io/cis/oidc/auth?
    client_id=CLIENT_ID&
    scope=openid&
    prompt=consent&
    response_type=code&
    redirect_uri=REDIRECT_URI&
    code_challenge=HASHED_CODE_VERIFIER&
    code_challenge_method=S256

```

## Step 5: Get user tokens

The authorization code returned to your redirect URI upon successful authentication should be passed to your app backend. Your server can exchange this code for an ID and access token by sending a POST request like the one below to the `/oidc/token` endpoint. The request should include the PKCE parameter `code_verifier` created in [Step 3](#step-3-generate-pkce-code). Mosaic will compute the `code_verifier` hash and issue tokens only if it matches the `code_challenge` sent in [Step 4](#step-4-authorize-user).

|Field |Description
|--- |--- |
|`code` |Authorization code received in Step 4.
|`client_id` |Client ID. Can be obtained from client settings in the Mosaic Admin Portal.
|`client_secret` |Client secret. Can be obtained from client settings in the Mosaic Admin Portal.
|`grant_type` |Should be set to `authorization_code` for an authorization code flow
|`redirect_uri` |Redirect URI that received the authorization code
|`code_verifier` |PKCE string generated by your app in Step 3

```shell
curl -i -X POST \
  https://api.transmitsecurity.io/oidc/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d client_id=CLIENT_ID \
  -d client_secret=CLIENT_SECRET \
  -d code=CODE \
  -d grant_type=authorization_code \
  -d redirect_uri=REDIRECT_URI \
  -d code_verifier=PKCE_CODE
```

:::warning Unauthorized requests for native clients
To support unauthorized requests, i.e., requests that don't include Client Secret, make sure your client PKCE settings are set to **Enforce PKCE instead of client credentials**.
:::

## Step 6: Validate tokens

The `/oidc/token` response includes an ID token with user profile data, and a user access token. These tokens must be validated as described [here](/guides/user/validate_tokens/). Validate the token signatures using the public key retrieved from this request:

```shell
curl -i -X GET \
  'https://api.transmitsecurity.io/cis/oidc/jwks'
```

:::info Note

Cache a response returned by `/oidc/jwks` for further reuse to avoid reaching API rate limits and prevent latency issues. Signing keys don't change often. Yet, if token validation fails due to a signature mismatch, try updating the cache first and then revalidating the token signature.

:::

## Step 7: Refresh access tokens


If the app has to keep operating on the user's behalf after the user has left, you can obtain a user access token using the refresh token, i.e., to extend access of the logged-in users when the access token has expired. Both of these tokens are returned upon successful authentication (if `offline_access` is requested). To do this, send a POST request to the  `/oidc/token` endpoint, along with the following parameters:

|Field |Description
|--- |--- |
|`client_id` |Client ID. Can be obtained from client settings in the Mosaic Admin Portal.
|`client_secret` |Client secret. Can be obtained from client settings in the Mosaic Admin Portal.
|`grant_type` |Should be set to `refresh_token`
|`refresh_token` |Refresh token associated with the access token you want to refresh
|`code_verifier` |PKCE string generated by your app in Step 3


```shell
curl -i -X POST \
https://api.transmitsecurity.io/oidc/token \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d grant_type=refresh_token \
-d client_id=CLIENT_ID \
-d client_secret=CLIENT_SECRET \
-d refresh_token=REFRESH_TOKEN \
-d code_verifier=PKCE_CODE
```

:::info Note
Alternatively, you can obtain a new access token by [silently authenticating](/guides/user/sso_across_apps/#step-1-request-silent-auth) a user.
:::


<style>
    section article ol li {
        margin-top: 6px !important;
    }

    th {
      min-width: 220px;
    }
</style>