import pool from "./Conexion.js";

export const getUsers = async (req, res) => {
  try {
    await pool.query("select * from usuarios").then((result) => {
      res.send(result.rows);
    });
  } catch (error) {
    console.log("error a la consulta: " + error);
    res.status(500).send("Error en la consulta a la base de datos");
  }
};

export const obtenerUsers = async (req, res) => {
  const { id } = req.params;

  try {
    await pool
      .query("select * from usuarios where id= $1", [id])
      .then((result) => {
        if (result.rowCount === 0) {
          res.send("este usuario no existe!");
        } else {
          res.send(result.rows);
        }
      });
  } catch (error) {
    console.log("error a la consulta: " + error);
    res.status(500).send("Error en la consulta a la base de datos");
  }
};

export const borrarUsers = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "delete from usuarios where id = $1 RETURNING *",
      [id]
    );

    // Comprobar si se eliminó un registro
    if (result.rowCount === 0) {
      return res.status(404).send("Usuario no encontrado"); // Responder si no se encontró el usuario
    }
    console.log(result.rows);

    return res.json({
      message: `Usuario Eliminado: ${result.rows[0].nombre}`,
    });
  } catch (error) {
    console.error("Error al insertar el usuario:", error);
    res.status(500).send("a ocurrido un error con la DataBase: ");
  }
  res.send("Borraste un user" + id);
};

export const actualizarUsers = async (req, res) => {
  const { nombre, email, contrasena } = req.body;
  const { id } = req.params;

  try {
    const result = await pool.query(
      "UPDATE usuarios SET nombre = $1, email = $2,contrasena = $3 WHERE id = $4 RETURNING *",
      [nombre, email, contrasena, id]
    );
    res.send("El usuario a sido replanzado por: " + result.rows[0].nombre);
  } catch (error) {
    res.status(404).send("No se puedo actualizar el usuario");
  }
};

export const agregarUsers = async (req, res) => {
  const { nombre, email, contrasena } = req.body; // Desestructuración de datos del cuerpo
  // Validar que todos los campos necesarios estén presentes

  if (!nombre || !email || !contrasena) {
    return res.status(400).send("Faltan datos: nombre, email o contrasena");
  }
  try {
    const result = await pool.query(
      `INSERT INTO usuarios (nombre, email, contrasena) VALUES ($1, $2, $3) RETURNING *`,
      [nombre, email, contrasena]
    );
    res.send(result.rows);
  } catch (error) {
    console.error("Error al insertar el usuario:", error);
    res.status(500).send("Ocurrió un error al ingresar los datos");
  }
};
