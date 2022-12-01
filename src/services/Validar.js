import { cpf } from 'cpf-cnpj-validator';

const validarCadastro = (cadastros) => {
    const cadastrosValidos = []
    const cadastrosInvalidos = []
    
    cadastros.map((cadastro) => {
        if ((cadastro.CODAF_DESC.toUpperCase().includes('ATIVO') || cadastro.CODAF_DESC.toUpperCase().includes('LICENCA GESTANTE') ||
         cadastro.CODAF_DESC.toUpperCase().includes('APOSENTADO') || cadastro.CODAF_DESC.toUpperCase().includes('INSS') || cadastro.CODAF_DESC.toUpperCase().includes('ACIDENTE') || 
         cadastro.CODAF_DESC.toUpperCase().includes('SUSPENSO')) && cpf.isValid(cadastro.CPF)){
             if(!cadastro.CODLOT_DESC.toUpperCase().includes('CONSELHO') || (cadastro.CPF !== '091.578.673-72' && cadastro.CPF !== '024.724.354-01')){
                 cadastrosValidos.push(cadastro)
             } else {
                //  console.log(cadastro)
             }
        } else {
            cadastrosInvalidos.push(cadastro)
        }

    //     if ((cadastro.CODAF_DESC.toUpperCase().includes('ATIVO') || cadastro.CODAF_DESC.toUpperCase().includes('LICENCA GESTANTE') || cadastro.CODAF_DESC.toUpperCase().includes('ACIDENTE')) && cpf.isValid(cadastro.CPF)){
    //         if(!cadastro.CODLOT_DESC.toUpperCase().includes('CONSELHO')){
    //             cadastrosValidos.push(cadastro)
    //         }
    //    } else {
    //        cadastrosInvalidos.push(cadastro)
    //    }
    })

    return {cadastrosValidos, cadastrosInvalidos}
}

export default validarCadastro