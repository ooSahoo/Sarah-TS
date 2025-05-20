---
title: Manage devices
toc:
  maxDepth: 2
---

# Manage devices

Mosaic provides a solution for managing devices as part of identity management. In this article, you will learn how to implement basic device management tasks, such as identifying a returning device or deleting a device that is no longer in use.

:::info Note
This guide explains how to manage users' devices using [identity journeys](/guides/journeys_intro/). For a quickstart, check out the **Device management examples** journey template in **Admin Portal** >  **B2C** or **B2B Identity** _based on your setup_ > **Journeys**.

If looking for API way, refer to [Device keys APIs](/openapi/user/device-key/).

:::

You can view devices associated with the user in the Admin Portal (**Admin Portal** > **B2C Identity** > **Users** > user > **Devices**).

![Devices in Admin Portal](../../images/UserID/admin-portal-user-devices.png)

## Register device

Establish a strong association between a device and a user using crypto-binding. After authenticating a user or onboarding a new user, include the [Register Device](/guides/orchestration/journeys/register_device.md) step in the journey. During device registration, the SDK generates a cryptographic key pair on the device without requiring user interaction—though you can request the user's consent if needed. The device's public key is then exported and sent to Mosaic, while the private key remains securely on the device. As a result of device registration, Mosaic creates a unique device identity that can be tracked and managed using a device key (`key_id`).

:::warning Important
Registering a device should generally occur after user authentication to avoid associating devices with unconfirmed identities. The only exception is during the user onboarding, where the user and device are registered together.

If you're interested in identifying devices before authentication, Mosaic Fraud Prevention collects other device identifiers, including device ID provided by manufacturer and device fingerprint. See [Secure device identity with Fraud Prevention](/guides/risk/secure_device_identity.md).
:::

### Use case example: registering a new device

In the example journey below, the [Register device](/guides/orchestration/journeys/register_device.md) is added after password authentication. After crypto-binding a device, Mosaic returns `key_id` while the private key securely remains on device. Optionally, you can save the external user ID on the SDK side with the [Save Data in SDK](/guides/orchestration/journeys/store_data_on_sdk.md) step to allow recognizing the device even before the user authenticates.

<figure style="margin: 0;">
  <a href="../../images/IDO/use-cases/device-management-register.png" target="_blank">
    <img src="../../images/IDO/use-cases/device-management-register.png" alt="Register a device" style="max-width: 100%;">
  </a>
  <figcaption style="color: grey; font-style: italic; font-size: 14px;">Click to open the image in a dedicated tab.</figcaption>
</figure>


## Identify returning device

Identifying known devices early in a journey enhances security and allows you to build tailored user experiences. To check if this is a returning device, add the [Is known device](/guides/orchestration/journeys/validate_device/) step to your journey. This step checks if the device is registered to a specific user in the app.

The validation process involves Mosaic issuing a challenge to the client to sign using the private key stored on the user's device. This process is handled implicitly by the client SDK and no user interaction is required. The client side sends back the signed challenge and a `key_id` which is used to locate the public key. If the signature is correctly validated with the public key, the step is successful, and the `key_id `is returned. For new or blocked devices, this returns an error.

:::info Note
The device can be recognized as known even if you haven't registered it using the [Register device](/guides/orchestration/journeys/register_device.md) journey step. Other Mosaic services, such as Fraud Prevention, can also perform device binging as a part of integration.
:::

This step could be used as part of two-factor authentication, leveraging something the user has (their device) in addition to something the user knows (such as a password). It can also be used to elevate trust for known devices, and reduce user friction accordingly.

:::info Note

To identify a known device, the journey needs the user identifier. You can obtain it in several ways:

- After authenticating the user with [Login form](/guides/orchestration/journeys/login_form.md) and subsequent steps. In this case, the [user auth state](/guides/orchestration/concepts/users) is "authenticated" and the journey obtains the `user_id` from the user context.

- By collecting the external user identifier with [Get information from client](/guides/orchestration/journeys/get_info_from_client.md) step.

- By storing the external user identifier on the client SDK side using the [Save Data in SDK](/guides/orchestration/journeys/store_data_on_sdk.md) step in a previous journey and returning it using `@policy.sdkSavedData()`.
:::

### Use case example: login from registered devices only

For example, your app allows logging in via registred devices only. Add the [Is known device](/guides/orchestration/journeys/validate_device/) step as the first step in the authentication journey.

