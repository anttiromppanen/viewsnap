# Viewsnap

![Viewsnap logo](https://github.com/anttiromppanen/viewsnap/blob/main/public/logo.png)

A Node.js CLI tool that captures responsive snapshots of a website, generating images for multiple viewport sizes. This allows developers to quickly test and visualize how their web pages appear across different devices and browsers, from mobile to desktop, streamlining the process of ensuring a responsive design.

> **_NOTE:_** Animations on a website may produce various different results on the images.

## Usage

**Option 1:** Use directly with npx
```javascript
npx viewsnap generate <url>
```

**Option 2:**
Install viewsnap package globally
```javascript
npm install -g viewsnap
```
```javascript
viewsnap generate <url>
```

**Option 3:** install to project scope, and add the command to PATH variable
```javascript
npm install viewsnap --save-dev
```
Add the viewsnap command to PATH variable:
```javascript
export PATH=$PATH:$(npm bin -g)
```
```javascript
viewsnap generate <url>
```

*Snapshots* and an overview page *snapshots.html* are stored in .viewsnap directory.

## Commands

### `generate` Command

The generate command takes snapshots of a website URL given as a parameter. Snapshots are taken with multiple viewport sizes covering the most common device viewports from desktop, tablet, and mobile devices. Viewport snapshots are taken with three different headless browsers (Chrome, Firefox, WebKit).

**Syntax:**

```javascript
viewsnap generate <url> [options]
```

**URL**
* URL for a website, can be local or web-hosted

**Options**
* -f, --full-height, option sets the viewport height for full height of the page.

**Example output:**

```
npm viewsnap generate http://localhost:5137
```

![snapshots.html preview](https://github.com/anttiromppanen/viewsnap/blob/main/public/generate1.png)

*snapshots.html:*


![snapshots.html preview](https://github.com/anttiromppanen/viewsnap/blob/main/public/generate2.png)

## Contributing
All contributions are welcome, please read [how to contribute](CONTRIBUTING.md) first.
