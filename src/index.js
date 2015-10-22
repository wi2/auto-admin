"use strict";

import React from 'react'
import DefaultLayout from './layout'
import AdForm from './form'
import AdList from './list'
import {RouteHandler, Route, Navigation} from 'react-router'


class AdminComponent extends React.Component {
  static defaultProps = {
    root: '/admin'
  }
  static propTypes = {
    root: React.PropTypes.string.isRequired
  }
}

export class Home extends AdminComponent {
  componentWillMount() {
    if (typeof io !== "undefined")
      io.socket.get(this.props.root, (res => { this.setState(res) }));
  }
  render() {
    let CurrentLayout = this.props.layout||DefaultLayout;
    return (
      <CurrentLayout {...this.props} {...this.state}>
        <h1>ADMIN: HomePage</h1>
      </CurrentLayout>
    );
  }
}

class FormItem extends AdminComponent {
  componentWillMount() {
    if (!this.props.item)
      this.getItem(this.props.identity||this.props.params.identity);
  }
  componentWillUpdate(props) {
    if (this.props.params.identity !== props.params.identity)
      this.getItem(props.params.identity);
  }
  getItem(identity) {
    this.loading = true;
    let url = (this.props.params.id) ? "/" + this.props.params.id : "/new";
    if (typeof io !== "undefined") {
      io.socket.get(this.props.root + "/" + identity + url, ( res => {
        this.loading = false;
        this.setState(res);
      }));
    }
  }

  multipart(data, binaries, cb) {
    if (binaries.length) {
      let tmp = binaries.pop();
      if (data[tmp.label] instanceof Blob) {
        let reader = new FileReader();
        reader.onload = (upload) => {
          data[tmp.label] = upload.target.result;
          this.multipart(data, binaries, cb);
        };
        reader.readAsDataURL(data[tmp.label]);
      } else
        this.multipart(data, binaries, cb);
    } else
      cb(data);
  }
  saving(data, url, cb) {
    if (typeof io !== "undefined") {
      if (typeof url === 'function') {
        cb = url;
        url = "";
      }
      var identity = this.props.identity||this.props.params.identity
        , fItem = this.props.formItem;
      if (this.state && this.state.formItem)
        fItem = this.state.formItem;
      var binaries = fItem.filter( a => { return a.type === 'binary' } );
      this.multipart(data, binaries, result => {
        io.socket.post("/" + identity + url, result, ( res => { if (cb) cb(res); }))
      });
    }
  }
  onSave(data) {}
  render() {
    let CurrentLayout = this.props.layout||DefaultLayout;
    let modelForm;
    if (this.props.models) {
      let identity = this.props.identity||this.props.params.identity;
      modelForm = this.props.models[identity];
    }
    if (this.props.formItem || (this.state && this.state.formItem))
      var CurrentAdForm = <AdForm {...this.props} {...this.state} onSave={this.onSave.bind(this)} modelForm={modelForm} />;
    return (
      <CurrentLayout {...this.props} {...this.state}>
        {CurrentAdForm||''}
      </CurrentLayout>
    );
  }
}
FormItem.contextTypes = { router: Navigation.contextTypes }

export class Update extends FormItem {
  onSave(data) {
    let identity = this.props.identity||this.props.params.identity
    this.saving(data, "/" + this.props.params.id, res => {
      this.context.router.transitionTo("list", {identity})
    });
  }
}

export class Create extends FormItem {
  onSave(data) {
    let identity = this.props.identity||this.props.params.identity
    this.saving(data, res => {
      this.context.router.transitionTo("list", {identity})
    });
  }
}

export class List extends AdminComponent {
  state = {
    contain: {},
    sort: ['id', 'ASC'],
    skip: 0,
    limit: 30
  }
  componentWillMount() {
    if (!this.props.item) {
      this.getItems(this.props.identity||this.props.params.identity);
    }
  }
  componentWillUpdate(props) {
    if (this.props.params.identity !== props.params.identity) {
      this.getItems(props.params.identity);
    }
  }
  getItems(identity) {
    if (typeof io !== "undefined") {
      let params = {
        contain: this.state.contain,
        sort: this.state.sort.join(" "),
        limit: this.state.limit,
        skip: this.state.skip
      };
      io.socket.get(this.props.root + "/" + identity, params, ( res => {
        this.setState(res)
      }));
    }
  }
  filterBy(lbl, val) {
    let contain = this.state.contain;
    contain[lbl] = {'contains': val};
    if (val.length) this.setState(contain);
    else if (this.state.contain[lbl]) delete this.state.contain[lbl];
    this.getItems(this.props.identity||this.props.params.identity);
  }
  sortBy(lbl) {
    let sort = this.state.sort;
    let direction = 'ASC';
    if (sort[0] === lbl)
      direction = (sort[1] === 'ASC') ? 'DESC' : 'ASC';
    this.setState({sort: [lbl, direction]});
    this.getItems(this.props.identity||this.props.params.identity);
  }
  render() {
    let CurrentLayout = this.props.layout||DefaultLayout;
    return (
      <CurrentLayout {...this.props} {...this.state}>
        <AdList items={[]} {...this.props.params} {...this.props} {...this.state}
          sortBy={this.sortBy.bind(this)} filterBy={this.filterBy.bind(this)} />
      </CurrentLayout>
    );
  }
}

export function Routes(root='/admin') {
  return (
    <Route handler={RouteHandler}>
      <Route name="home" path={root} handler={Home} />
      <Route name="list" path={`${root}/:identity`} handler={List} />
      <Route name="create" path={`${root}/:identity/new`} handler={Create} />
      <Route name="update" path={`${root}/:identity/:id`} handler={Update} />
    </Route>
  );
}

