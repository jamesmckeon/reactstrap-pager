(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["reactstrap-table"] = factory();
	else
		root["reactstrap-table"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return webpackJsonpreactstrap_table([1],{

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColumnDef", function() { return ColumnDef; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap_pager__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap_pager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reactstrap_pager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reactstrap__ = __webpack_require__(24);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var ColumnDef = {
  sortable: false,
  headerText: ""
};

var CenteredText = function CenteredText(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "div",
    { className: "text-center font-italic" },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("hr", null),
    " ",
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "h5",
      null,
      props.text
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("hr", null)
  );
};

var ReactstrapTable = function (_React$Component) {
  _inherits(ReactstrapTable, _React$Component);

  function ReactstrapTable(props, context) {
    _classCallCheck(this, ReactstrapTable);

    var _this = _possibleConstructorReturn(this, (ReactstrapTable.__proto__ || Object.getPrototypeOf(ReactstrapTable)).call(this, props, context));

    _this.getColumns = _this.getColumns.bind(_this);
    _this.getBody = _this.getBody.bind(_this);
    return _this;
  }

  _createClass(ReactstrapTable, [{
    key: "getColumns",
    value: function getColumns() {
      //no columndefs provided, use first row in data
      var row = this.props.data[0];

      return Object.keys(row).map(function (r) {
        return { header: r, clickable: false };
      });
    }
  }, {
    key: "getBody",
    value: function getBody() {
      return this.props.data.map(function (row) {
        return Object.keys(row).map(function (key) {
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "td",
            null,
            row[key]
          );
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return !this.props.hidden && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          null,
          "(this.props.data && this.props.data.length > 0 &&",
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_3_reactstrap__["a" /* Table */],
            this.props,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "thead",
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "tr",
                null,
                this.getColumns.map(function (c) {
                  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "th",
                    null,
                    c.header
                  );
                })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "tbody",
              null,
              this.getBody()
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_reactstrap_pager___default.a, null),
        ") (!this.props.data || this.props.data.length === 0 &&",
        " ",
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CenteredText, { text: "No records" }),
        ")"
      );
    }
  }]);

  return ReactstrapTable;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (ReactstrapTable);


ReactstrapTable.propTypes = {
  hidden: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};

/***/ })

},[15]);
});