const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const private_key = process.env.private_key;
const { nanoid } = require("nanoid");
const moment = require("moment");
const mailer = require("../lib/mailer");
const url = process.env.URL;
const url_image = process.env.URL_IMAGE;

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

  //login menggunakan JWT (tidak di gunakan)
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
      const { email, password } = req.body; // di FE ada inputan email dan password di req.body
      const user = await db.User.findOne({
        where: {
          email,
        },
      });

      if (user) {
        // jika email yg di input ada di database maka..
        const match = bcrypt.compare(password, user.dataValues.password); //kita cocokan pass yg di input dengan pass yg ada di database
        if (match) {
          // jika cocok
          const payload = {
            //membuat sebuah variable payload yg berisi id dari email tersebut
            id: user.dataValues.id,
          };

          const generateToken = nanoid();
          console.log(nanoid());
          const token = await db.Token.create({
            // lalu membuat token untuk disimpan di localstoragedi db token yg berisi...
            expired: moment().add(5, "minutes").format(), //membuat expired token tersebut
            token: generateToken, //token menggunakan generate dari nanoid
            payload: JSON.stringify(payload), //payload {id: 'id user yg login'}
          });

          console.log(token);

          return res.send({
            // lalu kita menggirimkan respon berupa..
            message: "login berhasil", // message
            value: user, // value yg berisi data2 user tersbut
            token: token.dataValues.token, // dan token yg sudah di generate
          });
        } else {
          throw new Error("wrong password"); // jika pass salah menggirimkan res error
        }
      } else {
        throw new Error("user not found"); // jika user tidak ada di db, meggirimkan ress error
      }
    } catch (err) {
      // console.log(err.message);
      return res.status(500).send({ message: err.message });
    }
  },

  // option pilihan company di register
  getCompanies: async (req, res) => {
    await db.Company.findAll().then((data) => res.send(data)); // menggambil semua data company di db.company
  },

  //get token JWT (tidak digunakan)
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

  //get token nanoid (dipake di forget password)   !! tanya bwang jordan !!
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

  // !! tanya bwang jordan !!
  getUserByToken: async (req, res) => {
    res.send(req.user);
  },

  // mengirimkan token ke email user  !! tanya bwang jordan !!
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

  //change password  !! tanya bwang jordan !!
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
  uploadAvatar: async (req, res) => {
    const { filename } = req.file;

    await db.User.update(
      {
        avatar_url: url_image + filename,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    await db.User.findOne({
      where: {
        id: req.params.id,
      },
    }).then((result) => res.send(result));

    // res.send(filename);
  },
};

module.exports = userController;
