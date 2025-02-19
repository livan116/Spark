
const User = require('../Models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator')

//Register a new user

exports.registerUser = async(req,res) => {
    const {firstname,lastname,email,password} = req.body;

    //validation results
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }

    try{
        //check if user already exists
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({success:false,message:"User Already Exists"});
        }

        //hash password before pushing to db
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        user = new User({
            firstname,
            lastname,
            email,
            password:hashedPassword
        })

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
    const token = jwt.sign(user.email,process.env.JWT_SECRET)
    res.status(200).json({success:true,message:"Login Successfull!",token})
    }
    catch{
        res.status(500).json({success:false,message:"Server Error"});
    }
}

