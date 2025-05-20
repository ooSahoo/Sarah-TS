---
exclude: true
toc:
  enabled: true
  maxDepth: 2
---

# What's new

Here are some highlights of new product capabilities we've added.

## December 2022

### Authentication

- Authenticate users for customer service (CIBA)
- Authorize browserless and input-limited devices (Device Flow)
- Use email address to login with passwords, instead of username ([learn more](/openapi/user/passwords/#operation/login!path=email&t=request))
- New OIDC endpoints ([learn more](/openapi/user/oidc/))
- Control public sign-up for your app ([learn more](/guides/user/manage_apps/#client-information:~:text=app%20settings%20include%3A-,Public%20sign%2Dup,-%3A%20Allows%20login%20flows))
- New customizations for Hosted WebAuthn login requests ([learn more](/openapi/user/webauthn-hosted/#operation/startBindIdAuth!in=query&path=login_hint&t=request))
- Login with email OTP ([learn more](/guides/user/auth_email_otp/))

### User management

- View a user's activities from their profile in the Admin Portal
- View a user's recommendations from their profile in the Admin Portal
- Update user email and phone number from the Admin Portal
- Allow logged-in users to update their own password ([learn more](/openapi/user/user/#operation/addPasswordCredentialsToCurrentUser))
- Allow adding username and password as part of user creation endpoint ([learn more](/openapi/user/user/#operation/bulkCreateUser!path=username&t=request))
- Customize the message and sender ID for SMS verification ([learn more](/openapi/user/verification/#operation/sendVerificationSmsOtp))
- Update the primary email or phone number as part of verification flows via [magic link](/openapi/user/verification/#operation/sendVerificationEmail!path=update_primary&t=request), [email OTP](/openapi/user/verification/#operation/verifyEmailOtp!path=update_primary&t=request) or [SMS OTP](/openapi/user/verification/#operation/verifySmsOtp!path=update_primary&t=request)
- SCIM-based user search ([learn more](/openapi/scim_search_syntax/#searchable-fields))

### Platform administration

- Send invitation emails for new portal admins
- Use your OIDC provider to login admins to the Admin Portal ([learn more](/guides/user/sso_admin_login_oidc/))

---------------------------------