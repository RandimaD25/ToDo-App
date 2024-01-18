import { deleteTodoService, updateTodoService } from "../services/todo.service";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

jest.mock("@prisma/client", () => {
  const originalModule = jest.requireActual("@prisma/client");
  return {
    __esModule: true,
    ...originalModule,
    PrismaClient: jest.fn().mockImplementation(() => ({
      todo: {
        delete: jest
          .fn()
          .mockRejectedValue(
            new originalModule.PrismaClientKnownRequestError(
              "Record to delete does not exist.",
              "P2025",
              "todo.delete"
            )
          ),
        update: jest.fn().mockRejectedValue (
            new originalModule.PrismaClientKnownRequestError(
                "Record to update does not exist.",
                "P2025",
                "todo.update"
              )
        )
      },
    })),
  };
});

describe("todo service errors", () => {
    test("should give an error message when delete a todo", async () => {
        const todoID = 1;
        const userId = 1
    await expect(deleteTodoService(todoID, userId)).rejects.toThrow('Record to delete does not exist.'); 
    });

    test("should give an error message when update a todo", async () => {
        const todoID = 1;
        const userId = 1
    await expect(updateTodoService(todoID, userId)).rejects.toThrow('Record to update does not exist.'); 
    });
})