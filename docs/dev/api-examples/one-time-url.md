# API for One Time Url

<ApiPreamble verb="post" path="/admin/onetime-urls" />

Required global privilege: [**Issue Onetime**](../../../docs/admin/group-settings#list-of-global-privileges)

### Request

`user`
: User to be issued a temporarily available login string, either `userEmail` or `loginId`. (string)

```bash title="Example"
POST /api/admin/onetime-urls HTTP/1.1
Content-Type: application/json

{
  "user": "user1@example.com"
}
```

### Response

`onetimeString`
: Temporarily available login string. (string)

```bash title="Example"
HTTP/1.1 201
Content-Type: application/json

{
  "onetimeString": "3wmxz4rjlibod4y2uxa7qgrizx278q4r"
}
```

---
