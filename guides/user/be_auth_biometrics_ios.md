---
title: "iOS quick start"
toc:
  maxDepth: 2
---

# Mobile biometrics quick start: iOS

Strengthen security of your native iOS applications by adding strong authentication with mobile biometrics. This describes how to use the Mosaic Authentication SDK to set up biometrics authentication on the user's device. The guide includes both the client-side integration, as well as the backend API integration required to complete the flow.

## How it works

iOS devices have biometric sensors that enable a device to recognize its owner. The Mosaic Authentication SDK utilizes these sensors and allows you to add biometric authentication such as FaceID authentication to your iOS app. Below are sample flows for registering biometric authenticator and authenticating the user.

**Registration**

The logged-in user requests to register biometrics on their device. After initializing the SDK ([Step 2](#step-2-initialize-the-sdk)), the app instructs the SDK to register a biometric authenticator ([Step 3.1](#1-register-authenticator)). Upon successful registration, the SDK returns the public key and public key ID. The app backend completes the registration flow by submitting these parameters to Mosaic ([Step 3.2](#2-complete-registration)).

![](../../images/UserID/biometrics_registration.png)

### Authentication

The user requests to log in using mobile biometrics. After initializing the SDK ([Step 2](#step-2-initialize-the-sdk)), the app instructs the SDK to authenticate using biometrics ([Step 4.1](#1-start-authentication)). Upon successful authentication, the SDK returns the public key ID and the signed challenge which are then used to complete the authentication process and obtain tokens ([Step 4.2](#2-complete-authentication)).

![](../../images/UserID/biometrics_auth.png)

## Requirements

The requirements for biometric authentication include:

* iOS 13.0+
* Xcode 11.0+
* Device with registered biometrics (e.g., FaceID or TouchID)

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


### CocoaPods

[CocoaPods](https://cocoapods.org) is a dependency manager for Cocoa projects. For usage and installation instructions, visit their website. To integrate TSAuthenticationSDK into your Xcode project using CocoaPods, specify it in your `Podfile`:

```ruby
pod 'TSAuthentication', '~> 1.0.4'
```

### Swift Package Manager

The [Swift Package Manager](https://swift.org/package-manager/) is a tool for automating the distribution of Swift code and is integrated into the `swift` compiler. It is in early development, but TSAuthenticationSDK does support its use on supported platforms.

Once you have your Swift package set up, adding TSAuthenticationSDK as a dependency is as easy as adding it to the `dependencies` value of your `Package.swift`.

```swift
dependencies: [
    .package(url: "https://github.com/TransmitSecurity/authentication-ios-sdk", .upToNextMajor(from: "1.0.4"))
]
```

## Step 2: Initialize the SDK

<div class="badge-wrapper">
    <div class="badge">client</div>
    <div class="badge">registration</div>
    <div class="badge">authentication</div>
</div>


<details open>
<summary><b>Initialize using PLIST configuration (recommended)</b></summary>

To do this, create a plist file named `TransmitSecurity.plist` in your Application with the following content. Where `CLIENT_ID` is the client ID of your application.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>credentials</key>
    <dict>
        <!-- Use api.eu.transmitsecurity.io for EU, api.ca.transmitsecurity.io for CA -->
        <key>baseUrl</key>
        <string>https://api.transmitsecurity.io/</string>
        <key>clientId</key>
        <string>CLIENT_ID</string>
    </dict>
</dict>
</plist>
```

Add the code below to your Application Class

:::info Note

Make sure to add the ```import TSAuthenticationSDK``` at the top of the implementation class.

:::

```swift UIKit
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        TSAuthentication.shared.initializeSDK()
        return true
    }
}
```
```swift SwiftUI
struct ExampleApp: App {

    init() {
        TSAuthentication.shared.initializeSDK()
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```
</details>

<details>
<summary><b>Initialize using SDK parameters</b></summary>

Add the code below to your Application Class. Where `CLIENT_ID` is the client ID of your application.

:::info Note

Make sure to add the ```import TSAuthenticationSDK``` at the top of the implementation class.

:::

```swift UIKit
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        let config = TSConfiguration(domain: YOUR_DOMAIN)
        TSAuthentication.shared.initialize(baseUrl: "https://api.transmitsecurity.io/", clientId: "CLIENT_ID") // Use api.eu.transmitsecurity.io for EU, api.ca.transmitsecurity.io for CA
        return true
    }
}
```

```swift SwiftUI
struct ExampleApp: App {

    init() {
        let config = TSConfiguration(domain: YOUR_DOMAIN)
        TSAuthentication.shared.initialize(baseUrl: "https://api.transmitsecurity.io/", clientId: "CLIENT_ID") // Use api.eu.transmitsecurity.io for EU, api.ca.transmitsecurity.io for CA
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
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

```Swift
// Registers biometrics authenticator
// 'username' (required): user ID in Transmit
TSAuthentication.shared.registerNativeBiometrics(username: "[USER_ID]") { response in
    DispatchQueue.main.async {
        switch response {
        case .success(let result):
            // Extract returned values
            let publicKey = result.publicKey
            let publicKeyId = result.publicKeyId
            let keyType = result.keyType
        case .failure(let error):
            // Handle registration failure
            break
        }
    }
}
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
      os: "iOS"
    })
  }
);

const data = await resp.json();
console.log(data);
```


## Step 4: Authenticate user

A user can leverage mobile biometrics to authenticate in your iOS app once the [registration process](#step-3-register-biometric-authenticator) is complete. To implement an authentication flow, you'll need to:

- [Start authentication with SDK](#1-start-authentication)
- [Complete authentication via API](#2-complete-authentication)

### 1. Start authentication

<div class="badge-wrapper">
    <div class="badge">client</div>
    <div class="badge">authentication</div>
</div>

To log in the user, call the `authenticateNativeBiometrics()` SDK method and provide the user ID and challenge parameters. This will prompt the user for biometrics. If successful, it returns a public key ID and a signed challenge in the result object. These parameters are required to complete the authentication via your backend.

For example:

```swift
// Authenticates a user
// 'username' (required): user ID in Transmit
// 'challenge' (required): a unique string generated for this call

TSAuthentication.shared.authenticateNativeBiometrics(username: "[USER_ID]", challenge: "[CHALLENGE]") { result in
    switch result {
    case .success(let response):
        let publicKeyId = response.publicKeyId
        let signature = response.signature
    case .failure(let error):
        if case .nativeBiometricsError(let nativeBiometricsError) = error {
            // Handle native biometrics error
        }
    }
}
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
