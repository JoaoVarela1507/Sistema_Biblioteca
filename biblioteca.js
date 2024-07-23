const fs = require('fs');
const prompt = require("prompt-sync")();

let usuarios = [];

function carregarUsuarios() {
    if (fs.existsSync("usuarios.txt") && fs.existsSync("senhas.txt")) {
        const nomes = fs.readFileSync("usuarios.txt", "utf-8").split("\n").filter(Boolean);
        const senhas = fs.readFileSync("senhas.txt", "utf-8").split("\n").filter(Boolean);

        for (let i = 0; i < nomes.length; i++) {
            usuarios.push({ nomeUsuario: nomes[i], senha: senhas[i] });
        }
    }
}

function salvarUsuario(nomeUsuario, senha) {
    fs.appendFileSync("usuarios.txt", nomeUsuario + "\n");
    fs.appendFileSync("senhas.txt", senha + "\n");
}

function registrar() {
    console.log("-REGISTER-");
    let nomeUsuario = prompt("Digite um nome de usuário (até 8 caracteres): ");
    let senha = prompt("Digite uma senha (4 números): ");
    
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
        usuarios.push({ nomeUsuario, senha });
        console.log("Registro bem-sucedido!");
        salvarUsuario(nomeUsuario, senha);
        logar(0);
    }
}


function logar(tentativas) {
    texto =`\n    ▒█▀▀█ ▀█▀ ▒█▀▀█ ▒█░░░ ▀█▀ ▒█▀▀▀█ ▀▀█▀▀ ▒█▀▀▀ ▀▄▒▄▀ 
    ▒█▀▀▄ ▒█░ ▒█▀▀▄ ▒█░░░ ▒█░ ▒█░░▒█ ░▒█░░ ▒█▀▀▀ ░▒█░░ 
    ▒█▄▄█ ▄█▄ ▒█▄▄█ ▒█▄▄█ ▄█▄ ▒█▄▄▄█ ░▒█░░ ▒█▄▄▄ ▄▀▒▀▄ 
    \n
    `         
    console.log(texto);
    console.log("-LOGIN-");
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
        console.log("Nome de usuário ou senha inválidos. Por favor, tente novamente.");
        verificarEscolha(tentativas);
    }
}

function menuinicial() {
    texto =`\n    ▒█▀▀█ ▀█▀ ▒█▀▀█ ▒█░░░ ▀█▀ ▒█▀▀▀█ ▀▀█▀▀ ▒█▀▀▀ ▀▄▒▄▀ 
    ▒█▀▀▄ ▒█░ ▒█▀▀▄ ▒█░░░ ▒█░ ▒█░░▒█ ░▒█░░ ▒█▀▀▀ ░▒█░░ 
    ▒█▄▄█ ▄█▄ ▒█▄▄█ ▒█▄▄█ ▄█▄ ▒█▄▄▄█ ░▒█░░ ▒█▄▄▄ ▄▀▒▀▄ 
    \n
    `         
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
            console.log("Até logo!");
            process.exit(0);
        default:
            console.log("Opção inválida. Por favor, escolha 1, 2 ou 3.");
    }

    menuinicial();
}

function menuadmin() {
    texto =`\n    ▒█▀▀█ ▀█▀ ▒█▀▀█ ▒█░░░ ▀█▀ ▒█▀▀▀█ ▀▀█▀▀ ▒█▀▀▀ ▀▄▒▄▀ 
    ▒█▀▀▄ ▒█░ ▒█▀▀▄ ▒█░░░ ▒█░ ▒█░░▒█ ░▒█░░ ▒█▀▀▀ ░▒█░░ 
    ▒█▄▄█ ▄█▄ ▒█▄▄█ ▒█▄▄█ ▄█▄ ▒█▄▄▄█ ░▒█░░ ▒█▄▄▄ ▄▀▒▀▄ 
    \n
    `         
    console.log(texto);
    console.log("1. Adicionar Livros");
    console.log("2. Retirar Livros");
    console.log("3. Sair");

    let escolha = prompt("Escolha uma opção: ");

    switch (escolha) {
        case "1":
            addLivrosAdm();
            break;
        case "2":
            removerLivros();
            break;
        case "3":
            console.log("Até logo!");
            process.exit(0);
        default:
            console.log("Opção inválida. Por favor, escolha 1, 2 ou 3.");
            menuadmin();
    }
}

