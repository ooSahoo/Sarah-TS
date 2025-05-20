# Manage resources

Resources allow targeting access requests to specific URIs and more control over session management. You can use them to specify protected resources that your users or clients want to access, such as the user profile or an external API. While recommended, clients aren't required to request access to a particular resource. If unspecified, the request is targeted to a default resource implicitly defined by Mosaic (see [How resources work](/guides/user/resources_overview.md)).

Resources can be managed either using [Administration APIs](/openapi/user/resources.page.yaml), or from the Admin Portal from the **Resources** tab of the **Applications** page (as described below).

## View or search resources
From **Applications** > **Resources**, you can view a list of all your resources, including basic details like the resource name, URI, description and which applications are allowed to request access to it through their clients. You can search for a specific resource by name using the search box on the top-right, and click ![](../../images/action_icon.svg) to view the [Resource Settings](/guides/user/manage_resources.md#resource-settings).

![](../../images/UserID/resource_page.png)

## Create, edit, or delete resources
From **Applications** > **Resources**, you can manage the resources available for your tenant:
- Create a resource by clicking **+ Add resource** and configuring [Resource Settings](/guides/user/manage_resources.md#resource-settings).
- Edit a resource by clicking ![](../../images/action_icon.svg) and then **Edit**.
- Delete a resource by clicking ![](../../images/action_icon.svg) and then **Delete**.

:::info Note
An application's client is only allowed to explicitly request access to a created resource if it's also added to the client. See [Manage clients](/guides/user/manage_clients.md)
:::

## Resource settings
From **Applications** > **Resources**, you can access your resource settings by clicking the relevant resource in the table.

### Resource details
This includes basic details that describe the resource and identify it in access requests.

![](../../images/UserID/resource_details.png)

Resource details include:
- **Resource name**: Friendly name of your resource, displayed in the Admin Portal.
- **Description**: Short description of your resource, displayed in the Admin Portal.
- **Resource URI**: URI of your protected resource, which uniquely identifies it in your tenant.

### Session management settings
You can create dedicated sessions for each resource, and control the lifespan of the access that's granted.

![](../../images/UserID/resource_session_management.png)

These settings include:
- **Access token expiration**: Expiration of the access token in seconds.
- **Refresh token expiration**: Expiration of the refresh token in seconds.
- **Session expiration**: Absolute lifetime of a refresh token in seconds, after which it can no longer be used or rotated.

