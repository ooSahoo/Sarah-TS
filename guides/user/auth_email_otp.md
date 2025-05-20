---
toc:
  maxDepth: 2
---
# Login with email OTP

## Overview

One-time passcodes (OTPs) can be sent to users by email in order to authenticate existing users or create new users.

<a href="https://github.com/TransmitSecurity/ciam-expressjs-vanilla-samples/tree/main/login-with-email" target=_blank>Check out our sample app <img src="../../images/external-link-light.svg"></a>

![](../../images/UserID/auth_email_otp_flow.png)

## Step 1: Create redirect URI

Create the redirect endpoint that will receive an authorization code once the email OTP is validated. This code will later be exchanged for an ID and access token. The redirect URI should accept `code` as a query parameter. For example, if `https://domain.com/verify` is your redirect URI, Mosaic will return `https://domain.com/verify?code=123abc` when the OTP is validated.

## Step 2: Add redirect URI to app

Add the redirect URI (e.g., `https://domain.com/verify`) as an allowed redirect URI for your Mosaic application. This will also be the `redirect_uri` that you'll need to pass in the send request.

From the Admin Portal under **Applications**, click on your application to edit your application settings and add this URI under **Redirect URIs**.  If you don't already have an application, [create a new application](create_new_application.md).

## Step 3: Send email OTP

Use a [send request](/openapi/user/one-time-login/#operation/sendEmailOtp) like the one below to send an OTP to the specified email address. The `create_new_user` parameter will determine if this flow applies to new users, or only to existing ones. If set to `true` (and [public sign-ups](/guides/user/manage_apps/#advanced-settings) are enabled for this application), a new user is created once the code is exchanged if no user is found for the specified email address. The `redirect_uri` should correspond to the redirect endpoint you created in step 1 and added as a redirect URI in step 2.

This flow is described in the sequence diagram above.

:::info Note

Make sure you have a valid client access token to authorize the request. If not, you'll need to get one. [Learn more](retrieve_client_tokens.md)

:::

```shell
curl -i -X POST \
  https://api.transmitsecurity.io/cis/v1/auth/otp/email \
  -H 'Authorization: Bearer 91827321837bdfjf' \
  -H 'Content-Type: application/json' \
  -d '{
        "email": "name@example.com",
        "redirect_uri": "https://domain.com/verify",
        "create_new_user": true
      }'
```

If you want to customize the email, see [Next steps](#next-steps).

## Step 4: Validate email OTP

Once the user enters the email OTP they received, it should be validated by sending a [validation request](/openapi/user/one-time-login/#operation/validateEmailOtp) like the one below. This endpoint validates the passcode against the specified email address. If successful, a response returns a URI in the `result` field&mdash;your client should send a GET request to this URI to get forwarded to your redirect URI with the code that you should exchange for the token in the next step.

```shell
curl --request POST \
     --url https://api.transmitsecurity.io/cis/v1/auth/otp/email/validation \
     --header 'Authorization: Bearer 91827321837bdfjf' \
     --header 'Content-Type: application/json' \
     --data '
{
     "email": "name@example.com",
     "passcode": "123456"
}
'
```
## Step 5: Obtain user token

Upon sending a GET request to the URI returned by the email OTP validation endpoint, the browser is redirected to the redirect URI specified in send request. The URI will include a code in the query that you'll need to exchange for ID and access tokens by sending a [/oidc/token](/openapi/user/oidc/#operation/oidcToken) request like the one below. Replace placeholders with the code you received in Step 4, your redirect URI, and your client credentials that can be found in your application settings from the Mosaic Admin Portal.


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

## Next steps

Once you've completed a basic integration, here are some customizations you can consider:

- [Email customization](#email-customization)
- [OTP settings](#otp-settings)

### Email customization

The following default email templates can be customized either from the Admin Portal or via API (but not both):
- **Sign up**: sent to log in a user for the first time (if you allow auth flows to create new users)
- **Login**: sent to log in an existing user

From the Admin Portal (**B2C** or **B2C Identity** _based on your setup_ > **Authentication methods** > **One-time passcodes**), you can customize the color of the email address that appears in the message of the default templates. The email message will use the application's logo and name. See the screenshots below for the default texts.

To customize the email subject, text and appearance, use the `email_content` object in the [send request](/openapi/user/one-time-login/#operation/sendEmailOtp), for example:

```shell
curl -i -X POST \
  https://api.transmitsecurity.io/cis/v1/auth/otp/email \
    -H 'Authorization: Bearer 91827321837bdfjf' \
  -H 'Content-Type: application/json' \
  -d '{
        "email": "name@example.com",
        "redirect_uri": "https://acme.com/verify",
        "create_new_user": true,
        "email_content": {
          "subject": "Sign up to Acme",
          "base64logo": "data:image/png;base64,iVBORw0KGgoAA...XEzGmCC",
          "headerText": "Let'\''s sign you up",
          "bodyText": "Use this code to sign up to Acme",
          "infoText": "The code will securely sign you up",
          "footerText": "If you didn'\''t request this email, you can safely ignore it."
     }
      }'
```
:::info Note

If you pass the `email_content` object, all the email branding will be taken from there and the default template won't be used at all. This means that if a field is not specified, it will be treated as empty.

:::

Here are screenshots of the email templates with their customizable field names:

![](../../images/UserID/email_field_mapping_otp_login.png)

![](../../images/UserID/email_field_mapping_otp_signup.png)

### OTP settings

From the **Admin Portal** ( **B2C** or **B2C Identity** _based on your setup_ > **Authentication methods** > **One-time passcodes**), you can configure the OTP policy for your app:

- **Expiration time**: set the OTP expiration period in minutes.
- **Failed attempts lockout policy**: set the number of failed login attempts that trigger a temporary user lockout and specify the lockout duration in minutes.
- **Code length**: set the length of the one-time code.