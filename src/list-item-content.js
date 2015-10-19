"use strict";
import React from 'react'

export default class extends React.Component {
  render() {
    let item = this.props.item;
    if (this.props.type === 'binary' ) {
      if (!item)
        return <span />;
      else if (item.split("/")[0] === 'data:image')
        return <img src={item||'data:image/png;base64,null'} />;
      else
        return <a href={item}>Download</a>;
    } else if (this.props.type === 'boolean' ) {
      return <span>{item?'true':'false'}</span>;
    } else {
      return <span>{item||'-'}</span>;
    }
  }
}
