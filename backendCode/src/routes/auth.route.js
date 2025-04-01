import express from "express";
const { signup, login, logout } = require("../controllers/auth.controllers.js");
const router = express.Router();

router.post("/signup", signup );
router.post("/login", login );
router.post("/logout", logout );


export default router;