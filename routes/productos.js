<<<<<<< HEAD
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
=======
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET - Obtener todos los productos (con join a marcas)
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT 
        p.id, p.idmarca, m.nombremarca, p.nombre,
        p.precio, p.garantia, p.descripcion,
        DATE_FORMAT(p.fechacompra, '%Y-%m-%d') AS fechacompra,
        p.created_at, p.updated_at
      FROM productos p
      INNER JOIN marcas m ON p.idmarca = m.id
      ORDER BY p.id DESC
    `;
    const [rows] = await db.query(query);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al obtener productos', error: err.message });
  }
});

// GET - Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const query = `
      SELECT 
        p.id, p.idmarca, m.nombremarca, p.nombre,
        p.precio, p.garantia, p.descripcion,
        DATE_FORMAT(p.fechacompra, '%Y-%m-%d') AS fechacompra
      FROM productos p
      INNER JOIN marcas m ON p.idmarca = m.id
      WHERE p.id = ?
    `;
    const [rows] = await db.query(query, [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al obtener el producto', error: err.message });
  }
});

// POST - Crear nuevo producto
router.post('/', async (req, res) => {
  const { idmarca, nombre, precio, garantia, descripcion, fechacompra } = req.body;

  // Validaciones
  if (!idmarca) return res.status(400).json({ success: false, message: 'La marca es requerida' });
  if (!nombre || nombre.trim() === '') return res.status(400).json({ success: false, message: 'El nombre del producto es requerido' });
  if (!precio || isNaN(precio) || parseFloat(precio) <= 0) return res.status(400).json({ success: false, message: 'El precio debe ser un número mayor a 0' });

  try {
    // Verificar que la marca exista
    const [marcas] = await db.query('SELECT id FROM marcas WHERE id = ?', [idmarca]);
    if (marcas.length === 0) {
      return res.status(400).json({ success: false, message: 'La marca especificada no existe' });
    }

    const query = `
      INSERT INTO productos (idmarca, nombre, precio, garantia, descripcion, fechacompra)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      idmarca,
      nombre.trim(),
      parseFloat(precio),
      garantia ? parseInt(garantia) : null,
      descripcion ? descripcion.trim() : null,
      fechacompra || null
    ];

    const [result] = await db.query(query, values);
    res.status(201).json({ success: true, message: 'Producto creado exitosamente', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al crear el producto', error: err.message });
  }
});

// PUT - Actualizar producto
router.put('/:id', async (req, res) => {
  const { idmarca, nombre, precio, garantia, descripcion, fechacompra } = req.body;

  // Validaciones
  if (!idmarca) return res.status(400).json({ success: false, message: 'La marca es requerida' });
  if (!nombre || nombre.trim() === '') return res.status(400).json({ success: false, message: 'El nombre del producto es requerido' });
  if (!precio || isNaN(precio) || parseFloat(precio) <= 0) return res.status(400).json({ success: false, message: 'El precio debe ser un número mayor a 0' });

  try {
    // Verificar que el producto exista
    const [productos] = await db.query('SELECT id FROM productos WHERE id = ?', [req.params.id]);
    if (productos.length === 0) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    // Verificar que la marca exista
    const [marcas] = await db.query('SELECT id FROM marcas WHERE id = ?', [idmarca]);
    if (marcas.length === 0) {
      return res.status(400).json({ success: false, message: 'La marca especificada no existe' });
    }

    const query = `
      UPDATE productos
      SET idmarca = ?, nombre = ?, precio = ?, garantia = ?, descripcion = ?, fechacompra = ?
      WHERE id = ?
    `;
    const values = [
      idmarca,
      nombre.trim(),
      parseFloat(precio),
      garantia ? parseInt(garantia) : null,
      descripcion ? descripcion.trim() : null,
      fechacompra || null,
      req.params.id
    ];

    await db.query(query, values);
    res.json({ success: true, message: 'Producto actualizado exitosamente' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al actualizar el producto', error: err.message });
  }
});

// DELETE - Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }
    res.json({ success: true, message: 'Producto eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al eliminar el producto', error: err.message });
  }
});

module.exports = router;
>>>>>>> 882a7ad (Avance)
