---
title: How it works
---

# How backend authentication works
User authentication can be used to protect your application or only specific resources. The authentication process will identify the user, and grant them access.

:::warning Note
[Backend Authentication APIs](/openapi/user/backend-one-time-login/#operation/sendMagicLinkEmail) allow you to implement authentication using a backend-to-backend integration. If you're looking for social login or a hosted WebAuthn experience, click [here](/guides/user/auth_overview/).
:::

## Login preferences
Choose from a wide variety of authentication methods, including WebAuthn-based biometrics, email magic links, SMS one-time passcodes, and more. Consider which methods work best for your customers and use case.

Your login preferences configure the methods you'd like to use, such as branding your magic link email template, or password complexity settings. You can manage your login preferences from the Admin Portal or using [Admin APIs](/openapi/user/apps).

## Sessions
Backend authentication occurs in the context of a session. A new session is created upon successfully completing an authentication. See [Session management](/guides/user/be_how_sessions_work.md).

Additional authentications can be added to an existing session, for example, to support MFA scenarios (See [Multi-factor authentication](/guides/user/be_auth_mfa.md)). You can also authenticate users using the session itself, which allows you to support silent authentication or [SSO across your apps](/guides/user/be_sso_across_apps.md).

:::info Note
A session created by a backend authentication can only be shared by other backend methods.
:::

## Identity data

Upon authentication, user data is returned in the ID token. Aside from the default claims that are always returned, custom claims can be returned by requesting them. For a complete list and structure of the ID token claims, see our [Token reference](/openapi/id_token_reference/).

For example, the ID token may include the following (depending on what you request):

- User's identifier in your Mosaic tenant
- User's external identifiers in your system
- User's name, emails, phone numbers, address, etc.
- Authentication method that was used
- Any of the custom user data that you've set for this user

## User access
A user access token is returned upon each successful authentication. It describes the access that was granted, including requested scopes (`scope`) and which resource the user is allowed to access (based on what was requested). The token also includes the expiration, which should be validated before each use. User access tokens are returned together with a refresh token that can be used to prolong the access without requiring the user to re-authenticate. For the claims and structure of the access token, see our [Token reference](/openapi/user_access_tokens/).