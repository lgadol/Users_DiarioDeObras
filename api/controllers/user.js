import { db } from "../db.js";
import jwt from 'jsonwebtoken';

export const getUsers = (_, res) => {
  const q = "SELECT * FROM user";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO user(`admin`, `ativo`, `ma`, `nome`, `email`) VALUES(?)";

  const values = [
    req.body.admin,
    req.body.ativo,
    req.body.ma,
    req.body.nome,
    req.body.email,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE user SET `admin` = ?, `ativo` = ?, `ma` = ?, `nome` = ?, `email` = ? WHERE `id` = ?";

  const values = [
    req.body.admin,
    req.body.ativo,
    req.body.ma,
    req.body.nome,
    req.body.email,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const setNull = (req, res) => {
  const q = "UPDATE user SET `s` = NULL WHERE `id` = ?";
  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Senha resetada com sucesso.");
  });
};

export const toggleAtivo = (req, res) => {
  const q = "UPDATE user SET `ativo` = IF(`ativo`='true', 'false', 'true') WHERE `id` = ?";
  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Usuário (ativado/desativado) com sucesso.");
  });
};

export const authenticateUser = (req, res) => {
  const { ma, s } = req.body;
  const q = "SELECT * FROM user WHERE `ma` = ? AND `s` = ? AND `admin` = 'true'";
  db.query(q, [ma, s], (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0) {
      const token = jwt.sign({ ma }, '%%password.for.authentication.DdO.users%%');
      return res.status(200).json({ token });
    } else {
      return res.status(401).json("Usuário sem permissão.");
    }
  });
};