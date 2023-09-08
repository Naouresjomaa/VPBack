const express = require("express");
const pool = require("../connection");
const que = require("./LivraisonQ");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const getLivraison = (request, response) => {
  try {
    pool.query(que.getAlllivraison, (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error("Erreur lors de la requête à la base de données:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};



const GetLivraisonByRegion = (request, response) => {
  const Region = request.params.Region;
  try {
    pool.query(que.getlivraisonByRegion, [Region], (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error("Erreur lors de la requête à la base de données:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};




const createLivraison = (request, response) => {
  const { Region, PrixLivraison } = request.body;
  pool.query(que.createLivraison, [Region, PrixLivraison], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).json({ message: "Livraison created succefully" });
  });
};


const updateLivraison = (request, response) => {
  const id = parseInt(request.params.id);
  const { Region, PrixLivraison } = request.body;

  // Vérification de l'existence de l'enregistrement
  pool.query(que.getLivraisonById, [id], (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }

    const noLivraisonFound = !results.rows.length;

    if (noLivraisonFound) {
      return response.status(404).json({ message: "Aucune livraison trouvée dans la base de données" });
    }

    // Si l'enregistrement existe, effectuer la mise à jour
    pool.query(
      que.updateLivraison,
      [Region, PrixLivraison, id],
      (error, results) => {
        if (error) {
          console.error("Erreur lors de la requête à la base de données:", error.message);
          return response.status(500).json({ message: "Erreur interne du serveur" });
        }
        response.status(201).json({ message: "Livraison mise à jour avec succès" });
      }
    );
  });
};



const Removelivraison = (request, response) => {
  const id = parseInt(request.params.id);
  try {
    pool.query(que.removelivraison, [id], (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(200).json({ message: "Livraison supprimée" });
    });
  } catch (error) {
    console.error("Erreur lors de la requête à la base de données:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};



module.exports = {
  createLivraison,
  GetLivraisonByRegion,
  getLivraison,
  updateLivraison,
  Removelivraison
};
