# logwrap
Bloody enterprise logger tools.

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

import {Logwrap, Masker, Mdc} from '@qiwi/logwrap'
import winston from 'winston'
import DailyRotateFile  from 'winston-daily-rotate-file'

const { createLogger, transports: {Console}, config: {colorize}} = winston
winston.transports.DailyRotateFile = DailyRotateFile

const logger = createLogger()
logger.configure({...})

const masker = new Masker()
const mdc = new Mdc()
const logwrap = new Logwrap({
  pipeline: [mdc, masker, logger],
  level: 'DEBUG'
})

export default logwrap
```
