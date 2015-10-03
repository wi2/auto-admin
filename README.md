Auto-admin

## Installation

```sh
$ npm install auto-admin --save
```

## Usage
app.js
```js

import React from 'react';
import Router, {HistoryLocation} from 'react-router';

Router.run(require('./routes'), HistoryLocation, Root => {
  React.render(<Root {...window.__ReactInitState__} />, document.body);
  delete window.__ReactInitState__;
});

```

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

Personalize your form with newforms-bootstrap
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


## License

MIT &copy; 2015 contributors

