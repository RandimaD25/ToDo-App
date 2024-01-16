import { deleteItems } from '../services/deleteItem';
import axiosInstance from '../services/api/axiosInstance';
import authHeader from '../services/auth/auth.header';

jest.mock('../services/api/axiosInstance', () => ({
  delete: jest.fn(),
}));
jest.mock('../services/auth/auth.header', () => jest.fn());

describe('deleteItems', () => {
  it('deletes a todo item successfully', async () => {
    const id = 1;
    const mockResponse = { data: 'some data' };
    (axiosInstance.delete as jest.Mock).mockResolvedValue(mockResponse);
    (authHeader as jest.Mock).mockReturnValue({ Authorization: 'Bearer token' });

    await deleteItems(id);

    expect(axiosInstance.delete).toHaveBeenCalledWith(`/deleteTodo/${id}`, {
      headers: { Authorization: 'Bearer token' },
    });
  });

  it('throws an error when no response is received', async () => {
    const id = 1;
    (axiosInstance.delete as jest.Mock).mockResolvedValue({});
    (authHeader as jest.Mock).mockReturnValue({ Authorization: 'Bearer token' });

    await expect(deleteItems(id)).rejects.toThrow('No response received after deletion');
  });
});
