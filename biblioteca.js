import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

// Importação dinâmica para `prompt-sync`
const promptSync = (await import('prompt-sync')).default;
const prompt = promptSync();

let usuarios = [];


function carregarUsuarios() {
    if (fs.existsSync("usuarios.txt") && fs.existsSync("senhas.txt") && fs.existsSync("idades.txt")) {
        const nomes = fs.readFileSync("usuarios.txt", "utf-8").split("\n").filter(Boolean);
        const senhas = fs.readFileSync("senhas.txt", "utf-8").split("\n").filter(Boolean);
        const idades = fs.readFileSync("idades.txt", "utf-8").split("\n").filter(Boolean);


        for (let i = 0; i < nomes.length; i++) {
            usuarios.push({ nomeUsuario: nomes[i], senha: senhas[i], idade: idades[i] });
        }
    }
}

function salvarUsuario(nomeUsuario, senha, idade) {
    fs.appendFileSync("usuarios.txt", nomeUsuario + "\n");
    fs.appendFileSync("senhas.txt", senha + "\n");
    fs.appendFileSync("idades.txt", idade + "\n");
}

function registrar() {
    console.log("-REGISTER-");
    let nomeUsuario = prompt("Digite um nome de usuário (até 8 caracteres): ");
    let senha = prompt("Digite uma senha (4 números): ");
    let idade = prompt("Digite sua idade: ");
    
    if (nomeUsuario.length > 8) {
        console.log("Nome de usuário deve ter no máximo 8 caracteres. Tente novamente.");
        registrar();
        return;
    }

    if (!senha.match(/^\d{4}$/)) {
        console.log("Senha deve conter exatamente 4 números. Tente novamente.");
        registrar();
        return;
    }

    let usuarioExiste = usuarios.some(usuario => usuario.nomeUsuario === nomeUsuario);
    let senhaExiste = usuarios.some(usuario => usuario.senha === senha);

    if (usuarioExiste || senhaExiste) {
        console.log("Nome de usuário ou senha já existem. Por favor, escolha outro.");
        registrar();
    } else {
        usuarios.push({ nomeUsuario, senha, idade});
        console.log("Registro bem-sucedido!");
        salvarUsuario(nomeUsuario, senha, idade);
        logar(0);
    }
}


function logar(tentativas) {
    console.clear();
    const texto =`\n    ▒█▀▀█ ▀█▀ ▒█▀▀█ ▒█░░░ ▀█▀ ▒█▀▀▀█ ▀▀█▀▀ ▒█▀▀▀ ▀▄▒▄▀ 
    ▒█▀▀▄ ▒█░ ▒█▀▀▄ ▒█░░░ ▒█░ ▒█░░▒█ ░▒█░░ ▒█▀▀▀ ░▒█░░ 
    ▒█▄▄█ ▄█▄ ▒█▄▄█ ▒█▄▄█ ▄█▄ ▒█▄▄▄█ ░▒█░░ ▒█▄▄▄ ▄▀▒▀▄ 
    \n
    `;        
    
    console.log(texto);
    console.log("-LOGIN-");
    
    if (tentativas >= 1){
        console.log("\n Nome de usuário ou senha inválidos. Por favor, tente novamente.\n");
    }

    let nomeUsuario = prompt("Digite seu nome de usuário: ");
    let senha = prompt("Digite sua senha: ");

    let usuario = usuarios.find(usuario => usuario.nomeUsuario === nomeUsuario && usuario.senha === senha);

    if (usuario) {
        console.log("Login bem-sucedido! Bem-vindo(a), " + nomeUsuario + "!");
        menuprincipal(nomeUsuario);
    } else if (nomeUsuario === 'ADMIN' && senha === '1234') {
        console.log("Bem-vindo ADMIN!!");
        menuadmin();
    } else {
        verificarEscolha(tentativas);
    }
}

