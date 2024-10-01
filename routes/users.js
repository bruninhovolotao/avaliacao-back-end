import express, { response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

import { validateUserRegistration } from './../middlewares/validation'

const router = express.Router() // Criar roteador de rotas

export const users = [] // deixar lista de usuarios disponíveis para outras rotas

// Rota de cadastro (signup)
router.post('/signup', validateUserRegistration, async (request, response) => {
    const{name, email, password} = request.body

    // Verifica se o e-mail já está cadastrado
    const emailAlreadyRegistered  = users.find(user => user.email === email)

    if(emailAlreadyRegistered){
        return response.status(400).json({
            message: 'E-mail já cadastrado'
        })
    }

    // Cria o hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Cria o novo usuário
    const newUser = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword 
    }

    // Adiciona o novo usuário ao array de usuários
    users.push(newUser)

    // Retorna a resposta com status 201 e o usuário criado
    response.status(201).json({
        message: 'Conta criada com sucesso',
        user: newUser
    })
})

export default router