
# ErrorCode

## Enumeration Members

### NotInitialized

• **NotInitialized** = ``"not_initialized"``

Either the SDK init call failed or another function was called before initializing the SDK

___

### AuthenticationFailed

• **AuthenticationFailed** = ``"authentication_failed"``

When the call to [startAuthentication](../interfaces/WebauthnApis.md#startauthentication) failed

___

### AuthenticationAbortedTimeout

• **AuthenticationAbortedTimeout** = ``"authentication_aborted_timeout"``


When [authenticate.modal](../interfaces/WebauthnAuthenticationFlows.md#modal) or [authenticate.autofill.activate](../interfaces/AutofillHandlers.md#activate) is called and the modal is closed by the user

___

### AuthenticationCanceled

• **AuthenticationCanceled** = ``"webauthn_authentication_canceled"``

When [register](../modules.md#register) is called and the modal is closed when reaching the timeout

___

### RegistrationFailed

• **RegistrationFailed** = ``"registration_failed"``

When the call to [startRegistration](../interfaces/WebauthnApis.md#startregistration) failed

___

### RegistrationAbortedTimeout

• **RegistrationAbortedTimeout** = ``"registration_aborted_timeout"``


When [register](../modules.md#register) is called and the modal is closed by the user


___

### RegistrationCanceled

• **RegistrationCanceled** = ``"webauthn_registration_canceled"``


When [register](../modules.md#register) is called and the modal is closed when reaching the timeout

___

### AutofillAuthenticationAborted

• **AutofillAuthenticationAborted** = ``"autofill_authentication_aborted"``

Passkey autofill authentication was aborted by [abort](../interfaces/AutofillHandlers.md#abort)

___

### AuthenticationProcessAlreadyActive

• **AuthenticationProcessAlreadyActive** = ``"authentication_process_already_active"``

Passkey authentication is already active. To start a new authentication, abort the current one first by calling [abort](../interfaces/AutofillHandlers.md#abort)

___

### InvalidApprovalData

• **InvalidApprovalData** = ``"invalid_approval_data"``


The ApprovalData parameter was sent in the wrong format

___

### FailedToInitCrossDeviceSession

• **FailedToInitCrossDeviceSession** = ``"cross_device_init_failed"``

When the call to [initCrossDeviceAuthentication](../interfaces/WebauthnApis.md#initcrossdeviceauthentication)  failed

___

### FailedToGetCrossDeviceStatus

• **FailedToGetCrossDeviceStatus** = ``"cross_device_status_failed"``

When the call to [getCrossDeviceTicketStatus](../interfaces/WebauthnApis.md#getcrossdeviceticketstatus)  failed

___

### Unknown

• **Unknown** = ``"unknown"``

When the SDK operation fails on an unhandled error
