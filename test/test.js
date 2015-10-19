var React = require('react/addons')
  , expect = require('expect')
  , TestUtils = React.addons.TestUtils
  , TestContext = require('./TestContext')
  , App = require('../index')
  , app = TestContext.getRouterComponent(App.List);


describe('List', function() {

  it('has something', function() {
    // console.log(React.findDOMNode(app))
    expect(React.findDOMNode(app).textContent).toContain('Admin');
    expect(React.findDOMNode(app).textContent).toContain('content');
    expect(React.findDOMNode(app).textContent).toContain('List');
    expect(React.findDOMNode(app).textContent).toContain('Create');
  });

});
