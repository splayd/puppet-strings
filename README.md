# puppet-strings
[![Build Status](https://travis-ci.org/splayd/puppet-strings.svg?branch=master)](https://travis-ci.org/splayd/puppet-strings)

A better interface for common browser automation workflows

## Usage

### Installation

#### Supported Versions of Node.js
`puppet-strings` is only tested against the latest `Current` and `LTS` versions
of [Node.js](https://nodejs.org/en/).

Please ensure that your Node.js installation is up-to-date, and, if necessary,
[upgrade your installation](https://nodejs.org/en/download/package-manager/).

#### npm Package
Install [puppet-strings](https://yarnpkg.com/en/package/puppet-strings)
by running

```sh
yarn add puppet-strings
```

Or, if [`yarn`](https://yarnpkg.com/en/) is not installed, run

```sh
npm install --save puppet-strings
```

During installation, a recent version of Chromium will be downloaded and stored
locally.

On Windows and Mac, `puppet-strings` should work out of the box.

### Running In a Docker Container
Chrome statically depends on many GUI-related system libraries. So, even if you
only run it in headless mode, those libraries still need to be installed.
Windows and Mac environments have all of these libraries available by default.
However, because Docker containers are meant be used from command line scripts,
they will typically not include any of these libraries.

We maintain [`splayd/javascript`](https://hub.docker.com/r/splayd/javascript/),
a Docker image that includes the latest `Current` version of Node.js and all of
the libraries needed to run Chrome.

If you need to maintain a custom Dockerfile for your project, see our 
[Dockerfile](https://hub.docker.com/r/splayd/javascript/~/dockerfile/) for clues
on how to install the needed GUI libraries.
