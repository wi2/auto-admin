"use strict";
import React from 'react'

export default class extends React.Component {
  _onClick (lbl, e) {
    if (e) e.preventDefault();
    this.props.sortBy(lbl);
  }
  render() {
    return (
      <tr>
        <th />
        {this.props.item &&
          this.props.item.map( it => <th key={it.label} onClick={this._onClick.bind(this, it.label)}>{it.label}</th> )}
      </tr>
    );
  }
}
