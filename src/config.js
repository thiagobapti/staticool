const fs = require("fs");

module.exports = (() => {
  console.log("CONFIG RUNNING");
  const defaultConfig = JSON.parse(fs.readFileSync(`${__dirname}/.staticool`));
  const localConfigFilePath = `${process.cwd()}/.staticool`;

  if (fs.existsSync(localConfigFilePath)) {
    const localConfigContent = fs.readFileSync(localConfigFilePath);
    if (!localConfigContent.toString()) {
      console.log("Empty config file".red);
      process.exit();
    } else {
      try {
        return {
          ...defaultConfig,
          ...JSON.parse(localConfigContent),
        };
      } catch (e) {
        console.log("Bad config file".red);
        throw e;
      }
    }
  } else return defaultConfig;
})();
