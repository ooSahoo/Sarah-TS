---
toc:
  maxDepth: 2
---

# Verify phone using SMS OTP

## Overview

One-time passcodes can be sent to users by SMS in order to verify their phone number.  For example, this can be used to enrich the profile of existing users that are already logged in. Once the SMS passcode is validated, the phone number will be added to the user profile and marked as verified. Unlike the authentication flows, users will not be authenticated (or created) and no tokens will be returned.

![](../../images/UserID/verify_sms_otp_flow.jpg)

## Step 1: Send SMS passcodes

Use a [send request](/openapi/user/verification/#operation/sendVerificationSmsOtp) like the one below to send an SMS OTP to the specified phone number. This flow is described in the sequence diagram above.

:::info Note

This flow requires an existing, logged-in user. So make sure you have a valid user access token (returned upon successful authentication) to authorize the request.

:::

```shell
curl --request POST \
     --url https://api.transmitsecurity.io/cis/v1/verification/otp/sms/send \
     --header 'Accept: application/json' \
     --header 'Authorization: Bearer 91827321837bdfjf' \
     --header 'Content-Type: application/json' \
     --data '
{
     "phone_number": "+15125555555"
}
'
```
## Step 2: Validate SMS passcodes

Validate the SMS OTP entered by the user using a [validation request](/openapi/user/verification/#operation/verifySmsOtp) like the one below. Once validated, the phone number will be added to the user profile and marked as verified. Since this flow is intended for existing users that are logged in, the user won't be authenticated (or created) and no tokens will be returned. This flow is described in the sequence diagram above.

```shell
curl --request POST \
     --url https://api.transmitsecurity.io/cis/v1/verification/otp/sms/validate \
     --header 'Accept: application/json' \
     --header 'Authorization: Bearer 91827321837bdfjf' \
     --header 'Content-Type: application/json' \
     --data '{
         "passcode": "123456",
         "phone_number": "+15125555555"
     }
'
```
## Next steps

Once you've completed a basic integration, here are some customizations you can consider:

- [SMS customization](#sms-customization)
- [OTP settings](#otp-settings)
- [Custom SMS provider](#custom-sms-provider)

### SMS customization

To create a custom SMS message, use the `custom_message` field in the [send request](/openapi/user/verification/#operation/sendVerificationSmsOtp), which must include these placeholders:
- `{app}` which will be replaced with your app name and prevent phishing attacks
- `{otp}` which will be replaced with the code

You can also specify the `sender_id`, which is the name of the message sender (see [limitations](/openapi/user/verification/#operation/sendVerificationSmsOtp)).

Here's an example of a request that includes a custom SMS message:

```js
import fetch from 'node-fetch';

async function run() {
  const resp = await fetch(
    `https://api.transmitsecurity.io/cis/v1/verification/otp/sms/send`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer [USER_ACCESS_TOKEN]' // User must be logged in
      },
      body: JSON.stringify({
        custom_message: 'Your {app} verification code is: {otp}', // Example
        sender_id: 'ACME', // Example
        phone_number: '[PHONE_NUMBER]' // The phone number to send the code to
      })
    }
  );

  const data = await resp.json();
  console.log(data);
}

run();

```

### OTP settings

From the **Admin Portal** ( **B2C** or **B2C Identity** _based on your setup_ > **Authentication methods** > **One-time passcodes**), you can configure the OTP policy for your app:

- **Expiration time**: set the OTP expiration period in minutes.
- **Failed attempts lockout policy**: set the number of failed login attempts that trigger a temporary user lockout and specify the lockout duration in minutes.
- **Code length**: set the length of the one-time code.


### Custom SMS provider

In the Admin Portal (from **Settings** > **SMS Provider**), you can configure to use Twilio as your SMS provider instead of the Mosaic default. For example, this allows you to customize the sender name per country. For more, see [Use custom SMS providers](/guides/user/use_custom_sms_provider.md).