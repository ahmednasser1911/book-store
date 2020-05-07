const User = require("../models/User");
const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

// register user
router.post("/", async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({msg:"User Already Exists!"})
      }
      user = new User(req.body)

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();
    const token = jwt.sign(
      { _id: user._id.toString() },
      config.get("jwtSecret")
    );
    //console.log(token)
    res.json({ user, token });
  } catch (error) {
    //console.error(error.message);
    //console.error(error.errors.reason);
    
    res.status(400).send(error.message);
  }
});

// login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    //console.log(user)
    if (!user) {
      return res.status(400).json({msg:"Invalid Credentials!"})
    }
    const match = await bcrypt.compare(password, user.password);
    //console.log(match)
    if (!match) {
      return res.status(400).json({msg:"Invalid Credentials!"})
      //throw new Error("Unable to login!");
    }

    const token = jwt.sign(
        { _id: user._id.toString() },
        config.get("jwtSecret")
      );
      //console.log(token)

    res.json({ user, token });
  } catch (error) {
    console.error(error.message);
    res.status(400);
  }
});

// get logged user
router.get("/", auth, async (req, res) => {
  try {
    const token = jwt.sign(
        { _id: req.user._id.toString() },
        config.get("jwtSecret")
      );
      console.log(token)
      const user = req.user
    res.json({user ,token });
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error);
  }
});

// logout user from front end

// update user
router.patch("/", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];

  const isValidOperator = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperator) {
    return res.status(400).send({ error: "Invalid Operator!" });
  }

  try {
    updates.forEach(update => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete user
router.delete("/", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;