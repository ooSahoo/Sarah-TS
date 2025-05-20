# Manage clients

You can manage clients using [Application APIs](/openapi/user/apps/#operation/createAppClient) (with an access token of the relevant app or with an admin access token) or [Client APIs](/openapi/user/clients/) (with an access token of the relevant app), or from the Admin Portal (as described below).

## Understand client protocols

Depending on your business needs, Mosaic allows creating OIDC and SAML clients.

- **OIDC** clients are designed for apps relying on the [OIDC protocol](/guides/user/oidc_and_oauth_flows.md) for authentication and authorization.
- **SAML** clients are designed to support identity federation with external IDPs using the SAML protocol.

OIDC clients are versatile and are considered to be default for Mosaic integrations&mdash;you can build any identity experience (authentication, fraud prevention, identity verification, etc.) with an OIDC client. SAML clients can only be used with [SSO Service](/guides/user/SSO_orchestration/SSO_quickstart_hosted_ui_SAML.md) and [Hosted login](/guides/user/hosted_login_how_it_works.md).

:::info Note
Unless stated otherwise, Mosaic documentation refers to OIDC clients simply as clients.
:::

## Manage clients

You can manage clients from the **Application** page:
- Create a client by clicking **+ Add client** and configuring its settings.
- Edit a client by clicking ![](../../images/action_icon.svg) and then **Edit**.
- Delete a client by clicking ![](../../images/action_icon.svg) and then **Delete**.

:::info Note
To set up the SSO Service, create clients right from the SSO Service client group page. See [Configure SSO Service](/guides/user/SSO_orchestration/SSO_config_service.md)
:::

## OIDC client settings

Complete the wizard by configuring client settings. Some of these settings are common for all client types and configurations, while others are specific to the protocol (OIDC in this case) and derive from other settings.

### Protocol and naming settings

- **Protocol**: Setting to **OIDC** defines that this client is OIDC-based.
- **Third-party client**: Enabling the toggle marks the client as third-party. With the right consent, third-party clients that represent external services can request access to your protected resources on behalf of the user.
- **Client name**: Client name to display when needed.
- **Client description**: Short description of your client.

### Basic settings

- **Client type**: Whether the client is a web app (default) or a native app (e.g., mobile). This is used to adapt validations and configuration according to client type when relevant (such as validations for redirect URIs).
- **Redirect URIs**: List of URIs approved for redirects for your application (e.g., URI to redirect to when an authentication is completed). The required format of the redirect URI depends upon client type: web clients must use HTTPS unless using a local environment, while native apps must use HTTPS unless using a local environment or custom scheme. Custom schemes are only allowed in the format of reverse domain schemes (`[domain]://[scheme]`).


### Advanced settings

:::info Note
For highly-regulated industries, consider enabling "Enforce FAPI 2.0 compliance". This will automatically disable client settings that aren't FAPI 2.0-compliant and prompt you to configure your client in accordance with FAPI principles, for example by enforcing mTLS, PKCE, and PAR. See [FAPI 2.0](/guides/user/fapi_flows.md)
:::

- **Authentication method**: Enforces client authentication using a specific method:
    - **Client Secret**: (default) Allows authenticating using Client ID and Client Secret.
    - **Private key JWT**: Allows authenticating using client JWT assertion signed by your private key. If selected, provide [JWKS](https://datatracker.ietf.org/doc/html/rfc7517).
    - **mTLS (self-signed)**: Allows leveraging an mTLS handshake for authentication. If selected, provide the self-signed certificate in the JWKS format.
    - **mTLS (CA-signed)**: Allows leveraging an mTLS handshake for authentication. If selected, provide the certificate signed by a trusted Certificate Authority (CA) as PEM.

- **Token binding**: Enabling this ensures that tokens are cryptographically bound to client certificate in the mTLS and private key JWT flows.

- **PKCE support**: Whether the client requires the proof key of code exchange (PKCE) for authentication. For implementation details, see [Secure login with PKCE](/guides/user/auth_oidc_pkce.md).

    - **Allow PKCE alongside client credentials**: (default) Allows auth requests with and without PKCE, provided that they use client credentials.
    - **Enforce PKCE alongside client credentials**: Requires all authentication requests to include PKCE in addition to client credentials.
    - **Enforce PKCE instead of client credentials**: Retrieves user access tokens only. For security reasons, Mosaic doesn't recommend using PKCE as a standalone method for authenticating users without the Client Secret.

- **Enforce PAR**: Enforces the usage of the [PAR](/openapi/user/oidc/#operation/pushedAuthorizationRequest) endpoint for auth requests. For implementation details, see [Integrate login using PAR](/guides/user/auth_oidc_par.md).

- **Resources**: List of URIs the client can explicitly request access to. This allows the client to manage dedicated access for a resource, including the token expiration. For example, a website can have a shorter lifetime for the page used to manage the user's payment methods. Before a resource can be added to a client, it must first be created from the **Resources** tab of the **Applications** page (see [Resources](/guides/user/manage_resources.md)).

:::info Note
Your client can request access to a single resource in each request. If you'd like to customize the default expiration of tokens, create a resource that corresponds to your application URL.
:::

- **ID token &mdash; Pre-defined custom claims**: List of custom claims to be included in the user's ID token without requiring them to be explicitly requested as a part of the OIDC [authorization](/openapi/user/oidc/#operation/oidcAuthenticate) call. For example, select `email` to always receive the user's primary email in the token. For details about available custom claims, see [ID token reference](/openapi/id_token_reference.md#custom-claims).

- **Supported prompt values**: List of OIDC prompt values to be enforced by the OIDC authorization server. Note that only selected prompt values can be included in the [authorization requests](/openapi/user/oidc/#operation/oidcAuthenticate), requests containing unselected prompt values will be rejected.
    - **Login**: Forces the user to authenticate.
    - **Consent**: Obtains user's consent. Required to obtain a refresh token.
    - **None**: Checks for an existing session.

- **Token timeout configuration**: Allows modifying default token expiration times:
    - **Access token expiration**: The access token time-to-live. By default, 60 minutes.
    - **Refresh token expiration**: The refresh token time-to-live. By default, 2 weeks.
    - **Max refresh time**: The maximum period of time when the refresh token can be rotated. By default, 2 weeks.
    - **Session expiration**: The validity period during which you can silently authenticate the session. By default, 2 weeks.

- **Third-party client settings**: Defines configuration settings for external services (if **third-party client** is toggled):
    - **Consent redirect URL**: List of URIs for obtaining user consent (e.g., URI to redirect to when a third-party client requests access to user data). These pages should be managed by the first-party client.
    - **Access validity period**: Currently, set to 30 days.
    - **Scopes / permissions**: List of resources the third-party client is allowed to access on behalf of the user in the app. Third-party clients typically have limited control over user data.

### Client roles

Grant granular access to Mosaic by assigning roles to a client. Pick one or more roles from the list or create a new role. If you don't specify a role, the client will be assigned an implicit role that grants global access to Mosaic APIs. For details, see [Manage client roles](/guides/user/manage_client_roles.md).

<!--Granting at least one role is mandatory. -->

:::warning Important
Upon the OIDC client creation, Mosaic will autogenerate a unique Client ID and Client Secret.

- **Client ID**: Client identifier for API requests, automatically generated when the app is created. It cannot be edited.
- **Client Secret**: Client secret used to authorize API requests on behalf of the client (either directly or by using it to generate client access tokens). It is automatically generated when the client is created, but can be rotated when needed. Keep this secret somewhere safe, and make sure it's never exposed to your mobile or web applications.
:::

## SAML client settings

Complete the wizard by configuring client settings. Some of these settings are common for all client types and configurations, while others are specific to the protocol (SAML in this case).

### Protocol and naming settings

- **Protocol**: Setting to **SAML** defines that this client is SAML-based.
- **Client name**: Client name to display when needed.
- **Client description**: Short description of your client.

### Basic settings

- **Service provider (SP) ACR URL**: The endpoint where SAML responses containing authentication assertions are sent after the user successfully logs in. This URL must be configured accurately to ensure that the authentication data is received and processed by the intended application.
- **Service Provider (SP) Entity ID**: ID that uniquely identifies the service provider within the SAML framework. This is crucial for ensuring that the SAML responses are directed to the correct client application, maintaining the integrity and security of the authentication process.

### Advanced settings

- **NameID**: The type of primary identifier to be used. Can be one of the following: email, phone number, username, or external user ID.
- **Sign SAML assertion**: Enable signing the SAML assertions in addition to signing the SAML response.
- **Allow the ACS URL to be optional in SAML requests**: Make ACS URL not mandatory.

:::warning Important
Upon the SAML client creation, Mosaic will autogenerate the following parameters, which are required on the Service Provider side:

- **SAML SSO URL**: The URL acts as the gateway for routing login requests through the correct SSO mechanism. This URL must be set within the relying party (RP).
- **Transmit Entity ID**: ID that uniquely identifies the Mosaic IDP in the SAML exchange, ensuring that SAML requests are routed to the Mosaic.
- **X.509 Certificate**: The certificate used to sign SAML assertions, securing communication between the application and the identity provider.
- **IDP metadata URL**: The Mosaic endpoint that contains structured metadata about the IDP's configuration.
:::