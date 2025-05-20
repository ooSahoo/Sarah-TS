# drs

## Overview

The `drs` module allows you to integrate [Fraud Prevention](/guides/risk/overview.md) services into your application.

When the SDK is initialized, it automatically starts to collect and submit telemetry data to Mosaic&mdash;including information of the user journey using various JS events, browser data, and user interactions. Once specific user actions are performed on the client side (such as login), this SDK module should be called in order to track those action events. The data collected by the SDK can then be queried for recommendations using [Recommendations](/openapi/risk/recommendations) backend API.

## clearUser

▸ **clearUser**(`options?`): `Promise`<`boolean`\>

Clears the user context for all subsequent events in the browser session

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Object` | Reserved for future use |

#### Returns

`Promise`<`boolean`\>

Indicates if the call succeeded

___

## setAuthenticatedUser

▸ **setAuthenticatedUser**(`userId`, `options?`): `Promise`<`boolean`\>

Sets the user context for all subsequent events in the browser session (or until the user is explicitly cleared). It should be set only after you've fully authenticated the user (including, for example, any 2FA that was required)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` | Opaque identifier of the user in your system |
| `options?` | `Object` | Reserved for future use |

#### Returns

`Promise`<`boolean`\>

Indicates if the call succeeded

___

## triggerActionEvent

▸ **triggerActionEvent**(`actionType`, `options?`): `Promise`<[`ActionResponse`](../interfaces/ActionResponse.md)\>

Reports a user action event to the SDK

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionType` | `string` | Type of user action event that was predefined in the Mosaic server |
| `options?` | [`ActionEventOptions`](../interfaces/ActionEventOptions.md) | - |

#### Returns

`Promise`<[`ActionResponse`](../interfaces/ActionResponse.md)\>

Indicates if the call succeeded

___

### getSessionToken

▸ **getSessionToken**(): `Promise`<`string`\>

Get a session token, which can be used to trigger an action event via backend API.
Requires setting `enableSessionToken` to true in the SDK configuration.

#### Returns

`Promise`<`string`\>

The session token.