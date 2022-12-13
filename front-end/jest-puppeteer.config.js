module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transformIgnorePatterns: ["node_modules/(?!axios)"],
  launch: {
    headless: (process.env.HEADLESS || "true") === "true",
    slowMo: process.env.SLO_MO || 0,
    devtools: true,
  },
};
