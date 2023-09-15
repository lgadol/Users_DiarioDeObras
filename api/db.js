import mysql from "mysql"

export const db = mysql.createConnection({
    host: "10.54.0.136",
    user: "root",
    password: "09azgope",
    database: "user"
})