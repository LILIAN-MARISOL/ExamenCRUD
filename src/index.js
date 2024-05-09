import express from "express"
import { pool } from "./database.js"

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('holis')
})

// listado de elementos
app.get('/Libros', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Libros')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Error al realizar la consulta.'})
    }
})

app.listen(2000)