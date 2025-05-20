---
title: Use custom email providers
---

# Use custom email providers

Mosaic platform enables you to send transactional email for essential IAM journeys, including login, signup, verification, and password reset. 

By default, we deliver email messages via Mosaic's own service, but you can also configure the platform to send out messages from your SendGrid account or via SMTP. This feature may be useful if you already use SendGrid, if you have a configured SMTP server, and in some other cases. For example, you may wish to send email messages from your own email address.  

This configuration is set on a tenant's level from **Settings** > **Email provider**.

## Use default provider 

To send email messages via Mosaic's email service, choose **Default** from the **Email provider** list:

![](../../images/UserID/email_default.png)  

The default email provider doesn't require additional configuration.  

## Set up SMTP

You can set up email delivery over SMTP protocol.  

From **Settings** > **Email provider**, select **SMTP** and enter the parameters:  
- **Host**: SMTP server's IP address or URL  
- **Port**: SMTP port, for example, `25` 
- **Username**: The sender account's username  
- **Password**: The sender account's password  
- **From (default)**: Sender email address  

If you want to use custom email addresses depending on the flow, toggle on **Define communication type specific addresses** and enter the email: 
* **From (login)**: Email address for the login flow  
* **From (signup)**: Email address for the signup flow  
* **From (verify)**: Email address for the verification flow   
* **From (reset password)**: Email address for the reset password flow   

![](../../images/UserID/email_smtp.png)  

After saving the configuration, you should verify that email delivery works as expected.  

## Set up SendGrid

You can dispatch your email messages from your SendGrid account. 

From **Settings** > **Email provider**, select **SendGrid** and enter the parameters:  
- **Password**: Password to your SendGrid account
- **From (default)**: Sender email address  

If you want to use custom email addresses depending on the flow, toggle on **Define communication type specific addresses** and enter the email: 
* **From (login)**: Email address for the login flow  
* **From (signup)**: Email address for the signup flow  
* **From (verify)**: Email address for the verification flow   
* **From (reset password)**: Email address for the reset password flow   

After saving the configuration, you should verify that email delivery works as expected.  

![](../../images/UserID/email_sendgrid.png)  

## Set up Microsoft 365 Exchange

You can set up email delivery over Microsoft 365 Exchange.

:::info Note
To use Microsoft 365 Exchange, you'll need:
- Microsoft 365 Exchange subscription is licensed to send emails through Exchange Online.
- Have your Microsoft 365 Exchange account associated with an [Azure account](https://azure.microsoft.com/en-us/).
- Have a [registered Azure Active Directory app](https://learn.microsoft.com/en-us/azure/healthcare-apis/register-application#register-a-new-application). This is the tenant app used to send emails.
- To configure the **Mail.send** permission in the app's **API permissions section** (see [Azure doc](https://learn.microsoft.com/en-us/azure/healthcare-apis/register-application#api-permissions)).

:::

From **Settings** > **Email provider**, select **Microsoft 365 Exchange** and enter the parameters:  
- **Tenant ID**: found in the Azure AD app **Overview** section (see [Client and Tenant IDs](https://learn.microsoft.com/en-us/azure/healthcare-apis/register-application#application-id-client-id)). 
- **Application (client) ID**: found in the Azure AD app **Overview** section (see [Client and Tenant IDs](https://learn.microsoft.com/en-us/azure/healthcare-apis/register-application#application-id-client-id)). 
- **Client secret**: created in your Azure AD app's **Certificate & secrets** section (see [Certificate & secrets](https://learn.microsoft.com/en-us/azure/healthcare-apis/register-application#certificates--secrets)).
- **From (default)**: Sender email address

After saving the configuration, you should verify that email delivery works as expected.  

![](../../images/UserID/Microsoft365-setup.png)  