function menuinicial() {   
    console.clear(0);
    const texto =`\n    ▒█▀▀█ ▀█▀ ▒█▀▀█ ▒█░░░ ▀█▀ ▒█▀▀▀█ ▀▀█▀▀ ▒█▀▀▀ ▀▄▒▄▀ 
    ▒█▀▀▄ ▒█░ ▒█▀▀▄ ▒█░░░ ▒█░ ▒█░░▒█ ░▒█░░ ▒█▀▀▀ ░▒█░░ 
    ▒█▄▄█ ▄█▄ ▒█▄▄█ ▒█▄▄█ ▄█▄ ▒█▄▄▄█ ░▒█░░ ▒█▄▄▄ ▄▀▒▀▄ 
    \n
    `;    
    
    console.log(texto);
    console.log("1. Registrar");
    console.log("2. Logar");
    console.log("3. Sair");

    let escolha = prompt("Escolha uma opção: ");

    switch (escolha) {
        case "1":
            registrar();
            break;
        case "2":
            logar(0);
            break;
        case "3":
            console.log("\n\n ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂\n▕ ★ Obrigado por usar a BIBLIOTEX! Até a próxima. ★▕\n ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n");
            process.exit(0);
        default:
            console.log("Opção inválida. Por favor, escolha 1, 2 ou 3.");
    }

    menuinicial();
}

function menuadmin() {
    console.clear(0);
    const texto =`\n
    
    ░█▀▀█ ▒█▀▀▄ ▒█▀▄▀█ ▀█▀ ▒█▄░▒█ 　 ▒█▀▀█ ▒█▀▀█ ▀▄▒▄▀ 
    ▒█▄▄█ ▒█░▒█ ▒█▒█▒█ ▒█░ ▒█▒█▒█ 　 ▒█▀▀▄ ▒█▀▀▄ ░▒█░░ 
    ▒█░▒█ ▒█▄▄▀ ▒█░░▒█ ▄█▄ ▒█░░▀█ 　 ▒█▄▄█ ▒█▄▄█ ▄▀▒▀▄ 

    \n
    `;    
    console.log(texto);
    console.log(chalk.hex('#ffa500')("1. Adicionar Livros📗"));
    console.log(chalk.hex('#ffa500')("2. Retirar Livros📘"));
    console.log(chalk.hex('#ffa500')("3. Dados dos Clientes🦰"));
    console.log(chalk.hex('#ffa500')("4. Listas de Livros📚"));
    console.log(chalk.redBright("5. Sair❌"));

    let escolha = prompt("\nEscolha uma opção: \n");

    switch (escolha) {
        case "1":
            addLivrosAdm();
            break;
        case "2":
            removerLivros();
            break;
        case "3":
           dadosCliente()
        case "4":
            livrosAdm()
        case "5":
            console.log("\n Até logo！👋\n");
            process.exit(0);
        default:
            console.log(chalk.bold.black.bgRed(" ⌦ Opção inválida. Por favor, escolha 1, 2, 3 ou 4. ⌦"));
            menuadmin();
    }
}

function menuprincipal(nomeUsuario) {

    console.clear(0);
    const texto =`\n    ▒█▀▀█ ▀█▀ ▒█▀▀█ ▒█░░░ ▀█▀ ▒█▀▀▀█ ▀▀█▀▀ ▒█▀▀▀ ▀▄▒▄▀ 
    ▒█▀▀▄ ▒█░ ▒█▀▀▄ ▒█░░░ ▒█░ ▒█░░▒█ ░▒█░░ ▒█▀▀▀ ░▒█░░ 
    ▒█▄▄█ ▄█▄ ▒█▄▄█ ▒█▄▄█ ▄█▄ ▒█▄▄▄█ ░▒█░░ ▒█▄▄▄ ▄▀▒▀▄ 
    \n
    `         
    console.log(texto);
    console.log("1. Meus Livros");
    console.log("2. Livros Disponíveis");
    console.log("3. Livros Alugados");
    console.log("4. Devolver Livros");
    console.log("5. Voltar para o menu de login");
    console.log("6. Sair");  

    let escolha = prompt("\nEscolha uma opção: ");

    switch (escolha) {
        case "1":
            mostrarMeusLivros(nomeUsuario);
            break;
        case "2":
            mostrarLivrosDisponiveis(nomeUsuario);
            break;
        case "3":
            mostrarLivrosAlugados(nomeUsuario);
            break;
        case "4":
            devolverLivros(nomeUsuario);
            break;
        case "5":
            menuinicial();
        case "6":
            console.log("Até logo!");
            process.exit(0);
        default:
            console.log("Opção inválida. Por favor, escolha 1, 2, 3, 4, 5 ou 6.");
            menuprincipal(nomeUsuario);
    }
}

