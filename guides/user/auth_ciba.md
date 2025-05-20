---
toc:
  maxDepth: 2
---

# Authenticate for customer service

In certain customer service scenarios, users are required to authenticate in order to authorize agents to access their accounts and share potentially sensitive information, such as when users contact a call center for support or request service in a bank branch. Mosaic recommends using [Client-Initiated Backchannel Authentication](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0-final.html) (CIBA) for these scenarios.

Backchannel flow extends OpenID Connect by providing a decoupled authentication flow where a user doesn't directly interact with a device they want to access. The authentication request comes from a consumption device through a backchannel and then is completed on a different device, called an authentication device.

**Example:** a customer contacts a call center for support. To verify customer identity, the call center operator sends a link for a customer to authenticate themselves. Once the customer completes authentication, the operator logs in on their behalf.

## How it works
Mosaic supports the [OIDC CIBA flow](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0-final.html) for authentication. The CIBA flow wraps around your regular  Mosaic-based authentication procedure such as email magic link, social login, or WebAuthn that runs on the user's device.

Before you can start integrating CIBA, review the flow prerequisites:

* Users are already registered to the app. You cannot create new users using CIBA flow.
* Users had their phone numbers or emails verified within Mosaic.

Below is an example of the backchannel flow that can be implemented using the steps in this guide. Mosaic APIs are shown in pink along with the relevant integration step, described below.

![](../../images/UserID/auth_ciba.png)

