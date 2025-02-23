
const User = require('../Models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator')

//Register a new user

exports.registerUser = async(req,res) => {
    console.log("hello")
    const {firstname,lastname,email,password} = req.body;

    //validation results
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }

    try{
        //check if user already exists
    
        let user = await User.findOne({email})
        console.log(user)
        if(user){
            return res.status(400).json({success:false,message:"User Already Exists"});
        }

        //hash password before pushing to db
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        console.log(firstname)
        user = new User({
            firstname,
            lastname,
            email,
            password:hashedPassword
        })
        console.log(user)
        await user.save();
        res.status(200).json({success:true,message:"User Register Successfully"});
    }
    catch{
        res.status(500).json({success:false,message:"Server Error"});
    }
}

//login user

exports.loginUser = async(req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
        res.status(404).json({success:false, message:"Please provide email and password"});
    }
    try{
        const user = await User.findOne({email})
    if(!user){
        res.status(400).json({sucess:false, message:"User not found"});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        res.status(404).json({success:false,message:"Invalid Credentials"})
    }

    //if everything is correct, generate token and send 
    const token = jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET);

    res.status(200).json({success:true,message:"Login Successfull!",token})
    }
    catch{
        res.status(500).json({success:false,message:"Server Error"});
    }
}


exports.getUser = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };

  exports.updateUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const userId = req.user.id; //extracted from token via middleware
    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
      }
  
      //update name if provided
      if (firstname && firstname !== user.firstname) {
        user.firstname = firstname;
      }
      if (lastname && lastname !== user.lastname) {
        user.lastname = lastname;
      }
  
      //update email if provided
  
      if (email && email !== user.email) {
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
          return res
            .status(400)
            .json({ success: false, message: "Email already in use" });
        }
        user.email = email;
      }
  
      //if number is provided

      console.log(user.password)
  
      if (password && mobile !== user.mobile) {
        const existingMobile = User.findOne({ mobile });
        if (existingMobile) {
          res
            .status(400)
            .json({ success: false, message: "Mobile already in use" });
        }
        user.mobile = mobile;
      }
  
      await user.save();
      res.status(200).json({success:true,message:"User updated successfully"})
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  
  exports.deleteUser = async (req,res) =>{
      const userId = req.user.id;
      try{
          const user = await User.findByIdAndDelete(userId);
          if(!user){
              return res.status(404).json({success:false,message:"User not found"});
          }
          return res.status(200).json({success:true,message:"User deleted successfully"})
      }
      catch(error){
          return res.status(500).json({success:false,message:"Sever Error"})
      }
  }

