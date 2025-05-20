# Login with Apple

## Overview

Sign in with Apple can be used to authenticate users, or create new users based on their email address.

:::attention Note
If you are looking for the backend-to-backend integration, see [Login with Apple (backend-initiated)](/guides/user/be_auth_apple.md).
:::

Here's how it works:
![](../../images/UserID/auth_apple_flow.jpg)

1. User clicks login button, sending request to `/auth/apple` with `client_id` and `redirect_uri`
1. Mosaic redirects to Apple login page, which authenticates user and redirects back to Mosaic.
1. After validating the response, Mosaic redirects back to your `redirect_uri` with a code.
1. Your application sends the code to your backend, which exchanges it for tokens.
1. Upon a successful exchange, the user is logged in.

## Step 1: Set up Apple credentials

From the [Apple Developer Portal](https://developer.apple.com/), set up an app using [Apple's Sign in with Apple documentation](https://developer.apple.com/sign-in-with-apple/get-started/):
- Create a Services ID and associate with your app via App ID. Add `api.transmitsecurity.io/cis` as the Domain and set your Redirect URI to `https://api.transmitsecurity.io/cis/auth/apple/callback` (see [Apple docs](https://developer.apple.com/help/account/configure-app-capabilities/configure-sign-in-with-apple-for-the-web)).
- Generate a Client Secret Signing Key (under **Certificates, Identifiers & Profiles**). Obtain its Key ID and download the key itself (see [Apple docs](https://help.apple.com/developer-account/?lang=en#/dev77c875b7e)).
- Obtain your Apple Team ID (under **Membership Details**)

:::info Note

The Services ID, Key ID, Client Secret Signing Key, and Apple Team ID will be configured later in the Mosaic Admin Portal.

:::

## Step 2: Enable Apple for app

1. Login to the Mosaic Admin Portal
1. Go to **B2C Identity** or **B2B Identity** _based on your setup_ > **Authentication methods**
1. Expand the **Apple** settings.
1. Fill in the Services ID, Client secret signing key, Key ID, and Apple team ID retrieved from Apple in Step 1.

## Step 3: Add redirect URI to app

To redirect back to the redirect\_uri provided in the initial request, it should be registered in your application settings in the Mosaic Admin Portal. From the Admin Portal under **Applications**, click on your application to edit the OIDC client settings and add this URI under **Redirect URIs**.  If you don't already have an application, you'll need to create one first (see [Create application](create_new_application.md)).

:::info Note

Your application settings contain the Client ID and Client Secret for your application, which you'll need for Step 4 and 5.

:::

## Step 4: Initiate Apple login

Use a [request](/openapi/user/social-login/#operation/startAppleAuth) like the one below to initiate an authentication flow using Apple, described in the sequence diagram above. The `create_new_user` parameter will determine if this flow applies to new users, or only to existing ones. If set to `true` (and [public sign-ups](/guides/user/manage_apps/#advanced-settings) are enabled for this application), a new user is created if no user is found for the email returned by Apple in the next step. The `redirect_uri` should correspond to the one added in step 3, and the `client_id` can be found from the Mosaic Admin Portal in the application settings.

:::info Note

Upon successful authentication, the browser will be redirected to the redirect URI along with a code to exchange for tokens in the next step.  For example, if `https://domain.com/verify` is your redirect URI, then Mosaic will redirect to `https://domain.com/verify?code=123abc`. However, if an authentication error occurs after redirecting to Apple, the redirect URI will contain the error instead.

:::

```shell
curl --request GET \
     --url 'https://api.transmitsecurity.io/cis/v1/auth/apple?
     client_id=2eb840f.test.Transmit.io&
     redirect_uri=https://www.example.com/login&
     create_new_user=true' \
     --header 'Accept: application/json'
```
## Step 5: Get user tokens

To exchange the code received from Mosaic for an ID and access token, your server should send a POST request like the one below to the Mosaic [/oidc/token](/openapi/user/oidc/#operation/oidcToken) endpoint. Replace placeholders with the code you received in Step 4, your redirect URI, and your client credentials that can be found in your application settings from the Mosaic Admin Portal.

```shell
curl -i -X POST \
  https://api.transmitsecurity.io/oidc/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d client_id=CLIENT_ID \
  -d client_secret=CLIENT_SECRET \
  -d code=CODE \
  -d grant_type=authorization_code \
  -d redirect_uri=REDIRECT_URI
```