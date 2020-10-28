const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;


const Op = db.Op;
var sessionstorage = require('sessionstorage');



exports.signup = (req, res) => {
  // Save user to database
  User.create({
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    direction: req.body.direction,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      
          res.send({ message: "User was registered successfully!" });
      
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};




exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Utilisateur n'existe pas" });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe incorrecte!"
        });
      }

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      
     
       /* sessionstorage.setItem('id', user.id);
        console.log();
       */
        //
        res.status(200).send({
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          accessToken: token
        });
     
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};



exports.getAllUser = (req, res,next) => {
  User.findAll({where: 
    { direction: null } 
    }).then(users=>{
   res.send(users);


  })     
     
};

exports.delete= (req, res) => {
  const id = req.params.id;  
  User.destroy({
     where: { id: id }
   })
     .then(() => {
         res.send({
           message: "User was deleted successfully!"
         });
      
     })
     .catch(err => {
       res.status(500).send({
         message: err
       });
     });
};