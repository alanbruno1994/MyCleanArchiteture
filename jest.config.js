module.exports = {
  roots: ["<rootDir>/src", "<rootDir>/test"], // basicamente serve para definir o diretório raiz
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"], // aqui diz onde estão os arquivos para cobertura de teste
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    // Aqui e importante por que os arquivos de teste são em typescript
    ".+\\.ts$": "ts-jest",
  },
};
