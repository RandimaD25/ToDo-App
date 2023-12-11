import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
// import { todo } from "node:test";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const prisma = new PrismaClient();

export const createTodo = async function(req: Request, res: Response) {
  const {id, description} = req.body;
  try{
    const newTodo = await prisma.todo.create({
      data: {
        id, 
        description,
      },
    });
    res.json(newTodo)
  }
  catch (error) {
    console.log(error);
    res.status(500).json({error: "Internal server error"})
    
  }
};

export const getTodo = async function (req: Request, res: Response){
    const getTodo = await prisma.todo.findMany({
      
    });
    res.json(getTodo)
}

export const updateTodo = async function (req: Request, res: Response){
  try {
    const updateTodo = await prisma.todo.update({
      where: {
        id: 1,
      },
      data: {
      description: "Buy a notebook"
    }
    });
    res.json(updateTodo)
  }
  catch (error) {
    console.log(error);
    res.status(500).json({error: "Internal server error"})
    
  }
}

export const deleteTodo = async function (req: Request, res: Response){
  try{
      const deleteTodo = await prisma.todo.delete({
      where: {
        id: 3,
      },
    })
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({error: "Internal server error"})
    
  }
}

// export const getTodo = async function (req: Request, res: Response) => {
//   res.json({ message: "alive" });
// };

// export const createTodo = await prisma.todo.createOne({
//     data: [
//       {description: "Wash the car", flag: true},
//       {description: "Clean the room", flag: false}
//     ]
//   })

  // const updateTodo = await prisma.todo.update({
  //   where: {
  //     id: 1,
  //   },
  //   data: {
  //     description: "Buy a notebook"
  //   }
  // })

//   const deleteTodo = await prisma.todo.delete({
//     where: {
//       id: 3,
//     },
//   })

//   res.json({
//     data: getTodo,
//   });
// });

// app.listen(port, () => {
//   console.log(`Listening to requests on port ${port}`);
// });

// app.post("/todos", async (req, res) => {
//   const todoDescription = req.body.description;
//   const todoFlag = {
//     flag: req.body.flag,
//   };

//   if(!todoDescription || !todoFlag.flag){
//     return res
//       .status(400)
//       .json({message: "Either description or flag is missing"})
//   }

//   try{
//     const message = "quote created successfully";
//     const description = await prisma.todo.findFirst({
//       where: {description: todoDescription},
//     });

//     if(!todo){
//       await prisma.todo.create({
//         data: {
//           description: todoDescription
//         }
//       });
//       console.log("Created description for an existing todo");
//       return res.json({message});
//       } 
//     }
//     catch (e) {
//       console.error(e);
//       return res.status(500).json({message: "Something went wrong"});
//   }
// })