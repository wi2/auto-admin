"use strict";
import React from 'react'
import {Link} from 'react-router'
import Content from './list-item-content'

export default class extends React.Component {
  render() {
    let item = this.props.item;
    return (
      <tr key={item.id}>
        <td><Link to="update" params={this.props.urlParams}>Edit</Link></td>
          {this.props.fItem.map( it => <td key={it.label}><Content item={item[it.label]} type={it.type} /></td> )}
      </tr>
    );
  }
}
