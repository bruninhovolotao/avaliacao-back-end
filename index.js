import express from 'express'
import cors from 'cors'

import usersRouter from './routes/users'
import notesRouter from './routes/notes'

const app = express()

const PORT = 3000

app.use(cors())
app.use(express.json()) 

app.use('/users', usersRouter)
app.use('/notes', notesRouter)

app.get('/', (request, response) => {
    return response.status(200).json({
        message: 'Bem vindo à aplicação'
    })
})

app.listen(PORT, () =>{ 
    console.log(`Servidor Conectado na porta ${PORT}`)
})