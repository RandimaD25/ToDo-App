import { Request, Response } from 'express';
import {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todo.controllers';  // Replace 'your-controller-file' with the actual filename
import {
  createTodoService,
  getTodoService,
  updateTodoService,
  deleteTodoService,
} from '../services/todo.service';

// Mock the services
jest.mock('../services/todo.service', () => ({
  createTodoService: jest.fn(),
  getTodoService: jest.fn(),
  updateTodoService: jest.fn(),
  deleteTodoService: jest.fn(),
}));

describe('createTodo controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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

// Import statements and mocks...

describe('getTodo controller', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should get todos', async () => {
      const mockReq = {
        user: { userId: 1 },
      } as unknown as Request;
  
      const mockRes = {
        json: jest.fn(),
        status: jest.fn(() => mockRes),
      } as unknown as Response;
  
      const mockTodos = [{ id: 1, description: 'Test 1', userId: 1 }];
      (getTodoService as jest.Mock).mockResolvedValue(mockTodos);
  
      await getTodo(mockReq, mockRes);
  
      expect(getTodoService).toHaveBeenCalledWith(1);
      expect(mockRes.json).toHaveBeenCalledWith(mockTodos);
    });
  
    it('should handle errors', async () => {
      const mockReq = {
        user: { userId: 1 },
      } as unknown as Request;
  
      const mockRes = {
        json: jest.fn(),
        status: jest.fn(() => mockRes),
      } as unknown as Response;
  
      const mockError = { message: 'An error occurred' };
      (getTodoService as jest.Mock).mockRejectedValue(mockError);
  
      await getTodo(mockReq, mockRes);
  
      expect(getTodoService).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'An error occurred' });
    });
  });
  
  describe('updateTodo controller', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should update a todo', async () => {
      const mockReq = {
        params: { id: '1' },
        user: { userId: 1 },
      } as unknown as Request;
  
      const mockRes = {
        json: jest.fn(),
        status: jest.fn(() => mockRes),
      } as unknown as Response;
  
      const mockMessage = 'Successfully updated';
      (updateTodoService as jest.Mock).mockResolvedValue(mockMessage);
  
      await updateTodo(mockReq, mockRes);
  
      expect(updateTodoService).toHaveBeenCalledWith(1, 1);
      expect(mockRes.json).toHaveBeenCalledWith(mockMessage);
    });
  
    it('should handle errors', async () => {
      const mockReq = {
        params: { id: '1' },
        user: { userId: 1 },
      } as unknown as Request;
  
      const mockRes = {
        json: jest.fn(),
        status: jest.fn(() => mockRes),
      } as unknown as Response;
  
      const mockError = { message: 'An error occurred' };
      (updateTodoService as jest.Mock).mockRejectedValue(mockError);
  
      await updateTodo(mockReq, mockRes);
  
      expect(updateTodoService).toHaveBeenCalledWith(1, 1);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'An error occurred' });
    });
  });
  
  describe('deleteTodo controller', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should delete a todo', async () => {
      const mockReq = {
        params: { id: '1' },
        user: { userId: 1 },
      } as unknown as Request;
  
      const mockRes = {
        json: jest.fn(),
        status: jest.fn(() => mockRes),
      } as unknown as Response;
  
      const mockMessage = 'Successfully deleted';
      (deleteTodoService as jest.Mock).mockResolvedValue(mockMessage);
  
      await deleteTodo(mockReq, mockRes);
  
      expect(deleteTodoService).toHaveBeenCalledWith(1, 1);
      expect(mockRes.json).toHaveBeenCalledWith(mockMessage);
    });
  
    it('should handle errors', async () => {
      const mockReq = {
        params: { id: '1' },
        user: { userId: 1 },
      } as unknown as Request;
  
      const mockRes = {
        json: jest.fn(),
        status: jest.fn(() => mockRes),
      } as unknown as Response;
  
      const mockError = { message: 'An error occurred' };
      (deleteTodoService as jest.Mock).mockRejectedValue(mockError);
  
      await deleteTodo(mockReq, mockRes);
  
      expect(deleteTodoService).toHaveBeenCalledWith(1, 1);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'An error occurred' });
    });
  });
  
