// Verifica se todos os campos estão preenchidos ao cadastrar um novo usuário
export function validateUserRegistration (request, response, next){
    const {name, email, password} = request.body
    
    // Verifica se os dados estão em branco
    if(!name){
        return response.status(400).json({
            message: 'Por favor, verifique se passou o nome'
        })
    }

    // Verifica se os dados estão em branco
    if(!email){
        return response.status(400).json({
            message: 'Por favor, verifique se passou o email'
        })
    }

    // Verifica se os dados estão em branco
    if(!password){
        return response.status(400).json({
            message: 'Por favor, verifique se passou a senha'
        })
    }

    next()
}

export function validateUserLogin (request, response, next){
    const {email, password} = request.body

    // Verifica se os dados estão em branco
    if(!email){
        return response.status(400).json({
            message: 'Insira um e-mail válido'
        })
    }

    // Verifica se os dados estão em branco
    if(!password){
        return response.status(400).json({
            message: 'Insira uma senha válida'
        })
    }

    next()
}

export function validateCreateMassage (request, response, next){
    const {title, description} = request.body

    // Verifica se os dados estão em branco
    if(!title){
        return response.status(400).json({
            message: 'Insira um e-mail válido'
        })
    }

    // Verifica se os dados estão em branco
    if(!description){
        return response.status(400).json({
            message: 'Insira uma senha válida'
        })
    }

    next()
}