Since the user isn't known yet, the user authentication state should be set to "The user is not authenticated". The flow assumes that you've saved the user's external ID (as `userExternalId`) on the SDK side upon device registration, and now you can retrieve it using `@policy.sdkSavedData().userExternalId`.

If the device is recognized, the journey allows the user to log in. But if a user tries to log in from an unknown device, the journey rejects access.


<figure style="margin: 0;">
  <a href="../../images/IDO/use-cases/device-management-known-device.png" target="_blank">
    <img src="../../images/IDO/use-cases/device-management-known-device.png" alt="Is known device?" style="max-width: 100%;">
  </a>
  <figcaption style="color: grey; font-style: italic; font-size: 14px;">Click to open the image in a dedicated tab.</figcaption>
</figure>

## Enrich device info

Mosaic allows enriching device identity with additional data. This can be helpful if you're looking for a way to provide customized user experience depending on what user device is currently in use&mdash;you can configure journeys to read arbitrary information from the device record and proceed accordingly. These operations are performed with the "Device keys: Update device key API" and "Device keys: Get device key API" steps.

### Use case example: adding data about device

For example, a user wants to distinguish between their devices. To provide a user-friendly name for the current user device, add the following steps to the journey:

:::info Note
The journey assumes the user has already authenticated in the previous steps.
:::

1. Start by validating if the device is registered to the **authenticated** user by adding [Is known device](/guides/orchestration/journeys/validate_device.md). If the device is recognized, the step returns `key_id`.
2. Add the [Get information from client](/guides/orchestration/journeys/get_info_from_client.md) step to collect input from the user. For example, add the `device_name` string field to the schema. Once the user submits the name, it will be stored as `device_name` in the output variable `clientData`.
3. Add the "Device keys: Update device key API" step to update the device record. Provide the following arguments for the query: `key_id` for `key_id`, `@policy.userContext().user_id` for `user_id` (retrieves the user ID from the user context), and `clientData.device_name` for `display_name`.

<figure style="margin: 0;">
  <a href="../../images/IDO/use-cases/device-management-update-device.png" target="_blank">
    <img src="../../images/IDO/use-cases/device-management-update-device.png" alt="Update device" style="max-width: 100%;">
  </a>
  <figcaption style="color: grey; font-style: italic; font-size: 14px;">Click to open the image in a dedicated tab.</figcaption>
</figure>

### Use case example: reading device data

For example, a user wants to distinguish between their devices. To display a device name for the current user device, add the following steps to the journey:

:::info Note
The journey assumes the user has already authenticated in the previous steps.
:::

1. Start by validating if the device is registered to the **authenticated** user by adding [Is known device](/guides/orchestration/journeys/validate_device.md). If the device is recognized, the step returns `key_id`.
2. Add the "Device keys: Get device key API" step to read device information. This step requires both a `user_id` and a `key_id` as input. Provide the following arguments for the query: `key_id` for `key_id`, `@policy.userContext().user_id` for `user_id` (retrieves user ID from the user context).
3. Add the [Condition](/guides/orchestration/journeys/condition.md) step to act depending on the device name returned by the previous step. For example, to check if the device name is "My work cellphone", use `result.display_name == "My work cellphone"` expression. Display "It's a work phone" if true.


<figure style="margin: 0;">
  <a href="../../images/IDO/use-cases/device-management-read-device-data.png" target="_blank">
    <img src="../../images/IDO/use-cases/device-management-read-device-data.png" alt="Read device data" style="max-width: 100%;">
  </a>
  <figcaption style="color: grey; font-style: italic; font-size: 14px;">Click to open the image in a dedicated tab.</figcaption>
</figure>

## Count user devices

Keeping an inventory of devices linked to a user is helpful if you want to enforce policies, such as limiting the number of devices per user or implementing a single device policy. The "Device keys: Get all device keys API" step returns a list of device keys with information about each device.

### Use case example: verifying the number of devices linked to a user

For example, your company is about to enforce a single device policy. Before limiting access from multiple devices, you might want to let the users check how many devices they have and display their names. Add the following steps to your jouney to count user devices and act accordingly depending on result.

:::info Note
The journey assumes the user has already authenticated in the previous steps.
:::

