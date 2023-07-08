import express from "express";

import controllerbodega from "./controller/controllerbodega.js";
import controllerporducto from "./controller/controllerporducto.js";
import controllerinventarios from "./controller/controllerinventarios.js";
import controllertraslado from "./controller/controllertraslado.js";

import controllerauth from "./controller/controllerauth.js";
import authenticateToken from "./middleware/authenticateToken.js";


const router = express.Router();

router.post('/auth', (req, res) => {
  controllerauth.authorization(req, res);
})

// Ruta de ejemplo: GET /
router.get("/", authenticateToken , (req, res) => {
    res.send("Api sistema de bodegas");
});

router.post("/bodegas", authenticateToken ,(req, res) =>{controllerbodega.createBodega(req, res)} );

router.get("/bodegas", authenticateToken,(req, res) => {
    controllerbodega.listarproductos(req, res)
})

router.post("/productos", authenticateToken,(req, res) => {
    controllerporducto.crearproducto(req, res)
})

router.post("/inventario", authenticateToken,(req, res) => {
    controllerinventarios.crearInventario(req, res)
})

router.post("/traslado", authenticateToken ,(req, res) => {
    controllertraslado.traslados(req, res)
})

export default router;
