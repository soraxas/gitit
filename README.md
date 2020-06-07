The `gitit` data dir had been modified to include ace editor, based on [this](https://gist.github.com/lmullen/e2d2d4aabf84220c517a).

I used this with the `gitit` docker image from `t13a/gitit-experimental`


An example of `run.sh`:
```sh
#!/bin/sh

GITIT_CONF=$(pwd)/gitit.conf
GITIT_DIR=$(pwd)/gitit

# create gitit.conf if not exists to prevent mounting as dir
touch $GITIT_CONF
mkdir -p $GITIT_DIR
docker run --name gitit --rm -p 5001:5001 \
  -e TIMEZONE=Australia/Sydney \
  -v $GITIT_CONF:/gitit.conf \
  -v $GITIT_DIR:/gitit \
  -e GITIT_UID=1000 \
  -e GITIT_GID=1001 \
  t13a/gitit-experimental
```
