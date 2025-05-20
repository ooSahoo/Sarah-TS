# IdoServiceResponseType

**`Deprecated`**

**`Description`**

Deprecated enum. Use [IdoJourneyActionType](IdoJourneyActionType.md) instead to detect completion, rejection, or a step that requires client input.

## Enumeration Members

### JourneySuccess

• **JourneySuccess** = ``"journey_success"``

**`Description`**

The Journey ended successfully.

___

### ClientInputRequired

• **ClientInputRequired** = ``"client_input_required"``

**`Description`**

The Journey reached a step that requires client input.

___

### ClientInputUpdateRequired

• **ClientInputUpdateRequired** = ``"client_input_update_required"``

**`Description`**

The current Journey step updated the client data or provided an error message.

___

### JourneyRejection

• **JourneyRejection** = ``"journey_rejection"``

**`Description`**

The Journey ended with explicit rejection.
