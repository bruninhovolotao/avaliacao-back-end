import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

import { validateUserRegistration } from './../middlewares/validation'

const router = express.Router() // Criar roteador de rotas

export const users = [] // deixar lista de usuarios disponíveis para outras rotas


router.post('/signup', validateUserRegistration, async (request, response) => {
    const{name, email, password} = request.body

    const emailAlreadyRegistration  = users.find(user => user.email === email)

    if(emailAlreadyRegistration ){
        return response.status(400).json({
            message: 'E-mail já cadastrado'
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword 
    }

    users.push(newUser)

    response.status(201).json({
        message: 'Conta criada com sucesso',
        user: newUser
    })
})

export default router