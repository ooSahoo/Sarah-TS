---
title: "Android quick start"
toc:
  maxDepth: 2
---

# Mobile biometrics quick start: Android

Strengthen security of your native Android applications by adding strong authentication with mobile biometrics. This describes how to use the Mosaic Authentication SDK to set up biometrics authentication on the user's device. The guide includes both the client-side integration, as well as the backend API integration required to complete the flow.

## How it works

Android devices have biometric sensors that enable a device to recognize its owner. The Mosaic Authentication SDK utilizes these sensors and allows you to add biometric authentication such as fingerprint authentication to your Android app. Below are sample flows for registering biometric authenticator and authenticating the user.

**Registration**

The logged-in user requests to register biometrics on their device. After initializing the SDK ([Step 2](#step-2-initialize-the-sdk)), the app instructs the SDK to register a biometric authenticator ([Step 3.1](#1-register-authenticator)). Upon successful registration, the SDK returns the public key and public key ID. The app backend completes the registration flow by submitting these parameters to Mosaic ([Step 3.2](#2-complete-registration)).

![](../../images/UserID/biometrics_registration.png)

### Authentication

The user requests to log in using mobile biometrics. After initializing the SDK ([Step 2](#step-2-initialize-the-sdk)), the app instructs the SDK to authenticate using biometrics ([Step 4.1](#1-start-authentication)). Upon successful authentication, the SDK returns the public key ID and the signed challenge which are then used to complete the authentication process and obtain tokens ([Step 4.2](#2-complete-authentication)).

![](../../images/UserID/biometrics_auth.png)

## Requirements

The requirements for biometric authentication include:
- Device with registered biometrics (e.g., Face or Fingerprint)
- `compileSdk` 34 and onwards
- `minSdk` 23

The SDK is built with certain settings and incorporates additional libraries which may require conformance on the hosting application build environment (e.g., Retrofit libraries are usually required to have a conforming or even the same revision for all artifacts integrated into the same application). Below is a specification of these settings:
- androidx.core:core-ktx:1.8.0
- androidx.appcompat:appcompat:1.5.1
- com.squareup.retrofit2:converter-gson:2.9.0
- com.squareup.retrofit2:retrofit:2.9.0
- androidx.annotation:annotation:1.5.0
- androidx.credentials:credentials:1.2.0
- androidx.credentials:credentials-play-services-auth:1.2.0
- androidx.biometric:biometric:1.1.0


## Before you start

<div class="badge-wrapper">
    <div class="badge">Admin Portal</div>
</div>

If this is your first time integrating with Mosaic, create an application in the Admin Portal as described [here](/guides/user/create_new_application/), then implement a login for the app using another [authentication](/guides/user/auth_overview/) method since mobile biometrics can only be registered for logged-in users.


## Step 1: Add SDK to your project

<div class="badge-wrapper">
    <div class="badge">client</div>
    <div class="badge">registration</div>
    <div class="badge">authentication</div>
</div>

Add the following lines in the shared build.gradle file (**allprojects** scope):

```groovy
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        maven {
            url('https://transmit.jfrog.io/artifactory/transmit-security-gradle-release-local/')
        }
        mavenCentral()
        google()
    }
}
```

Add the following in the module build.gradle file (project scope):

```groovy
dependencies {
    implementation 'com.ts.sdk:authentication:1.0.+'
}

// Required to compile against Android API level 34 or later
android {
    compileSdk 34
}
```

## Step 2: Initialize the SDK

<div class="badge-wrapper">
    <div class="badge">client</div>
    <div class="badge">registration</div>
    <div class="badge">authentication</div>
</div>

<details open>
<summary><b>Initialize using strings.xml configuration (recommended)</b></summary>

To configure the SDK, update the strings.xml file in your Application with the following content. The `CLIENT_ID` should be replaced with your client ID.

:::info Note
The SDK can be configured to work with another cluster by setting `transmit_security_base_url` to `https://api.eu.transmitsecurity.io/`(for EU) or `https://api.ca.transmitsecurity.io/` (for Canada).

:::

```xml
<resources>
    <!-- Mosaic Credentials -->
    <string name="transmit_security_client_id">"CLIENT_ID"</string>
    <string name="transmit_security_base_url">https://api.transmitsecurity.io/</string>
</resources>
```

Add the code below to your Application class.

```kotlin
// Initializes SDK

class YourApplication: Application() {
   override fun onCreate() {
       super.onCreate()
       TSAuthentication.initialize(this)
   }
}
```
</details>

<details>
<summary><b>Initialize using SDK parameters</b></summary>

Configure the SDK using the snippet below, where `CLIENT_ID` is your client ID and `BASE_SERVER_URL` is your base server URL. If not provided, the SDK will use the default URL, which is "https://api.transmitsecurity.io/".

:::info Note
The SDK can be configured to work with another cluster by setting the third parameter to `https://api.eu.transmitsecurity.io/`(for EU) or `https://api.ca.transmitsecurity.io/` (for Canada).

:::


```kotlin
// Initializes SDK

class YourApplication: Application() {
   override fun onCreate() {
       super.onCreate()
       TSAuthentication.initialize(this,
       CLIENT_ID,
       BASE_SERVER_URL)
   }
}
```
</details>

## Step 3: Register biometric authenticator

Before users can log in with biometrics, the app needs to register the authenticator that leverages the user's biometrics data. The registration flow occurs only after the end-user has logged in to your mobile app using another auth method.

:::info Note
To proceed with registration, ensure that the user is logged in to your app and your app maintains a reference to the user ID. If needed, retrieve the user ID using another user identifier via [Users APIs](/openapi/user/user/).
:::

To implement a registration flow, you'll need to:

1. [Register authenticator with SDK](#1-register-authenticator)
2. [Complete registration via API](#2-complete-registration)

### 1. Register authenticator

<div class="badge-wrapper">
    <div class="badge">client</div>
    <div class="badge">registration</div>
</div>

When the end-user requests to enable login with biometrics, call the `registerNativeBiometrics()` SDK call as shown below and provide a user ID. The SDK returns the key type, public key and key ID which you will need to complete registration in [Step 3.2](#2-complete-registration).

```kotlin
// Registers biometrics authenticator
// ‘userId’ (required): user ID in Mosaic

TSAuthentication.registerNativeBiometrics(context, userId, object: TSAuthCallback<TSBiometricsRegistrationResult, TSBiometricsRegistrationError> {
   override fun success(registrationResult: TSBiometricsRegistrationResult) {
       val keyId = registrationResult.keyId()
       val publicKey = registrationResult.publicKey()
       val keyType = registrationResult.keyType()
       completeRegistration(keyId, publicKey, keyType)
   }

   override fun error(error: TSBiometricsRegistrationError) {
       //handle error
   }
})
```

### 2. Complete registration

<div class="badge-wrapper">
    <div class="badge">backend</div>
    <div class="badge">registration</div>
</div>

Once credentials for biometrics authentication have been registered on the device (via the SDK), they will need to be registered in Mosaic to the relevant user. This is done by passing the public key and key ID returned by the SDK (in [Step 3.1](#1-register-authenticator)) to the app backend.

Complete the registration process by calling the registration API from the backend. The token used to authorize the call is the **user access token** returned upon user login. If successful, the credentials will be registered for the user that corresponds to the authorization token.

```js
const resp = await fetch(
  `https://api.transmitsecurity.io/cis/v1/auth/mobile-biometrics/register`, // Use api.eu.transmitsecurity.io for EU, api.ca.transmitsecurity.io for CA
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer [TOKEN]' // User access token returned upon the Mosaic login
    },
    body: JSON.stringify({
      publicKeyId: '[PUBLIC_KEY_ID]', // Returned by registerNativeBiometrics() SDK call
      publicKey: '[PUBLIC_KEY]', // Returned by registerNativeBiometrics() SDK call
      encryptionType: '[KEY_TYPE]', // Returned by registerNativeBiometrics() SDK call
      os: "Android"
    })
  }
);

const data = await resp.json();
console.log(data);
```


## Step 4: Authenticate user

A user can leverage mobile biometrics to authenticate in your Android app once the [registration process](#step-3-register-biometric-authenticator) is complete. To implement an authentication flow, you'll need to:

- [Start authentication with SDK](#1-start-authentication)
- [Complete authentication via API](#2-complete-authentication)

### 1. Start authentication

<div class="badge-wrapper">
    <div class="badge">client</div>
    <div class="badge">authentication</div>
</div>

To log in the user, call the `authenticateNativeBiometrics()` SDK method and provide the user ID and challenge parameters. This will prompt the user for biometrics. If successful, it returns a public key ID and a signed challenge in the result object. These parameters are required to complete the authentication via your backend.

For example:

```kotlin
// Authenticates a user
// 'userId' (required): user ID in Transmit
// 'challenge' (required): a unique string generated for this call

TSAuthentication.authenticateNativeBiometrics(appCompatActivity, userId, challenge,
   object : TSAuthCallback<TSBiometricsAuthResult, TSBiometricsAuthError> {
       override fun success(result: TSBiometricsAuthResult) {
          val keyId = result.keyId()
          val signedChallenge = result.signature()
          completeAuthentication(keyId, signedChallenge)
       }

       override fun error(error: TSBiometricsAuthError) {
           //handle error
       }
   })
```

### 2. Complete authentication

<div class="badge-wrapper">
    <div class="badge">backend</div>
    <div class="badge">authentication</div>
</div>

Once the user has authenticated on the device, call the authentication endpoint via your backend. The call is authorized with a **client access token** using the Client ID and Secret of your app.

If successful, the tokens will be returned. These tokens must be validated as described [here](/guides/user/validate_tokens/).


```js
const resp = await fetch(
  `https://api.transmitsecurity.io/cis/v1/auth/mobile-biometrics/authenticate`, // Use api.eu.transmitsecurity.io for EU, api.ca.transmitsecurity.io for CA
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer [CLIENT_ACCESS_TOKEN]' // Token generated using Client ID and Secret of the app
    },
    body: JSON.stringify({
      key_id: '[KEY_ID]', // Returned by authenticateNativeBiometrics() SDK call
      user_id: '[USER_ID]', // ID of the user that was specified in authenticateNativeBiometrics() SDK call
      signature: '[SIGNATURE]', // Returned by authenticateNativeBiometrics() SDK call
      challenge:'[CHALLENGE]' // Specified in authenticateNativeBiometrics() SDK call
    })
  }
);

const data = await resp.json();
console.log(data);
```
