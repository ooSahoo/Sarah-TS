
# CrossDeviceAuthenticationHandlers


## Hierarchy

- `BaseCrossDeviceHandlers`

  ↳ **`CrossDeviceAuthenticationHandlers`**

## Properties

### onDeviceAttach

• **onDeviceAttach**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

Called when the user has successfully attached a device to the cross-device flow using the [attachDevice](WebauthnCrossDeviceFlows.md#attachdevice) method.

##### Returns

`Promise`<`void`\>

#### Inherited from

BaseCrossDeviceHandlers.onDeviceAttach

___

### onFailure

• **onFailure**: (`error`: [`ApiCrossDeviceStatusResponse`](ApiCrossDeviceStatusResponse.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`error`): `Promise`<`void`\>

Called when there was an error in the cross-device flow with status response [ApiCrossDeviceStatusResponse](ApiCrossDeviceStatusResponse.md).

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | [`ApiCrossDeviceStatusResponse`](ApiCrossDeviceStatusResponse.md) |

##### Returns

`Promise`<`void`\>

#### Inherited from

BaseCrossDeviceHandlers.onFailure

___

### onCredentialAuthenticate

• **onCredentialAuthenticate**: (`sessionId`: `string`) => `Promise`<`void`\>

#### Type declaration

▸ (`sessionId`): `Promise`<`void`\>

Called upon successful webauthn authentication.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sessionId` | `string` | Session ID that will be exchanged for the user's access and ID tokens using the /v1/auth/session/authenticate API |

##### Returns

`Promise`<`void`\>