1. A client (e.g., a call center) wants to authenticate a user on a consumption device and sends a backchannel authorization request to Mosaic  ([Step 3](#step-3-initiate-ciba-flow)). Mosaic sends an SMS or email with the auth link to the user. It also returns an acknowledgment that the auth link has been sent.
1. The client backend starts polling for a token ([Step 4](#step-4-poll-for-a-token)).
1. When a user clicks the auth link, they are taken to the application login experience ([Step 1](#step-1-create-the-login-endpoint)).
1. After the user logs in, the application notifies Mosaic that the process has been completed ([Step 1](#step-1-create-the-login-endpoint)).
1. With the next polling, the client that requested access receives a token ([Step 4](#step-4-poll-for-a-token)) and is granted access.

## Step 1: Create the login endpoint

Create the login endpoint that will perform the authentication process on the user's authenticating device and send a callback to Mosaic.

1. The endpoint should respond to GET requests and accept `auth_req_id` and `binding_message` as query parameters. The `auth_req_id` should be stored and then passed in a callback to complete the CIBA process while `binding_message` needs to be displayed to provide a user with more context.

2. The endpoint should invoke the authentication process. Implement one of the Mosaic-based authentication processes. See [Authentication overview](/guides/user/auth_overview/) for available options.

3. The endpoint needs to send a callback to Mosaic whenever a user completes the authentication process. Implement code that sends a POST request to `/auth/backchannel/complete`. This call has to pass the request ID and define if the access is approved by the user.

Below is a sample request that notifies Mosaic that the user has completed authentication. Replace placeholders with values before executing.

:::info Note:

Authorize this request using the user access token returned upon authentication.

:::

```shell
curl -i -X POST \
  'https://api.transmitsecurity.io/cis/auth/backchannel/complete' \
  -H 'Authorization: Bearer USER_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "auth_req_id": "AUTH_REQ_ID",
    "approved": true
  }'
```


## Step 2: Enable CIBA

In order to perform the backchannel flow, CIBA needs to be enabled for the client that initiates a backchannel authentication. To enable it, update your app's client by sending a PUT request to `/applications/{appId}/clients/{clientId}`. The request should contain `login_uri` that you have already created in [Step 1](#step-1-create-the-login-endpoint) and which will be later invoked on the user's authentication device. If you don't already have an application, you'll need to create one first (see [Create application](create_new_application.md)).

Below is a sample request that enables CIBA. Replace placeholders with values before executing.


:::info Note:

Make sure you have a valid client access token to authorize the request. If not, you'll need to get one. [Learn more](retrieve_client_tokens.md)

:::

```shell
curl -i -X PUT \
  'https://api.transmitsecurity.io/cis/v1/applications/{APP_ID}/clients/{CLIENT_ID}' \
  -H 'Authorization: Bearer ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "ciba_authorization": {
      "enabled": true,
      "login_uri": "LOGIN_URI"
    }
  }'

```

## Step 3: Initiate CIBA flow

Implement the code that sends a POST request to `/oidc/backchannel` whenever a client wants to initiate a backchannel authentication. The request should include an identifier of the user that has been already registered within Transmit; new users cannot be created at this point. This request will trigger Mosaic to send an auth link to the user. The link can either be sent by SMS (default) or by email, or Mosaic can return an auth link itself.

:::info Tip:

Before choosing a delivery channel, check what user data is stored in Mosaic. I.e., do users provide and verify phone numbers during registration? If you don't store user phone numbers, you won't be able to deliver SMS with auth links.

:::

Below is a sample request that sends an auth link to the user's phone number. To learn how to get an auth link or send an auth link by email, and explore a complete API reference, see [Backchannel authentication request](/openapi/user/oidc/#operation/oidcBackchannelAuthenticate). Replace placeholders with values before executing.


```shell
curl -i -X POST \
  https://api.transmitsecurity.io/cis/oidc/backchannel \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d client_id=CLIENT_ID \
  -d client_secret=CLIENT_SECRET \
  -d scope=openid \
  -d login_hint=PHONE_NUMBER\
  -d binding_message=MESSAGE \

```
<div class="table">

|Field |Description
|--- |--- |
|`client_id` |Client ID. Can be obtained from your application settings in the Mosaic Admin Portal.
|`client_secret` |Client secret. Can be obtained from your application settings in the Mosaic Admin Portal.
|`login_hint` |An identifier of the user for whom authentication is requested: email, phone, or user_id.
|`binding_message` |(Optional) An explanatory message for a user that can be dispalyed on the authentication device and that is returned along with `login_uri`.
</div>

A successful response to the `/oidc/backchannel` endpoint returns the `auth_req_id` and `expires_in` parameters and acknowledges that the backchannel authentication flow has been initiated.

## Step 4: Poll for a token

As soon as your client receives a response from `/oidc/backchannel`, you can start polling for the user token with at least 5 seconds between each request until the client receives it or until the backchannel authentication request expires. To poll for a token, implement a code that sends a POST request to `/oidc/token` with the same `auth_req_id` you received in the `/oidc/backchannel` response in [Step 3](#step-3-initiate-ciba-flow).

Below is a sample request that polls for a token. Replace placeholders with values before executing.

```shell
curl -i -X POST \
  https://api.transmitsecurity.io/oidc/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d client_id=CLIENT_ID \
  -d client_secret=CLIENT_SECRET \
  -d auth_req_id=AUTH_REQ_ID \
  -d grant_type=urn:openid:params:grant-type:ciba
```

You can expect the following responses from Mosaic and here is how to handle them:

|Response |Description |Action
|-------- |----------- |-------
|400 "authorization_pending" |A user hasn't completed authentication yet |Keep polling
|400 "slow_down" |The token is polled too frequently |Increase polling interval, keep polling
|400 "access_denied" |A user denied access through a backchannel |Stop polling
|400 "expired_token" |A user hasn't completed authentication within the backchannel request lifespan |Stop polling
|200 |A user completed an authentication procedure and approved access|Receive a token, stop polling

## Next steps

Once you've completed a basic integration, here are customization options to consider:

- [Adjust message](#adjust-message)
- [Send link via a different channel](#send-link-via-a-different-channel)

### Adjust message

Update the message that instructs the end-user to follow the auth link. To do it, when initiating the CIBA flow ([Step 3](#step-3-initiate-ciba-flow)) send a request that includes `request_context` with a `custom_message`. For example:

```shell
curl -i -X POST \
  https://api.transmitsecurity.io/cis/oidc/backchannel \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d client_id=CLIENT_ID \
  -d client_secret=CLIENT_SECRET \
  -d scope=openid \
  -d login_hint=EMAIL\
  -d binding_message=MESSAGE \
  -d 'request_context={"channel": "email", "login_hint_type": "email", "custom_message": "Ready to authenticate?"}'
```



### Send link via a different channel

When initiating the CIBA flow ([Step 3](#step-3-initiate-ciba-flow)), instead of sending an auth link by email or SMS using Mosaic services, you can obtain an auth link and then share it with your customers via the preferred channel, for example, via your corporate mail provider, via messenger, or by embedding a link in the QR code. Note that setting the `channel` to `link` returns the link in response but you have to implement a mechanism that shares this link with the end-user.

```shell
curl -i -X POST \
  https://api.transmitsecurity.io/cis/oidc/backchannel \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d client_id=CLIENT_ID \
  -d client_secret=CLIENT_SECRET \
  -d scope=openid \
  -d login_hint=PHONE_NUMBER\
  -d binding_message=MESSAGE \
  -d 'request_context={"channel": "link"}'
```

