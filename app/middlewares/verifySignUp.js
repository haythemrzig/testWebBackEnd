const db = require("../models");

const User = db.user;

checkDuplicateEmail = (req, res, next) => {
  // Username
 


    // Email
    
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Erreur! Email est déjà utilisé!"
        });
        return;
      }

      next();
    });
    
  
};





const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail
};

module.exports = verifySignUp;
