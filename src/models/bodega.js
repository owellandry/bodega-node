import mysql from "mysql2/promise";
import dbConfig from "../config/dbconfig.js";

const getConnection = async () => {
    return await mysql.createConnection(dbConfig);
};


const createBodega = async (nombre, id_responsable, estado) => {
    const connection = await getConnection();

    try {


        const [result] = await connection.query(
            `INSERT INTO bodegas (nombre, id_responsable, estado) VALUES ("${nombre}", ${id_responsable} , ${estado})`
        );


        const bodegaId = result.insertId;



        const [bodega] = await connection.query(
            `SELECT * FROM bodegas WHERE id = ${bodegaId}`
        );

        console.log(result);
        console.log(bodega[0].nombre);

        return bodega[0];
    } catch (error) {
        throw error;
    } finally {
        connection.end();
    }
};


const listarproductos = async () => {

    const connection = await getConnection();

    try {


        const producto = await connection.query( /* SQL */
            ` SELECT t2.nombre AS "bodega" , SUM(t1.cantidad) AS "total", t3.nombre AS "producto" FROM inventarios AS t1 
        INNER JOIN bodegas AS t2 ON t2.id = t1.id_bodega
        INNER JOIN productos AS t3 ON t3.id = t1.id_producto
        GROUP BY t2.nombre, t1.id_producto
        ORDER BY total DESC`);



        return producto[0];
    } catch (error) {
        throw error;
    } finally {
        connection.end();
    }


}


export default { createBodega, listarproductos };
