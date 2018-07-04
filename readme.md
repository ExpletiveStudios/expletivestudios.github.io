# Expletive Studios

---

## Table of Contents

* Description
* Installation
* Configuration
* Execution

---

## Description

This is a static website for Expletive Studios, an indie game development studio.

---

## Installation

First and foremost, the development environment requires the appropriate development tools.

1. Requires manual installation via executable
	
	* Git
	* Node.JS
	* Python

2. Requires manual installation via command line

	* Gulp
	* SASS
	* Nunjucks

### Git

Free and open source distributed version control system.

* [About](https://git-scm.com/about)
* [Documentation](https://git-scm.com/doc)
* [Download](https://git-scm.com/downloads)

### Node.JS

JavaScript runtime built on Chrome's V8 JavaScript engine.

* [About](https://nodejs.org/en/about/)
* [Documentation](https://nodejs.org/en/docs/)
* [Download](https://nodejs.org/en/download/)

### Python

Dependency for some node modules.

* [About](https://www.python.org/about/)
* [Download](https://www.python.org/downloads/)

### NPM

Package manager for JavaScript built upon Node.JS.

* [Home](https://www.npmjs.com/)
	* Provides search access to module library
* [Features](https://www.npmjs.com/features)
* [Documentation](https://docs.npmjs.com/)

### Gulp

Automated streaming build system.

* [Documentation](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
* [Plugins](http://gulpjs.com/plugins/)

### Nunjucks

Templating engine for JavaScript and HTML.

* [Templating](https://mozilla.github.io/nunjucks/templating.html)
* [Documentation](https://mozilla.github.io/nunjucks/api.html)

---

## Configuration

### NPM

Install all preselected node modules within the package.json

		npm install

Globally install gulp for access to 'gulp' command

		npm install -g gulp

---

## Execution

### Gulp Commands

As this project is streamlined via the automated workflow of gulp, all compilation is handled with various gulp commands.

Default and most useful command that executes all non-video and non-image tasks:

		gulp

Production command that all other tasks with full compression and optimizations:

		gulp prod

Commands for individual tasks:

		gulp images
		gulp nunjucks
		gulp sass
		gulp scripts
		gulp watch
		gulp sync

---
