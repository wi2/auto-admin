
Sails React

## Installation
You need sais.io.socket and sails-hook-babel

```sh
$ npm install sails-react-store sails-hook-babel --save
```

## Usage
### for record's collection
```js
"use strict";
import React from 'react'
import {ReactItem, ReactCollection} from 'sails-react-store'

export class PostItem extends ReactItem {
  render() {
    return (
      <div className="post">
        <h5 className="post-title">{this.state.item.title}</h5>
        <p className="post-content">{this.state.item.content}</p>
      </div>
    )
  }
}

//
//

class Item {
  render() {
    return (
      <span className="doc-title">{this.props.item.title}</span>
    )
  }
}

export class PostCollection extends ReactCollection {
  render() {
    return (
      <div className="posts">
        {this.state.items.map( (item,i) => {
          return <Item item={item} key={i} />;
        })}
      </div>
    )
  }
}


```
and use like that
when no attributes items => get request /post
```js
<PostCollection identity="post" />

```
or if you want to add manually items
```js
<PostCollection identity="post" items={[]} />
```
### for one record
```js
<PostItem identity="post" item={{title:'a title', content: 'a text content'}} />

```




## License

MIT &copy; 2015 contributors

