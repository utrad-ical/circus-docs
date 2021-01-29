---
id: api-intro
title: CIRCUS API usage
sidebar_label: CIRCUS API Introduction
slug: /api-intro
---

All of the functions of CIRCUS CS/DB can be accessed via RESTful API.

## API Endpoint

All of the API endpoints are prefixed with `/api`.

## Authentication

First, run the following command to generate a permanent access token.

```bash
$ node circus generate-permanent-token
```

And use this token in the `Authorization` header as follows:

```
Authorization: Bearer aaabbbcccdddeeefff
```

Any programming language or command that is capable of making HTTP requests can be used to access the API.

## API Access Samples

### Using cURL

### Using Node.js

### Using Python
