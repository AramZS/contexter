# Link Contexter

## Warning

This project is in beta. In theory I will not release anything that doesn't work, but there are no guarantees.

## What is this?

The Link Contexter is a tool for processing links and giving them useful context that can be used for pages and static site building tools.

## Available Functions

In order to support the likely uses this library might be put towards it exposes three functions:

### Context

`context` is an `async` function that is the primary function of this library. It takes a URL and attempts to retrieve the page that URL points to and parse it for useful metadata and information. It will then return an object that includes as much data about the page that it could find.

There are a number of useful pieces of data that are exposed but the most important properties on the returned object are `htmlEmbed`, which will supply you with an easy-to-implement block of HTML and CSS that can be placed, as-is, into an existing page. It is very useful for replacing a link on a page with a more context-filled HTML block.

Additionally, `data.finalizedMeta` has a number of useful properties. The library will attempt to parse the page for metadata, sort all found data and determine the most valid to place it in the `finalizedMeta` object.

### sanitizeLink

`sanitizeLink` is a `sync` function that takes a single argument, a URL, and returns a version of that hyperlink that matches the sanitized version of the URL that this plugin will use to attempt to retrieve data about the URL.

### uidLink

`uidLink` is a `sync` function that takes a single argument, a URL. It will return a SHA1 Hex hash from that URL. This may be useful for keeping a record of which URLs you have or have not processed.

## Notes

This is a basic description of the library and functionality. Better documentation to come!
