---
title: Query Parameters
---

## Available parameters

`filter`
: Specify search criteria.

`sort`
: Sort order of search results.

`limit`
: Number of search results per page.

`page`
: Page number starting from 1.

`skip`
: Skip a specified number of search results.

### Example

```bash title="Example Request"
GET /api/cases HTTP/1.1
```

{
"filter": 
  {"$or":
    [
      {"patientInfo.age":3},
      {"caseId":"wee"},
      {"patientInfo.patientId":"avc"},
      {"patientInfo.patientName":"avx"},
      {"patientInfo.sex":"M"},
      {"createdAt":{"$date":"2023-02-01"}},
      {"updatedAt":{"$date":"2023-02-01"}}
    ]
  },
"sort": {"projectId":-1},
"page": 1,
"limit": 20
}

## Available filter operators

`'$and'`
:.

`'$or'`
:.

`'$gt'`
:.

`'$gte'`
:.

`'$lt'`
:.

`'$lte'`
:.

`'$ne'`
:.

`'$in'`
:.

`'$all'`
:.

## Available filter

### cases

### series

### plugin-jobs