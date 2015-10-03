if (typeof document === 'undefined') {
  var jsdom = require("node-jsdom").jsdom;
  global.document = jsdom('<!doctype html><html><body></body></html>');
  global.window = document.parentWindow;
  global.navigator = {userAgent: ''};
}

module.export = jsdom;
