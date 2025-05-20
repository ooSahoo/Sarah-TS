
# WebauthnRegistrationOptions


## Hierarchy

- [`WebauthnCrossDeviceRegistrationOptions`](WebauthnCrossDeviceRegistrationOptions.md)

  ↳ **`WebauthnRegistrationOptions`**

## Properties

### allowCrossPlatformAuthenticators

• `Optional` **allowCrossPlatformAuthenticators**: `boolean`

Allow registration using cross-platform authenticators, such as a USB security key or a different device. If enabled, cross-device authentication flows can be performed using the native browser experience (via QR code). default: True

#### Inherited from

[WebauthnCrossDeviceRegistrationOptions](WebauthnCrossDeviceRegistrationOptions.md).[allowCrossPlatformAuthenticators](WebauthnCrossDeviceRegistrationOptions.md#allowcrossplatformauthenticators)

___

### registerAsDiscoverable

• `Optional` **registerAsDiscoverable**: `boolean`

Must be set to true to register credentials as passkeys when supported (except for Apple devices, which always register credentials as passkeys). default: True

#### Inherited from

[WebauthnCrossDeviceRegistrationOptions](WebauthnCrossDeviceRegistrationOptions.md).[registerAsDiscoverable](WebauthnCrossDeviceRegistrationOptions.md#registerasdiscoverable)

___

### displayName

• `Optional` **displayName**: `string`

Human-palatable name for the user account, only for display (max 64 characters). If not set, the username parameter will also act as the display name

___

### timeout

• `Optional` **timeout**: `number`

The timeout in seconds for the registration process. If the timeout is reached, the registration process will be aborted with error [RegistrationAbortedTimeout](../enums/ErrorCode.md#registrationabortedtimeout).

___

### limitSingleCredentialToDevice

• `Optional` **limitSingleCredentialToDevice**: `boolean`

Set to True in order to limit the creation of multiple credentials for the same account on a single authenticator. default: False
