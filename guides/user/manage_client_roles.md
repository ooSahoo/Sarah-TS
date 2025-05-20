---
title: Manage client roles
toc:
  maxDepth: 2
---
# Manage client roles and grant access to Mosaic APIs

In Mosaic, you can restrict or allow access to APIs based on the client role, where the role determines which permissions to give the app client. For example, a monitoring app can be allowed to only retrieve activity data. However, any requests to modify data from this app will be denied by Mosaic.

Leverage default roles and configure custom client roles with specific permissions. This allows you to create client roles tailored to your organizational needs and provide sufficient access to different applications without elevating their permissions.

:::info Note
Roles can only be assigned to **first-party app clients**. Third-party clients, management apps, as well as clients configured for [SSO](/guides/user/SSO_orchestration/SSO_config_service.md) cannot be assigned roles.
:::


## How RBAC works

Client role-based access control (RBAC) restricts access to Mosaic resources based on the roles of the Mosaic client. In this model, every client is assigned to one (or more) roles and each role is assigned permissions. These permissions will then determine the client's ability to run requests to Mosaic APIs. One permission such as `read:user` can grant access to one or more APIs logically grouped together, for example, [Count users API](/openapi/user/user/#operation/getUsersCount) and [Get users API](/openapi/user/user/#operation/getUsers). In case of insufficient permissions, client requests to Mosaic will fail.

Using roles offers several advantages, such as:

- Enhancing information security by limiting access based on necessity and allowing for easy adjustments when needed
- Supporting compliance with confidentiality and privacy regulations and standards
- Minimizing risks when integrating external services by restricting their access to Mosaic APIs

Roles are created at the tenant level and assigned to clients individually. Each client can be assigned multiple roles and the same permission can be granted to different roles. Therefore, the client's effective permissions will be the union of permissions of all their assigned roles. The client access token includes `ts_roles` and `ts_permissions` claims listing assigned roles and granted permissions.

```json
{
  "tid": "8AEM5PpWyJBH6opzIOrJ2",
  "app_name": "ACME",
  "app_id": "LQGB-uUqPbMzBBKCsxD11",
  "roles": [
    "Admin"
  ],
  "ts_roles": ["reader"],
  "ts_permissions": ["read:user"],
  "jti": "1RDCU98BmKir9ey-ax3d7",
  "sub": "323b6e7.8AEM5PpWyJBH6opzIOrJ2.transmit",
  "iat": 1737555460,
  "exp": 1737559060,
  "client_id": "323b6e7.8AEM5PpWyJBH6opzIOrJ2.transmit",
  "iss": "https://userid-stg.io",
  "aud": "userid-api"
}
```

## Step 1: Plan your strategy

Before enforcing access controls, you'll need to decide on a strategy that makes sense for your business.

1. Check industry best practices and compliance standards for information security.
2. Analyze your business needs and collect requirements.
3. Define roles by mapping client operations to Mosaic APIs. See the permissions required for each endpoint in the [API reference](/openapi/api_ref_overview/).
4. Define permissions for each role&mdash;which may include permissions to perform specific actions (e.g., read, write) and permissions to Mosaic resources (users, devices, etc.).

### Best practices and tips

* **Thorough Mosaic APIs review**: Understand which endpoints are covered by each permission.
* **Avoiding role proliferation**: Create roles that handle common use cases (e.g., "Read-only access") instead of configuring a new role for every client.
* **Avoiding elevating permissions**: When creating roles, consider the principle of least privilege. Only assign the permissions required for client operations.
* **Multiple roles**: Take advantage of the ability to assign multiple roles to clients, combining permissions across services.
* **Descriptive naming**: Use clear role names (e.g., “Basic user read access”) to make it obvious what permissions they contain.

### Examples

* **Reporting client**: A service responsible only for reading user data to generate reports and show real-time statistics. This client is assigned a "reader" role that has the following permissions: `read:user`. This role  grants read access without the ability to modify user data.

* **Lifecycle management client**: A service responsible for managing the entire user lifecycle, including creating, reading, editing, and deleting user records. This client is assigned a "manager" role with the following permissions: `read:user`, `create:user`, `update:user`, and `delete:user`. This role grants comprehensive control over user records, from onboarding to deactivation.

* **Client for user authentication only**: An application that performs user logins but does not manage or view user profiles. This client only interacts with login endpoints. This client is assigned a "authentication only" role with the following permissions: `auth:invoke`. This role grants the ability to authenticate users but not to change or access user data like profiles.

* **Client with restricted access to customer APIs**: A client should have limited access to your proprietary APIs, for example, only have ability to create orders and invoices. This client is assigned two empty roles (roles with no Mosaic permissions granted)&mdash;the "create:orders" role and the "create:invoices" role. Although these roles don't affect client's access to Mosaic APIs (since the roles are empty and don't include any Mosaic permissions), you can leverage Mosaic RBAC framework to restrict access to your internal APIs by verifying assigned roles on your end before granting access to internal resources.


## Step 2: Create roles

Mosaic enables you to manage client roles via the Admin Portal (**Applications** > **Client roles**).

To create a client role, select **+ Add role**, and provide its name and description. Then, define permissions for this role. This permission tree is structured based on the Mosaic capabilties (authentication, identity management, etc.) and each section exposes specific permissions. For instance, for the identity management, you will find the following permissions: read users, edit users, create users, delete users, etc. Assign permissions to the new role by checking the boxes next to them.

:::info Note

Currently, you can create client roles to grant permissions to the following Mosaic APIs:

- [Backend authentication APIs](/openapi/user/backend-one-time-login/)
- [OIDC and Hosted authentication APIs](/openapi/user/one-time-login/)
- [Identity management APIs](/openapi/user/user/)
<!--
- [Organizations APIs (B2B)](/openapi/user/organizations/)
- [Apps and clients APIs](/openapi/user/apps/)
-->

:::

You can modify the roles you've created. To edit or delete a role:

* Edit a role and update permissions by tapping ![](../../images/action_icon.svg) and then **Edit**.
* Delete a role by tapping ![](../../images/action_icon.svg) and then **Delete**. Before deleting a role, ensure it's no longer assigned to

Alternatively, you can create new roles when creating the client or editing an existing client.

:::warning Important

Any changes to client roles take up to 5 minutes to propagate, meaning that updated permissions will appear in new [client access tokens](/openapi/client_access_tokens.md) generated no sooner than in 5 minutes after the change was made.

:::

## Step 3: Assign roles

<!--When creating a client, Mosaic forces you to assign at least one client role (**Admin Portal** > **Applications** > your app > clients).-->

When creating a client, Mosaic allows you to assign roles as a part of creation procedure (**Admin Portal** > **Applications** > your app > Clients). For existing clients, you can also assign and revoke roles whenever needed. See [Manage clients](/guides/user/manage_clients.md#client-roles).

:::info Note

- By design, all clients have implicit permission to generate client access tokens.
- If you don't specify a role, the client will be assigned an implicit role that grants global access to Mosaic APIs.

:::

Once you assign the role to the client, they will gain access to Mosaic APIs mapped to granted permissions. If a client doesn't have permission to the APIs, such as authentication, calls to these endpoints for this client will fail even when the client access token is valid.

