const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require("../passport");

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }) // ✅ This is now cleanly scoped
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    // console.log(token);
    

    // Send JWT to frontend (update to match your front-end logic)

    res.redirect(`https://foody-app-frontend.onrender.com/dashboard?token=${token}`);
  }
);

module.exports = router;