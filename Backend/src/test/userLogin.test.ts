import { loginUser } from "../services/user.service";

jest.mock("@prisma/client", () => {
  const originalModule = jest.requireActual("@prisma/client");
  return {
    __esModule: true,
    ...originalModule,
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: {
        findUnique: jest.fn().mockResolvedValue({
          userId: 1,
          emailAddress: "test@gmail.com",
          password:
            "$2a$10$rRGY1s5lzCUf7xCzyibLk.osPVYyVPKriFY6x1x0OwK/Eoryzksti",
        }),
      },
    })),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("user service", () => {
  jest.mock("bcrypt", () => ({
    compare: jest.fn((password) => Promise.resolve(password === "After 123")),
  }));
  test("loginUser should return a token for valid credentials", async () => {
    const emailAddress = "test@gmail.com";
    const password = "After 123";
    const generateToken = jest.spyOn(
      require("../services/user.service"),
      "generateToken"
    );

    generateToken.mockImplementation(() => "mockToken");
    const result = await loginUser(emailAddress, password);
    expect(result).toEqual({
      iD: 1,
      data: "test@gmail.com",
      token: "mockToken",
    });
  });
});
