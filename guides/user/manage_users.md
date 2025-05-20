# Manage users

 Mosaic provides advanced user management capabilities with extensible user profiles that can be reused across different apps. This enables creating tailor-made experiences for a set of users, where users of one app are treated as returning users when they log in to a different app for the first time (see [How users work](/guides/user/how_users_work.md)).

 You can manage users in the Admin Portal, using [Journeys](/guides/orchestration/concepts/journeys_overview.md), or via the [Users APIs](/openapi/user/user/).

## View or search users

The **Users** page presents a list of all your users, including basic attributes like the **profile verification status**, the **User ID**, the **email**, the **phone number**, the **dates of user creation** and **last login**, and the **organizations** to which they belong. By default, the page shows the total user count and displays users organized according to the last login.

You can filter and count users through basic or advanced search, export search results in CSV format, and click a user to view the user's basic profile.


|![user-basic-search](../../images/UserID/user-basic-search.gif)|
|-|

**Basic search** allows you to search users by tenant-level criteria like user status, email, phone number, etc.

**Advanced search** allows you to filter users based on query expressions structured according to the [SCIM protocol](/openapi/scim_search_syntax/#search-query-syntax). This functionality covers both standard and custom attributes from Mosaic's proprietary [searchable fields](https://developer.transmitsecurity.com/openapi/scim_search_syntax/#searchable-fields).

Search results can be exported in CSV format. Upon user request, Mosaic generates the file and sends it to the email address used to log in to the portal.

For every search you launch, the total user count is adjusted based on the search results. Note that, for analytics purposes, you can retrieve user counts via API. For more see [Reporting and analytics](/guides/user/reporting_and_analytics.md).


## Create, edit, or delete users

You can manage your users from the **Users** page:
* Create a user by clicking **+ Add Users**, entering the user's email and/or phone number (at least one is required), and selecting which applications the user can access.
* Edit a user by clicking ![](../../images/action_icon.svg) and then **Edit user**.
* Delete a user by clicking ![](../../images/action_icon.svg) and then **Delete**.

## Manage user status

Change a user's status by clicking ![](../../images/action_icon.svg) and then selecting the required status. The available options depend on the user's current status:
* If the user is active or pending, you can select **Suspend user**. Suspended users are listed as **Suspended** and cannot log in to any apps.
* If the user is suspended, you can select **Activate user**.

## Manage user's apps

Users can only access the apps to which they have been assigned (see [App users](/guides/user/how_users_work/#app-users)). You can assign users to apps when you create the user via the Admin Portal. You can remove a user from specific apps by clicking ![](../../images/action_icon.svg) and then **Remove from apps**.

:::info Note
Currently, an existing user can be assigned to additional apps implicitly when logging in to the application (if you allow authentication flows to create new users).
:::

## Manage user's consents

Users don't need to explicitly consent to using the app provided that the app doesn't leverage any external clients. For third-party clients, users must approve operations by granting consent.

You can review consents the user granted for each app by expanding app details in the user profile. The consent is granted for 30 days and is revoked after this period.

## User profile

You can access a user profile from the **Users** page by clicking the relevant user in the table. These fields are displayed:
* **First Name**: The user's first name.
* **Last Name**: The user's last name.
* **Email**: The user's primary email.
* **Secondary emails**: The user's secondary emails.
* **Phone number**: The user's primary mobile number.
* **Secondary phone numbers**: The user's secondary mobile numbers.
* **Birthday**: The user's birthday.
* **Language**: The user's preferred language.
* **Address**: The user's address: country, city, street address and type.

These fields are part of the common Mosaic user attributes that are shared with all apps, and they can be edited in the Admin Portal. There are other common fields, as well as app-specific fields, that can be modified via the [Users APIs](/openapi/user/user/).

The primary user's email and phone number can be modified in the Admin Portal or via the [Verification APIs](/openapi/user/verification/)&mdash;in order to update these fields, the user has to complete the verification procedure. See [Update user's primary email and phone number](/guides/user/update_user_primary_email_phone.md)

