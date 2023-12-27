import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const port = process.env.PORT || 3001;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const route = express.Router();
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

//create a todo
export const createTodo = async function (req: Request, res: Response) {
  const { description } = req.body;
  try {
    const user = (req as any).user as {userId: number} | undefined;
    if (!user) {
      return res.status(401).send({message: "Unauthenticated"})
    }

    const newTodo = await prisma.todo.create({
      data: {
        userId: user.userId,
        description,
      },
    });
    res.json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get all todos
export const getTodo = async function (req: Request, res: Response) {
  try {
    const user = (req as any).user as {userId: number} | undefined;
    if (!user) {
      return res.status(401).send({message: "Unauthenticated"})
    }

    const userId = user.userId;
    const todos = await prisma.todo.findMany({
      where: {userId: userId},
      select: {
        id: true,
        description: true,
        flag: true,
      }
    })
    console.log("get todo: ", todos);
    
    return res.json(todos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }

  // res.json(getTodo)
};

//update a todo
export const updateTodo = async function (req: Request, res: Response) {
  const todoId = parseInt(req.params.id, 10);

  try {
    const user = (req as any).user as {userId: number} | undefined;
    if (!user) {
      return res.status(401).send({message: "Unauthenticated"})
    }

    await prisma.todo.update({
      where: {
        id: todoId,
        userId: user.userId
      },
      data: {
        flag: true,
      },
    });
    res.json("Successfully updated");
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.log("Record to update does not exist.");
      }
    }
    res.json(error);
  }
};

//delete a todo
export const deleteTodo = async function (req: Request, res: Response) {
  const todoID = parseInt(req.params.id);
  console.log(todoID);

  try {
    const user = (req as any).user as {userId: number} | undefined;
    if (!user) {
      return res.status(401).send({message: "Unauthenticated"})
    }

    const deleteTodo = await prisma.todo.delete({
      where: {
        id: todoID,
        userId: user.userId
      },
    });
    res.json("Successfully deleted");
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.log("Record to delete does not exist.");
      }
    }
    res.json(error);
  }
};

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

//validate token
export const validateToken = function (req: Request, res: Response, next: NextFunction) {
  let tokenHeaderKey = "Authorization";
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let error: any;

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
      (req as any).user = { userId: verified.userId }
      next();
    } else {
      return res.status(401).send(error);
    }
  } catch (error: any) {
    return res.status(401).send(error);
  }
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
      data: emailAddress,
      message: "LoggedIn successfully",
      token: token,
    });
  } catch (error) {
    return res.json({ error: error });
  }
};
