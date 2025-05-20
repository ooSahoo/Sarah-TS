# Changelog
## 1.13.5 -  May 18, 2025
**Webauthn**
* Add the possibility to have ':' char in the approval data schema.

## 1.13.4 -  May 13, 2025
**Orchestration**
* fix: Fixed content type header of the key_exchange requests

## 1.13.3 -  May 11, 2025
* fix: prevent race condition during crypto binding keys generation
* 
* **Orchestration**
* fix: Fix encryption headers lost after IDV redirect causing unencrypted API calls (FLOP-2912)

## 1.13.2 - May 4, 2025
**Fraud Prevention**
* fix: improve getSessionToken flow to ensure it is not called while the SDK is not initialized

## 1.13.1 -  Apr. 27, 2025
**Identity Verification**
* fix: Hide loading block when API request completes

## 1.13.0 -  Apr. 20, 2025
**Fraud Prevention**
* Add enhanced and descriptive error codes to the `triggerActionEvent` method to improve granularity and explainability of errors
* Improve SDK resilience during initialization, ensuring proper handling of configuration refresh failures

**Identity Verification**
* fix: improve session recapture logic

## 1.12.2 - Apr. 6, 2025
**Fraud Prevention**
* feat: Add support for reporting claimedUserIdType in triggerActionEvent method

**Webauthn**
* fix: Handle limitSingleCredentialToDevice validation error

## 1.12.1 - Mar. 30, 2025
**Orchestration**
* fix: Improved PKCS7 unpadding validation and error handling during double encryption
* fix: Include `clientId` query param in `/key_exchange` calls to allow cloudflare worker to route to the correct tenant application
* feat: Introduce `StartSsoJourneyOptions`, currently with only `encrypted:? boolean`. The implementation defaults to `false` if unspecified.

## 1.12.0 - Mar. 23, 2025
**Orchestration**
* feat: Support transport `Double Encryption`, for IDO SDK initially

## 1.11.2 -  Mar. 23, 2025
**Identity Verification**
* fix: show custom feedback if error is of type restriction criteria

## 1.11.1 -  Mar. 9, 2025
**Fraud Prevention**
* feat: Add session token refresh in case session token is expired

## 1.11.0 - Mar. 2, 2025
**Fraud Prevention**
* fix: Avoid print an empty error on CDPR check

**Webauthn**
* fix: Support Mosaic URL wildcard (Internal use)

**Orchestration**
* feat: Add support for `Web to Mobile Authentication` and `Web to Mobile Transaction Signing` actions

**Identity Verification**
* feat: Add support for auto-capture capabilities

## 1.10.6 - Feb. 10, 2025
**Fraud Prevention**
* feat: Send sessionToken backend-maintain signal in every event

## 1.10.5 - Feb. 9, 2025
**Fraud Prevention**
* feat: Store Session Token in browser
* feat: Immediate sessionToken retrieval in case of identification event
* feat: Receive and store backend reported userId on any event sent
* feat: On any clearUser call - send clear user event

## 1.10.4 - Feb. 2, 2025
**Identity Verification**
* fix: Stop pulling status after moving from capturing steps.

## 1.10.3 - Jan. 19, 2025
**Orchestration**
* feat: Add support for `Transaction Signing` with passkeys action.

## 1.10.2 - Jan. 12, 2025
**Webauthn**
* feat: Allow anonymous transaction signing, (without username parameter).

* **Identity Verification**
* feat: Add error handling for expired session status

## 1.10.1 - Dec. 22, 2024
**Fraud Prevention**
* feat: Increase session token resilience within the session

**Orchestration**
* refactor: change request logging to debug level

## 1.10.0 - Nov. 17, 2024
**Identity Verification**
* feat: Sign images with crypto-binding

**Fraud Prevention**
* feat: Persist userId if reported with successful authentication through action result interface

## 1.9.12 - Oct. 20, 2024
**Identity Verification**
* feat: Improve texts on capturing pages

## 1.9.11 - Oct. 13, 2024
**Webauthn**
* fix: Authentication timeout configuration issue

## 1.9.10 - Sep. 22, 2024
**Fraud Prevention**
* fix: Improve event consistency in network failures and re-send also in mid-sessions

**Identity Verification**
* fix: fix Portuguese lang initial
* feat: add support to french-canadian

**Orchestration**
* feat: added support for Transaction Signing with TOTP action.
* fix: made the save SDK data operation synchronous to ensure it won't be interrupted.

## 1.9.9 - Sep. 15, 2024
**Fraud Prevention**
* feat: setAuthenticatedUser enhancement
* feat: Event consistency improvement

## 1.9.8 - Sep. 1, 2024
**Orchestration**
* feat: Support saving data in IndexedDB for Ido SDK

**Identity Verification**
* feat: Add new resubmit reason "Restricted document"

## 1.9.7 - Aug. 25, 2024
**Identity Verification**
* fix: Fixing marked import issue

