const express = require('express');
const path = require('path');

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

const server = app.listen(5000);
const portNumber = server.address().port;
console.log("App listening on http://localhost:" + portNumber);