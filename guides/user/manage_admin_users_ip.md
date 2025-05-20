---
title: Restrict access by IP
toc:
  maxDepth: 2
---
# Restrict user access to Mosaic by IP address

In Mosaic, you can allow or restrict administrators' access to the Admin Portal based on their IP address. IP allowlisting enhances security and ensures only users connecting from approved IPs will be able to log in and browse the Admin Portal.

## How IP allowlisting works

IP allowlisting works as an additional safeguard on top of authentication. Having authenticated the user in the Admin Portal using SSO or email magic link, Mosaic verifies that the user's IP address is allowlisted and then provides access to the corresponding tenant. For already logged-in users, Mosaic still checks the IP address every time they switch between tenants.

If the IP address isn't within the approved range for the tenant, access to the Admin Portal will be denied with the "Access is restricted. Please contact your administrator" error.


## Step 1: Plan your strategy

Before enforcing access controls, you'll need to decide on a strategy that makes sense for your business.

1. Check industry best practices and compliance standards for IP-based access management.
2. Analyze your business needs and collect requirements.
3. Define your company-approved IP ranges or set up a VPN connection.
4. Decide on recovery options, i.e., define a designed person to be the main administrator who can bypass IP restrictions.

:::warning Important
Make sure to regularly review your admin users in the Admin Portal (**Admins and Entitlements** > **Admin Users**).
:::

## Step 2: Add recovery admins

When enabling IP allowlisting for the first time (**Admin Portal** > **Settings** > **IP allowlist**), Mosaic prompts you to specify at least one recovery admin&mdash;a user that can log in to the Admin Portal regardless of their IP address. This ensures your company can regain access to Mosaic in case of network issues or unexpected changes.

:::info Note

Mosaic won't prompt you to add a recovery admin if you have already enabled single sign-on to the Admin Portal. It means you already have recovery admins configured&mdash;Mosaic enforces configuring recovery admins when setting up [SSO login](/guides/user/sso_admin_login_oidc.md).

:::

Later, to adjust the recovery admin list:

1. Start by tapping ![](../../images/action_icon.svg) next to **Add IP addresses** and then **Edit recovery admins**.
2. Add more recovery admins to the list or remove them from the list.



## Step 3: Add IPs to the allowlist

Define the IP addresses you consider safe and reliable. In the **Admin Portal** > **Settings** > **IP allowlist**, select **Add IP addresses** and provide a specific IP address, an IP range, or a network address in CIDR notation (e.g., 192.168.1.0/24).

:::info Note
IP allowlisting comes into effect with new logins. Once you enable IP allowlisting, the next time a user attempts to log in to the Admin Portal, Mosaic with verify their IP address.
:::

To edit or delete an allowlisting entry:

* Edit an entry by tapping ![](../../images/action_icon.svg) and then **Edit**.
* Delete an entry by tapping ![](../../images/action_icon.svg) and then **Delete**.


## Step 3: View activity

Get a better understanding of who attempts to log in to the Admin Portal and from what IP addresses by exploring **Admin Activity**.

<!--Is this true?
For each IP validation, logs include:

- Tenant name
- Admin's email
- IP address
- Validation result (success or failure) and the reason for failure.
-->






