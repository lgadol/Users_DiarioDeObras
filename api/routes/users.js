import express from "express";
import { addUser, cleanPassword, deactiveUser, getUsers, updateUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);

router.post("/", addUser);

router.put("/:id", updateUser);

router.put("/deactivate/:id", deactiveUser);

router.put("/api/cleanPassword/:id", cleanPassword);

export default router;