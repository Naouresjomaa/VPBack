const express = require("express");
const pool = require("../connection");
const que = require("./CommandeQ");
const app = express();
const nodemailer = require('nodemailer');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getCommandesConfirme= (request, response) => {
  const query = que.getCommandesConfirme; // Utilisez la requête appropriée depuis l'objet 'que'
  
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }
    response.status(200).json(results.rows);
  });
};
const getCommandesEncours = (request, response) => {
  const query = que.getCommandesEncours; // Utilisez la requête appropriée depuis l'objet 'que'
  
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }
    response.status(200).json(results.rows);
  });
};
const createCommandes2 = (commande, payment_id) => {
  const {
    RefCommande,
    UserName,
    Email,
    Date,
    
    NomClient,
    Adresse,
    Gouvernerat,
    Order,
    PrixTotal,
    PrixLivraison,
    Couppons,
    NetaPayer,
    Telephone,
    Message,
    CodePostal,
    TypePaiement,
    Statut,
    
  } = commande;

  pool.query(
    que.AddCommande2,
    [
      RefCommande,
      UserName,
      Email,
      Date,
     
      NomClient,
      Adresse,
      Gouvernerat,
      Order,
      PrixTotal,
      PrixLivraison,
      Couppons,
      NetaPayer,
      Telephone,
      Message,
      CodePostal,
      TypePaiement,
      Statut,
      payment_id
    ],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
      }
      console.error("success");
    }
  );
};


 const createCommandes = (request, response) => {
  const {
    RefCommande,
    UserName,
    Email,
    Date,
    
    NomClient,
    Adresse,
    Gouvernerat,
    Order,
    PrixTotal,
    PrixLivraison,
    Couppons,
    NetaPayer,
    Telephone,
    Message,
    CodePostal,
    TypePaiement,
    Statut,
  } = request.body;

  pool.query(
    que.AddCommande,
    [
      RefCommande,
      UserName,
      Email,
      Date,
     
      NomClient,
      Adresse,
      Gouvernerat,
      Order,
      PrixTotal,
      PrixLivraison,
      Couppons,
      NetaPayer,
      Telephone,
      Message,
      CodePostal,
      TypePaiement,
      Statut,
    ],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
       sendEmail(request.body)
      response.status(201).json({ message: "Commande créée avec succès", results });
    }
  );
};
 function sendEmail(orderDetailsdata){
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

const updateCommande2 = (commande, id_paiement,response) => {
  const id = commande.id;
  const {
    RefCommande,
    UserName,
    Email,
    Date,
    
    NomClient,
    Adresse,
    Gouvernerat,
    Order,
    PrixTotal,
    PrixLivraison,
    Couppons,
    NetaPayer,
    Telephone,
    Message,
    CodePostal,
    TypePaiement,
    Statut,
  } = commande;

  pool.query(
    que.UpdateCommande2,
    [
      RefCommande,
      UserName,
      Email,
      Date,
    
      NomClient,
      Adresse,
      Gouvernerat,
      Order,
      PrixTotal,
      PrixLivraison,
      Couppons,
      NetaPayer,
      Telephone,
      Message,
      CodePostal,
      TypePaiement,
      Statut,
      id_paiement,
      id,
    ],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
      }
      console.error("success");
    }
  );
};
const updateCommande = (request, response) => {
  const id = parseInt(request.params.id);
  const {
    RefCommande,
    UserName,
    Email,
    Date,
  
    NomClient,
    Adresse,
    Gouvernerat,
    Order,
    PrixTotal,
    PrixLivraison,
    Couppons,
    NetaPayer,
    Telephone,
    Message,
    CodePostal,
    TypePaiement,
    Statut,
    paiement_status
  } = request.body;

  pool.query(
    que.UpdateCommande,
    [
      RefCommande,
      UserName,
      Email,
      Date,
    
      NomClient,
      Adresse,
      Gouvernerat,
      Order,
      PrixTotal,
      PrixLivraison,
      Couppons,
      NetaPayer,
      Telephone,
      Message,
      CodePostal,
      TypePaiement,
      Statut,
      paiement_status,
      id,
    ],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(201).json({ message: "Commande mise à jour avec succès" });
    }
  );
};



const getCommandeById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(que.CommandeById, [id], (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }
    response.status(200).json(results.rows);
  });
};
const getCommandeByIdP = (request, response) => {
  const id = request.params.id;
  console.log('idddddddddddddddd',request)
  pool.query(que.CommandeByIdP, [id], (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }
    response.status(200).json(results.rows);
  });
};



const GetCommandeByUserNameEmail = (request, response) => {
  const Email = request.params.Email;
  const UserName = request.params.UserName;
  const Statut = "Pas Commandée";
  pool.query(
    que.getCommadeByEmailUserName,
    [Email, UserName, Statut],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        return response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(200).json(results.rows);
    }
  );
};

//cette fonction récupère des informations sur la dernière facture d'un utilisateur en fonction de son adresse e-mail et de son nom d'utilisateur
const LastInvoice = (request, response) => {
  const Email = request.params.Email;
  const UserName = request.params.UserName;

  pool.query(que.lastinvoice, [Email, UserName], (error, results) => {
    if (error) {
      console.error("Erreur lors de la requête à la base de données:", error.message);
      return response.status(500).json({ message: "Erreur interne du serveur" });
    }

    if (results.rows.length === 0) {
      // Aucune facture trouvée, renvoyer une réponse appropriée
      return response.status(404).json({ message: "Aucune facture trouvée" });
    }

    // La requête s'est bien déroulée, renvoyer les résultats au format JSON
    response.status(200).json(results.rows);
  });
};
const interaction = (request, response) => {
  try {
    pool.query(que.interaction, (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error("Erreur lors de la requête à la base de données:", error.message);
    response.status(500).json({ message: "Erreur interne du serveur" });
  }
};
const pourcentage = (request, response) => {
  try {
    pool.query(que.pourcentageInter, (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error.message);
        response.status(500).json({ message: "Erreur interne du serveur" });
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error("Erreur lors de la requête à la base de données:", error.message);
    response.status(500).json({ message: "Erreur interne du serveur" });
  }
};


module.exports = {
  getCommandesEncours,
  createCommandes,
  updateCommande,
  getCommandeById,
  GetCommandeByUserNameEmail,
  LastInvoice,
  updateCommande2,
  createCommandes2,
  getCommandeByIdP,
  getCommandesConfirme,
  interaction,
  pourcentage
};
