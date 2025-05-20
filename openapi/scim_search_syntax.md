---
title: Search Query
---
# Search query syntax

When searching for users, you can create a search query based on the [SCIM protocol](https://www.rfc-editor.org/rfc/rfc7644#section-3.4.2.2).

## Structure

Each expression in the following form: `[SEARCH_FIELD] [OPERATOR] "[SEARCH_VALUE]"`. For example, this searches for a user named John: `[NAME_FIELD] eq "John"`, where `[NAME_FIELD]` depends on the user schema you're using (see [Searchable fields](#searchable-fields)). You can combine search expressions using and/or operators and grouping with brackets.

## Searchable fields

Searchable fields depend on the APIs you're using: Users APIs or User-SCIM APIs as they expose the user resource with different fields.

:::info Note
When searching for a date, provide it in the ISO 1806 format: `YYYY-MM-DDThh:mm:ss.sss±ZZ:zz`. For example, 2023-04-22T05:52:49.703+00:00.
:::

### Users APIs

You can search for users using any of the following fields:

- `external_account_id` - (string) user's unique app-level identifier in your system
- `external_user_id` - (string) user's unique tenant-level identifier in your system
- `email` - (string) user's primary email address
- `phone_number` - (string) user's primary phone number
- `secondary_emails` - (array of strings) user's secondary email addresses
- `secondary_phone_numbers` - (array of strings) user's secondary phone numbers
- `last_auth` - (date) date the user last authenticated in the ISO 1806 format
- `created_at` - (number) date user record was created
- `updated_at` - (number) date user record was updated
- `status` - (string) user's status
- `birthday` - (date) user's birthday as YYYY-MM-DD
- `name.first_name` - (string) user's first name
- `name.middle_name` - (string) user's middle name
- `name.last_name` - (string) user's last name
- `custom_app_data.*` - any nested `custom_app_data` fields


### Users-SCIM APIs

You can search for users using any field supported by [SCIM-compatible user schema](/openapi/user/user-scim/#operation/scimGetUsersPostRequest!c=200&path=Resources&t=response) exposed by Mosaic.

## Supported operators

Search expressions may include any of the following operators:

- `eq` - equal
- `ge` - greater equal
- `gt` - greater than
- `le` - less equal
- `lt` - less than
- `ne` - not equal
- `pr` - present
- `sw` - starts with
- `and` - and
- `or` - or

## Examples

### Users APIs

Specify search criteria using the `search` query parameter of the GET [/users](/openapi/user/user/#operation/getUsers) request. For example:

- `name.first_name eq "John"` searches for user named John
- `(address.country eq "USA")and(email sw "sales")` returns users who are located in the US and whose promary email address starts with sales

:::info Note
Make sure to URL-encode the search query expression.
:::


<!--
```shell
https://api.transmitsecurity.io/cis/v1/users?search=name.first_name%20eq%20%22John%22
```
-->

### Users-SCIM APIs

Specify search criteria using the `filter` query parameter of the GET [/scim/users](/openapi/user/user-scim/#operation/scimGetUsersGetRequest) request or the `filter` object sent a part of the POST [/scim/users/.search](/openapi/user/user-scim/#operation/scimGetUsersPostRequest) request. See [Manage users with SCIM](/guides/user/manage_users_scim.md) for details.

For example:
-  `name.givenName eq "John"` searches for a user named John
- `(preferredLanguage eq "en")or(addresses.country eq "USA")` returns users with English as their preferred language and also users located in the US
