#!/usr/bin/env node
const colors = require("colors");
const config = require("./config");

if (process.argv.includes("-d") || process.argv.includes("dev")) {
  console.log("Staticool".bgBlue);

  console.log("config:", config);
}
