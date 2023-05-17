const db = require("../models");

const AttendanceLogController = {
  getAll: async (req, res) => {
    const AttendanceLog = await db.AttendanceLog.findAll();
    console.log(AttendanceLog);
    return res.send(AttendanceLog);
  },
  getById: async (req, res) => {
    const AttendanceLog = await db.AttendanceLog.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.send(AttendanceLog);
  },

  insertAttendanceLog: async (req, res) => {
    try {
      const { checkIn, checkOut } = req.body;
      await db.AttendanceLog.create({
        checkIn,
        checkOut,
      });
      return await db.AttendanceLog.findAll().then((result) => {
        res.send({
          msg: `new AttendanceLog added`,
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
  editAttendanceLog: async (req, res) => {
    try {
      const { checkIn, checkOut } = req.body;
      await db.AttendanceLog.update(
        {
          checkIn,
          checkOut,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return await db.AttendanceLog.findOne({
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
  deleteAttendanceLog: async (req, res) => {
    try {
      await db.AttendanceLog.destroy({
        where: {
          id: req.params.id,
        },
      });
      return await db.AttendanceLog.findAll().then((result) =>
        res.send({
          msg: `ID ${req.params.id} has been removed`,
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
};

module.exports = AttendanceLogController;
