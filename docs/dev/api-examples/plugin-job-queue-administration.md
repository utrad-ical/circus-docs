# API for Plugin Job Queue Administration

<ApiPreamble verb="get" path="/admin/plugin-job-queue" />

Required global privilege: [**Manage Server**](../../../docs/admin/group-settings#list-of-global-privileges)

### Request

```bash title="Example"
GET /api/admin/plugin-job-queue HTTP/1.1
```

### Response

Returns an array of objects with the following properties.

`jobId`
: ID of the plug-in job. (string)

`pluginId`
: ID of the plug-in. This is a Docker image ID. (string)

`userEmail`
: The email address of the user who created the plug-in job. (string)

`status`
: Current status of the plug-in job. One of the [job statuses](../../users/managing-jobs#job-status). (string)

`series`
: Information on the series that is creating the volume that is the target of the plug-in job. (array)

`errorMessage`
: Contains an error message if the status is 'failed'. (null or string)

`startedAt`
: The date the plug-in job was started, in ISO format. (date or null)

`finishedAt`
: The date the plug-in job was finished, in ISO format. (date or null)

`feedbacks`
: Feedback from user. (array)

`results`
: Results of processing the plug-in job. (object or null)

`createdAt`
: The date the plug-in job was created, in ISO format. (date)

`updatedAt`
: The date the plug-in job was updated, in ISO format. (date)

```bash title="Example"
HTTP/1.1 200
Content-Type: application/json

[
  {
    "jobId": "9sc3q3kcx7tcx1a7ppjvwfpj1j",
    "pluginId": "85w1yc7xbzqjr7daf8mu6p2qj7f6a6vegzy4k9nf3vewv7sy32kvjrar49k70h3n",
    "userEmail": "user1@example.com",
    "status": "finished",
    "series": [
      {
        "seriesUid": "111.222.333.444.555",
        "partialVolumeDescriptor": {
          "start": 1,
          "end": 100,
          "delta": 1
        }
      },
      {
        "seriesUid": "111.222.333.444.666",
        "partialVolumeDescriptor": {
          "start": 1,
          "end": 100,
          "delta": 1
        }
      }
    ],
    "errorMessage": null,
    "startedAt": "2023-01-10T00:00:00.000Z",
    "finishedAt": "2023-01-10T00:01:00.000Z",
    "feedbacks": [
      {
        "feedbackId": "5rxtnshpmhyyzry17d5k7jsbd7",
        "userEmail": "user1@example.com",
        "isConsensual": false,
        "data": {
          "lesionCandidates": []
        },
        "actionLog": [],
        "createdAt": "2023-01-10T00:10:00.000Z"
      }
    ],
    "results": {},
    "createdAt": "2023-01-10T00:00:00.000Z",
    "updatedAt": "2023-01-10T00:01:00.000Z"
  }
]
```

---
