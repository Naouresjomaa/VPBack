const express = require("express");
const pool = require("../connection");
const que = require("./BrandQ");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const getBrands = (request, response) => {
  pool.query(que.getbrands, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getBrandCat = (request, response) => {
  pool.query(que.getbrandCat, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
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
const getBrandById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(que.getbrandbyid, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const GetBrandNbr = (request, response) => {
  pool.query(que.NBRBrand,(error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
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
  getBrandCat
};
