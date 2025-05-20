---
toc:
  enabled: true
  maxDepth: 2
---


# Authorize browserless and input-limited devices

Devices&mdash;such as smart TVs or watches, printers, game consoles, media centers, and smart home appliances&mdash;are usually connected to the internet but don't have a browser or text input methods to authenticate users. [Device flow](https://www.rfc-editor.org/rfc/rfc8628) (also called device authorization grant) provides decoupled authentication capabilities by enabling such devices to delegate user authentication to a different device, e.g., a smartphone, and then obtain the grant.

**Example:** a user wants to log in to a streaming service on their smart TV. The device displays a QR code for the user to scan and then authenticate on their phone. Once the user completes authentication, they get automatically logged in to their smart TV.

## How it works

Below is an example of the device flow that leverages a QR code and that can be implemented using this guide. Mosaic APIs are shown in pink along with the relevant implementation steps.

![](../../images/UserID/auth_device_flow.png)

1. A device client (e.g., a smart TV) wants to authenticate a user and sends a request to Mosaic to initiate a device auth flow. Mosaic returns a device code, user code, and URI for a user to follow and authenticate. The device communicates the URI and user code to the user, for example, displays a QR code.
1. The device backend starts polling for a token.
1. When a user follows the link on their other device (e.g., smartphone), they are taken to a page where they approve or deny further interaction.
1. Once the user approves, they proceed to the login experience.
1. After the user logs in, Mosaic sends a notification that the authentication finished successfully.
1. With the next polling, the device (a smart TV) receives a token and logs the user in.


## Before you start

Before you can start implementing this flow, make sure all prerequisites are in place. You'll need:

1. An application created within Mosaic (see [Create application](create_new_application.md)). Your application's settings contain the Client ID and Client Secret, which you'll need later.

