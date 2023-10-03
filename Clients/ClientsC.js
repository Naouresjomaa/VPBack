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
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }
    response.status(200).json(results.rows);
  });
};


const genererChaineAleatoire=()=> {
  const caracteres = '0123456789';
  let resultat = '';
  for (let i = 0; i < 7; i++) {
    const indexAleatoire = Math.floor(Math.random() * caracteres.length);
    resultat += caracteres.charAt(indexAleatoire);
  }
  return resultat
}

const createClient = (request, response) => {
  try {
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
      solde,
      parainageUser
    } = request.body;
    let parrainage = genererChaineAleatoire();
    console.log(parrainage);

    // Vérification de l'existence du nom d'utilisateur
    pool.query(que.checkUserNameexistance, [UserName], (error, usernameResults) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }

      if (usernameResults.rows.length) {
        return response.json({ message: 'UserName already exist !' });
      }

      
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
          parrainage,
          solde
        ],
        (error, addClientResults) => {
          if (error) {
            console.error("Erreur lors de la requête à la base de données:", error.message);
            return response.status(500).json({ message: "Erreur interne du serveur" });
          }
          const user = addClientResults.rows[0];
          console.log('User Added:', user);
          if(parainageUser && parainageUser.length>0){
            updateClientParrainage(parainageUser)
          }
          jwt.sign(user, secretKey, (error, token) => {
            if (error) {
              console.error("Erreur lors de la génération du jeton JWT:", error.message);
              return response.status(500).json({ message: "Erreur interne du serveur" });
            }

            response
              .status(200)
              .json({ Token: token, user, message: "Client added successfully" });
          })
        }
      );
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Erreur inattendue" });
  }
};
const createClientAuth = (NomComplet, callback) => {
  console.log('NomComplet',NomComplet)
  try {
    let Username = NomComplet;
    let Email = "";
    let Password = "";
    let parrainage = genererChaineAleatoire();
    pool.query(que.checkUserNameexistance, [Username], (error, usernameResults) => {
      if (error) {
        console.log(error);
        return callback(error);
      }

      if (usernameResults.rows.length) {
        jwt.sign(usernameResults.rows[0], secretKey, (error, token) => {
          if (error) {
            console.log(error);
            return callback(error);
          }

          return callback(null, token);
        });
      } else {
        pool.query(
          que.AddClientAuth,
          [
            Username,
            parrainage,
            Email,
            Password
          ],
          (error, addClientResults) => {
            if (error) {
              console.log(error);
              return callback(error);
            }
            const user = addClientResults.rows[0];

            jwt.sign(user, secretKey, (error, token) => {
              if (error) {
                console.log(error);
                return callback(error);
              }

              return callback(null, token);
            });
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};



const LoginAuth = (request, response) => {
  try {
    const { Email, Password } = request.body;

    pool.query(que.checkEmail, [Email], (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }

      const user = results.rows;

      if (user.length === 0) {
        response.json({ message: "Vérifier Email !" });
      } else {
        if (Password === user[0].Password) {
          jwt.sign(user[0], secretKey, (error, token) => {
            if (error) {
              console.error("Erreur lors de la génération du jeton JWT:", error.message);
              return response.status(500).json({ message: "Erreur interne du serveur" });
            }

            response
              .status(200)
              .json({ Token: token, user, message: "Vous êtes connecté" });
          });
        } else {
          response.json({ message: "Vérifier Mot de Passe !" });
        }
      }
    });
  } catch (error) {
    console.error("Erreur lors de l'authentification:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};




const checkEmailEx = async (request, response) => {
  try {
    const Email = request.body;

    // Send a request to the Mailboxlayer email validation API
    const axiosResponse = await axios.get(
      `https://apilayer.net/api/check?access_key=${accessKey}&email=${Email}`
    );
    const data = axiosResponse.data;

    // Check if the email exists
    if (data.format_valid && data.mx_found && data.smtp_check) {
      response.send({ exists: true });
    } else {
      response.send({ exists: false });
    }
  } catch (error) {
    console.error("Erreur lors de la validation de l'adresse e-mail:", error);
    response.status(500).send("Erreur lors de la vérification de l'adresse e-mail");
  }
};




const updateClient = (request, response) => {
  try {
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
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }

      const noclientfound = !results.rows.length;

      if (noclientfound) {
        return response.json({ message: "Aucun client trouvé dans la base de données" });
      }

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
            console.error("Erreur lors de la requête à la base de données:", error.message);
            return response.status(500).json({ message: "Erreur interne du serveur" });
          }

          response.status(201).json({ message: "Client mis à jour avec succès" });
        }
      );
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du client:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const updateClientParrainage = (parrainageCode) => {
  try {
    
   const parrainage =10;
    pool.query(que.getclientbyParrainage, [parrainageCode], (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
      }
      const user = results.rows[0];
      let solde = user.solde ? +user.solde : 0; // convertir user.solde en nombre
      solde += parrainage; 
      pool.query(
        que.updateclientParrainage,
        [
          solde,
          parrainageCode
        ],
        (error, results) => {
          if (error) {
            console.error("Erreur lors de la requête à la base de données:", error.message);
          }

          console.error("success");
        }
      );
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du client:", error.message);
  }
};


const getClientById = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    
    pool.query(que.getclientbyid, [id], (error, results) => {
      if (error) {
        console.error("Error querying the database:", error.message);
        return response.status(500).json({ message: "Internal server error" });
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error("Error in getClientById:", error.message);
    return response.status(500).json({ message: "Internal server error" });
  }
};
const getClientByParrainage = (request, response) => {
  try {
    const id = request.params.id;
    
    pool.query(que.getclientbyParrainage, [id], (error, results) => {
      if (error) {
        console.error("Error querying the database:", error.message);
        return response.status(500).json({ message: "Internal server error" });
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error("Error in getClientById:", error.message);
    return response.status(500).json({ message: "Internal server error" });
  }
};



const GetClientNbr = (request, response) => {
  try {
    pool.query(que.NBRClient, (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du nombre de clients:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};




module.exports = {
  getClients,
  createClient,
  checkEmailEx,
  LoginAuth,
  updateClient,
  getClientById,
  GetClientNbr,
  updateClientParrainage,
  getClientByParrainage,
  createClientAuth
};
