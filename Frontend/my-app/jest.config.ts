import type { Config } from "@jest/types";
 
// Use module.exports to export the config
module.exports = {
  verbose: true,
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFiles: ["<rootDir>/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
};
 