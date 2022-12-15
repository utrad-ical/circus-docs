# API for MyLists

<ApiPreamble verb="get" path="/mylists" />

:::info

This API cannot obtain the ID of items in mylists.

Use `Get /api/mylists/:myListId`

:::

### Request

```bash title="Example"
GET /api/mylists HTTP/1.1
```

### Response

Returns an array of objects with the following properties.

`myListId`
: The ID of a mylist. (string)

`resourceType`
: The type of items in a mylist. (string)

`name`
: The name of a mylist. (string)

`public`
: Indicates whether it is a public mylist or not. (boolean)

`editors`
: A list of user or group that can edit a mylist. (array)

`createdAt`
: The date a mylist was created, in UTC format. (date)

```json title="Example"
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

<ApiPreamble verb="get" path="/mylists/:myListId" />

### Request

`myListId (path parameter)`
: ID of the mylist to be searched.

```bash title="Example"
GET /api/mylists/01gktktrqh63mdyfjpzzqey36n HTTP/1.1
```

### Response

`myListId`
: The ID of the desired mylist. (string)

`resourceType`
: The type of items in the mylist. (string)

`name`
: The name of the mylist. (string)

`public`
: Indicates whether it is a public mylist or not. (boolean)

`editors`
: A list of user or group that can edit the mylist. (array)

`createdAt`
: The date the mylist was created, in UTC format. (date)

`resourceIds`
: IDs of items in the mylist. (array)

```json title="Example"
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

<ApiPreamble verb="post" path="/mylists" />

### Request

`name`
: Name of the mylist to be created. (string)

`resourceType`
: Type of resources to list. (string) **Available resource type: "series", "clinicalCases", "pluginJobs"**

`public`
: Indicates whether it is a public mylist or not. (boolean)

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

```json title="Example"
{
  "myListId": "0n01gktm9gb9hgyazarn102r01gk5hm3t2nef706qbq407qtq3pwtmf706x98240"
}
```

<ApiPreamble verb="patch" path="/mylists/:myListId" />

### Request

`myListId (path parameter)`
: ID of the mylist to be operated.

`name`
: New name for the specified mylist. (string)

`public`
: Indicates whether it is a public mylist or not. (boolean)

`editors`
: Set up a user or group that can edit the specified mylist, other than the mylist creator. (array)　**Available editor type: "user" (need userEmail (string)), "group" (need groupId (number))**

:::caution

**_editors_** is replace in total. If you want to add a new editor, please also fill in the previous editors.

:::

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

<ApiPreamble verb="delete" path="/mylists/:myListId" />

:::info

This API cannot delete items in mylist.

:::

### Request

`myListId (path parameter)`
: ID of the mylist to be deleted.

```bash title="Example"
DELETE /api/mylists/01gktktrqh63mdyfjpzzqey36n HTTP/1.1
```

<ApiPreamble verb="patch" path="/mylists/:myListId/items" />

### Request

`myListId (path parameter)`
: ID of the mylist to be operated.

`operation`
: Specifies the operation method for the items. (string) **Operation method: "add", "remove"**

`resourceIds`
: IDs of items to be manipulated. (array) **Available item ID: seriesUid, caseId, jobId**

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
: Number of items added or removed. (number)

```json title="Example"
{
  "changedCount": 1
}
```
