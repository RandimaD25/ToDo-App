import { createTodo } from '../controllers/todo.controllers'; 
import { Request, Response } from 'express';
import { createTodoService } from '../services/todo.service'; 

jest.mock('../services/todo.service', () => ({
  createTodoService: jest.fn(),
}));

describe('createTodo', () => {
  it('should create a todo', async () => {
    const mockReq = {
      body: { description: 'Test todo' },
      user: { userId: 1 },
    } as unknown as Request;

    const mockRes = {
      json: jest.fn(),
      status: jest.fn(() => mockRes),
    } as unknown as Response;

    const mockTodo = { id: 1, description: 'Test todo', userId: 1 };

    (createTodoService as jest.Mock).mockResolvedValue(mockTodo);

    await createTodo(mockReq, mockRes);

    expect(createTodoService).toHaveBeenCalledWith('Test todo', 1);
    expect(mockRes.json).toHaveBeenCalledWith(mockTodo);
  });

  it('should handle errors', async () => {
    const mockReq = {
      body: { description: 'Test todo' },
      user: { userId: 1 },
    } as unknown as Request;

    const mockRes = {
      json: jest.fn(),
      status: jest.fn(() => mockRes),
    } as unknown as Response;

    const mockError = { message: 'An error occurred' };

    (createTodoService as jest.Mock).mockRejectedValue(mockError);

    await createTodo(mockReq, mockRes);

    expect(createTodoService).toHaveBeenCalledWith('Test todo', 1);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'An error occurred' });
  });
});