# Login with LINE

## Overview

LINE Login can be used to authenticate users, or create new users based on their LINE account.

Here's how it works:
![](../../images/UserID/auth_line_flow.jpg)

1. User clicks login button, sending request to `/v1/auth/line` with `client_id` and `redirect_uri`
1. Mosaic redirects to LINE login page, which authenticates user and redirects back to Mosaic.
1. After validating the response, Mosaic redirects back to your `redirect_uri` with a code.
1. Your application sends the code to your backend, which exchanges it for a token.
1. Upon a successful exchange, the user is logged in.

## Step 1: Set up LINE credentials

From the [LINE Developers Console](https://developers.line.biz/console/), you'll need the following:
- LINE account and [Line Login channel](https://developers.line.biz/en/docs/line-login/getting-started/#step-1-create-channel) for your app, if you don't already have them
- **Callback URL** set to `https://api.transmitsecurity.io/cis/auth/line/callback` as described [here](https://developers.line.biz/en/docs/line-login/integrate-line-login/#setting-callback-url)
- Applied **Email address permission** as described [here](https://developers.line.biz/en/docs/line-login/integrate-line-login/#applying-for-email-permission)
- **LINE Login Channel ID** and **Line Login Channel Secret**

:::info Note

The LINE Login Channel ID and Channel Secret will be configured later in the Mosaic Admin Portal.

:::

## Step 2: Enable LINE for app

1. Login to the Mosaic Admin Portal
1. Go to **B2C** or **B2B Identity** _based on your setup_ > **Authentication methods**
1. Expand the **LINE** settings.
1. Fill in client ID and client secret using the LINE Login Channel ID and Channel Secret retrieved from LINE in Step 1.

## Step 3: Add redirect URI to app

To redirect back to the redirect\_uri provided in the initial request, it should be registered in your application settings in Mosaic Admin Portal. From the Admin Portal under **Applications**, click on your application to edit your application settings and add this URI under **Redirect URIs**.  If you don't already have an application, you'll need to create one first (see [Create application](create_new_application.md)).

:::info Note

Your application settings contain the Client ID and Client Secret for your application, which you'll need for Step 4 and 5.

:::

## Step 4: Initiate LINE login

Use a [request](/openapi/user/social-login/#operation/startLineAuth) like the one below to initiate an authentication flow using LINE, described in the sequence diagram above. The `create_new_user` parameter will determine if this flow applies to new users, or only to existing ones. If set to `true` (and [public sign-ups](/guides/user/manage_apps/#advanced-settings) are enabled for this application), a new user is created if no user is found for the email returned by LINE in the next step. The `redirect_uri` should correspond to the one added in step 3, and the `client_id` can be found from the Mosaic Admin Portal in the application settings.

:::info Note

Upon successful authentication, the browser will be redirected to the redirect URI along with a code to exchange for tokens in the next step.  For example, if `https://domain.com/verify` is your redirect URI, then Mosaic will redirect to `https://domain.com/verify?code=123abc`. However, if an authentication error occurs after redirecting to LINE, the redirect URI will contain the error instead.

:::

```shell
curl --request GET \
     --url 'https://api.transmitsecurity.io/cis/v1/auth/line?
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
