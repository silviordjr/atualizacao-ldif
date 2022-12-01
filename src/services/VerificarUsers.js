import { cpf } from 'cpf-cnpj-validator';

const verificar = (cadastros) => {
    const finalList = []
    const exceptions = []

    cadastros.map((cadastro, index, list) => {
        let duplaOcorrencia = false
        let duploNome = false
        
        for (let i = index + 1; i < cadastros.length; i++){
            
            if (cadastro.CPF === cadastros[i].CPF){
                if ((cadastro.CPF !== '091.578.673-72' && cadastro.CPF !== '024.724.354-01')){
                    duplaOcorrencia = true
                }
            } else if (cadastro['Nome Funcionario'] === cadastros[i]['Nome Funcionario']){
                cadastros[i]['Nome Funcionario'] = cadastros[i]['Nome Funcionario'] + ' 2'
                duploNome = true
            }
        }

        if (duplaOcorrencia && cpf.isValid(cadastro.CPF)){
            const cad = {
                ... cadastro,
                motivo: 'Dupla Ocorrência de CPFs'
            }

            exceptions.push(cad)
        } else if(duploNome){
            if (!duplaOcorrencia){
                finalList.push(cadastro)
            }
            
            const cad = {
                ... cadastro,
                motivo: 'Possível ocorrência de funcionários com nomes iguais.'
            }

            exceptions.push(cad)
        } else {
            finalList.push(cadastro)
        }
    })

    return {finalList, exceptions}
}

export default verificar