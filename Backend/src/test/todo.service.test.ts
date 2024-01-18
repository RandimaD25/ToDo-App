import {
  createTodoService,
  getTodoService,
  deleteTodoService,
  updateTodoService,
} from "../services/todo.service";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

jest.mock("@prisma/client", () => {
  const originalModule = jest.requireActual("@prisma/client");
  return {
    __esModule: true,
    ...originalModule,
    PrismaClient: jest.fn().mockImplementation(() => ({
      todo: {
        findMany: jest.fn().mockResolvedValue([
          {
            id: 1,
            description: "Mock todo",
            flag: false,
            userId: 1,
          },
        ]),
        create: jest.fn().mockResolvedValue({
          id: 1,
          description: "Mock todo",
          flag: false,
          userId: 1,
        }),
        update: jest.fn().mockResolvedValue({
          id: 1,
          flag: false,
        }),
        delete: jest.fn().mockResolvedValue(
          {}
        ),
      },
    })),
  };
});


beforeEach(() => {
  jest.clearAllMocks();
});

describe("todo service", () => {
  test("should return the todo list for a given user id", async () => {
    const userId = 1;
    const result = await getTodoService(userId);
    expect(result).toEqual([
      {
        id: 1,
        description: "Mock todo",
        flag: false,
        userId: 1,
      },
    ]);
  });

  test("should create a new item", async () => {
    const description = "Mock todo";
    const userId = 1;
    const result = await createTodoService(description, userId);
    expect(result).toEqual({
      id: 1,
      description: "Mock todo",
      flag: false,
      userId: 1,
    });
  });

  test("should update a todo item's flag", async () => {
    const todoId = 1;
    const userId = 1;
    const result = await updateTodoService(todoId, userId);
    expect(result).toBe("Successfully updated");
  });

  test("should delete a todo item", async () => {
    const todoID = 1;
    const userId = 1;
    await deleteTodoService(todoID, userId);
  });

});
