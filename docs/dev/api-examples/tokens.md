# API for Tokens

<ApiPreamble verb="get" path="/tokens" />

### Request

```bash title="Example"
GET /api/tokens HTTP/1.1
```

### Response

Returns an array of objects with the following properties.

`tokenId`
: ID of the token. (string)

`description`
: An optinal text to identify the token. (string)

`createdAt`
: The date the token information was registered, in ISO date format. (date)

`updatedAt`
: The date the token information was updated, in ISO date format. (date)

:::info

The actual tokens cannot be retreived.

:::

```bash title="Example"
HTTP/1.1 200
Content-Type: application/json

[
  {
    "tokenId": "ek9ag1sy5eeba8h1zd4md6qcwb",
    "description": "Example Token 1",
    "createdAt": "2023-01-10T00:00:00.000Z",
    "updatedAt": "2023-02-20T00:00:00.000Z"
  },
  {
    "tokenId": "j8c0kfc2tctpj3eyn5w6vq9jve",
    "description": "Example Token 2",
    "createdAt": "2023-03-30T00:00:00.000Z",
    "updatedAt": "2023-03-30T00:00:00.000Z"
  }
]
```

---

<ApiPreamble verb="post" path="/tokens" />

### Request

```bash title="Example"
POST /api/tokens HTTP/1.1
Content-Type: application/json

{
  "description": "New Example Token"
}
```

### Response

`tokenId`
: ID of the created token. (string)

`accessToken`
: The token itself. Used for authentication when using the API. Note that you cannot retrieve this string from the API again. (string)

```bash title="Example"
HTTP/1.1 201
Content-Type: application/json

{
  "tokenId": "ps1trbvkn0zdn2ht5q4sh2h5hw",
  "accessToken": "2311aee0435c36ae14c38292766837c1901b0a69"
}
```

---

<ApiPreamble verb="delete" path="/tokens/:tokenId" />

### Request

`tokenId` (path parameter)
: ID of the token to be deleted.

```bash title="Example"
DELETE /api/tokens/ek9ag1sy5eeba8h1zd4md6qcwb HTTP/1.1
```

### Response

```bash title="Example"
HTTP/1.1 204
```

---
