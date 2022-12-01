import stringSimilarity from 'string-similarity';

const correlations = (unused, users) => {
    const similarNames = []

    users.map((user) => {
        const userName = user['Nome Funcionario'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
        unused.map((email) => {
            const emailName = email['First Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() + ' ' + email['Last Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()

            const similarity = stringSimilarity.compareTwoStrings(userName, emailName)

            if (similarity >= 0.7){
                const newSimilarity = {
                    cadastroName: userName,
                    emailName: emailName,
                    MAT: user.MAT,
                    CPF: user.CPF,
                    CODFUN_DESC: user.CODFUN_DESC,
                    CODAF_DESC: user.CODAF_DESC,
                    email: email['Email Address [Required]'],
                    last: email['Last Sign In [READ ONLY]']
                }

                similarNames.push(newSimilarity)
            }
        })
    })

    return similarNames
}

export default correlations
