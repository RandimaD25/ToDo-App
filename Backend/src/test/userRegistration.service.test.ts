import {
  registerUser,
} from "../services/user.service";

jest.mock("@prisma/client", () => {
  const originalModule = jest.requireActual("@prisma/client");
  return {
    __esModule: true,
    ...originalModule,
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({
          userId: 1,
          name: "Test name",
          emailAddress: "test@gmail.com",
          password: "test password",
        }),
      },
    })),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("user service", () => {
    test("registerUser should create a new user and return a token", async () => {
        const name = "Test name";
        const emailAddress = "test@gmail.com";
        const password = "test password";

        const generateToken = jest.spyOn(require("../services/user.service"), 'generateToken')

        generateToken.mockImplementation(() => 'mockToken')

        const result = await registerUser(name, emailAddress, password);
        expect(result).toEqual({
          newUser: {
            userId: 1,
            name: "Test name",
            emailAddress: "test@gmail.com",
            password: "test password",
          },
          token: 'mockToken',
        });
        expect(result).toHaveProperty("token", "mockToken");
      });
});

const jwt = require('jsonwebtoken');
const { generateToken } = require('../services/user.service'); 

describe('generateToken', () => {
  test('should generate a valid token', () => {
    const mockUserId = 1;
    const mockSecretKey = 'gfg_jwt_secret_key'; 
    process.env.JWT_SECRET_KEY = mockSecretKey;

    const token = generateToken(mockUserId);
    const decoded = jwt.verify(token, mockSecretKey);

    expect(decoded.userId).toEqual(mockUserId);
    expect(new Date(decoded.time)).toBeInstanceOf(Date);
  });
});

