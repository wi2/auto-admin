'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;
var TestUtils = React.addons.TestUtils;
var TestLocation = require('react-router/lib/locations/TestLocation');

const jsdom = require('./helper.js');
const assert = require('assert');
var Admin = require('../index');


var TestContext = {
  getRouterComponent: function(TargetComponent) {
    var component,
        div = document.createElement('div'),
        routes = (
          <Route>
            <Route name="home" path="/admin" handler={Admin.Home} />
            <Route name="list" path="/admin/:identity" handler={Admin.List} />
            <Route name="create" path="/admin/:identity/new" handler={Admin.Create} />
            <Route name="update" path="/admin/:identity/:id" handler={Admin.Update} />
          </Route>
        );

    var location = new TestLocation(['/admin/user']);

    let formItem = [
      {input: 'string', label:'title'},
      {input: 'text', label:'content'}
    ];
    let items = [
      {title: 'title 1', content:'my content 1', id: 1},
      {title: 'title 2', content:'my content 2', id: 2}
    ];


    Router.run(routes, location, function (Handler) {
      var mainComponent = React.render(<Handler
        identities={['user']}
        items={items} formItem={formItem} />, div);

      component = TestUtils.findRenderedComponentWithType(mainComponent,
        TargetComponent);
    });

    return component;
  },
  stubRouterContext: function(Component, routerContext) {
    var RouterStub = function() {};

    RouterStub.makePath = function() {};
    RouterStub.makeHref = function() {};
    RouterStub.transitionTo = function() {};
    RouterStub.replaceWith = function() {};
    RouterStub.goBack = function() {};
    RouterStub.getCurrentPath = function() {};
    RouterStub.getCurrentRoutes = function() {};
    RouterStub.getCurrentPathname = function() {};
    RouterStub.getCurrentParams = function() {};
    RouterStub.getCurrentQuery = function() {};
    RouterStub.isActive = function() {};
    RouterStub.getRouteAtDepth = function() {};
    RouterStub.setRouteComponentAtDepth = function() {};

    if (routerContext) {
      RouterStub = routerContext(RouterStub);
    }

    return React.createClass({
        childContextTypes: {
          router: React.PropTypes.func,
          routeDepth: React.PropTypes.number
        },

        getChildContext: function() {
          return {
            router: RouterStub,
            routeDepth: 0
          };
        },

        render: function() {
          return <Component />;
        }
    });
  }
};

module.exports = TestContext;
