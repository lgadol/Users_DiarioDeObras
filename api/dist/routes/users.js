"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = require("../controllers/user.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.put("/setnull/:id", _user.setNull);
router.put("/toggleativo/:id", _user.toggleAtivo);
router.post("/login", _user.authenticateUser);
router.get("/", _user.getUsers);
router.post("/", _user.addUser);
router.put("/:id", _user.updateUser);
var _default = exports.default = router;