# logwrap
Bloody enterprise logger tools.

[![buildStatus](https://api.travis-ci.com/qiwi/logwrap.svg?branch=master)](https://travis-ci.com/qiwi/logwrap)
[![Coverage Status](https://coveralls.io/repos/github/qiwi/logwrap/badge.svg?branch=master)](https://coveralls.io/github/qiwi/logwrap?branch=master)
[![dependencies Status](https://david-dm.org/qiwi/logwrap/status.svg)](https://david-dm.org/qiwi/logwrap)
[![devDependencies Status](https://david-dm.org/qiwi/logwrap/dev-status.svg)](https://david-dm.org/qiwi/logwrap?type=dev)
[![Maintainability](https://api.codeclimate.com/v1/badges/93156a859b14c75e3e34/maintainability)](https://codeclimate.com/github/qiwi/logwrap/maintainability)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

### Motivation
Which logger to choose? _Any_. Because it doesn't matter at all. Just look at the problem from a different perspective. Logging is stateful data processing — pipeline of formatters, translators that ends in persistent storage. Really significant things: 
* Context detailing
* Tracing (MDC)
* Sensitive data masking

### Install
```bash
yarn add @qiwi/logwrap
npm i @qiwi/logwrap
```

### Usage
```javascript
// logger.js 

import {Logwrap, masker as maskerFactory, mdc as mdcFactory} from '@qiwi/logwrap'
import winston from 'winston'
import DailyRotateFile  from 'winston-daily-rotate-file'

const { createLogger, transports: {Console}, config: {colorize}} = winston
winston.transports.DailyRotateFile = DailyRotateFile

const mdc =  mdcFactory()
const masker =  maskerFactory()
const logger = createLogger()
logger.configure({...})

const logwrap = new Logwrap({
  pipeline: [mdc, masker, logger],
  level: 'DEBUG'
})

export default logwrap
```
