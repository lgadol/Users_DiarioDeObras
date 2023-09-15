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
    "INSERT INTO user(`admin`, `ativo`, `ma`, `nome`) VALUES(?)";

  const values = [
    req.body.admin,
    req.body.ativo,
    req.body.ma,
    req.body.nome,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE user SET `admin` = ?, `ativo` = ?, `ma` = ?, `nome` = ? WHERE `id` = ?";

  const values = [
    req.body.admin,
    req.body.ativo,
    req.body.ma,
    req.body.nome,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM user WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};
