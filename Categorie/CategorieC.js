const express = require("express");
const pool = require("../connection");
const que = require("./CategorieQ");
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));



const getCategories = (request, response) => {
  try {
    pool.query(que.getCategorie, (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données :", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};



const updateCategorie = (request, response) => {
  const id = parseInt(request.params.id);
  const { Categorie, ImageCouverture } = request.body;

  // Vérification de l'existence de la catégorie avec l'ID spécifié
  pool.query(que.getcategoriebyid, [id], (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }

    const nocategoriefound = !results.rows.length;

    if (nocategoriefound) {
      return response.status(404).json({ message: "Aucune catégorie trouvée dans la base de données" });
    }

    // Si la catégorie existe, effectuez la mise à jour
    pool.query(
      que.updateCategorie,
      [Categorie, ImageCouverture, id],
      (error, results) => {
        if (error) {
          console.error("Erreur lors de la requête à la base de données:", error.message);
          return response.status(500).json({ message: "Erreur interne du serveur" });
        }

        response.status(201).json({ message: "Catégorie mise à jour avec succès" });
      }
    );
  });
};



const GetcategorieNbr = (request, response) => {
  // Récupération du nombre de catégories
  pool.query(que.NBRCategorie, (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }

    response.status(200).json(results.rows);
  });
};


const getCategorieById = (request, response) => {
  const id = parseInt(request.params.id);

  // Requête pour obtenir la catégorie par son ID
  pool.query(que.getcategoriebyid, [id], (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }

    const noCategoryFound = !results.rows.length;

    if (noCategoryFound) {
      return response.status(404).json({ message: "Aucune catégorie trouvée dans la base de données" });
    }

    response.status(200).json(results.rows[0]);
  });
};



module.exports = {
  getCategories,
  updateCategorie,
  GetcategorieNbr,
  getCategorieById
};
