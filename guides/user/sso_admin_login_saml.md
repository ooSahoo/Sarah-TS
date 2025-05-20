# Set up Admin Portal SSO with SAML

In the Admin Portal, you can use SSO to authenticate admins via an external **SAML identity provider (IdP)** instead of using an email magic link. Once SSO is set up, after admins enter their email address on the Admin Portal login page, they are authenticated by the configured SAML provider (using the provider's authentication flow when they are not logged in to their provider's account).

To make sure the Admin Portal is always accessible, you must add the email address of at least one admin user when you set up SSO authentication (ideally, more than one admin user should be added). These users are known as recovery admins and they can access the Admin Portal even when there is an issue with SSO (for example, the SSO provider is down or incorrectly configured). When recovery admins log in to the portal, they choose whether to authenticate using SSO or an email link. This ensures SSO authentication can be reconfigured or disabled if needed. For more about managing role-based user access to Mosaic, see our [dedicated](/guides/user/manage_admin_users/) guide.

To set up a SAML provider, you need to configure both the **identity provider (IdP) settings** and the **service provider (SP) settings** in the Admin Portal. The setup is similar for all SAML providers.

## Step 1: Set up your SAML provider

1. In **your SAML identity provider’s (IdP) portal**, create a new application for Mosaic SSO.
2. Obtain the following values from your IdP, you will use them in the next step to configure SSO in Mosaic:
   - **Entity ID**: the unique identifier of your IdP.
   - **SSO URL**: the SAML authentication endpoint.
   - **Public certificates**: the public certificate(s) used to sign SAML responses.

:::info Note
To configure the **service provider (SP)** settings in your IdP, you'll need the **Service provider entity ID** and **Assertion consumer service URL (ACS URL)** generated automatically in the **Mosaic Admin Portal** once SSO is configured (see next step).
:::


## Step 2: Configure SAML SSO in Mosaic Admin Portal

1. In the Admin Portal, go to **Settings** > **Single sign-on**, enable SSO configuration and select the **SAML** protocol.

![](../../images/UserID/configure-saml-admin-sso.png)

2. For **Entity ID**, enter the unique identifier of the identity provider (IdP).
3. For **SSO URL**, enter the SAML 2.0 endpoint where users are redirected to log in via the identity provider.
4. For **Public certificates**, enter one or more public certificates from the identity provider to verify SAML assertions. Additional certificates can be added using the **+ Add Certificate** option.
5. In **Recovery admins**, select at least one admin user who can access the Admin Portal using an alternative authentication method in case of SSO issues.

The following data is automatically generated after saving:
- **Service provider entity ID**: The unique identifier for Mosaic as a service provider.
- **Assertion consumer service URL (ACS URL)**: The endpoint where the identity provider (IdP) sends SAML authentication responses.


## Next steps

Streamline admin user onboarding and access management with **Just-In-Time (JIT) SSO**, which automatically creates or updates admin accounts upon their first SSO login. This eliminates the need for manual provisioning and ensures seamless access to the Admin Portal. See [Just-In-Time Provisioning for Single Sign-On (JIT SSO)](/guides/user/jit_sso.md).

