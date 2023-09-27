import mysql from "mysql"

export const db = mysql.createConnection({
    host: "10.54.0.136",
    user: "pedro",
    password: "pedro",
    database: "users_diario_obras"
});