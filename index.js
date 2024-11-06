const express = require('express')
const mysql = require('mysql2/promise')

const app = express()
const port = 3000

//aqui e a configuraçao do banco de dados, aqui vc tem que colocar os seus dados
const pool = mysql.createPool({
    host: 'localhost', 
    user: 'root', 
    password: '',
    database: 'produtos'
})

//middleware para receber todos os dados no formato json
app.use(express.json())

//rota pra ler os dados 
app.get('/dados', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM produto')
        res.json(rows)
    } catch (error) {
        console.error('Erro ao buscar os dados mane:', error)
        res.status(500).json({error: 'Erro interno do servidor'})
    }
})

//rota para poder inserir os dados
app.post('/dados', async (req, res) => {
    const { codigo, nome, valor } = req.body

    try {
        const [result] = await pool.query('INSERT INTO produto ( nome, valor) VALUES ( ?, ?)', [ nome, valor]) 
        res.json({message: 'Dados inseridos com sucesso Brasil', id: result.insertId })
    } catch (error) {
        console.error('Erro ao inserir dados:', error)
        res.status(500).json({error: 'Erro interno do servidor mane'})
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta laaa, http://localhost:${port}`)
})