## 1.9.6 – Aug. 07, 2024
* feat: Automatic migration of clientId dependent crypto binding keys to clientId independent, in sdk upgrade

**Fraud Prevention**
* feat: Support identifiers migration under first-party domains

## 1.9.5 – Jul. 21, 2024
* feat: Add version field

**Fraud Prevention**
* fix: Reduce final DRS bundle size by 30%

## 1.9.4 – Jul. 07, 2024
**Orchestration**
* fix: fix escape failure presentation type
* fix: remove default applicationId from the SDK interface
* feat: sdk pass escapes to the application
* feat: introduce invokeSsoJourney()
* feat: add validate email and phone actions

**Fraud Prevention**
* fix: Remove challenge data object from triggerAction response

## 1.9.3 – Jun. 16, 2024
**Identity Verification**
* feat: Support dynamic document acquisition failure by restriction criteria custom message
* feat: Error messages improvements

## 1.9.2 – Jun. 2, 2024
**Identity Verification**
* feat: add support for custom video capture settings

**Orchestration**
* feat: handle optional resource param

## 1.9.1 – May. 26, 2024
**Identity Verification**
* feat: add message for customer support guidance

## 1.9.0 – May. 19, 2024
**Fraud Prevention**
* feat: Support new datapoints related to audio fingerprint and device data
* feat: Support payer.bankIdentifier new field in transactionData optional action property

## 1.8.1 – May. 12, 2024
**Identity Verification**
* feat: add error message to error callback

## 1.8.0 – May. 6, 2024
**Orchestration**
* feat: handle expired OTP passcode
* feat: support invoke external idp action (oidc)
* feat: support the new variant of the login-form action

**Fraud Prevention**
* feat: Enforced encrypted communication

## 1.7.3 – May. 1, 2024
**Fraud Prevention**
* fix: Remove datapoint for efficiency improvement

## 1.7.2 – Apr. 30, 2024
**Fraud Prevention**
* fix: Update collected datapoints when page is loaded

## 1.7.1 – Apr. 21, 2024
**Fraud Prevention**
* feat: Support new datapoints when page is loaded and device data

## 1.7.0 – Apr. 14, 2024
**Webauthn**
* feat: added support for approval signing
* feat: saving clientId in memory with fallback to localStorage
* feat: Add the ability to limit single credential to device
* feat: Support set timeout for webauthn registration and authentication modals

**Fraud Prevention**
* feat: Support sending device data also in every action (per customer need)
* feat: Add new datapoints to SDK: navigatorOnLine, navigatorIsUserActive, navigatorVirtualKeyboard, windowHistoryLength

## 1.6.30 – Apr. 7, 2024
**Fraud Prevention**
* fix: Enhance sessionToken consistency

**Identity Verification**
* feat: support trigger drs session token api

**Orchestration**
* fix: correctly handle server's assertion errors in sdk
* feat: add support for otp retry and resend
* feat: support auto replay in register / validate device actions

## 1.6.29 – Mar. 31, 2024
**Identity Verification**
* feat: support new refinement failure reasons

**Orchestration**
* feat: provide correct client response for OTP authentication actions.


## 1.6.28 – Mar. 24, 2024
**Orchestration**
* feat: added support for TOTP Registration

**Identity Verification**
* feat: use state manager as single source to decide next step in flow

## 1.6.27 – Mar. 17, 2024
**Identity Verification**
* feat: send api error code on error callback

## 1.6.26 – Feb. 25, 2024
**Orchestration**
* feat: allow cross site cookies
**Identity Verification**
* feat: use containing element as reference to calculate width to support landscape in tablets

## 1.6.25 – Feb. 18, 2024
**Identity Verification**
* feat: accept CSS variables defined by implementor to set font and font weight

## 1.6.24 – Feb. 11, 2024
* feat: Global crypto-binding keys are clientId independent for consistency

**Fraud Prevention**
* feat: Use crypto-binding clientId independent

**Webauthn**
* fix: unhandled errors on unsupported browsers

**Orchestration**
* feat: Use crypto-binding clientId independent

## 1.6.23 – Jan. 18, 2024
**Orchestration**
* fix: Serialized state to handle with unicode characters

## 1.6.22 – Jan. 14, 2024
**Identity Verification**
* fix: log `DRS` acquire action token error

## 1.6.21 – Jan. 7, 2024
**Fraud Prevention**
* feat: expose `getSessionToken` public function interface

## 1.6.20 – Dec. 31, 2023
**Orchestration**
* feat: changed `clientResponseOptions` to be an object instead of a map
* feat: added `failure_data` to `IdoServiceResponse`

## 1.6.19 – Dec. 27, 2023
**Webauthn**
* feat: added support for the Australian domain `api.au.transmitsecurity.io`

## 1.6.18 – Dec. 26, 2023
* feat: added support for Edge 18

## 1.6.17 – Dec. 24, 2023
**Fraud Prevention**
* feat: improved performance in user mouse events attributes collection

