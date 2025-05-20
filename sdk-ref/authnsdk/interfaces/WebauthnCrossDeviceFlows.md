
# WebauthnCrossDeviceFlows


## Properties

### init

• **init**: `Object`

Initializes a cross device flow, such as when users request to login to a desktop using their mobile device. Once invoked, the SDK will start listening for events occurring on the other device,
and calls your handlers when a state change is detected.
These methods return a promise that resolves to a [CrossDeviceController](CrossDeviceController.md) object, which allows you to stop listening to events and includes the cross-device ticket ID which is used when attaching another device to the flow.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `registration` | (`params`: { `crossDeviceTicketId`: `string` ; `handlers`: [`CrossDeviceRegistrationHandlers`](CrossDeviceRegistrationHandlers.md)  }) => `Promise`<[`CrossDeviceController`](CrossDeviceController.md)\> |
| `authentication` | (`params`: { `username?`: `string` ; `handlers`: [`CrossDeviceAuthenticationHandlers`](CrossDeviceAuthenticationHandlers.md)  }) => `Promise`<[`CrossDeviceController`](CrossDeviceController.md)\> |
| `approval` | (`params`: { `username`: `string` ; `approvalData`: `Record`<`string`, `string`\> ; `handlers`: [`CrossDeviceAuthenticationHandlers`](CrossDeviceAuthenticationHandlers.md)  }) => `Promise`<[`CrossDeviceController`](CrossDeviceController.md)\> |

___

### authenticate

• **authenticate**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `modal` | (`crossDeviceTicketId`: `string`) => `Promise`<`string`\> |

___

### approve

• **approve**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `modal` | (`crossDeviceTicketId`: `string`) => `Promise`<`string`\> |

___

### register

• **register**: (`crossDeviceTicketId`: `string`, `options?`: [`WebauthnCrossDeviceRegistrationOptions`](WebauthnCrossDeviceRegistrationOptions.md)) => `Promise`<`string`\>

#### Type declaration

▸ (`crossDeviceTicketId`, `options?`): `Promise`<`string`\>

Invokes a WebAuthn credential registration for the user used in the cross device session init, including prompting the user for biometrics.
If registration is completed successfully, this call will return a promise that resolves to the credential result, which is an object encoded as a base64 string. This encoded result should then be passed to the relevant backend registration endpoint to complete the registration for either a [logged-in user](/openapi/user/backend-webauthn/#operation/webauthn-registration) or [logged-out user](/openapi/user/backend-webauthn/#operation/webauthn-registration-external).
If registration fails, an SdkError will be thrown.
If the backend registration call was successful, [onCredentialRegister](CrossDeviceRegistrationHandlers.md#oncredentialregister) will be called.

**`Throws`**

[NotInitialized](../enums/ErrorCode.md#notinitialized)

**`Throws`**

[RegistrationFailed](../enums/ErrorCode.md#registrationfailed)

**`Throws`**

[RegistrationCanceled](../enums/ErrorCode.md#registrationcanceled)

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `crossDeviceTicketId` | `string` | Ticket ID of the cross-device flow. retrieved from the [CrossDeviceController](CrossDeviceController.md) object. |
| `options?` | [`WebauthnCrossDeviceRegistrationOptions`](WebauthnCrossDeviceRegistrationOptions.md) | Additional configuration for registration flow |

##### Returns

`Promise`<`string`\>

___

### attachDevice

• **attachDevice**: (`crossDeviceTicketId`: `string`) => `Promise`<[`AttachDeviceResult`](AttachDeviceResult.md)\>

#### Type declaration

▸ (`crossDeviceTicketId`): `Promise`<[`AttachDeviceResult`](AttachDeviceResult.md)\>

Indicates when a session is accepted on another device in cross-device flows.

If successful,[onDeviceAttach](CrossDeviceRegistrationHandlers.md#ondeviceattach) will be called in registration flow and [onDeviceAttach](CrossDeviceAuthenticationHandlers.md#ondeviceattach) for authentication.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `crossDeviceTicketId` | `string` | Ticket ID of the cross-device flow. retrieved from the [CrossDeviceController](CrossDeviceController.md) object. |

##### Returns

`Promise`<[`AttachDeviceResult`](AttachDeviceResult.md)\>


AttachDeviceResult [AttachDeviceResult](AttachDeviceResult.md). Object containing the ticket status, creation timestamp, and approval data (if passed in the init.authentication() call)

