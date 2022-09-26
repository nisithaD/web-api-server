const User=require('../models/user');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const JWT_SECRET="supersecret_dont_share";

const register=async (req,res)=>{
    const {name,email,password,address,phone}=req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email:email});
    }catch(err){
        return res.status(500).json({message:"Something went wrong, please try again later."})
    }
    if(existingUser){
        return res.status(422).json({message:"User already exists, please login instead."})
    } else{
        const hashedPassword=await bcrypt.hash(password,12);
    const user=new User({
        name,
        email,
        password:hashedPassword,
        address,
        phone,
    });

    try{
        const savedUser=await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }

    return res.status(201).json({message:user});
    }
}

const login=async (req,res)=>{
    const {email,password}=req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email:email});
    }catch(err){
        return res.status(500).json({message:"Something went wrong, please try again later."})
    }
    if(!existingUser){
        return res.status(422).json({message:"User does not exist, please register instead."})
    } else{
        const isValidPassword=await bcrypt.compare(password,existingUser.password);
        if(!isValidPassword){
            return res.status(422).json({message:"Invalid credentials, please try again."})
        } else{
            const token=jwt.sign({userId:existingUser.id,email:existingUser.email},JWT_SECRET,{expiresIn:"30s"});
            res.cookie(String(existingUser.id),token,{path:'/',expires:new Date(Date.now()+1000*30),httpOnly:true,sameSite:"lax"});
            return res.status(200).json({message:"Logged in!",user:existingUser,token:token});
        }
    }
}

const verify_token=(req,res,next)=>{
    const cookie=req.headers.cookie;
    const token=cookie.split("=")[1];

        if(token){
            jwt.verify(String(token),JWT_SECRET,(err,user)=>{
                if(err){
                    return res.sendStatus(403);
                }
                req.user=user;
                next();
            })
        }
  
}

const get_user=async (req,res)=>{
    const user_id=req.user.userId;
    let user;
    try{
        user=await User.findById(user_id,"-password");
    }catch(err){
        return res.status(500).json({message:"Something went wrong, please try again later."})
    }

    if(!user){
        return res.status(404).json({message:"User not found."})
    } else{
        return res.status(200).json({message:"User found!",user:user});
    }
}


exports.register=register;
exports.login=login;
exports.verify_token=verify_token;
exports.get_user=get_user;
