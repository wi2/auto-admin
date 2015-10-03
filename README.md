Auto-admin

## Installation

```sh
$ npm install auto-admin --save
```

## Usage
```js

import React from 'react';
import Router, {HistoryLocation} from 'react-router';

Router.run(require('./routes'), HistoryLocation, Root => {
  React.render(<Root {...window.__ReactInitState__} />, document.body);
  delete window.__ReactInitState__;
});

```


## License

MIT &copy; 2015 contributors

