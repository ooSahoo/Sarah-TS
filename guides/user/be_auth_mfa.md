# Use multi-factor authentication

Multi-factor authentication (MFA) allows you to securely identify users using more than one factor. For example, users that logged-in using password can be required to authenticate using their email or phone when they request to perform a more sensitive action.

<a href="https://github.com/TransmitSecurity/ciam-expressjs-vanilla-samples/tree/main/login-with-be-mfa" target=_blank>Check out our sample app <img src="../../images/external-link-light.svg"></a>

:::attention Note
This describes how to implement MFA using a backend-to-backend integration for authentication. See [ APIs](/openapi/user/backend-one-time-login/#operation/sendOTP).
:::

## How it works

MFA requires users to authenticate using 2 different factors within the same session. To satisfy MFA, the session must include at least 2 authentications, such as email OTP, email magic link, or SMS OTP. For security reasons, Mosaic suggests implementing the second must be based on SMS if the first authentication is based on email (and vice versa).

Backend-to-backend MFA is evaluated in the context of a session, which is created upon successfully completing a backend authentication. Additional authentications are added to an existing session if the session is specified in the request. These sessions are terminated upon expiration or logout.

## Setup

When implementing MFA using backend authentication, the APIs themselves don't actually enforce it. They allow you to add multiple authentications to the same session, and check if MFA has been satisfied whenever an authentication is completed. This enables your application to implement logic that enforces MFA as needed.

In addition to the basic authentication flow, implementing MFA requires you to:
1. [Implement a second factor](#implement-factors)
1. [Manage sessions](#manage-sessions)
1. [Check for MFA](#check-for-mfa)

### Implement factors

You'll need to implement 2 different backend authentication methods that can be used to satisfy MFA as described above. The second-factor authentication must use one of these methods:
- [Email OTP](/guides/user/be_auth_email_otp/)
- [SMS OTP](/guides/user/be_auth_sms_otp/)
- [Email magic link](/guides/user/be_auth_email_magic_link/)

:::info Note
MFA requires a user to have a verified email or phone number (or both, depending on which method you use as the first factor). For more on adding them for existing users, see [Email and phone verification](/guides/user/verify_sms_otp/).
:::

### Manage sessions

MFA is evaluated in the context of a session, so this requires managing those sessions. A new session is created when the user authenticates using the first factor (e.g., password). If successful, the authentication response includes user tokens along with the session ID (`session_id`) of the new session. For example:

```json
{
  "access_token": "string",
  "id_token": "string",
  "refresh_token": "string",
  "token_type": "string",
  "expires_in": 3600,
  "session_id": "string" // Session ID of the created session
}
```

When needed, you can add additional authentications to an existing session by specifying the session ID in the request. This can be used to add a second factor to the session to satisfy MFA. For example:

```js
import fetch from 'node-fetch';

async function run() {
  const resp = await fetch(
    `https://api.transmitsecurity.io/cis/v1/auth/link/email/authenticate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer [ACCESS_TOKEN]' // Client access token
      },
      body: JSON.stringify({
        session_id: '[SESSION_ID]', // Session ID returned by the first-factor auth
        code: '[CODE]' // Code returned to your redirect URI when link was clicked
      })
    }
  );

  const data = await resp.json();
  console.log(data);
}

run();
```

To manage the session, you'll need to securely store the session ID in your backend and [logout](/openapi/user/backend-sessions/#operation/logout) when needed.

:::attention Security
We recommend binding the session to the IP address.
:::

### Check for MFA

Every successful authentication returns an ID token. In addition to containing user profile data, the token also indicates whether or not MFA has been satisfied by the session in which the authentication occurred. If MFA has been met, the `amr` claim of the token will include `mfa`. This claim will also indicate which methods have been used in the session.

For example:
```json
  "amr": [
    "webauthn",
    "eml",
    "mfa"
  ]
```

<style>
    section article ol li {
      margin-top: 2px !important;
    }
</style>
