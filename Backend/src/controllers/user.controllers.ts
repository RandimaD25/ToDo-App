import express from "express";
import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/user.service";
import { IError } from "../interfaces/error.interface";

const app = express();
app.use(express.json());

export const userRegistration = async function (req: Request, res: Response) {
  try {
    const { name, emailAddress, password } = req.body;
    const { newUser, token } = await registerUser(name, emailAddress, password);

    res.json({
      success: true,
      message: "User registered successfully",
      data: newUser,
      token: token,
    });
  } catch (error: unknown) {
    if ((error as IError).message) {
      res.status(500).json({ error: (error as IError).message });
    } else {
      throw error
    }
  }
};

export const userLogin = async function (req: Request, res: Response) {
  try {
    const { emailAddress, password } = req.body;
    const { iD, data, token } = await loginUser(emailAddress, password);
    return res.status(200).json({
      iD,
      data,
      message: "LoggedIn successfully",
      token,
    });
  } catch (error: unknown) {
    if ((error as IError).message) {
      res.status(500).json({ error: (error as IError).message });
    } else {
      throw error
    }
  }
};