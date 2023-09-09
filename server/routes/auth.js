const express = require("express");
const User = require("../model/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")

const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
  try {
    // get data from client
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    let user = new User({
      name,
      email,
      password: hashedPassword,
    });
    user = await user.save();
    return res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

authRouter.post('/api/signin', async (req, res) => {
  try {
    const {email,password} =req.body;
    const user = await User.findOne({ email });
    if(!user){
      return res.status(404).json({msg: "User not found"})
    }
    const isMatched = await bcryptjs.compare(password,user.password)

    if(!isMatched){
      return res.status(404).json({msg: "Incorrect password"})
    }
    const token = jwt.sign({id:user?._id},"passwordKey");
    res.status(200).json({token,...user._doc})

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


module.exports = authRouter;
