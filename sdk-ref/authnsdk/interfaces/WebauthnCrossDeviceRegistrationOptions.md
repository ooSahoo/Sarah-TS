
# WebauthnCrossDeviceRegistrationOptions


## Hierarchy

- **`WebauthnCrossDeviceRegistrationOptions`**

  ↳ [`WebauthnRegistrationOptions`](WebauthnRegistrationOptions.md)

## Properties

### allowCrossPlatformAuthenticators

• `Optional` **allowCrossPlatformAuthenticators**: `boolean`

Allow registration using cross-platform authenticators, such as a USB security key or a different device. If enabled, cross-device authentication flows can be performed using the native browser experience (via QR code). default: True

___

### registerAsDiscoverable

• `Optional` **registerAsDiscoverable**: `boolean`

Must be set to true to register credentials as passkeys when supported (except for Apple devices, which always register credentials as passkeys). default: True
