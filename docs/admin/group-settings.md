---
title: Managing Groups
---

## Creating and Modifying Groups

Select [Administration] - [Gruops] from the menu at the top of the screen to display the group settings screen.

To create a new group, click the "Create new" button. After entering each item, click "Save".

To make changes to an existing group, click on the line of the group whose settings you wish to change from the top list.

![Groups](./groups.png)

:::caution

As of July 2022, it is impossible to delete a group.

:::

## Configurable Options

Group Name
: The name of the group (can be changed later). For example, "admin", "radiologists of XYZ hosp".

Privileges
: The global privileges associated with this group. All users belonging to this group will gain the privileges set here. See the following list to see the full list of global privileges.

Accessible Domains
: The list of domains which users belonging to this group have access to.

### List of Global Privileges

Manage Server
: The "admin" role. Privilege to make almost any administrative operation from the web UI.

Create Project
: Privilege to create a new project.

Delete Project
: Privilege to delete an existing project.

View Personal Info
: Privilege to display personal information (e.g., patient ID, name, birthdate). If the user does not have this privilege, the personal information will be masked. Even if a user has this privilege, they can temporarily hide personal information from [Personal Preferences](../users/user-preference.md).

Download volume as raw file
: Privilege to download raw DICOM volumes.

### Settings Related to Projects {#project-settings}

These are setting items related to CIRCUS DB projects. Authorization can be granted to multiple projects for each item.

Readable Projects
: Users with this role will have read access to the specified projects.

Writable Projects
: Users with this role will have write access to the specified projects.

Add Series Projects
: Users with this role can modify the set of series that makes up a case.

View Personal Info Projects
: Users with this role can display personal information of the patient.

Moderate Projects
: Grants all access to the specified projects. This takes precedence of other roles.
