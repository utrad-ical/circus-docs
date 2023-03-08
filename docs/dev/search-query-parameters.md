---
title: Making Search Queries
---

GET requests for searching resources (series, cases, jobs, etc.) accept shared query parameters. This page explains how to form search requests for CIRCUS API.

## Query Parameters

These are specified as URL query parameters (e.g., `?limit=10&page=2`). Special characters must be URL-encoded.

`filter` (string)
: Specifies the search criterion in JSON string. See [Forming Filters](#forming-filters) and [Available Filters](#available-filter).

`sort` (string)
: Sort order of search results, in JSON string. A value of 1 means ascending and -1 means descending. The default is `{ createdAt: -1 }`.

`limit` (number)
: Number of search results per page.

`skip` (number)
: Skips a specified number of search results.

`page` (number)
: Page number starting from 1.

### Example

```bash title="Example Request"
GET /api/cases?filter=<filter>&sort=<sort>&page=1&limit=20 HTTP/1.1
```

Assign URL-encoded JSON to `<filter>` and `<sort>` respectively.

```json title="Example 'filter' before URL-encoding"
{
  "$and": [
    { "patientInfo.age": { "$gt": 50 } },
    { "patientInfo.age": { "$lte": 70 } },
    { "patientInfo.sex": "M" },
    { "createdAt": { "$gt": { "$date": "2023-01-10" } } },
    { "createdAt": { "$lte": { "$date": "2023-02-20" } } }
  ]
}
```

```json title="Example 'sort' before URL-encoding
{
  "projectId": -1
}
```

## Forming Filters

The format of filters accepted by CIRCUS API is basically a small subset of [MongoDB filters](https://www.mongodb.com/docs/manual/reference/operator/query/).

### Comparison Operators

`$gt`
: Matches values greater than the specified value.

`$gte`
: Matches values that are greater than or equal to the specified value.

`$lt`
: Matches values that are less than the specified value.

`$lte`
: Matches values that are less than or equal to the specified value.

`$ne`
: Matches all values that are not equal to the specified value.

`$in`
: Matches any of the values specified in the array.

`$all`
: Matches arrays that contain all elements specified in the query.

### Logical Operators

`$and`
: Joins query clauses with a logical AND.

`$or`
: Joins query clauses with a logical OR.

### Example

This filter is used to search for cases of men aged &ge; 50, created between 10 January 2023 and 20 february 2023 (UTC).

```json
{
  "$and": [
    { "patientInfo.age": { "$gte": 50 } },
    { "patientInfo.sex": "M" },
    {
      "$and": [
        { "createdAt": { "$gte": { "$date": "2023-01-10T00:00:00.000Z" } } },
        { "createdAt": { "$lt": { "$date": "2023-02-21T00:00:00.000Z" } } }
      ]
    }
  ]
}
```

URL-encode the above filter and assign it to `<filter>`.

```bash
GET /api/cases?filter=<filter> HTTP/1.1
```

## Available Filter Keys

Different filters are available for different search targets.

:::info

Filters prefixed with "patientInfo" require the [`personalInfoView` global privilege](../admin/privileges#global-privileges).

:::

### Cases

`projectId`
: ID of the project that the case to be searched belongs to. (string)

`caseId`
: ID of the case to be searched. (string)

`patientInfo.patientId`
: ID of the patient in the case. (string)

`patientInfo.patientName`
: Name of the patient in the case. (string)

`patientInfo.age`
: Age of the patient in the case. (number)

`patientInfo.sex`
: Sex of the patient in the case, one of 'M', 'F' and 'O'. (string)

`tags`
: Markers to accompany the case. (array)

`createdAt`
: The date the case was created, in ISO format. (date)

`updatedAt`
: The date the case was updated, in ISO format. (date)

### Series

### Plugin-jobs
