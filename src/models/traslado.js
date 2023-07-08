import mysql from "mysql2/promise";
import dbConfig from "../config/dbconfig.js";

const getConnection = async () => {
    return await mysql.createConnection(dbConfig);
};


const traslado = async (bodega_send, bodega_to, producto, cantidad) => {
    const connection = await getConnection();

    try {

        const query_bodega_send = `SELECT * FROM inventarios 
            WHERE id_bodega = ${bodega_send} AND id_producto = ${producto};`;
        const query_bodega_to = `SELECT * FROM inventarios 
            WHERE id_bodega = ${bodega_to} AND id_producto = ${producto};`;

        const data_bodega_send = await connection.execute(query_bodega_send);
        const data_bodega_to = await connection.execute(query_bodega_to);

        let obj = {}

        if (!data_bodega_send[0][0].length) {

            if ((data_bodega_send[0][0].cantidad >= cantidad) && (bodega_send != bodega_to)) {

                const update_inventarios_bodega_send = `UPDATE inventarios SET cantidad = ${data_bodega_send[0][0].cantidad - cantidad} 
                    WHERE id = ${data_bodega_send[0][0].id}`;

                await connection.execute(update_inventarios_bodega_send);

                if (!data_bodega_to.length) {
                    const insert_inventarios = `INSERT INTO inventarios (id_bodega, id_producto, cantidad) 
                    VALUES (${data_bodega_to[0][0].id}, ${producto}, ${cantidad});`;

                    await connection.execute(insert_inventarios);
                } else {

                    const update_inventarios_bodega_to = `UPDATE inventarios SET cantidad = ${data_bodega_to[0][0].cantidad + cantidad} 
                    WHERE id = ${data_bodega_to[0][0].id}`;

                    await connection.execute(update_inventarios_bodega_to);

                }


                const query_historial = `INSERT INTO historiales (cantidad, id_bodega_origen, id_bodega_destino, id_inventario) 
                    VALUES (${cantidad}, ${bodega_send} , ${bodega_to}, ${data_bodega_to[0][0].id})`
                
                const nuvoHistorial = await connection.execute(query_historial);


                const selectHistorial = await connection.query(`SELECT * FROM historiales WHERE id = ${nuvoHistorial[0].insertId};`);

                obj = {
                    'menssage' : 'Traslado exitoso',
                    'data' : {
                        'bodega_origen' : bodega_send,
                        'bodega_destino' : bodega_to,
                        'cantidad' : cantidad,
                        'historial' : selectHistorial[0]
                    }

                }

            }else{
                obj = {
                    'menssage' : 'Operacion invalida',
                    'data' : 'la cantidad no coincide'
                }
            }

        } else {
            obj = {
                'menssage': 'Operacion invalida',
                'data': 'las bodega de envio no cuenta con el producto'
            }
        }

        return obj;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        connection.end();
    }
}

export default {traslado};