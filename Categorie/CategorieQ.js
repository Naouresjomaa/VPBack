const getCategorie = 'SELECT * FROM public."Categories" ORDER BY id ASC ';
const updateCategorie =
  'UPDATE public."Categories" SET "Categorie" = $1, "ImageCouverture" = $2 WHERE id=$3';
const getcategoriebyid = 'SELECT * FROM public."Categories" WHERE id = $1';
const NBRCategorie = 'SELECT COUNT(*) FROM  public."Categories"';
module.exports = {
  getCategorie,
  updateCategorie,
  getcategoriebyid,
  NBRCategorie
};
