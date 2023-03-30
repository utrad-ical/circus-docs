# API for Plugin Job Manager Administration

<ApiPreamble verb="get" path="/admin/plugin-job-manager" />

### Request

```bash title="Example"
GET /api/admin/plugin-job-manager HTTP/1.1
```

### Response

`status`
: Indicates the current status of the plugin job manager, either `"running"` or `"stopped"`. (string)

```bash title="Example"
HTTP/1.1 200
Content-Type: application/json

{
  "status": "stopped"
}
```

---

<ApiPreamble verb="put" path="/admin/plugin-job-manager/switch" />

### Request

`status`
: Status of the plugin job manager you want to set up, either `"running"` or `"stopped"`. (string)

```bash title="Example"
PUT /admin/plugin-job-manager/switch HTTP/1.1
Content-Type: application/json

{
  "status": "running"
}
```

### Response

```bash title="Example"
HTTP/1.1 200
```

---