function mostrarLivrosDisponiveis(nomeUsuario) {
    console.clear(0);

    const texto =`\n
    
    ▒█▀▀█ ▒█▀▀█ ▀▄▒▄▀ 　 　 　 　 　  █░░ ░▀░ ▀█░█▀ █▀▀█ █▀▀█ █▀▀ 
    ▒█▀▀▄ ▒█▀▀▄ ░▒█░░ 　 　 　 　 　  █░░ ▀█▀ ░█▄█░ █▄▄▀ █░░█ ▀▀█ 
    ▒█▄▄█ ▒█▄▄█ ▄▀▒▀▄ 　 　 　 　 　  ▀▀▀ ▀▀▀ ░░▀░░ ▀░▀▀ ▀▀▀▀ ▀▀▀ 

　 　 　 　 　 　 　 　 　 █▀▀▄ ░▀░ █▀▀ █▀▀█ █▀▀█ █▀▀▄ ░▀░ ▀█░█▀ █▀▀ ░▀░ █▀▀ 
　 　 　 　 　 　 　 　 　 █░░█ ▀█▀ ▀▀█ █░░█ █░░█ █░░█ ▀█▀ ░█▄█░ █▀▀ ▀█▀ ▀▀█ 
　 　 　 　 　 　 　 　 　 ▀▀▀░ ▀▀▀ ▀▀▀ █▀▀▀ ▀▀▀▀ ▀░░▀ ▀▀▀ ░░▀░░ ▀▀▀ ▀▀▀ ▀▀▀ 
    \n
    `         
    console.log(texto);
    const nomeArquivo = './livrosdisponiveis.txt';

    try {
        const data = fs.readFileSync(nomeArquivo, 'utf8');

        const linhas = data.split('\n');

        if (linhas.length > 0) {
            console.log("\n ✔ Livros disponíveis: \n");
            linhas.forEach((linha, index) => {
                const partes = linha.split(',');
                if (partes.length === 3) {
                    const titulo = partes[0].trim();
                    const autor = partes[1].trim();
                    const classificacao = partes[2].trim();
                    console.log(`${index + 1}. Título: ${titulo}, Autor: ${autor}, Classificação: ${classificacao}`);
                }
            });

            let escolha = prompt("\n ▶ Escolha um livro para adicionar à sua lista (ou '0' para voltar): ");
            escolha = parseInt(escolha);

            if (escolha > 0 && escolha <= linhas.length) {
                const partes = linhas[escolha - 1].split(',');
                const titulo = partes[0].trim();
                const autor = partes[1].trim();
                const classificacao = partes[2].trim();
                
                let confirmacao = prompt(chalk.greenBright(`\n ✎  Você escolheu o livro: Título: ${titulo}, Autor: ${autor}, Classificação: ${classificacao}.\n\n ☑ Deseja confirmar a escolha? (1: sim / 2: não) : `));
                confirmacao = parseInt(confirmacao);

                if (confirmacao === 1) {
                    let idade = parseInt(verificarIdade(nomeUsuario))
                    
                    if (idade >= parseInt(classificacao)){

                        adicionarLivroUsuario(nomeUsuario, linhas[escolha - 1]);
                        removerLivroDisponivel(linhas[escolha - 1], nomeArquivo);
                        console.log("\n ★  Parabens, ótima escolha, livro adicionado à sua lista pessoal com sucesso!! ★ \n")
                        console.log("--------------------------------------------------------------------------------------------------------") 
                        console.log("|ATENÇÃO : Tempo de devolução: 1 semana")  
                        console.log("\n|          Taxa de atraso: R$ 7,00")
                        console.log("\n|          Quantidades de Renovação: 3 vezes")
                        console.log("\n|          Taxa adicional caso não devolva o livro: R$ 2,00/dia")
                        console.log("\n|          Penalidade por não devolver depois de 1 mês de atraso: NÃO poderá alugar livros por 9 meses")
                        console.log("--------------------------------------------------------------------------------------------------------") 

                    } else if (idade < parseInt(classificacao)){
                        console.log( chalk.redBright("\n ⌦ Você não tem idade suficiente para alugar este livro. ⌫ "))
                    }

                    let proximaAcao = prompt("\n ▶ Deseja sair da aplicação, selecionar outro livro ou voltar para o menu principal? (1: para outro / 2: para menu principal / 3: para sair): ");
                    proximaAcao = parseInt(proximaAcao);

                    if (proximaAcao === 1) {
                        mostrarLivrosDisponiveis(nomeUsuario);
                        return;
                    } else if (proximaAcao === 2) {
                        menuprincipal(nomeUsuario);
                        return;
                    } else if (proximaAcao === 3) {
                        
                        console.log("\n\n ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂\n▕ ★ Obrigado por usar a BIBLIOTEX! Até a próxima. ★▕\n ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n");
                        process.exit(0);
                    } else {
                        console.log("\n ⌦ Opção inválida, retornando ao menu principal. ⌫ \n");
                        menuprincipal(nomeUsuario);
                    }
                } else if (confirmacao === 2) {
                    console.log("\n ⌦ Operação cancelada. ⌫ \n");
                    menuprincipal(nomeUsuario);
                } else {
                    console.log("\n ⌦ Opção inválida, retornando ao menu principal. ⌫ \n");
                    menuprincipal(nomeUsuario);
                }

            } else if (escolha !== 0) {
                console.log("\n ⌦ Opção inválida. ⌫ \n");
                menuprincipal(nomeUsuario);
            }
        } else {
            console.log("\n ⌦ Nenhum livro disponível no momento, aguarde para novidades... ⌫ \n");
            menuprincipal(nomeUsuario);
        }
    } catch (err) {
        console.error('\n ⌦ Erro ao ler o arquivo:', err);
        menuprincipal(nomeUsuario);
    }
}

