---
title: How it works
redirectFrom:
  - /guides/user/how_be_auth_works/
---

# How authentication works
User authentication can be used to protect your application or only specific resources. The authentication process will identify the user, and grant them access (based on roles, permissions, scopes, etc.).


## Login preferences
Choose from a wide variety of authentication methods, including WebAuthn-based biometrics, email magic links, SMS one-time passcodes, social login, and more. Consider which methods work best for your customers and use case. For example, biometric login is the most secure way to log in users into their bank account, whereas social login is fast and convenient for signing up customers to a retail app.

Your login preferences configure the methods you'd like to use, such as branding email templates for magic link authentication, or setting up the OAuth credentials for a social login provider. You can manage your login preferences from the Admin Portal or using [Administration APIs](/openapi/user/apps).

<!-- Only FE
## Authentication flow
Regardless of method, every authentication flow includes:
1. User authenticates using the chosen method
1. Upon successful authentication, a code is returned to your app
1. Your app securely exchanges this code for tokens that identify the user and grant them access
1. Optionally, a new user is created (if you allow authentication to implicitly onboard new users)

Only BE:
## Sessions
Backend authentication occurs in the context of a session. A new session is created upon successfully completing an authentication. See [Session management](/guides/user/be_how_sessions_work.md).

Additional authentications can be added to an existing session, for example, to support MFA scenarios (See [Multi-factor authentication](/guides/user/be_auth_mfa.md)). You can also authenticate users using the session itself, which allows you to support silent authentication or [SSO across your apps](/guides/user/be_sso_across_apps.md).

:::info Note
A session created by a backend authentication can only be shared by other backend methods.
:::
-->

## Identity data

Upon authentication, user data is returned in the ID token. Aside from the default claims that are always returned, custom claims can be returned by requesting them. For a complete list and structure of the ID token claims, see our [Token reference](/openapi/id_token_reference/).

For example, the ID token may include the following (depending on what you request):

- User's identifier in your Mosaic tenant
- User's external identifiers in your system
- User's name, emails, phone numbers, address, etc.
- Authentication method that was used
- Whether a new user was created as part of the flow
- User's groups, roles, and permissions
- Any of the custom user data that you've set for this user

## User access
A user access token is returned upon each successful authentication. It describes the access that was granted, including requested scopes (`scope`) and which resource the user is allowed to access (based on what was requested). The token also includes the expiration, which should be validated before each use. User access tokens are returned together with a refresh token that can be used to prolong the access without requiring the user to re-authenticate. For the claims and structure of the access token, see our [Token reference](/openapi/user_access_tokens/).

<!--Only FE
## Hosted login

Mosaic offers a hosted solution for user login that enables you to provide users with secure, frictionless, and UX-friendly authentication flows—without investing expensive resources in design, development, and implementation efforts outside their core business activity.

In addition to leveraging [OIDC](https://openid.net/specs/openid-connect-core-1_0.html) secured flows, hosted login allows you to choose which authentication methods to use, design your authentication flow, and customize the appearance of the authentication screens. An extra layer of security is provided by the possibility of enabling multi-factor authentication, that not only secures authentication, but also verifies the legitimacy of the sensitive actions on your application (e.g., password changes and payments). With hosted login, users can manage their authentication preferences, manage their identification information, and perform account recovery. The hosted login supports WebAuthn biometrics, password, SMS OTP, Email OTP, email magic links.

For more about hosted login, see [How hosted login works](/guides/user/hosted_login_how_it_works.md).
-->