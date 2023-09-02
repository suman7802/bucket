require("dotenv").config();
const path = require("path");
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

const {Server} = require("socket.io");
const {createServer} = require("http");
const httpServer = createServer(app);
const io = new Server(httpServer);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    console.log(`Received message from ${socket.id}\n${data}`);
    io.emit("message", `${socket.id} sends message: ${data}`);
  });
});

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

app.use("/", authenticationRoute);
app.use("/api/users", validateToken, userRoutes);
app.use("/api/buckets", validateToken, bucketRoutes);

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = io;
