import { getItems } from '../services/getItems';
import axiosInstance from '../services/api/axiosInstance';
import authHeader from '../services/auth/auth.header';

jest.mock('../services/api/axiosInstance', () => ({
  get: jest.fn(),
}));
jest.mock('../services/auth/auth.header', () => jest.fn());

describe('getItems', () => {
  it('fetches todo items successfully', async () => {
    const mockData = [{ id: 1, description: 'Test task' }];
    const mockResponse = { data: mockData, status: 200 };
    (axiosInstance.get as jest.Mock).mockResolvedValue(mockResponse);
    (authHeader as jest.Mock).mockReturnValue({ Authorization: 'Bearer token' });

    const result = await getItems();

    expect(axiosInstance.get).toHaveBeenCalledWith('/getTodo', {
      headers: { Authorization: 'Bearer token' },
    });
    expect(result).toEqual(mockData);
  });

  it('throws an error when an exception occurs', async () => {
    const mockError = new Error('Network error');
    (axiosInstance.get as jest.Mock).mockRejectedValue(mockError);
    (authHeader as jest.Mock).mockReturnValue({ Authorization: 'Bearer token' });

    await expect(getItems()).rejects.toThrow('Network error');
  });
});
