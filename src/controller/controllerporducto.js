import producto from "../models/producto.js";

const crearproducto = async (req, res) => {

    try {

        const { nombre, descripcion, estado, cantidad } = req.body;

        const nuevoProducto = await producto.insertProduct(
            nombre,
            descripcion,
            estado,
            cantidad
        )

        return (res.json({
            mensaje: "Producto creado",
            producto: nuevoProducto
        }))

    } catch (error) {
        return res.status(500).json({ error: "Error al crear la elproducto" });
    } finally {

        console.log(`peticion header ${JSON.stringify(req.headers)}`);

    }

}

export default {crearproducto}