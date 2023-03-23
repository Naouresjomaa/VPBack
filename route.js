const express = require("express");
const router = express.Router();
const cors = require("cors");
const clientsC = require("./Clients/ClientsC");
const categoriec = require("./Categorie/CategorieC");
const newsletter = require("./Newsletter/NewsletterC");

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
  const imageURL = __dirname +'/public/Categories/'+req.file.filename;
  res.send({ imageURL });
});
router.put("/UpdateCategorie/:id", cors(), categoriec.updateCategorie);

//Newsletter
router.post("/AddNewsletter", cors(), newsletter.AddNewsLetter);
router.get("/Newsletters", cors(), newsletter.getNewsletter);

module.exports = router;
