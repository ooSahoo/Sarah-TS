# How apps and clients work
##

Before you can integrate with Mosaic, you'll need to create an application. This application contains configuration details for your integration, including branding, authentication settings, and more. The application requires at least one client but it can have multiple clients associated with it&mdash;each client represents an implementation and has unique settings. The first client is created automatically and set as default.

Let's assume, you are integrating a food delivery service with Mosaic, and you have created an application for it. The service has a web version as well as a native iOS app. Both the web app and mobile app are the clients of this application.

Certain settings are configured on the application level and are shared across clients. These are general details, branding, and authentication settings. Clients share signups&mdash;for example, if a new user signs up using a web app, they no longer need to register themselves in the mobile app as they have already signed up within the application.

The settings specific to a client include, e.g., credentials used for [generating client access tokens](/guides/user/retrieve_client_tokens.md), client types, [resources](/guides/user/resources_overview.md), and enabled flows. For example, you can enable a device flow for one client and keep it disabled for the other.

Depending on your business needs, Mosaic allows creating OIDC and SAML clients. You can leverage OIDC clients in a wide variety of integrations implementing complex authorization flows, identity journeys, verification experiences, and fraud prevention systems. SAML clients are designed to facilitate login through an external IDP and can only be used with [SSO Service](/guides/user/SSO_orchestration/SSO_quickstart_hosted_ui_SAML.md) and [Hosted login](/guides/user/hosted_login_how_it_works.md).

By default, Mosaic app clients are first-party clients which assumes they are owned by you. To support integrations with other providers, Mosaic enables you to create third-party OIDC clients. A third-party client is an external service that can request access to your app resources and leverage APIs while being controlled by someone else. For security reasons, third-party clients should only gain access to the app after explicitly obtaining a user's consent using your first-party client.

For first-party clients, Mosaic enables you to limit client access to specific resources or actions by assigning client roles. A role is a set of permissions which is evaluated each time a client attempts to access Mosaic APIs. For example a client can have a permission to retrieve a list of users but not the ability create new users. See [Manage client roles](/guides/user/manage_client_roles.md).