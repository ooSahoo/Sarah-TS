---
title: Webhooks
exclude: true
---

# How webhooks work

Webhooks are used to send user event notifications to your server. When you create a webhook, you define an endpoint (URL) to which the events are sent. This enables automatically receiving real-time notifications for user actions. You can use these notifications for many purposes, like receiving real-time alerts when a user is added to one of your apps or adding events to an external logging system.

## Endpoint requirements

Your endpoint must support HTTPS, as Mosaic only sends requests using the HTTPS protocol. Additionally, your endpoints must be verified, secured with a secret token, capable of handling GET and POST requests, and able to parse the notification's JSON payload. An endpoint is considered verified when it successfully completes a challenge-response flow. See [Create your endpoint](set_up_webhooks.md#step-1-create-your-endpoint).

## Responses and retries

Your endpoint must return an HTTP success status code (`2xx`) in response to webhook notifications. If the success response is not received within 3 seconds, Mosaic will attempt to send the notification again (up to two more times).

## Events

Webhook notifications can be sent for user events, such as when a user is created, associated with an app, or logs in to one of your applications. You can use one webhook to send all events or set up multiple webhooks, where each webhook handles a subset of events. This allows fine-grained control over which of your endpoints receive which events. See [Parse event data](set_up_webhooks.md#step-6-parse-event-data) for the structure of event notifications, and [Events](manage_webhooks.md#events) for the events you can subscribe to.

## Manage webhooks

You can manage webhooks in the Admin Portal or via [APIs](/openapi/user/webhooks/). This includes creating, editing, enabling, and deleting webhooks, as well as starting webhook verification flows. See [Manage webhooks](manage_webhooks.md).
