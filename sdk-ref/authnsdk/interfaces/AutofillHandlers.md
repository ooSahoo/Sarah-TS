
# AutofillHandlers


## Methods

### activate

▸ **activate**(`handlers`, `username?`): `void`

Invokes a WebAuthn authentication, including prompting the user to select from a list of registered credentials using autofill, and then prompting the user for biometrics. In order to prompt this credentials list, the autocomplete="username webauthn" attribute **must** be defined on the username input box of the authentication page.<br/>
If authentication is completed successfully, the `onSuccess` callback will be triggered with the credential result, which is an object encoded as a base64 string. This encoded result should then be passed to the [backend authentication endpoint](/openapi/user/backend-webauthn/#operation/authenticateWebauthnCredential) to retrieve user tokens.<br/>
If it fails, the `onError` callback will be triggered with an SdkError.

**`Throws`**

[NotInitialized](../enums/ErrorCode.md#notinitialized)

**`Throws`**

[AuthenticationFailed](../enums/ErrorCode.md#authenticationfailed)

**`Throws`**

[AuthenticationCanceled](../enums/ErrorCode.md#authenticationcanceled)

**`Throws`**

[AutofillAuthenticationAborted](../enums/ErrorCode.md#autofillauthenticationaborted)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handlers` | [`AuthenticationAutofillActivateHandlers`](AuthenticationAutofillActivateHandlers.md) | Handlers that will be invoked once the authentication is completed (success or failure) |
| `username?` | `string` | Name of user account, as used in the WebAuthn registration. If not provided, the authentication will start without the context of a user and it will be inferred by the chosen passkey |

#### Returns

`void`

___

### abort

▸ **abort**(): `void`

Aborts a WebAuthn authentication. This method should be called after the passkey autofill is dismissed in order to be able to query existing passkeys once again. This will end the browser's  `navigator.credentials.get()` operation.

#### Returns

`void`
