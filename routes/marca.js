const express = require("express");
const router = express.Router();
const db = require("../config/db");

//Retorna todas las marcas
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM marcas ORDER BY nombremarca ASC",
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error al obtener marcas",
      error: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    //params 0 valor ingresa por la URL
    const idbuscado = req.params.id;
    const [rows] = await db.query("SELECT * FROM marcas WHERE id = ?", [
      idbuscado,
    ]);

    if (rows.length == 0) {
      return res
        .status(404)
        .json({ success: false, message: "Marca no encontrada" });
    }

    //Status(200) default
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error en el buscador marcas",
        error: err.message,
      });
  }
});

router.post("/:id", async (req, res) => {
  try {
    // Dato(s) de entrada
    const { nombremarca } = req.body;

    //Validacion de datos
    if (!nombremarca || nombremarca.trim() === "") {
      return res
        .status(400)
        .json({
          success: false,
          message: "El nombre de la marca es requerido",
        });
    }

    //Inserción
    const [result] = await db.query(
      "INSERT INTO marcas (nombremarca) VALUES (?)",
      [nombremarca],
    );
    res
      .status(201)
      .json({
        success: true,
        message: "Marca creada exitosamente",
        id: result.insertId,
      });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error en el buscador marcas",
        error: err.message,
      });
  }
});

router.put("/", async (req, res) => {
  try {
    const { nombremarca } = req.body;

    //validacion de datos
    if (!nombremarca || nombremarca.trim() === "") {
      return res
        .status(400)
        .json({
          success: false,
          message: "El nombre de la marca es requerido",
        });
    }
    //Consulta
    const [result] = await db.query(
      "UPDATE marcas SET nombremarca = ? WHERE id = ?",
      [nombremarca, req.params.id],
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Marca no encontrada" });
    }
    //Status = 200 default
    res.json({ success: true, message: "Marca actualizada exitosamente" });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error en el buscador marcas",
        error: err.message,
      });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    //Hace falta una validacion ..¿?(Dependencia foranea)
    const [productos] = await db.query(
      "SELECT COUNT(*) AS count FROM productos WHERE idmarca = ?",
      [req.params.id],
    );

    //COUNT (*) - función resumen - encontro PRODUCTOS asociados a esta marca
    if (productos[0].total > 0) {
      return res
        .status(409)
        .json({
          success: false,
          message: "No se puede eliminar la marca porque tiene productos asociados",
          products: productos[0].total,
        });
    }

    const [result] = await db.query("DELETE FROM marcas WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Marca no encontrada" });
    }
    //Status = 200 default
    res.json({ success: true, message: "Marca eliminada exitosamente" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error en el buscador marcas",
      error: err.message,
    });
  }
});

module.exports = router;
