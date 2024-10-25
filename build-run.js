const express = require("express");
const path = require("path");
const app = express();
const packageInfo = require("./package.json");

console.log("cazzo");

const documentRoot = path.join(__dirname, `dist\\${packageInfo.name}\\browser`);
console.log("documentRoot:", documentRoot);

app.use(express.static(documentRoot));

app.get("/*", function (req, res) {
  res.sendFile(documentRoot, "index.html");
});

const server = app.listen(9000, () => {
  const port = server.address().port;
  console.log(`App listening at http://localhost:${port}`);
  require("child_process").exec(`start http://localhost:${port}`);
});
