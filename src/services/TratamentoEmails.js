const tratamentoEmails = (emails) => {
    const active = []
    const suspended = []

    emails.map((email) => {
        if (email['Status [READ ONLY]'].toUpperCase() === 'ACTIVE'){
            active.push(email)
        } else {
            suspended.push(email)
        }
    })

    return {active, suspended}
}

export default tratamentoEmails