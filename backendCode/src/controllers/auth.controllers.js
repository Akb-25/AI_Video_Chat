import express from "express";
import User from "..models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateToken } from "../lib/utils";
dotenv.config();

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try{ 
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        } else if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        
        const oldUser = await User.findOne({ email });
        
        if (oldUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await decrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await new User({
            fullName, 
            email, 
            password: hashedPassword,
        })

        if (newUser) {
            generateToken(user._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user data "});
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in server" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch  = await bcrypt.compare(password, user.passWord);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in server" });
    };
};

export const logout = (req, res) => {
    try{
        res.cookie("jwt", "", {
            maxAge: 0
        });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in server" });
    }
};

