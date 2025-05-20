
# Error messages

## Enumeration Members

### NotInitialized

• **NotInitialized** = ``"not_initialized"``

Either the SDK init was not called, or the call failed

___

### Unknown

• **Unknown** = ``"unknown"``

When the SDK operation fails on an unhandled error
___

## triggerActionEvent() errors

### Server errors

**Format**: `server_error_<actionType>_<timestamp>`

<div class=table>

| Error| Description and example |
|------------|-------------------------|
| **500 - Internal Server Error** | **Description**: Indicates a general server-side failure. This error occurs when the server encounters an unexpected condition preventing it from fulfilling the request. <br> **Example**: `server_error_login_500_Something went wrong_1732723499326` |
| **502 - Bad Gateway** | **Description**: The server received an invalid response from an upstream server while trying to process the request. <br> **Example**: `server_error_login_502_Bad Gateway_1732723499326` |
| **503 - Service Unavailable** | **Description**: The server is currently unable to handle the request due to temporary overload or maintenance. <br> **Example**: `server_error_login_503_Server Unavailable_1732723499326` |
| **400 - Bad Request** | **Description**: The request sent by the client is invalid. Specific causes include: <br>- **Invalid request body**: The server could not process the request due to malformed syntax. <br>   **Example**: `server_error_login_400_Invalid request_1732722021998` <br>- **Decryption error**: The server failed to decrypt the request payload. <br>   **Example**: `server_error_login_400_Decryption failed_1732972138346` <br>-**Decompression error**: The server failed to decompress the request payload. <br>   **Example**: `server_error_login_400_Decompression failed_1732972138346` <br>-**Unsupported action type**: The request specified an action type not supported by the server. <br>   **Example**: `server_error_dummyType_400_Unsupported action type_1732721929594` |
| **401 - Unauthorized** | **Description**: Authentication failed due to missing or invalid credentials. <br> **Client ID not supported**: The provided client ID is not recognized. <br> **Example**: `server_error_login_401_Client ID is not supported - "zsKFyTytYtZL3hcvQQ7"_1732722263186` |
| **409 - Conflict** |**Description**: The request could not be processed due to a conflict with the current state of the resource. <br> **Event already sent**: Indicates a duplicate request for an event already processed. <br> **Example**: `server_error_login_409_Request cannot be processed_1732971102156` |
| **429 - Too Many Requests** |**Description**: The client has sent too many requests in a given amount of time and is being rate-limited. <br> **Rate limit exceeded**: Indicates throttling due to excessive requests. <br> **Example**: `server_error_login_429_ThrottlerException: Too Many Requests_1732721457134` |
</div>

### Client errors

**Format**: `client_error_<actionType>_<timestamp>`

<div class=table>

| Error | Description and example |
|------------|-------------------------|
| **'fetch' does not exist on window** | **Description**: The JavaScript `fetch` API is not supported in the current environment. <br> **Example**: `client_error_login_fetch-api is not supported_1732723943772` |
| **Encryption error (client-side)** | **Description**: The client failed to encrypt the request data. <br> **Example**: `client_error_login_crypto is not supported_1732723943772` |
| **Invalid action type** | **Description**: The client attempted to perform an unsupported or invalid action type. <br> **Example**: `client_error_invalidtype_invalid_action_type_1732723943772` |
</div>


### Communication errors

**Format**: `communication_error_<actionType>_<timestamp>`

<div class=table>

| Error| Description and example |
|------------|-------------------------|
| **Encryption error - missing public key** | **Description**: The encryption process failed because the required public key is missing. <br> **Example**: `communication_error_login_Encryption error - missing public key_1732799565912` |
| **Network/Wi-Fi error (to be verified)** | **Description**: A network error occurred, possibly due to connectivity issues or timeouts. <br> **Example**: `communication_error_login_Failed to fetch_1732799565912` |
</div>


### Unexpected errors

**Format**: `unexpected_error_<actionType>_<timestamp>`

<div class="table">

 Error| Description and example |
|------------|-------------------------|
| **Unexpected error** | **Description**: An error occurred that does not fall into any predefined category. <br> **Example**: `unexpected_error_login_1732799565912` |

</div>