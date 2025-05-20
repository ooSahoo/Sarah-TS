# Create applications
##

To integrate with Mosaic, you'll need to configure an application in the Mosaic Admin Portal. Depending on your region, select the portal to use:
- [Portal for global customers](https://portal.transmitsecurity.io/) (global, located in US)
- [Portal for EU customers](https://portal.eu.transmitsecurity.io/) (located in EU)
- [Portal for CA customers](https://portal.ca.transmitsecurity.io/) (located in CA)
- [Sandbox portal](https://portal.sbx.transmitsecurity.io/) (for safe testing and development)

:::info Note
This guide covers basic app configuration to help you get started with Mosaic. For details, refer to [How apps and clients work](/guides/user/apps_and_clients.md), [Manage apps](/guides/user/manage_apps.md), and [Manage clients](/guides/user/manage_clients.md).
:::


1. From **Applications**, click **Add application**.

    ![](../../images/UserID/applications_page.png)

2. Enter basic application information, including:
    - **Name**: Application name displayed in the Admin Portal
    - **Description**: Short description of your application, displayed in the Admin Portal
    - **Application Logo**: (Optional) Your application's logo to use when needed (e.g., in email templates)

3. Add a first client and configure its settings, including:

    - **Protocol**: Set to **OIDC**
    - **Client Display Name**: Client name to display when needed
    - **Client Description**: Short description of your client
    - **Redirect URIs**: List of URI approved for redirects for your application (e.g., redirect URI for magic links)
    - **Client type**: Set to **Web**
    - **Authentication method**: Set to **Client secret**

:::info Note

Application ID, Client ID, and Client Secret are automatically generated. You'll need the client credentials to obtain access tokens used to authorize Mosaic API requests and SDK calls.

:::

:::warning Important

For highly-regulated industries, enable "Enforce FAPI 2.0 compliance" for a client and configure settings as described in [Manage clients](/guides/user/manage_clients.md#advanced-settings).

:::