function adicionarLivroUsuario(nomeUsuario, livro) {
    const nomeArquivo = `meuslivros_${nomeUsuario}.txt`;
    fs.appendFileSync(nomeArquivo, livro + "\n");
}

function removerLivroDisponivel(livro, nomeArquivo) {
    try {
        let data = fs.readFileSync(nomeArquivo, 'utf8');
        let linhas = data.split('\n');
        linhas = linhas.filter(linha => linha !== livro);
        data = linhas.join('\n');
        fs.writeFileSync(nomeArquivo, data, 'utf8');
    } catch (err) {
        console.error(chalk.redBright('⌦ Erro ao remover o livro da lista de disponíveis: ⌦', err));
    }
}

function mostrarMeusLivros(nomeUsuario) {
    console.clear(0);
    const texto =`\n

▒█▀▀█ ▒█▀▀█ ▀▄▒▄▀ 　 　 　 　 　 █▀▄▀█ █▀▀ █░░█ █▀▀ 
▒█▀▀▄ ▒█▀▀▄ ░▒█░░ 　 　 　 　 　 █░▀░█ █▀▀ █░░█ ▀▀█ 
▒█▄▄█ ▒█▄▄█ ▄▀▒▀▄ 　 　 　 　 　 ▀░░░▀ ▀▀▀ ░▀▀▀ ▀▀▀ 

　 　 　 　 　 　 　 　 　 　█░░ ░▀░ ▀█░█▀ █▀▀█ █▀▀█ █▀▀ 
　 　 　 　 　 　 　 　 　 　█░░ ▀█▀ ░█▄█░ █▄▄▀ █░░█ ▀▀█ 
　 　 　 　 　 　 　 　 　 　▀▀▀ ▀▀▀ ░░▀░░ ▀░▀▀ ▀▀▀▀ ▀▀▀ 
    \n
    `         
    console.log(texto);
    const nomeArquivo = `meuslivros_${nomeUsuario}.txt`;

    if (fs.existsSync(nomeArquivo)) {
        try {
            const data = fs.readFileSync(nomeArquivo, 'utf8');

            const linhas = data.split('\n');

            if (linhas.length > 0) {
                console.log(`\nLivros de ${nomeUsuario}:\n`);
                linhas.forEach((linha, index) => {
                    console.log(`${index + 1}. ${linha}`);
                });
            } else {
                console.log(`\nNenhum livro encontrado para ${nomeUsuario}.\n`);
            }
        } catch (err) {
            console.error(`\nErro ao ler os livros de ${nomeUsuario}:`, err);
        }
    } else {
        console.log("\nEsse usuário não tem uma lista de livros.\n");
    }

    let acao = prompt("\nDeseja sair da aplicação ou voltar para o menu principal? (1: para menu principal / 2: para sair): ");
    acao = parseInt(acao);

    if (acao === 1) {
        menuprincipal(nomeUsuario);
    } else if (acao === 2) {
        console.log("\nObrigado por usar a aplicação! Até a próxima.\n");
        process.exit(0);
    } else {
        console.log("\nOpção inválida, retornando ao menu principal.\n");
        menuprincipal(nomeUsuario);
    }
}

