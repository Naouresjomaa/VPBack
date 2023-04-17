const express = require("express");
const pool = require("../connection");
const que = require("./NewsletterQ");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const AddNewsLetter = (request, response) => {
  const { Email } = request.body;
  pool.query(que.AddNewsletter, [Email], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).json({ message: "Newsletter created succefully" });
  });
};
const getNewsletter = (request, response) => {
  pool.query(que.getnewsletter, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const GetnewsNbr = (request, response) => {
  pool.query(que.NBRNews,(error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
module.exports = {
  AddNewsLetter,
  getNewsletter,
  GetnewsNbr
};
