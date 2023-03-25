# API for Users

<ApiPreamble verb="get" path="/users/:userEmail" />

An administrator can use `GET /api/admin/users/:userEmail` to get more information for an individual user.

### Request

`userEmail` (path parameter)
: The email address of the user.

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
: The date the user information was registered, in ISO date format. (date)

`updatedAt`
: The date the user information was updated, in ISO date format. (date)

```bash title="Example"
HTTP/1.1 200
Content-Type: application/json

{
  "userEmail": "user1@example.com",
  "loginId": "user1",
  "description": "User1",
  "createdAt": "2020-01-01T09:00:00.000Z",
  "updatedAt": "2022-01-01T09:00:00.000Z"
}
```

---
