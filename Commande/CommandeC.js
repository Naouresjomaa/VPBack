const express = require("express");
const pool = require("../connection");
const que = require("./CommandeQ");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const getCommandesEncours = (request, response) => {
  const query = que.getCommandesEncours; // Utilisez la requête appropriée depuis l'objet 'que'
  
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
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
    Statut,
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
      Statut,
    ],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(201).json({ message: "Commande créée avec succès", results });
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
    Statut,
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
      Statut,
      id,
    ],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(201).json({ message: "Commande mise à jour avec succès" });
    }
  );
};



const getCommandeById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(que.CommandeById, [id], (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }
    response.status(200).json(results.rows);
  });
};



const GetCommandeByUserNameEmail = (request, response) => {
  const Email = request.params.Email;
  const UserName = request.params.UserName;
  const Statut = "Pas Commandée";
  pool.query(
    que.getCommadeByEmailUserName,
    [Email, UserName, Statut],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(200).json(results.rows);
    }
  );
};

//cette fonction récupère des informations sur la dernière facture d'un utilisateur en fonction de son adresse e-mail et de son nom d'utilisateur
const LastInvoice = (request, response) => {
  const Email = request.params.Email;
  const UserName = request.params.UserName;

  pool.query(que.lastinvoice, [Email, UserName], (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }

    if (results.rows.length === 0) {
      // Aucune facture trouvée, renvoyer une réponse appropriée
      return response.status(404).json({ message: "Aucune facture trouvée" });
    }

    // La requête s'est bien déroulée, renvoyer les résultats au format JSON
    response.status(200).json(results.rows);
  });
};



module.exports = {
  getCommandesEncours,
  createCommandes,
  updateCommande,
  getCommandeById,
  GetCommandeByUserNameEmail,
  LastInvoice,
};
