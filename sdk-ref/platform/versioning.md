---
toc:
  maxDepth: 2
---

# Versioning
This describes how our Platform SDK is versioned.

## Semantic versioning
The Platform SDK follows the semantic versioning standard. This means each version number is comprised of X.Y.Z, where:

- X corresponds to a major version
- Y correponds to a minor version
- Z corresponds to a patch

With the new release, the SDK version number is updated incrementally depending on the changes introduced in the SDK. A new version includes new features, bugfixes, and occasionally breaking changes. For information on SDK updates, refer to [Changelog](/sdk-ref/platform/CHANGELOG.md).

When loading an SDK, you can decide which version to target by specifying it within the `<script>` tag. There are several options and considerations when it comes to specifying a version.

## Using the latest

Although the latest SDK version includes all the recent updates and improvements, it is also prone to occasional breaking changes. Below is the example that points to the latest SDK version.

```html
<script src="https://platform-websdk.transmitsecurity.io/platform-websdk/latest/ts-platform-websdk.js" defer="true" id="ts-platform-script"></script>
```

## Using a version range

To ensure your integration isn't affected by breaking changes but still includes fixes and new features, consider targeting `X.Y.x`. This loads the latest patch for a specific minor version. In this case, the latest SDK within the minor version range will be installed. For example, if `1.6.6` is currently the latest version available for `1.6`, then specifying `1.6.x` will load `1.6.6`. Versions such as `1.7.0` or `1.8.2` won't be loaded.

```html
<script src="https://platform-websdk.transmitsecurity.io/platform-websdk/1.6.x/ts-platform-websdk.js" defer="true" id="ts-platform-script"></script>
```

When pointing to a specific major (`X.x`), your code will load the latest available minor version and patch released for this major version. For example, if `1.6.22` is the latest SDK version available, then `1.x` will load it. Similarly, once `1.7.0` is released, `1.x` would load `1.7.0` instead.

The example below points to the major version range. Note that currently Platform SDK has a single major version.

```html
<script src="https://platform-websdk.transmitsecurity.io/platform-websdk/1.x/ts-platform-websdk.js" defer="true" id="ts-platform-script"></script>
```

## Using a specific version

You may prefer to target a specific SDK version (`X.Y.Z`) and perform SDK updates upon explicit testing and verification. Below is an example that invokes a specific version.


```html
<script src="https://platform-websdk.transmitsecurity.io/platform-websdk/1.6.20/ts-platform-websdk.js" defer="true" id="ts-platform-script"></script>
```