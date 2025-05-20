---
toc:
  maxDepth: 2
---
# Reporting and analytics

Analyzing data about your app users is crucial as it allows you to create custom metrics to analyze your app usage in order to both assess your app's usability and effectiveness and design your business KPIs and strategies. It helps tracking user acquisition, engagement, and retention, providing valuable insights to optimize strategies, measure operational effectiveness, and make informed decisions for enhancing the overall user experience. 

## Filter or count users

In the Admin Portal ( **B2C Identity** > **Users**) you have access to the complete list of your app users. There, you can filter users through basic search, and filter and count subsets of users using advanced search, which relies on a [SCIM-based query](/openapi/scim_search_syntax/#search-query-syntax). 
Additionally, you can export search results in CSV. For more about user search capabilities in the Admin portal, see [View or search users](/guides/user/manage_users#view-or-search-users).

|![user-advanced-search](../../images/UserID/user-advanced-search.gif)|
|-|

Filtering and counting users via a [SCIM-based query](/openapi/scim_search_syntax/#search-query-syntax) is useful as it provides dara which can be utilized in external tools for diverse analytics. Here's an example of criteria you can combine within a query:
- `last_auth`: date the user last authenticated
- `created_at`: date user record was created
- `updated_at`: date user record was updated
- `custom_app_data.*`: custom\_app\_data fields

For reporting purposes, you may need to automate the retrieval of user counts through scheduled scripts. Mosaic APIs allow you to filter users by specifying the search criteria using a [SCIM-based query](/openapi/scim_search_syntax/#search-query-syntax). You can use the [/v1/users](/openapi/user/user/#operation/getUsers) endpoint to retrieve the users that meet the search criteria, or use the [/v1/users/count](/openapi/user/user/#operation/getUsersCount) endpoint to only count the number of users that meet the criteria (without retrieving user data). If no criteria is specified, all users are returned/counted.

## Examples

Here are examples of queries used to segment user data for analytics purposes:

- Active users (i.e. authenticated at least once): `status eq "Active"`
- Pending users (i.e. created but never authenticated): `status eq "Pending"`
- Users that logged in within the last 7 days: `last_auth gt "[DATE_7_DAYS_AGO]"`
- Users who signed up in November 2023: `(created_at ge "2023-11-01T00:00:00.000Z") and (created_at lt "2023-12-01T00:00:00.000Z")`
- Users that signed up in November 2023 and verified their profile (i.e. authenticated at least once): `(status eq "Active") and (created_at ge "2023-11-01T00:00:00.000Z") and (created_at lt "2023-12-01T00:00:00.000Z")`
- VIP users (based on custom data): `custom_app_data.vip_user eq true`

<style>
    section article ol li {
        margin-top: 6px !important;
    }

    section article ul li {
        margin-top: 10px !important;
        margin-bottom: 2px;
    }

    th {
      min-width: 155px;
    }
</style>
