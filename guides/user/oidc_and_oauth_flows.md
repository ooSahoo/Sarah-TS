---
title: Supported flows
---

# OIDC & OAuth 2.0 Flows
##

[OAuth 2.0](https://www.rfc-editor.org/rfc/rfc6749) is the industry-standard protocol for authorization. It allows an app to securely gain limited access to protected resources of another app or website, often on behalf of an end-user. [OpenID Connect (OIDC)](https://openid.net/specs/openid-connect-core-1_0.html) is an authentication protocol built on top of OAuth's authorization mechanism. In addition to granting access requests, it allows apps to verify the user's identity and obtain basic user profile information.

The following flows are supported:

- [Authorization Code](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth): Used by a web or mobile/native app to authenticate users, such as for login to a retail website or banking app. An authorization code is exchanged for ID and access tokens via the client backend.
- [Authorization Code with PKCE](https://www.rfc-editor.org/rfc/rfc9126): Used by a mobile/native app to authenticate users, such as for login to a retail or banking app. A proof key for code exchange ensures the authorization code can be exchanged for ID and access tokens only by a client that requested authentication.
- [Authorization Code with PAR](https://www.rfc-editor.org/rfc/rfc7636): Used by a web or mobile/native app to authenticate users, such as for login to a retail or banking app. A pushed authorization request is a secure way to invoke the authorization code flow.
- [Client Credentials](https://www.rfc-editor.org/rfc/rfc6749#section-4.4): Used by an application to obtain client access tokens as needed to authorize Mosaic APIs.
- [Resource Owner Password Credentials](https://www.rfc-editor.org/rfc/rfc6749#section-4.3): Used to obtain a user access token using password credentials, without any user interaction. Should only be used by highly trusted apps, in cases where other flows aren't viable. [See API](https://developer.transmitsecurity.com/openapi/user/oidc/#operation/oidcToken:~:text=DeviceTokenRequest-,PasswordRequest,-client_id)
- [Client-Initiated Backchannel Authentication (CIBA)](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html): Allows the client to initiate an authentication process on behalf of the user from a device the user can't access directly (such as the computer of a call center agent or of the bank teller), where the user authenticates using a separate device (such as their smartphone). [See guide](/guides/user/auth_ciba/)
- [Device Authorization Flow](https://www.rfc-editor.org/rfc/rfc8628): Used to authenticate users that want to access an app from an input-limited device or one without a browser (such as smart TVs and watches, game consoles, kiosks, etc.). [See guide](/guides/user/auth_device/)
- [RP-Initiated Logout](https://openid.net/specs/openid-connect-rpinitiated-1_0.html): Used to log out end-users from their authentication sessions

<style>
    section article ul li {
        margin-top: 6px !important;
    }
</style>