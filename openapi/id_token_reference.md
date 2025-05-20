---
title: ID tokens
---
# ID tokens

This describes the structure and semantics of the ID token returned by Mosaic upon successful user authentication.

## Default claims

Default claims are returned in the ID token without being requested. These claims include standard [JWT claims](https://openid.net/specs/openid-connect-core-1_0.html#IDToken), such as basic user profile data, and info about their authentication.

|Field |Description |Type
|-------------- |--- |-
|**sub** |User's unique identifier (`user_id`).| String
|**tid** |ID of the Mosaic tenant. |String
|**aud** |Client ID of the application associated with the token request. |String
|**exp** |Token expiration time, as a unix-epoch encoded timestamp in seconds. |Number
|**iat** |Time the token was issued, as a unix-epoch encoded timestamp in seconds. |Number
|**iss** |Token issuer, which should be: `https://userid.security` (for global tenants, non EU and CA) or `https://eu.userid.security` (for EU tenants), `https://ca.userid.security` (for CA tenants). |String
|**auth\_time** |Time the user was authenticated, which can be different from the token issue time (if the user was already logged in when the token was requested). |Number
|**amr** |Authentication methods used: `eml`, `eotp`, `sms`, `pwd`,`social`, `webauthn`,`mfa`. |Array
|**acr** |[Requested ACR values](/openapi/user/oidc/#operation/oidcAuthenticate!in=query&path=acr_values&t=request) that were satisfied, as a space delimited string.|String


## Custom claims

Aside from the default claims, custom claims can be added to the token by request (see [Requesting claims](#requesting-claims)) or included automatically if they were enabled in the **ID token - Pre-defined custom claims** client configuration (see [Manage clients](/guides/user/manage_clients.md)). This includes user roles and permissions, additional user profile data, and custom data set by your application.

The following claims can be requested:

<!--|**roles** |User's assigned [roles](/guides/user/how_rbac_works/). |Array
|**permissions** |User's [permissions](/guides/user/how_rbac_works/#roles-and-permissions). |Array-->

|Field |Description |Type
|--- |--- |-
|**fname** |User's first name. |String
|**mname** |User's middle name. |String
|**lname** |User's last name. |String
|**webauthn** |Returned only if WebAuthn was used. Contains info about the devices used, the last time the user logged in, and the first and last time the authenticating device was used. |Object
|**webauthn\_username** |Returned only if WebAuthn was used. Contains the username used (UUID) used for WebAuthn. |String
|**new\_user** |Indicates if a new user was created as part of the authentication flow. |Boolean
|**groups** |[Groups](/guides/user/how_users_work/#user-groups) to which the user belongs. |Array
|**roles** |List of role IDs assigned to the user. |Array
|**role\_values** |List of human-readable main and custom roles assigned to the user. |Array
|**permissions** |List of permissions delegated to the user. |Array
|**email** |User's primary email. |String
|**email\_verified** |Indicates if the user's primary email is verified. |Boolean
|**phone\_number** |User's primary phone number. |String
|**phone\_number\_verified** |Indicates if the user's primary phone number is verified. |Boolean
|**username** |Username used to identify the user for password login (unless a primary email will be used instead). Defined only if a password was set for the user. |String
|**secondary\_phone\_numbers** |List of user's secondary phone numbers (objects).|Array
|**secondary\_emails** |List of user's secondary emails (objects). |Array
|**birthday** |User's birthday as YYYY-MM-DD. |String
|**address** |User's address. |Object
|**address\_type** |Type of address|String
|**street\_address** |User's street address. |String
|**city** |User's city of residence.|String
|**country** |User's country of residence.|String
|**picture** |The picture of user, specified as a URL. |String
|**language** |The language of the user, as provided by the browser using the Accept-Language header field. |String
|**created\_at** |Date user was created in the tenant. |Number
|**last\_auth** | Date user last authenticated. |Number
|**external\_account\_id** |User identifier in an app, set by the app. |String
|**external\_user\_id** | User identifier in a tenant, set by the app. |String
|**app\_name** |Name of the app the user is associated with. |String
|**custom\_data** | Custom data object for tenant user info. |Object
|**custom\_app\_data** |Custom data object for app-related user info. |Object
|**custom\_group\_data** |Custom data object for group info. |Object
|**approval\_data** |Returned only in transaction signing flows. Contains info about transaction type, payment amount, currency, payment method, and payee info. |Object
|**organization** |[Organization](/guides/user/b2b/how-auth-works/#organizations) to which the user belongs. |String

:::info Note

For detailed structure of the user profile data, see the [User Object](/openapi/user/user/#operation/getUserById!c=200&path=result&t=response) returned in the result.

:::

## Requesting claims

Additional claims are requested using the `claims` request parameter, as defined by the [OIDC standard](https://openid.net/specs/openid-connect-core-1_0.html#ClaimsParameter). For example, the following `claims` parameter value is used to request all the user's permissions:
```json
{
   "id_token":{
      "permissions": null
   }
}
```
Your custom user data can be added to the ID token by requesting the `custom_data` or `custom_app_data` claims. If their value is set to `null` in the request, the entire object will be returned. However, you can also include only a subset of fields in these claims by using a `fields` member to specify the names of the fields to return as an array.

The following example is used to request 2 fields (named `field1` and `field2`) from the tenant-level custom data and another field (named `field3`) from the app-level custom data:

```json
{
   "id_token":{
      "custom_data":{
         "fields":[
            "field1",
            "field2"
         ]
      },
      "custom_app_data":{
         "fields":[
            "field3"
         ]
      }
   }
}
```

:::attention Note

The payload of the `custom_data` or `custom_app_data` claim cannot exceed 100KB.

:::

## Token example

Here's an ID token that includes the user's secondary emails and specific fields from the custom data:

```json
{
  "sub": "ufnbfps4ki0qm1twdo79g",
  "tid": "6oijksdf9esfehwjkfey9",
  "email": "user@acme.com",
  "groups": [],
  "new_user": false,
  "amr": [
    "social"
  ],
  "email_verified": true,
  "secondary_emails": [
    {
      "value": "user@email.com",
      "email_verified": false
    }
  ],
  "custom_data": {
    "field1": "value1",
    "field2": "value2"
  },
  "custom_app_data": {
    "field3": "value3"
  },
  "auth_time": 1674562962,
  "at_hash": "gUWf6OJKHDKUAYDAIX7LQ",
  "aud": "pVEZaxFuQyCQ95NNhiBLe",
  "exp": 1674566580,
  "iat": 1674562980,
  "iss": "https://userid.security"
}
```

