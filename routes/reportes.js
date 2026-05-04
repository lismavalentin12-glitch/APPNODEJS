const express = require('express')
const router = express.Router()
const PDFDocument = require('pdfkit')
const db = require('../config/db')

// Ruta para generar un reporte de productos
router.get('/productos' , async (req, res) =>{
  
  try {
    const sql =`
    SELECT
    p.id,
        p.idmarca,
        p.nombre,
        p.precio,
        p.garantia,
        p.descripcion,
        p.fechacompra,
        m.nombremarca
    FROM productos p
    INNER JOIN marcas m ON p.idmarca = m.id
    WHERE p.garantia = 12 AND YEAR(p.fechacompra) = 2024
    `

    const [productos] = await db.query(sql)

    //Construir el PDF
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition','inline; filename=reporte.pdf')

    const doc = new PDFDocument({margin: 50})
    doc.pipe(res) 

    //PASO3: Contenido
    doc.fontSize(18).text(`Reporte de Productos`, {align: 'center'})
    doc.moveDown()

    //Recorrer cada elemento encontrado y enviarlo al PDF
    productos.forEach(producto =>{
      //doc.fontSize(12).text(producto.descripcion)
      doc.table({
        data: [[producto.nombre, producto.precio, producto.garantia]]
      })
    })



    
    const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptate.'

    doc.text(`Total de productos: ${productos.length}`)
    doc.moveDown()

    doc.text(lorem, {
      width: 500,
      align: 'justify',
      columns: 2, 
      height: 150
    })

    //PASO 4: Finalizar la creacion del PDF
    doc.end()

  } catch (error) {
    console.error(error)
    res.status(500).send('Error al generar el PDF')
  }

})

module.exports = router