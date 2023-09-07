const getbrands = 'SELECT * FROM public."Brands" ORDER BY id ASC ';
const Addbrand =
  'INSERT INTO public."Brands" ("BrandName", "Categorie",  "SousCategorie", "DateAjout", "DateExpiration", "AffichafeAccueil") VALUES ($1, $2, $3, $4, $5, $6)';
const getbrandbycate = 'SELECT * FROM public."Brands" WHERE "Categorie" = $1';
const updatebrand =
  'UPDATE public."Brands" SET "BrandName" = $1, "Categorie" = $2, "SousCategorie" = $3, "DateAjout" = $4, "DateExpiration" = $5, "AffichafeAccueil" = $6 WHERE id = $7';
const getbrandbyAccueil =
  'SELECT * FROM public."Brands" WHERE "AffichafeAccueil" = $1';
const removeBrand='DELETE FROM public."Devis" WHERE id = $1'
const getbrandbyid = 'SELECT * FROM public."Brands" WHERE id = $1';
const NBRBrand = 'SELECT COUNT(*) FROM public."Brands"';
const getbrandCat = 'SELECT "BrandName", "SousCategorie" FROM public."Brands" GROUP BY "BrandName", "SousCategorie";';
module.exports = {
  getbrands,
  Addbrand,
  NBRBrand,
  removeBrand,
  updatebrand,
  getbrandbyid,


  getbrandbycate,
  getbrandbyAccueil,
  getbrandCat
};
