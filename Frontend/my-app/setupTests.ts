global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn(),
    key: jest.fn(),
    length: 0,
  };
   
  export {};