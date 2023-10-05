"use strict";

var _express = _interopRequireDefault(require("express"));
var _users = _interopRequireDefault(require("./routes/users.js"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
app.use(_express.default.json());
app.use((0, _cors.default)());
app.use("/", _users.default);
app.listen(8800);