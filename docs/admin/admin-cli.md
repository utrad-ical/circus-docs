---
title: Admin CLI
---

You can use Admin CLI to perform some administrative tasks.

## Accessing Admin CLI

Attach the container and run the following:

```shell-session title="Inside the container"
$ cd /var/circus/packages/circus-api
$ node circus
```

In the rest of this page, the CLI command is simply referred to as `circus`.

## See the List of Commands

You can check the list of available subcommands by invoking the `circus` command without arguments:

```shell-session
$ circus
CIRCUS-API CLI version 0.4.0

Usage: circus [command]

Available commands:
  add-permanent-token
  clear-token
  db-check
  dump-dicom
  export-case
  generate-password-hash
  import-series
  migrate
  refresh-series-parameters
  register-cad-plugin
  register-case
  register-plugin-job
  toEntry
  ulid
  help [command]
```

## Commands

<Note>

At the moment, only important commands whose function cannot be accessed via the web UI are explained here. You can use the help command to get more information about each command.

</Note>

### series-import

With this command, you can import DICOM series into CIRCUS. The biggest difference from using the web UI is that you don't have to make an archive file (zip/tgz) and you can import as many files as you wish.

You must specify the domain the imported series will belong to.

```shell-session
$ circus series-import --domain=DOMAIN -r /path/of/file-or-dir
```

<Note>

If you are within a Docker container and want to import DICOM series outside the container, you need to temporarily mount the directory containing the series data to the container. To do so, use another `-v` option when you attach to the container.

</Note>

### migrate

Sometimes, database migration is necessary when you update CIRCUS. CIRCUS API automatically detects it when the database in an old format, and prompts you to update the database.

```shell-session
$ circus migrate
```

### register-cad-plugin

See [Registration of CS Plug-in](/docs/admin/registration-cs-plugin).
