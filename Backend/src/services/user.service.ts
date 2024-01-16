import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

export const generateToken = function (userId: number) {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    userId: userId,
    time: Date()
  };

  const token = jwt.sign(data, jwtSecretKey);
  return token;
};

export const registerUser = async function (name: string, emailAddress: string, password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const userExist = await prisma.user.findUnique({
    where: { emailAddress: emailAddress },
  });

  if (!name || !emailAddress || !password) {
    throw new Error("Please enter all the details");
  }

  if (userExist) {
    throw new Error("User already exists with the given email address");
  }
  const newUser = await prisma.user.create({
    data: {
      name,
      emailAddress,
      password: hashPassword,
    },
  });

  const token = generateToken(newUser.userId);

  return { newUser, token };
};

export const loginUser = async function (emailAddress: string, password: string) {
  if (!emailAddress || !password) {
    throw new Error("Please enter all details");
  }

  const userExist = await prisma.user.findUnique({
    where: { emailAddress: emailAddress },
  });
  if (!userExist) {
    throw new Error("Wrong credentials");
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    userExist.password
  );
  if (!isPasswordMatched) {
    throw new Error("Wrong credentials pass");
  }

  const token = generateToken(userExist.userId);
  return { iD: userExist.userId, data: emailAddress, token };
};