# API for MyLists

<ApiPreamble verb="get" path="/mylists" />

:::info

The list of the resource IDs in each mylist can be learge, and thus is not included in the response. Use `Get /api/mylists/:myListId` instead.

:::

### Request

```bash title="Example"
GET /api/mylists HTTP/1.1
```

### Response

Returns an array of objects with the following properties.

`myListId`
: The ID of the mylist. (string)

`resourceType`
: The type of items in this mylist. (string)

`name`
: The name of the mylist. (string)

`public`
: Indicates whether this is a public mylist or not. (boolean)

`editors`
: A list of user or group that can edit this mylist. (array)

`createdAt`
: The date a mylist was created, in ISO format. (date)

```bash title="Example"
HTTP/1.1 200
Content-Type: application/json

[
  {
    "myListId": "01gktktrqh63mdyfjpzzqey36n",
    "resourceType": "clinicalCases",
    "name": "MyList1",
    "public": false,
    "editors": [],
    "createdAt": "2014-07-13T15:53:02.000Z"
  },
  {
    "myListId": "01ewetywx9q6s2n5s03y3219ka",
    "resourceType": "clinicalCases",
    "name": "MyList2",
    "public": true,
    "editors": [],
    "createdAt": "2014-07-13T15:53:02.000Z"
  },
  {
    "myListId": "01ex36wt9c94s93j0rmk98nsj0",
    "resourceType": "series",
    "name": "My Series List",
    "public": false,
    "editors": [],
    "createdAt": "2014-07-13T15:56:16.000Z"
  }
]
```

---

<ApiPreamble verb="get" path="/mylists/:myListId" />

### Request

`myListId` (path parameter)
: ID of the mylist to be searched.

```bash title="Example"
GET /api/mylists/01gktktrqh63mdyfjpzzqey36n HTTP/1.1
```

### Response

`myListId`
: The ID of the mylist. (string)

`resourceType`
: The type of items in the mylist. (string)

`name`
: The name of the mylist. (string)

`public`
: Indicates whether this is a public mylist or not. (boolean)

`editors`
: A list of user or group that can edit this mylist. (array)

`createdAt`
: The date the mylist was created, in ISO date format. (date)

`resourceIds`
: IDs of the items in the mylist. (array)

```bash title="Example"
HTTP/1.1 200
Content-Type: application/json

{
  "myListId": "01gktktrqh63mdyfjpzzqey36n",
  "resourceType": "clinicalCases",
  "name": "MyList1",
  "public": false,
  "editors": [],
  "createdAt": "2014-07-13T15:53:02.000Z",
  "resourceIds": [
    "cbftbf634k9301gktmd919cppyc2hjqf0sqz0d01gktmd919fmg5zhbraghpg626",
    "vaae9fh490fe01gktmeh0336847cwmpnyrygt501gktmeh03xq0tj96ch2fsda8z",
    "q9etq3pwrg0n01gktmf706qzabq407b9hgya5r01gktmf706x98n102024hm3t2n"
  ]
}
```

---

<ApiPreamble verb="post" path="/mylists" />

### Request

`name`
: Name of the mylist to be created. (string)

`resourceType`
: The resource type for this list, one of `series`, `clinicalCases` and `pluginJobs`. (string)

`public`
: Indicates whether this is a public mylist or not. (boolean)

```bash title="Example"
POST /api/mylists HTTP/1.1
Content-Type: application/json

{
  "name": "newList",
  "resourceType": "clinicalCases",
  "public": false
}
```

### Response

`myListId`
: ID of the created mylist. (string)

```bash title="Example"
HTTP/1.1 201
Content-Type: application/json

{
  "myListId": "0n01gktm9gb9hgyazarn102r01gk5hm3t2nef706qbq407qtq3pwtmf706x98240"
}
```

---

<ApiPreamble verb="patch" path="/mylists/:myListId" />

### Request

`myListId` (path parameter)
: ID of the mylist to operate.

`name` (optional)
: New name for the specified mylist. (string)

`public` (optional)
: Indicates whether this is a public mylist or not. (boolean)

`editors` (optional)
: The list of users or groups that can edit this mylist in addition to the mylist creator. A user must be specified in the `{ type: 'user', userEmail: string }` format, and the group must be in the `{ type: 'group', groupId: number }` format. Note that the passed array will always replace the existing array; you cannot add or remove individual entries. (array)

```bash title="Example"
PATCH /api/mylists/01gktktrqh63mdyfjpzzqey36n HTTP/1.1
Content-Type: application/json

{
  "editors": [
    { "type": "user", "userEmail": "newEditor@example.com" },
    { "type": "group", "groupId": 1 }
  ]
}
```

### Response

```bash title="Example"
HTTP/1.1 204
```

---

<ApiPreamble verb="delete" path="/mylists/:myListId" />

This API deletes the mylist itself, not the items in it.

### Request

`myListId` (path parameter)
: ID of the mylist to be deleted.

```bash title="Example"
DELETE /api/mylists/01gktktrqh63mdyfjpzzqey36n HTTP/1.1
```

### Response

```bash title="Example"
HTTP/1.1 204
```

---

<ApiPreamble verb="patch" path="/mylists/:myListId/items" />

### Request

`myListId` (path parameter)
: ID of the mylist to operate.

`operation`
: Specifies the operation method for the items, either `'add'` or `'remove'` (string).

`resourceIds`
: IDs of the items (series, cases or plug-in jobs) to add or remove. (string[])

```bash title="Example"
PATCH /api/mylists/01gktktrqh63mdyfjpzzqey36n/items HTTP/1.1
Content-Type: application/json

{
  "operation": "add",
  "resourceIds": [
    "nyou3w8bks0290r5t00y34uysa389qwbmng3z8an3gyn8an48yt6qb8nsf1yt2y8"
  ]
}
```

### Response

`changedCount`
: Number of the items that were added or removed. (number)

```bash title="Example"
HTTP/1.1 200
Content-Type: application/json

{
  "changedCount": 1
}
```

---
