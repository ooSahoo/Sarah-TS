# Leverage management apps

Management apps enable you to perform high-level administrative actions in Mosaic platform&mdash;manage users, apps, settings, and more. Unlike regular [applications](/guides/user/manage_apps.md), management apps don't allow you to authenticate or sign up new users, but are geared toward cross-app administration. Management apps typically represent backend services accessing Mosaic platform and operating within the tenant-wide scope, such as apps for your backoffice, SIEM monitoring, integrations, etc.

## How management apps work

Management apps allow performing cross-app operations while regular app capabilities are limited to the app scope.

:::info Note
You need to generate a [management access token](/guides/user/retrieve_client_tokens/#get-client-access-tokens) using the management app client credentials.

:::

With the management access token, you can:

* View and manage users across all apps associated with your tenant, including deleting users
* Organize users into groups
<!--* Configure role-based access and assign roles to users within your tenant-->
* Create and update apps and settings
* Inspect sessions and audit logs for multiple apps

View, create, and update management apps either using [Management APIs](/openapi/user/management-apps/), or from the Admin Portal (as described below).

## View management apps
The **Management Apps** tab under **Settings** presents a list of all your management applications, with the name and ID for each app along with the date it was created.

![](../../images/UserID/management_apps_page.png)

## Manage apps
You can manage your applications from the **Settings / Management Apps** page:
- Create a management app by clicking **+ Add management app** and configuring [Management app settings](#management-app-settings).
- Edit a management app by clicking ![](../../images/action_icon.svg) and then **Edit**.
- Delete a management app by clicking ![](../../images/action_icon.svg) and then **Delete**.

## Management app settings
You can access your management app settings from the **Settings / Management Apps** page by clicking the relevant application in the table.


![](../../images/UserID/management_apps_details.png)


- **Application ID**: Application identifier, automatically generated when the app is created. It cannot be edited.
- **Application name**: Name of your application, displayed in the Admin Portal.
- **Application description**: Short description of your application, displayed in the Admin Portal.
- **Client ID**: Client identifier for API requests, automatically generated when the management app is created. It cannot be edited.
- **Client secret**: Client secret used to authorize API requests. It is automatically generated when the management app is created, but can be rotated when needed. Keep this secret somewhere safe, and make sure it's never exposed to your mobile or web applications.