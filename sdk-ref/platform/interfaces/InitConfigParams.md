---
title: InitConfigParams
---

# Interface: InitConfigParams

Configuration parameters for the SDK

## Properties

### clientId

• **clientId**: `string`

Your Mosaic client identifier

___

### drs

• **drs**: `Object`

Initial configuration for Fraud Prevention (`drs` module)

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverPath?` | `string` | Server URL for Fraud Prevention. Default value is https://api.transmitsecurity.io/risk-collect |
| `userId?` | `string` | Opaque identifier of the user in your system, which should only be passed for users that have already been fully authenticated |
| `verbose?` | `boolean` | Print logs to console |
| `enabled?` | `boolean` | Used to disable data collection, which will effectively disable the Fraud Prevention capabilities. Default value is `true` |
| `enableSessionToken?` | `boolean` | Used to enable session token that can be used to trigger action events via a backend API. Default value is `false` |

___


<style>
table th:first-of-type {
    width: 20%;
}
table th:nth-of-type(2) {
    width: 15%;
}
table th:nth-of-type(3) {
    width: 65%;
}
</style>
