---
toc:
  maxDepth: 2
---
# Manage your hosted login experience

You can [integrate hosted login](/guides/user/hosted_login_quick_start.md) using the default login flow settings or customize them to align with your specific business and design the best login experience for your users.

Authentication flow settings be found in the **Admin Portal** under **B2C Identity** or **B2B Identity** _based on your setup_ > **Experience Management**.

:::info IMPORTANT

Mosaic hosted login supports public sign up by default.

:::

## Initial login screen

The initial login screen is the first screen the user sees when your app redirects to the Mosaic hosted login experience. By default, a hosted login flow begins by prompting the user to input their identifier.

Since B2B login flows also require an organization context, the flow can be customized by choosing which initial login screen to present to the users. For more, see [Manage hosted B2B login experience](/guides/user/b2b/manage_hosted_XP.md).

:::info Note
For B2C apps, the initial login screen must be set to **Identifier only**.
:::

## User identifiers

By default, the unique user identifier required at login is the email, but you can also opt for a username when using password authentication, or for a phone number when using OTP verification. At login, users will provide their user identifier combined with one or more authentication methods to gain access to the application.

## Primary authentication method

You can control which authentication methods best fit your application. The available authentication methods are WebAuthn passkey for biometrics, password, SMS OTP, email OTP, and email magic link.
The primary authentication method—which is the first method always offered to the user for authentication, combined with the unique user identifier— is set to password by default.
:::info NOTE

WebAuthn registration via hosted login is only available for users that have previously logged in using a different authentication method. As a result, using WebAuthn as the primary authentication method will prompt the user to register and log in with email.
:::

## Secondary authentication methods

To give your user more authentication options, you can enable one or more secondary authentication methods. At login the user will be asked to authenticate with either the primary or one of the secondary methods. Secondary methods are also useful whether you intend to enable multi-factor authentication (see [Multi-factor authentication](#multi-factor-authentication)).

By default, WebAuthn passkey, SMS OTP, email OTP, and email magic link are all enabled as secondary factors. The list varies according to the primary method you choose. After modification, the methods you previously used as primary will appear in the secondary method list, disabled.

:::info Note

When used as a second factor, WebAuthn passkey can be configured to be either required or optional at registration. By default, it is set to optional.

:::

## Multi-factor authentication

To enforce security, you can enable multi-factor authentication. With MFA, after authenticating with the primary method, the system will ask the user to authenticate with a second factor, that is one of the secondary methods. For instance, with MFA, users are prompted to authenticate using both a password and a secondary method, such as an email magic link. If you have multiple secondary methods enabled, users can choose the second factor they prefer.

It is possible to activate MFA only after enabling one or more secondary methods (**Admin portal** > **B2C** or **B2B Identity** _based on your setup_ > **Experience Management**).

:::info Note

Enabling MFA in the Admin portal also applies MFA to flows that integrate authentication APIs directly (without the hosted login experience).

:::

## User information to collect

During registration, you can collect user information, such as email address, phone number, first and last name, and middle name. You can set each piece of information as either required or optional, and activate OTP verification for email and phone number.

By default, all user information is collected and set as optional, and the OTP verification at registration is enabled for email and phone number.

## Language policy

By default, the hosted login screens will automatically adapt to the language requested by the user's browser. However, you can define a language policy to apply in case the browser does not specify any language preference. Define your app's default and supported languages in **Admin portal** > **B2C** or **B2B Identity** _based on your setup_ > **Experience Management** > **Branding & Language**.