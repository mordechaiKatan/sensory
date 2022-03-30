const express = require("express")
const app = express();
const http = require('http').createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
const info= require("./info.json");

app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use('/', express.static('client/dist'));

const port=8000
http.listen(port, () => {
    console.log('Server is up with express on port: ', port);
  });

  app.get("/getInfo", async (req, res) => {
    res.send(info);      
  })

  app.post("/add", async (req, res) => {
    let person=req.body.data;
    info.push(person);
    res.send(info);      
  })

  app.post("/update", async (req, res) => {
    let {person,index}=req.body;
    info.splice(index,1,person);
    res.send(info);      
  })

  app.post("/remove", async (req, res) => {
    let person=req.body.data;
    let index = info.findIndex((e)=>e.name===person.name);
    info.splice(index,1);
    res.send(info);      
  })