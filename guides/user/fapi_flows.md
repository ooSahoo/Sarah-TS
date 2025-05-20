---
title: FAPI flows
---

# FAPI 2.0
##

FAPI stands for Financial-grade API, a set of technical specifications developed by the OpenID Foundation. It is designed for highly-regulated industries to ensure secure data sharing and robust authentication in scenarios involving sensitive financial information, such as banking and payment services.

[FAPI 2.0 Security Profile](https://openid.net/specs/fapi-security-profile-2_0.html) extends OAuth 2.0 and OIDC protocols, with enhanced requirements to mitigate risks like phishing, token theft, or unauthorized access. FAPI is primarily used in Open Banking and similar systems where high security and privacy standards are required.

:::info Certification
Mosaic is a certified FAPI 2.0 provider.
:::

To ensure compliance with FAPI in Mosaic, your apps should adhere to industry best practices, including but not limited to to these principles:

- Enforcing [proof key for code exchange (PKCE)](https://www.rfc-editor.org/rfc/rfc9126) alongside client credentials. PKCE ensures the authorization code can be exchanged for ID and access tokens only by a client that requested authentication. See [Secure login with PKCE](/guides/user/auth_oidc_pkce.md)
- Using [pushed authorization request (PAR)](https://www.rfc-editor.org/rfc/rfc7636) instead of passing auth parameters in the path. PAR is a secure way to invoke the authorization code flow. See [Integrate login using PAR](/guides/user/auth_oidc_par.md)
- Using client JWT assertion signed by your private key for authentication. See [RFC 7521 (Assertion Framework)](https://www.rfc-editor.org/rfc/rfc7521.html) and [RFC 7523 (JWT Profile for Client Authentication)](https://www.rfc-editor.org/rfc/rfc7523.html).
- Using a strong network-level encryption such as self-signed and CA-signed certificates for mutual TLS (mTLS). See [RFC 8705 (OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens)](https://www.rfc-editor.org/rfc/rfc8705.html).

Mosaic allows you to enforce FAPI 2.0 compliance in client settings&mdash;enabling this option ensures a client must be configured and used in accordance with the principles above. For more details on client configuration, see [Manage clients](/guides/user/manage_clients.md#advanced-settings).

Additionally, consider the following safeguards for your applications:

- Enforcing multi-factor authentication to prove user's identity
- Providing granular access to [resources](/guides/user/resources_overview.md)
- Using [short-lived tokens](/guides/user/manage_clients.md#advanced-settings) for sensitive operations
- Obtaining explicit [user consent](/guides/user/auth_consent.md) when externalizing APIs


<style>
    section article ul li {
        margin-top: 6px !important;
    }
</style>