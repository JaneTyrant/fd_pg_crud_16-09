const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

const config = require("../config/db.json");
const dbConfig = config[process.env.NODE_ENV || "development"];
const currentFilename = path.basename(__filename);

const client = new Client(dbConfig);
client.connect();
process.on("beforeExit", () => client.end());

const db = {
  client,
};

fs.readdirSync(__dirname)
  .filter(
    (fileName) => /.+\.js$/.test(fileName) && fileName !== currentFilename
  )
  .forEach((fileName) => {
    const absPath = path.resolve(__dirname, fileName);
    const Model = require(absPath);
    Model.client = client;
    db[Model.name] = Model;
  });

module.exports = db;
