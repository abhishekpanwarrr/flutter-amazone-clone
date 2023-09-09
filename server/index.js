// Package imports
const express = require("express")
const mongoose = require("mongoose")

// File imports
const authRouter = require("./routes/auth")

// INIt
const PORT = 3000;
const app = express()
// 
mongoose.connect().then(() => console.log("mongo db connected successfully")).catch(e => console.log("error in connecting mongodb", e))

// Middleware
app.use(authRouter)


app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));