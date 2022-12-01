const createList = (emails, cadastros) => {
    const finalList = []
    const usersSemEmail = []
    const correlations = []

    cadastros.map((cadastro) => {
        let cadastroName 

        switch (cadastro.CPF){
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
                cadastroName = cadastro['Nome Funcionario'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim()
        }
        
        let match = false
        let correlation = false
        const userCorrelations = []

        emails.map((email) => {

            const emailName = email['First Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim() + ' ' + email['Last Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim()
            
            const emailPrefixo = email['Email Address [Required]'].split('@')[0].split('.')

            let correctEmail 

            if (email['First Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim().includes(emailPrefixo[0].toUpperCase()) && emailPrefixo[1] && email['Last Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim().includes(emailPrefixo[1].toUpperCase())){
                correctEmail = 'TRUE'
            } else {
                correctEmail = 'FALSE'
            }

            if (cadastroName === emailName && cadastroName !== "EDUARDO BARBOSA DA SILVA"){
                const user = {
                    ... cadastro, 
                    'Nome Funcionario': cadastroName,
                    EMAIL: email['Email Address [Required]'],
                    'Status [READ ONLY]': email['Status [READ ONLY]'],
                    nome: email['First Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim(),
                    sobrenome: email['Last Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim(),
                    correctEmail
                }

                finalList.push(user)

                match = true
            } else if (cadastroName === emailName && cadastroName === "EDUARDO BARBOSA DA SILVA"){
                if (cadastro.CPF === '382.393.024-91' && email['Email Address [Required]'] === 'eduardo.barbosa@casal.al.gov.br'){
                    const user = {
                        ... cadastro, 
                        'Nome Funcionario': cadastroName,
                        EMAIL: email['Email Address [Required]'],
                        'Status [READ ONLY]': email['Status [READ ONLY]'],
                        nome: email['First Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim(),
                        sobrenome: email['Last Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim(),
                        correctEmail
                    }
    
                    finalList.push(user)
    
                    match = true
                } else if (cadastro.CPF === '088.036.574-95' && email['Email Address [Required]'] === 'eduardo.silva@casal.al.gov.br'){
                    const user = {
                        ... cadastro, 
                        'Nome Funcionario': cadastroName,
                        EMAIL: email['Email Address [Required]'],
                        'Status [READ ONLY]': email['Status [READ ONLY]'], 
                        nome: email['First Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim(),
                        sobrenome: email['Last Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim(),
                        correctEmail
                    }
                    
                    finalList.push(user)
    
                    match = true
                }
            }
        })

        if (!match){
            const user = {
                ... cadastro,
                'Nome Funcionario': cadastroName
            }
            usersSemEmail.push(user)
        }

        if (!match && correlation){
            userCorrelations.map((c) => {
                correlations.push(c)
            })
        }
    })

    return {finalList, usersSemEmail, correlations}
}

export default createList