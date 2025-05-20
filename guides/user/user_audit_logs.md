# View user activity

Mosaic provides a log for user actions, such as when a user is created or logs in to an app. The log includes the time the event occurred and when applicable, the ID of the user who created the event, the ID of the app in which the event was created, and IP address of the user's device.

## View or search for events

From **User Activity**, you can view user events. You can filter the events using the search box at the top of the page. Events can be filtered by date and time, event type, country, and the user who created the event. Use [advanced search queries](/guides/risk/recommendation_queries.md) to refine results and tailor them to your specific needs. <!--You can also click ![](../../images/action_icon.svg) to view the raw event data.-->


## Activity events

Below is the list of user activity events captured by Mosaic.

<div class=table>

| Activity                                      | Event type                    | Description |
|-----------------------------------------------|--------------------------|-------------|
| reset\_password                              | Identity management      | A user reset their password. |
| user\_register\_mobile\_native\_biometrics   | Identity management      | A user registered using mobile native biometrics. |
| update\_user                                 | Identity management      | A user profile was updated. |
| user\_failed\_login                          | Identity management      | A user login attempt failed. |
| webauthn\_registration                       | Identity management      | A user registered WebAuthn credentials. |
| failed\_OTP\_attempt                         | Identity management      | A user failed an OTP verification attempt. |
| update\_password                             | Identity management      | A user updated their password. |
| passwordless\_registration                   | Identity management      | A user registered for passwordless authentication. |
| suspend\_user                                | Identity management      | A user account was suspended. |
| silent\_authentication                       | Identity management      | A silent authentication attempt was made. |
| get\_users                                   | Identity management      | A request was made to retrieve user details. |
| user\_delete\_webauthn\_credential           | Identity management      | A WebAuthn credential was deleted for a user. |
| locked\_account                              | Identity management      | A user account was locked due to multiple failed login attempts. |
| passwordless\_authentication                 | Identity management      | A passwordless authentication attempt was performed. |
| update\_user\_failure                        | Identity management      | A user profile update attempt failed. |
| user\_delete\_mobile\_native\_biometrics     | Identity management      | A mobile native biometric credentials were deleted for a user. |
| authentication\_started                      | Identity management      | An authentication attempt was initiated. |
| authentication\_failed                       | Identity management      | An authentication attempt failed. |
| get\_user                                    | Identity management      | Retrieves details of a specific user. |
| user\_logout                                 | Identity management      | A user logged out. |
| create\_user\_failure                        | Identity management      | A user creation attempt failed. |
| add\_password                                | Identity management      | A password was added to a user account. |
| authentication\_succeeded                    | Identity management      | A user successfully authenticated. |
| sms\_sent                                    | Identity management      | An SMS message was sent. |
| user\_login                                  | Identity management      | A user successfully logged in. |
| create\_user                                 | Identity management      | A new user was created. |
| passwordless\_transaction                    | Identity management      | A passwordless authentication transaction was initiated. |
| ldap\_bind\_entry                            | Journeys                 | A user authentication attempt was made via LDAP. |
| session\_logout                              | Journeys                 | A user session was logged out. |
| custom                                       | Journeys                 | A custom event was logged. |
| set\_variables                               | Journeys                 | Journey variables were updated. |
| session\_end                                 | Journeys                 | A user journey has ended. |
| transmit\_identity\_verification             | Journeys                 | Identity verification was initiated. |
| assertion\_end                               | Journeys                 | A journey client request processing ended. |
| custom\_activity\_log                        | Journeys                 | A custom activity was logged in the system. |
| transmit\_platform\_custom\_authentication   | Journeys                 | A custom authentication step was used in a journey. |
| oidc\_token\_exchange\_request               | Journeys                 | An OpenID Connect token exchange was requested. |
| typescript\_function\_node                   | Journeys                 | A TypeScript function was executed. |
| validate\_response                           | Journeys                 | A response validation process was performed. |
| policy\_decision                             | Journeys                 | A policy-based decision was made. |
| restore\_user\_context                       | Journeys                 | A user’s session context was restored. |
| loop                                         | Journeys                 | A loop execution was triggered. |
| action\_start                                | Journeys                 | A journey step execution started. |
| events\_enrichment                           | Journeys                 | Event data enrichment was performed. |
| ldap\_create\_entry                          | Journeys                 | A new LDAP entry was created. |
| custom\_data                                 | Journeys                 | Custom data was processed. |
| consume\_ticket                              | Journeys                 | A cross-session message was processed by a journey. |
| assertion\_escape                            | Journeys                 | A journey client request selected a branch. |
| assertion\_error                             | Journeys                 | A journey client request encountered an error. |
| external\_connection\_call                   | Journeys                 | An external system connection was initiated. |
| ldap\_fetch\_entry                           | Journeys                 | An LDAP entry was retrieved. |
| condition\_evaluated                         | Journeys                 | A conditional logic evaluation was performed. |
| session\_pending                             | Journeys                 | A user session is pending completion. |
| session\_start                               | Journeys                 | A user journey has started. |
| action\_complete                             | Journeys                 | A journey step execution has started. |
| assertion\_start                             | Journeys                 | A journey client request processing started. |
| http\_auth\_pass                             | Journeys                 | An HTTP authentication request was passed. |
| session\_error                               | Journeys                 | A journey error has occurred. |
| create\_ticket                               | Journeys                 | A new cross-session message was created. |
| custom\_token\_enrichment                    | Journeys                 | A custom token was enriched with additional data. |
| read\_fraud\_image\_data                     | Identity verification     | Fraud image data was accessed. |
| delete\_fraud\_image\_data                   | Identity verification     | Fraud image data was deleted. |
| download\_session\_zip                       | Identity verification     | A session ZIP file was downloaded. |
| session\_started                             | Identity verification     | Indicates starting a verification session. |
| consent\_approved                            | Identity verification     | Indicates saving consent info. |
| verification\_completed                      | Identity verification     | A verification process was completed. |
| face\_auth\_session\_completed               | Identity verification     | A face authentication session was completed. |
| expiration\_session                          | Identity verification     | A session expired. |
| download\_fraud\_csv                         | Identity verification     | A fraud-related CSV file was downloaded. |
| verification\_status\_updated                | Identity verification     | Indicates the status of the internal verification process. |
| image\_uploaded\_info                        | Identity verification     | Indicates an image upload, including metadata information (processing time, etc.). |
| error                                        | Identity verification     | Indicates an error on frontend, such as "something went wrong" page. |
| sdk\_process\_completed                      | Identity verification     | An SDK process was successfully completed. |
| session\_deleted                             | Identity verification     | Indicates a session deletion (via API or by retention). |
| session\_created                             | Identity verification     | Indicates creating a new verification session. |
| restriction\_criteria\_updated               | Identity verification     | A restriction criterion was updated. |

</div>


