"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.toggleAtivo = exports.setNull = exports.getUsers = exports.authenticateUser = exports.addUser = void 0;
var _db = require("../db.js");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getUsers = (_, res) => {
  const q = "SELECT * FROM user";
  _db.db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};
exports.getUsers = getUsers;
const addUser = (req, res) => {
  const q = "INSERT INTO user(`admin`, `ativo`, `ma`, `nome`, `email`) VALUES(?)";
  const values = [req.body.admin, req.body.ativo, req.body.ma, req.body.nome, req.body.email];
  _db.db.query(q, [values], err => {
    if (err) return res.json(err);
    return res.status(200).json("Usuário criado com sucesso.");
  });
};
exports.addUser = addUser;
const updateUser = (req, res) => {
  const q = "UPDATE user SET `admin` = ?, `ativo` = ?, `ma` = ?, `nome` = ?, `email` = ? WHERE `id` = ?";
  const values = [req.body.admin, req.body.ativo, req.body.ma, req.body.nome, req.body.email];
  _db.db.query(q, [...values, req.params.id], err => {
    if (err) return res.json(err);
    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};
exports.updateUser = updateUser;
const setNull = (req, res) => {
  const q = "UPDATE user SET `s` = NULL WHERE `id` = ?";
  _db.db.query(q, [req.params.id], err => {
    if (err) return res.json(err);
    return res.status(200).json("Senha resetada com sucesso.");
  });
};
exports.setNull = setNull;
const toggleAtivo = (req, res) => {
  const q = "UPDATE user SET `ativo` = IF(`ativo`='true', 'false', 'true') WHERE `id` = ?";
  _db.db.query(q, [req.params.id], err => {
    if (err) return res.json(err);
    return res.status(200).json("Usuário (ativado/desativado) com sucesso.");
  });
};
exports.toggleAtivo = toggleAtivo;
const authenticateUser = (req, res) => {
  const {
    ma,
    s
  } = req.body;
  const q = "SELECT * FROM user WHERE `ma` = ? AND `s` = ?";
  _db.db.query(q, [ma, s], (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0) {
      if (data[0].admin !== 'true') {
        return res.status(401).json("Usuário sem permissão.");
      }
      const token = _jsonwebtoken.default.sign({
        ma
      }, '%%password.for.authentication.DdO.users%%');
      return res.status(200).json({
        token,
        nome: data[0].nome
      });
    } else {
      return res.status(401).json("MA ou Senha incorretos!");
    }
  });
};
exports.authenticateUser = authenticateUser;