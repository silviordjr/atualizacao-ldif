const aniversarios = (funcionarios) => {
    const aniversariantes = []

    funcionarios.map((funcionario) => {
        let soma = 0
        let mat = Number(funcionario.MAT)
        let i = mat.toString().length + 1
        let value = Number(mat.toString().split("").reverse().join(""))
      
        while (value) {
            soma += ((value % 10) * i)
            i = i - 1
            value = Math.floor(value/10)
        }
    
        const resto = soma % 11

        let digito = 11 - resto

        if (digito >= 10){
            digito = 0
        }

        const newAniversario = {
            MAT: Number(funcionario.MAT),
            DG: digito,
            'Nome Funcionario': funcionario['Nome Funcionario'],
            'Data Nascimento': funcionario['Data Nascimento'],
            CODFUN_DESC: funcionario.CODFUN_DESC
        }

        aniversariantes.push(newAniversario)
    })

    const configCsv = {
        MAT: '',
        DG: '',
        'Nome Funcionario': '',
        'Data Nascimento': '',
        CODFUN_DESC: ''
    }

    aniversariantes.reverse()
    aniversariantes.push(configCsv)
    aniversariantes.reverse()

    return aniversariantes
}

export default aniversarios
