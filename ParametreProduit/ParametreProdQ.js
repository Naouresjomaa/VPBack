const getParametre = 'SELECT * FROM public."ParametreProduit" ORDER BY id ASC ';
const Addparametre =
  'INSERT INTO public."ParametreProduit" ("Categorie", "SousCategorie",  "Taille", "Couleur", "Genre", "GroupeAge") VALUES ($1, $2, $3, $4, $5, $6)';
const getparameterbyid =
  'SELECT * FROM public."ParametreProduit" WHERE id = $1';
const updateparameter =
  'UPDATE public."ParametreProduit" SET "Categorie" = $1, "SousCategorie" = $2, "Taille" = $3, "Couleur" = $4, "Genre" = $5, "GroupeAge" = $6 WHERE id = $7';
const removeparametre = 'DELETE FROM public."ParametreProduit" WHERE id = $1';  
module.exports = {
  getParametre,
  Addparametre,
  getparameterbyid,
  updateparameter,
  removeparametre
};
