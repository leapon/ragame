var util = require('util');
var tool = require('leaptool');

module.exports = function(app) {

    var moduleName = 'element';
    var block = {
        app: app,
        group: 'app',
        model: null
    };
    block.data = tool.object(require('basedata')(app, moduleName));
    block.page = tool.object(require('basepage')(app, moduleName, block.data));
    block.model = null;

    block.data.elements = [
      {
        "symbol": "Y",
        "name": "Yttrium",
        "wiki": "https://en.wikipedia.org/wiki/Yttrium",
        "image": "https://upload.wikimedia.org/wikipedia/commons/2/28/Yttrium_1.jpg"
      },
      {
        "symbol": "La",
        "name": "Lanthanum",
        "wiki": "https://en.wikipedia.org/wiki/Lanthanum",
        "image": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Lanthanum-2.jpg"
      },
      {
        "symbol": "Ce",
        "name": "Cerium",
        "wiki": "https://en.wikipedia.org/wiki/Cerium",
        "image": "https://upload.wikimedia.org/wikipedia/commons/0/0d/Cerium2.jpg"
      },
      {
        "symbol": "Pr",
        "name": "Praseodymium",
        "wiki": "https://en.wikipedia.org/wiki/Praseodymium",
        "image": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Praseodymium.jpg"
      },
      {
        "symbol": "Nd",
        "name": "Neodymium",
        "wiki": "https://en.wikipedia.org/wiki/Neodymium",
        "image": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Neodymium2.jpg"
      },
      {
        "symbol": "Eu",
        "name": "Europium",
        "wiki": "https://en.wikipedia.org/wiki/Europium",
        "image": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Europium.jpg"
      },
      {
        "symbol": "Gd",
        "name": "Gadolinium",
        "wiki": "https://en.wikipedia.org/wiki/Gadolinium",
        "image": "https://upload.wikimedia.org/wikipedia/commons/c/c2/Gadolinium-2.jpg"
      },
      {
        "symbol": "Tb",
        "name": "Terbium",
        "wiki": "https://en.wikipedia.org/wiki/Terbium",
        "image": "https://upload.wikimedia.org/wikipedia/commons/9/9a/Terbium-2.jpg"
      },
      {
        "symbol": "Dy",
        "name": "Dysprosium",
        "wiki": "https://en.wikipedia.org/wiki/Dysprosium",
        "image": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Dysprosium.jpg"
      }
    ];

    // block data
    block.data.getElement = function(elementInput) {
      var elementData = null;
      for (var i = 0; i < block.data.elements.length; i++) {
        var element = block.data.elements[i];
        if (element.symbol == elementInput || element.name == elementInput) {
          elementData = element
        }
      }
      return elementData;
    };

    // block page
    block.page.getIndex = function(req, res) {
      var page = app.getPage(req);
      res.render('element/index', { page:page });
    };

    block.page.showElement = function(req, res) {
      var page = app.getPage(req);
      var parameter = tool.getReqParameter(req);
      page.element = block.data.getElement(parameter.name);
      console.log('element data:', page.element);
      res.render('element/detail', { page:page });
    };

    // page route
    app.server.get('/element', block.page.getIndex);
    app.server.get('/element/:name', block.page.showElement);

    return block;
};

