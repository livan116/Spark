const express = require('express');

const {check,validationResult} = require('express-validator');

const {registerUser,loginUser,updateUser} = require('../Controllers/user.controller')
const auth = require('../Middleware/auth.middleware');

const router = express.Router();

router.post(
    "/register",
    [
      check("firstname", "Name is required").not().isEmpty(),
      check("email", "Please include a valid email").isEmail(),
      check("password", "Password must be atleast 6 characters").isLength({
        min: 6,
      }),
    ],
    registerUser
  );
  
  router.post("/login", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],loginUser);

  router.put('/update-user',auth,updateUser)
  

  module.exports = router;