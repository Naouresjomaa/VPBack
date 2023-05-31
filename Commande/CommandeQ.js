const getCommandes = 'SELECT * FROM public."Commandes" ORDER BY id ASC ';
const AddCommande =
  'INSERT INTO public."Commandes" ("RefCommande", "UserName", "Email", "Date", "Heure", "NomClient", "Adresse", "Gouvernerat", "Order", "PrixTotal", "PrixLivraison", "Couppons", "NetaPayer", "Telephone", "Message", "CodePostal", "TypePaiement") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)';
const UpdateCommande =
  'UPDATE public."Commandes" SET "RefCommande" = $1, "UserName" = $2,  "Email" = $3, "Date" = $4, "Heure" = $5, "NomClient" = $6, "Adresse" = $7, "Gouvernerat" = $8, "Order" = $9, "PrixTotal" = $10, "PrixLivraison" = $11, "Couppons" = $12, "NetaPayer" = $13, "Telephone" = $14, "Message" = $15, "CodePostal" = $16, "TypePaiement" = $17 WHERE id = $18';
const CommandeById = 'SELECT * FROM public."Commandes" WHERE id = $1';
const getCommadeByEmailUserName =
  'SELECT * FROM public."Commandes" WHERE "Email" = $1 And "UserName" = $2 ORDER BY id DESC ';
const lastinvoice =
  'SELECT * FROM public."Commandes" WHERE "Email" = $1 And "UserName" = $2 ORDER BY id DESC LIMIT 1';  
module.exports = {
  getCommandes,
  AddCommande,
  UpdateCommande,
  CommandeById,
  getCommadeByEmailUserName,
  lastinvoice
};
