# Markdown It Find and Replace Plugin

Basic Find and Replace functionality as a plugin for [Markdown It](https://github.com/markdown-it/markdown-it), leveraging Regex. Great for setting up text expanders that work at build-time with Markdown It. Intended to work on inline and paragraph text. Will not operate inside code blocks or inline code.

## Install

As a dependency:

`npm i markdown-it-find-and-replace`

As a devDependency:

`npm i --dev markdown-it-find-and-replace`

### Peer Dependency

This is a plugin for Markdown It and requires that it also be installed in your project.

## Usage

```js
const md = require('markdown-it')()
  .use(require('markdown-it-find-and-replace'), opts)
```

The `opts` object can contain:

| Name                   | Description                                                               | Default                    |
|------------------------|---------------------------------------------------------------------------|----------------------------|
| `defaults`             | Activates find-and-replace's [starter replace rules](#default-rules).     | true                       |
| `replaceRules`         | An array of [find and replace rules](#rule-objects).                      | []                         |


### Rule Objects

The `replaceRules` property can contain an array of objects. If you choose to build your own rules you can do so by passing in the specific object format to the array as follows:

```js
	{
		pattern: /(?<=[\t\s\S\( ]|^)DS9(?=[\?\.\,\s\r\n\!\) ]|$)/g,
		replace: "Deep Space Nine",
	},
```

This would be passed into the plugin with the Markdown It `use` call:

```js
const md = require('markdown-it')()
  .use(require('markdown-it-find-and-replace'), {
	  defaults: true,
	  replaceRules: [{
		pattern: /(?<=[\t\s\S\( ]|^)DS9(?=[\?\.\,\s\r\n\!\) ]|$)/g,
		replace: "Deep Space Nine",
	}]
  })
```

With the result of the Markdown transforming from:

```md
I watched DS9 last night.
```

to

```html
<p data-wordfix="true">I watched Deep Space Nine last night.</p>
```

The object contains two properties `pattern` and `replace` which are used with [the String prototype `replace` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) in the style of `aString.replace(pattern, replace)`. To support that functionality the plugin allows either a RegExp object or a string in the `pattern` property and only a string in the `replace` property. The plugin will throw errors for a malformed `replaceRules` value or for a malformed rule, if one exists in the array.

### Default Rules

Markdown-It Find and Replace ships with a set of default rules that are intended as basic common-use replacements built on common text expanders. These are the rules you get in the default set:

```js
[
	{
		pattern: /(?<=[\t\s\S\( ]|^)11ty(?=[\?\.\,\s\r\n\!\) ]|$)/gi,
		replace: "Eleventy",
	},
	{
		pattern: /(?<=[\t\s\( ])prob(?=[\?\.\,\s\r\n\!\) ]|$)/g,
		replace: "probably",
	},
	{
		pattern: /(?<=[\t\s\( ]|^)Prob(?=[\?\.\,\s\r\n\!\) ])/g,
		replace: "Probably",
	},
	{
		pattern: /(?<=[\t\s\( ])graf(?=[\?\.\,\s\r\n\!\) ]|$)/g,
		replace: "paragraph",
	},
	{
		pattern: /(?<=[\t\s\( ]|^)Graf(?=[\?\.\,\s\r\n\!\) ])/g,
		replace: "Paragraph",
	},
	{
		pattern: /(?<=[\t\s\( ])b\/c(?=[\?\.\,\s\r\n\!\) ]|$)/g,
		replace: "because",
	},
	{
		pattern: /(?<=[\t\s\( ]|^)B\/c(?=[\?\.\,\s\r\n\!\) ])/g,
		replace: "Because",
	},
	{
		pattern: /(?<=[\t\s\( ])def(?=[\?\.\,\s\r\n\!\) ]|$)/g,
		replace: "definitely",
	},
	{
		pattern: /(?<=[\t\s\( ]|^)Def(?=[\?\.\,\s\r\n\!\) ])/g,
		replace: "Definitely",
	},
	{
		pattern: /(?<=[\t\s\( ])tho(?=[\?\.\,\s\r\n\!\) ]|$)/g,
		replace: "though",
	},
	{
		pattern: /(?<=[\t\s\( ]|^)Tho(?=[\?\.\,\s\r\n\!\) ])/g,
		replace: "Though",
	},
]
```

### HTML Data Property

The plugin will add a data property named `wordfix` with a value of `true` to the HTML tag that contains text the plugins treats. This is useful for debugging and verifying functionality.

## Render Process Impact

Impact on your Markdown It rendering process should be fairly low, however, the more Regex rules you add to the plugin the more of an impact there will be.

## Contributing

This plugin is maintained in its GitHub repository. All PRs and Issues filed to that repo are welcome and will be reviewed. The GitHub repo includes a test suite and it is recommended that you run tests before filing a PR to make sure you maintain the basic functionality of this plugin.

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