function removerLivros() {
    console.clear(0);
    const texto =`\n
    
    ░█▀▀█ ▒█▀▀▄ ▒█▀▄▀█ ▀█▀ ▒█▄░▒█ 　 ▒█▀▀█ ▒█▀▀█ ▀▄▒▄▀ 
    ▒█▄▄█ ▒█░▒█ ▒█▒█▒█ ▒█░ ▒█▒█▒█ 　 ▒█▀▀▄ ▒█▀▀▄ ░▒█░░ 
    ▒█░▒█ ▒█▄▄▀ ▒█░░▒█ ▄█▄ ▒█░░▀█ 　 ▒█▄▄█ ▒█▄▄█ ▄▀▒▀▄ 

    \n
    `         
    console.log(texto);
    const arquivoTxt = './livrosdisponiveis.txt';

    try {
        const data = fs.readFileSync(arquivoTxt, 'utf8');
        const linhas = data.split('\n').filter(Boolean);

        if (linhas.length > 0) {
            console.log(chalk.magentaBright("\n Livros disponíveis para remoção:📚 \n"));
            linhas.forEach((linha, index) => {
                const partes = linha.split(',');
                if (partes.length === 3) {
                    const titulo = partes[0].trim();
                    const autor = partes[1].trim();
                    const classificacao = partes[2].trim();
                    console.log(chalk.bold.blueBright( `${index + 1}. Título: ${titulo}, Autor: ${autor}, Classificação: ${classificacao}`));
                }
            });

            let escolha = prompt(" \n Escolha um número para remover (ou '0' para voltar): \n ");
            escolha = parseInt(escolha);

            if (escolha > 0 && escolha <= linhas.length) {
                linhas.splice(escolha - 1, 1);  // Corrigido para remover o item correto
                fs.writeFileSync(arquivoTxt, linhas.join('\n'), 'utf8');
                console.log(chalk.greenBright(" \n ✔ Livro removido com sucesso! \n"));
            } else if (escolha !== 0) {
                console.log(chalk.redBright(" \n Opção inválida ⌦ \n"));
            }
        } else {
            console.log(" \n❗Nenhum livro disponível para remoção❗\n");
        }
    } catch (err) {
        console.error(chalk.redBright('Erro ao ler o arquivo:', err));
    }

    let proximaAcao = prompt(" \n Deseja remover outro livro, voltar para o menu principal ou sair? (1 para remover outro / 2 para menu principal / 3 para sair): \n ");
    proximaAcao = parseInt(proximaAcao);

    if (proximaAcao === 1) {
        removerLivros();
    } else if (proximaAcao === 2) {
        menuadmin();
    } else if (proximaAcao === 3) {
        console.log(chalk.greenBright("\n Obrigado por usar a aplicação! Até a próxima 👋  \n"));
        process.exit(0);
    } else {
        console.log(chalk.redBrigh("\n ⌦ Opção inválida, retornando ao menu principal ⌦ \n"));
        menuadmin();
    }
}