1. Add the "Device keys: Get all device keys API" step to retrieve a list of all devices for a user. The step requires `user_id` as an input. Since the user has already authenticated, the journey holds information about the user in the user context. You can retrieve user ID with `@policy.userContext().user_id`. This step returns an array of devices filtered by user.

2. Add the [Condition](/guides/orchestration/journeys/condition.md) step to evaluate the output. In this example, the `@std.len(result) == 1` condition is used to check if the user has one or more devices linked to them based on the result returned by the previous journey step. Depending on the output, you can customize a message for the user.


<figure style="margin: 0;">
  <a href="../../images/IDO/use-cases/device-management-count.png" target="_blank">
    <img src="../../images/IDO/use-cases/device-management-count.png" alt="Count devices" style="max-width: 100%;">
  </a>
  <figcaption style="color: grey; font-style: italic; font-size: 14px;">Click to open the image in a dedicated tab.</figcaption>
</figure>


## Forget device

Deleting a device is the final step in its identity lifecycle. Deleting irrelevant devices enhances security and provides visibility into identity management. For example, you might want to delete a device key for a device that is no longer in the user's possession, or if you enforce a single device policy that doesn't allow users to access your app from several devices.

The "Device keys: Delete device key API" step deletes a public stored by Mosaic and removes a device from the user record. The next time the user tries to log in from this device, it will appear as new.


### Use case example: single device policy

The example journey ensures the user can only have one device by registering a new device and removing the other device.

:::info Note
The journey below assumes the user has already authenticated and the user ID is saved in a variable `userId`.
:::

1. Start by validating if the device is registered to the **authenticated** user by adding [Is known device](/guides/orchestration/journeys/validate_device.md). If the device is recognized, the step returns a `key_id`. For this journey, it's saved in the output variable `current_key_id`. If the device is recognized, the journey completes.

2. In case of a new device, retrieve other user's device keys. Add the "Device keys: Get all device keys API" step to retrieve a list of all devices for a user. The step requires the `user_id` as an input. Since the user has already authenticated, the journey holds information about the user in the user context, you can retrieve user ID with `@policy.userContext().user_id`. This step returns an array of devices filtered by user.

3. Add the [Generic Condition](/guides/orchestration/journeys/condition.md) step to evaluate the output. In this example, the `@std.len(result) > 0` condition is used to check if the user has another device linked to their account.

4. Remove a previously registered device by adding the "Device keys: Delete device key API" step. This step requires `user_ID` and `key_id` as an input. Since the user has already authenticated, you can retrieve the user ID with `@policy.useContext().user_id`. In `key_id` field provide the following expression that gets key IDs from returned by the "Device keys: Get all device keys API" step: `let keyIds = @std.map(result, (device) => device.key_id) return  keyIds`.

6. If there are no devices associated with the user, register the current device with [Register device](/guides/orchestration/journeys/register_device.md) step.

<!--devices except current device

```js
let keyIds = @std.map(result, (device) => device.key_id) return @std.filter(keyIds, (key) => key != current_key_id)
```
-->

<figure style="margin: 0;">
  <a href="../../images/IDO/use-cases/device-management-delete.png" target="_blank">
    <img src="../../images/IDO/use-cases/device-management-delete.png" alt="Delete devices" style="max-width: 100%;">
  </a>
  <figcaption style="color: grey; font-style: italic; font-size: 14px;">Click to open the image in a dedicated tab.</figcaption>
</figure>

## Block device

Blocking devices is crucial for establishing strong security and privilege management. You might want to permanently restrict a malicious device from accessing your app resources. Another example would be temporary blocking employee's work devices while not in use.

You can block devices in the Admin Portal or by adding the "Device keys: Block device key API" step to your journey.

Unlike "forgetting a device" (deleting a device key) that completely removes it from the user record, blocking a device keeps its `key_id` associated with the user. A blocked device is visible in the Admin Portal and can be discovered using the "Device keys: Get all device keys" journey step. Nonetheless, blocked devices fail validation performed by "Is known device" journey step as they aren't considered legit to use. Blocked devices can also be unblocked if necessary.


## Next steps

Create adaptive device management flows based on risk assessment data provided by Mosaic Fraud Prevention. See [Secure device identity](/guides/risk/secure_device_identity.md) for more information. Elevate trust and reduce friction for known and trustworthy devices, enforce step-up authentication in case of device activity, and block malicious devices based on risk analytics.




