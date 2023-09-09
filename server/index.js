// Package imports
const express = require("express");
const mongoose = require("mongoose");

// File imports
const authRouter = require("./routes/auth");

// INIt
const PORT = 3000;
const MONGODB_URI =
  "mongodb+srv://abhishekpanwarrr:P5rtS1DTK96gtujj@cluster0.s1tbtl9.mongodb.net/?retryWrites=true&w=majority";
const app = express();
//
mongoose
  .connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Set a longer timeout here (in milliseconds)
  })
  .then(() => console.log("mongo db connected successfully"))
  .catch((e) => console.log("error in connecting mongodb", e));

// Middleware
app.use(express.json())
app.use(authRouter);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
