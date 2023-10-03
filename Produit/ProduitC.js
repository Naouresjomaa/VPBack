const express = require("express");
const pool = require("../connection");
const que = require("./ProduitQ");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getProduits = (request, response) => {
  pool.query(que.getProduits, (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }
    response.status(200).json(results.rows);
  });
};


const createProduit = (request, response) => {
  let Image=''
  if(request.file){
     Image = request.file.filename;
     console.log('imaaaaaage',Image)
  }
  console.log('request.body',request.body)
  let {
   
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
    idbrand
    
  } = request.body;
  QteDsStock = QteDsStock.split(',').map(Number);  // Convertit '1,2' en [1, 2]
  Taille = Taille.split(',');
  try {
    pool.query(
      que.AddProduit,
      [
      
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
      
        DetailsP,
        PrixLivraision,
        livraisonestime,
        idbrand,
        Image
      ],
      (error, results) => {
        if (error) {
          console.error("Erreur lors de la requête à la base de données:", error.message);
          return response.status(500).json({ message: "Erreur interne du serveur" });
        }
        response.status(201).json({ message: "Product created succefully" });
      }
    );
  } catch (error) {
    console.error("Erreur lors de la requête à la base de données:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};


const updateProduit = (request, response) => {
  let Image
  if(request.file && request.file.length > 0 ){
     Image = request.file?.filename;
    console.log('imaaaaaage', request.file)
 }
 else{
   Image = request.body.Image;
 }
  
  let {

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
    idbrand,
    id
  } = request.body;
  QteDsStock = QteDsStock.split(',').map(Number); 
  Taille = Taille.split(',');
  try {
console.log(SousCategorie,
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
  DetailsP,
  PrixLivraision,
  livraisonestime,
  idbrand,
  Image,
  id)
    pool.query(
      que.updateproduit,
      [
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
        DetailsP,
        PrixLivraision,
        livraisonestime,
        idbrand,
        Image,
        id
      ],
      (error, results) => {
        if (error) {
          console.error("Erreur lors de la requête à la base de données:", error.message);
          return response.status(500).json({ message: "Erreur interne du serveur" });
        }
        response.status(201).json({ message: "Produit updated succefully" });
      }
    );
  } catch (error) {
    console.error("Erreur lors de la requête à la base de données:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};


const getProduitsbyBrand = (request, response) => {


  const id = parseInt(request.params.id);  
  try {
    pool.query(que.getproduitbybrand, [id], (error, results) => {
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


const getProduitById = (request, response) => {
  const id = parseInt(request.params.id);
  try {
    pool.query(que.getproduitbyid, [id], (error, results) => {
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


const GetproduitNbr = (request, response) => {
  pool.query(que.NBRProduit, (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }
    response.status(200).json(results.rows);
  });
};

const GetCommandeNbr = (request, response) => {
  pool.query(que.NBRProduit2, (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }
    response.status(200).json(results.rows);
  });
};
const RemoveProduit = (request, response) => {
  const id = parseInt(request.params.id);
  try {
    pool.query(que.removeProduit, [id], (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(200).json("Product deleted");
    });
  } catch (error) {
    console.error("Erreur lors de la requête à la base de données:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};


module.exports = {
  getProduits,
  createProduit,
  updateProduit,
  getProduitsbyBrand,
  getProduitById,
  GetproduitNbr,
  RemoveProduit,
  GetCommandeNbr
};
