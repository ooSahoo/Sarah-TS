---
title: Resources
---

# How resources work
Resources in Mosaic allow an application and its clients to better target access requests, and gain more control over sessions. While not required, targeting access requests to specific resources is recommended by [OAuth](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-resource-indicators-08#) in order to limit access to only what's needed.

## What is a resource?
A resource is a specific URI protected by the application's client. For example, it may correspond to the application the user wants to log into, specific pages like purchase checkout, or an external API used to manage the user profile. Resources may be shared by applications within the same tenant, such as users. As such, resources are created on the tenant-level and then assigned to specific clients.

## How access is obtained
A user or client can obtain access to a resource by performing an authentication. For example, a user may authenticate using email magic links, whereas a client authenticates to Mosaic using client credentials. A successful authentication returns an access token that grants the appropriate access to the requested resource.

## What access is granted
The client can explicitly request access to a specific resource, from the list of resources added to the client. If the access request doesn't specify a resource, the request is simply processed using a default resource implicitly defined by Mosaic. The resource is reflected in the audience (`aud` claim) of the access token.

The access also depends on which user or client requested it, which is reflected in the subject (`sub` claim) of the access token. User access tokens provide access only for the specific user and client. For example, it may be used to update the user's profile, but cannot be used to log in to a different application. Similarly, client access tokens provide access only for the requesting application's client. For example, it can be used to retrieve user data of only the users associated with that application. However, if the application was created as a management application, the access will apply to all applications across the tenant.

The extent of the access granted is also determined by the requested scopes, and the role of the requesting user or client. For example, a user may be allowed to view their order, but not cancel it themselves. On the other hand, a client may be allowed to access certain management APIs which are off limits to end-users.

## Duration of the access

The validity period of the access depends on authentication scenario you implement.

- In case of the end-user access to the app, the duration of access depends on the access token used to access the resource and the session length, if session management is implemented.

- In the offline access scenarios when an app keeps acting on behalf of the end-user, the duration period depends on the expiration of the access token, the expiration of the refresh token, and the maximum rotation time of a target resource.

For each resource, the expirations are configured in the [Session management settings](/guides/user/manage_resources#session-management-settings). For example, you can provide shorter access tokens for more sensitive resources like the user's payment methods. You can control expirations by creating a resource that corresponds to your application URL, adding it to the application's clients, and explicitly requesting access to it when needed. For the default resource, the expiration is 1 hour for the access token, 14 days for the refresh token, and 14 days for token rotation (maximum period of time when the token can be refreshed). The session expires after 14 days unless authentication occurs.

:::info Note
The session length cannot be customized. The "session expiration" setting configured in resource settings corresponds to the maximum period of time when the refresh token can be rotated.
:::

For more about session management and user access tokens, see [Manage user sessions](/guides/user/manage_user_sessions.md) for OIDC and redirect-based flows. Or refer to [Manage sessions for backend authentication](/guides/user/be_manage_sessions.md) for backend-to-backend integrations.