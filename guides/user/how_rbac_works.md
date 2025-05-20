---
title: Role-based access control
exclude: true
---

# Role-based access control for users

Role-based access control (RBAC) is a method for restricting system access based on the roles of your end-users. In this model, every user is assigned to one (or more) roles and each role is assigned permissions. These permissions will then determine the user's access to your application. For example, a retail website can display different pricing models to buyers vs consumers, or a payment app may expose more sensitive business data to partners than to customers.

## Benefits

Using the Mosaic RBAC solution for access management has many benefits, including:

- Simpler to manage user permissions based on roles than individually, which also reduces errors
- Better information security by restricting access by need, and easily adjusting access when required
- Improved compliance with regulatory and statutory requirements for confidentiality and privacy
- Reduced risk of integrating third-party users (such as vendors) by giving them pre-defined roles

What's more, combining RBAC with our authentication capabilities has the added benefit of having to build and maintain a single authorization system since roles are automatically returned in user access tokens upon successful user authentication (see [How authentication works](/guides/user/how_auth_works.md)).

## Roles and permissions

Whereas groups are a collection of users, roles are essentially a collection of user permissions. In this context, roles are more stable than groups since they're organized around access management rather than user identities, which are more subject to change.

Roles are created on the tenant level, but are assigned on the application level. For example, the same user can have a `Partner` role in one app and a `Customer` role in another. Each user can be assigned multiple roles and the same permission can be assigned to different roles. Therefore, the user's effective permissions will be the union of permissions of all their assigned roles for the given application.

Roles and permissions are managed using the [Role APIs](/openapi/user/roles/).