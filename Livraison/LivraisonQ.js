const createLivraison =
  'INSERT INTO public."Livraison" ("Region", "PrixLivraison") VALUES ($1, $2)';
const UpdateLivraison =
  'UPDATE public."Livraison" SET "Region" = $1, "PrixLivraison" = $2 WHERE id = $3';
const getlivraisonByRegion =
  'SELECT * FROM public."Livraison" WHERE Region = $1';
const getAlllivraison = 'SELECT * FROM public."Livraison" ORDER BY id ASC';
const removelivraison = 'DELETE FROM public."Livraison" WHERE  id = $1';
module.exports = {
  createLivraison,
  UpdateLivraison,
  getAlllivraison,
  getlivraisonByRegion,
  removelivraison
};
