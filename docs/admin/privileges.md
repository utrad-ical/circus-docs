---
title: User Privilege System
---

Administrators can control each user's access to various resources of CIRCUS via the **privilege system**. This page describes the basic concepts of CIRCUS's user management and the privilege system.

## Users and Groups

Each **user** belongs to one or more **groups**. The privileges of a user are granted indirectly by the groups they belong to. (Technically, there can be a user who belongs to no group, in which case that user can do virtually nothing other than logging-in and seeing their profile.)

:::info Important

No privilege can be _directly_ granted to an individual user. Instead, privileges are assigned to groups, and all user privileges are determined by which groups it belongs to.

:::

When you have finished installing CIRCUS, you have the following two predefined groups:

`admin`
: Has all privileges needed for management tasks.

`users`
: Has only a limited number of privileges.

As an administrator, you can change the privileges of these groups arbitrarily (including the group name), or create a new group that suits your needs.

After the installation, you have one predefined user (`circus`), which belongs to the `admin` group.

:::danger

You must protect this default account after the initial login. For details, see [Installation](./installation.mdx).
:::

## Global Privileges

**Global privileges** are a set of roles that can be assigned to groups via [Group Settings](./group-settings.md).

`manageServer`
: The "administrator" global privilege. A user with this privilege can perform administrative tasks such as adding users.

`personalInfoView`
: A user with this privilege can view a patient's personal information (name, age, etc.).

`downloadVolume`
: A user with this privilege can download DICOM series uploaded to CIRCUS. (Note that, since CIRCUS is a web-based system, a knowledgeable user may still download volumes without this privilege as long as they can view that series.)

`issueOnetime`
: A user with this privilege can issue a onetime URL that allows a user to log in without a password.

:::note
Global privileges not mentioned here are deprecated or do not work. They may be removed in future releases of CIRCUS.
:::

Global privileges are granted _additively_ when a user belongs to multiple groups. For example, if a user belongs to both Group A with `personalInfoView` and Group B without it, this user _will_ have the `personalInfoView` global privilege.

:::tip

There is no way to "revoke" a user's privilege granted via another group. Therefore, when you need fine-grained access control for many different types of users, it may be easier to make users belong to several "composable" groups with a small set of privileges rather than maintaining many groups with a complex set of privileges. For example, consider creating a "volume-downloader" group that just has one global privilege "downloadVolume".

:::

## Resource-specific Privileges

### Series

Each DICOM series imported (uploaded) to CIRCUS will have a string label called **domain**. Domains allow you to control which users have access to which series.

Unlike users, **a series must belong to precisely one domain**. A series cannot be imported without a domain, and a series cannot belong to more than one domain.

The list of available domains must first be declared via [Server Configuration](server-configuration.md). The `default` domain is the only predefined domain.

:::caution
If you are planning to use one CIRCUS installation for multiple research projects, you need to carefully think of the domains to use _before_ importing DICOM series to CIRCUS. Keep the following points in mind:

- Currently, even administrators cannot change the domain of an already imported series.
- You cannot import the same series (with the same series instance UID) again to CIRCUS even if you change the domain.

If you are sure that a certain set of DICOM series is used for only one research project, consider assigning a unique domain to these series (e.g., "abc-study.xyz-univ.edu") for better isolation.

On the other hand, if you are uploading series that may be shared for multiple research projects in your institution, it may be handier to assign a shared domain (e.g., "xyz-univ.edu") or just use the default domain.
:::

To grant access to DICOM series to a user, go to [Group Settings](./group-settings.md) first, change the list of accessible domains of a group, and make the user belong to the group.

A domain does not necessarily have to follow the format of internet domains (e.g., "foo.bar.net"), but this is usually a reasonable convention to avoid any future collision.

### Cases (CIRCUS DB)

CIRCUS DB's cases have an additional layer of access control based on the project it belongs to. For details, see [Group Settings](./group-settings.md).

### Plug-in Jobs (CIRCUS CS)

Currently, a user can access the data for any plug-in job as long as they have access to the processed series in the job (based on the domain rule described above). You cannot control the visibility of a specific plug-in or plug-in job based on a user or a group. In the future, a plug-in-based access control system (similar to the project-based access control of CIRCUS DB) may be added.

## Personal Information Protection {#personal-info}

**Personal Information** refers to the following personal information contained in DICOM tags:

- Patient ID
- Patient name
- Patient sex
- Patient age
- Patient weight/height

In CIRCUS, the visibility of personal information is controlled in three layers:

1. All users wishing to access patient information must have the `showPersonalInfo` global privilege. A user without this privilege will not have access to any patient information whatsoever.
2. Each resource type (series, cases, plugin jobs) has additional rules to restrict access to personal information. The rule depends on the resource type.
3. Finally, even when a user has access to view personal information, he/she can arbitrarily hide personal information temporarily (See Preference). This is useful for demonstration or some blind testing.

When a user cannot access personal information, they cannot perform a search with personal information, either. For example, they cannot search for a patient even when they know the exact patient ID of a series.

:::caution
CIRCUS cannot anonymize personal information if it is embedded as an image in the pixel data itself. You may have to use a third-party tool to anonymize such DICOM data before importing them to CIRCUS.
:::
