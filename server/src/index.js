const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const PORT = process.env.PORT;
const db = require("./models/");
const routes = require("./routes");

// const Branch = db.Branch;
// const Lecturer = db.Lecturer;
// Lecturer.sync();
// db.Branch.sync({ alter: true });

db.sequelize.sync({ alter: true });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("sequelize"));

app.use("/users", routes.userRoutes);
app.use("/attendanceLogs", routes.attendanceLogRoutes);
app.use("/companies", routes.companyRoutes);

app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`);
});
