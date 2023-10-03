const getPaniers =
  'SELECT * FROM public."Panier" WHERE "Email" = $1 And "UserName" = $2 ORDER BY id ASC ';
const createPanier =
  'INSERT INTO public."Panier" ("Produit", "ProdDetails", "PrixUnitaire", "Quantite", "PrixTotale", "UserName", "Email","taille") VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8)';
const UpdatePanier =
  'UPDATE public."Panier" SET "Produit" = $1, "ProdDetails" = $2,  "PrixUnitaire" = $3, "Quantite" = $4, "PrixTotale" = $5, "UserName" = $6, "Email" = $7 , "taille" = $8 WHERE id = $9';
const GetPanierbyid = 'SELECT * FROM public."Panier" WHERE id = $1';
const deleteallpanier =
  'DELETE FROM public."Panier" WHERE "Email" = $1 And "UserName" = $2';
const removepanier = 'DELETE FROM public."Panier" WHERE  id = $1';
module.exports = {
  getPaniers,
  createPanier,
  UpdatePanier,
  GetPanierbyid,
  deleteallpanier,
  removepanier,
};
