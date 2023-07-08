import inventarios from "../models/inventarios.js";

const crearInventario = async (req, res) => {
    try {

        const { id_producto, id_bodega, cantidad } = req.body;

        const inventario = await inventarios.selectInventario(
            id_producto,
            id_bodega,
            cantidad
        );

        console.log(inventario);

        return res.json(inventario)


    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al crear el inventario" });
    }
    finally {
        console.log(`peticion header ${JSON.stringify(req.headers)}`);
    }

}

export default {crearInventario};