# IdoInitOptions

**`Interface`**

**`Description`**

Parameters for SDK initialization

## Properties

### serverPath

• **serverPath**: `string`

Base path for sending API requests. This would be the base URL of Mosaic server.

___

### resource

• `Optional` **resource**: `string`

An optional resource URI, if defined in the application settings in the admin portal

___

### logLevel

• `Optional` **logLevel**: [`LogLevel`](../enums/LogLevel.md)

The log level for the SDK. Default is LogLevel.Info

**`Default`**

LogLevel.Info

**`See`**

[LogLevel](../enums/LogLevel.md)

___

### pollingTimeout

• `Optional` **pollingTimeout**: `number`

The timeout for polling requests to the server for the wait for another device action in seconds.

**`Default`**

3

**`See`**

[WaitForAnotherDevice](../enums/IdoJourneyActionType.md#waitforanotherdevice)
