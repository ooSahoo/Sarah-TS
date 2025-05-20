
# AuthenticationAutofillActivateHandlers


## Properties

### onSuccess

• **onSuccess**: (`webauthn_encoded_result`: `string`) => `Promise`<`void`\>

#### Type declaration

▸ (`webauthn_encoded_result`): `Promise`<`void`\>

A Callback function that will be triggered once biometrics signing is completed successfully.

##### Parameters

| Name | Type |
| :------ | :------ |
| `webauthn_encoded_result` | `string` |

##### Returns

`Promise`<`void`\>

___

### onError

• `Optional` **onError**: (`err`: [`SdkError`](SdkError.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`err`): `Promise`<`void`\>

A Callback function that will be triggered if authentication fails with an SdkError.

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | [`SdkError`](SdkError.md) |

##### Returns

`Promise`<`void`\>

___

### onReady

• `Optional` **onReady**: () => `void`

#### Type declaration

▸ (): `void`

A Callback function that will be triggered when challenge excepted from the service and autofill is ready to use.

##### Returns

`void`
