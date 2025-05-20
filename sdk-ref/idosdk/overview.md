# Overview

Orchestration is a module of a client-side JavaScript SDK that allows you to communicate with Mosaic, run journeys, and submit client input. Contact your Transmit representative to learn more about our orchestration capabilities.

## Benefits

The SDK offers the following advantages:

- Abstract and simplify the communication scheme
- Validate that the client input response contains the expected client input
- Keep state between the last server response and the next client input response
- Allow passing the state between pages, for multi-page applications

## Installation

Add a script tag with the latest SDK to your HTML file
```html
<script src="https://platform-websdk.transmitsecurity.io/platform-websdk/latest/ts-platform-websdk.js" id="platform-sdk"></script>
```

## Initialization

The main module interface is [IdoSDK](./interfaces/IdoSdk.md). To initialize activate the following code:
```ts
// Initialize an instance of the Orchestration SDK using the unified SDK
await window.tsPlatform.initialize({
  clientId: 'my-client-id',
  ido: { serverPath: 'https://api.transmitsecurity.io/ido'}
});
```
:::info Note

By default, the SDK is initialized for US-based (global) cluster. The IDO module can be configured to work with a different cluster or proxy by setting `serverPath` to `https://api.eu.transmitsecurity.io/ido` (for EU) or `https://api.ca.transmitsecurity.io/ido` (for Canada). For the SDK modules to work properly together, the regions must match.

:::

For more information, refer to the class reference, as well as the [Quick start guides](/guides/orchestration/getting-started/quick_start_web/). We also recommend checking out the code samples for the various client side operations under [IdoJourneyActionType](./enums/IdoJourneyActionType.md).
