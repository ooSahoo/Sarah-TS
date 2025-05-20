---
title: Update primary email or phone
---

# Update user's primary email or phone number

Mosaic recommends keeping user's primary email address and phone number up-to-date at all times since they are needed for most authentication and recovery flows. For example, you'll need to update these identifiers if the user wants to start using a secondary email as the main one for login or if they lost access to their phone number.

There are several ways to change the primary email or phone number:

- Update a user via Users APIs
- Replace the primary email or phone with a secondary via Users APIs
- Update a user in the Admin Portal
- Instruct a user to verify their new email or phone via Verification APIs
- Sync changes across different systems via Users-SCIM APIs

:::info Note
Note that a new email or phone won't be considered verified unless the user logs in or completes the verification procedure, or unless you mark it as verified using [API](/openapi/user/user/#operation/verifyUserEmail).
:::


## Using Users APIs

Update the user's phone number or email address by sending a [PUT request](/openapi/user/user/#operation/updateUser) like the one below.

```js
import fetch from 'node-fetch';

async function run() {
  const userId = 'YOUR_user_id_PARAMETER';
  const resp = await fetch(
    `https://api.transmitsecurity.io/cis/v1/users/${userId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'user-agent': 'string',
        Authorization: 'Bearer <CLIENT_ACCESS_TOKEN>'
      },
      body: JSON.stringify({
        email: 'string', // New email address
        phone_number: 'string' // New phone number
    }
  );

  const data = await resp.json();
  console.log(data);
}

run();
```

## Using 'Mark as verified' Users APIs

Replace the user's primary email or phone with a secondary and verify it by running [Mark email as verified](/openapi/user/user/#operation/verifyUserEmail) or [Mark phone as verified](/openapi/user/user/#operation/verifyUserPhoneNumber). To override the existing primary identifier, the `change_to_primary` parameter must be set to `true` in the request.

For example, the request below verifies the user's email and makes it primary:

```js
import fetch from 'node-fetch';

async function run() {
  const userId = 'YOUR_user_id_PARAMETER'; // ID of the user
  const email = 'YOUR_email_PARAMETER'; // User's secondary email
  const resp = await fetch(
    `https://api.transmitsecurity.io/cis/v1/users/${userId}/emails/${email}/verify`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer <CLIENT_ACCESS_TOKEN>'
      },
      body: JSON.stringify({change_to_primary: true}) // Overrides the primary email address
    }
  );

  const data = await resp.json();
  console.log(data);
}

run();

```

## Using Verification APIs

A logged-in user can update their primary email or phone number after completing a verification flow. This option allows users to securely manage their profiles after logging into the app. Phone numbers can be verified using [SMS OTP](/guides/user/verify_sms_otp), while emails can be verified using [email OTP](/guides/user/verify_email_otp/) or [email magic link](/guides/user/verify_email_magic_link/). To update an existing primary email or phone, the `update_primary` parameter must be set to `true` in the verification request (see [Verification APIs](/openapi/user/verification/)).

For example, the request below updates the user's primary email after validating the OTP:

```js
import fetch from 'node-fetch';

async function run() {
  const resp = await fetch(
    `https://api.transmitsecurity.io/cis/v1/verification/otp/email/validate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer <USER_ACCESS_TOKEN>' // The user must be logged-in
      },
      body: JSON.stringify({
        email: '[EMAIL]',     // User's updated primary email
        passcode: '[OTP]',
        update_primary: true // Allows overriding the primary email address
      })
    }
  );

  const data = await resp.json();
  console.log(data);
}

run();
```


## Using SCIM APIs

The user's primary email or phone number can be updated using [User SCIM APIs](/openapi/user/user-scim/#operation/scimReplaceUserAttributes). This can be used to automatically sync user profile data across different systems. Here's an example request that updates the user's email:

```js
import fetch from 'node-fetch';

async function run() {
  const userId = 'YOUR_user_id_PARAMETER';
  const resp = await fetch(
    `https://api.transmitsecurity.io/cis/scim/Users/${userId}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'string',
        'Content-Type': 'application/json',
        Authorization: 'Bearer <CLIENT_ACCESS_TOKEN>'
      },
      body: JSON.stringify({
        emails: [
          {
            value: '[EMAIL]',   // User's new primary email address
            primary: true
          }
        ],
        schemas: [
          'urn:ietf:params:scim:schemas:core:2.0:User'
        ]
      })
    }
  );

  const data = await resp.json();
  console.log(data);
}

run();
```

## Using the Admin Portal
An admin can update a user's primary email or phone number via the user's profile in the Admin Portal. For example, a support representative can help a user replace an email address that they can no longer access. The new email/phone will be marked as unverified.




