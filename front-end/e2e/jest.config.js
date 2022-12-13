module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transformIgnorePatterns: ["node_modules/(?!axios)"],
  testTimeout: 8000,
};
