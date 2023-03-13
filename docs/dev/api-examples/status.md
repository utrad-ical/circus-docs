# API for Status

<ApiPreamble verb="get" path="/status" />

### Request

```bash title="Example"
GET /api/status HTTP/1.1
```

### Response

`status`
: Returns basic API server status. Can be used for "ping"-ing. (object)

```bash title="Example"
HTTP/1.1 200
Content-type: application/json

{
  "status": "running"
}
```

---
