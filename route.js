const express = require("express");
const nodemailer = require('nodemailer');
const router = express.Router();
const cors = require("cors");
const clientsC = require("./Clients/ClientsC");
const categoriec = require("./Categorie/CategorieC");
const newsletter = require("./Newsletter/NewsletterC");
const brandC = require("./Brand/BrandC");
const parametreC = require("./ParametreProduit/ParametreProdC");
const produitC = require("./Produit/ProduitC");
const panierC = require("./Panier/PanierC");
const livraisonC = require("./Livraison/LivraisonC");
const CommandeC = require("./Commande/CommandeC");
require('dotenv').config();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const multer = require("multer");
const path = require("path");
const axios = require('axios');

const app = express();
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/auth/facebook/callback"
}, accessTokenCallback));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, accessTokenCallback));

function accessTokenCallback(accessToken, refreshToken, profile,email, done, req, res) {
  console.log('requessssssst', accessToken, refreshToken, profile,email, done);
  clientsC.createClientAuth(profile.displayName, (error, token) => {
    if (error) {
      // Gérer l'erreur ici
      console.log(error);
      return res.status(500).send('Erreur lors de la création de l\'authentification client.');
    }
console.log('tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnn',token)
    // Rediriger vers le frontend avec le token en tant que paramètre d'URL
    res.redirect('http://localhost:4200');
    
  });
}


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
router.put("/UpdateclientParrianage/:id", cors(), clientsC.updateClientParrainage);
router.get("/client/:id", cors(), clientsC.getClientById);
router.get("/clientP/:id", cors(), clientsC.getClientByParrainage);
router.get("/clientNbr", cors(), clientsC.GetClientNbr);
//Categorie
router.get("/Categories", cors(), categoriec.getCategories);
router.get("/CategorieNbr", cors(), categoriec.GetcategorieNbr);
// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Le dossier où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
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
router.get("/NewsletterNbr", cors(), newsletter.GetnewsNbr);
//Brand
router.get("/Brands", cors(), brandC.getBrands);
router.post("/Addbrand", cors(),upload.single('Image'), brandC.createBrand);
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
router.get("/brandNbr", cors(), brandC.GetBrandNbr);
router.get("/brandCat", cors(), brandC.getBrandCat);
//Parametres
router.get("/Parametres", cors(), parametreC.GetParametre);
router.post("/AddParameter", cors(), parametreC.CreateParametre);
router.get("/Parameter/:id", cors(), parametreC.getParameterById);
router.put("/UpdateParametre/:id", cors(), parametreC.updateParameter);
router.delete("/DeleteParameter/:id", cors(), parametreC.RemoveParameter);
router.get(
  "/parameter/:Categorie/:SousCategorie",
  cors(),
  parametreC.getParametyresbyCatSc
);
//paiement
router.post('/paiement', async (req, res) => {
  // Récupération des informations de paiement du corps de la requête
  //const { amount, token } = req.body;
  console.log(req.body.PrixTotal)
  let prix = req.body.PrixTotal * 1000
  console.log(prix) 
  try {
    // Effectuez la requête POST à l'API de paiement
    const response = await axios.post('https://developers.flouci.com/api/generate_payment', 
    {app_token: "244cceca-54f6-407a-a8d5-ef8bd13444f6",
    app_secret: "6f0ab2bb-659c-4a19-8fd4-5c89004d0214",
    accept_card: "true",
    amount: prix,
    session_timeout_secs: 7200,
  success_link: "http://localhost:4200/#/success",
  fail_link: "http://localhost:4200/#/error",
  developer_tracking_id: "0db02213-72e7-420b-a0f0-2f75c572d313"}, {
      headers: {
        //'Authorization': `Bearer YOUR_STRIPE_SECRET_KEY`, // remplacez par votre clé secrète Stripe
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data.result.payment_id)
    await CommandeC.createCommandes2(req.body,response.data.result.payment_id )
       res.status(200).json({ success: true, data: response.data});
       
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
});
//Produits
router.get("/Produits", cors(), produitC.getProduits);
router.post("/AddProduits", cors(),upload.single('Image'), produitC.createProduit);
router.put("/UpdateProduit", cors(),upload.single('Image'), produitC.updateProduit);
router.get(
  "/Produit/:Brand/:SousCategorie",
  cors(),
  produitC.getProduitsbyBrand
);
router.get("/Product/:id", cors(), produitC.getProduitById);
router.get("/Produit/:id", cors(), produitC.getProduitsbyBrand);
router.get("/ProductNbr", cors(), produitC.GetproduitNbr);
router.get("/CommandeNbr", cors(), produitC.GetCommandeNbr);
router.delete("/DeleteProduit/:id", cors(), produitC.RemoveProduit);
//Paniers
router.get("/Panier/:Email/:UserName", cors(), panierC.GetPanier);
router.post("/AddPanier", cors(), panierC.createPanier);
router.put("/UpdatePanier/:id", cors(), panierC.updatePanier);
router.get("/Panier/:id", cors(), panierC.getPanierById);
router.delete(
  "/DeleteAllpanier/:Email/:UserName",
  cors(),
  panierC.RemoveallPanier
);
router.delete("/Deletepanier/:id", cors(), panierC.RemovPanier);
//Livraison
router.get("/Livraisons", cors(), livraisonC.getLivraison);
router.get("/Livraison/:Region", cors(), livraisonC.GetLivraisonByRegion);
router.post("/Createlivraison", cors(), livraisonC.createLivraison);
router.put("/UpdateLivraison/:id", cors(), livraisonC.updateLivraison);
router.delete("/DeleteLivraison/:id", cors(), livraisonC.Removelivraison);
//Commande
router.get("/CommandeEncours", cors(), CommandeC.getCommandesEncours);
router.get("/CommandeConfirme", cors(), CommandeC.getCommandesConfirme);
router.get("/CommandeId/:id", cors(), CommandeC.getCommandeById);
router.get("/CommandeIdP/:id", cors(), CommandeC.getCommandeByIdP);

router.get(
  "/Commande/:Email/:UserName",
  cors(),
  CommandeC.GetCommandeByUserNameEmail
);
router.post("/CreateCommande", cors(), CommandeC.createCommandes);
router.put("/UpdateCommande/:id", cors(), CommandeC.updateCommande);
router.get("/LastInvoice/:Email/:UserName", cors(), CommandeC.LastInvoice);
router.get('/image/:image', (req, res) => {
  const imageName = req.params.image;
  res.sendFile(`${__dirname}/uploads/${imageName}`);
});
router.post('/send-email', async (req, res) => {
  try{
    await sendEmail(req.body)
    res.send('Order created and email sent successfully');
  }catch (error) {
    console.log(error);
    res.status(500).send('Error creating order or sending email ');
  }
  
});

 async function sendEmail(orderDetailsdata){
  const orderDetails = orderDetailsdata;

  // Fonction pour générer les lignes du tableau HTML pour chaque produit
  function generateProductRows(order) {
    return order.Order.map(product => `
      <tr>
          <td>${product.Produit} (Taille: ${product.taille})</td>
          <td>${product.Quantite}</td>
          <td>${product.PrixUnitaire}TND</td>
          <td>${product.PrixTotale}TND</td>
      </tr>
    `).join('');
  }

  // Créez le HTML pour le courriel
  let html = `
    <html>
    <head>
    <style>
    body {
      font-family: Arial, sans-serif;
      margin: 50px;
      color: #333;
  }

  .header {
      text-align: center;
      margin-bottom: 40px;
  }

  .logo {
      max-width: 150px;
  }

  .table {
      width: 100%;
      border-collapse: collapse;
  }

  .table td, .table th {
      border: 1px solid #ddd;
      padding: 8px 12px;
  }

  .table th {
      background-color: #f2f2f2;
  }

  .footer {
      margin-top: 30px;
      text-align: center;
  }
    </style>
</head>
<body>
    <div class="header">
        <h2>Détails de votre commande Ref: ${orderDetails.RefCommande}</h2>
        <p>Nom du Client : ${orderDetails.NomClient}</p>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            ${generateProductRows(orderDetails)}
        </tbody>
    </table>
    ...
    <div class="footer">
        <p>Total général : ${orderDetails.PrixTotal}TND</p>
        <p>Adresse de livraison : ${orderDetails.Adresse}, ${orderDetails.Gouvernerat}, ${orderDetails.CodePostal}</p>
        <p>Type de Paiement : ${orderDetails.TypePaiement}</p>
        <p>Merci d'avoir choisi notre site !</p>
    </div>
    <body>
    </html>
  `;
  let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
          user: 'naouresjomaa9@outlook.com',
          pass: 'Nabdhonminwara2inour'
      },
      tls: {
          ciphers: 'SSLv3'
      }
  });
  let mailOptions = {
    from: 'naouresjomaa9@outlook.com',
    to: 'naouresjomaa@gmail.com',
    subject: `Détails de votre commande sur VP (Ref: ${orderDetails.RefCommande})`,
    html: html
};
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
      } else {
          res.send('Email sent successfully');
      }
  });
}
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['profile'] }));
router.get('/auth/facebook/callback', 
passport.authenticate('facebook', { failureRedirect: '/login' }),
(req, res) => {
  console.log(req.user)
  res.json(req.user);
}
);

router.get('/auth/google', passport.authenticate('google', { scope: ['email','profile'] }));
router.get('/auth/google/callback', passport.authenticate('google'));
router.get('/interaction',CommandeC.interaction)
router.get('/pourcentage',CommandeC.pourcentage)
module.exports = router;
