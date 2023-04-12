const express = require("express");
const router = express.Router();
const cors = require("cors");
const clientsC = require("./Clients/ClientsC");
const categoriec = require("./Categorie/CategorieC");
const newsletter = require("./Newsletter/NewsletterC");
const brandC = require("./Brand/BrandC");
const parametreC = require("./ParametreProduit/ParametreProdC");
const produitC = require ("./Produit/ProduitC");
const multer = require("multer");
const path = require("path");
const app = express();
app.use(express.static("./public"));
router.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("preflightContinue", false);
  res.setHeader("optionsSuccessStatus", 204);
  next();
});
//User
router.get("/Clients", cors(), clientsC.getClients);
router.post("/AddClient", cors(), clientsC.createClient);
router.post("/AuthClient", cors(), clientsC.LoginAuth);
router.put("/Updateclient/:id", cors(), clientsC.updateClient);
router.get("/client/:id", cors(), clientsC.getClientById);
//Categorie
router.get("/Categories", cors(), categoriec.getCategories);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/Categories");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
router.post("/CategorieImageUpload", upload.single("image"), (req, res) => {
  const imageURL = __dirname + "/public/Categories/" + req.file.filename;
  res.send({ imageURL });
});
router.put("/UpdateCategorie/:id", cors(), categoriec.updateCategorie);
//Newsletter
router.post("/AddNewsletter", cors(), newsletter.AddNewsLetter);
router.get("/Newsletters", cors(), newsletter.getNewsletter);
//Brand
router.get("/Brands", cors(), brandC.getBrands);
router.post("/Addbrand", cors(), brandC.createBrand);
router.get("/BrandByCat/:Categorie", cors(), brandC.getBrandsbyCat);
router.get("/BrandMode", cors(), brandC.getBrandMode);
router.get("/BrandMaison", cors(), brandC.getBrandMaison);
router.get("/BrandVoyage", cors(), brandC.getBrandVoyage);
router.get("/BrandBeaute", cors(), brandC.getBrandBeaute);
router.get("/BrandGastronomie", cors(), brandC.getBrandGastronomie);
router.get("/BrandEnfant", cors(), brandC.getBrandEnfant);
router.get("/BrandLoisir", cors(), brandC.getBrandLoisir);
router.get("/BrandSport", cors(), brandC.getBrandSport);
router.put("/UpdateBrand/:id", cors(), brandC.updateBrand);
router.get("/BrandAcc1", cors(), brandC.getBrandAcc1);
router.get("/BrandAcc2", cors(), brandC.getBrandAcc2);
router.get("/BrandAcc3", cors(), brandC.getBrandAcc3);
router.get("/brand/:id", cors(), brandC.getBrandById);
//Parametres
router.get("/Parametres", cors(), parametreC.GetParametre);
router.post("/AddParameter", cors(), parametreC.CreateParametre);
router.get("/Parameter/:id", cors(), parametreC.getParameterById);
router.put("/UpdateParametre/:id", cors(), parametreC.updateParameter);
router.delete("/DeleteParameter/:id", cors(), parametreC.RemoveParameter);
router.get("/parameter/:Categorie/:SousCategorie", cors(), parametreC.getParametyresbyCatSc);
//Produits
router.get("/Produits", cors(), produitC.getProduits);
router.post("/AddProduits", cors(), produitC.createProduit);
router.put("/UpdateProduit/:id", cors(), produitC.updateProduit);
router.get("/Produit/:Brand", cors(), produitC.getProduitsbyBrand);
router.get("/Product/:id", cors(), produitC.getProduitById);
module.exports = router;
