const db = require("../models");

const companyController = {
  getAll: async (req, res) => {
    const company = await db.Company.findAll();
    console.log(company);
    return res.send(company);
  },
  getById: async (req, res) => {
    const company = await db.Company.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.send(company);
  },

  insertCompany: async (req, res) => {
    try {
      const { name, address } = req.body;
      await db.Company.create({
        name,
        address,
      });
      return await db.Company.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: err.message,
      });
    }
  },
  editCompany: async (req, res) => {
    try {
      const { name, address } = req.body;
      await db.Company.update(
        {
          name,
          address,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return await db.Company.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        msg: err.message,
      });
    }
  },
  deleteCompany: async (req, res) => {
    try {
      await db.Company.destroy({
        where: {
          id: req.params.id,
        },
      });
      return await db.Company.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        msg: err.message,
      });
    }
  },
};

module.exports = companyController;
