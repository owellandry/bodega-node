import traslado from "../models/traslado.js";

const traslados = async (req, res) => {
    try {

        const { bodega_send, bodega_to, producto, cantidad } = req.body;

        const traslados = await traslado.traslado(
            bodega_send, 
            bodega_to, 
            producto, 
            cantidad
        );
        res.status(200).json(traslados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default { traslados };