# View admin activity

Mosaic logs admin events created in the Admin Portal or via API.

## View or search for events

From **Admin Activity**, you can view admin events. You can filter the events using the search box at the top of the page. Events can be filtered by date and time, event type, and the user who created the event. <!--You can also click ![](../../images/action_icon.svg) to view the raw event data.-->

![](../../images/UserID/admin_audit_logs.png)

## Admin activity

The **Admin Activity** table displays these columns:
* **Time**: date and time the event was created
* **Actor**: user or app that created the event
* **Client**: client type used to create the event
* **Activity type**: the created event type
* **Target resource**: the event target, which can be a tenant, app, or user
* **IP**: IP address of the device used to create the event

Admin logs include the following types of activity:

|Event |Description
|------- |--------------------
|`addAdmin` |A new admin user was created
|`adminCreateTenant` |A new tenant was created
|`adminLogin` |An admin user logged in
|`adminLogout` |An admin user logged out
|`adminUpdateTenant` |The tenant was modified
|`adminUpdateUser` |An admin modified a user
|`createApiToken` |An API token was created
|`createApp` |An new app was created
|`createMgmtApp` |A new management app was created
|`createUser` |A new user was created
|`deleteApiToken` |An API token was deleted
|`deleteApp` |An app was deleted
|`deleteMgmtApp` |A management app was deleted
|`deleteUser` |A user was deleted
|`editAuthSettings` |An app's authentication settings were modified
|`editGeneralSettings` |General settings were modified
|`removeAdmin` |An admin user was removed
|`updateApp` |An app was modified
|`updateMgmtApp` |A management app was modified
|`editPreviewPolicy` |A preview policy was modified
|`pushPolicyToProduction` |A preview policy was pushed to production
