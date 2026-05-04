const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET - Obtener todas las marcas
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM marcas ORDER BY nombremarca ASC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al obtener marcas', error: err.message });
  }
});

// GET - Obtener una marca por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM marcas WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Marca no encontrada' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al obtener la marca', error: err.message });
  }
});

// POST - Crear nueva marca
router.post('/', async (req, res) => {
  const { nombremarca } = req.body;
  if (!nombremarca || nombremarca.trim() === '') {
    return res.status(400).json({ success: false, message: 'El nombre de la marca es requerido' });
  }
  try {
    const [result] = await db.query('INSERT INTO marcas (nombremarca) VALUES (?)', [nombremarca.trim()]);
    res.status(201).json({ success: true, message: 'Marca creada exitosamente', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al crear la marca', error: err.message });
  }
});

// PUT - Actualizar marca
router.put('/:id', async (req, res) => {
  const { nombremarca } = req.body;
  if (!nombremarca || nombremarca.trim() === '') {
    return res.status(400).json({ success: false, message: 'El nombre de la marca es requerido' });
  }
  try {
    const [result] = await db.query('UPDATE marcas SET nombremarca = ? WHERE id = ?', [nombremarca.trim(), req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Marca no encontrada' });
    }
    res.json({ success: true, message: 'Marca actualizada exitosamente' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al actualizar la marca', error: err.message });
  }
});

// DELETE - Eliminar marca
router.delete('/:id', async (req, res) => {
  try {
    // Verificar si tiene productos asociados
    const [productos] = await db.query('SELECT COUNT(*) as total FROM productos WHERE idmarca = ?', [req.params.id]);
    if (productos[0].total > 0) {
      return res.status(409).json({ success: false, message: `No se puede eliminar: la marca tiene ${productos[0].total} producto(s) asociado(s)` });
    }
    const [result] = await db.query('DELETE FROM marcas WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Marca no encontrada' });
    }
    res.json({ success: true, message: 'Marca eliminada exitosamente' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al eliminar la marca', error: err.message });
  }
});

module.exports = router;