import { updateTodo } from '../controllers/todo.controllers'; 
import { Request, Response } from 'express';
import { updateTodoService } from '../services/todo.service';

jest.mock('../services/todo.service'); 

describe('updateTodo', () => {
  it('should update a todo', async () => {
    const req = {
      params: { id: '1' },
      user: { userId: 1 }
    } as unknown as Request;

    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    } as unknown as Response;

    (updateTodoService as jest.Mock).mockResolvedValueOnce('Successfully updated');

    await updateTodo(req, res);

    expect(res.json).toHaveBeenCalledWith('Successfully updated');
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

    const error = new Error('Record to update does not exist.');

    (updateTodoService as jest.Mock).mockRejectedValueOnce(error);

    await updateTodo(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Record to update does not exist.' });
  });
});