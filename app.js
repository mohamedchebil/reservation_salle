const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const user = require("./routes/user");
const room = require("./routes/room");
const reservation = require("./routes/reservation")
//const cookieParser = require("cookie-parser");
//const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();
dotenv.config();
app.use(express.json());
//app.use(cookieParser());
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connect to mongoDb");
    app.listen(PORT, () => {
      console.log("server is running on 5000");
    });
  })
  .catch((err) => {
    console.error("error connecting to mongoDb:", err.message);
  });

/*app.get("*", checkUser);*/
app.use(user)
app.use(room)
app.use(reservation)