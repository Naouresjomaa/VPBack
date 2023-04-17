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
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const createPanier = (request, response) => {
  const {
    idproduit,
    Brand,
    Email,
    UserName,
    Produit,
    Couleur,
    Taille,
    Genre,
    GroupAge,
    Images,
    DetailsP,
    prixunitaire,
    quantite,
    prixtotale,
  } = request.body;
  pool.query(
    que.createPanier,
    [
      idproduit,
      Brand,
      Email,
      UserName,
      Produit,
      Couleur,
      Taille,
      Genre,
      GroupAge,
      Images,
      DetailsP,
      prixunitaire,
      quantite,
      prixtotale,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ message: "Panier created succefully" });
    }
  );
};
const updatePanier = (request, response) => {
  const id = parseInt(request.params.id);
  const {
    idproduit,
    Brand,
    Email,
    UserName,
    Produit,
    Couleur,
    Taille,
    Genre,
    GroupAge,
    Images,
    DetailsP,
    prixunitaire,
    quantite,
    prixtotale,
  } = request.body;
  pool.query(
    que.UpdatePanier,
    [
      idproduit,
      Brand,
      Email,
      UserName,
      Produit,
      Couleur,
      Taille,
      Genre,
      GroupAge,
      Images,
      DetailsP,
      prixunitaire,
      quantite,
      prixtotale,
      id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ message: "Panier updated succefully" });
    }
  );
};
const getPanierById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(que.GetPanierbyid, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const RemoveallPanier = (request, response) => {
  const Email = request.params.Email;
  const UserName = request.params.UserName;
  pool.query(que.deleteallpanier, [Email, UserName], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json("Panier empty");
  });
};
module.exports = {
  GetPanier,
  createPanier,
  updatePanier,
  getPanierById,
  RemoveallPanier
};
