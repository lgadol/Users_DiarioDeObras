import express from "express";
import { addUser, cleanPassword, deleteUser, getUsers, updateUser } from "../controllers/user.js";

const router = express.Router()

router.get("/", getUsers)

router.post("/", addUser)

router.put("/:id", updateUser)

router.put("/:id", deleteUser)

router.post("/:id", cleanPassword)

export default router