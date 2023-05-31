const express = require("express");
const pool = require("../connection");
const que = require("./CommandeQ");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const getCommandes = (request, response) => {
  pool.query(que.getCommandes, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const createCommandes = (request, response) => {
  const {
    RefCommande,
    UserName,
    Email,
    Date,
    Heure,
    NomClient,
    Adresse,
    Gouvernerat,
    Order,
    PrixTotal,
    PrixLivraison,
    Couppons,
    NetaPayer,
    Telephone,
    Message,
    CodePostal,
    TypePaiement,
  } = request.body;
  pool.query(
    que.AddCommande,
    [
      RefCommande,
      UserName,
      Email,
      Date,
      Heure,
      NomClient,
      Adresse,
      Gouvernerat,
      Order,
      PrixTotal,
      PrixLivraison,
      Couppons,
      NetaPayer,
      Telephone,
      Message,
      CodePostal,
      TypePaiement,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .json({ message: "Commande created succefully", results });
    }
  );
};
const updateCommande = (request, response) => {
  const id = parseInt(request.params.id);
  const {
    RefCommande,
    UserName,
    Email,
    Date,
    Heure,
    NomClient,
    Adresse,
    Gouvernerat,
    Order,
    PrixTotal,
    PrixLivraison,
    Couppons,
    NetaPayer,
    Telephone,
    Message,
    CodePostal,
    TypePaiement,
  } = request.body;
  pool.query(
    que.UpdateCommande,
    [
      RefCommande,
      UserName,
      Email,
      Date,
      Heure,
      NomClient,
      Adresse,
      Gouvernerat,
      Order,
      PrixTotal,
      PrixLivraison,
      Couppons,
      NetaPayer,
      Telephone,
      Message,
      CodePostal,
      TypePaiement,
      id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ message: "Commande updated succefully" });
    }
  );
};
const getCommandeById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(que.CommandeById, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const GetCommandeByUserNameEmail = (request, response) => {
  const Email = request.params.Email;
  const UserName = request.params.UserName;
  pool.query(
    que.getCommadeByEmailUserName,
    [Email, UserName],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const LastInvoice = (request, response) => {
  const Email = request.params.Email;
  const UserName = request.params.UserName;
  pool.query(que.lastinvoice, [Email, UserName], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
module.exports = {
  getCommandes,
  createCommandes,
  updateCommande,
  getCommandeById,
  GetCommandeByUserNameEmail,
  LastInvoice,
};
