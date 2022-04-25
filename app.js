const express = require('express')
const mongoose = require('mongoose')
const Package = require('./models/Package')

const app = express()

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'Oi Express!' })
})

// Create
app.post('/package', async (req, res) => {
    const { name, id, batch, manufacturingDate, expiringDate, origin, amount } = req.body

    const package = {
        name,
        id,
        batch,
        manufacturingDate,
        expiringDate,
        origin,
        amount,
    }

    try {
        await Package.create(package)

        res.status(201).json({ message: 'Pacote inserido no sistema com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Read
app.get('/package/:id', async (req, res) => {
    const id = req.params.id

    try {
        const package = await Package.findOne({ id: id })

        if (!package) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }

        res.status(200).json(package)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Update
app.patch('/package/:id', async (req, res) => {
    const _id = req.params.id

    const { name, id, batch, manufacturingDate, expiringDate, origin, amount } = req.body

    const package = {
        name,
        id,
        batch,
        manufacturingDate,
        expiringDate,
        origin,
        amount,
    }

    try {
        const updatedPackage = await Package.updateOne({ id: _id }, package)
        if (updatedPackage.matchedCount === 0) {
            res.status(422).json({ message: 'Pacote não encontrado!' })
            return
        }
        res.status(200).json(package)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Delete
app.delete('/package/:id', async (req, res) => {
    const id = req.params.id

    const package = await Package.findOne({ id: id })

    if (!package) {
        res.status(422).json({ message: 'Pacote não encontrado!' })
        return
    }

    try {
        await Package.deleteOne({ id: id })

        res.status(200).json({ message: 'Pacote removido com sucesso!' })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

mongoose
    .connect(
        'mongodb+srv://renato:s8q66edB33B1AGIi@api-redes.5keya.mongodb.net/RCA?retryWrites=true&w=majority'
    )
    .then(() => {
        console.log('Conectou ao banco!')
        app.listen(3000)
    })
    .catch((err) => console.log(err))

//s8q66edB33B1AGIi
