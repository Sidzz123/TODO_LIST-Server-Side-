const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const USER = require('../Schema/user');
const bcrypt = require('bcrypt');
const verifyToken = require('../Middleware/auth'); 
const JWT_SECRET = "dev_secret_key";

// ✅ Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await USER.findOne({ email });

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const match = bcrypt.compare(password,user.password);
  if (!match) {
    return res.status(401).json({ error: "Password Incorrect" });
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
  res.cookie('token', token, {
    httpOnly: true,
    secure: false, 
    sameSite: 'Lax',
    maxAge: 86400000
  });

 return res.json({
    message: "Login successful",
    success: true,
    user: {
      _id: user._id,
      email: user.email,
      name: user.name || "", 
    }
  });
});

// ✅ SignUp Route
router.post('/signup', async(req, res) => {
  const { email, password,name } = req.body;
  const user = await USER.findOne({ email });
  if (user) {
    return res.status(401).json({ error: "User already Exits." });
  }
  const save = await USER.create(req.body);
  await save.save();
  res.json({ message: "SignUp Successfull", success: true });
});

// ✅ Logout Route
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: "Logged out", success: true });
});

// ✅ Reset Route
router.post('/reset/:id',verifyToken, async(req, res) => {
  const { Newemail, Newpassword, Newname } = req.body;
  if (!Newemail && !Newpassword && !Newname) {
      return res.status(400).json({ message: 'No update fields provided' });
    }
const user = await USER.findById(req.params.id);

if (!user) {
  return res.status(404).json({ message: "User not found" });
}

if (user._id.toString() !== req.userId) {
  return res.status(403).json({ message: "Unauthorized" });
}
if (Newemail) user.email = Newemail;
if (Newname) user.name = Newname;
if (Newpassword) user.password = Newpassword;

    await user.save();
    res.status(200).json({ message: 'User details updated successfully' });
});

module.exports = router;