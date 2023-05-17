const express = require("express");
const router = express.Router();

const companyController = require("../controllers").companyController;

//GET

router.get("/", companyController.getAll);
router.get("/:id", companyController.getById);

//INSERT
router.post("/", companyController.insertCompany);

//EDIT
router.patch("/:id", companyController.editCompany);

//DELETE
router.delete("/:id", companyController.deleteCompany);

module.exports = router;
