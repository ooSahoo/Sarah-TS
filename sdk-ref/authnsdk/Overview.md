# Overview

The Webauthn module is a part of a client-side JavaScript SDK. It allows you to easily log in users with biometrics based on the [Transmit WebAuthn APIs](/openapi/user/backend-webauthn/). The SDK does all the heavy lifting to provide secure WebAuthn authentication while leaving you the flexibility to control the authentication logic and user experience.

## Benefits

The SDK offers many advantages over the APIs, including:

 - Journey orchestration to support decisions and complex flows
 - Client-side WebAuthn calls, along with data processing before and after
 - Simplifies all calls to the Transmit Service, reducing unnecessary complexity

## Installation


Add a script tag with the latest SDK to your HTML file

```html
<script src="https://platform-websdk.transmitsecurity.io/platform-websdk/latest/ts-platform-websdk.js" id="platform-sdk"></script>
```

## Initialization

To initialize activate the following code:
```ts
// Initialize an instance of the WebAuthn SDK using the unified SDK

await window.tsPlatform.initialize({
    clientId: '[CLIENT_ID]',
    webauthn: {serverPath: 'https://api.transmitsecurity.io'} // Optional for US region
});

```
Customizations:

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverPath` | `string` | By default, the SDK is initialized for US-based (global) cluster. The WebAuthn module can be configured to work with a different cluster or proxy by setting `serverPath` to `https://api.eu.transmitsecurity.io` (for EU) or `https://api.ca.transmitsecurity.io` (for Canada). For the SDK modules to work properly together, the regions must match.|
| `webauthnApiPaths?` | [`WebauthnApis`](/sdk-ref/authnsdk/interfaces/WebauthnApis.md) | Override endpoints when using a proxy server in case the proxy server implements its own paths. |

For more information, refer to the class reference, as well as the [Quick start guide](/guides/webauthn/quick_start_sdk.md).

<style>
table th:first-of-type {
    width: 20%;
}
table th:nth-of-type(2) {
    width: 15%;
}
table th:nth-of-type(3) {
    width: 65%;
}
</style>
