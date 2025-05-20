---
toc:
  maxDepth: 2
---

# Verify email using OTP

## Overview

Email OTPs can be sent to users in order to verify their email address.  For example, this can be used to enrich the profile of existing users that are already logged in. Once the email verification is completed, the email address will be added to the user profile and marked as verified. Unlike the authentication flows, users will not be authenticated (or created) and no tokens will be returned.

![](../../images/UserID/verify_email_otp_flow.png)

## Step 1: Send email passcode

Use a [send request](/openapi/user/verification/#operation/sendVerificationEmailOtp) like the one below to send the email OTP to the specified email address. This flow is described in the sequence diagram above.

:::info Note

This flow requires an existing, logged-in user. So make sure you have a valid user access token (returned upon successful authentication) to authorize the request.

:::

```shell
curl -i -X POST \
  https://api.transmitsecurity.io/cis/v1/verification/otp/email/send \
  -H 'Authorization: Bearer 91827321837bdfjf' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "name@example.com"
    }'
```

If you want to customize the email, see [Next steps](#next-steps).

## Step 2: Validate email passcode

Validate the email OTP entered by the user using a [validation request](/openapi/user/verification/#operation/verifyEmailOtp) like the one below. Once validated, the email address will be added to the user profile and marked as verified. Since this flow is intended for existing users that are logged in, the user won't be authenticated (or created) and no tokens will be returned.

```shell
curl -i -X POST \
https://api.transmitsecurity.io/cis/v1/verification/otp/email/validate \
 -H 'Authorization: Bearer 1827321837bdfjf' \
 -H 'Content-Type: application/json' \
 -d '{
 "email": "name@example.com",
 "passcode": "<PASSCODE>"
  }'
```

## Next steps

Once you've completed a basic integration, here are some customizations you can consider:

- [Email customization](#email-customization)
- [OTP settings](#otp-settings)

### Email customization

The default email template can be customized either from the Admin Portal or via API (but not both).

From the Admin Portal (**B2C** or **B2B Identity** _based on your setup_ > **Authentication methods** > **One Time Passcodes**), you can customize the subject, text and appearance of the email containing the OTP. The email message will use the application's logo and name. See the screenshot below for the default texts.

To customize the email content, use the `email_content` object in the [send request](/openapi/user/verification/#operation/sendVerificationEmailOtp), for example:

```shell
curl --request POST \
https://api.transmitsecurity.io/cis/v1/verification/links/email \
 -H 'Accept: application/json' \
 -H 'Authorization: Bearer 91827321837bdfjf' \
 -H 'Content-Type: application/json' \
 -d '{
    "email_address": "user@email.com",
    "email_content": {
        "subject": "Verify",
        "primaryColor": "#6981FF",
        "base64logo": "data:image/png;base64,iVBORw0KGgoAA...XEzGmCC",
        "headerText": "Verify your email",
        "bodyText": "Use this code to verify. This code will expire in 5 minutes.",
        "infoText": "Confirming this request will securely verify your email",
        "footerText": "If you didn'\''t request this email, you can safely ignore it."
    }
}'

```
:::info Note

If you pass the `email_content` object, all the email branding will be taken from there and the default template won't be used at all. This means that if a field is not specified, it will be treated as empty.

:::

Here's a screenshot of the email verification template with its customizable field names:

![](../../images/UserID/email_otp_verif_view.png)

### OTP settings

From the **Admin Portal** ( **B2C** or **B2C Identity** _based on your setup_ > **Authentication methods** > **One-time passcodes**), you can configure the OTP policy for your app:

- **Expiration time**: set the OTP expiration period in minutes.
- **Failed attempts lockout policy**: set the number of failed login attempts that trigger a temporary user lockout and specify the lockout duration in minutes.
- **Code length**: set the length of the one-time code.

Make sure to apply the changes to the relevant application by selecting it from the top of the page.