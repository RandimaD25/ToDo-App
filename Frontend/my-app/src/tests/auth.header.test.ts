import authHeader from '../services/auth/auth.header';

describe('authHeader', () => {
  it('returns an authorization header if the user is logged in', () => {
    // Mock localStorage
    const mockUser = { token: 'fake-token' };
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUser));

    const headers = authHeader();

    expect(headers).toEqual({ Authorization: 'Bearer fake-token' });
  });

  it('returns an empty authorization header if the user is not logged in', () => {
    // Mock localStorage
    Storage.prototype.getItem = jest.fn(() => null);

    const headers = authHeader();

    expect(headers).toEqual({ Authorization: '' });
  });
});
