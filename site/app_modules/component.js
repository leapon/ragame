var util = require('util');
var tool = require('leaptool');

module.exports = function(app) {

    var moduleName = 'component';  // phone component
    var block = {
        app: app,
        group: 'app',
        model: null
    };
    block.data = tool.object(require('basedata')(app, moduleName));
    block.page = tool.object(require('basepage')(app, moduleName, block.data));
    block.model = null;

    block.data.componentCol = {
      "Color Screen": {
        "elements": ["Y", "La", "Pr", "Eu", "Gd", "Tb", "Dy"]
      },
      "Glass Polishing": {
        "elements": ["La", "Ce", "Pr"]
      },
      "Phone Circuitry": {
        "elements": ["La", "Pr", "Nd", "Gd", "Dy"]
      },
      "Speaker": {
        "elements": ["Pr", "Nd", "Gd", "Tb", "Dy"]
      },
      "Vibration Unit": {
        "elements": ["Nd", "Tb", "Dy"]
      },
    };

    // block data
    block.data.getComponent = function(req, res) {
      var callback = arguments[3] || null;
      var parameter = tool.getReqParameter(req);
      app.cb(null, block.data.componentCol[parameter.name], {}, req, res, callback);
    };

    // route
    app.server.get('/data/component/:name', block.data.getComponent);

    return block;
};

