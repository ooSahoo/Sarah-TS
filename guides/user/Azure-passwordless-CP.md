---
toc:
  maxDepth: 2
---
# Integrate hosted login with Azure AD B2C using custom policies

Since Azure Active Directory B2C is an IDP that provides password-based authentication only, Azure has partnered with Mosaic to seamlessly transition to passwordless authentication based exclusively on WebAuthn, which is based on [FIDO2 biometrics](https://fidoalliance.org/fido2/). This solution requires end-users to register a single account with your business and then log in with a fingerprint or facial biometric on any channel and any device.

This article illustrates how to integrate Mosaic's passwordless authentication into applications relying on Azure AD B2C as their IDP using custom policies. With passwordless authentication enabled, users who will request to authenticate from your app will be presented with both Azure login methods and WebAuthn and will freely choose the method they prefer.

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

## Step 4: Create a Mosaic policy key

In your **Azure**'s **Directory page**, navigate to **Policies** > **Identity Experience Framework** to create a **policy key** to sign and validate tokens to securely communicate between Azure AD B2C and Mosaic. After adding a new policy key, configure the following settings:

- **Options**: select **Manual**.
- **Name**: enter a name for the policy key. Note that the prefix `B2C-1A_` systematically appends to the chosen name, e.g. `B2C-1A_TransmitClientSecret`.
- **Secret**: enter the **Client secret** of your Mosaic app (available in your Mosaic app in the **Admin Portal**).
- **Key usage**: select **Signature**.

## Step 5: Configure Mosaic as an IDP

To enable sign-in through Mosaic, it needs to function as a claim provider, specifically, a generic IDP. To do so:

1. Obtain the custom policy starter pack from GitHub by [downloading the custom policy directory ZIP folder](https://github.com/Azure-Samples/active-directory-b2c-custom-policy-starterpack/archive/master.zip) or cloning the `git clone https://github.com/Azure-Samples/active-directory-b2c-custom-policy-starterpack` repository.

2. In the files in the **LocalAccounts** directory, replace the string `yourtenant` with the Azure AD B2C tenant name.

3. Open the `LocalAccounts/ TrustFrameworkExtensions.xml`.

4. Find the **ClaimsProviders** element (if it doesn't appear, add it under the root element) and add a new **ClaimsProvider** similar to the following example:

```xml
 <ClaimsProvider>
     <Domain>api.transmitsecurity.io</Domain>
     <DisplayName>Transmit</DisplayName>
     <TechnicalProfiles>
       <TechnicalProfile Id="TS-OpenIdConnect">
         <DisplayName>Transmit</DisplayName>
         <Protocol Name="OpenIdConnect" />
         <Metadata>
           <Item Key="METADATA">https://api.transmitsecurity.io/cis/oidc/.well-known/openid-configuration</Item>
            <!-- Update the Client ID below to the Mosaic Application ID -->
           <Item Key="client_id">00000000-0000-0000-0000-000000000000</Item>
           <Item Key="response_types">code</Item>
           <Item Key="scope">openid email</Item>
           <Item Key="response_mode">form_post</Item>
           <Item Key="HttpBinding">POST</Item>
           <Item Key="UsePolicyInRedirectUri">false</Item>
           <Item Key="AccessTokenResponseFormat">json</Item>
         </Metadata>
         <CryptographicKeys>
           <Key Id="client_secret" StorageReferenceId="B2C_1A_TransmitClientSecret" /> <!-- Policy key name created in Step 4 -->
         </CryptographicKeys>
         <OutputClaims>
           <OutputClaim ClaimTypeReferenceId="issuerUserId" PartnerClaimType="sub" />
           <OutputClaim ClaimTypeReferenceId="email" PartnerClaimType="email" />
           <OutputClaim ClaimTypeReferenceId="identityProvider" PartnerClaimType="iss" />
           <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" AlwaysUseDefaultValue="true" />
         </OutputClaims>
         <OutputClaimsTransformations>
           <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName" />
           <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName" />
           <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId" />
         </OutputClaimsTransformations>
         <UseTechnicalProfileForSessionManagement ReferenceId="SM-SocialLogin" />
       </TechnicalProfile>
     </TechnicalProfiles>
   </ClaimsProvider>

```

## Step 6: Add the identity provider to a user journey
:::info Note
If you don't have a user journey configured in Azure, see [Azure's doc](https://learn.microsoft.com/en-us/azure/active-directory-b2c/partner-bindid?pivots=b2c-custom-policy#add-a-user-journey).
:::

1. Find the journey step element that includes `Type=CombinedSignInAndSignUp`, or `Type=ClaimsProviderSelection` in the user journey. It's usually the first journey step. The **ClaimsProviderSelections** element has an identity provider list that users sign in with. The order of the elements controls the order of the sign in buttons.
2. Add a **ClaimsProviderSelection** XML element.
3. Add a name for the **TargetClaimsExchangeId**.
4. Add a **ClaimsExchange** element.
5. Set the **Id** to the value of the target claims exchange ID. This action links the Mosaic button to `Transmit-SignIn`.
6. Update the **TechnicalProfileReferenceId** value to the technical profile ID you created in Step 1.

The following XML example illustrates how to organize a journey that incorporates an identity provider.

```xml
<UserJourney Id="TSSignUpOrSignIn">
<OrchestrationStep Order="1" Type="CombinedSignInAndSignUp" ContentDefinitionReferenceId="api.signuporsignin">
      <ClaimsProviderSelections>
        ...
        <ClaimsProviderSelection TargetClaimsExchangeId="TSIDExchange" />
      </ClaimsProviderSelections>
      ...
    </OrchestrationStep>

    <OrchestrationStep Order="2" Type="ClaimsExchange">
      ...
      <ClaimsExchanges>
        <ClaimsExchange Id="TSIDExchange" TechnicalProfileReferenceId="TS-OpenIdConnect" />
      </ClaimsExchanges>
    </OrchestrationStep>
```
## Step 7. Configure the relying party policy

The relying party policy specifies the user journey Azure AD B2C executes. To set up your RP policy, manage the custom claims passed to your application.
Here's an example of the relying party policy file.

```xml
<RelyingParty>
    <DefaultUserJourney ReferenceId="SignUpOrSignInWithTS" />
    <TechnicalProfile Id="TS-OpenIdConnect">
      <DisplayName>TS PolicyProfile</DisplayName>
      <Protocol Name="OpenIdConnect" />
      <OutputClaims>
        <OutputClaim ClaimTypeReferenceId="username" />
        <OutputClaim ClaimTypeReferenceId="fname" />
        <OutputClaim ClaimTypeReferenceId="lname" />
        <OutputClaim ClaimTypeReferenceId="email" />
        <OutputClaim ClaimTypeReferenceId="objectId" PartnerClaimType="sub"/>
        <OutputClaim ClaimTypeReferenceId="identityProvider" />
        <OutputClaim ClaimTypeReferenceId="tenantId" AlwaysUseDefaultValue="true" DefaultValue="{Policy:TenantObjectId}" />
      </OutputClaims>
      <SubjectNamingInfo ClaimType="sub" />
    </TechnicalProfile>
  </RelyingParty>
```
For more, see [Azure's custom policy starter pack](https://learn.microsoft.com/en-us/azure/active-directory-b2c/partner-bindid?pivots=b2c-custom-policy#configure-the-relying-party-policy).

## Step 8: Upload the custom policy

In your **Azure**'s **Directory page**, select **Switch** and then navigate to **Policies** > **Identity Experience Framework** to **upload a custom policy**. To do so, in the **LocalAccounts** starter pack, upload the following files in the same order:

- Base policy, for example `TrustFrameworkBase.xml` (from Azure's doc about [user journeys](https://learn.microsoft.com/en-us/azure/active-directory-b2c/partner-bindid?pivots=b2c-custom-policy#add-a-user-journey)).
- Localization policy, for example `TrustFrameworkLocalization.xml` <!--never mentioned?-->.
- Extension policy, for example `TrustFrameworkExtensions.xml` (from Azure's doc about [user journeys](https://learn.microsoft.com/en-us/azure/active-directory-b2c/partner-bindid?pivots=b2c-custom-policy#add-a-user-journey)).
- Relying party policy, such as `SignUpOrSignIn.xml`

## Step 9: Test your custom policy

To test your custom policy settings, in the Azure AD B2C tenant, navigate do **Policies** > **Identity Experience Framework** and do as follows:

- For **Custom policies** select `B2C_1A_signup_signin`.
- For **Application** select the web application you registered and for the **Reply URL** enter `https://jwt.ms`.

After running the policy, the browser is redirected to the Mosaic sign in page. Authenticate with email and biometrics until the browser is redirected to `https://jwt.ms`.
The token content returned by Azure AD B2C appears.

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