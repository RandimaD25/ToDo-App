import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//generate token
export const generateToken = function (userId: number) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      userId: userId,
      time: Date()
    };
  
    const token = jwt.sign(data, jwtSecretKey);
    return token;
  };
  
  //user registration
  export const userRegistration = async function (req: Request, res: Response) {
    try {
      const { name, emailAddress, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashPassword;
  
      const userExist = await prisma.user.findUnique({
        where: { emailAddress: req.body.emailAddress },
      });
  
      if (!name || !emailAddress || !password) {
        return res.json({ message: "Please enter all the details" });
      }
  
      if (userExist) {
        return res.json({
          message: "User already exists with the given email address",
        });
      }
      const newUser = await prisma.user.create({
        data: {
          name,
          emailAddress,
          password: hashPassword,
        },
      });
  
      const token =  generateToken(newUser.userId);
    
      res.json({
        success: true,
        message: "User registered successfully",
        data: newUser,
        token: token,
      });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error });
    }
  };
  
  //user login
  export const userLogin = async function (req: Request, res: Response) {
    try {
      const { emailAddress, password } = req.body;
      if (!emailAddress || !password) {
        return res.json({ message: "Please enter all details" });
      }
  
      const userExist = await prisma.user.findUnique({
        where: { emailAddress: req.body.emailAddress },
      });
      if (!userExist) {
        return res.json({ message: "Wrong credentials" });
      }
  
      console.log("user exist: ", userExist);
      
  
      const isPasswordMatched = await bcrypt.compare(
        password,
        userExist.password
      );
      if (!isPasswordMatched) {
        return res.json({ message: "Wrong credentials pass" });
      }
      
      const token =  generateToken(userExist.userId);
  
      return res.json({
        iD: userExist.userId,
        data: emailAddress, 
        message: "LoggedIn successfully",
        token: token,
      });
    } catch (error) {
      return res.json({ error: error });
    }
  };
  