const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./app/config/config.js");
const multer = require('multer');
const app = express();
const bcrypt = require("bcryptjs");
const XLSX = require("xlsx")
const wb =XLSX.readFile('../fich.xlsx');



const corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



// database
const db = require("./app/models");
const User = db.user;


db.sequelize.sync().then(() => {
 //initial(); // Just use it in development, at the first time execution!. Delete it in production
});


var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      //cb(null, './uploads');
      
      cb(null, 'app/files');
   },
  filename: function (req, file, cb) {
      cb(null , file.originalname);
  }
});

var upload = multer({ storage: storage })



app.post('/single', upload.single('fichier'), (req, res) => {
  try {
    const sheetName=wb.SheetNames[0];
const ws= wb.Sheets[sheetName];
const json=XLSX.utils.sheet_to_json(ws);
console.log(json);
var t=new Array(); 
for(i in json){
  user={
    email:json[i].email,
    nom:json[i].nom,
    prenom:json[i].prenom,
    password:json[i].password,
    direction:null
  }
t.push(user);
}
User.bulkCreate(t).then((users)=>{
  t=[];
});
console.log(json[0].email);
    res.send(req.file);
  }catch(err) {
    res.send(400);
  }
})








// api routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Just use it in development, at the first time execution!. Delete it in production

function initial() {
}
