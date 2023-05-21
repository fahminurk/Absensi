const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const private_key = process.env.private_key;
const { nanoid } = require("nanoid");
const moment = require("moment");

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

  getByToken: async (req, res) => {
    const { token } = req.query;

    let user = jwt.verify(token, private_key);
    user = await db.User.findOne({
      where: {
        id: user.id,
      },
    });
    delete user.dataValues.password;

    res.send(user);
  },
  getByTokenV2: async (req, res) => {
    try {
      const { token } = req.query;

      let payload = await db.Token.findOne({
        where: {
          token,
          expired: {
            [db.Sequelize.Op.gt]: moment(),
            [db.Sequelize.Op.lte]: moment().add(1, "d"),
          },
        },
      });

      user = await db.User.findOne({
        where: {
          id: JSON.parse(payload.dataValues.payload).id,
        },
      });
      delete user.dataValues.password;

      res.send(user);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
  insertUser: async (req, res) => {
    try {
      const { name, address, email, password, company_id } = req.body;

      const hashPassword = await bcrypt.hash(password, 10);
      console.log(hashPassword);

      await db.User.create({
        name,
        address,
        email,
        password: hashPassword,
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
        },
      });
      console.log(user);
      if (user) {
        const match = await bcrypt.compare(password, user.dataValues.password);

        if (match) {
          const payload = {
            id: user.dataValues.id,
          };
          console.log(private_key);
          const token = jwt.sign(payload, private_key, {
            expiresIn: "1h",
          });

          console.log(token);

          return res.status(200).send({
            message: "login berhasil",
            value: user,
            token,
          });
        } else {
          throw new Error("wrong password");
        }
      } else {
        throw new Error("user not found");
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    }
  },
  loginV2: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await db.User.findOne({
        where: {
          email,
        },
      });
      console.log(user);
      if (user) {
        const match = await bcrypt.compare(password, user.dataValues.password);

        if (match) {
          const payload = {
            id: user.dataValues.id,
          };

          const generateToken = nanoid();
          console.log(nanoid());
          const token = await db.Token.create({
            expired: moment().add(1, "days").format(),
            token: generateToken,
            payload: JSON.stringify(payload),
          });

          return res.status(200).send({
            message: "login berhasil",
            value: user,
            token: token.dataValues.token,
          });
        } else {
          throw new Error("wrong password");
        }
      } else {
        throw new Error("user not found");
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    }
  },

  // login: async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  //     console.log(req.body);
  //     const user = await db.User.findOne({
  //       where: {
  //         email,
  //         password,
  //       },
  //     });

  //     if (!user?.dataValues.id) {
  //       // return res.send({
  //       //   message: "login gagal",
  //       // });
  //       return res.status(210).send({
  //         message: "email/password salah",
  //         value: user,
  //       });
  //     }
  //     return res.status(200).send({
  //       message: "login berhasil",
  //       value: user,
  //     });
  //   } catch (err) {
  //     console.log(err.message);
  //     return res.status(500).send(err.message);
  //   }
  // },
};

module.exports = userController;
