projectData = [];

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    exposedHeaders: ["sessionId"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);


// Initialize the main project folder
app.use(express.static("dist"));

app.listen(8081, () => {
  console.log("server is up on 8081");
});
/* 
app.get("/all", (req, res) => {
  console.log("all", projectData);
  res.send(projectData);
});

app.post("/add", (req, res) => {
  //console.log('req body', req)
  projectData.push(req.body);
  console.log("add", projectData);
  res.send('successful')
});
 */