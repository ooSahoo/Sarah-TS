---
toc:
  maxDepth: 2
---
# Integrate hosted login with Azure AD B2C using user flows

Since Azure Active Directory B2C is an IDP that provides password-based authentication only, Azure has partnered with Mosaic to seamlessly transition to passwordless authentication based exclusively on WebAuthn, which is based on [FIDO2 biometrics](https://fidoalliance.org/fido2/). This solution requires end-users to register a single account with your business and then log in with a fingerprint or facial biometric on any channel and any device.

This article illustrates how to integrate Mosaic's passwordless authentication into applications relying on Azure AD B2C as their IDP using basic user flow configurations. With passwordless authentication enabled, users who will request to authenticate from your app will be presented with both Azure login methods and WebAuthn and will freely choose the method they prefer.

## How it works
Here's a preview of the passwordless authentication/registration flow enabled by the integration. More details below.

![Azure flow](../../images/UserID/Azure-flow.png)

### User identification

The integration between Mosaic hosted login and Azure AD B2C depends on account linking, specifically, the synchronization of user-identifying data.
To ensure account linking, users must be identified by the same **email** in both apps.
On the Mosaic side, both identifiers undergo OTP verification before registering credentials.

### User and device registration

When a user requests to log in with biometrics, Mosaic's hosted experience will manage all the logic to proceed either with a WebAuthn registration or authentication. As a result, if a user attempts to log in without an existing profile, the flow will create a new user in Mosaic.

### WebAuthn registration flow
Here's a sample flow that illustrates the logic behind WebAuthn registration:

1. In Azure AD B2C login XP, the user requests to log in with biometrics.
2. Azure AD B2C redirects the browser to Mosaic's hosted XP.
3. Transmit:
    1. Collects a user identifier, that is, the email.
    2. Verifies the identifier using OTP verification.
    3. Creates a new user if no user is found for the user identifier.
    4. Registers biometrics to the identified user.
    5. Redirects back to Azure AD B2C with an authorization code.
4. Azure AD B2C exchanges the authorization code for an ID and access tokens.
5. Azure AD B2C processes the tokens, that is:
    1. Validates the tokens.
    2. Identifies the user based on their email

### WebAuthn authentication flow
Here's a sample flow that illustrates the logic behind WebAuthn authentication:

1. In Azure AD B2C login XP, the user requests to log in with biometrics.
2. Azure AD B2C redirects the browser to Mosaic's hosted XP.
3. Transmit:
  1. Authenticates the user using the WebAuthn credentials registered on the device.
  2. Redirects back to Azure AD B2C with an authorization code.
4. Azure AD B2C exchanges the auth code for ID and access tokens
5. Azure AD B2C processes the tokens, that is:
  1. Validates the tokens.
  2. Identifies the user based on their email


## Before you start

Before you delve into the procedure, ensure:
- you have an **Azure subscription**. See [Azure documentation](https://azure.microsoft.com/en-us/free/search/?ef_id=_k_CjwKCAiAjfyqBhAsEiwA-UdzJBghzILubY9sS4hD42m_trbn-RqIMqDbdgNZXJL_U7ExRydKO0wftBoCNOAQAvD_BwE_k_&OCID=AIDcmmy6frl1tq_SEM__k_CjwKCAiAjfyqBhAsEiwA-UdzJBghzILubY9sS4hD42m_trbn-RqIMqDbdgNZXJL_U7ExRydKO0wftBoCNOAQAvD_BwE_k_&gad_source=1&gclid=CjwKCAiAjfyqBhAsEiwA-UdzJBghzILubY9sS4hD42m_trbn-RqIMqDbdgNZXJL_U7ExRydKO0wftBoCNOAQAvD_BwE).
- you have linked an **Azure Active Directory B2C tenant** to your Azure subscription. See [Azure documentation](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant).
- you have registered a **Azure AD B2C web application** for the tenant. See [Azure documentation](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant).
- your **Azure AD B2C application** identifies users through the **email**. Identifying users through this method is crucial to allow account linking between Azure and Mosaic.

## Step 1: Add redirect URI to Mosaic app

Add the Identity Experience Framework app endpoint as an allowed redirect URI in your Mosaic app. After Mosaic authenticates the user, Mosaic will redirect back to Azure with an authentication code that will later be exchanged for an ID and access token. The redirect URI is provided by Azure Active Directory B2C and based on you app's domain in Azure. It should respect the following format:

`https://YOUR_AZURE_TENANT_NAME.b2clogin.com/YOUR_AZURE_TENANT_NAME.onmicrosoft.com/oauth2/authresp`

If you don't already have an application, you'll need to create one first (see [Create application](/guides/user/create_new_application.md)).

Identifying users through these methods is crucial to allow account linking between Azure and Mosaic.

## Step 2: Configure login experience in Transmit

In Mosaic's **Admin portal** > **B2C** or **B2B Identity** _based on your setup_ > **Experience Management**, configure the [authentication experience](/guides/user/auth_custom_flow.md):

- For the **User identifier** set the **email**.
- For the **Primary authentication method** set the **Passkey**.
- For the **Secondary authentication method** set:
  - **WebAuthn QR**, to provide an alternative login option in case biometric authentication is not supported on the device (for example, if a desktop device lacks biometric scanners).
  - **Email OTP** or **SMS OTP** (on the basis of the selected user identifier) to enable OTP verification of the user identifier.
- Remove all options that are activated by default in the  **Select user information** section. The collection of user information is managed by Azure AD B2C as the primary  IDP.
- (Optional) Activate the **Sign-in/Sign-up flow**  toggle to enable seamless redirection to the sign-up page for users attempting to log in with an unregistered user account. In this case, when the user clicks the login button, the system will automatically initiate OTP verification of the email in order to proceed with sign-up.

## Step 3: Create an Open ID Connect provider

From the Azure AD B2C main page, navigate to **Manage** > **Identity providers** and then create a new **Open ID Connect provider**. Here's a summary of the information expected for this setup:

- **Name** of the OIDC provider, e.g. `Transmit`
- **Metadata url**: `https://api.transmitsecurity.io/cis/oidc/.well-known/openid-configuration`
- **Client ID** and **Client secret** of your Mosaic app (available in your Mosaic app in the **Admin Portal**)
- **Scope**: `openid email` depending on the identification method chosen for the integration.
- **Response type**: `code`
- **Response mode**: `query`
- **Identity provider claims mapping**
  - **Email**: `email` that corresponds in Mosaic to a user's unique identifier. For more about user attributes supported in Mosaic, see [ID tokens](/openapi/id_token_reference.md).
  - **Display name**: `email`

By determining the **Identity provider claims mapping**, you establish the way Azure AD B2C interprets and uses the claims returned within the user tokens generated by Mosaic following the authentication.

## Step 4: Configure the user flow

Navigate to **Policies** > **User flow** to create a **user flow**. Before configuring it, you need to chose the **user flow type** you prefer. Here's a summary of the settings within this setup:

- **Name** of the user flow.
- **Identity providers**:
  - **Local accounts**: select **email sign-in** to enable users to choose Azure's email authentication instead of Mosaic's WebAuthn authentication. At login, both options will be displayed.
  - **Custom identity providers**: select the custom IDP created in [Step 3](#step-3-create-an-open-id-connect-provider).
  - **Application claims**: defines the user attributes collected on sign-up and returned to the application in the token. Select **Display name** and **Surname**.

## Step 5: Test the authentication flow

To test your integration, navigate to **Policies** > **User flow** > **Identity providers**, select the custom IDP you want to test the flow for. To run the test, ensure the following information is provided:
- **Reply url**: `https://jwt.ms`
- **User flow endpoint**: the endpoint address used in [Step 1](#step-1-add-redirect-uri-to-mosaic-app).

You'll be redirected to a demo of the Azure AD B2C login XP and will be able to test the authentication flow.

<style>
    section article ol li {
        margin-top: 6px !important;
    }

    section article ul li {
        margin-top: 6px !important;
    }

    th {
      min-width: 155px;
    }
</style>