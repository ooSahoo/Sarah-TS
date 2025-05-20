---
exclude: true
---

# Getting started

Get to know Mosaic by quickly setting up a passwordless authentication flow using secured, WebAuthn-based biometrics. The experience is fully hosted and seamless—no usernames or passwords, only their device.

## Step 1: Add authentication route
Upon successful authentication, Mosaic redirects to your authentication endpoint. This should be an endpoint in your backend server that accepts a `code` query parameter. It will be used to
complete the login flow by exchanging the code it receives for the user identity. For example, if `https://domain.com/login` is your redirect URI, we'll redirect to `https://domain.com/login?code=123abc`.

## Step 2: Create your app
To integrate with Mosaic, you'll need to create an application from the [Admin Portal](https://portal.transmitsecurity.io/). It will configure some basic settings used for authentication. If you don't already have a tenant, [contact us](mailto:info@transmitsecurity.com) and we'll set you up for free.
1. From **Applications**, click **Add application**.
2. Add the friendly application name to display in the Admin Portal.
3. Add a logo and client display name to display on the login screens.
4. Add the authentication route configured in Step 1 as an allowed redirect URI.
5. Enable public sign-ups to allow guests to register by selecting **Allow registration** under **Public sign-up**.

:::info Note
Application ID, Client ID, and Client Secret are automatically generated. You'll need the client credentials to obtain access tokens used to authorize Mosaic API requests.
:::

## Step 3: Customize experience
No setup is required to start using WebAuthn for secure biometric authentication. But if you want to customize the authentication experience, you can do this from **B2C** or **B2B Identity** (based on your setup) > **Authentication methods** > **Passkeys **Passkeys (WebAuthn)**.

## Step 4: Initiate login

Send the [/auth/webauthn](/openapi/user/webauthn-hosted/#operation/startBindIdAuth) request below to initiate a login flow. Since `create_new_user` is enabled (and public sign-ups are enabled for this application), a new user will be created if the user isn't already registered. This allows frictionless onboarding of new users, such as when signing up users to a retail app. The `redirect_uri` should correspond to the one added in step 2, and the `client_id` can be found in the Mosaic Admin Portal in your application settings.
Upon successful authentication, a code will be returned to the route you created in step 1.

```shell
curl --request GET \
     --url 'https://api.transmitsecurity.io/cis/v1/auth/webauthn?
     client_id=2eb840f.test.Transmit.io&
     redirect_uri=https://www.example.com/login&
     create_new_user=true' \
     --header 'Accept: application/json'
```
## Step 5: Authenticate user
To complete the login flow, your server backend should now send the [/oidc/token](/openapi/user/oidc/#operation/oidcToken) request like the one below. Replace placeholders the code you received in step 4, your client credentials, and redirect URI. This will return user tokens that identify the user and their authorization.

```shell
curl --location --request POST 'https://api.transmitsecurity.io/oidc/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'code=CODE' \
--data-urlencode 'client_id=CLIENT_ID' \
--data-urlencode 'client_secret=CLIENT_SECRET' \
--data-urlencode 'grant_type=authorization_code' \
--data-urlencode 'redirect_uri=REDIRECT_URI'
```

## What's next?
Now that you've authenticated your users with a WebAuthn Hosted authentication, you can view and manage their profiles using our [User Management API](/openapi/user/user/) or from the **Users** page of your Admin Portal.

Learn more about our [authentication](/guides/user/auth_overview.md), [identity management](/guides/user/identity_mgmt_overview.md) and [account protection](/guides/risk/overview.md) capabilities.