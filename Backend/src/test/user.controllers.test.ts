import { userRegistration, userLogin } from '../controllers/user.controllers'; 
import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/user.service'; 

jest.mock('../services/user.service', () => ({
  registerUser: jest.fn(),
  loginUser: jest.fn(),
}));

describe('userRegistration', () => {
  it('should register a user', async () => {
    const mockReq = {
      body: { name: 'Test User', emailAddress: 'test@example.com', password: 'password' },
    } as unknown as Request;

    const mockRes = {
      json: jest.fn(),
      status: jest.fn(() => mockRes),
    } as unknown as Response;

    const mockUser = { id: 1, name: 'Test User', emailAddress: 'test@example.com' };
    const mockToken = 'testToken';

    (registerUser as jest.Mock).mockResolvedValue({ newUser: mockUser, token: mockToken });

    await userRegistration(mockReq, mockRes);

    expect(registerUser).toHaveBeenCalledWith('Test User', 'test@example.com', 'password');
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      message: "User registered successfully",
      data: mockUser,
      token: mockToken,
    });
  });
});

describe('userLogin', () => {
  it('should login a user', async () => {
    const mockReq = {
      body: { emailAddress: 'test@example.com', password: 'password' },
    } as unknown as Request;

    const mockRes = {
      json: jest.fn(),
      status: jest.fn(() => mockRes),
    } as unknown as Response;

    const mockID = 1;
    const mockData = 'test@example.com';
    const mockToken = 'testToken';

    (loginUser as jest.Mock).mockResolvedValue({ iD: mockID, data: mockData, token: mockToken });

    await userLogin(mockReq, mockRes);

    expect(loginUser).toHaveBeenCalledWith('test@example.com', 'password');
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      iD: mockID,
      data: mockData,
      message: "LoggedIn successfully",
      token: mockToken,
    });
  });
});