module.exports = (sequelize, Sequelize) => {
  const AttendanceLog = sequelize.define("AttendanceLog", {
    clockIn: Sequelize.STRING,
    clockOut: Sequelize.STRING,
    //userID
  });
  return AttendanceLog;
};
