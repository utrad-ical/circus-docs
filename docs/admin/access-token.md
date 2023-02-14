---
title: Permanent Access Tokens
---

When you want to programmatically access CIRCUS REST API, or when you want to use DICOM Storage Server to upload DICOM series from imaging modalities, you need to generate a permanent access token for a user.

## Generating a Permanent Token

### Via Web UI

1. Select [Tool] - [Access Tokens] in the top menu.

1. Generate a new token by clicking the "Add new token" button. Input a short text that describes the purpose of this token.

   ![Add new token](add-new-token.png)

1. Store the generated token securely to somewhere. You cannot display this token again.

   ![Token created](token-created.png)

:::caution

The access token must be stored securely. Someone who knows this access token will be able to perform anything on behalf of the associated user.

:::

### Via CLI

Attach to Bash in the CIRCUS container (see [Installation](./installation.mdx)), and run the following commands.

```shell-session title="Inside the container"
# /root/servicies.sh &
# cd /var/circus/circus-api
# node circus add-permanent-token <LOGIN-NAME-OR-EMAIL>
```

## Using a Permanent Token

The generated token can be used to access CIRCUS API. For details, refer to the [Developer Guide](../dev/api-intro.mdx).
