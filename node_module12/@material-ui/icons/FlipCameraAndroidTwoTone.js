"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _createSvgIcon = _interopRequireDefault(require("./utils/createSvgIcon"));

var _default = (0, _createSvgIcon.default)(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "1",
  opacity: ".3"
}), _react.default.createElement("path", {
  d: "M9 12c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3zm4 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z"
}), _react.default.createElement("path", {
  d: "M8 8H5.09C6.47 5.61 9.05 4 12 4c3.72 0 6.85 2.56 7.74 6h2.06c-.93-4.56-4.96-8-9.8-8-3.27 0-6.18 1.58-8 4.01V4H2v6h6V8zM16 14v2h2.91c-1.38 2.39-3.96 4-6.91 4-3.72 0-6.85-2.56-7.74-6H2.2c.93 4.56 4.96 8 9.8 8 3.27 0 6.18-1.58 8-4.01V20h2v-6h-6z"
})), 'FlipCameraAndroidTwoTone');

exports.default = _default;