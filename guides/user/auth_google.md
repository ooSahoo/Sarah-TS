# Login with Google

## Overview

Google Sign-In can be used to authenticate users, or create new users based on their email address.

:::attention Note
If you are looking for the backend-to-backend integration, see [Login with Google (backend-initiated)](/guides/user/be_auth_google.md).
:::


![](../../images/UserID/auth_google_flow.jpg)

Here's how it works:
1. User clicks the login button, sending a request to `/auth/google` with `client_id` and `redirect_uri`
1. Mosaic redirects to the Google login page, which authenticates the user and redirects back to Mosaic.
1. After validating the response, Mosaic redirects back to your `redirect_uri` with a code.
1. Your application sends the code to your backend, which exchanges it for token.
1. Upon a successful exchange, the user is logged in.

## Step 1: Set up Google Project

Follow the [Get your Google API client](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid) guide to get your Google **client_id** and **client_secret**. You will also need to set your [redirect URI](https://developers.google.com/identity/protocols/oauth2/openid-connect) to `https://api.transmitsecurity.io/cis/auth/google/callback`.

For more details on how to create a new project, [click here](https://support.google.com/googleapi/answer/6251787?ref_topic=7014522#zippy=%2Ccreate-a-project).

## Step 2: Configure consent screen

The Google consent screen tells users that the application is requesting access to their data, what kind of data, and the terms that apply.

1. Open the [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent) page of the Google API console.
1. If prompted, select the project you just created.
1. Select **User Type** (described below) and click **Create**.

![](../../images/UserID/auth_google_consent_screen.jpg)

:::info User Types

Internal means your app is limited to Google Workspace users within your Google workspace. You can communicate with your internal users directly about how you'll use their data. In order to choose ‘Internal’ your project must be part of Google Workspace.

External means your app will only be available to users you add to the list of test users. Once your app is ready to publish, you may need to verify your app. In most cases, you will need to choose external.

[Learn more about user type](https://support.google.com/cloud/answer/10311615#user-type)

:::

4. Fill in your application data.

5. Click **Save** and continue in the scopes and test user screens without any changes.

:::info Note

To move to **In Production** status, you're required to verify your app. [Learn more](https://support.google.com/cloud/answer/10311615?hl=en&ref_topic=3473162#verification-status)

:::

## Step 3: Enable Google for app

1. Login to the Mosaic Admin Portal
1. Go to **B2C** or **B2B Identity** _based on your setup_ > **Authentication methods**
1. Expand the **Google** settings.
1. Fill in the client ID and client secret retrieved from Google in Step 1

## Step 4: Add redirect URI to app

To redirect back to the redirect\_uri provided in the initial request, it should be registered in your application settings in Mosaic Admin Portal. From the Admin Portal under **Applications**, click on your application to edit your OIDC client settings and add this URI under **Redirect URIs**.  If you don't already have an application, you'll need to create one first (see [Create application](create_new_application.md)).

:::info Note

Your application settings contain the Client ID and Client Secret for your application, which you'll need for Step 5 and 6.

:::

## Step 5: Initiate Google login

Use a [request](/openapi/user/social-login/#operation/startGoogleFlow) like the one below to initiate an authentication flow using Google, described in the sequence diagram above. The `create_new_user` parameter will determine if this flow applies to new users, or only to existing ones. If set to `true` (and [public sign-ups](/guides/user/manage_apps/#advanced-settings) are enabled for this application), a new user is created if no user is found for the email returned by Google in the next step. The `redirect_uri` should correspond to the one added in step 4, and the `client_id` can be found from the Mosaic Admin Portal in the application settings.

:::info Note

Upon successful authentication, the browser will be redirected to the redirect URI along with a code to exchange for tokens in the next step. For example, if `https://domain.com/verify` is your redirect URI, then Mosaic will redirect to `https://domain.com/verify?code=123abc`. However, if an authentication error occurs after redirecting to Google, the redirect URI will contain the error instead.

:::

```shell
curl --request GET \
     --url 'https://api.transmitsecurity.io/cis/v1/auth/google?
     client_id=2eb840f.test.Transmit.io&
     redirect_uri=https://www.example.com/login&
     create_new_user=true' \
     --header 'Accept: application/json'
```
## Step 6: Get user tokens

To exchange the code received from Mosaic for an ID and access token, your server should send a POST request like the one below to the Mosaic [/oidc/token](/openapi/user/oidc/#operation/oidcToken) endpoint. Replace placeholders with the code you received in Step 5, your redirect URI, and your client credentials that can be found in your application settings from the Mosaic Admin Portal.

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