function addLivrosAdm() {
    console.clear(0);
    const texto =`\n
    
    ░█▀▀█ ▒█▀▀▄ ▒█▀▄▀█ ▀█▀ ▒█▄░▒█ 　 ▒█▀▀█ ▒█▀▀█ ▀▄▒▄▀ 
    ▒█▄▄█ ▒█░▒█ ▒█▒█▒█ ▒█░ ▒█▒█▒█ 　 ▒█▀▀▄ ▒█▀▀▄ ░▒█░░ 
    ▒█░▒█ ▒█▄▄▀ ▒█░░▒█ ▄█▄ ▒█░░▀█ 　 ▒█▄▄█ ▒█▄▄█ ▄▀▒▀▄ 

    \n
    `         
    console.log(texto);
    const nomeArquivo = './livrosdisponiveis.txt';
    const nomeLivro = prompt(chalk.hex('#ffa500')('Digite o nome do livro que deseja adicionar: '));
    const autorLivro = prompt(chalk.hex('#ffa500')('Digite o autor do livro: '));
    const faixaEtaria = prompt(chalk.hex('#ffa500')('Digite a faixa etária recomendada (em anos): '));

    const livroFormatado = `"${nomeLivro}","${autorLivro}",${faixaEtaria}\n`;

    let livrosDisponiveis = [];
    if (fs.existsSync(nomeArquivo)) {
        const data = fs.readFileSync(nomeArquivo, 'utf-8');
        livrosDisponiveis = data.split('\n').filter(Boolean);
    }

    const livroExiste = livrosDisponiveis.some(livro => {
        return livro.includes(`"${nomeLivro}","${autorLivro}",`);
    });

    if (livroExiste) {
        console.log(`O livro "${nomeLivro}" do autor "${autorLivro}" já foi adicionado.`);
    } else {
        fs.appendFileSync(nomeArquivo, livroFormatado);
        console.log(chalk.greenBright(` \n O livro "${nomeLivro}" do autor "${autorLivro}" foi adicionado com sucesso.\n`));
    }

    let proximaAcao = prompt(" \n Deseja adicionar outro livro, voltar para o menu principal ou sair? (1 para adicionar outro / 2 para menu principal / 3 para sair): \n ");
    proximaAcao = parseInt(proximaAcao);

    if (proximaAcao === 1) {
        addLivrosAdm();
    } else if (proximaAcao === 2) {
        menuadmin();
    } else if (proximaAcao === 3) {
        console.log(chalk.hex('#ffa500')(" \n Obrigado por usar a aplicação! Até a próxima 👋 \n"));
        process.exit(0);
    } else {
        console.log(chalk.redBrigh(" \n   ⌦ Opção inválida, retornando ao menu principal ⌦ \n"));
        menuadmin();
    }
}

function mostrarLivrosAlugados(nomeUsuario){
    console.clear(0);
    const texto =`\n

▒█▀▀█ ▒█▀▀█ ▀▄▒▄▀ 　 　 　 　 　 █░░ ░▀░ ▀█░█▀ █▀▀█ █▀▀█ █▀▀ 
▒█▀▀▄ ▒█▀▀▄ ░▒█░░ 　 　 　 　 　 █░░ ▀█▀ ░█▄█░ █▄▄▀ █░░█ ▀▀█ 
▒█▄▄█ ▒█▄▄█ ▄▀▒▀▄ 　 　 　 　 　 ▀▀▀ ▀▀▀ ░░▀░░ ▀░▀▀ ▀▀▀▀ ▀▀▀ 

　 　 　 　 　 　 　 　 　 　 █▀▀█ █░░ █░░█ █▀▀▀ █▀▀█ █▀▀▄ █▀▀█ █▀▀ 
　 　 　 　 　 　 　 　 　 　 █▄▄█ █░░ █░░█ █░▀█ █▄▄█ █░░█ █░░█ ▀▀█ 
　 　 　 　 　 　 　 　 　 　 ▀░░▀ ▀▀▀ ░▀▀▀ ▀▀▀▀ ▀░░▀ ▀▀▀░ ▀▀▀▀ ▀▀▀ 
    \n
    `;         
    console.log(texto);
    let contador = 0;
    console.log(`Os livros que já estão alugados são:\n`);
    const nomes = fs.readFileSync("usuarios.txt", "utf-8").split("\n").filter(Boolean);

    for (let i = 0; i < usuarios.length; i++) {
        try {    
            let user = nomes[i];
            let nomeArquivo = `meuslivros_${user}.txt`;
            if (fs.existsSync(nomeArquivo) && user != nomeUsuario){
                if (fs.readFileSync(`meuslivros_${user}.txt`, "utf-8").split("\n").filter(Boolean) != ""){
                    contador += 1;
                    const dataUsuarios = fs.readFileSync(nomeArquivo, 'utf8');
                    console.log(`\n- ${user} -\n\n `+ dataUsuarios +`------------------------------------`);
                }
            }
        } catch (err) {
            console.error(`\nErro ao ler os livros alugados de ${user}:`, err);
        }
    }
    if (contador === 0){
        console.log("\nNão existem livros alugados por outros usuários no momento.\n");
    }

    let proximaAcao = prompt("\nDeseja voltar para o menu principal ou sair? ( 1: para menu principal / 2: para sair): ");
    proximaAcao = parseInt(proximaAcao);

    if (proximaAcao === 1) {
        menuprincipal(nomeUsuario);
    } else if (proximaAcao === 2) {
        console.log("\nObrigado por usar a aplicação! Até a próxima.\n");
        process.exit(0);
    } else {
        console.log("\nOpção inválida, retornando ao menu principal.\n");
        menuprincipal(nomeUsuario);
    }
}

