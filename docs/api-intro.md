---
id: api-intro
title: CIRCUS API usage
sidebar_label: CIRCUS API Introduction
slug: /api-intro
---

All of the functions of CIRCUS can be accessed via RESTful API.

## Authentication

First, run the following command to generate a permanent access token.

```bash
$ node circus generate-permanent-token
```

And use this token in the `Authorization` header as follows:

```
Authorization: Bearer aaabbbcccdddeeefff
```
