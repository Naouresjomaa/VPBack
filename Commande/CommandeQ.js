const getCommandesEncours = `
  SELECT * FROM public."Commandes" WHERE "Statut" = 'Encours';
`;  
const getCommandesConfirme = `
SELECT * FROM public."Commandes" WHERE "Statut" = 'Livree' And "paiement_status" = 'success';
`; 

const AddCommande =
  'INSERT INTO public."Commandes" ("RefCommande", "UserName", "Email", "Date",  "NomClient", "Adresse", "Gouvernerat", "Order", "PrixTotal", "PrixLivraison", "Couppons", "NetaPayer", "Telephone", "Message", "CodePostal", "TypePaiement", "Statut") VALUES ($1, $2, $3, $4,$5,  $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)';
const UpdateCommande =
  'UPDATE public."Commandes" SET "RefCommande" = $1, "UserName" = $2,  "Email" = $3, "Date" = $4, "NomClient" = $5, "Adresse" = $6, "Gouvernerat" = $7, "Order" = $8, "PrixTotal" = $9, "PrixLivraison" = $10, "Couppons" = $11, "NetaPayer" = $12, "Telephone" = $13, "Message" = $14, "CodePostal" = $15, "TypePaiement" = $16, "Statut" = $17,"paiement_status"= $18 WHERE id = $19';
const CommandeById = 'SELECT * FROM public."Commandes" WHERE id = $1';
const CommandeByIdP = 'SELECT * FROM public."Commandes" WHERE id_paiement = $1';

const getCommadeByEmailUserName =
  'SELECT * FROM public."Commandes" WHERE "Email" = $1 And "UserName" = $2 And "Statut" != $3 And EXTRACT(MONTH FROM "Date") =  EXTRACT(MONTH FROM now()) ORDER BY id DESC ';
const lastinvoice =
  'SELECT * FROM public."Commandes" WHERE "Email" = $1 And "UserName" = $2 ORDER BY id DESC LIMIT 1';

  const UpdateCommande2 =
  'UPDATE public."Commandes" SET "RefCommande" = $1, "UserName" = $2,  "Email" = $3, "Date" = $4,  "NomClient" = $5, "Adresse" = $6, "Gouvernerat" = $7, "Order" = $8, "PrixTotal" = $9, "PrixLivraison" = $10, "Couppons" = $11, "NetaPayer" = $12, "Telephone" = $13, "Message" = $14, "CodePostal" = $15, "TypePaiement" = $16, "Statut" = $17 , "id_paiement" = $18 WHERE id = $19';
  const AddCommande2 =
  'INSERT INTO public."Commandes" ("RefCommande", "UserName", "Email", "Date",  "NomClient", "Adresse", "Gouvernerat", "Order", "PrixTotal", "PrixLivraison", "Couppons", "NetaPayer", "Telephone", "Message", "CodePostal", "TypePaiement", "Statut","id_paiement") VALUES ($1, $2, $3, $4,$5,  $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)';
  const interaction =`
  SELECT "Date", COUNT(*) AS total_interactions
  FROM public."Commandes"
  GROUP BY "Date"
  ORDER BY "Date";
`;
const pourcentageInter = `
SELECT 
  'Type de Paiement' as "Catégorie",
  "TypePaiement" as "Détail", 
  COUNT(*) * 100.0 / sum(count(*)) over () as "Pourcentage"
FROM public."Commandes"
GROUP BY "TypePaiement"
UNION
-- Pourcentage par ville
SELECT 
  'Ville' as "Catégorie",
  "Gouvernerat" as "Détail", 
  COUNT(*) * 100.0 / sum(count(*)) over () as "Pourcentage"
FROM public."Commandes"
GROUP BY "Gouvernerat";

`;
  module.exports = {
  getCommandesEncours,
  AddCommande,
  UpdateCommande,
  CommandeById,
  getCommadeByEmailUserName,
  lastinvoice,
  UpdateCommande2,
  AddCommande2,
  CommandeByIdP,
  getCommandesConfirme,
  interaction,
  pourcentageInter
};
