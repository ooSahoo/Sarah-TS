# Manage user authenticators

 The **Authenticator** view in the user profile aims to enhance the efficiency of support operations by providing a centralized tool for managing user authenticators, including passwords, passkeys, SMS/email OTPs, email magic links, social login, OIDC, SAML, and TOTPs.

By having centralized access to user authentication information, Customer Support Representatives and Admins can seamlessly assist users in resolving authentication-related issues and manage authenticators effectively.

![authenticator view](../../images/UserID/authenticator_view.png)

## Authenticator view

The Authenticator view not only provides a comprehensive list of all authenticators for each user but also offers detailed information such as the date of the last login, the accessed app, the login device, and more for each authenticator.

To access the authenticator management view, navigate to **B2C Identity** > **Users** > select the user > **Authenticators**.

To get comprehensive information about a user's authenticators, use our [user authenticators API](/openapi/user/authenticators/).

## Authenticator registration
An authenticator is considered registered once it's ready for use. Certain authenticators require an explicit registration process, such as for password, WebAuthn, and TOTP. Other authenticators are registered implicitly. For example, social login methods are registered the first time they're used to authenticate, while an email or phone-based method is registered once the email/phone number is added to the user's profile.

Upon registration, an authenticator ID is automatically generated (accessible via API).
<!--To disclose after further updates of the view! Upon registration, each authenticator (including social login) is assigned an authenticator name which typically corresponds to the user identifier linked with the authenticator (e.g. identifier for passkey, phone number for SMS OTP, etc.).-->

## Authenticator status

- **Registered**: the authenticator is available, but hasn't yet been used
- **Locked** : a lockout rule is applied to the authenticator in accordance with the settings specified in the method (only for password, OTP, TOTP).
- **Deactivated**: the user is suspended, so authentication is deactivated. Admins can update the status to deactivated to manually block it (either temporarily or permanently) due to the detection of malicious activity.
- **Active**: the authenticator has been used for login at least once.


