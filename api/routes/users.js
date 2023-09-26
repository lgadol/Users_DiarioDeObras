import express from "express";
import { addUser, getUsers, updateUser, setNull, toggleAtivo, authenticateUser } from "../controllers/user.js";

const router = express.Router();

router.put("/setnull/:id", setNull);

router.put("/toggleativo/:id", toggleAtivo);

router.post("/login", authenticateUser);

router.get("/", getUsers);

router.post("/", addUser);

router.put("/:id", updateUser);

export default router;