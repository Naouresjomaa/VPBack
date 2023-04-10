const express = require("express");
const pool = require("../connection");
const que = require("./ParametreProdQ");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const GetParametre = (request, response) => {
  pool.query(que.getParametre, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const CreateParametre = (request, response) => {
  const { Categorie, SousCategorie, Taille, Couleur, Genre, GroupeAge } =
    request.body;
  pool.query(
    que.Addparametre,
    [Categorie, SousCategorie, Taille, Couleur, Genre, GroupeAge],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ message: "Parameter created succefully" });
    }
  );
};
const getParameterById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(que.getparameterbyid, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const updateParameter = (request, response) => {
  const id = parseInt(request.params.id);
  const { Categorie, SousCategorie, Taille, Couleur, Genre, GroupeAge } =
    request.body;
  pool.query(
    que.updateparameter,
    [Categorie, SousCategorie, Taille, Couleur, Genre, GroupeAge, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ message: "Parametre updated succefully" });
    }
  ); 
};
const RemoveParameter = (request, response) => {
    const id = parseInt(request.params.id);
      pool.query(que.removeparametre, [id], (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json("Parameter deleted");
      });
  };
module.exports = {
  GetParametre,
  CreateParametre,
  getParameterById,
  updateParameter,
  RemoveParameter
};
