# Set up Admin Portal SSO with OIDC

:::info Availability
This feature is being gradually released to the customers.
:::

In the Admin Portal, you can use SSO to authenticate admins via an external OIDC provider (for example, Google or Microsoft) instead of using an email magic link. Once SSO is set up, after admins enter their email address on the Admin Portal login page they are authenticated by the configured OIDC provider (using the provider's authentication flow when they are not logged in to their provider's account).

To make sure the Admin Portal is always accessible, you must add the email address of at least one admin user when you set up SSO authentication (ideally, more than one admin user should be added). These users are known as recovery admins and they can access the Admin Portal even when there is an issue with SSO (for example, the SSO provider is down or incorrectly configured). When recovery admins log in to the portal, they choose whether to authenticate using SSO or an email link. This ensures SSO authentication can be reconfigured or disabled if needed. For more about managing role-based user access to Mosaic, see our [dedicated](/guides/user/manage_admin_users/) guide.

To set up an OIDC provider, you'll need a client ID and secret (created in your provider's portal), the URL of your provider's OIDC endpoint (`Issuer URL`), and the Mosaic redirect URL which is defined in the provider's portal and used to redirect the browser back to the Mosaic Admin Portal after the user has been authenticated. The setup is similar for all OIDC providers.

## Step 1: Set up your OIDC provider

1. In your OIDC provider's portal, create an application for the Mosaic Admin Portal. You should receive a client ID and secret after creating the application.
1. In your OIDC provider's application, add the Admin Portal's redirect URL: https://api.transmitsecurity.io/cis/auth/sso/callback

## Step 2: Configure OIDC SSO in Mosaic Admin Portal

1. In the Admin Portal, go to **Settings** > **Single Sign-on**.
1. Enable SSO configuration and select the **OIDC** protocol.

    ![](../../images/UserID/configure-oidc-admin-sso.png)
1. Copy the provider application's client ID and secret to their respective fields in the Admin Portal.
1. In the **Issuer URL** field, add your provider's OIDC endpoint.
1. In the **Recovery admins** field, select at least one admin user. The selected users will have the option to log in to the Admin Portal via SSO or an email link.
1. Save your changes.

You can find detailed information on configuring Google and Microsoft SSO below. For more information on setting up other providers, see their documentation.

## Microsoft SSO

1. In the [Azure Portal](https://portal.azure.com/), register a new app for Microsoft's identity platform using their [documentation](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).
1. Add the Azure app's [redirect URL](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#add-a-redirect-uri) for returning to the Mosaic Admin Portal after authentication: https://api.transmitsecurity.io/cis/auth/sso/callback.
1. Configure the [Azure platform settings](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#configure-platform-settings) for web applications.
1. Create a [client secret](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#add-a-client-secret) and then copy the secret's value from the Azure Portal and paste it into the **Client Secret** field on the **Settings** > **SSO** page in the Mosaic Admin Portal.
1. Copy and paste these field values from the Azure Portal to the **SSO** page in the Mosaic Admin Portal:
    * **Application (client) ID** (Azure Portal) to **Client ID** (Mosaic Portal)
    * **OpenID Connect metadata document** (Azure Portal) to **Issuer URL** (Mosaic Portal)

        See [Find your OpenID configuration document URI](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc#find-your-apps-openid-configuration-document-uri) for information on how to view the **OpenID Connect metadata document** URL.

## Google SSO

1. In the Google Cloud console, use Google's [documentation](https://developers.google.com/workspace/guides/create-project) to either create or use an existing project for setting up Google SSO.
1. Create a [client ID and secret](https://developers.google.com/identity/protocols/oauth2/openid-connect#getcredentials) for the web application.
1. Add the [redirect URL](https://developers.google.com/identity/protocols/oauth2/openid-connect#setredirecturi) for returning to the Mosaic Admin Portal after authentication: https://api.transmitsecurity.io/cis/auth/sso/callback.
1. Customize the [user consent screen](https://developers.google.com/identity/protocols/oauth2/openid-connect#consentpageexperience) as required.
1. Copy and paste these fields from the Google Cloud console to the **SSO** page in the Mosaic Admin Portal:
    * **Your Client ID** (Google console) to **Client ID** (Mosaic Portal)
    * **Your Client Secret** (Google console) to **Client Secret** (Mosaic Portal)
1. On the **SSO** page in the Mosaic Admin Portal, enter this value in the **Issuer URL** field: `accounts.google.com`.


## Next steps

Streamline admin user onboarding and access management with **Just-In-Time (JIT) SSO**, which automatically creates or updates admin accounts upon their first SSO login. This eliminates the need for manual provisioning and ensures seamless access to the Admin Portal. See [Just-In-Time Provisioning for Single Sign-On (JIT SSO)](/guides/user/jit_sso.md).
