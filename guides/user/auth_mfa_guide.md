# Use multi-factor authentication

You can enforce multi-factor authentication (MFA) for all authentication methods. When using MFA, the second authentication method must be an SMS or email authentication flow ([email OTP](/guides/user/auth_email_otp/), [SMS OTP](/guides/user/auth_sms_otp/), or [email magic link](/guides/user/auth_email_magic_link/)).

If an email or SMS authentication method is used for the first method, the second method must use a different allowed authentication flow from the first method. That is, if you use an SMS flow in the first method, the second method must use an email flow, and vice versa.

:::info Note
You can only perform MFA for users that have a primary email address and phone number. For information on adding a primary phone number and email address to an existing user, see the [Verify phone using SMS OTP](/guides/user/verify_sms_otp/) and [Verify email using magic links](/guides/user/verify_email_magic_link/) guides.
:::

MFA authentications are evaluated using an [IdP session](/guides/user/how_sessions_work/#idp-sessions). You can end the session by calling the [/logout](/openapi/user/social-login/#operation/logout) endpoint.  To customize the default session duration, you can create a [Resource](/guides/user/resources_overview/#duration-of-the-access) with an access token expiration value (see [Create resource](/guides/user/manage_resources/#create-edit-or-delete-resources)).

## Step 1: Request MFA

MFA is enforced when the authentication request contains an MFA flag, which must be added to the both the first and second authentication methods. The way the MFA flag is added depends on the authentication method:

* For authentication requests that send a JSON body (such as email OTP and magic links, password, SMS OTP), the `"require_mfa": true` field is added to the request JSON body. For example:
    ```shell
    curl -i -X POST \
    https://api.transmitsecurity.io/cis/v1/auth/links/email \
    -H 'Authorization: Bearer 91827321837bdfjf' \
    -H 'Content-Type: application/json' \
    -d '{
        "email": "name@example.com",
        "redirect_uri": "https://domain.com/verify",
        "require_mfa": true,
        "client_attributes": {
        "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
        "ip_address": "123.45.67.89"
        }'
    ```
* For authentication methods that use query parameters (such as social media logins), `require_mfa=true` is added to the request URL. For example:
    ```shell
    curl --request GET \
        --url 'https://api.transmitsecurity.io/cis/v1/auth/webauthn?
        client_id=2eb840f.test.Transmit.io&
        redirect_uri=https://www.example.com/login&
        require_mfa=true' \
        --header 'Accept: application/json'
    ```
* For [OIDC integrations](/guides/user/auth_oidc/), add the `acr_values=mfa` parameter to the `/oidc/auth` request. For example:
     ```shell
    curl --request GET \
        --url 'https://api.transmitsecurity.io/cis/oidc/auth?
        client_id=c35ab2a.xVShlOVGsUMh3Cqk73K1O.transmit&
        redirect_uri=https://www.domain.com/verify&
        response_type=code&
        scope=openid&
        prompt=login&
        acr_values=mfa%20urn:transmit:google_direct' \
        --header 'Accept: application/json'
    ```

## Step 2: Handle MFA error

When MFA is configured, a call to the first authentication method (for example, `/v1/auth/links/email`) returns a `200` status code and a redirect URL with `error` and `error_description` query parameters. The `error` parameter's value is `mfa_required`, and the `error_description` parameter includes the authentication methods that can be used for the second factor:

```url
http://domain.com/verify?error=mfa_required&error_description=A%20second%20factor%20is%20required%3A%20email%2Csms%2Cemail-otp
```

To log in the user, call one of the listed second authentication methods:
* `sms`: [SMS OTP](/guides/user/auth_sms_otp/) authentication flow
* `email`: [Email magic link](/guides/user/auth_email_magic_link/) authentication flow
* `email-otp`: [email OTP](/guides/user/auth_email_otp/) authentication flow

## Step 3: Validate tokens

A successful call returns a redirect with a `code` query parameter that can be exchanged for user tokens (see [Get client access tokens](/guides/user/retrieve_client_tokens/)). Before logging in the user, the tokens [should be validated](/guides/user/validate_tokens/). The MFA details are listed in the ID token:

* `acr`: only listed when the user is authenticated with MFA, its value is `mfa`.
* `amr`: an array listing the MFA authentication methods used to log in the user, and an `mfa` element. For example:
    ```JSON
    "amr": [
        "webauthn",
        "eml",
        "mfa"
    ]
    ```