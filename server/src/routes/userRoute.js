const express = require("express");
const router = express.Router();

const userController = require("../controllers").userController;

//get
router.get("/", userController.getAll);
router.get("/:id", userController.getById);

//insert
router.post("/", userController.insertUser);

//update
router.patch("/:id", userController.editUser);

//delete
router.delete("/:id", userController.deleteUser);

//login
router.post("/v1", userController.login);

module.exports = router;
