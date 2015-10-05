# Auto Admin
## Fast and automatic administration maker.
Developped for sailsjs and use reactjs(ES6)

## Installation

```sh
$ npm install auto-admin --save
```
### Example

[sails-isomorphic-react-admin-example](https://github.com/wi2/sails-isomorphic-react-admin-example)


## Usage
app.js
```js

import React from 'react';
import Router, {HistoryLocation} from 'react-router';
import {Routes} from 'auto-admin';

Router.run(Routes, HistoryLocation, Root => {
  React.render(<Root {...window.__ReactInitState__} />, document.body);
  delete window.__ReactInitState__;
});

```

### Overwrite routes
routes.js
```js

"use strict";

import React from 'react'
import {RouteHandler, Route} from 'react-router'
import {Home, List, Create, Update} from 'auto-admin'

module.exports = (
  <Route handler={RouteHandler}>
    <Route name="home" path="/admin" handler={Home} />
    <Route name="list" path="/admin/:identity" handler={List} />
    <Route name="create" path="/admin/:identity/new" handler={Create} />
    <Route name="update" path="/admin/:identity/:id" handler={Update} />
  </Route>
);

```

### Personalize your form with newforms-bootstrap
form.js
```js

"use strict";

import React from 'react'
import {Container, Row, Field} from 'newforms-bootstrap'

export const comment = (
  <Container autoColumns="md">
    <h1>Comments</h1>
    <hr />
    <p className="text-right">
      <button className="btn btn-default">Save</button>
    </p>
    <Row>
      <Field name="name" md="8"/>
      <Field name="post"/>
    </Row>
    <Row>
      <Field name="message"/>
    </Row>
  </Container>
);

```
app.js
```js
import React from 'react';
import Router, {HistoryLocation} from 'react-router';
import {Routes} from 'auto-admin'
import * as modelsForm from './forms'

Router.run(Routes, HistoryLocation, Root => {
  React.render(<Root {...window.__ReactInitState__} models={modelsForm} />, document.body);
  delete window.__ReactInitState__;
});

```

### Change your Layout
layout.js
```js
"use strict";

import React from 'react'

export default class {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

```

app.js
```js
import React from 'react';
import Router, {HistoryLocation} from 'react-router';
import {Routes} from 'auto-admin'
import Layout from './layout';

Router.run(Routes, HistoryLocation, Root => {
  React.render(<Root {...window.__ReactInitState__} layout={Layout} />, document.body);
  delete window.__ReactInitState__;
});

```



## License

MIT &copy; 2015 contributors

