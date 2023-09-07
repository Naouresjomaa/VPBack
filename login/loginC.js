const express = require("express");
const pool = require("../connection");
const que = require("./loginQ");
const app = express();
const jwt = require("jsonwebtoken");
const login = require("./login/loginC");
const secretKey = "SecretKeyNeverHacked2023";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const LoginAdmin = (request, response) => {
    const { Email, Login } = request.body;
    pool.query(que.checkEmail, [Email], (error, results) => {
      const user = results.rows;
      if (user.length == 0) {
        response.json({ message: "Vérifier Email !" });
      } else {
        if (Login == user[0].Login) {
          jwt.sign(user[0], secretKey, (error, results) => {
            if (error) {
              console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
            } else {
              response
                .status(200)
                .json({ Token: results,  message: "Vous êtes connecté" });
            }
          });
        } else {
          response.json({
            message: "Vérifier Mot de Passe !",
          });
        }
      }
    });
  };
module.exports = {
    LoginAdmin

};
