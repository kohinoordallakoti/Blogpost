import User from '../model/userSchema.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtToken.js';

export const createUser = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();

        res.status(201).json({message: "User created successfully", user: newUser});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        if( !email || !password)
        {
            return res.status(400).json({message: "All fields required"});
        }
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({message: "Invalid credentials", user});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }
        
        const accessToken = generateToken(user._id, process.env.ACCESS_TOKEN_SECRET, '15m');
        const refreshToken = generateToken(user._id, process.env.REFRESH_TOKEN_SECRET, '7d');

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 60 * 1000,
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({ 
    message:"Login Successful",
    accessToken,
    refreshToken,
    user:{
        id:user._id,
        name:user.name,
        email:user.email,
        password:user.password,
        role:user.role
    }});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


export const logOutUser = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({message: "Logout successful"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const getUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};