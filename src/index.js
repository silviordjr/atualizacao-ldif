import neatCsv from 'neat-csv';
import fs, { appendFile } from 'fs'
import createList from './services/Create.js';
import validarCadastro from './services/Validar.js';
import convertJsonToCsv from 'convert-json-to-csv';
import createFiles from './services/CreateFiles.js';
import verificar from './services/VerificarUsers.js';
import aniversarios from './services/Aniversarios.js';
import unusedEmails from './services/UnusedEmails.js';
import wrongNames from './services/WrongNames.js';
import totalList from './services/TotalList.js';
import checkEmails from './services/CheckForgetEmails.js';
import correlations from './services/Correlations.js';
import ldif from './services/LDIF.js';
import tratamentoEmails from './services/TratamentoEmails.js';


// Abertura dos arquivos e transformação para JSON; Início da aplicação.
fs.readFile('../emails-casal.csv', 'utf8', async (err, dataOldList) => { // arquivo antigo de emails, dados desatualizados, porem com cpf para o cruzamento de dados.
    const oldList = await neatCsv(dataOldList, { separator: ';' })

    fs.readFile('../emails.csv', 'utf8', async (err, dataEmail) => { // arquivo atualizado dos emails da casal; emails.csv necessita ser utf8.
        try {
            const emails = await neatCsv(dataEmail.replace(/^\uFEFF/, ''), { separator: ',' }) // replace para tratamento da assinatura utf8 whith BOM; Setar separator de acordo com o arquivo.
    
            fs.readFile('../cadastros.csv', 'utf8', async (err, dataCadastro) => { // arquivo do rh com os dados dos funcionários e pensionistas da casal.
                let cadastros = await neatCsv(dataCadastro, { separator: ';' })

                cadastros = cadastros.filter((cadastro) => {
                    return cadastro.MAT
                })

                const emailsValidos = tratamentoEmails(emails) // tratamento do arquivo de emails para a separação de emails ativos e emails suspensos.
                const verificados = verificar(cadastros) // tratamento do arquivo do cadastro para a verificação de dupla entrada de dados (cpf válidos e duplos) ou funcionários com o mesmo nome (cpf diferente).
                const cad = validarCadastro(verificados.finalList) // tratamento para validar o cadastro, a partir do CODAF_DESC.
                const list = createList(emailsValidos.active, cad.cadastrosValidos) // cruzamento de dados entre os emails ativos e a lista de cadastros válidos para se criar as relações.
                const aniversariantes = aniversarios(cad.cadastrosValidos) // Criação da lista de aniversariantes a partir dos cadastros válidos.
                const unusedMails = unusedEmails(emailsValidos.active, list.finalList) // cruzamento de dados para a obtenção dos emails que ainda não obtiveram alguma relação encontrada.
                const wrongName = wrongNames(unusedMails.unused, oldList, cadastros) // cruzamento de dados com os emails não usados, a lista de cadastros e a antiga lista de emails (com cpf) para o cruzamento dos dados a partir do cpf.
                const total = totalList(list.finalList, wrongName) // junção das relações obtidas a partir dos cruzamentos dos dados.
                const unusedTotal = unusedEmails(emailsValidos.active, total) // atualização da lista de emails sem relação encontrada.
                const wrongTotal = wrongNames(unusedTotal.unused, oldList, cadastros)
                const check = checkEmails(unusedTotal.unused, cad.cadastrosInvalidos) // Checagem entre os emails sem relações encontradas e os cadastros inválidos para a separação entre os emails sem relação e emails associados a usuários inválidos.
                const similarity = correlations(check.noUser, cadastros) // cruzamento de dados para checar similaridade (possíveis erros de digitação ou abreviação de nomes) entre os emails não usados e a lista do cadastro, baseado no coeficiente de Dice.
                const ldifScript = ldif(total, list.usersSemEmail, cad.cadastrosValidos) // criação dos dados para o arquivo .ldif a partir das relações estabelecidas e de usuários com cadastros válidos.

                // definição dos cabeçalhos dos arquivos .csv.
                const columnDefinition = ['EMPFIL', 'MAT', 'Nome Funcionario', 'Descricao Sexo', 'IDNUM', 'IDSER', 'IDUF', 'CPF', 'Data Nascimento', 'CODLOT', 'CODLOT_DESC', 'CODFUN_DESC', 'CODAF_DESC']
                const columnDefinitionMails = ['First Name [Required]', 'Last Name [Required]', 'Email Address [Required]', 'Status [READ ONLY]', 'Last Sign In [READ ONLY]', 'Email Usage [READ ONLY]']
                const columnDefinitionCorrelations = ['cadastroListName', 'emailListName', 'email']
                const columnDefinitionSucess = [... columnDefinition, 'EMAIL']
                const columnDefinitionWrongNames = [... columnDefinitionSucess, 'CURNAME']
                const columnDefinitionExceptions = [... columnDefinition, 'motivo']
                const columnDefinitionAniversarios = ['MAT', 'DG', 'Nome Funcionario', 'Data Nascimento', 'CODFUN_DESC']
                const columnDefinitionSimilarity = ['cadastroName', 'emailName', 'MAT', 'CPF', 'CODFUN_DESC', 'CODAF_DESC', 'email', 'last']
                const columnDefinitionStatusEmail = [... columnDefinitionSucess, 'Status [READ ONLY]', 'nome', 'sobrenome', 'correctEmail']

                // conversão dos objetos obtidos, juntamente com os cabeçalhos, em formato csv
                const invalidUsers = convertJsonToCsv.convertArrayOfObjects(cad.cadastrosInvalidos, columnDefinition)
                const semEmail = convertJsonToCsv.convertArrayOfObjects(list.usersSemEmail, columnDefinition)
                const finalList = convertJsonToCsv.convertArrayOfObjects(total, columnDefinitionStatusEmail)
                const exceptions =  convertJsonToCsv.convertArrayOfObjects(verificados.exceptions, columnDefinitionExceptions)
                const aniversariosMes = convertJsonToCsv.convertArrayOfObjects(aniversariantes, columnDefinitionAniversarios)
                const unused = convertJsonToCsv.convertArrayOfObjects(check.noUser, columnDefinitionMails)
                const corr = convertJsonToCsv.convertArrayOfObjects(similarity, columnDefinitionSimilarity)
                const wrong = convertJsonToCsv.convertArrayOfObjects(wrongName, columnDefinitionWrongNames)
                const seotriais = convertJsonToCsv.convertArrayOfObjects(unusedTotal.setorialEmails, columnDefinitionMails)
                const terceiros = convertJsonToCsv.convertArrayOfObjects(unusedTotal.terceirizados, columnDefinitionMails)
                const emailInvalidUser = convertJsonToCsv.convertArrayOfObjects(check.invalidsMails, columnDefinitionSucess)
                const suspendedMails = convertJsonToCsv.convertArrayOfObjects(emailsValidos.suspended, columnDefinitionMails)

                //criação dos arquivos .csv e .ldif.
                createFiles(invalidUsers, semEmail, finalList, aniversariosMes, unused, corr, wrong, seotriais, terceiros, emailInvalidUser, ldifScript, suspendedMails, exceptions)
             })
        } catch (err) {
            console.log(err)
        }
    })
    
})


