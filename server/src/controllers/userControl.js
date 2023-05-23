const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const private_key = process.env.private_key;
const { nanoid } = require("nanoid");
const moment = require("moment");
const mailer = require("../lib/mailer");
const url = process.env.URL;

const userController = {
  //register
  register: async (req, res) => {
    try {
      const { email, password, name, CompanyId, address } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      console.log(hashPassword);

      await db.User.create({
        email,
        password: hashPassword,
        name,
        address,
        CompanyId,
      });

      return res.send({
        message: "register berhasil",
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },

  //login menggunakan JWT
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await db.User.findOne({
        where: {
          email,
        },
      });

      if (user) {
        const match = await bcrypt.compare(password, user.dataValues.password);
        if (match) {
          const payload = {
            id: user.dataValues.id,
          };
          const token = jwt.sign(payload, private_key, {
            expiresIn: "1h",
          });

          console.log(token);

          return res.send({
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

  //login menggunakan nanoid
  loginV2: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await db.User.findOne({
        where: {
          email,
        },
      });

      if (user) {
        const match = bcrypt.compare(password, user.dataValues.password);
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

          console.log(token);

          return res.send({
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
      // console.log(err.message);
      return res.status(500).send({ message: err.message });
    }
  },

  // option pilihan company di register
  getCompanies: async (req, res) => {
    await db.Company.findAll().then((data) => res.send(data));
  },

  //get token JWT
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

  //get token nanoid
  getByTokenV2: async (req, res, next) => {
    try {
      const { token } = req.query;
      console.log(token);
      let p = await db.Token.findOne({
        where: {
          token,
          expired: {
            [db.Sequelize.Op.gte]: moment().format(),
          },
          valid: true,
        },
      });

      if (!p) {
        throw new Error("token has expired");
      }
      console.log(p.dataValues);
      user = await db.User.findOne({
        where: {
          id: JSON.parse(p.dataValues.payload).id,
        },
      });

      delete user.dataValues.password;

      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: err.message });
    }
  },

  //
  getUserByToken: async (req, res) => {
    res.send(req.user);
  },

  // mengirimkan token ke email user
  generateTokenByEmail: async (req, res) => {
    try {
      const { email } = req.query;

      const user = await db.User.findOne({
        where: {
          email,
        },
      });

      if (user.dataValues) {
        await db.Token.upate(
          {
            valid: false,
          },
          {
            where: {
              payload: JSON.stringify({ id: user.dataValues.id }),
              status: "FORGOT-PASSWORD", // {"id": 1}
            },
          }
        );

        const generateToken = nanoid();
        const token = await db.Token.create({
          expired: moment().add(5, "minutes").format(),
          token: generateToken,
          payload: JSON.stringify({ id: user.dataValues.id }),
          status: "FORGOT - PASSWORD",
        });

        mailer({
          subject: "hello",
          to: "fahminurk31@gmail.com",
          text: url + token.dataValues.token,
        });

        return res.send({ message: "silahkan check email anda" });
      } else {
        throw new Error("user not found");
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  //change password
  changePassword: async (req, res) => {
    try {
      const { token } = req.query;
      const { password } = req.body.user;
      const { id } = req.user;

      console.log(id);

      const hashPassword = await bcrypt.hash(password, 10);

      await db.User.update({ password: hashPassword }, { where: { id } });
      await db.Token.update({ valid: false }, { where: { token } });
      res.send({ message: "password berhasil diubah" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};

module.exports = userController;
