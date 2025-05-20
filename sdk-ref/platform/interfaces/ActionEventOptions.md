---
title: ActionEventOptions
---

# Interface: ActionEventOptions

## Properties

### correlationId

• `Optional` **correlationId**: `string`

Any ID that could help relate the action with external context or session

___

### claimedUserId

• `Optional` **claimedUserId**: `string`

User ID of the not yet authenticated user, used to enhance risk and
trust assessments. Should not contain any sensitive data in plain text. Once the user is authenticated,
[`tsPlatform.drs.setAuthenticatedUser()`](../modules/drs.md#setauthenticateduser) should be called.

___

### claimedUserIdType

• `Optional` **claimedUserIdType**: `string` (enum)
One of: ['`email`', '`phone_number`', '`account_id`', '`ssn`', '`national_id`', '`passport_number`', '`drivers_license_number`', '`other`'].
Specifies the type of value provided in the `claimedUserId` field. This is especially important when `claimedUserId` contains a hashed value. The `claimedUserIdType` can be included only when `claimedUserId` is provided.

___

### transactionData

• `Optional` **transactionData**: [`TransactionData`](TransactionData.md)

A transaction data-points object for transaction-monitoring