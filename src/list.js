"use strict";

import React from 'react'
import Sort from './list-sort'
import Filter from './list-filter'
import Item from './list-item'

export default class extends React.Component {
  sortBy(lbl) {
    this.props.sortBy(lbl);
  }
  filterBy(lbl, val) {
    this.props.filterBy(lbl, val);
  }
  render() {
    let fItem = this.props.formItem||[{label: 'id'}];
    let items = this.props.items;
    return (
      <div className="table-responsive">
        <h1>{this.props.identity} List</h1>
        <table className="table">
          <thead>
            <Sort item={fItem} sortBy={this.sortBy.bind(this)} />
            <Filter item={fItem} filterBy={this.filterBy.bind(this)} />
          </thead>
          <tbody>
          {items && items.map( item => {
            let urlParams = {identity:this.props.identity, id: item.id};
            return <Item key={item.id} item={item} fItem={fItem} urlParams={urlParams} />
          })}
          </tbody>
        </table>
      </div>

    );
  }
}




