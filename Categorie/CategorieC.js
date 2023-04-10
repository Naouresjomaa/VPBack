const express = require("express");
const pool = require("../connection");
const que = require("./CategorieQ");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const getCategories = (request, response) => {
  pool.query(que.getCategorie, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const updateCategorie = (request, response) => {
  const id = parseInt(request.params.id);
  const { Categorie, ImageCouverture } = request.body;
  pool.query(que.getcategoriebyid, [id], (error, results) => {
    const nocategoriefound = !results.rows.length;
    if (nocategoriefound) {
      response.json({ message: "No category found in database" });
    }
  });
  pool.query(
    que.updateCategorie,
    [Categorie, ImageCouverture, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ message: "Category updated succefully" });
    }
  );
};
module.exports = {
  getCategories,
  updateCategorie,
};
