const express = require("express");
const app = express();
let { validateUser } = require("../middlewares/user-validation")
app.use(express.json())
const userController = require("../controllers/user.controllers");
const { authorize } = require("../controllers/auth.controller")

// Tambahkan semua endpoint di sini
app.post("/",  userController.addUser); // Untuk menambah user
app.put("/:id", [authorize], userController.updateUser); // Untuk update user
app.get("/:id", [authorize], userController.getUserById); // Untuk mendapatkan user by ID
app.delete("/:id", [authorize], userController.deleteUser); // Untuk delete user by ID

module.exports = app;
