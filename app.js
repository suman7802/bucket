require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const parser = require("body-parser");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/users.route");
const bucketRoutes = require("./routes/buckets.route");
const validateToken = require("./middleware/validateToken");
const authenticationRoute = require("./routes/authentication.route");

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    exposedHeaders: ["set-cookie"],
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(parser.urlencoded({extended: true}));

app.use("/", authenticationRoute); // Authentication route
app.use("/api/users", validateToken, userRoutes); // User routes
app.use("/api/buckets", validateToken, bucketRoutes); // on working

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