2. An authentication method configured for your application, for example, Google login or Apple login. For implementation details, refer to step 1 of [this guide](/guides/user/auth_oidc/#step-1-set-up-login-method).

:::info Supported login methods

Social login (Apple, Facebook, Google, Line) and WebAuthn.

:::


## Step 1: Authorize device

<div class="badge-wrapper">
    <div class="badge">Backend</div>
    <div class="badge">device flow</div>
</div>

The device flow is initiated by the browserless or input-constrained device when a user requests to log in. Implement a backend endpoint that will be used to perform the device code flow, as specified by [OAuth 2.0 Device Authorization Grant](https://www.rfc-editor.org/rfc/rfc8628). When invoked, the endpoint should be able to perform the following operations:

1. [Initiate device flow](#1-initiate-device-authorization)
2. [Initiate user verification process](#2-initiate-user-verification-process)
3. [Obtain token](#3-obtain-token)
4. [Validate token](#4-validate-token)

### 1. Initiate device authorization

When the user requests to log in to the app on the browserless or input-limited device, initiate a device authorization flow by sending a POST request to `/oidc/device/auth`. The request should specify the login method to authenticate the user. [See API reference](/openapi/user/oidc/#operation/oidcDeviceAuth)

A successful response includes `user_code`, `verification_uri`, and `verification_uri_complete` parameters for initiating the verification process ([Step 1.2](#2-initiate-user-verification-process)) and `device_code` used to obtain user tokens ([Step 1.3](#3-obtain-token)).

Below is a sample request that allows authenticating with Apple. Replace placeholders with values before executing.


```shell
curl -i -X POST \
  https://api.transmitsecurity.io/cis/oidc/device/auth \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d client_id=CLIENT_ID \
  -d client_secret=CLIENT_SECRET \
  -d scope=openid \
  -d acr_values=urn:transmit:apple_direct

```

<div class="table">

|Field |Description
|--- |--- |
|`client_id` |Client ID. Can be obtained from your application settings in the Mosaic Admin Portal.
|`client_secret` |Client secret. Can be obtained from your application settings in the Mosaic Admin Portal.
|`acr_values` |Specifies the user login method to prompt on the authentication device: `urn:transmit:google_direct`, `urn:transmit:apple_direct`, `urn:transmit:facebook_direct`, `urn:transmit:line_direct`, or `urn:transmit:centralized` (for Authentication Hub). With the device flow, you cannot leverage one-time passwords and links.

</div>


### 2. Initiate user verification process

To initiate the verification process, the user’s browser needs to redirect to the OAuth verification endpoint with the user code. This is the endpoint corresponding to the `verification_uri`, where the `user_code` is passed as a query parameter, for example, `https://api.transmitsecurity.io/cis/oidc/device?user_code=ABCD-ABCD`.

There are different ways to communicate the link to the user. For example, the browserless or input-constrained device can display a QR code that embeds `verification_uri_complete` (returned in [Step 1.1](#1-initiate-device-authorization)) so that the user can scan the QR code to open the link on the browser of their mobile device.

### 3. Obtain token

As soon as your device receives a response from `/oidc/device/auth`, you can start polling for the user token with at least 5 seconds between each request until the client receives it or until the authentication request expires. To poll for a token, implement a code that sends a POST request to the [OIDC token endpoint](/openapi/user/oidc/#operation/oidcToken) (`/oidc/token`) with the same `device_code` you received in the `/oidc/device/auth` response in [Step 1.1](#1-initiate-device-authorization).

Below is a sample request that polls for a token. Replace placeholders with values before executing.

```shell
curl -i -X POST \
  https://api.transmitsecurity.io/oidc/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d client_id=CLIENT_ID \
  -d client_secret=CLIENT_SECRET \
  -d device_code=DEVICE_CODE \
  -d grant_type=urn:ietf:params:oauth:grant-type:device_code
```

You can expect the following responses from Mosaic and here is how to handle them:

<div class="table">

|Response |Description |Action
|-------- |----------- |-------
|400 "authorization_pending" |A user hasn't completed authentication yet |Keep polling
|400 "slow_down" |The token is polled too frequently |Increase polling interval, keep polling
|400 "expired_token" |A user hasn't completed authentication within the backchannel request lifespan |Stop polling
|200 |A user completed an authentication procedure|Receive a token, stop polling
</div>

### 4. Validate token

The `/oidc/token` response includes an ID token with user profile data, and a user access token. These tokens must be validated as described [here](/guides/user/validate_tokens/). Implement the code that validates the token signatures using the public key retrieved from [this request](/openapi/user/oidc/#operation/oidcGetKeys):

```shell
curl -i -X GET \
  'https://api.transmitsecurity.io/cis/oidc/jwks'
```


## Step 2: Obtain user approval

<div class="badge-wrapper">
    <div class="badge">client</div>
    <div class="badge">browser flow</div>
</div>

After initiating the device flow, you need to explicitly obtain user's approval to authorize the browserless or input-limited device and then report the approval to Mosaic to initiate the authentication process. Create a frontend endpoint that when invoked will perform the following operations:

1. [Receive approval request](#1-receive-approval-request)
2. [Collect user approval](#2-collect-user-approval)
3. [Initiate authentication](#3-initiate-authentication)

### 1. Receive approval request

Upon receiving the device authorization request and verifying the `user_code`, Mosaic will redirect the browser to your approval endpoint. It should be able to receive POST requests with the following query parameters:

<div class="table">

|Parameter |Description
|-------- |-----------
|`user_code` |The user code that was passed to the verification endpoint and has been accepted as valid.
|`xsrf` |The token that is used to ensure that the verification process takes place on a single device. User interactions should occur on the same authentication device throughout the entire flow.
|`device_info` |Details of the browser that’s used to perform the approval.

</div>

Below is a sample request sent by Mosaic to your approval endpoint.

```shell
curl -i -X POST \
  'https://APPROVAL_URI' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d user_code=USER_CODE \
  -d xsrf=XSRF_SECRET_CODE \
  -d 'device_info={"id": "IP_ADDRESS", "ua": "USER_AGENT"}'

```

### 2. Collect user approval

After receiving an approval request, prompt a user to approve or deny authorization. For example, collect approval from the user by displaying an approval screen.

### 3. Initiate authentication

To initiate the login process, send a callback to Mosaic by running the POST request to `/oidc/device`. It should include the `user_code` and `xsrf` parameters, which are used to identify the user and the device, respectively, as well as define if the user approved the access (`approved=true`).

If the request is successful, Mosaic will redirect the user to authenticate using the authentication method requested in [Step 1](#1-initiate-device-authorization).

:::info Note

In case there is a valid session for this user within your tenant and provided they authenticated using the same method you specified in `loginType` in [Step 1](#1-initiate-device-authorization), Mosaic won't prompt the user to log in and will perform silent authentication.

:::

<!--
In case there is a valid session for this user within your tenant and provided they authenticated using the same method you specified in `acr_values` in [Step 1](#1-initiate-device-authorization), Mosaic won't prompt the user to log in and will perform silent authentication.
-->

Below is a sample request that notifies Mosaic that the user has granted approval. Replace placeholders with values before executing.

```shell
curl -i -X POST \
  'https://api.transmitsecurity.io/cis/oidc/device' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d user_code=USER_CODE \
  -d xsrf=XSRF_SECRET_CODE \
  -d approved=true

```


## Step 3: Handle success

<div class="badge-wrapper">
    <div class="badge">client</div>
    <div class="badge">browser flow</div>
</div>

Once the user is successfully authenticated, Mosaic redirects to your success endpoint. Create a success endpoint that receives POST requests and accepts `device_info` parameter. When invoked, it should display a success confirmation to the user.


## Step 4: Handle errors

<div class="badge-wrapper">
    <div class="badge">client</div>
    <div class="badge">browser flow</div>
</div>

If an error occurs after the device flow has been initiated, Mosaic will forward error details to the input endpoint.

Create the frontend endpoint that will receive the errors and handle them accordingly. The endpoint should accept POST requests with the body that includes `{error: "Error message"}`.

These are the types of errors that Mosaic can return to this endpoint:

<div class="table">

|Error |Description
|--- |--- |
| The code you entered is incorrect. Try again |Occurs when a user submits an expired user code to the verification endpoint. [See Step 1.2](#2-initiate-user-verification-process)
| The sign-in request was interrupted |The user has denied access or failed to authenticate.

</div>


<!---If you want your users to manually enter the code, create an input endpoint that allows a user to enter a code and then forwards it to Mosaic for verification. If the code submitted by the user is valid (i.e., is the same as returned when a device initiates the flow), Mosaic will redirect the user to the approval endpoint.

1. The endpoint should respond to POST requests in order to allow users to enter the code displayed by their device.

2. The endpoint needs to send a callback to Mosaic once a user enters a code: send the GET request to the `verification_uri` URI and pass `user_code` as a query parameter.

Below is a sample request, make sure to replace a placeholder with the `user_code` value.

```shell
curl -i -X GET \
  'https://api.transmitsecurity.io/cis/oidc/device?user_code=USER_CODE'
```

If the code is incorrect, Mosaic will redirect back to the input page to re-enter a code. At the moment it's impossible to send the error back since Mosaic doesn't know who initiated the flow since there is no user and the code is wrong.

The endpoint should be able to handle json error responses: "code expired" and "incorrect code". These errors are returned by Mosaic `verification_uri` if the `user_code` has expired or was entered incorrectly.

-->


## Step 5: Enable device flow

In order to perform the device flow for your client, it should be enabled in the app's client settings. To do it, update your client by sending a PUT request to `/applications/{appId}/clients/{clientId}`. The request should contain `approval_uri` ([Step 2](#step-2-obtain-user-approval)), `success_uri` ([Step 3](#step-3-handle-success)), and `input_uri` ([Step 4](#step-4-handle-errors)) that you have already created in the previous steps. [See API reference](/openapi/user/apps/#operation/updateAppClient)

Below is a sample request that enables the device flow. Replace placeholders with values before executing.


:::info Note:

Make sure you have a valid client access token to authorize the request. If not, you'll need to get one. [Learn more](retrieve_client_tokens.md)

:::

```shell
curl -i -X PUT \
  'https://api.transmitsecurity.io/cis/v1/applications/{APP_ID}/clients/{CLIENT_ID}' \
  -H 'Authorization: Bearer ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "device_authorization": {
        "enabled": true,
        "approval_uri": "APPROVAL_URI",
        "success_uri": "SUCCESS_URI",
        "input_uri": "INPUT_URI"
    }
  }'
```



