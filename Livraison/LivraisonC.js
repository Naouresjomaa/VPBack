const express = require("express");
const pool = require("../connection");
const que = require("./LivraisonQ");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const getLivraison = (request, response) => {
  pool.query(que.getAlllivraison, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const GetLivraisonByRegion = (request, response) => {
  const Region = request.params.Region;
  pool.query(que.getlivraisonByRegion, [Region], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
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
  pool.query(
    que.UpdateLivraison,
    [Region, PrixLivraison, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ message: "Livraison updated succefully" });
    }
  );
};
const Removelivraison = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query(que.removelivraison, [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json({ message:"Livraison deleted"});
    });
  };
module.exports = {
  createLivraison,
  GetLivraisonByRegion,
  getLivraison,
  updateLivraison,
  Removelivraison
};
