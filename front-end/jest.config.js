module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js'
    },
    testEnvironment: 'jest-environment-jsdom',
    testEnvironmentOptions: {
      url: "https://www.texashomesproject.me/"
    } 
  };


    