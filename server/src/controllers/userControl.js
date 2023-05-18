const db = require("../models");

const userController = {
  getAll: async (req, res) => {
    try {
      const user = await db.User.findAll({
        include: [{ model: db.Company, as: "Company" }],
      });
      console.log(user);
      return res.send(user);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(user);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  insertUser: async (req, res) => {
    try {
      const { name, address, email, password, company_id } = req.body;
      await db.User.create({
        name,
        address,
        email,
        password,
        company_id,
      });
      return res.send({
        message: "register berhasil",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  editUser: async (req, res) => {
    try {
      const { name, address, email, password } = req.body;
      await db.User.update(
        {
          name,
          address,
          email,
          password,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return await db.User.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) =>
        res.send({
          message: `ID ${req.params.id} has been updated`,
          data: result,
        })
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await db.User.destroy({
        where: {
          id: req.params.id,
        },
      });
      return await db.User.findAll().then((result) =>
        res.send({
          message: `ID ${req.params.id} has been removed`,
          data: result,
        })
      );
    } catch (err) {}
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await db.User.findOne({
        where: {
          email,
          password,
        },
      });

      if (!user?.dataValues.id) {
        return res.send({
          message: "login gagal",
        });
      }
      return res.send({
        message: "login berhasil",
        value: user,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
};

module.exports = userController;
