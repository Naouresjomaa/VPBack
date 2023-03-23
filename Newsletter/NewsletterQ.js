const AddNewsletter = 'INSERT INTO public."Newsletter" ("Email") VALUES ($1)';
const getnewsletter = 'SELECT * FROM public."Newsletter" ORDER BY id ASC ';
module.exports = {
  AddNewsletter,
  getnewsletter
};
