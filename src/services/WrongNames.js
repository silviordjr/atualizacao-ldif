import { cpf } from 'cpf-cnpj-validator';

const wrongNames = (unuseds, oldList, cadastros) => {
    const users = []
    
    let user

    unuseds.map((unused) => {
        user = {}

        for (let u of oldList){
                if (unused['Email Address [Required]'] === u['E-Mail']){
                    user = {
                        ... u
                    }
                }
        }

        if (user['E-Mail']){
       
            const userCPF = cpf.format(user['ID Login'])
    
            cadastros.map((u) => {
                let cadastroName 

                switch (u.CPF){
                    case '048.209.654-33': 
                        cadastroName = 'GEORGE ROBERTO SANTOS ATAIDE DE VASCONCELOS'
                        break
                    case '094.552.014-02':
                        cadastroName = 'NIKAELLY EMANUELLA CORREIA DE OLIVEIRA SANTOS'
                        break
                    case '087.177.654-55':
                        cadastroName = 'ISILANE MORGANA MONTEIRO DOS SANTOS GARCIA'
                        break
                    case '056.534.244-47':
                        cadastroName = 'ANA KAROLINA TEIXEIRA LIMA GOMES GUIMARAES'
                        break
                    case '082.709.764-66':
                        cadastroName = 'JESSICA GABRIELLE DA SILVA FERREIRA PAULINO'
                        break
                    case '138.178.874-26':
                        cadastroName = 'JOSE MESSIAS POLICARPO DO NASCIMENTO NETO'
                        break
                    case '111.622.184-52':
                        cadastroName = 'GUSTAVO ROSIVAL LIMA MEDEIROS VASCONCELOS GODOI'
                        break
                    default:
                        cadastroName = u['Nome Funcionario'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
                }
            
                const emailPrefixo = user['E-Mail'].split('@')[0].split('.')
    
                let correctEmail 
    
                if (unused['First Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim().includes(emailPrefixo[0].toUpperCase()) && emailPrefixo && unused['Last Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim().includes(emailPrefixo[1].toUpperCase())){
                    correctEmail = 'TRUE'
                } else {
                    correctEmail = 'FALSE'
                }

                if ((u.CPF === userCPF) && u.CODAF_DESC.toUpperCase().includes('ATIVO')){
                    const newUser = {
                        ... u,
                        'Nome Funcionario': cadastroName,
                        EMAIL: user['E-Mail'],
                        CURNAME: unused['First Name [Required]'] + ' ' + unused['Last Name [Required]'],
                        'Status [READ ONLY]': user.Status,
                        nome: unused['First Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim(),
                        sobrenome: unused['Last Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim(),
                        correctEmail
                    }

                    users.push(newUser)
                }
            })
        }

    })


    return users
}

export default wrongNames