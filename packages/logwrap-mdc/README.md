# @qiwi/logwrap-mdc
Logwrap MDC injector.

### Install
```bash
yarn add @qiwi/logwrap-mdc
npm i @qiwi/logwrap-mdc
```

### Usage

```javascript
// logger.js

import {Logwrap} from '@qiwi/logwrap-core'
import mdc from '@qiwi/logwrap-mdc'

const mdcPipe = mdc()
const logwrap = new Logwrap({
  pipeline: [mdcPipe, console],
  level: 'DEBUG'
})

export default logwrap
```