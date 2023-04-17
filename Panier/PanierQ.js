const getPaniers =
  'SELECT * FROM public."Panier" WHER "Email" = $1 And "UserName" = $2 ORDER BY id ASC ';
const createPanier =
  'INSERT INTO public."Panier" ("idproduit", "Brand",  "Email", "UserName", "Produit", "Couleur", "Taille", "Genre", "GroupAge", "Images", "DetailsP", prixunitaire, quantite, prixtotale) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)';
const UpdatePanier =
  'UPDATE public."Panier" SET "idproduit" = $1, "Brand" = $2,  "Email" = $3, "UserName" = $4, "Produit" = $5, "Couleur" = $6, "Taille" = $7,  "Genre" = $8, "GroupAge" = $9, "Images" = $10, "DetailsP" = $11, prixunitaire = $12, quantite = $13, prixtotale = $14 WHERE id = $15';
const GetPanierbyid = 'SELECT * FROM public."Panier" WHERE id = $1';
const deleteallpanier =
  'DELETE FROM public."Panier" WHERE "Email" = $1 And "UserName" = $2';
module.exports = {
  getPaniers,
  createPanier,
  UpdatePanier,
  GetPanierbyid,
  deleteallpanier
};
