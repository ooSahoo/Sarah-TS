# IdoSdk

**`Interface`**

**`Description`**

The interface for the sdk object.

## Methods

### init

▸ **init**(`clientId`, `options?`): `Promise`<`void`\>

**`Description`**

Creates a new Orchestration SDK instance with your client context.
Do not call this function directly - see below how to initialize via the unified web SDK

**`Throws`**

[InvalidInitOptions](../enums/ErrorCode.md#invalidinitoptions) in case of invalid init options.

**`Example`**

```ts
// Initialize an instance of the Orchestration SDK using the unified SDK
await window.tsPlatform.initialize({
  clientId: 'my-client-id',
  ido: { serverPath: 'https://api.transmitsecurity.io/ido'}
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `clientId` | `string` | Client ID for this application. |
| `options?` | [`IdoInitOptions`](IdoInitOptions.md) | Additional environment configuration for the SDK operation. |

#### Returns

`Promise`<`void`\>

The promise that will be resolved when the SDK is initialized.

___

### startJourney

▸ **startJourney**(`journeyId`, `options?`): `Promise`<[`IdoServiceResponse`](IdoServiceResponse.md)\>

**`Description`**

Starts a Journey with a given id.

**`Throws`**

[NotInitialized](../enums/ErrorCode.md#notinitialized) - Throws error if the SDK is not initialized.

**`Throws`**

[NetworkError](../enums/ErrorCode.md#networkerror) - Throws error if could not connect to server, or server did not respond before timeout.

**`Throws`**

[ServerError](../enums/ErrorCode.md#servererror) - Throws error if the server returned an unexpected error.

**`Example`**

```ts
// Start a Journey with the id 'my-journey-id'
try {
  const idoResponse = await window.tsPlatform.ido.startJourney('my-journey-id', { additionalParams: 'additionalParams' });
  // Handle Journey response
} catch(error) {
  switch(sdkError.errorCode) ...
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `journeyId` | `string` | Journey Identifier in the Mosaic Admin Console. |
| `options?` | [`StartJourneyOptions`](StartJourneyOptions.md) | Additional parameters to be passed to the journey. |

#### Returns

`Promise`<[`IdoServiceResponse`](IdoServiceResponse.md)\>

The promise that will be resolved when the [IdoServiceResponse](IdoServiceResponse.md) is received.

___

### startSsoJourney

▸ **startSsoJourney**(`interactionId`): `Promise`<[`IdoServiceResponse`](IdoServiceResponse.md)\>

**`Description`**

Starts an SSO Journey with a given Interaction ID.

**`Throws`**

[NotInitialized](../enums/ErrorCode.md#notinitialized) - Throws error if the SDK is not initialized.

**`Throws`**

[NetworkError](../enums/ErrorCode.md#networkerror) - Throws error if could not connect to server, or server did not respond before timeout.

**`Throws`**

[ServerError](../enums/ErrorCode.md#servererror) - Throws error if the server returned an unexpected error.

**`Example`**

```ts
// Start a Journey with the Interaction ID '2456E855-05A0-4992-85C1-A2519CBB4AA7'
try {
  const idoResponse = await window.tsPlatform.ido.startSsoJourney('2456E855-05A0-4992-85C1-A2519CBB4AA7');
  // Handle Journey response
} catch(error) {
  switch(sdkError.errorCode) ...
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interactionId` | `string` | Interaction identifier given as part of the response to the initial /authorize request |

#### Returns

`Promise`<[`IdoServiceResponse`](IdoServiceResponse.md)\>

The promise that will be resolved when the [IdoServiceResponse](IdoServiceResponse.md) is received.

___

### submitClientResponse

▸ **submitClientResponse**(`clientResponseOptionId`, `data?`): `Promise`<[`IdoServiceResponse`](IdoServiceResponse.md)\>

**`Description`**

This method will submit client input to the Journey step to process.

**`Throws`**

[NotInitialized](../enums/ErrorCode.md#notinitialized) - Throws error if the SDK is not initialized.

**`Throws`**

[NoActiveJourney](../enums/ErrorCode.md#noactivejourney) - Throws error if the SDK state does not have an active Journey.

**`Throws`**

[NetworkError](../enums/ErrorCode.md#networkerror) - Throws error if could not connect to server, or server did not respond before timeout.

**`Throws`**

[ClientResponseNotValid](../enums/ErrorCode.md#clientresponsenotvalid) - Throws error if the client response to the Journey is not valid.

**`Throws`**

[ServerError](../enums/ErrorCode.md#servererror) - Throws error if the server returned an unexpected error.

**`Example`**

```ts
// The previous response may include multiple response options. The standard 'ClientInput' response option
// signals we are sending collected user input to the journey step.
const selectedInputOptionId = ClientResponseOptionType.ClientInput;

// Submit the client input. The data inside the JSON correspond to the expected fields from the Journey step.
try {
  const idoResponse = await window.tsPlatform.ido.submitClientResponse(selectedInputOption, {
    'userEmail': 'user@input.email',
    'userPhone': '111-222-3333',
  });
} catch(sdkError) {
  switch(sdkError.errorCode) ...
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `clientResponseOptionId` | `string` | The response option ID is one of the IDs provided in the [clientResponseOptions](IdoServiceResponse.md#clientresponseoptions). This would either be [ClientInput](../enums/ClientResponseOptionType.md#clientinput) for collected user input, or one of the others if another journey path was selected by the user. |
| `data?` | `any` | The client response data object. Mandatory in [ClientInput](../enums/ClientResponseOptionType.md#clientinput) response option type, populate with data for the Journey step to process. Optional in [Cancel](../enums/ClientResponseOptionType.md#cancel) and [Custom](../enums/ClientResponseOptionType.md#custom) as an additional parameters for the branch. |

#### Returns

`Promise`<[`IdoServiceResponse`](IdoServiceResponse.md)\>

The promise that will be resolved when the [IdoServiceResponse](IdoServiceResponse.md) is received.

___

### serializeState

▸ **serializeState**(): `string`

**`Description`**

Get the current serialized state of the SDK. Can be stored by the application code and used to
restore the SDK state following page redirects or refresh

#### Returns

`string`

The current state of the SDK.

___

### restoreFromSerializedState

▸ **restoreFromSerializedState**(`state`): [`IdoServiceResponse`](IdoServiceResponse.md)

**`Description`**

Restores the SDK state from a serialized state, can be used to recover from page redirects or refresh.
The application code also receives the latest communication from Mosaic server.

**`Throws`**

[InvalidState](../enums/ErrorCode.md#invalidstate) - Throws error if the provided state string is invalid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `state` | `string` | The state to restore from. |

#### Returns

[`IdoServiceResponse`](IdoServiceResponse.md)

The last [IdoServiceResponse](IdoServiceResponse.md) that was received before the state was saved.

___

### generateDebugPin

▸ **generateDebugPin**(): `Promise`<`string`\>

**`Description`**

This method will generate a debug PIN
 const debugPin = await sdk.generateDebugPin();
 console.log(`Debug PIN: ${debugPin}`); // Output: Debug PIN: 1234

#### Returns

`Promise`<`string`\>
