import dotenv  from "dotenv"
import express from "express"

import configureApp from "./src/config/express.js";
import routes from './src/routes.js';

dotenv.config()

const app = express();

configureApp(app);

app.use(routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })