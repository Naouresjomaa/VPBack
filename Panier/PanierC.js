const express = require("express");
const pool = require("../connection");
const que = require("./PanierQ");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const GetPanier = (request, response) => {
  const Email = request.params.Email;
  const UserName = request.params.UserName;
  pool.query(que.getPaniers, [Email, UserName], (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }
    response.status(200).json(results.rows);
  });
};



const createPanier = (request, response) => {
  const {
    Produit,
    ProdDetails,
    PrixUnitaire,
    Quantite,
    PrixTotale,
    UserName,
    Email,
    taille
  } = request.body;
  
  try {
    pool.query(
      que.createPanier,
      [Produit, ProdDetails, PrixUnitaire, Quantite, PrixTotale, UserName, Email,taille],
      (error, results) => {
        if (error) {
          console.error("Erreur lors de la requête à la base de données:", error.message);
          return response.status(500).json({ message: "Erreur interne du serveur" });
        }
        response.status(201).json({ message: "Panier créé avec succès" });
      }
    );
  } catch (error) {
    console.error("Erreur lors de la requête à la base de données:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};



const updatePanier = (request, response) => {
  const id = parseInt(request.params.id);
  console.log(id)
  const {
    Produit,
    ProdDetails,
    PrixUnitaire,
    Quantite,
    PrixTotale,
    UserName,
    Email,
    taille
  } = request.body;
  console.log(Produit, ProdDetails, PrixUnitaire, Quantite, PrixTotale, UserName, Email,taille, id)
  // Vérification préalable de l'existence du panier
  pool.query(que.GetPanierbyid, [id], (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }

    const noPanierFound = !results.rows.length;

    if (noPanierFound) {
      return response.status(404).json({ message: "Aucun panier trouvé dans la base de données" });
    }
console.log(Produit, ProdDetails, PrixUnitaire, Quantite, PrixTotale, UserName, Email,taille, id)
    // Le panier existe, nous pouvons procéder à la mise à jour
    pool.query(
      que.UpdatePanier,
      [Produit, ProdDetails, PrixUnitaire, Quantite, PrixTotale, UserName, Email,taille, id],
      (error, results) => {
        if (error) {
          console.error("Erreur lors de la requête à la base de données:", error.message);
          return response.status(500).json({ message: "Erreur interne du serveur" });
        }
        response.status(201).json({ message: "Panier mis à jour avec succès" });
      }
    );
  });
};



const getPanierById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(que.GetPanierbyid, [id], (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }

    if (results.rows.length === 0) {
      return response.status(404).json({ message: "Panier non trouvé" });
    }

    response.status(200).json(results.rows);
  });
};



const RemoveallPanier = (request, response) => {
  const Email = request.params.Email;
  const UserName = request.params.UserName;

  pool.query(que.deleteallpanier, [Email, UserName], (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }

    if (results.rowCount === 0) {
      // Aucun panier n'a été vidé (peut-être que l'Email ou le UserName n'existe pas)
      return response.status(404).json({ message: "Aucun panier trouvé pour cet Email et UserName" });
    }

    // Succès : Tous les paniers ont été vidés avec succès
    response.status(200).json({ message: "Tous les paniers ont été vidés avec succès" });
  });
};



const RemovPanier = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(que.removepanier, [id], (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }

    if (results.rowCount === 0) {
      // Aucun panier n'a été supprimé (peut-être que l'ID n'existe pas)
      return response.status(404).json({ message: "Aucun panier trouvé avec cet ID" });
    }

    // Succès : Le panier a été supprimé avec succès
    response.status(200).json({ message: "Panier supprimé avec succès" });
  });
};



module.exports = {
  GetPanier,
  createPanier,
  updatePanier,
  getPanierById,
  RemoveallPanier,
  RemovPanier
};
