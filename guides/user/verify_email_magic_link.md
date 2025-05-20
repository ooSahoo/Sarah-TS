---
toc:
  maxDepth: 2
---

# Verify email using magic links

## Overview

Email magic links can be sent to users in order to verify their email address.  For example, this can be used to enrich the profile of existing users that are already logged in. Once the email verification is completed, the email address will be added to the user profile and marked as verified. Unlike the authentication flows, users will not be authenticated (or created) and no tokens will be returned.

![](../../images/UserID/verify_email_magic_link.jpg)

## Step 1: Create redirect URI

Create the redirect endpoint that will receive the verification result when the user clicks the magic link in their email. The redirect URI should accept `result` as a query parameter. For example, if `https://domain.com/verify` is your redirect URI, then Mosaic will redirect to `https://domain.com/verify?result=true` when the user clicks the link.

## Step 2: Add redirect URI to app

Add the redirect URI (e.g., `https://domain.com/verify`) as an allowed redirect URI for your Mosaic application. This will also be the `redirect_uri` that you'll need to pass in the send request. From the Admin Portal under **Applications**, click on your application to edit your application settings and add this URI under **Redirect URIs**.

## Step 3: Send magic links

Use a [send request](/openapi/user/verification/#operation/sendVerificationEmail) like the one below to send the email magic link to the specified email address, along with the `redirect_uri` you configured in step 2. This flow is described in the sequence diagram above.

:::info Note

This flow requires an existing, logged-in user. So make sure you have a valid user access token (returned upon successful authentication) to authorize the request.

:::

```shell
curl --request POST \
     --url https://api.transmitsecurity.io/cis/v1/verification/links/email \
     --header 'Accept: application/json' \
     --header 'Authorization: Bearer 91827321837bdfjf' \
     --header 'Content-Type: application/json' \
     --data '
{
     "email_address": "user@email.com",
     "redirect_uri": "https://domain.com/verify"
}
'
```

If you want to customize the email, see [Next steps](#next-steps).

## Step 4: Verify magic links

Upon clicking the magic link from their email, the user will be redirected to the redirect URI you specified in the request. The URI will include the verification result in the query in a boolean parameter called `result`. If set to `true`, the email address has been verified and will be added to the user profile, marked as verified. Since this flow is intended for existing users that are logged in, the user won't be authenticated (or created) and no tokens will be returned.

## Next steps

Once you've completed a basic integration, here are some customizations you can consider:

- [Email customization](#email-customization)
- [Link settings](#link-settings)

### Email customization

The default email template can be customized either from the Admin Portal or via API (but not both).

From the Admin Portal (**B2C** or **B2B Identity** _based on your setup_ > **Authentication methods** > **Email magic links**), you can customize the color of the button and email address that appear in the message of the default template. The email message will use the application's logo and name. See the screenshot below for the default texts.

To customize the email subject, text and appearance, use the `email_content` object in the [send request](/openapi/user/verification/#operation/sendVerificationEmail), for example:

```shell
curl --request POST \
     --url https://api.transmitsecurity.io/cis/v1/verification/links/email \
     --header 'Accept: application/json' \
     --header 'Authorization: Bearer 91827321837bdfjf' \
     --header 'Content-Type: application/json' \
     --data '
{
     "email_address": "user@email.com",
     "redirect_uri": "https://domain.com/verify",
     "email_content": {
      "subject": "Verify",
      "primaryColor": "#6981FF",
      "base64logo": "data:image/png;base64,iVBORw0KGgoAA...XEzGmCC",
      "headerText": "Verify your email",
      "bodyText": "Click the button below to verify",
      "linkText": "Verify",
      "infoText": "Confirming this request will securely verify your email",
      "footerText": "If you didn'\''t request this email, you can safely ignore it."
     }
}
'
```
:::info Note

If you pass the `email_content` object, all the email branding will be taken from there and the default template won't be used at all. This means that if a field is not specified, it will be treated as empty.

:::

Here's a screenshot of the email verification template with its customizable field names:

![](../../images/UserID/email_field_mapping_verify.png)

### Link settings
From the Admin Portal (**B2C** or **B2B Identity** _based on your setup_ > **Authentication methods** > **Email magic links**), you can customize:
- Expiry time in minutes for the link sent in the email
- Email sender name ("from" name)

Make sure to apply the changes to the relevant application by selecting it from the top of the page.