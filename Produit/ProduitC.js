const express = require("express");
const pool = require("../connection");
const que = require("./ProduitQ");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const getProduits = (request, response) => {
  pool.query(que.getProduits, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const createProduit = (request, response) => {
    const {
      Categorie,
      SousCategorie,
      Brand,
      Produit,
      QteDsStock,
      Prix,
      PrixR,
      Reduction,
      Couleur,
      Taille,
      Genre,
      GroupAge,
      Images,
      DetailsP,
      PrixLivraision,
      livraisonestime
    } = request.body;
    pool.query(
      que.AddProduit,
      [
        Categorie,
        SousCategorie,
        Brand,
        Produit,
        QteDsStock,
        Prix,
        PrixR,
        Reduction,
        Couleur,
        Taille,
        Genre,
        GroupAge,
        Images,
        DetailsP,
        PrixLivraision,
        livraisonestime
      ],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).json({ message: "Product created succefully" });
      }
    );
  };
module.exports = {
    getProduits,
    createProduit
  };