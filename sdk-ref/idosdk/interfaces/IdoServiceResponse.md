# IdoServiceResponse

**`Interface`**

**`Description`**

The interface for the Journey step response object. Including Journey end with either error, rejection and success.

## Properties

### type

• `Readonly` **type**: [`IdoServiceResponseType`](../enums/IdoServiceResponseType.md)

**`Deprecated`**

**`Description`**

Deprecated attribute. Use [IdoJourneyActionType](../enums/IdoJourneyActionType.md) instead.

___

### data

• `Optional` `Readonly` **data**: `any`

**`Description`**

Optional data object returned from the server for any of the journey steps.

___

### errorData

• `Optional` `Readonly` **errorData**: [`IdoSdkError`](IdoSdkError.md)

**`Description`**

Additional error data returned from the server for any of the journey steps.

___

### journeyStepId

• `Optional` `Readonly` **journeyStepId**: `string`

**`Description`**

Contains the Journey step ID, allowing the client side to choose the correct handler and UI.
This will be either a form ID for the "Get Information from Client" and "Login Form" journey steps,
or one of [IdoJourneyActionType](../enums/IdoJourneyActionType.md) for other actions.

___

### clientResponseOptions

• `Optional` `Readonly` **clientResponseOptions**: `Record`<`string`, [`ClientResponseOption`](ClientResponseOption.md)\>

**`Description`**

The Journey client response options if the response type is [ClientInputRequired](../enums/IdoServiceResponseType.md#clientinputrequired)
or [ClientInputUpdateRequired](../enums/IdoServiceResponseType.md#clientinputupdaterequired).

___

### token

• `Optional` **token**: `string`

**`Description`**

A proof of journey completion is provided upon successful completion of the journey,
indicated by the [Success](../enums/IdoJourneyActionType.md#success) step ID.

___

### redirectUrl

• `Optional` **redirectUrl**: `string`

**`Description`**

If a browser-redirection is required (for example at the end of an SSO journey) - the server will provide the redirect URL here.
The client should redirect the browser to this URL, i.e. by issuing a `window.location.href = response.redirectUrl;`
