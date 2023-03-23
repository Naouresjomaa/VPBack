const getClients = 'SELECT * FROM public."Clients" ORDER BY id ASC ';
const AddClient = 'INSERT INTO public."Clients" ("NomComplet", "UserName", "Genre", "Email", "Telephone", "Password", "Ville", "Adresse", "DateNaissance") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
const checkEmailexistance = 'SELECT c FROM public."Clients" c WHERE c."Email"=$1';
const checkUserNameexistance = 'SELECT c FROM public."Clients" c WHERE c."UserName"=$1';
const checkEmail = 'SELECT * FROM public."Clients" WHERE "Email"=$1';
const updateclient = 'UPDATE public."Clients" SET "NomComplet" = $1, "UserName" = $2, "Genre" = $3, "Email" = $4, "Telephone" = $5, "Password" = $6, "Ville" = $7, "Adresse" = $8, "DateNaissance" = $9 WHERE id=$10';
const getclientbyid = 'SELECT * FROM public."Clients" WHERE id = $1';
module.exports = {
    getClients,
    AddClient,
    checkEmailexistance,
    checkUserNameexistance,
    checkEmail,
    updateclient, 
    getclientbyid
  };
  