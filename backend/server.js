const express = require("express");
const app = express();
require("dotenv").config();
const dbConnect = require("./Config/db");
const cors = require("cors");
const userRouter = require("./Routes/userRoute");
const postRouter = require("./Routes/postRoute");
const path = require("path");

const { mail } = require("./Controllers/mailController");



dbConnect();

const PORT = process.env.PORT || 8080;

// middleware to config routes
app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded body
app.use(cors({
  origin: "*", // Or use '*' to allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.get("/api/user", (req, res) => {
  res.send("Abhishek");
});

app.use("/api", userRouter);

app.use("/api/post", postRouter);

app.use("/sendmail", mail);

app.listen(PORT, () => {
  console.log("Server Listening at the PORT ", PORT);
});
