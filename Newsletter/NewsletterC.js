const express = require("express");
const pool = require("../connection");
const que = require("./NewsletterQ");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "lea.conseil.web@leaconseil.com",
    pass: "DDH19982023",
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
});




const AddNewsLetter = (request, response) => {
  const { Email, DateAjout } = request.body;
  try{
    pool.query(que.AddNewsletter, [Email, DateAjout], (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(201).json({ message: "Newsletter created succefully" });
    });
  }catch{
    console.error("Erreur lors de la requête à la base de données:", error.message);
  return response.status(500).json({ message: "Erreur interne du serveur" });
  }

  let mailcontent =
    "Newsletter Envoyé : " +
    "\n" +
    "Email : " +
    Email +
    "\n" +
    "Date : " +
    DateAjout;
  let mailOptions = {
    from: "LEACONSEIL <lea.conseil.web@leaconseil.com>",
    to: "contact@leaconseil.com",
    subject: "Newsletter",
    text: "Newsletter LEACONSEIL",
    html: mailcontent,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};
const getNewsletter = (request, response) => {
  try{
    pool.query(que.getnewsletter, (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
          return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(200).json(results.rows);
    });
  }catch{console.error("Erreur lors de la requête à la base de données:", error.message);
  return response.status(500).json({ message: "Erreur interne du serveur" });}
 
};
const GetnewsNbr = (request, response) => {
  pool.query(que.NBRNews, (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
    }
    response.status(200).json(results.rows);
  });
};
const deleteNewsletter = (request, response) => {
  const id = parseInt(request.params.id);
  try {
    pool.query(que.removeNewsletter, [id], (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(200).json("Actualité supprimé");
    });
  } catch (error) {
    console.error("Erreur lors de la requête à la base de données:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};
const getByIdNewsletter = (request, response) => {
  const id = parseInt(request.params.id);
  try{  pool.query(que.getNewsletterbyid, [id], (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
              return response.status(500).json({ message: "Erreur interne du serveur" });
    }
    response.status(200).json(results.rows);
  });}catch{
    console.error("Erreur lors de la requête à la base de données:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }

};
module.exports = {
  AddNewsLetter,
  getNewsletter,
  GetnewsNbr,
  deleteNewsletter,
  getByIdNewsletter
};
