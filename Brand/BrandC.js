const express = require("express");
const pool = require("../connection");
const que = require("./BrandQ");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Renvoie toutes les marques
const getBrands = (request, response) => {
  try {
    pool.query(que.getbrands, (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }

      if (!results.rows.length) {
        return response.status(404).json({ message: "Aucune marque trouvée dans la base de données" });
      }

      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des marques:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};



//Renvoie les catégories de marques 
const getBrandCat = (request, response) => {
  try {
    pool.query(que.getbrandCat, (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }

      if (!results.rows.length) {
        return response.status(404).json({ message: "Aucune marque de catégorie trouvée dans la base de données" });
      }

      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des marques de catégorie:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};



//Crée une nouvelle marque 
const createBrand = (request, response) => {
  const {
    BrandName,
    Categorie,

    DateAjout,
    DateExpiration,
    AffichafeAccueil,
  } = request.body;

  try {
    pool.query(
      que.Addbrand,
      [
        BrandName,
        Categorie,
     
        DateAjout,
        DateExpiration,
        AffichafeAccueil,
      ],
      (error, results) => {
        if (error) {
          console.error("Erreur lors de la requête à la base de données:", error.message);
          return response.status(500).json({ message: "Erreur interne du serveur" });
        }
        response.status(201).json({ message: "Brand created successfully" });
      }
    );
  } catch (error) {
    console.error("Erreur lors de la requête à la base de données:", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};



//renvoient des marques spécifiques en fonction de la catégorie
const getBrandsbyCat = (request, response) => {
  const Categorie = request.params.Categorie;

  try {
    pool.query(que.getbrandbycate, [Categorie], (error, results) => {
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



const getBrandMode = (request, response) => {
  const Categorie = "Mode";

  try {
    pool.query(que.getbrandbycate, [Categorie], (error, results) => {
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



const getBrandMaison = (request, response) => {
  const Categorie = "Maison";

  try {
    pool.query(que.getbrandbycate, [Categorie], (error, results) => {
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


const getBrandVoyage = (request, response) => {
  const Categorie = "Voyage";

  try {
    pool.query(que.getbrandbycate, [Categorie], (error, results) => {
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


const getBrandBeaute = (request, response) => {
  const Categorie = "Beauté";

  try {
    pool.query(que.getbrandbycate, [Categorie], (error, results) => {
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



const getBrandGastronomie = (request, response) => {
  const Categorie = "Gastronomie";

  try {
    pool.query(que.getbrandbycate, [Categorie], (error, results) => {
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



const getBrandEnfant = (request, response) => {
  const Categorie = "Enfant";

  try {
    pool.query(que.getbrandbycate, [Categorie], (error, results) => {
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



const getBrandSport = (request, response) => {
  const Categorie = "Sport";

  try {
    pool.query(que.getbrandbycate, [Categorie], (error, results) => {
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



const getBrandLoisir = (request, response) => {
  const Categorie = "Loisir";

  try {
    pool.query(que.getbrandbycate, [Categorie], (error, results) => {
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

  // Vérification de l'existence de la marque à mettre à jour
  pool.query(que.getbrandbyid, [id], (error, results) => {
    if (error) {
      console.error("Erreur lors de la vérification de l'existence de la marque :", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }

    const noBrandFound = !results.rows.length;
    if (noBrandFound) {
      return response.status(404).json({ message: "Aucune marque trouvée dans la base de données" });
    }

    // Si la marque existe, effectuer la mise à jour
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
      (error, updateResults) => {
        if (error) {
          console.error("Erreur lors de la mise à jour de la marque :", error.message);
          return response.status(500).json({ message: "Erreur interne du serveur" });
        }

        response.status(201).json({ message: "Marque mise à jour avec succès" });
      }
    );
  });
};




//Renvoie des marques en fonction du champ "Affichage Accueil"
const getBrandAcc1 = (request, response) => {
  const AffichafeAccueil = "ÇA VA VOUS PLAIRE";
  try {
    pool.query(que.getbrandbyAccueil, [AffichafeAccueil], (error, results) => {
      if (error) {
        console.error("Erreur lors de la récupération des marques par AffichafeAccueil :", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des marques par AffichafeAccueil :", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};



const getBrandAcc2 = (request, response) => {
  const AffichafeAccueil = "C'EST TOUT NOUVEAU";
  try {
    pool.query(que.getbrandbyAccueil, [AffichafeAccueil], (error, results) => {
      if (error) {
        console.error("Erreur lors de la récupération des marques par AffichafeAccueil :", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des marques par AffichafeAccueil :", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};



const getBrandAcc3 = (request, response) => {
  const AffichafeAccueil = "ENCORE QUELQUES JOURS";
  try {
    pool.query(que.getbrandbyAccueil, [AffichafeAccueil], (error, results) => {
      if (error) {
        console.error("Erreur lors de la récupération des marques par AffichafeAccueil :", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des marques par AffichafeAccueil :", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};




//  Renvoie une marque en fonction de son ID
const getBrandById = (request, response) => {
  const id = parseInt(request.params.id);
  try {
    pool.query(que.getbrandbyid, [id], (error, results) => {
      if (error) {
        console.error("Erreur lors de la récupération de la marque par ID :", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de la marque par ID :", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};




//Renvoie le nombre total de marques
const GetBrandNbr = (request, response) => {
  try {
    pool.query(que.NBRBrand, (error, results) => {
      if (error) {
        console.error("Erreur lors de la récupération du nombre de marques :", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du nombre de marques :", error.message);
    return response.status(500).json({ message: "Erreur interne du serveur" });
  }
};




//delete
const deleteBrand = (request, response) => {
  const id = parseInt(request.params.id);
  try {
    pool.query(que.removeBrand, [id], (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données :", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(200).json("Marque supprimée");
    });
  } catch (error) {
    console.error("Erreur lors de la requête à la base de données :", error.message);
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
