# ClientResponseOption

**`Interface`**

**`Description`**

The interface for client response option object. Use this object to submit client input to the Journey
step to process, cancel the current step or choose a custom branch.

## Properties

### type

• `Readonly` **type**: [`ClientResponseOptionType`](../enums/ClientResponseOptionType.md)

**`Description`**

The type of the client response option.

___

### id

• `Readonly` **id**: `string`

**`Description`**

The id of the client response option.
Journey step unique id is provided for the [Custom](../enums/ClientResponseOptionType.md#custom) response option type.
[ClientInput](../enums/ClientResponseOptionType.md#clientinput) and [Cancel](../enums/ClientResponseOptionType.md#cancel) have standard Ids _ClientInput_ and _Cancel_, respectively.

___

### label

• `Readonly` **label**: `string`

**`Description`**

The label of the client response option.

___

### schema

• `Optional` **schema**: `Record`<`string`, `any`\>

**`Description`**

Optional schema object that can be used for UI rendering.
