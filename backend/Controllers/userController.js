import bcrypt from 'bcryptjs';
import User from '../Models/userSchema.js';
import jwt from 'jsonwebtoken';

export const userRegister = async (req, res) => {
  try {
    const {  username, email, gender, password, profilepic } = req.body;

if(!username || !email || !password){
  return res.status(403).json({success:false, message:"All fields required"});
}

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    // check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // profile pic
    const defaultPic =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // create user
    const newUser = await User.create({
      username,
      email,
      gender,
      password: hashedPassword,
      profilepic: profilepic || defaultPic
    });

    res.status(201).json({
      message:"User Created Successfully",
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      profilepic: newUser.profilepic
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error:error.message
    });
  }
};





export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({success:false, message:"All fields required"});
        }

        const user=await User.findOne({email});
        if(!user){
            return res.status(403).json({success:false,message:"Invalid Credentials"})
        }

        const matchPassword=await bcrypt.compare(password,user.password);
        if(!matchPassword){
            return res.status(403).json({success:false,message:"Invalid Credentials"});
        }

        const token=jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        )

        res.status(200).json({success:true,message:"Login Successfully", token,user})
    } catch (error) {
      console.log(error);
      
        res.status(500).json({success:false,error:error.message})
    }
}





