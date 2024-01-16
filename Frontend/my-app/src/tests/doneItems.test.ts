import { doneItems } from '../services/doneItems';
import axiosInstance from '../services/api/axiosInstance';
import authHeader from '../services/auth/auth.header';

jest.mock('../services/api/axiosInstance', () => ({
  put: jest.fn(),
}));
jest.mock('../services/auth/auth.header', () => jest.fn());

describe('doneItems', () => {
  it('updates a todo item successfully', async () => {
    const id = 1;
    const flag = true;
    const mockResponse = { data: 'some data' };
    (axiosInstance.put as jest.Mock).mockResolvedValue(mockResponse);
    (authHeader as jest.Mock).mockReturnValue({ Authorization: 'Bearer token' });

    await doneItems(id, flag);

    expect(axiosInstance.put).toHaveBeenCalledWith(`/updateTodo/${id}`, {}, {
      headers: { Authorization: 'Bearer token' },
    });
  });

  it('throws an error when no response is received', async () => {
    const id = 1;
    const flag = true;
    (axiosInstance.put as jest.Mock).mockResolvedValue({});
    (authHeader as jest.Mock).mockReturnValue({ Authorization: 'Bearer token' });

    await expect(doneItems(id, flag)).rejects.toThrow('No response received after update');
  });
});
