const getProduits = 'SELECT * FROM public."Produits" ORDER BY id ASC ';
const AddProduit =
  'INSERT INTO public."Produits" ( "SousCategorie", "Brand", "Produit", "QteDsStock", "Prix", "PrixR", "Reduction", "Couleur", "Taille", "Genre", "GroupAge", "DetailsP", "PrixLivraision", "livraisonestime",  "idbrand","Image" ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15 ,$16)';
const updateproduit =
  'UPDATE public."Produits" SET  "SousCategorie" = $1, "Brand" = $2, "Produit" = $3, "QteDsStock" = $4, "Prix" = $5, "PrixR" = $6,"Reduction"=$7, "Couleur" = $8, "Taille" = $9, "Genre" = $10, "GroupAge" = $11, "DetailsP" = $12, "PrixLivraision" = $13, "livraisonestime" = $14 ,"idbrand"=$15,  "Image" = $16 WHERE id = $17';
//const getproduitbyid = 'SELECT * FROM public."Produits" WHERE id = $1';
const getproduitbyid = `
  SELECT p.*, b."Categorie" as categorie 
  FROM public."Produits" p
  JOIN public."Brands" b ON b.id = CAST(p."Brand" AS integer)
  WHERE p.id = $1`;
const removeProduit = 'DELETE FROM public."Produits" WHERE id = $1';
const getproduitbybrand = 'SELECT * FROM public."Produits" WHERE "Brand" = $1 ';
const NBRProduit = 'SELECT COUNT(*) FROM public."Produits"';
const NBRProduit2 = 'SELECT COUNT(*) FROM public."Commandes"';

module.exports = {
    getProduits,
    AddProduit,
    updateproduit,
    getproduitbyid,
    removeProduit,
    getproduitbybrand,
    NBRProduit,
    NBRProduit2
  };