function devolverLivros(nomeUsuario) {
    console.clear();

    const texto = `
▒█▀▀█ ▒█▀▀█ ▀▄▒▄▀ 　 　 　 █▀▀▄ █▀▀ ▀█░█▀ █▀▀█ █░░ ▀█░█▀ █▀▀ █▀▀█ 
▒█▀▀▄ ▒█▀▀▄ ░▒█░░ 　 　 　 █░░█ █▀▀ ░█▄█░ █░░█ █░░ ░█▄█░ █▀▀ █▄▄▀ 
▒█▄▄█ ▒█▄▄█ ▄▀▒▀▄ 　 　 　 ▀▀▀░ ▀▀▀ ░░▀░░ ▀▀▀▀ ▀▀▀ ░░▀░░ ▀▀▀ ▀░▀▀ 

█░░ ░▀░ ▀█░█▀ █▀▀█ █▀▀█ █▀▀ 
█░░ ▀█▀ ░█▄█░ █▄▄▀ █░░█ ▀▀█ 
▀▀▀ ▀▀▀ ░░▀░░ ▀░▀▀ ▀▀▀▀ ▀▀▀ 
    `;
    console.log(texto);

    const nomeArquivo = `meuslivros_${nomeUsuario}.txt`;

    try {
        const data = fs.readFileSync(nomeArquivo, 'utf8');
        const linhas = data.split('\n').filter(linha => linha.trim() !== ''); // Filtra linhas vazias
        
        if (linhas.length > 0) {
            console.log(`\nLivros de ${nomeUsuario}:\n`);
            linhas.forEach((linha, index) => {
                console.log(`${index + 1}. ${linha}`);
            });
            
            let escolha = prompt("\nEscolha um número para devolver à biblioteca (ou '0' para voltar): ");
            escolha = parseInt(escolha);
            
            if (escolha > 0 && escolha <= linhas.length) {
                adicionarLivroDisponivel(linhas[escolha - 1]);
                console.log("\nLivro devolvido com sucesso!!\n\n");
                removerLivroUsuario(nomeArquivo, escolha - 1);
            } else if (escolha !== 0) {
                console.log("\nOpção inválida.\n");
            }
        } else {
            console.log(`\nNenhum livro encontrado para ${nomeUsuario}.\n`);
        }
    } catch (err) {
        console.error(`Você não tem livros alugados para devolver.`);
    }

    let proximaAcao = prompt("\nDeseja voltar para o menu principal, devolver mais livros ou sair? (1: para menu principal / 2: para devolver mais livros / 3: para sair): ");
    proximaAcao = parseInt(proximaAcao);

    if (proximaAcao === 1) {
        menuprincipal(nomeUsuario);
    } else if (proximaAcao === 2) {
        devolverLivros(nomeUsuario);
    } else if (proximaAcao === 3) {
        console.log("\nObrigado por usar a aplicação! Até a próxima.\n");
        process.exit(0);
    } else {
        console.log("\nOpção inválida, retornando ao menu principal.\n");
        menuprincipal(nomeUsuario);
    }

}

function adicionarLivroDisponivel(livro) {
    const nomeArquivo = './livrosdisponiveis.txt';
    try {
        if (fs.existsSync(nomeArquivo)) {
            const data = fs.readFileSync(nomeArquivo, 'utf8');
            const linhas = data.split('\n').filter(Boolean); 

            fs.appendFileSync(nomeArquivo, livro + "\n");
        } else {
            fs.writeFileSync(nomeArquivo, livro + "\n");
        }
    } catch (err) {
        console.error('Erro ao adicionar o livro aos disponíveis:', err);
    }
}

function removerLivroUsuario(nomeArquivo, indice) {
    try {
        let data = fs.readFileSync(nomeArquivo, 'utf8');
        let linhas = data.split('\n');
        linhas.splice(indice, 1);
        data = linhas.join('\n');
        fs.writeFileSync(nomeArquivo, data, 'utf8');
    } catch (err) {
        console.error('Erro ao remover o livro da lista do usuário:', err);
    }
}

