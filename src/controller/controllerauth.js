import jwt from 'jsonwebtoken';

import users from "../models/users.js";
import jwtconfig from '../config/jwtconfig.js';

const authorization = async (req, res) => {
  const secretKey = jwtconfig.secret_key;

  try {
    const { nombre, password } = req.body;

    const user = await users.getUser(nombre, password);

    const auth = user.nombre === nombre && user.password == password;
    if (!auth) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    } else {
      const token = jwt.sign({ id: user.id, nombre: user.nombre }, secretKey, {
        expiresIn: "1h",
      });

      res.json({ token });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { authorization };
