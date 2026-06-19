const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB =
require("./config/db");

const employeeRoutes =
require("./routes/employeeRoutes");

const attendanceRoutes =
require("./routes/attendanceRoutes");

const leaveRoutes =
require("./routes/leaveRoutes");

const adminRoutes =
require("./routes/adminRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   ROUTES
========================= */

app.use(
  "/api/employees",
  employeeRoutes
);

app.use(
  "/api/attendance",
  attendanceRoutes
);

app.use(
  "/api/leaves",
  leaveRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/uploads",
  express.static(
    "uploads"
  )
);

/* =========================
   ROOT ROUTE
========================= */

app.get("/", (req, res) => {
  res.send(
    "UCO ATS API Running"
  );
});

/* =========================
   SERVER START
========================= */

const PORT =
  process.env.PORT || 5000;

  console.log("ATS VERSION 2");

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});