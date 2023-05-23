const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers").attendanceLogController;

router.post("/", attendanceController.getByMonthAndUser);

router.post("/v1", attendanceController.createAttendance);
router.get("/", attendanceController.getToday);

module.exports = router;

// const express = require("express");
// const router = express.Router();

// const attendanceLogController =
//   require("../controllers").attendanceLogController;

// //get
// router.get("/", attendanceLogController.getAll);
// router.get("/:id", attendanceLogController.getById);
// router.get("/check/:id", attendanceLogController.getTheId);

// //insert
// router.post("/", attendanceLogController.insertAttendanceLog);

// //update
// router.patch("/:id", attendanceLogController.editAttendanceLog);

// //delete
// router.delete("/:id", attendanceLogController.deleteAttendanceLog);

// module.exports = router;
