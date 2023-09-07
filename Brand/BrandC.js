const express = require("express");
const pool = require("../connection");
const que = require("./BrandQ");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Renvoie toutes les marques
const getBrands = (request, response) => {
  pool.query(que.getbrands, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
//Renvoie les catégories de marques 
const getBrandCat = (request, response) => {
  pool.query(que.getbrandCat, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
//Crée une nouvelle marque 
const createBrand = (request, response) => {
  const {
    BrandName,
    Categorie,
    SousCategorie,
    DateAjout,
    DateExpiration,
    AffichafeAccueil,
  } = request.body;
  pool.query(
    que.Addbrand,
    [
      BrandName,
      Categorie,
      SousCategorie,
      DateAjout,
      DateExpiration,
      AffichafeAccueil,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ message: "Brand created succefully" });
    }
  );
};
//renvoient des marques spécifiques en fonction de la catégorie
const getBrandsbyCat = (request, response) => {
  const Categorie = request.params.Categorie;
  pool.query(que.getbrandbycate, [Categorie], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getBrandMode = (request, response) => {
  const Categorie = "Mode";
  pool.query(que.getbrandbycate, [Categorie], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getBrandMaison = (request, response) => {
  const Categorie = "Maison";
  pool.query(que.getbrandbycate, [Categorie], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getBrandVoyage = (request, response) => {
  const Categorie = "Voyage";
  pool.query(que.getbrandbycate, [Categorie], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getBrandBeaute = (request, response) => {
  const Categorie = "Beauté";
  pool.query(que.getbrandbycate, [Categorie], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getBrandGastronomie = (request, response) => {
  const Categorie = "Gastronomie";
  pool.query(que.getbrandbycate, [Categorie], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getBrandEnfant = (request, response) => {
  const Categorie = "Enfant";
  pool.query(que.getbrandbycate, [Categorie], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getBrandSport = (request, response) => {
  const Categorie = "Sport";
  pool.query(que.getbrandbycate, [Categorie], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getBrandLoisir = (request, response) => {
  const Categorie = "Loisir";
  pool.query(que.getbrandbycate, [Categorie], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
//  Met à jour les informations d'une marque 
const updateBrand = (request, response) => {
  const id = parseInt(request.params.id);
  const {
    BrandName,
    Categorie,
    SousCategorie,
    DateAjout,
    DateExpiration,
    AffichafeAccueil,
  } = request.body;
  pool.query(
    que.updatebrand,
    [
      BrandName,
      Categorie,
      SousCategorie,
      DateAjout,
      DateExpiration,
      AffichafeAccueil,
      id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ message: "Brand updated succefully" });
    }
  );
};
//Renvoie des marques en fonction du champ "Affichage Accueil"
const getBrandAcc1 = (request, response) => {
  const AffichafeAccueil = "ÇA VA VOUS PLAIRE";
  pool.query(que.getbrandbyAccueil, [AffichafeAccueil], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getBrandAcc2 = (request, response) => {
  const AffichafeAccueil = "C'EST TOUT NOUVEAU";
  pool.query(que.getbrandbyAccueil, [AffichafeAccueil], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getBrandAcc3 = (request, response) => {
  const AffichafeAccueil = "ENCORE QUELQUES JOURS";
  pool.query(que.getbrandbyAccueil, [AffichafeAccueil], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
//  Renvoie une marque en fonction de son ID
const getBrandById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(que.getbrandbyid, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
//Renvoie le nombre total de marques
const GetBrandNbr = (request, response) => {
  pool.query(que.NBRBrand,(error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
//delete
const deleteBrand = (request, response) => {
  const id = parseInt(request.params.id);
  try {
    pool.query(que.removeDevis, [id], (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(200).json("Chat supprimé");
    });
  } catch (error) {
    console.error("Erreur lors de la requête à la base de données:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};
module.exports = {
  getBrands,
  createBrand,
  getBrandsbyCat,
  getBrandMode,
  getBrandMaison,
  getBrandVoyage,
  getBrandBeaute,
  getBrandGastronomie,
  getBrandEnfant,
  getBrandSport,
  getBrandLoisir,
  updateBrand,
  getBrandAcc1,
  getBrandAcc2,
  getBrandAcc3,
  getBrandById,
  GetBrandNbr,
  getBrandCat,
  deleteBrand
};
