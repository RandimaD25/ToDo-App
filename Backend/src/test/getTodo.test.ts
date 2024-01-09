import { getTodo } from '../controllers/todo.controllers'; 
import { Request, Response } from 'express';
import { getTodoService } from '../services/todo.service'; 

jest.mock('../services/todo.service'); 

describe('getTodo', () => {
  it('should get a todo', async () => {
    const req = {
      user: { userId: 1 }
    } as unknown as Request;

    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    } as unknown as Response;

    const todos = [
      { id: 1, description: 'Test todo', flag: true },
      { id: 2, description: 'Another test todo', flag: false }
    ];

    (getTodoService as jest.Mock).mockResolvedValueOnce(todos);

    await getTodo(req, res);

    expect(res.json).toHaveBeenCalledWith(todos);
  });

  it('should handle errors', async () => {
    const req = {
      user: { userId: 1 }
    } as unknown as Request;

    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    } as unknown as Response;

    const error = new Error('Internal server error.');

    (getTodoService as jest.Mock).mockRejectedValueOnce(error);

    await getTodo(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error.' });
  });
});