import express from 'express'
import { users } from './users'
import { v4 as uuidv4 } from 'uuid'
import { validateCreateMassage } from './../middlewares/validation'




// Criar roteador de rotas
const router = express.Router()

// deixar lista de usuarios disponíveis para outras rotas
const notes = []

// Rota de criação de mensagem
router.post('/massage', validateCreateMassage, (request, response) => {
    const {email, title, description} = request.body

    // Filtra os e-mails para verificação
    const checkEmailCreate  = users.find(user => user.email === email)

    // Verifica se o e-mail já está cadastrado
    if(checkEmailCreate){
        
        //  Cria nova mensagem
        const newMassage = {
            id: uuidv4(),
            title,
            description
        }

        // Adiciona a nova mensagem ao array de mensagens
        notes.push(newMassage)

        // Retorna a resposta com a mensagem criada
        return response.status(201).json({
            message: 'Mensagem criada com sucesso',
            newMassage
        })
    }  else {
        return response.status(404).json({
            message: 'Email não encontrado, verifique ou crie uma conta'
        })
    }


})

// Rota para leitura de mensagem
router.get('/massage/email', (request, response) => {
    const {email} = request.query

    // Filtra os e-mails para verificação
    const checkEmailReading = notes.find(user => user.email === email)

    // Verifica se o e-mail já está cadastrado
    if(checkEmailReading){
        return response.status(200).json({
            message: `Seja bem-vindo!`,
            notes
        })
    } else {
        return response.status(404).json({
            message: 'Email não encontrado, verifique ou crie uma conta'
        })
    }
    
})

// Rota para atualização de mensagem
router.put('/massage/:id', (request, response) => {
    const {id, title, description} = request.body

    // Filtra os ids para verificação
    const checkIdUpdate = notes.find(v => v.id === id); 
    
    // Retorna a mensagem se o id não for encontrado
    if(!checkIdUpdate){    
        return response.status(404).json({
            message: 'Por favor, informe um id válido da mensagem'
        })
    }

    checkIdUpdate.title = title;
    checkIdUpdate.description = description;
    
    return response.status(200).json({
        message: 'Mensagem atualizada com sucesso',
        notes
    })

})

// Rota para deletar de mensagem
router.delete('/massage/:id', (request, response) => {
    const {id} = request.params

    // Filtra os ids para verificação
    const messageId = notes.findIndex(note => note.id === id); 
    
    // Retorna a mensagem se o id não for encontrado
    if(messageId === -1){    
        return response.status(404).json({
            message: 'Mensagem não encontrada, verifique o identificador em nosso banco'
        })
    }

    const [deleteMessage] = notes.splice(messageId, 1);

    return response.status(200).json({
        message: 'Mensagem apagada com sucesso',
        note: deleteMessage
    })

})

router.get('/details/:id', (request, response) => {
    const {id} = request.params
    const note = notes.find(note => note.id === id)
    if(!note){
        return response.status(404).json({
            message: 'Mensagem não encontrada'
        })
    }
    response.status(200).json(note)
})

export default router