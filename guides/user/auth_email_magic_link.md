---
toc:
  maxDepth: 2
---

# Login with email magic links

## Overview

Magic links can be sent to users by email in order to authenticate existing users or create new users.

<a href="https://github.com/TransmitSecurity/ciam-expressjs-vanilla-samples/tree/main/login-with-magiclink" target=_blank>Check out our sample app <img src="../../images/external-link-light.svg"></a>

![](../../images/UserID/auth_email_magic_link.jpg)

## Step 1: Create redirect URI

Create the redirect endpoint that will receive an authorization code when the user clicks the magic link in their email. This code will later be exchanged for an ID and access token. The redirect URI should accept `code` as a query parameter. For example, if `https://domain.com/verify` is your redirect URI, then Mosaic will redirect to `https://domain.com/verify?code=123abc` when the user clicks the link.

## Step 2: Add redirect URI to app

Add the redirect URI (e.g., `https://domain.com/verify`) as an allowed redirect URI for your Mosaic application. This will also be the `redirect_uri` that you'll need to pass in the send request.

 From the Admin Portal under **Applications**, click on your application to edit your application settings and add this URI under **Redirect URIs**.  If you don't already have an application, [create a new application](create_new_application.md).

## Step 3: Send magic links

Use a [send request](/openapi/user/one-time-login/#operation/SendEmail) like the one below to send a magic link to the specified email address. The `create_new_user` parameter will determine if this flow applies to new users, or only to existing ones. If set to `true` (and [public sign-ups](/guides/user/manage_apps/#advanced-settings) are enabled for this application), a new user is created once the code is exchanged if no user is found for the specified email. The `redirect_uri` should correspond to the redirect endpoint you created in step 1 and added as a redirect URI in step 2. If passed, `client_attributes` are used to validate that the magic link is clicked from the same device that requested it. This flow is described in the sequence diagram above.

:::info Note:

Make sure you have a valid client access token to authorize the request. If not, you'll need to get one. [Learn more](retrieve_client_tokens.md)

:::

```shell
curl -i -X POST \
  https://api.transmitsecurity.io/cis/v1/auth/links/email \
  -H 'Authorization: Bearer 91827321837bdfjf' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "name@example.com",
    "redirect_uri": "https://domain.com/verify",
    "create_new_user": true,
    "client_attributes": {
      "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
      "ip_address": "123.45.67.89"
    }'
```

If you want to customize the email, see [Next steps](#next-steps).

## Step 4: Verify magic links

Upon clicking the magic link from their email, the user will be redirected to the redirect URI you specified in the request. The URI will include a code in the query that you'll need to exchange for ID and access tokens by sending a [/oidc/token](/openapi/user/oidc/#operation/oidcToken) request like the one below. Replace placeholders with the code you received earlier, your redirect URI, and your client credentials that can be found in your application settings from the Mosaic Admin Portal.

```shell
curl -i -X POST \
  https://api.transmitsecurity.io/oidc/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d client_id=CLIENT_ID \
  -d client_secret=CLIENT_SECRET \
  -d code=CODE \
  -d grant_type=authorization_code \
  -d redirect_uri=REDIRECT_URI
```

## Next steps

Once you've completed a basic integration, here are some customizations you can consider:

- [Email customization](#email-customization)
- [Link settings](#link-settings)

### Email customization

The following default email templates can be customized either from the Admin Portal or via API (but not both):
- **Sign up**: sent to log in a user for the first time (if you allow auth flows to create new users)
- **Login**: sent to log in an existing user

From the Admin Portal (**B2C** or **B2B Identity** _based on your setup_ > **Authentication methods** > **Email magic links**), you can customize the color of the button and email address that appear in the message of the default templates. The email message will use the application's logo and name. See the screenshots below for the default texts.

To customize the email subject, text and appearance, use the `email_content` object in the [send request](/openapi/user/one-time-login/#operation/SendEmail), for example:

```shell
curl -i -X POST \
  https://api.transmitsecurity.io/cis/v1/auth/links/email \
  -H 'Authorization: Bearer 91827321837bdfjf' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "name@example.com",
    "redirect_uri": "https://domain.com/verify",
    "create_new_user": true,
    "client_attributes": {
      "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
      "ip_address": "123.45.67.89"
    },
    "email_content": {
      "subject": "Login to ACME",
      "primaryColor": "#6981FF",
      "base64logo": "data:image/png;base64,iVBORw0KGgoAA...XEzGmCC",
      "headerText": "Let'\''s log you in",
      "bodyText": "Click the button below to log in",
      "linkText": "Login",
      "infoText": "Confirming this request will securely log you in",
      "footerText": "If you didn'\''t request this email, you can safely ignore it."
    }
  }'
```
:::info Note

If you pass the `email_content` object, all the email branding will be taken from there and the default template won't be used at all. This means that if a field is not specified, it will be treated as empty.

:::

Here are screenshots of the email templates with their customizable field names:

![](../../images/UserID/email_field_mapping.png)

![](../../images/UserID/email_field_mapping_login.png)

### Link settings
From the Admin Portal (**B2C** or **B2B Identity** _based on your setup_ > **Authentication methods** > **Email magic links**), you can customize:
- Expiry time in minutes for the link sent in the email
- Email sender name ("from" name)

Make sure to apply the changes to the relevant application by selecting it from the top of the page.