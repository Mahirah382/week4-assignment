import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pg from "pg"

const app = express() 
app.use(express.json())
app.use(cors())
dotenv.config()

const db = new pg.Pool({
    connectionString: process.env.DB_CONN
})

app.get('/', (req, res) => {
    res.send('Hello and Welcome!!!')
})


app.get('/food', async (req, res) => {
    const data = await db.query(`SELECT * FROM food`)
    const foods = data.rows
    res.status(200).json(foods)
})

app.post('/food', async (req, res) => {
    const userData = req.body
    const foods = userData.rows
    const dbQuery = await db.query(`INSERT INTO food(name, favourite_food) VALUES ($1, $2)`, [userData.name, userData.favourite_food])

    res.status(200).json({message: "added message"})
})

app.listen(4242, () => {
    console.log(`Server started on port http://localhost:4242`)
})