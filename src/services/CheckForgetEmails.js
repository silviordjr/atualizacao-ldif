const checkEmails = (unused, invalids) => {
    const noUser = []
    const invalidsMails = []

    unused.map((un) => {
        const unusedName = un['First Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() + ' ' + un['Last Name [Required]'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
        let hasUser = false
        let matchUser

        invalids.map((invalid) => {
            const invalidName = invalid['Nome Funcionario'].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
        

            if (invalidName === unusedName){
                hasUser = true

                matchUser = invalid
            }
        })

        if (hasUser){

            const newUser = {
                ... matchUser,
                EMAIL: un['Email Address [Required]']
            }

            invalidsMails.push(newUser)
        } else {
            noUser.push(un)
        }
    })

    return {noUser, invalidsMails}
}

export default checkEmails