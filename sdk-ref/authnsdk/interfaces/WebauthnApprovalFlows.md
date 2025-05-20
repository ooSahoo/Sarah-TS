
# WebauthnApprovalFlows


## Methods

### modal

▸ **modal**(`username`, `approvalData`): `Promise`<`string`\>

Invokes a WebAuthn approval, including prompting the user to select from a list of registered credentials, and then prompting the user for biometrics. The credentials list is displayed using the native browser modal.<br/>
This call must be invoked for a registered username. If the target username is not registered or in case of any other failure, an SdkError will be thrown.<br/>
If approval is completed successfully, this call will return a promise that resolves to the credential result, which is an object encoded as a base64 string. This encoded result should then be passed to the [backend authentication endpoint](/openapi/user/backend-webauthn/#operation/authenticateWebauthnCredential) to retrieve user tokens.<br/>

**`Throws`**

[NotInitialized](../enums/ErrorCode.md#notinitialized)

**`Throws`**

[InvalidApprovalData](../enums/ErrorCode.md#invalidapprovaldata)

**`Throws`**

[AuthenticationFailed](../enums/ErrorCode.md#authenticationfailed)

**`Throws`**

[AuthenticationCanceled](../enums/ErrorCode.md#authenticationcanceled)

**`Throws`**

[AuthenticationProcessAlreadyActive](../enums/ErrorCode.md#authenticationprocessalreadyactive)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `username` | `string` | Name of user account, as used in the WebAuthn registration. |
| `approvalData` | `Record`<`string`, `string`\> | Data that represents the approval to be signed with a passkey |

#### Returns

`Promise`<`string`\>

Base64-encoded object, which contains the credential result. This encoded result will be used to fetch user tokens via the [backend authentication endpoint](/openapi/user/backend-webauthn/#operation/authenticateWebauthnCredential).
