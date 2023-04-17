const getProduits = 'SELECT * FROM public."Produits" ORDER BY id ASC ';
const AddProduit =
  'INSERT INTO public."Produits" ("Categorie", "SousCategorie", "Brand", "Produit", "QteDsStock", "Prix", "PrixR", "Reduction", "Couleur", "Taille", "Genre", "GroupAge", "Images", "DetailsP", "PrixLivraision", "livraisonestime" ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)';
const updateproduit =
  'UPDATE public."Produits" SET "Categorie" = $1, "SousCategorie" = $2, "Brand" = $3, "Produit" = $4, "QteDsStock" = $5, "Prix" = $6, "PrixR" = $7, "Reduction" = $8, "Couleur" = $9, "Taille" = $10, "Genre" = $11, "GroupAge" = $12, "Images" = $13, "DetailsP" = $14, "PrixLivraision" = $15, "livraisonestime" = $16 WHERE id = $17';
const getproduitbyid = 'SELECT * FROM public."Produits" WHERE id = $1';
const removeProduit = 'DELETE FROM public."Produits" WHERE id = $1';
const getproduitbybrand = 'SELECT * FROM public."Produits" WHERE "Brand" = $1';
const NBRProduit = 'SELECT COUNT(*) FROM public."Produits"';
module.exports = {
    getProduits,
    AddProduit,
    updateproduit,
    getproduitbyid,
    removeProduit,
    getproduitbybrand,
    NBRProduit
  };