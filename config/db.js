const mysql = require('mysql2/promise') //Acceso BD - MySQL
require('dotenv').config() //Leer los valores del archivo de configuracion

//pool de conexion => "Conjunto de conexiones disponibles"
// Conexión "regular" (normal) => usuario 1 => abre > proceso > cierra
//pool "oprimizado" => Se crean todas las conexion a oferecer
const pool = mysql.createPool({
    host: process.env.DB_HOST||  "localhost",
    user: process.env.DB_USER|| "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DB_NAME|| "",
    port: process.allowedNodeEnvironmentFlags.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 50,
    timezone: "-05:00"
})
//Ejectutar la conexion - IIFE (Expresion de funcion invocada de forma inmediata)
(async () => {
    try {
        const conn = await pool.getConnection(); // Conexión prestada
        console.log("Conexión a Mysql correcta");
        conn.release(); //Devolcion
    }catch (err){
    console.error(err.message)
    }
})();