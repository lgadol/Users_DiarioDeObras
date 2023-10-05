"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;
var _mysql = _interopRequireDefault(require("mysql"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const db = exports.db = _mysql.default.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});