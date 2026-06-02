require("dotenv").config();

const express = require("express"); // import express
const cors = require("cors"); // for frontend connection
const cookieParser = require("cookie-parser"); // for set cookie in browser
const mongoose = require("mongoose"); 

const app = express();

// DATABASE
mongoose.connect(process.env.MONGO_URI)  // mongoose connection for .env URI
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// CORS

app.use(cors({
  origin: "https://chat-gpt-clone-one-delta.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// MIDDLEWARES
app.use(express.json());  // for json data (middleware)

app.use(express.urlencoded({ extended: true })); 

app.use(cookieParser()); // cookie built after every page check cookie have or not

// ROUTES
app.use("/api/auth", require("./routes/AuthRoutes")); // 1

app.use("/api/chat", require("./routes/chatRoutes")); // 2


// test route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});


// SERVER
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});