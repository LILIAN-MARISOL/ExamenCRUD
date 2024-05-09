import express from "express"
import { pool } from "./database.js"

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('holis')
})

// a.listado de elementos
app.get('/Libros', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Libros')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Error al realizar la consulta.'})
    }
})

//b.creacion de elementos
app.post('/Libros', async (req, res) => {
    try {
        const {ID,Titulo,Autor,Editorial, ISBN, Fecha_de_publicacion} = req.body;
        const [rows] = await pool.query('INSERT INTO Libros (ID,Titulo,Autor,Editorial, ISBN, Fecha_de_publicacion) VALUES (?,?,?,?,?,?)', [ID,Titulo,Autor,Editorial, ISBN, Fecha_de_publicacion])
        res.status(201).json({Titulo})
    } catch(error) {
        return res.status(500).json({message: 'Error al realizar la consulta'})
    }
})
//c.muestra de listado para seleccionar y mostrar los detalles del mismo
app.get('/Libros/:ID', async (req, res) => {
    try {
        const {ID} = req.params;
        const [rows] = await pool.query('SELECT * FROM Libros WHERE ID=?', [ID])
        if (rows.length <= 0) return res.status(400).json({message: 'No se encontro el libro'})
        res.json(rows)
    } catch(error) {
        return res.status(500).json({message: 'Error al realizar la consulta'})
    }
})

//d. En detalles o en otra pantalla pueda editar y guardar los cambios de este elemento
app.put('/Libros', async (req, res) => {
    try {
        const {ID,Titulo,Autor,Editorial, ISBN, Fecha_de_publicacion} = req.body;
        const [resultado] = await pool.query(`UPDATE Libros SET Titulo = "${Titulo}", Autor = "${Autor}", Editorial = "${Editorial}", ISBN = "${ISBN}", Fecha_de_publicacion = "${Fecha_de_publicacion}" WHERE ID = ${ID}`);

        if (resultado.affectedRows === 0) return res.status(404).json({message: "No se encontro el libro"})

        const [updated] = await pool.query("SELECT * FROM Libros WHERE ID = ?", ID)
        res.json(updated);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error al realizar la consulta."})
    }
})
//e. Pueda borrar el elemento en cuestión.
app.delete('/Libros/:ID', async (req, res) => {
    try {
        const {ID} = req.params
        console.log(ID)
        const [rows] = await pool.query('DELETE FROM Libros WHERE ID = ?', ID)

        if (rows.affectedRows <= 0) {
            return res.status(404).json({message: 'No se encontro el libro'})
        }

        res.send({message: 'Se elimino el libro'})
    } catch (error) {

    }
})

app.listen(2000)