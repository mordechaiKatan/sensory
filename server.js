const express = require("express")
const app = express();
const http = require('http').createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
const info= require("./info.json");
const { port } = require('./config');
const connect = require('./db');
const User= require('./models/User');

app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use('/', express.static(path.join(__dirname, 'client/dist')));
app.use(express.static(path.join(__dirname, 'client/dist')));

connect().then(() => {
  console.log('MONGO DB is connected');
  http.listen(port, () => {
    console.log('Server is up with express on port: ', port);
  });
});

  app.get("/getInfo", async (req, res) => {
    const info=await User.find().exec();
    res.send(info);      
  })

  app.post("/add", async (req, res) => {
    let user=req.body.person;
    let newUser=new User (user);
    await newUser.save();
    let info = await User.find().exec();
    res.send(info);      
  })

  app.put("/update/:id", async (req, res) => {
    let id=req.params.id;
    let user=req.body.person;
    console.log(user);
    await User.findOneAndUpdate(
      {_id:id},
      {name:user.name,profession:user.profession}
    ).exec();
    let info= await User.find().exec();
    console.log(info[0]);
    res.send(info);      
  })

  app.delete("/remove/:id", async (req, res) => {
    let id=req.params.id;
    await User.findOneAndDelete({_id:id});
    let info=await User.find().exec();
    res.send(info);      
  })

//   let users = [
//     {"name":"Avi", "profession": "carpenter"},
//     {"name":"Roni", "profession": "driver"},
//     {"name":"Dani", "profession": "cook"},
//     {"name":"Ori", "profession": "cook"},
//     {"name":"David", "profession": "driver"},
//     {"name":"Sara", "profession": "cook"},
//     {"name":"Hadas", "profession": "teacher"},
//     {"name":"Nachman", "profession": "praying"}
//   ]  
//   User.deleteMany({}).exec().then(()=>{
//   User.collection.insertMany(users, function (err, docs) {
//           if (err){ 
//               return console.error(err);
//           } else {
//             console.log("Multiple documents inserted to Collection");
//           }
//                 });
// })