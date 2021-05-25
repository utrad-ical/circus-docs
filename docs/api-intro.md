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

First, you need a permanent access token to access the API.

1. The first option is log-in to the CIRCUS Web UI and go to the "API Tokens" section.
2. The second option is to use CIRCUS CLI. Attach to the CIRCUS container and issue the following command.

   ```bash
   $ node circus add-permanent-token <user-email>
   ```

:::caution Keep the Token Secret!
Your permanent access tokens will remain valid even after you have logged out of the CIRCUS web UI, and it can do anything on behalf of your account. Use this wisely.
:::

Once you've generated the token, you can use it in the `Authorization` header as follows:

```
Authorization: Bearer aaabbbcccdddeeefff
```

Any programming language or command that is capable of making HTTP requests can be used to access the API.

## API Access Samples

Before trying the following samples, you need a permanent access token.

### Using cURL

### Using JavaScript (Node.js)

```js
import fetch from 'node-fetch';
```

### Using Python
