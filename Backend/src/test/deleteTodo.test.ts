import { deleteTodo } from '../controllers/todo.controllers'; 
import { Request, Response } from 'express';
import { deleteTodoService } from '../services/todo.service'; 

jest.mock('../services/todo.service'); 

describe('deleteTodo', () => {
  it('should delete a todo', async () => {
    const req = {
      params: { id: '1' },
      user: { userId: 1 }
    } as unknown as Request;

    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    } as unknown as Response;

    (deleteTodoService as jest.Mock).mockResolvedValueOnce('Successfully deleted');

    await deleteTodo(req, res);

    expect(res.json).toHaveBeenCalledWith('Successfully deleted');
  });

  it('should handle errors', async () => {
    const req = {
      params: { id: 1 },
      user: { userId: 1 }
    } as unknown as Request;

    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    } as unknown as Response;

    const error = new Error('Record to delete does not exist.');

    (deleteTodoService as jest.Mock).mockRejectedValueOnce(error);

    await deleteTodo(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Record to delete does not exist.' });
  });
});