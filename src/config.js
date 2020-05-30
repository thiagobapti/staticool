import fs from "fs";
import settings from "./settings";

export default (() => {
  console.log("Staticool".bgBlue);
  let defaultConfig;
  try {
    defaultConfig = JSON.parse(
      fs.readFileSync(`${__dirname}/${settings.configFileName}`)
    );
  } catch (e) {
    console.log("Bad default config file".red);
    throw e;
  }
  const localConfigFilePath = `${process.cwd()}/${settings.configFileName}`;

  if (fs.existsSync(localConfigFilePath)) {
    const localConfigBuffer = fs.readFileSync(localConfigFilePath);
    if (!localConfigBuffer.toString()) {
      return defaultConfig;
    } else {
      try {
        return {
          ...defaultConfig,
          ...JSON.parse(localConfigBuffer),
          _custom: true,
        };
      } catch (e) {
        console.log("Bad config file".red);
        throw e;
      }
    }
  } else {
    return defaultConfig;
  }
})();
