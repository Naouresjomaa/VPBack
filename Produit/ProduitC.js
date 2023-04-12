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
    livraisonestime,
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
      livraisonestime,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ message: "Product created succefully" });
    }
  );
};
const updateProduit = (request, response) => {
  const id = parseInt(request.params.id);
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
    livraisonestime,
  } = request.body;
  pool.query(
    que.updateproduit,
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
      livraisonestime,
      id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ message: "Produit updated succefully" });
    }
  );
};
const getProduitsbyBrand = (request, response) => {
  const Brand = request.params.Brand;
  pool.query(que.getproduitbybrand, [Brand], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getProduitById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(que.getproduitbyid, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
module.exports = {
  getProduits,
  createProduit,
  updateProduit,
  getProduitsbyBrand,
  getProduitById,
};
