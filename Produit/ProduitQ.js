const getProduits = 'SELECT * FROM public."Produits" ORDER BY id ASC ';
const AddProduit =
  'INSERT INTO public."Produits" ( "SousCategorie", "Brand", "Produit", "QteDsStock", "Prix", "PrixR", "Reduction", "Couleur", "Taille", "Genre", "GroupAge", "Images", "DetailsP", "PrixLivraision", "livraisonestime" ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)';
const updateproduit =
  'UPDATE public."Produits" SET "SousCategorie" = $1, "Brand" = $2, "Produit" = $3, "QteDsStock" = $4, "Prix" = $5, "PrixR" = $6, "Reduction" = $7, "Couleur" = $8, "Taille" = $9, "Genre" = $10, "GroupAge" = $11, "Images" = $12, "DetailsP" = $13, "PrixLivraision" = $14, "livraisonestime" = $15  WHERE id = $16';
const getproduitbyid = 'SELECT * FROM public."Produits" WHERE id = $1';
const removeProduit = 'DELETE FROM public."Produits" WHERE id = $1';
const getproduitbybrand = 'SELECT * FROM public."Produits" WHERE "Brand" = $1 AND "SousCategorie" = $2';
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