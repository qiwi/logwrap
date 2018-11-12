# @qiwi/logwrap
Logwrap facade.

### Install
```bash
yarn add @qiwi/logwrap
npm i @qiwi/logwrap
```

### Usage

```javascript
// logger.js

import {Logwrap} from '@qiwi/logwrap'

const logwrap = new Logwrap({
  pipeline: [console],
  level: 'DEBUG'
})

export default logwrap
```