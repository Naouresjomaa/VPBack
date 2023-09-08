const express = require("express");
const pool = require("../connection");
const que = require("./ParametreProdQ");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const GetParametre = (request, response) => {
  pool.query(que.getParametre, (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }
    response.status(200).json(results.rows);
  });
};




const CreateParametre = (request, response) => {
  const { Categorie, SousCategorie, Taille, Couleur, Genre, GroupeAge } =
    request.body;
  try {
    pool.query(que.getParameterbyCatSC, [Categorie, SousCategorie], (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }

      if (results.rows.length) {
        return response.json({ message: "Parametre already exist !" });
      } else {
        pool.query(
          que.Addparametre,
          [Categorie, SousCategorie, Taille, Couleur, Genre, GroupeAge],
          (error, results) => {
            if (error) {
              console.error("Erreur lors de la requête à la base de données:", error.message);
              return response.status(500).json({ message: "Erreur interne du serveur" });
            }
            response
              .status(201)
              .json({ message: "Parameter created successfully" });
          }
        );
      }
    });
  } catch (error) {
    console.error("Erreur lors de la requête à la base de données:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};



const getParameterById = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    pool.query(que.getparameterbyid, [id], (error, results) => {
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




const updateParameter = (request, response) => {
  const id = parseInt(request.params.id);
  const { Categorie, SousCategorie, Taille, Couleur, Genre, GroupeAge } =
    request.body;
  try {
    pool.query(que.updateparameter, [Categorie, SousCategorie, Taille, Couleur, Genre, GroupeAge, id], (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(201).json({ message: "Parametre updated successfully" });
    });
  } catch (error) {
    console.error("Erreur lors de la requête à la base de données:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};



const RemoveParameter = (request, response) => {
  const id = parseInt(request.params.id);
  try {
    pool.query(que.removeparametre, [id], (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(200).json("Parameter deleted");
    });
  } catch (error) {
    console.error("Erreur lors de la requête à la base de données:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};




const getParametyresbyCatSc = (request, response) => {
  const Categorie = request.params.Categorie;
  const SousCategorie = request.params.SousCategorie;
  try {
    pool.query(
      que.getParameterbyCatSC,
      [Categorie, SousCategorie],
      (error, results) => {
        if (error) {
          console.error("Erreur lors de la requête à la base de données:", error.message);
          return response.status(500).json({ message: "Erreur interne du serveur" });
        }
        response.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.error("Erreur lors de la requête à la base de données:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};



module.exports = {
  GetParametre,
  CreateParametre,
  getParameterById,
  updateParameter,
  RemoveParameter,
  getParametyresbyCatSc,
};
