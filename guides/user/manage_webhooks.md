---
exclude: true
---
# Manage webhooks

Webhooks enable you to receive real-time user event notifications, such as when a user is created, deleted, or logs in to an app. To subscribe to webhook notifications, you need an endpoint (URL) that is set up to receive the events.

For more, see [How webhooks work](how_webhooks_work.md) and [Set up webhooks](set_up_webhooks.md).

:::info Note
Event notifications are not sent until a webhook is verified and enabled.
:::

## View webhooks

The **Webhooks** page lists all existing webhooks and their status, name, and description. To view the **Webhooks** page, in the side menu select **Events** > **Webhooks**.

![](../../images/UserID/webhook_page.png)

## Create, edit, or delete webhooks

You can manage your webhooks from the **Webhooks** page:

* Create a webhook by clicking **+ Add webhook** and configuring [Webhook settings](#webhook-settings).
* Edit a webhook by clicking ![](../../images/action_icon.svg) and then **Edit**.
* Delete a webhook by clicking ![](../../images/action_icon.svg) and then **Delete**.

## Enable or disable webhooks

Enable or disable a webhook by clicking ![](../../images/action_icon.svg) and then selecting **Enable** or **Disable**. Notification are only sent to enabled webhooks.

## Webhook settings

You can access webhook settings from the **Webhooks** page by clicking the relevant webhook in the table:

![](../../images/UserID/edit_webhook.png)

These are the webhook settings:

* **Webhook name** (required): The name of the webhook to display in the Admin Portal.
* **Description**: The webhook's description.
* **URI** (required): The URI to which events are sent. Events must be sent via HTTPS.
* **API key** (required): An opaque value used to determine that the webhook originated from Mosaic. This value should be kept secret and only used for Mosaic webhooks. See [Validate notification](set_up_webhooks.md#step-5-validate-notification).
* **Events** (required): The types of [events](#events) for which you want to receive notifications.

:::info Note
The `User requested deletion` event type presented in the Admin Portal is not currently supported.
:::

## Events
You can subscribe to notifications for the following types of events:

|Event |Description
|--- |--- |
|`User created` | User was created by an admin, or implicitly upon authenticating
|`User updated` | User's profile was updated
|`User deleted` | User was deleted
|`User added to app` | User was associated with an app
|`User removed from app` | User was removed from an app
|`User logged in` | User successful authenticates
|`User logged out` | User logs out of the session (via [Logout API](/openapi/user/one-time-login/#operation/logout))
|`User suspended` | User was suspended
|`User unsuspended` | User status was changed from suspended to active
|`User password lock` | A lockout applies on user password authentication
|`Orchestrated user login` | User was logged in within an orchestrated journey
|`Failed OTP attempt` | Last email or phone verification with OTP failed

:::info Note
Events reflect actions performed via Admin Portal, APIs, or implicitly as part of a flow (if applicable).
:::
<style>
    th { min-width: 200px; }
</style>