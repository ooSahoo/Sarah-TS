---
toc:
  maxDepth: 2
---

# Login with Email OTP

One-time passcodes (OTPs) can be sent to users by email in order to authenticate existing users.

<a href="https://github.com/TransmitSecurity/ciam-expressjs-vanilla-samples/tree/main/login-with-be-email" target=_blank>Check out our sample app <img src="../../images/external-link-light.svg"></a>

:::attention Note
This implements a backend-to-backend integration for authentication. See [Backend Authentication APIs](/openapi/user/backend-one-time-login/#operation/sendOTP).
:::

## How it works

Here's an example of an email OTP integration. Mosaic APIs are shown in pink along with the relevant integration step.

![](../../images/UserID/be_auth_email_otp_flow.png)

## Before you start

Before you start your integration, you'll need a Mosaic application with an OIDC client. See [create an application](create_new_application.md).

:::info Note:
When creating an application, **Redirect URIs** is a required field. This flow doesn't use a redirect URI so you can simply add your website URL (e.g., `https://your-domain.com`).

:::

## Step 1: Sign up users

Before you can log in users into your app, they will need to be created in your Mosaic tenant and associated with your app. New users can be created using a POST [/users](/openapi/user/user/#operation/createUser) request, which must include the user's email address. If the user already exists in your Mosaic tenant but isn't yet associated with your app, this request will just add the user to your app (but won't update any other details).

:::info Note:
- You'll need a valid client access token to authorize the request. See [Get client access tokens](retrieve_client_tokens.md).
- The user's email address will marked as verified upon their first email-based authentication.

:::

## Step 2: Send email OTP

Use a backend [send request](/openapi/user/backend-one-time-login/#operation/sendOTP) like the one below to send an email OTP to the user's email. To customize the email, see [Next steps](#next-steps). If the request succeeds, an OTP is sent to the user's email and a 200 response is returned.

:::info Note

- You'll need a valid client access token to authorize the request. See [Get client access tokens](retrieve_client_tokens.md).
- The example below identifies the user using their email, but other identifier types can be used instead (phone number, user ID, or username).

:::

```js
import fetch from 'node-fetch';

async function run() {
  const resp = await fetch(
    `https://api.transmitsecurity.io/cis/v1/auth/otp/send`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer [ACCESS_TOKEN]' // Client access token
      },
      body: JSON.stringify({
        channel: 'email',
        identifier_type: 'email', // User is identified by email (other options available)
        identifier: '[EMAIL]' // User's email address (unless another type is used)
      })
    }
  );

  const data = await resp.json();
  console.log(data);
}

run();
```

## Step 3: Authenticate email OTP

Once the user enters the OTP they received, your client should send it to your app backend so it can be used to obtain user tokens. Create your backend endpoint that will receive this code and then send an [OTP auth](/openapi/user/backend-one-time-login/#operation/authenticateOTP) request like the one below. If successful, a 200 response will be returned with the user tokens, which should be validated as described [here](/guides/user/validate_tokens/).

:::info Note

You'll need a valid client access token to authorize the request. See [Get client access tokens](retrieve_client_tokens.md).

:::

```js
import fetch from 'node-fetch';

async function run() {
  const resp = await fetch(
    `https://api.transmitsecurity.io/cis/v1/auth/otp/authenticate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer [ACCESS_TOKEN]' // Client access token
      },
      body: JSON.stringify({
        passcode: '[OTP]', // OTP entered by the user
        identifier_type: 'email', // Same as the type in the send request
        identifier: '[EMAIL]' // Same as the identifier in the send request
      })
    }
  );

  const data = await resp.json();
  console.log(data);
}

run();
```
Here's an example of a successful response:

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


## Next steps

Once you've completed a basic integration, here are some customizations you can consider:

- [Email customization](#email-customization)
- [OTP settings](#otp-settings)
- [Custom email provider](#custom-email-provider)
- [Security considerations](#security-considerations)

### Email customization

The default email template for **Login** can be customized either from the Admin Portal or via API (but not both). From the Admin Portal (**B2C** or **B2C Identity** _based on your setup_ > **Authentication methods** > **One-time passcodes**), you can customize the color of the email address that appears in the message. The email message will use the application's logo and name (see screenshot below). The subject, text and appearance can also be customized using the `email_content` object in the [send request](/openapi/user/backend-one-time-login/#operation/sendMagicLinkEmail!path=email_content&t=request).

:::info Note

If you pass the `email_content` object, all the email branding will be taken from there and the default template won't be used at all. This means that if a field is not specified, it will be treated as empty.

:::

Here is a screenshot of the email templates with their customizable field names:

![](../../images/UserID/email_field_mapping_otp_login.png)

### OTP settings

From the **Admin Portal** ( **B2C** or **B2C Identity** _based on your setup_ > **Authentication methods** > **One-time passcodes**), you can configure the OTP policy for your app:

- **Expiration time**: set the OTP expiration period in minutes.
- **Failed attempts lockout policy**: set the number of failed login attempts that trigger a temporary user lockout and specify the lockout duration in minutes.
- **Code length**: set the length of the one-time code.

### Custom email provider

In the Admin Portal (from **Settings** > **Email Provider**), you can configure to use your custom email provider (e.g., SMTP or SendGrid) instead of the Mosaic default.

### Security considerations

To secure your OTP implementation, here are some recommendations.

:::attention Guidelines

- Verify the user's email address upon sign up. For example, perform a magic link authentication as part of the onboarding flow (after creating the user in Transmit).
- To prevent credential harvesting, your backend shouldn't indicate to the client if the user wasn't found.

:::