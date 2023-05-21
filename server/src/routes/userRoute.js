const express = require("express");
const router = express.Router();

const userController = require("../controllers").userController;

//get
router.get("/", userController.getAll);
router.get("/:id", userController.getById);

//insert
router.post("/", userController.insertUser); //register

//update
router.patch("/:id", userController.editUser);

//delete
router.delete("/:id", userController.deleteUser);

//login
router.post("/v1", userController.login); //login
router.post("/v2", userController.loginV2);

//token
router.get("/token", userController.getByToken);
router.get("/token2", userController.getByTokenV2);

module.exports = router;