function menuprincipal(nomeUsuario) {
    texto =`\n    ▒█▀▀█ ▀█▀ ▒█▀▀█ ▒█░░░ ▀█▀ ▒█▀▀▀█ ▀▀█▀▀ ▒█▀▀▀ ▀▄▒▄▀ 
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

    let escolha = prompt("Escolha uma opção: ");

    switch (escolha) {
        case "1":
            mostrarMeusLivros(nomeUsuario);
            menuprincipal(nomeUsuario);
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
            process.exit(0);;
        default:
            console.log("Opção inválida. Por favor, escolha 1, 2, 3, 4 ou 5.");
            menuprincipal(nomeUsuario);
    }
}

function mostrarLivrosDisponiveis(nomeUsuario) {
    texto =`\n    ▒█▀▀█ ▀█▀ ▒█▀▀█ ▒█░░░ ▀█▀ ▒█▀▀▀█ ▀▀█▀▀ ▒█▀▀▀ ▀▄▒▄▀ 
    ▒█▀▀▄ ▒█░ ▒█▀▀▄ ▒█░░░ ▒█░ ▒█░░▒█ ░▒█░░ ▒█▀▀▀ ░▒█░░ 
    ▒█▄▄█ ▄█▄ ▒█▄▄█ ▒█▄▄█ ▄█▄ ▒█▄▄▄█ ░▒█░░ ▒█▄▄▄ ▄▀▒▀▄ 
    \n
    `         
    console.log(texto);
    const nomeArquivo = './livrosdisponiveis.txt';

    try {
        const data = fs.readFileSync(nomeArquivo, 'utf8');

        const linhas = data.split('\n');

        if (linhas.length > 0) {
            console.log("Livros disponíveis:");
            linhas.forEach((linha, index) => {
                const partes = linha.split(',');
                if (partes.length === 3) {
                    const titulo = partes[0].trim();
                    const autor = partes[1].trim();
                    const classificacao = partes[2].trim();
                    console.log(`${index + 1}. Título: ${titulo}, Autor: ${autor}, Classificação: ${classificacao}`);
                }
            });

            let escolha = prompt("Escolha um número para adicionar à sua lista (ou '0' para voltar): ");
            escolha = parseInt(escolha);

            if (escolha > 0 && escolha <= linhas.length) {
                adicionarLivroUsuario(nomeUsuario, linhas[escolha - 1]);
                removerLivroDisponivel(linhas[escolha - 1], nomeArquivo);
                console.log("\nParabéns, ótima escolha, livro adicionado à sua lista pessoal com sucesso!!\n");

            } else if (escolha !== 0) {
                console.log("Opção inválida.");
            }
        } else {
            console.log("Nenhum livro disponível no momento.");
        }
    } catch (err) {
        console.error('Erro ao ler o arquivo:', err);
    }

    menuprincipal(nomeUsuario);
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
        console.error('Erro ao remover o livro da lista de disponíveis:', err);
    }
}

function mostrarMeusLivros(nomeUsuario) {
    texto =`\n    ▒█▀▀█ ▀█▀ ▒█▀▀█ ▒█░░░ ▀█▀ ▒█▀▀▀█ ▀▀█▀▀ ▒█▀▀▀ ▀▄▒▄▀ 
    ▒█▀▀▄ ▒█░ ▒█▀▀▄ ▒█░░░ ▒█░ ▒█░░▒█ ░▒█░░ ▒█▀▀▀ ░▒█░░ 
    ▒█▄▄█ ▄█▄ ▒█▄▄█ ▒█▄▄█ ▄█▄ ▒█▄▄▄█ ░▒█░░ ▒█▄▄▄ ▄▀▒▀▄ 
    \n
    `         
    console.log(texto);
    const nomeArquivo = `meuslivros_${nomeUsuario}.txt`;

    if (fs.existsSync(nomeArquivo)) {
        try {
            const data = fs.readFileSync(nomeArquivo, 'utf8');

            const linhas = data.split('\n');

            if (linhas.length > 0) {
                console.log(`Livros de ${nomeUsuario}:`);
                linhas.forEach((linha, index) => {
                    console.log(`${index + 1}. ${linha}`);
                });
            } else {
                console.log(`Nenhum livro encontrado para ${nomeUsuario}.`);
            }
        } catch (err) {
            console.error(`Erro ao ler os livros de ${nomeUsuario}:`, err);
        }
    } else {
        console.log("Esse usuário não tem uma lista de livros.");
    }
    menuprincipal(nomeUsuario);
}

function removerLivros() {
    texto =`\n    ▒█▀▀█ ▀█▀ ▒█▀▀█ ▒█░░░ ▀█▀ ▒█▀▀▀█ ▀▀█▀▀ ▒█▀▀▀ ▀▄▒▄▀ 
    ▒█▀▀▄ ▒█░ ▒█▀▀▄ ▒█░░░ ▒█░ ▒█░░▒█ ░▒█░░ ▒█▀▀▀ ░▒█░░ 
    ▒█▄▄█ ▄█▄ ▒█▄▄█ ▒█▄▄█ ▄█▄ ▒█▄▄▄█ ░▒█░░ ▒█▄▄▄ ▄▀▒▀▄ 
    \n
    `         
    console.log(texto);
    const arquivoTxt = './livrosdisponiveis.txt';

    try {
        const data = fs.readFileSync(arquivoTxt, 'utf8');
        const linhas = data.split('\n').filter(Boolean);

        if (linhas.length > 0) {
            console.log("Livros disponíveis para remoção:");
            linhas.forEach((linha, index) => {
                const partes = linha.split(',');
                if (partes.length === 3) {
                    const titulo = partes[0].trim();
                    const autor = partes[1].trim();
                    const classificacao = partes[2].trim();
                    console.log(`${index + 1}. Título: ${titulo}, Autor: ${autor}, Classificação: ${classificacao}`);
                }
            });

            let escolha = prompt("Escolha um número para remover (ou '0' para voltar): ");
            escolha = parseInt(escolha);

            if (escolha > 0 && escolha <= linhas.length) {
                const livroRemover = linhas[escolha - 1];
                linhas.splice(livroRemover, 1);
                fs.writeFileSync(arquivoTxt, linhas.join('\n'), 'utf8');
                console.log("Livro removido com sucesso!");
            } else if (escolha !== 0) {
                console.log("Opção inválida.");
            }
        } else {
            console.log("Nenhum livro disponível para remoção.");
        }
    } catch (err) {
        console.error('Erro ao ler o arquivo:', err);
    }

    menuadmin();
}

function addLivrosAdm() {
    texto =`\n    ▒█▀▀█ ▀█▀ ▒█▀▀█ ▒█░░░ ▀█▀ ▒█▀▀▀█ ▀▀█▀▀ ▒█▀▀▀ ▀▄▒▄▀ 
    ▒█▀▀▄ ▒█░ ▒█▀▀▄ ▒█░░░ ▒█░ ▒█░░▒█ ░▒█░░ ▒█▀▀▀ ░▒█░░ 
    ▒█▄▄█ ▄█▄ ▒█▄▄█ ▒█▄▄█ ▄█▄ ▒█▄▄▄█ ░▒█░░ ▒█▄▄▄ ▄▀▒▀▄ 
    \n
    `         
    console.log(texto);
    const nomeArquivo = './livrosdisponiveis.txt';
    const nomeLivro = prompt('Digite o nome do livro que deseja adicionar: ');
    const autorLivro = prompt('Digite o autor do livro: ');
    const faixaEtaria = prompt('Digite a faixa etária recomendada (em anos): ');

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
        console.log(`O livro "${nomeLivro}" do autor "${autorLivro}" foi adicionado com sucesso.`);
    }

    menuadmin();
}

function mostrarLivrosAlugados(nomeUsuario){
    texto =`\n    ▒█▀▀█ ▀█▀ ▒█▀▀█ ▒█░░░ ▀█▀ ▒█▀▀▀█ ▀▀█▀▀ ▒█▀▀▀ ▀▄▒▄▀ 
    ▒█▀▀▄ ▒█░ ▒█▀▀▄ ▒█░░░ ▒█░ ▒█░░▒█ ░▒█░░ ▒█▀▀▀ ░▒█░░ 
    ▒█▄▄█ ▄█▄ ▒█▄▄█ ▒█▄▄█ ▄█▄ ▒█▄▄▄█ ░▒█░░ ▒█▄▄▄ ▄▀▒▀▄ 
    \n
    `         
    console.log(texto);
    let contador = 0;
    console.log(`Os livros que já estão alugados são:\n`);
    const nomes = fs.readFileSync("usuarios.txt", "utf-8").split("\n").filter(Boolean);

    for (let i = 0; i < usuarios.length; i++) {
        try {    
            let user = nomes[i];
            let nomeArquivo = `meuslivros_${user}.txt`;
            if (fs.existsSync(nomeArquivo)){
                if (fs.readFileSync(`meuslivros_${user}.txt`, "utf-8").split("\n").filter(Boolean) != ""){
                    contador += 1;
                    const dataUsuarios = fs.readFileSync(nomeArquivo, 'utf8');
                    console.log(`- ${user} -\n `+ dataUsuarios +`------`);
                }
            }
        } catch (err) {
            console.error(`Erro ao ler os livros alugados de ${user}:`, err);
        }
    }
    if (contador === 0){
        console.log("Não existem livros alugados no momento.\n");
    }

    menuprincipal(nomeUsuario);
}

function devolverLivros(nomeUsuario) {
    texto =`\n    ▒█▀▀█ ▀█▀ ▒█▀▀█ ▒█░░░ ▀█▀ ▒█▀▀▀█ ▀▀█▀▀ ▒█▀▀▀ ▀▄▒▄▀ 
    ▒█▀▀▄ ▒█░ ▒█▀▀▄ ▒█░░░ ▒█░ ▒█░░▒█ ░▒█░░ ▒█▀▀▀ ░▒█░░ 
    ▒█▄▄█ ▄█▄ ▒█▄▄█ ▒█▄▄█ ▄█▄ ▒█▄▄▄█ ░▒█░░ ▒█▄▄▄ ▄▀▒▀▄ 
    \n
    `         
    console.log(texto);
    console.log(`Bem-vindo ${nomeUsuario}!`);
    const nomeArquivo = `meuslivros_${nomeUsuario}.txt`;
    try {
        const data = fs.readFileSync(nomeArquivo, 'utf8');
        const linhas = data.split('\n');
        
        if (linhas.length > 0) {
            console.log(`Livros de ${nomeUsuario}:`);
            linhas.forEach((linha, index) => {
                console.log(`${index + 1}. ${linha}`);
            });
            
            let escolha = prompt("Escolha um número para devolver à biblioteca (ou '0' para voltar): ");
            escolha = parseInt(escolha);
            
            if (escolha > 0 && escolha <= linhas.length) {
                adicionarLivroDisponivel(linhas[escolha - 1]);
                console.log("\nLivro devolvido com sucesso!!\n\n");
                removerLivroUsuario(nomeArquivo, escolha - 1);
            } else if (escolha !== 0) {
                console.log("Opção inválida.");
            }
        } else {
            console.log(`Nenhum livro encontrado para ${nomeUsuario}.`);
        }
    } catch (err) {
        console.error(`Erro ao ler os livros de ${nomeUsuario}:`, err);
    }
    menuprincipal(nomeUsuario);
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
        let voltar = prompt("Deseja voltar para o menu inicial?(S/N) ")
        if (voltar === 's'){
            menuinicial()
        } else if (voltar === 'n') {
            logar(tentativas)
        } else {
            console.log("Escolha uma opção válida")
            verificarEscolha(tentativas)
        }
    } else {
        logar(tentativas)
    }
}

carregarUsuarios();
menuinicial();
