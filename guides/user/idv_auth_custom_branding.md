---
toc:
  maxDepth: 2
---
# Customize your identity verification experience  

Regardless of the business type, identity verification should always provide a seamless experience for your end users. Customizing your identity verification flow and screens enhances consistency and brand recognition while safeguarding users from phishing attempts. A branded experience helps users build trust, confidently navigate your application, and quickly detect inconsistencies if fraudulent applications attempt to impersonate your brand.  

From the Admin Portal, you can customize the flow and screens of the identity verification experience to align with your security requirements and brand identity. Below is an overview of the available customization options. 

:::info Note
- Customization is only available when using the web-hosted verification experience, where Mosaic provides the verification UI.
- See our [Identity Verification Experience Demos](/guides/verify/identity_verification_experience/) for examples of verification flows and customizable screens.  
:::

## Customize experience  

To customize identity verification experience on your apps, go to the **Admin Portal**, navigate to **Identity Verification** > **Customization**, select your app, and start customizing.  

### Verification flow settings  

To ensure a smooth identity verification process, configure the following settings from the **Admin Portal**:  

- **Verification flow**: Choose whether to enforce a [full identity verification flow](/guides/verify/identity_verification_flows/)—including ID document and selfie verification—or a document-only verification. 
- **Language**: Select the language displayed in the verification UI to match the user's locale and improve accessibility. If the user's locale doesn't match the available languages for the app, the UI will fall back to English.  
- **Show accessibility**: Enable accessibility features for the identity verification process.  

### Identity verification duration settings  

Define how long users have to complete the identity verification process before their session expires:  

- **User flow initiation time**: Set the maximum duration (in minutes) that a user has to begin the verification process. This can range from **5 to 10,080 minutes** (7 days).  
- **User flow completion time**: Set the maximum duration (in minutes) that a user has to complete the verification once they start. This can range from **5 to 60 minutes**.  
- **Data deletion period**: Define how long user verification data is stored before being automatically deleted. The value can range **until 90 days**. For support purposes, **we recommend a minimum of 7 days**.

### Web redirect settings

When implementing web-hosted Identity Verification flows, a seamless user experience is key. On desktop or laptop, the process typically runs within the same browser window or tab. Redirects help guide users smoothly, keeping them engaged and informed—whether verification is successful or an error occurs.

Properly configured redirects ensure users reach the right destination after verification, maintain consistency across devices, and prevent drop-offs caused by unexpected navigation changes. To set up redirects, go to the Admin Portal and configure the following:
- **Redirect for completion**: Define the URL where users are sent after successful verification. This could be a confirmation page, their account dashboard, or the next step in their workflow, such as an application submission page.
- **Redirect for error handling**: Specify where users should be directed in case of verification failure due to issues like a failed document upload or network timeout. The page should clearly explain the issue and provide actionable next steps, such as restarting the process.

## Customize branding  

You can customize the look and feel of your hosted identity verification experience to align with your brand identity. These settings allow you to adjust colors, fonts, and logos for a consistent user experience.  

From the **Admin Portal**, go to **Branding** under **Settings** and configure the following options:  

- **Logo**: Upload your company’s SVG logo to be displayed on the hosted identity verification screens.  
- **Primary color** and **buttons color**: Select the main color used throughout the UI, including links and highlights, and a separate color for buttons in the interface to match your brand.  
- **Font for title** and **text**: Select a font for the titles and one for the standard text displayed in the hosted identity verification UI (only applies to Web SDK).  

On the right side of the **Branding** page, the **Preview Panel** displays how your changes will appear in real-time. This allows you to fine-tune your branding choices before saving them.

![branding IDV flow](../../images/VerifyID/idv-branding.gif)

