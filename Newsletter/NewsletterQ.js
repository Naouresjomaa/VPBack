const AddNewsletter = 'INSERT INTO public."Newsletter" ("Email") VALUES ($1)';
const getnewsletter = 'SELECT * FROM public."Newsletter" ORDER BY id ASC ';
const NBRNews = 'SELECT COUNT(*) FROM public."Newsletter"';
module.exports = {
  AddNewsletter,
  getnewsletter,
  NBRNews
};
