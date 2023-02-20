---
title: Search Query Parameters
---

## Available parameters

`filter`
: Specify search criteria. More information is available in **_[Available filter operators](search-query-parameters#available-filter-operators)_** and **_[Available filter](search-query-parameters#available-filter)_**.

`sort`
: Sort order of search results. A value of 1 means ascending and -1 means descending. The default is `{ createdAt: -1 }`.

`limit`
: Number of search results per page. (number)

`page`
: Page number starting from 1. (number)

`skip`
: Skip a specified number of search results. (number)

### Example

```bash title="Example Request"
GET /api/cases HTTP/1.1

{
  "filter": {
    "$and": [
      { "patientInfo.age": 50 },
      { "patientInfo.sex": "M" },
      { "createdAt": { "$date": "2023-02-01" } },
      { "updatedAt": { "$date": "2023-02-01" } }
    ]
  },
  "sort": { "projectId": -1 },
  "page": 1,
  "limit": 20
}
```

## Available filter operators

Some of the MongoDB operators can be used. The operator descriptions are taken from the [MongoDB reference](https://www.mongodb.com/docs/manual/reference/operator/query/).

### Comparison

`$gt`
: Matches values greater than the specified value.

`$gte`
: Matches values that are greater than or equal to a specified value.

`$lt`
: Matches values that are less than a specified value.

`$lte`
: Matches values that are less than or equal to a specified value.

`$ne`
: Matches all values that are not equal to a specified value.

`$in`
: Matches any of the values specified in an array.

### Logical

`$and`
: Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.

`$or`
: Joins query clauses with a logical OR returns all documents that match the conditions of either clause.

### Array

`$all`
: Matches arrays that contain all elements specified in the query.

<details><summary>Example</summary>

This filter is used to search for cases of men aged 50 and over, created between 1 January 2023 and 10 January 2023.

```bash
GET /api/cases HTTP/1.1

{
  "filter": {
    "$and": [
      { "patientInfo.age": { "$gte": 50 } },
      { "patientInfo.sex": "M" },
      {
        "$and": [
          { "createdAt": { "$gte": { "$date": "2023-01-01T00:00:00.000Z" } } },
          { "createdAt": { "$lt": { "$date": "2023-01-11T00:00:00.000Z" } } }
        ]
      }
    ]
  }
}


```

</details>

## Available filter

Different filters are available for different search targets.

:::info

Filters marked with "patientInfo" require **_[personalInfoView](../admin/privileges#global-privileges)_**.

:::

### cases

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

### series

### plugin-jobs
