import { db } from "../db.js";

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

export const deactiveUser = (req, res) => {
  const d = `UPDATE user SET ativo = IF(ativo == "true", "false", "true") WHERE id = ?`;

  db.query(d, [req.params.id], (err, result) => {
    if (err) return res.json(err);
    
    return res.status(200).json("Usuário ativado/desativado com sucesso.");
  });
};

export const cleanPassword = (req, res) => {
  const s = "UPDATE user SET s = NULL WHERE id = ?";

  db.query(s, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Senha resetada com sucesso.");
  });
};
