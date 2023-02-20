# API for Cases

<ApiPreamble verb="get" path="/cases" />

Required setting: [**Readable Projects**](../../../docs/admin/group-settings#project-settings)

### Request

See [**Query parameters**](../search-query-parameters.md) for more information.

`filter` (query parameter, optional)
: Specify search criteria.

`sort` (query parameter, optional)
: Sort order of search results.

`limit` (query parameter, optional)
: Number of search results per page.

`page` (query parameter, optional)
: Page number starting from 1.

`skip` (query parameter, optional)
: Skip a specified number of search results.

```bash title="Example"
GET /api/cases HTTP/1.1
```

### Response

Returns an array of objects with the following properties.

`caseId`
: ID of the case. (string)

`projectId`
: ID of the project to which the case belongs. (string)

`latestRevision`
: Last saved revision. (object)

`tags`
: Markers to accompany the case. (array)

`domains`
: Used to check access privileges of series belonging to the case. (array)

`createdAt`
: The date the case was created, in ISO format. (date)

`updatedAt`
: The date the case was updated, in ISO format. (date)

```bash title="Example"
HTTP/1.1 200
Content-Type: application/json

[
  {
    "caseId": "yjio7f9eiqc5jf3rzk782v91fx",
    "projectId": "f0vv160g9b87k741qymsrq76qf",
    "latestRevision": {
      "creator": "creator@example.com",
      "date": "2022-01-01T12:00:00.000Z",
      "description": "Created",
      "attributes": {},
      "status": "draft",
      "series": [
        {
          "seriesUid": "111.222.333.444.555",
          "partialVolumeDescriptor": { "start": 1, "end": 100, "delta": 1 },
          "labels": []
        }
      ]
    },
    "tags": ["XXX", "YYY"],
    "domains": [],
    "createdAt": "2022-01-02T00:00:00.000Z",
    "updatedAt": "2022-01-02T12:00:00.000Z"
  },
  {
    "caseId": "wx0f99g4786k7acn6zd6m7a144",
    "projectId": "f0vv160g9b87k741qymsrq76qf",
    "latestRevision": {
      "creator": "creator@example.com",
      "date": "2022-01-01T12:00:00.000Z",
      "description": "Created",
      "attributes": {},
      "status": "draft",
      "series": [
        {
          "seriesUid": "111.222.333.444.555",
          "partialVolumeDescriptor": { "start": 1, "end": 100, "delta": 1 },
          "labels": []
        }
      ]
    },
    "tags": ["AAA", "BBB", "CCC"],
    "domains": [],
    "createdAt": "2022-01-02T00:00:00.000Z",
    "updatedAt": "2022-01-02T12:00:00.000Z"
  }
]
```

---

<ApiPreamble verb="get" path="/cases/:caseId" />

Required setting: [**Readable Projects**](../../../docs/admin/group-settings#project-settings)

### Request

`caseId` (path parameter)
: ID of the case to be searched.

```bash title="Example"
GET /api/cases/yjio7f9eiqc5jf3rzk782v91fx HTTP/1.1
```

### Response

`caseId`
: ID of the case. (string)

`projectId`
: ID of the project to which the case belongs. (string)

`revisions`
: Sequential data that is updated each time a case is saved. (array)

`tags`
: Markers to accompany the case. (array)

`domains`
: Used to check access privileges of series belonging to the case. (array)

`createdAt`
: The date the case was created, in ISO format. (date)

`updatedAt`
: The date the case was updated, in ISO format. (date)

```bash title="Example"
HTTP/1.1 200
Content-Type: application/json

{
  "caseId": "yjio7f9eiqc5jf3rzk782v91fx",
  "projectId": "f0vv160g9b87k741qymsrq76qf",
  "revisions": [
    {
      "creator": "creator@example.com",
      "date": "2022-01-01T12:00:00.000Z",
      "description": "Created",
      "attributes": {},
      "status": "draft",
      "series": [
        {
          "seriesUid": "111.222.333.444.555",
          "partialVolumeDescriptor": { "start": 1, "end": 100, "delta": 1 },
          "labels": []
        }
      ]
    }
  ],
  "tags": ["XXX", "YYY"],
  "domains": [],
  "createdAt": "2022-01-02T00:00:00.000Z",
  "updatedAt": "2022-01-02T12:00:00.000Z"
}
```

---

<ApiPreamble verb="get" path="/cases/list/:myListId" />

### Request

`myListId` (path parameter)
: ID of the mylist to be searched.

See [Query parameters](../search-query-parameters.md) for more information.

`filter` (query parameter, optional)
: Specify search criteria.

`sort` (query parameter, optional)
: Sort order of search results.

`limit` (query parameter, optional)
: Number of search results per page.

`page` (query parameter, optional)
: Page number starting from 1.

`skip` (query parameter, optional)
: Skip a specified number of search results.

```bash title="Example"
GET /api/cases/list/01gktktrqh63mdyfjpzzqey36n HTTP/1.1
```

### Response

Returns an array of objects with the following properties.

`caseId`
: ID of the case. (string)

`projectId`
: ID of the project to which the case belongs. (string)

`latestRevision`
: Last saved revision. (object)

`tags`
: Markers to accompany the case. (array)

`domains`
: Used to check access privileges of series belonging to the case. (array)

`createdAt`
: The date the case was created, in ISO format. (date)

`updatedAt`
: The date the case was updated, in ISO format. (date)

```bash title="Example"
HTTP/1.1 200
Content-Type: application/json

[
  {
    "caseId": "yjio7f9eiqc5jf3rzk782v91fx",
    "projectId": "f0vv160g9b87k741qymsrq76qf",
    "latestRevision": {
      "creator": "creator@example.com",
      "date": "2022-01-01T12:00:00.000Z",
      "description": "Created",
      "attributes": {},
      "status": "draft",
      "series": [
        {
          "seriesUid": "111.222.333.444.555",
          "partialVolumeDescriptor": { "start": 1, "end": 100, "delta": 1 },
          "labels": []
        }
      ]
    },
    "tags": ["XXX", "YYY"],
    "domains": [],
    "createdAt": "2022-01-02T00:00:00.000Z",
    "updatedAt": "2022-01-02T12:00:00.000Z"
  },
  {
    "caseId": "wx0f99g4786k7acn6zd6m7a144",
    "projectId": "f0vv160g9b87k741qymsrq76qf",
    "latestRevision": {
      "creator": "creator@example.com",
      "date": "2022-01-01T12:00:00.000Z",
      "description": "Created",
      "attributes": {},
      "status": "draft",
      "series": [
        {
          "seriesUid": "111.222.333.444.555",
          "partialVolumeDescriptor": { "start": 1, "end": 100, "delta": 1 },
          "labels": []
        }
      ]
    },
    "tags": ["AAA", "BBB", "CCC"],
    "domains": [],
    "createdAt": "2022-01-02T00:00:00.000Z",
    "updatedAt": "2022-01-02T12:00:00.000Z"
  }
]
```

---

<ApiPreamble verb="post" path="/cases" />

### Request

`projectId`
: ID of the project where the case will be created. (string)

`series`
: Series to be included in the case to be created. (array)

`tags`
: Markers to accompany to be created case. (array)

```bash title="Example"
POST /api/cases HTTP/1.1
Content-Type: application/json

{
  "projectId": "f0vv160g9b87k741qymsrq76qf",
  "series": [
          {
            "seriesUid": '111.222.333.444.555',
            "partialVolumeDescriptor": {
              "start": 1,
              "end": 100,
              "delta": 1
            }
          }
        ],
  "tags": ["tag1"]
}
```

### Response

`caseId`
: ID of the created case. (string)

```bash title="Example"
HTTP/1.1 201
Content-Type: application/json

{
  "caseId": "g7ttvqzfz73zyqaz5fe0gvq81t"
}
```

---

<ApiPreamble verb="post" path="/cases/:caseId/revision" />

Required setting: [**Writable Projects**](../../../docs/admin/group-settings#project-settings)

### Request

`description`
: An arbitrary string that can be appended to the revision. (string)

`attributes`
: Actual data of [case attributes](../../admin/project-settings#configurable-options). (object)

`status`
: Status of the revision. (string)

`series`
: A list of series belonging to the case and their associated labels information. (array)

```bash title="Example"
POST /api/cases/yjio7f9eiqc5jf3rzk782v91fx/revision HTTP/1.1
Content-Type: application/json

{
  "description": "Add something",
  "attributes": {},
  "status": "for-review",
  "series": [
    {
      "seriesUid": "111.222.333.444.555",
      "partialVolumeDescriptor": {
        "start": 1,
        "end": 636,
        "delta": 1
      },
      "labels": [
        {
          "name": "Voxels",
          "type": "voxel",
          "data": {
            "voxels": "7c9718fd6a128ade0906dc1da03754bf287bdbb8",
            "origin": [
              134,
              189,
              318
            ],
            "size": [
              177,
              133,
              1
            ],
            "alpha": 1,
            "color": "#ff0000"
          },
          "attributes": {}
        }
      ]
    }
  ]
}
```

### Response

```bash title="Example"
HTTP/1.1 201
```

---

<ApiPreamble verb="post" path="/cases/export-mhd" />

Required global privilege: [**Download volume as raw file**](../../../docs/admin/group-settings#list-of-global-privileges)
Required setting: [**Readable Projects**](../../../docs/admin/group-settings#project-settings)

### Request

`caseIds`
: The list of case IDs to export the MHD file. Available formats are array of caseIds: `string[]` or array of objects: `{"caseId": string, "revisionIndex": number}[]`. (array)

`labelPackType` (optional)
: Export data format, either `"combined"` or `"isolated"`. The default is `"isolated"` that generates one raw file per label. (string)

`mhdLineEnding` (optional)
: Specifies the line ending to export the MHD file, either `"crlf"` or `"lf"`. The default is `"lf"`. (string)

`compressionFormat` (optional)
: Specifies the compression format to export the MHD file, either `"zip"` or `"tgz"`. The default is `"tgz"`.(string)

```bash title="Example"
POST /api/cases/export-mhd HTTP/1.1
Content-Type: application/json

{
  "caseIds": [
    { "caseId": "g7ttvqzfz73zyqaz5fe0gvq81t", "revisionIndex": 0 },
    { "caseId": "g7ttvqzfz73zyqaz5fe0gvq81t", "revisionIndex": 1 },
    { "caseId": "g7ttvqzfz73zyqaz5fe0gvq81t", "revisionIndex": 2 }
  ],
  "labelPackType": "combined",
  "mhdLineEnding": "crlf",
  "compressionFormat": "zip"
}
```

## Response

```bash title="Example"
HTTP/1.1 201
Content-Type: application/json

{
  "taskId": "dmr09gt0mqnq09cchhyk5w4v56"
}
```

---

<ApiPreamble verb="put" path="/cases/:caseId/tags" />

Required setting: [**Writable Projects**](../../../docs/admin/group-settings#project-settings)

:::caution

This API replaces all tags. If you want to add a new tag, please also fill in the previous tags.

:::

### Request

```bash title="Example"
PUT /api/cases/yjio7f9eiqc5jf3rzk782v91fx/tags HTTP/1.1
Content-Type: application/json

["XXX", "YYY", "ZZZ"]
```

### Response

```bash title="Example"
HTTP/1.1 204
```

---

<ApiPreamble verb="patch" path="/cases/tags" />

Required setting: [**Writable Projects**](../../../docs/admin/group-settings#project-settings)

### Request

`operation`
: Specifies the operation method for the tags, one of `"add"`, `"remove"` and `"set"`. (string)

`tags`
: The tags to operate. (string[])

`caseIds`
: Case IDs of the operation target. (string[])

```bash title="Example"
PATCH /api/cases/tags HTTP/1.1

{
  "operation": "add",
  "caseIds": ["yjio7f9eiqc5jf3rzk782v91fx"],
  "tags": ["ZZZ"]
}
```

### Response

```bash title="Example"
HTTP/1.1 204
```

---

<ApiPreamble verb="delete" path="/cases/:caseId" />

Required setting: [**Moderate Projects**](../../../docs/admin/group-settings#project-settings)

:::caution

This API deletes even the case created by other user.

:::

:::info

If the specified case exists in the mylist of users (including yourself), this API throws an error.

Use **_force delete_** `DELETE /api/cases/:caseId?force=1`

:::

### Request

`caseId` (path parameter)
: ID of the case to be deleted.

`force` (query parameter, optional)
: By adding `?force=1` after the path parameter, even specified case in someone else's mylist (including your own) can be deleted. And the specified case in all users mylists are also deleted.

```bash title="Example"
DELETE /api/cases/yjio7f9eiqc5jf3rzk782v91fx HTTP/1.1
```

### Response

```bash title="Example"
HTTP/1.1 204
```

---
