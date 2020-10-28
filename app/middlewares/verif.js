const db = require("../models");

const Devis = db.devis;
const Contrat=db.contrat;
const Quittance=db.quittance;
const Sinistre=db.sinistre;
checkDuplicateDevis = (req, res, next) => {
  // Username
  Devis.findOne({
    where: {
        numeroPolice: req.body.numeroPolice
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Erreur! Numero de police est déjà utilisé!"
      });
      return;
    }

    next();  
  });
};
checkDuplicateContrat = (req, res, next) => {
    // Username
    Contrat.findOne({
      where: {
          numeroPolice: req.body.contrat.numeroPolice
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Erreur! Numero de police est déjà utilisé!"
        });
        return;
      }
  
      next();  
    });
  };
  checkDuplicateQuittance = (req, res, next) => {
    // Username
    Quittance.findOne({
      where: {
        numero: req.body.quittance.numero
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Numero prémier quittance est déja utilisé"
        });
        return;
      }
  
  
      // Email
      if(req.body.quittance.numero1){
           Quittance.findOne({
        where: {
          numero: req.body.quittance.numero1
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Numéro deuxiéme quittance est déjà utilisé!"
          });
          return;
        }
  
      });
      }
      next();

      
    });
  };
  checkDuplicateSinistre = (req, res, next) => {
    // Username
    Sinistre.findOne({
      where: {
        numero: req.body.numero
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Erreur! Numero de sinistre est déjà utilisé!"
        });
        return;
      }
  
      next();  
    });
  };
  checkDateDevis = (req, res, next) => {
    // Username
    var dateEffet=req.body.dateEffet;
    var dateFin=req.body.dateFin;
    
      if (dateEffet > dateFin) {
        res.status(400).send({
          message: "Erreur! Date fin doit étre strictement superieru a Date effet!"
        });
        return;
      }
  
      next();  
    
  };
  checkDateContrat = (req, res, next) => {
    // Username
    var dateEffet=req.body.contrat.dateEffet;
    var dateFin=req.body.contrat.dateFin;
    
      if (dateEffet > dateFin) {
        res.status(400).send({
          message: "Erreur! Date fin doit étre strictement superieru a Date effet!"
        });
        return;
      }
  
      next();  
    
  };
const verif = {
    checkDuplicateDevis: checkDuplicateDevis,
    checkDuplicateContrat: checkDuplicateContrat,
    checkDuplicateQuittance: checkDuplicateQuittance,
    checkDuplicateSinistre: checkDuplicateSinistre,
    checkDateDevis: checkDateDevis,
    checkDateContrat: checkDateContrat
};

module.exports = verif;
