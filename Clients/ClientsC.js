const express = require("express");
const axios = require("axios");
const pool = require("../connection");
const que = require("./ClientsQ");
const app = express();
const jwt = require("jsonwebtoken");
const accessKey = "Sz8ziUg6q4conqG92VK3HPWvDxTwEfH3";
const secretKey = "VentePriveeSecretKeyNeverHacked12";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const getClients = (request, response) => {
  pool.query(que.getClients, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const createClient = (request, response) => {
  const {
    NomComplet,
    UserName,
    Genre,
    Email,
    Telephone,
    Password,
    Ville,
    Adresse,
    DateNaissance,
  } = request.body;
  pool.query(que.checkEmailexistance, [Email], (error, results) => {
    if (results.rows.length) {
      response.json({ message: "Email already exist !" });
    } else {
      pool.query(que.checkUserNameexistance, [UserName], (error, results) => {
        if (results.rows.length) {
          response.json({ message: "UserName already exist !" });
        } else {
          pool.query(
            que.AddClient,
            [
              NomComplet,
              UserName,
              Genre,
              Email,
              Telephone,
              Password,
              Ville,
              Adresse,
              DateNaissance,
            ],
            (error, results) => {
              if (error) {
                throw error;
              } else {
                response
                  .status(200)
                  .json({ message: "Client added successfully" });
              }
            }
          );
        }
      });
    }
  });
};
const LoginAuth = (request, response) => {
  const { Email, Password } = request.body;
  pool.query(que.checkEmail, [Email], (error, results) => {
    const user = results.rows;
    if (user.length == 0) {
      response.json({ message: "Vérifier Email !" });
    } else {
      if (Password == user[0].Password) {
        jwt.sign(user[0], secretKey, (error, results) => {
          if (error) {
            response.json({ error: error });
          } else {
            response
              .status(200)
              .json({ Token: results, user, message: "Vous êtes connecté" });
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
const checkEmailEx = async (request, response) => {
  const Email = request.body;
  // Send a request to the Mailboxlayer email validation API
  try {
    const response = await axios.get(
      `https://apilayer.net/api/check?access_key=${accessKey}&email=${Email}`
    );
    const data = response.data;

    // Check if the email exists
    if (data.format_valid && data.mx_found && data.smtp_check) {
      res.send({ exists: true });
    } else {
      res.send({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error verifying email address");
  }
};
const updateClient = (request, response) => {
  const id = parseInt(request.params.id);
  const {
    NomComplet,
    UserName,
    Genre,
    Email,
    Telephone,
    Password,
    Ville,
    Adresse,
    DateNaissance,
  } = request.body;
  pool.query(que.getclientbyid, [id], (error, results) => {
    const noclientfound = !results.rows.length;
    if (noclientfound) {
      response.json({ message: "No client found in database" });
    }
  });
  pool.query(
    que.updateclient,
    [
      NomComplet,
      UserName,
      Genre,
      Email,
      Telephone,
      Password,
      Ville,
      Adresse,
      DateNaissance,
      id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ message: "Client updated succefully" });
    }
  );
};
const getClientById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(que.getclientbyid, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
module.exports = {
  getClients,
  createClient,
  checkEmailEx,
  LoginAuth,
  updateClient,
  getClientById,
};
