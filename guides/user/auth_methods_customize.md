# Customize login methods

When you implement Mosaic's hosted login, you can customize your login methods' behavior and appearance (**Admin Portal** > **B2C** or **B2B Identity** _based on your setup_ > **Authentication Methods**).

## Passwords

The password settings enable you to define your app's password policy:
- **Complexity**: configure the strength of your password policy by selecting from a list of requirements including uppercase and lowercase letters, special characters, numbers, and more. The system guides as you navigate the complexity options.
- **Expiration time**: set the password expiration period in days.
- **Reuse of recent passwords**: enable/disable the reuse of recent passwords
- **Failed attempts lockout policy**: set the number of failed login attempts that trigger a temporary user lockout and specify the lockout duration in minutes.
- **Reset policy**: set the reset link expiration period in minutes, the length of the reset OTP.
- **Temporary password**: Set the validity period for temporary passwords in hours.

Additionally, you can customize the appearance of the **Reset password email** by choosing a custom color to apply to buttons and dynamic content such as email addresses.

## Email magic links

The email magic links settings enable you to:
- define the email magic link validity period in minutes.
- customize the appearance of the **Email template** by selecting a custom color for buttons and dynamic content like email addresses.

:::info NOTE
The **From** field references as the email sender the value of **Application name**, that is specified in the app settings. It cannot be modified.
:::

## One-time passcodes

The one-time passcodes configuration options enable you to establish your OTP policy, regardless the delivery method (email or SMS):
- **Expiration time**: set the OTP expiration period in minutes.
- **Failed attempts lockout policy**: set the number of failed login attempts that trigger a temporary user lockout and specify the lockout duration in minutes.
- **Code length**: set the length of the one time code.

The OTP emails section allows you to customize the appearance of OTP emails by selecting a custom color for buttons and dynamic content like email addresses. Additionally, you can preview the login, sign-up, and verification email templates.