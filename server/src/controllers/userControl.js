const db = require("../models");

const userController = {
  getAll: async (req, res) => {
    try {
      const user = await db.User.findAll();
      console.log(user);
      return res.send(user);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: err.message,
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
        msg: err.message,
      });
    }
  },
  insertUser: async (req, res) => {
    try {
      const { name, address, email, password } = req.body;
      await db.User.create({
        name,
        address,
        email,
        password,
      });
      return await db.User.findAll().then((result) => {
        res.send({
          msg: `new user added`,
          data: result,
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: err.message,
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
          msg: `ID ${req.params.id} has been updated`,
          data: result,
        })
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: err.message,
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
          msg: `ID ${req.params.id} has been removed`,
          data: result,
        })
      );
    } catch (err) {}
  },
};

module.exports = userController;
