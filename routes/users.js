import express, { response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

import { validateUserRegistration } from './../middlewares/validation'
import { validateUserLogin } from './../middlewares/validation'

// Criar roteador de rotas
const router = express.Router() 

// deixar lista de usuarios disponíveis para outras rotas
export const users = [] 

// Rota de cadastro (signup)
router.post('/signup', validateUserRegistration, async (request, response) => {
    const{name, email, password} = request.body

    // Filtra os e-mails para verificação
    const emailAlreadyRegistered  = users.find(user => user.email === email)

    // Verifica se o e-mail já está cadastrado
    if(emailAlreadyRegistered){
        return response.status(400).json({
            message: 'Email já cadastrado, insira outro'
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

    // Retorna a resposta com o usuário criado
    response.status(201).json({
        message: `Seja bem vindo, ${newUser.name}! Pessoa usuária registrada com sucesso!`
    })
})

// Rota de cadastro (login)
router.post('/login', validateUserLogin, async (request, response) =>{
    const{name, email, password} = request.body
    
    // Filtra os  e-mails para verificação
    const login = users.find(user => user.email === email)

    // Retorna mensagem de erro se o e-mail não for encontrado
    if (!login){
        return response.status(400).json({
            message: 'Email não encontrado no sistema, verifique ou crie uma conta'
        })
    }
    
    // Atribui a senha criptografada a variavel de login
    const hashedPassword = login.password

    //  Verifica e compara se a senha está correta
    const passwordCompare  = await bcrypt.compare(password, hashedPassword)
    
    // Retorna resposta se senha estiver errada
    if(!passwordCompare){
        return response.status(400).json({
            message: 'Login ou senha inválidos'
        })
    } 

    // Retorna resposa se usuário foi logado com sucesso
    response.status(200).json({
        message: `Seja bem vindo ${login.name} ! Pessoa usuária logada com sucesso!`
    })

})


router.get('/signup', (request, response) => {
    return response.json(users)
})

export default router