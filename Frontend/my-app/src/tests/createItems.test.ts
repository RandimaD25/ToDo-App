import { createItems } from '../services/createItems';
import axiosInstance from '../services/api/axiosInstance';
import authHeader from '../services/auth/auth.header';


jest.mock('../services/api/axiosInstance', () => ({
  post: jest.fn(),
}));
jest.mock('../services/auth/auth.header', () => jest.fn());

describe('createItems', () => {
  it('creates a new todo item successfully', async () => {
    const newTask = { description: 'Test task' };
    const mockResponse = { data: 'some data' };
    (axiosInstance.post as jest.Mock).mockResolvedValue(mockResponse);
    (authHeader as jest.Mock).mockReturnValue({ Authorization: 'Bearer token' });

    await createItems(newTask);

    expect(axiosInstance.post).toHaveBeenCalledWith('/createTodo', newTask, {
      headers: { Authorization: 'Bearer token' },
    });
  });

  it('throws an error when no data is received', async () => {
    (axiosInstance.post as jest.Mock).mockResolvedValue({});
    (authHeader as jest.Mock).mockReturnValue({ Authorization: 'Bearer token' });

    await expect(createItems({ description: 'Test task' })).rejects.toThrow('No data received after creation.');
  });
});

