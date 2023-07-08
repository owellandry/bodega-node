import bodega from "../models/bodega.js";

const createBodega =  async (req, res) => {
  try {
    const { nombre , id_responsable, estado } = req.body;


     const nuevaBodega = await bodega.createBodega(
      nombre,
      id_responsable,
      estado
    ); 

    return res.json(nuevaBodega);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear la bodega" });
  } finally {
    console.log(`peticion header ${JSON.stringify(req.headers)}`);
  }
};

const listarproductos = async (req, res) => {
  try {
    const bodegas = await bodega.listarproductos();
    return res.json(bodegas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear la bodega" });
  } 
}

export default { createBodega , listarproductos };
