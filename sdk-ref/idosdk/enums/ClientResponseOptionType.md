# ClientResponseOptionType

**`Description`**

The enum for the client response option types.

## Enumeration Members

### ClientInput

• **ClientInput** = ``"client_input"``

**`Description`**

Client response option type for client input. This is the standard response option for any step.

___

### Cancel

• **Cancel** = ``"cancel"``

**`Description`**

Client response option type for a cancelation branch in the Journey. Use this for canceling the current step.

___

### Fail

• **Fail** = ``"failure"``

**`Description`**

Client response option type for a failure branch in the Journey. Use this for reporting client side failure for the current step.

___

### Custom

• **Custom** = ``"custom"``

**`Description`**

Client response option type for custom branch in the Journey, used for custom branching.

___

### Resend

• **Resend** = ``"resend"``

**`Description`**

Client response option type for a resend of the OTP. Use this for restarting the current step (sms / email otp authentication).
