# API for Group Administration

<ApiPreamble verb="get" path="/admin/groups" />

Required global privilege: [**Manage Server**](../../../docs/admin/group-settings#list-of-global-privileges)

### Request

```bash title="Example"
GET /api/admin/groups HTTP/1.1
```

### Response

Returns an array of objects with the following properties.

`groupId`
: ID of the group. (number)

`groupName`
: The name of the group. (string)

`privileges`
: List of [global privileges](../../admin/group-settings#list-of-global-privileges) granted to users belonging to the group. (array)

`domains`
: List of domains that users in the group can access. (array)

`readProjects`
: List of project IDs that are readable by users in the group. (array)

`writeProjects`
: List of project IDs that are writable by users in the group. (array)

`addSeriesProjects`
: List of project IDs for which users in this group can add series. (array)

`viewPersonalInfoProjects`
: List of project IDs for which users in the group can view patient data. (array)

`moderateProjects`
: List of project IDs for which users in the group can operate as administrator. (array)

`createdAt`
: The date the group information was registered, in ISO date format. (date)

`updatedAt`
: The date the group information was updated, in ISO date format. (date)

```bash title="Example"
HTTP/1.1 200
Content-type: application/json

[
  {
    "groupId": 1,
    "groupName": "example",
    "privileges": [ "manageServer", "personalInfoView", "issueOnetime", "downloadVolume" ],
    "domains": [ "domain1.org" ],
    "readProjects": ["afwz4atm2k8vkaev70kzw4a6xy"],
    "writeProjects": ["afwz4atm2k8vkaev70kzw4a6xy"],
    "addSeriesProjects": ["afwz4atm2k8vkaev70kzw4a6xy"],
    "viewPersonalInfoProjects": ["afwz4atm2k8vkaev70kzw4a6xy"],
    "moderateProjects": ["afwz4atm2k8vkaev70kzw4a6xy"],
    "createdAt": '2023-01-10T00:00:00.000Z',
    "updatedAt": '2023-02-20T00:00:00.000Z'
  },
  {
    "groupId": 2,
    "groupName": "test",
    "privileges": [ "personalInfoView", "downloadVolume" ],
    "domains": [ "domain2.org" ],
    "readProjects": ["6n8eq87xfnp5n9g94tmay7h1ec", "48zq6yhc9p1fswq8jyny0cemm8"],
    "writeProjects": ["6n8eq87xfnp5n9g94tmay7h1ec", "48zq6yhc9p1fswq8jyny0cemm8"],
    "addSeriesProjects": ["6n8eq87xfnp5n9g94tmay7h1ec"],
    "viewPersonalInfoProjects": ["6n8eq87xfnp5n9g94tmay7h1ec"],
    "moderateProjects": ["6n8eq87xfnp5n9g94tmay7h1ec"],
    "createdAt": '2023-03-30T00:00:00.000Z',
    "updatedAt": '2023-03-30T00:00:00.000Z'
  }
]
```

---

<ApiPreamble verb="get" path="/admin/groups/:groupId" />

Required global privilege: [**Manage Server**](../../../docs/admin/group-settings#list-of-global-privileges)

### Request

`groupId` (path parameter)
: ID of the group to be searched.

```bash title="Example"
GET /api/admin/groups/1 HTTP/1.1
```

### Response

`groupId`
: ID of the group. (number)

`groupName`
: The name of the group. (string)

`privileges`
: List of [global privileges](../../admin/group-settings#list-of-global-privileges) granted to users belonging to the group. (array)

`domains`
: List of domains that users in the group can access. (array)

`readProjects`
: List of project IDs that are readable by users in the group. (array)

`writeProjects`
: List of project IDs that are writable by users in the group. (array)

`addSeriesProjects`
: List of project IDs for which users in this group can add series. (array)

`viewPersonalInfoProjects`
: List of project IDs for which users in the group can view patient data. (array)

`moderateProjects`
: List of project IDs for which users in the group can operate as administrator. (array)

`createdAt`
: The date the group information was registered, in ISO date format. (date)

`updatedAt`
: The date the group information was updated, in ISO date format. (date)

```bash title="Example"
HTTP/1.1 200
Content-type: application/json

{
  "groupId": 1,
  "groupName": "example",
  "privileges": [ "manageServer", "personalInfoView", "issueOnetime", "downloadVolume" ],
  "domains": [ "domain1.org" ],
  "readProjects": ["afwz4atm2k8vkaev70kzw4a6xy"],
  "writeProjects": ["afwz4atm2k8vkaev70kzw4a6xy"],
  "addSeriesProjects": ["afwz4atm2k8vkaev70kzw4a6xy"],
  "viewPersonalInfoProjects": ["afwz4atm2k8vkaev70kzw4a6xy"],
  "moderateProjects": ["afwz4atm2k8vkaev70kzw4a6xy"],
  "createdAt": '2023-01-10T00:00:00.000Z',
  "updatedAt": '2023-02-20T00:00:00.000Z'
}
```

---

<ApiPreamble verb="patch" path="/admin/groups/:groupId" />

Required global privilege: [**Manage Server**](../../../docs/admin/group-settings#list-of-global-privileges)

### Request

`groupId` (path parameter)
: ID of the group to be updated.

The following parameters are optional. In array type parameters, note that the passed array will always replace the existing array; you cannot add or remove individual entries.

`groupName`
: The name of the group. (string)

`privileges`
: List of [global privileges](../../admin/group-settings#list-of-global-privileges) granted to users belonging to the group. (array)

`domains`
: List of domains that users in the group can access. (array)

`readProjects`
: List of project IDs that are readable by users in the group. (array)

`writeProjects`
: List of project IDs that are writable by users in the group. (array)

`addSeriesProjects`
: List of project IDs for which users in this group can add series. Authority `addSeriesProject` is currently not functional. You can add series without it. The authorization will be removed. (array)

`viewPersonalInfoProjects`
: List of project IDs for which users in the group can view patient data. (array)

`moderateProjects`
: List of project IDs for which users in the group can operate as administrator. (array)

`createdAt`
: The date the group information was registered, in ISO date format. (date)

`updatedAt`
: The date the group information was updated, in ISO date format. (date)

```bash title="Example"
PATCH /api/admin/groups/1 HTTP/1.1

{
  "groupName": "updated",
  "domains": [ "domain1.org", "domain2.org" ],
  "readProjects": [ "afwz4atm2k8vkaev70kzw4a6xy", "6n8eq87xfnp5n9g94tmay7h1ec" ]
}
```

### Response

```bash title="Example"
HTTP/1.1 204
```

---

<ApiPreamble verb="post" path="/admin/groups" />

Required global privilege: [**Manage Server**](../../../docs/admin/group-settings#list-of-global-privileges)

### Request

`groupName`
: The name of the group. (string)

`privileges`
: List of [global privileges](../../admin/group-settings#list-of-global-privileges) granted to users belonging to the group. (array)

`domains`
: List of domains that users in the group can access. (array)

`readProjects`
: List of project IDs that are readable by users in the group. (array)

`writeProjects`
: List of project IDs that are writable by users in the group. (array)

`addSeriesProjects`
: List of project IDs for which users in this group can add series. Authority `addSeriesProject` is currently not functional. You can add series without it. The authorization will be removed. (array)

`viewPersonalInfoProjects`
: List of project IDs for which users in the group can view patient data. (array)

`moderateProjects`
: List of project IDs for which users in the group can operate as administrator. (array)

```bash title="Example"
POST /api/admin/groups HTTP/1.1

{
  "groupName": "newGroup",
  "privileges": [ "personalInfoView", "issueOnetime", "downloadVolume" ],
  "domains": [ "domain1.org", "domain2.org" ],
  "readProjects": [ "afwz4atm2k8vkaev70kzw4a6xy", "6n8eq87xfnp5n9g94tmay7h1ec" ],
  "writeProjects": [ "afwz4atm2k8vkaev70kzw4a6xy", "6n8eq87xfnp5n9g94tmay7h1ec" ],
  "addSeriesProjects": [],
  "viewPersonalInfoProjects": [ "afwz4atm2k8vkaev70kzw4a6xy", "6n8eq87xfnp5n9g94tmay7h1ec" ],
  "moderateProjects": []
}
```

### Response

```bash title="Example"
HTTP/1.1 201
```

---

<ApiPreamble verb="get" path="/admin/global-privileges" />

Required global privilege: [**Manage Server**](../../../docs/admin/group-settings#list-of-global-privileges)

### Request

```bash title="Example"
GET /api/admin/global-privileges HTTP/1.1
```

### Response

```bash title="Example"
HTTP/1.1 200

[
  { "privilege": "createProject", "caption": "Create Project" },
  { "privilege": "deleteProject", "caption": "Delete Project" },
  { "privilege": "manageServer", "caption": "Manage Server" },
  { "privilege": "personalInfoView", "caption": "View Personal Info" },
  { "privilege": "downloadVolume", "caption": "Download Volume as Raw File" },
  { "privilege": "issueOnetime", "caption": "Issue Onetime URL" }
]
```

---
