const unusedEmails = (emails, usedEmails) => {
    const unused = []
    const setorialEmails = []
    const terceirizados = []

    emails.map((email) => {
        let used = false
        let setorial = false
        let terceirizado = false

        const setores = ['Admin', 'Apoio', 'Arquivo', 'Atendimento', 'Auditoria', 'Call', 'Casal', 'Chefia', 
                        'Concurso', 'Conselho', 'Contato', 'Demandas', 'Diretoria', 'Emissario', 'Fiscal', 'Gabinete', 
                        'Info', 'Juridico', 'Medicina', 'Negocios', 'Ouvidoria', 'Parceria', 'Portaria', 'Power', 'Pregao', 
                        'Redmine', 'Secretaria', 'Servico', 'Setor', 'SUPFAT', 'UN Serrana', 'atendimento', "supervisao"]
            
        const terceiros = ['Camila Barbosa da Silva', 'Camilla do Nascimento', 'Cintia Kelly Soares de Oliveira Silva', 
                            'Darlim da Silva Santos', 'Daryane Ferreira Soares Albuquerque', 'Gedival Luiz da Silva Filho',
                            'Hugo Felipe dos Santos Araujo', 'Jean Pedro dos Santos', 'Jorge Fernandes Dias Cabral', 
                            'Katiana do Socorro Alves da Silva', 'Samara Isabelly de Souza Sobrinho', 'Silvano Alves Pereira',
                            'Vanessa Rocha Cabral de Melo']

        for (let usedMail of usedEmails){

            if (email['Email Address [Required]'] === usedMail.EMAIL){
                used = true
            }

            if ((setores.indexOf(email['First Name [Required]'].trim()) !== -1) || (email['First Name [Required]'].includes('gerencia') || email['First Name [Required]'].includes('Assessoria') || email['First Name [Required]'].includes('Centr')) || email['First Name [Required]'].includes('Cipa') || email['First Name [Required]'].includes('Comissao') ||  email['First Name [Required]'].includes('Coordena') || email['First Name [Required]'].includes('ETA') || email['First Name [Required]'].includes('Gerencia') || email['First Name [Required]'].includes('Nucleo') || email['First Name [Required]'].includes('Prepostos') ||  email['First Name [Required]'].includes('Secao') || email['First Name [Required]'].includes('Sistema') || email['First Name [Required]'].includes('Superintendencia') || email['First Name [Required]'].includes('Supervis') || email['First Name [Required]'].includes('Unidade') || email['First Name [Required]'].includes('Vice Presidencia')){
                setorial = true
            }

            if (terceiros.indexOf( email['First Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim() + ' ' + email['Last Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim()) !== -1){
                terceirizado = true
            }
        }

        if (!used && !setorial && !terceirizado){
            unused.push(email)
        } else if (!used && setorial && !terceirizado){
            setorialEmails.push(email)
        } else if (!used && !setorial && terceirizado){
            terceirizados.push(email)
        }
    })

    return {unused, setorialEmails, terceirizados}
}

export default unusedEmails