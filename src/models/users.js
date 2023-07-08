import mysql from "mysql2/promise";

import dbConfig from "../config/dbconfig.js";

const getConnection = async () => {
  return await mysql.createConnection(dbConfig);
};

const getUser = async (nombre, password) => {
  const connection = await getConnection();

  try {
    const query_user = `SELECT id, nombre , password FROM usuarios WHERE nombre = "${nombre}" AND password = ${password};`;

    const [result] = await connection.execute(query_user);

    if (!result.length) {
      return {
        nombre: '',
        password: '',
      };
    } else {
      return result[0];
    }
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    connection.end();
  }
};

export default { getUser };
