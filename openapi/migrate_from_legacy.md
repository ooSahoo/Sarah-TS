---
excludeFromSearch: true
---

# Migration Guide

We have unified Mosaic's APIs under a single domain: `api.transmitsecurity.io`. This won’t affect existing integrations, but new features will only be exposed at the new domain.

We recommend reviewing the API calls if you implemented them before the first quarter of 2023.

## Domain changes

We have configured three domains for API calls:

Service Location | Coverage | Value
---|---|---
US | Global except EU and CA| `https://api.transmitsecurity.io`
EU | EU only | `https://api.eu.transmitsecurity.io`
CA | CA only | `https://api.ca.transmitsecurity.io` (Currently for A+ services only)

Update the URLs in your calls to Mosaic's APIs with the following values:

Legacy | New US (global except EU and CA)  | New EU  | New CA
---|---|---|---
`api.userid.security` | `api.transmitsecurity.io/cis` | `api.eu.transmitsecurity.io/cis` | `api.ca.transmitsecurity.io/cis`
`webauthn.identity.security` | `api.transmitsecurity.io/cis` | `api.eu.transmitsecurity.io/cis` | `api.ca.transmitsecurity.io/cis`
`api.riskid.security` | `api.transmitsecurity.io/risk` | `api.eu.transmitsecurity.io/risk` | Currently unavailable
`verifyid.security` | `api.transmitsecurity.io/verify` | `api.eu.transmitsecurity.io/verify` | Currently unavailable
`dv.identity.security` | `api.transmitsecurity.io/xdv` | Currently unavailable | Currently unavailable

The only exception is the service authorization endpoint that is now [available at a single URL and requires a `resource` value](#service-authorization-updates).


## Service authorization updates

When fetching access tokens for API authorization, the API calls now must target the relevant resource. To do that, include the `resource` parameter in the body of the [service authorization request](/openapi/token/). This appears in the audience (`aud`) claim of the generated client access token.

Example of a `resource` value:

```
curl --location --request POST 'https://api.transmitsecurity.io/oidc/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode 'client_id=CLIENT_ID' \
--data-urlencode 'client_secret=CLIENT_SECRET' \
--data-urlencode 'resource=https://risk.identity.security'
```

Use the `resource` values for the following target services:

Production URLs | Resource URIs
---|---
`https://api.transmitsecurity.io/verify` | `https://verify.identity.security`
`https://api.transmitsecurity.io/risk` | `https://risk.identity.security`
`https://api.transmitsecurity.io/xdv` | `https://dv.identity.security`

Note that the `resource` value is not yet available for the `/cis/*` services.

## Network device configuration

Before deploying the updated application to production, configure your networking devices (firewall...) to allow the host `*.transmitsecurity.io/*`.

Visit [Plan deployment](/guides/risk/plan_deployment.md) for more information on requirements for Fraud Prevention.

## Content Security Policy update

If you have set up a Content Security Policy (CSP) in your application: for the integration to work, add the new domains to the `connect-src` directive.

For additional information, see [Configure the Content Security Policy](/guides/quick_start/enable_communication.md).