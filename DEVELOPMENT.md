# Development Guide

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [npm](https://www.npmjs.com/get-npm)
- [Node.js](https://nodejs.org/en/download/)

## Install dependencies

```bash
npm install
```

## Package

```bash
npm run package:watch
```

## Test

```bash
npm test
```

## Run locally

```bash
npm run all
node dist/index.js
```

## Release

### 1. Update the version

It is necessary to manually update, commit and push the version in the
`package.json` file. Normally, the version should be updated according to the
Semantic Versioning. And this happens in a pull request.

Note: Only step 1 is necessary for a pull request.

### 2. Tag and push the new release

After that a helper script is available to streamline the process of tagging and
pushing new releases for GitHub Actions.

It performs the following steps:

1. Get the latest release tag
1. Prompt the user for a new release tag (while displaying the latest release
   tag, and a regular expression to validate the new tag)
1. Tag the new release
1. Push the new tag to the remote

```bash
./scripts/release.sh
```
