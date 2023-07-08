import express from "express";



const configureApp = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  });
};

export default configureApp;