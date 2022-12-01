import { appendFile, existsSync, mkdirSync, renameSync } from 'fs';

const createFiles = (invalidUsers, semEmail, finalList, aniversarios, unusedEmails, correlations, wrongNames, setoriais, terceiros, emailInvalidUser, ldif, suspensos, exceptions) => {
    const dir = './files';

    //checa a existência da pasta files e renomeia com a data atual.
    if (existsSync(dir)) {
        const date = new Date()
        const mounth = date.getMonth()
        const day = date.getDate()
        const year = date.getFullYear()

        renameSync(dir, `${dir}-${day}-${mounth}-${year}`)
    }

    // check if directory exists
    if (!existsSync(dir)) {
        // create directory
        mkdirSync(dir);
    }

    appendFile('./files/Invalidos.csv', invalidUsers, (erro) => {
        if (erro){
            console.log(erro)
        } else {
            console.log('Dados dos usuários inválidos gravados com sucesso!')
        }
    })

    appendFile('./files/SemEmail.csv', semEmail, (e) => {
        if (e){
            console.log(e)
        } else {
            console.log('Dados de usuários sem email gravados com sucesso!')
        }
    })

    appendFile('./files/Lista.csv', finalList, (e) => {
        if (e){
            console.log(e)
        } else{
            console.log('Dados dos usuários com email gravados com sucesso!')
        }
    })

    appendFile('./files/Exceptions.csv', exceptions, (e) => {
        if (e){
            console.log(e)
        } else{
            console.log('Dados das exceções gravados com sucesso!')
        }
    })

    appendFile('./files/Aniversarios.csv', aniversarios.replaceAll(',', ';').replaceAll('"', ''), (e) => {
        if (e){
            console.log(e)
        } else{
            console.log('Dados dos aniversariantes gravados com sucesso!')
        }
    })

    appendFile('./files/EmailsSemUso.csv', unusedEmails, (e) => {
        if (e){
            console.log(e)
        } else{
            console.log('Dados de e-mails sem uso gravados com sucesso!')
        }
    })

    appendFile('./files/Correlacoes.csv', correlations, (e) => {
        if (e){
            console.log(e)
        } else{
            console.log('Dados das correlações gravados com sucesso!')
        }
    })

    appendFile('./files/WrongNames.csv', wrongNames, (e) => {
        if (e){
            console.log(e)
        } else{
            console.log('Dados dos nomes incorretos gravados com sucesso!')
        }
    })

    appendFile('./files/Setoriais.csv', setoriais, (e) => {
        if (e){
            console.log(e)
        } else{
            console.log('Dados dos emails setoriais gravados com sucesso!')
        }
    })

    appendFile('./files/Terceirizados.csv', terceiros, (e) => {
        if (e){
            console.log(e)
        } else{
            console.log('Dados dos emails de terceirizados gravados com sucesso!')
        }
    })

    appendFile('./files/EmailsUsuariosInvalidos.csv', emailInvalidUser, (e) => {
        if (e){
            console.log(e)
        } else{
            console.log('Dados dos emails com usuários inválidos gravados com sucesso!')
        }
    })

    appendFile('./files/dados_empregados.ldif', ldif, (e) => {
        if (e){
            console.log(e)
        } else{
            console.log('Arquivo .ldif gravado com sucesso!')
        }
    })

    appendFile('./files/EmailsSuspensos.csv', suspensos, (e) => {
        if (e){
            console.log(e)
        } else{
            console.log('Dados dos emails suspensos gravados com sucesso!')
        }
    })
}

export default createFiles