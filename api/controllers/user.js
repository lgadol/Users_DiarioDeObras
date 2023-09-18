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

export const deleteUser = (req, res) => {
  const q = `UPDATE user SET ativo = IF(ativo = "true", "false", "true") WHERE id = ?`;

  db.query(q, [req.params.id], (err, result) => {
    if (err) return res.json(err);
    // fazer outra consulta para obter o valor de ativo
    const q2 = `SELECT ativo FROM user WHERE id = ?`;
    db.query(q2, [req.params.id], (err2, result2) => {
      if (err2) return res.json(err2);
      // enviar o resultado como JSON
      res.json(result2);
    });
  });
};


export const cleanPassword = (req, res) => {
  const q = "UPDATE user SET s = NULL WHERE id = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Senha resetada com sucesso.");
  });
};


/* app.put('/desativar_usuario/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE user SET ativo = IF(ativo = "true", "false", "true") WHERE id = ?`;

  crudProjectCONN.query(sql, [id], (err, result) => {
    if (err) throw err;
    // fazer outra consulta para obter o valor de ativo
    const sql2 = `SELECT ativo FROM user WHERE id = ?`;
    crudProjectCONN.query(sql2, [id], (err2, result2) => {
      if (err2) throw err2;
      // enviar o resultado como JSON
      res.json(result2);
    });
  });
}); */
