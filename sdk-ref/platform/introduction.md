---
toc:
  maxDepth: 2
---

# Introduction

The Platform SDK is a JavaScript client SDK that lets you quickly integrate easy and secure identity experiences into your web application. It offers risk detection and fraud prevention, biometric WebAuthn authentication, orchestration with Journeys, and more to come.

The entry point to the SDK API is set as the `window.tsPlatform` property.

:::attention Note
The Platform SDK includes all the functionality of the older SDKs. Those Web SDKs are still supported for existing integrations, but new features will only be supported by the Platform SDK.
:::

## Modules

The SDK is comprised of different modules. Modules are currently available for the following services:

- [Fraud Prevention](/sdk-ref/platform/modules/drs.md)
- Identity Verification
- [Orchestration](/sdk-ref/idosdk/overview.md)
- [WebAuthn](/sdk-ref/authnsdk/Overview.md)


## Versioning

The Platform SDK is versioned according to the semantic versioning standard where `X.Y.Z`. corresponds to `Major.Minor.Patch`. The SDK version can be specified as:

- Specific version, such as `1.6.20`
- Version range, such as `1.x` or `1.6.x`
- Latest

For more information on versioning, see [Versioning](/sdk-ref/platform/versioning.md) and [Changelog](/sdk-ref/platform/CHANGELOG.md).

## Installation

To load the SDK, include the following HTML script tag in all the relevant pages of your front-end web application:

```html
<!-- This loads the latest SDK within the major version 1. Specify a different version if necessary -->
<script src="https://platform-websdk.transmitsecurity.io/platform-websdk/1.x/ts-platform-websdk.js" defer="true" id="ts-platform-script"></script>
```

Then add the code below to wait for the SDK loading event:

```js
document.getElementById('ts-platform-script').addEventListener('load', () => {
  // do here things with `tsPlatform`
});
```

## Initialization

Configure the SDK globally for all the modules by calling the `initialize()` SDK method, as in the example below.

```js
// Configures the SDK with your client ID
tsPlatform.initialize({ clientId: [CLIENT_ID] });
```

:::info Note

By default, the SDK is initialized for US-based (global) cluster. The SDK modules can be configured to work with a different cluster or proxy by setting `serverPath` for each module individually. For the SDK to work properly, the regions must match.

:::

For example:

```js

// Configures the SDK with your client ID and initial verification params
window.tsPlatform.initialize({ clientId: [CLIENT_ID],
drs: {
  serverPath: "https://api.eu.transmitsecurity.io/risk-collect/"
},
ido: {
  serverPath: 'https://api.eu.transmitsecurity.io/ido'
}});
```
