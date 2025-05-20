# Reference

## Interfaces

- [AuthenticationAutofillActivateHandlers](interfaces/AuthenticationAutofillActivateHandlers.md)
- [AutofillHandlers](interfaces/AutofillHandlers.md)
- [CrossDeviceAuthenticationHandlers](interfaces/CrossDeviceAuthenticationHandlers.md)
- [CrossDeviceRegistrationHandlers](interfaces/CrossDeviceRegistrationHandlers.md)
- [WebauthnApprovalFlows](interfaces/WebauthnApprovalFlows.md)
- [WebauthnAuthenticationFlows](interfaces/WebauthnAuthenticationFlows.md)
- [WebauthnAuthenticationOptions](interfaces/WebauthnAuthenticationOptions.md)
- [WebauthnCrossDeviceFlows](interfaces/WebauthnCrossDeviceFlows.md)
- [WebauthnCrossDeviceRegistrationOptions](interfaces/WebauthnCrossDeviceRegistrationOptions.md)
- [WebauthnRegistrationOptions](interfaces/WebauthnRegistrationOptions.md)
- [WebauthnApis](interfaces/WebauthnApis.md)
- [CrossDeviceController](interfaces/CrossDeviceController.md)
- [ApiCrossDeviceStatusResponse](interfaces/ApiCrossDeviceStatusResponse.md)
- [AttachDeviceResult](interfaces/AttachDeviceResult.md)
- [SdkError](interfaces/SdkError.md)

## Enumerations

- [ErrorCode](enums/ErrorCode.md)
- [WebauthnCrossDeviceStatus](enums/WebauthnCrossDeviceStatus.md)

## Variables

### authenticate

• `Const` **authenticate**: [`WebauthnAuthenticationFlows`](interfaces/WebauthnAuthenticationFlows.md)

Returns the authentication flows for webauthn

___

### approve

• `Const` **approve**: [`WebauthnApprovalFlows`](interfaces/WebauthnApprovalFlows.md)

___

### crossDevice

• **crossDevice**: [`WebauthnCrossDeviceFlows`](interfaces/WebauthnCrossDeviceFlows.md)

## Functions

### register

▸ **register**(`username`, `options?`): `Promise`<`string`\>

Invokes a WebAuthn credential registration for the specified user, including prompting the user for biometrics.
If registration is completed successfully, this call will return a promise that resolves to the credential result, which is an object encoded as a base64 string. This encoded result should then be passed to the relevant backend registration endpoint to complete the registration for either a [logged-in user](/openapi/user/backend-webauthn/#operation/webauthn-registration) or [logged-out user](/openapi/user/backend-webauthn/#operation/webauthn-registration-external).

If registration fails, an SdkError will be thrown.

**`Throws`**

[NotInitialized](enums/ErrorCode.md#notinitialized)

**`Throws`**

[RegistrationFailed](enums/ErrorCode.md#registrationfailed)

**`Throws`**

[RegistrationCanceled](enums/ErrorCode.md#registrationcanceled)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `username` | `string` | WebAuthn username to register |
| `options?` | [`WebauthnRegistrationOptions`](interfaces/WebauthnRegistrationOptions.md) | Additional configuration for registration flow |

#### Returns

`Promise`<`string`\>

___

### isPlatformAuthenticatorSupported

▸ **isPlatformAuthenticatorSupported**(): `Promise`<`undefined` \| `boolean`\>

#### Returns

`Promise`<`undefined` \| `boolean`\>

___

### isAutofillSupported

▸ **isAutofillSupported**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

___

### getDefaultPaths

▸ **getDefaultPaths**(): [`WebauthnApis`](interfaces/WebauthnApis.md)

#### Returns

[`WebauthnApis`](interfaces/WebauthnApis.md)