function verificarEscolha(tentativas){
    tentativas += 1
    if (tentativas >= 3){
        let voltar = prompt("Deseja voltar para o menu inicial?(SIM = 1/NÃO = 2) ")
        if (voltar === '1'){
            menuinicial()
        } else if (voltar === '2') {
            logar(0)
        } else {
            console.log("Escolha uma opção válida")
            verificarEscolha(tentativas)
        }
    } else {
        logar(tentativas)
    }
}

function dadosCliente() {
    console.clear(0);

    const texto = `
░█▀▀█ ▒█▀▀▄ ▒█▀▄▀█ ▀█▀ ▒█▄░▒█ 　 ▒█▀▀█ ▒█▀▀█ ▀▄▒▄▀ 
▒█▄▄█ ▒█░▒█ ▒█▒█▒█ ▒█░ ▒█▒█▒█ 　 ▒█▀▀▄ ▒█▀▀▄ ░▒█░░ 
▒█░▒█ ▒█▄▄▀ ▒█░░▒█ ▄█▄ ▒█░░▀█ 　 ▒█▄▄█ ▒█▄▄█ ▄▀▒▀▄ 

    `;
    console.log(texto);
    
    const senhasPath = './senhas.txt';
    const userPath = './usuarios.txt';

    try {
        const senhas = fs.readFileSync(senhasPath, 'utf8');
        const user = fs.readFileSync(userPath, 'utf8');

        console.log(chalk.magentaBright("\n Segue abaixo os Clientes e suas senhas: \n"));
        console.log(`Clientes 👤: \n${user}\n`);
        console.log(`Senhas 🔑: \n${senhas}\n`);
    } catch (err) {
        console.error('\nErro ao ler os arquivos:', err);
    }

    let proximaAcao = prompt("\n Deseja voltar para o menu admin ou sair? (1: para menu admin / 2: para sair): ");
    proximaAcao = parseInt(proximaAcao);

    if (proximaAcao === 1) {
        menuadmin();
    } else if (proximaAcao === 2) {
        console.log(chalk.hex('#ffa500')("\n Obrigado por usar a aplicação! Até a próxima 👋 \n"));
        process.exit(0);
    } else {
        console.log(chalk.redBrigh("\n  ⌦ Opção inválida, retornando ao menu admin ⌦ \n"));
        menuadmin();
    }
}

function livrosAdm() {
    console.clear(0);

    const texto = `
░█▀▀█ ▒█▀▀▄ ▒█▀▄▀█ ▀█▀ ▒█▄░▒█ 　 ▒█▀▀█ ▒█▀▀█ ▀▄▒▄▀ 
▒█▄▄█ ▒█░▒█ ▒█▒█▒█ ▒█░ ▒█▒█▒█ 　 ▒█▀▀▄ ▒█▀▀▄ ░▒█░░ 
▒█░▒█ ▒█▄▄▀ ▒█░░▒█ ▄█▄ ▒█░░▀█ 　 ▒█▄▄█ ▒█▄▄█ ▄▀▒▀▄ 

    `;
    console.log(texto);

    const livrosPath = './livrosdisponiveis.txt';

    try {
        const livrosAdm = fs.readFileSync(livrosPath, 'utf8');
        
        console.log(chalk.magentaBright("\n Segue abaixo a lista de todos os livros: 📖 \n"));
        console.log(chalk.blueBright(`-->: \n${livrosAdm}\n`));
    } catch (err) {
        console.error('\nErro ao ler os arquivos:', err);
    }

    let proximaAcao = prompt("\nDeseja voltar para o menu admin ou sair? (1: para menu admin / 2: para sair): ");
    proximaAcao = parseInt(proximaAcao);

    if (proximaAcao === 1) {
        menuadmin();
    } else if (proximaAcao === 2) {
        console.log(chalk.hex('#ffa500')("\nObrigado por usar a aplicação! Até a próxima 👋 \n"));
        process.exit(0);
    } else {
        console.log(chalk.redBrigh("\n  ⌦ Opção inválida, retornando ao menu admin ⌦\n"));
        menuadmin();
    }
}

function verificarIdade(nomeUsuario){
    const nomes = fs.readFileSync("usuarios.txt", "utf-8").split("\n").filter(Boolean);
    const idades = fs.readFileSync("idades.txt", "utf-8").split("\n").filter(Boolean);               

    for (let i = 0; i < usuarios.length; i++){
        let user = nomes[i]
        if (user == nomeUsuario){
            const idade = idades[i]
            return idade
        }
    }
}

carregarUsuarios();
menuinicial();
