# @qiwi/logwrap-core
Logwrap core assets.

### Install
```bash
yarn add @qiwi/logwrap-core
npm i @qiwi/logwrap-core
```

### Usage

```javascript
// logger.js

import {Logwrap} from '@qiwi/logwrap-core'

const logwrap = new Logwrap({
  pipeline: [console],
  level: 'debug'
})

export default logwrap
```