const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Retorna un producto por id
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM productos WHERE idproducto = ?",
    );

    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error al obtener producto",
      error: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const idbuscado = req.params.id;
    const [rows] = await db.query(
      "SELECT * FROM productos WHERE idproducto = ?",
      [idbuscado],
    );

    //Status
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500)
      .json({
      success: false,
      message: "Error al obtener productos",
      error: err.message,
    });
  }
});

module.exports = router;
