# IdoJourneyActionType

**`Description`**

The enum for the Journey step ID, used when the journey step is a predefined typed action.
The actions that do not use this are "Get Information from Client" and "Login Form" which allow the journey author to define a custom ID.
See also [journeyStepId](../interfaces/IdoServiceResponse.md#journeystepid).

## Enumeration Members

### Rejection

• **Rejection** = ``"action:rejection"``

**`Description`**

`journeyStepId` for a journey rejection.

___

### Success

• **Success** = ``"action:success"``

**`Description`**

`journeyStepId` for a journey completion.

___

### Information

• **Information** = ``"action:information"``

**`Description`**

`journeyStepId` for an Information action.

Data received in the [IdoServiceResponse](../interfaces/IdoServiceResponse.md) object:
These are the text values that are configured for the Information action step in the journey editor.
This can be used to display the information to the user.
```json
{
 "data": {
   "title": "<TITLE>",
   "text": "<TEXT>",
   "button_text": "<BUTTON TEXT>"
 }
}
```
The client response does not need to include any data: `tsPlatform.ido.submitClientResponse(ClientResponseOptionType.ClientInput);`

___

### DebugBreak

• **DebugBreak** = ``"action:debug_break"``

**`Description`**

`journeyStepId` for a server side debugger breakpoint.
This response is sent to the client side when the journey debugger has reached a breakpoint, and will continue to return while
the journey debugger is paused.

The [IdoServiceResponse](../interfaces/IdoServiceResponse.md) object does not include any data.

The client response does not need to include any data: `tsPlatform.ido.submitClientResponse(ClientResponseOptionType.ClientInput);`

___

### WaitForAnotherDevice

• **WaitForAnotherDevice** = ``"action:wait_for_another_device"``

**`Description`**

`journeyStepId` for a Wait for Cross Session Message action.

The [IdoServiceResponse](../interfaces/IdoServiceResponse.md) object includes information that can be presented as a QR to scan by another device.
The response will remain the same while the cross session message was not consumed by the journey executed by the other device.

The client response does not need to include any data: `tsPlatform.ido.submitClientResponse(ClientResponseOptionType.ClientInput);`

___

### WebAuthnRegistration

• **WebAuthnRegistration** = ``"action:webauthn_registration"``

**`Description`**

`journeyStepId` for WebAuthn Registration action.

Data received in the [IdoServiceResponse](../interfaces/IdoServiceResponse.md) object: the input parameters that you need to send to `tsPlatform.webauthn.register()`
```json
{
 "data": {
   "username": "<USERNAME>",
   "display_name": "<DISPLAY_NAME>",
   "register_as_discoverable": <true|false>,
   "allow_cross_platform_authenticators": <true|false>
 }
}
```

Before responding, activate `tsPlatform.webauthn.register()` to obtain the `webauthn_encoded_result` value.
This will present the user with the WebAuthn registration UI. Use the result to send the client response:
```json
tsPlatform.ido.submitClientResponse(
    ClientResponseOptionType.ClientInput,
    {
        "webauthn_encoded_result": "<WEBAUTHN_ENCODED_RESULT_FROM_SDK>"
    })
```

___

### DrsTriggerAction

• **DrsTriggerAction** = ``"action:drs_trigger_action"``

**`Description`**

`journeyStepId` for instructing the use of Fraud Prevention trigger action, as part of the Risk Recommendation journey step.

Data received in the [IdoServiceResponse](../interfaces/IdoServiceResponse.md) object: the input parameters that you need to send to `tsPlatform.drs.triggerActionEvent()`
```json
{
 "data": {
    "correlation_id": "a47ed80a-41f9-464a-a42f-fce775b6e446",
    "user_id": "user",
    "action_type": "login"
 },
}
```
Before responding, activate `tsPlatform.drs.triggerActionEvent()` to obtain the `action_token` value. This is a silent action, and does not require user interaction.
Use the result to send the client response:
```json
tsPlatform.ido.submitClientResponse(
    ClientResponseOptionType.ClientInput,
    {
        "action_token": "<DRS action token>"
    })
```

___

### IdentityVerification

• **IdentityVerification** = ``"action:id_verification"``

**`Description`**

`journeyStepId` for Identity Verification action.

Data received in the [IdoServiceResponse](../interfaces/IdoServiceResponse.md) object:
```json
{
 "data": {
   "payload": {
     "endpoint": "<endpoint to redirect>",
     "base_endpoint": "<base endpoint>",
     "start_token": "<start token>",
     "state": "<state>",
     "session": "<session>"
     },
   }
}
```
Use this data to redirect the user to the identity verification endpoint.
Since this redirects to a different page, make sure you store the SDK state by calling `tsPlatform.ido.serializeState()`, and saving the response data in the session storage.
After the user completes the identity verification, you can restore the SDK state and continue the journey, by calling `tsPlatform.ido.restoreFromSerializedState()` with the stored state.

Once done, send the following client response:
```json
tsPlatform.ido.submitClientResponse(
    ClientResponseOptionType.ClientInput,
    {
        "payload": {
            "sessionId": "<sessionId>",
            "state": "<state>"
        }
    })
```

___

### EmailOTPAuthentication

• **EmailOTPAuthentication** = ``"transmit_platform_email_otp_authentication"``

**`Description`**

`journeyStepId` for Email OTP authentication action.

Data received in the [IdoServiceResponse](../interfaces/IdoServiceResponse.md) object:

```json
{
 "data": {
   "code_length": <integer_code_length>
  }
}
```

On failure, the `IdoServiceResponse` [errorData](../interfaces/IdoServiceResponse.md#errordata) field will contain either the error code [InvalidCredentials](ErrorCode.md#invalidcredentials) or the error code [ExpiredOTPPasscode](ErrorCode.md#expiredotppasscode).

This can be used to indicate that the passcode is invalid, prompting the user to enter a new passcode.
Also, a resend option (see below) can be provided to the user.

Client responses:

- For simple submit of OTP passcode:
```json
     tsPlatform.ido.submitClientResponse(
         ClientResponseOptionType.ClientInput,
         {
             "passcode": "<passcode>"
         })
```

- In Order to request resend of OTP (restart the action):
    `tsPlatform.ido.submitClientResponse(ClientResponseOptionType.Resend)`

___

### SmsOTPAuthentication

• **SmsOTPAuthentication** = ``"transmit_platform_sms_otp_authentication"``

**`Description`**

`journeyStepId` for SMS OTP authentication action.

Data received in the [IdoServiceResponse](../interfaces/IdoServiceResponse.md) object:

```json
{
 "data": {
   "code_length": <integer_code_length>
  }
}
```

On failure, the `IdoServiceResponse` [errorData](../interfaces/IdoServiceResponse.md#errordata) field will contain either the error code [InvalidCredentials](ErrorCode.md#invalidcredentials), or the error code [ExpiredOTPPasscode](ErrorCode.md#expiredotppasscode)

This can be used to indicate that the passcode is invalid, prompting the user to enter a new passcode.
Also, a resend option (see below) can be provided to the user.

Client responses:

- For simple submit of OTP passcode:
```json
     tsPlatform.ido.submitClientResponse(
         ClientResponseOptionType.ClientInput,
         {
             "passcode": "<passcode>"
         })
```

- In Order to request resend of OTP (restart the action):
    `tsPlatform.ido.submitClientResponse(ClientResponseOptionType.Resend)`

___

### EmailValidation

• **EmailValidation** = ``"transmit_platform_email_validation"``

**`Description`**

`journeyStepId` for Email Validation action.

Data received in the [IdoServiceResponse](../interfaces/IdoServiceResponse.md) object:

```json
{
 "data": {
   "code_length": <integer_code_length>
  }
}
```

On failure, the `IdoServiceResponse` [errorData](../interfaces/IdoServiceResponse.md#errordata) field will contain either the error code [InvalidCredentials](ErrorCode.md#invalidcredentials)

Resend option also (see below) can be provided to the user.

Client responses:

- For simple submit of validation passcode:
```json
     tsPlatform.ido.submitClientResponse(
         ClientResponseOptionType.ClientInput,
         {
             "passcode": "<passcode>"
         })
```

- In Order to request resend of OTP (restart the action):
    `tsPlatform.ido.submitClientResponse(ClientResponseOptionType.Resend)`

___

### SmsValidation

• **SmsValidation** = ``"transmit_platform_sms_validation"``

**`Description`**

`journeyStepId` for Sms Validation action.

Data received in the [IdoServiceResponse](../interfaces/IdoServiceResponse.md) object:

```json
{
 "data": {
   "code_length": <integer_code_length>
  }
}
```

On failure, the `IdoServiceResponse` [errorData](../interfaces/IdoServiceResponse.md#errordata) field will contain either the error code [InvalidCredentials](ErrorCode.md#invalidcredentials)

Resend option also (see below) can be provided to the user.

Client responses:

- For simple submit of validation passcode:
```json
     tsPlatform.ido.submitClientResponse(
         ClientResponseOptionType.ClientInput,
         {
             "passcode": "<passcode>"
         })
```

- In Order to request resend of OTP (restart the action):
    `tsPlatform.ido.submitClientResponse(ClientResponseOptionType.Resend)`

___

### TotpRegistration

• **TotpRegistration** = ``"transmit_platform_totp_registration"``

___

### TransactionSigningTOTP

• **TransactionSigningTOTP** = ``"transmit_platform_transaction_signing_totp"``

**`Description`**

`journeyStepId` for Transaction Signing with TOTP action.

Data received in the [IdoServiceResponse](../interfaces/IdoServiceResponse.md) object:
```json
{
 "data": {
   "transaction_challenge": "<6_DIGIT_CHALLENGE_CODE>",
   "approval_data": {
     // Note: This is just an example. The actual approval_data can vary.
     "transactionId": "<TRANSACTION_ID>",
     "amount": "<AMOUNT>",
     "currency": "<CURRENCY>"
   }
 }
}
```
Use this data to display the transaction details and the challenge code to the user.
The user should use this challenge code to generate a TOTP code using their authenticator app.

Client responses:

- For submitting the TOTP code:
```json
tsPlatform.ido.submitClientResponse(
   ClientResponseOptionType.ClientInput,
   {
     "totp_code": "<6_DIGIT_TOTP_CODE>"
   }
)
```

On failure, the `IdoServiceResponse` [errorData](../interfaces/IdoServiceResponse.md#errordata) field will contain the error code [InvalidCredentials](ErrorCode.md#invalidcredentials).
This can be used to indicate that the TOTP code is invalid, prompting the user to enter a new code.

Note: The user has a limited number of attempts to enter the correct TOTP code before the journey is rejected.

___

### InvokeIDP

• **InvokeIDP** = ``"invoke_idp"``

**`Description`**

`journeyStepId` for Invoke IDP action.

Data received in the [IdoServiceResponse](../interfaces/IdoServiceResponse.md) object:
```json
{
 "data": {
   "authorization_url": "<URL_OF_THE_AUTHORIZATION_ENDPOINT>",
   "authorization_request_method": "<GET_OR_POST>",
   "invocation_method": "<PAGE_OR_POPUP>",
   "idp_name": "<IDP_NAME>"
 }
}
```
Use this data to redirect the user to the IDP authorization endpoint.

Once done, send the following client response:
```json
tsPlatform.ido.submitClientResponse(
   ClientResponseOptionType.ClientInput,
   {
      "idp_response" : {
         "code": "<code>",
         "state": "<state>",
      }
    }
)
```

___

### TransactionSigningPasskey

• **TransactionSigningPasskey** = ``"transmit_platform_transaction_signing_passkey"``

**`Description`**

`journeyStepId` for Transaction Signing with Passkeys action.

Data received in the [IdoServiceResponse](../interfaces/IdoServiceResponse.md) object:
```json
{
 "data": {
   "user_identifier": "<USERNAME>",
   "approval_data": {
     // Note: This is just an example. The actual approval_data can vary.
     "transactionId": "<TRANSACTION_ID>",
     "amount": "<AMOUNT>",
     "currency": "<CURRENCY>"
   }
 }
}
```
Before responding, call `tsPlatform.webauthn.approve.modal()` to obtain the `webauthn_encoded_result` value.
```javascript
const result = await tsPlatform.webauthn.approve.modal(
  response.data.approval_data // Transaction details to be approved
);
```

Then submit the result:
```javascript
tsPlatform.ido.submitClientResponse(
   ClientResponseOptionType.ClientInput,
   {
     "webauthn_encoded_result": result
   }
)
```

On failure, the `IdoServiceResponse` [errorData](../interfaces/IdoServiceResponse.md#errordata) field will contain 
relevant error codes that can be used to handle various failure scenarios.

Note: The approval_data object can contain up to 10 key-value pairs using only alphanumeric 
characters, underscores, hyphens, and periods. The WebAuthn encoded result remains valid for 60 seconds.

___

### WebToMobileAuthentication

• **WebToMobileAuthentication** = ``"transmit_platform_mobile_approve_authentication"``

**`Description`**

`journeyStepId` for Web to Mobile Authentication action.
This action type is used for both simple authentication and transaction signing scenarios.

Initial Data received in the [IdoServiceResponse](../interfaces/IdoServiceResponse.md) object when multiple devices are available:
```json
{
 "data": {
   "devices": [
     {
       "name": "Device 1",
       "code": "1"
     },
     {
       "name": "Device 2", 
       "code": "2"
     }
   ]
 }
}
```

For device selection, send the following client response:
```javascript
tsPlatform.ido.submitClientResponse(
   ClientResponseOptionType.ClientInput,
   {
     "selected_device_code": "<DEVICE_CODE>"
   }
)
```

After device selection or when only one device is available, the action will wait for mobile approval.
The response includes polling configuration and optional transaction details:
```json
{
 "data": {
   "resend_attempts_left": 5,
   "polling_interval": 3,
   "approval_data": {
     // Note: This is just an example. The actual approval_data can vary.
     "transactionId": "<TRANSACTION_ID>",
     "amount": "<AMOUNT>",
     "currency": "<CURRENCY>"
   }
 }
}
```

The following options are available:

- To check current authentication status (polling):
```javascript
// The application should implement its own polling mechanism
// and call this method periodically to check the status
tsPlatform.ido.submitClientResponse(ClientResponseOptionType.ClientInput)
```

- To cancel the authentication:
```javascript
tsPlatform.ido.submitClientResponse(ClientResponseOptionType.Cancel)
```

- To resend the push notification:
```javascript
tsPlatform.ido.submitClientResponse(ClientResponseOptionType.Resend)
```

Note: The application is responsible for implementing the polling mechanism 
to check the authentication status. The SDK only provides the method to 
submit the status check request. Use the polling_interval from the response
to determine the frequency of status checks.

On failure, the `IdoServiceResponse` [errorData](../interfaces/IdoServiceResponse.md#errordata) field will contain 
relevant error codes that can be used to handle various failure scenarios.
