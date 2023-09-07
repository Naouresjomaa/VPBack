const AddNewsletter = 'INSERT INTO public."Newsletter" ("Email", "DateAjout") VALUES ($1,$2)';
const getnewsletter = 'SELECT * FROM public."Newsletter" ORDER BY id ASC ';
const NBRNews = 'SELECT COUNT(*) FROM public."Newsletter"';
const removeNewsletter='DELETE FROM public."Newsletter" WHERE id = $1';
const getNewsletterbyid='SELECT COUNT(*) FROM public."Newsletter" WHERE id=$1'
module.exports = {
  AddNewsletter,
  getnewsletter,
  NBRNews,
  removeNewsletter,
  getNewsletterbyid
};