## 1.6.16 – Dec. 20, 2023
**WebAuthn**
* feat: added `onReady` handler to activate autofill
* fix: caught autofill abort signal error

## 1.6.15 – Dec. 13, 2023
**Orchestration**
* fix: changed WebAuthn registration action internal name

## 1.6.14 – Dec. 10, 2023
**Fraud Prevention**
* fix: `AuditFingerprint` edge case in Safari iOS

## 1.6.13 – Dec. 6, 2023
**Orchestration**
* feat: added New Authentication action
* fix: `WaitForAnotherDevice` action

## 1.6.12 – Dec. 5, 2023
**Identity Verification**
* fix: missing `init` param bug

## 1.6.11 – Dec. 3, 2023
**Identity Verification**
* feat: removed default API endpoint URL

## 1.6.10 - Nov. 29, 2023
**Orchestration**
* feat: added the new `generateDebugPin` action
* feat: simplified the journey response fields, `type` is now deprecated

## 1.6.9 - Nov. 15, 2023
**Fraud Prevention**
* feat: added support for collecting `mouseup` & `mousedown` interaction events, added pressing indication for mouse events

## 1.6.8 - Nov. 13, 2023
**Orchestration**
* fix: `Validate device` action

## 1.6.7 - Nov. 6, 2023
**Orchestration**
* fix: `Register`/ `Validate device` actions

## 1.6.6 - Nov. 5, 2023
**Fraud Prevention**
* fix: sending new `navigator.userAgentData` in every event for retrieving the latest OS & browser versions in Chromium-based browsers
**Orchestration**
* fix: version

## 1.6.5 - Nov. 2, 2023
**Orchestration**
* feat: supported `Register`/ `Validate device` actions
* feat: added journey completion token to `IdoServiceResponse`

## 1.6.4 - Oct. 23, 2023
**Orchestration**
* feat: supported `WebAuthn registration` action

## 1.6.3 - Oct. 17, 2023
**Orchestration**
* feat: supported `DRS trigger` action
* feat: supported `IDV hosted` action

## 1.6.2 - Oct. 16, 2023
**Identity Verification**
* fix: added validation on camera video stream start before submitting an image

## 1.6.1 - Oct. 15, 2023
**Fraud Prevention**
* feat: added tracking crypto-binding identifiers on every action

## 1.6.0 - Oct. 5, 2023
**WebAuthn**
* feat: added support for cross-device flow

## 1.5.15 - Oct. 2, 2023
**Identity Verification**
* feat: allowed BI event API to be used with generated interfaces

## 1.5.14 - Sep. 20, 2023
**Identity Verification**
* fix: selfie placeholder frame missing on iOS 17

## 1.5.13 - Sep. 13, 2023
**Fraud Prevention**
* improvements and fixes

## 1.5.12 - Sep. 13, 2023
**Fraud Prevention**
* feat: added new data points for better detection abilities

**Orchestration**
* feat: supported `crypto binding validation` action

## 1.5.11 - Sep. 5, 2023
**Identity Verification**
* feat: added multiple stream validation for camera

## 1.5.10 - Sep. 1, 2023
**Identity Verification**
* fix: error thrown when initializing the SDK without IDV params

**Orchestration**
* feat: added support for `Wait for CSM` action

## 1.5.9 - Aug. 28, 2023
**Identity Verification**
* fix: issues starting video source

## 1.5.8 - Aug. 22, 2023
**Identity Verification**
* fix: camera feed starts in zoom

## 1.5.7 - Aug. 21, 2023
**Identity Verification**
* fix: SDK hosted app unexpected back behavior

## 1.5.6 - Aug. 15, 2023
**WebAuthn**
* feat: exposed GET default WebAuthn API paths function

## 1.5.0 - Jul. 23, 2023
**WebAuthn**

* BREAKING CHANGE: SDK init on event instead of invocation init

## 1.4.0 - Jul. 12, 2023
**WebAuthn**

* BREAKING CHANGE: introduced WebAuthn backend registration
* BREAKING CHANGE: introduced backend authentication SDK
* feat: added `autofill` handler
* feat: implemented new SDK errors and removed SDK rejection
* feat: moved WebAuthn support indication functions to a new version of SDK
* feat: introduced a new structure for WebAuthn SDK
* fix: activate `autofill` again after aborting
* fix: added `start registration` endpoint
* fix: converted type to interfaces
* fix: interfaces and documentation
* fix: removed async from `autofill` actions
* fix: removed redundant allowed keys from local storage
* fix: removed unused dependencies and upgraded vulnerable packages
* fix: set device user in registration and changed interface
* fix: upgraded dependencies
* fix: wrong RP error handler

## 1.3.0 - Jul. 5, 2023
* feat: added `ido` module

## 1.1.1 - Jun. 19, 2023
* feat: added `idv` module

## 1.0.0 - May 18, 2023
* feat: added `drs` module
* feat: added `webauthn` module
