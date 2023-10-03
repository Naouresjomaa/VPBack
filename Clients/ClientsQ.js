const getClients = 'SELECT * FROM public."Clients" ORDER BY id ASC ';
const AddClient =
  'INSERT INTO public."Clients" ("NomComplet", "UserName", "Genre", "Email", "Telephone", "Password", "Ville", "Adresse", "DateNaissance","parrainage","solde") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 , $10, $11) RETURNING *';
const checkEmailexistance =
  'SELECT c FROM public."Clients" c WHERE c."Email"=$1';
const checkUserEmailxistance =
  'SELECT c FROM public."Clients" c WHERE c."Email"=$1';
  const checkUserNameexistance =
  'SELECT c FROM public."Clients" c WHERE c."UserName"=$1';
const checkEmail = 'SELECT * FROM public."Clients" WHERE "Email"=$1';
const updateclient =
  'UPDATE public."Clients" SET "NomComplet" = $1, "UserName" = $2, "Genre" = $3, "Email" = $4, "Telephone" = $5, "Password" = $6, "Ville" = $7, "Adresse" = $8, "DateNaissance" = $9 WHERE id=$10';
  const updateclientParrainage =
  'UPDATE public."Clients" SET  "solde" =  $1 WHERE parrainage=$2';


  const getclientbyid = 'SELECT * FROM public."Clients" WHERE id = $1';
  const getclientbyParrainage = 'SELECT * FROM public."Clients" WHERE parrainage = $1';
const NBRClient = 'SELECT COUNT(*) FROM public."Clients"';
const AddClientAuth =
  'INSERT INTO public."Clients" ("NomComplet" ,"UserName","parrainage","Email","Password") VALUES ($1, $1, $2 ,$3,$4) RETURNING *';

module.exports = {
  getClients,
  AddClient,
  checkEmailexistance,
  checkUserNameexistance,
  checkEmail,
  updateclient,
  getclientbyid,
  NBRClient,
  updateclientParrainage,
  getclientbyParrainage,
 checkUserEmailxistance ,
 AddClientAuth

};
