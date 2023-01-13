# API for Users

<ApiPreamble verb="get" path="/users/:userEmail" />

:::info

If you want to get more user information, use `Get /api/admin/users/:userEmail`.

:::

### Request

`userEmail (path parameter)`
: The email address of the user to be searched.

```bash title="Example"
GET /api/users/user1@example.com HTTP/1.1
```

### Response

If there is a user with the specified email address, information about the user is returned.

`userEmail`
: The email address of the user. (string)

`loginId`
: The user name of the user. (string)

`description`
: An optinal text to identify the user. (string)

`createdAt`
: The date the user information was registered, in UTC format. (date)

`updatedAt`
: The date the user information was updated, in UTC format. (date)

```json title="Example"
{
  "userEmail": "user1@example.com",
  "loginId": "user1",
  "description": "User1",
  "createdAt": "2020-01-01T09:00:00.000Z",
  "updatedAt": "2022-01-01T09:00:00.000Z"
}
```

---
