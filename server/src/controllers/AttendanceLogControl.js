const db = require("../models");
const Sequelize = require("sequelize");
const moment = require("moment");

const attendanceController = {
  // di page attendancelog
  getByMonthAndUser: async (req, res) => {
    try {
      const { month, year, UserId } = req.body;
      const attendance = await db.AttendanceLog.findAll({
        where: {
          [Sequelize.Op.and]: [
            Sequelize.where(
              Sequelize.fn("MONTH", Sequelize.col("createdAt")),
              month
            ),
            Sequelize.where(
              Sequelize.fn("YEAR", Sequelize.col("createdAt")),
              year
            ),
            { UserId },
          ],
        },
      });

      return res.send({
        value: attendance,
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  // di dashboard
  getToday: async (req, res) => {
    try {
      const { date, UserId } = req.query;
      const attendance = await db.AttendanceLog.findOne({
        where: {
          UserId,
          createdAt: {
            [Sequelize.Op.gt]: date,
            [Sequelize.Op.lte]: moment(date).add(1, "d").format("yyyy-MM-DD"),
          },
        },
      });
      console.log(attendance);

      return res.send(attendance);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  // clock in & clock out
  createAttendance: async (req, res) => {
    try {
      const { UserId, clock_in, clock_out } = req.body;
      const now = moment().format("yyyy-MM-DD");

      console.log(req.body);

      await db.sequelize.transaction(async () => {
        const cek = await db.AttendanceLog.findOne({
          where: {
            UserId,
            createdAt: {
              [Sequelize.Op.gt]: now,
              [Sequelize.Op.lte]: moment(now).add(1, "d").format("yyyy-MM-DD"),
            },
          },
        });
        console.log(cek);

        if (cek && clock_out)
          await db.AttendanceLog.update(
            { clock_out },
            { where: { id: cek.dataValues.id } }
          );
        else if (!cek && clock_in)
          await db.AttendanceLog.create({ clock_in, UserId });

        await db.AttendanceLog.findOne({
          where: {
            createdAt: {
              [Sequelize.Op.gt]: now,
              [Sequelize.Op.lte]: moment(now).add(1, "d").format("yyyy-MM-DD"),
            },
            UserId,
          },
        }).then((result) => res.send(result));
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  },
};

module.exports = attendanceController;
