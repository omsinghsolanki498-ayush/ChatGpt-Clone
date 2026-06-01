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
  origin: "http://localhost:5173", // frontend connection using cors
  credentials: true,
}));


// MIDDLEWARES
app.use(express.json());  // for json data (middleware)

app.use(express.urlencoded({ extended: true })); 

app.use(cookieParser()); // cookie built after every page check cookie have or not

// ROUTES
app.use("/api/auth", require("./routes/AuthRoutes")); // 1

app.use("/api/chat", require("./routes/ChatRoutes")); // 2


// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});


// SERVER
app.listen(3002, () => {
  console.log("Server running on port 3002");
});