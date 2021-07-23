"use strict";

require("regenerator-runtime/runtime");

var _express = _interopRequireDefault(require("express"));

var _promises = _interopRequireDefault(require("fs/promises"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var productos = [{
  title: 'Arroz',
  price: 128.34,
  thumbnail: 'https://bit.ly/3zjJXCh',
  id: 1
}, {
  title: 'Papa',
  price: 200,
  thumbnail: 'https://bit.ly/3zh4584',
  id: 2
}, {
  title: 'Mandarina',
  price: 500.55,
  thumbnail: 'https://bit.ly/3zocqab',
  id: 3
}, {
  title: 'Cebolla',
  price: 150.24,
  thumbnail: 'https://bit.ly/3kIwa42',
  id: 4
}];
var port = 8080;
var app = (0, _express["default"])();
var server = app.listen(port, function () {
  console.log("Server Running in port ".concat(port));
});
server.on('error', function (err) {
  console.log("Hubo el siguiente error: ".concat(err));
});
var visitas1 = 0;
var visitas2 = 0;
app.get('/', function (req, res) {
  visitas1++;
  res.send("Bienvenido navega a traves de las rutas '/items' '/item-random' '/visitas'");
});
app.set('json spaces', 2);
app.get('/items', function (req, res) {
  visitas1++;
  res.json({
    items: productos,
    cantidad: productos.length
  });
});
app.get('/item-random', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var readedFile, jsonParse, randomProduct;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            visitas2++;
            _context.next = 4;
            return _promises["default"].readFile('./productos.txt', 'utf-8');

          case 4:
            readedFile = _context.sent;
            jsonParse = JSON.parse(readedFile);
            randomProduct = jsonParse[Math.floor(Math.random() * jsonParse.length)];
            res.json({
              item: randomProduct
            });
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.get('/visitas', function (req, res) {
  res.json({
    visitas: {
      items: visitas1,
      item: visitas2
    }
  });
});