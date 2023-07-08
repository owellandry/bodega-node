import mysql from "mysql2/promise";
import dbConfig from "../config/dbconfig.js";

const getConnection = async () => {
    return await mysql.createConnection(dbConfig);
};


const updateInventario = async (id_producto, id_bodega, cantidad , id, cantidad_actual) => {
    
    const connection = await getConnection();
    
        try {
            
            const query_inventarios = `UPDATE inventarios SET cantidad = ${cantidad + cantidad_actual}, id_producto = ${id_producto}, id_bodega = ${id_bodega}
                WHERE id_producto = ${id_producto} AND id_bodega = ${id_bodega};`;
    
            const [update_inventario] = await connection.execute(query_inventarios);
    
            const inventario = await connection.query(
                `SELECT * FROM inventarios WHERE id = ${id};`
            )

            console.log(id);

            let obj = {
                "mensaje": "actualizacion de inventario",
                "inventario": inventario[0]
            }    

            return obj;
    
        } catch (error) {
            console.log(error);
            throw error;
        }finally{
            connection.end();
        }
    
}


const crearInventario = async (id_producto, id_bodega, cantidad) => {

    const connection = await getConnection();

    try {
        
        const query_inventarios = `INSERT INTO inventarios (id_producto, id_bodega, cantidad) VALUES (${id_producto}, ${id_bodega}, ${cantidad});`;

        const [innser_inventario] = await connection.execute(query_inventarios);

        const inventario = await connection.query(
            `SELECT * FROM inventarios WHERE id = ${innser_inventario.insertId};`
        )


        let obj = {
            "mensaje": "crear nuevo inventario",
            "inventario": inventario[0]
        }   

        return obj;

    } catch (error) {
        console.log(error);
        throw error;
    }finally{
        connection.end();
    }
}

const selectInventario = async (id_producto, id_bodega, cantidad) => {

    const connection = await getConnection();

    try {
        
        const query_inventarios = `SELECT * FROM inventarios WHERE id_producto = ${id_producto} AND id_bodega = ${id_bodega};`;

        const [inventario] = await connection.execute(query_inventarios);


        return !inventario.length ? crearInventario(id_producto, id_bodega, cantidad): updateInventario(id_producto, id_bodega, cantidad, inventario[0].id , inventario[0].cantidad) ;

    } catch (error) {
        console.log(error);
        throw error;
    }finally{
        connection.end();
    }


}

export default {selectInventario};