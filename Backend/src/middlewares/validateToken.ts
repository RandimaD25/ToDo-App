import express from "express";
import { Request, NextFunction,Response } from "express";
import { IError } from "../interfaces/error.interface";
import { IRequestWithUser } from "../interfaces/userRequest.interface";
const app = express();

app.use(express.json());
const jwt = require("jsonwebtoken");

//validate token
export const validateToken = function (req: Request, res: Response, next: NextFunction) {
  let tokenHeaderKey = "Authorization";
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const bearer = req.header(tokenHeaderKey);
    console.log(bearer);
    
    if (!bearer || bearer==="") {
      return res.status(401).send({message: "Unauthenticated"})
    }

    const bearerParts = bearer.split(" ")
    console.log(bearerParts);
    
    if (bearerParts.length !== 2) {
      return res.status(401).send({message: "Unauthenticated"})
    }

    const token = bearerParts[1]
    console.log("token is: ", token);
    
    const verified = jwt.verify(token, jwtSecretKey);

    if (verified) {
      console.log(verified);
      (req as IRequestWithUser).user = { userId: verified.userId }
      next();
    } else {
      return res.status(401).send({message: "Unauthenticated"});
    }
  } catch (error: unknown) {
    if ((error as IError).message) {
      res.status(500).json({error: (error as IError).message});
    } else {
      console.log(error);
    }
  }
};
