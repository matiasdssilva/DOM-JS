document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formImc");
    formulario.addEventListener("submit", calcularImc);
    carregarUsuarios();
});

function calcularImc(event) {
    event.preventDefault();

    const dadosUsuario = pegarValores();

    const imcCalculado = calcular(
        dadosUsuario.altura,
        dadosUsuario.peso
    );

    const classificacao = classificarImc(imcCalculado);

    const usuarioFinal = organizarDados(
        dadosUsuario,
        imcCalculado,
        classificacao
    );

    cadastrarUsuario(usuarioFinal);
    carregarUsuarios();

    document.getElementById("formImc").reset();
}

function pegarValores() {
    const nome = document.getElementById("nome").value.trim();
    const altura = parseFloat(document.getElementById("altura").value);
    const peso = parseFloat(document.getElementById("peso").value);

    return {
        nome: nome,
        altura: altura,
        peso: peso
    };
}

function calcular(altura, peso) {
    return peso / (altura * altura);
}

function classificarImc(imc) {
    if (imc < 18.5) return "Abaixo do peso";
    if (imc < 25) return "Peso normal";
    if (imc < 30) return "Sobrepeso";

    return "Obesidade";
}

function organizarDados(dadosUsuario, imc, classificacao) {
    const dataAtual = new Date().toLocaleString("pt-BR");

    return {
        ...dadosUsuario,
        imc: imc.toFixed(2),
        classificacao: classificacao,
        dataCadastro: dataAtual
    };
}

function cadastrarUsuario(usuario) {
    let lista = [];
    const dadosSalvos = localStorage.getItem("usuariosCadastrados");

    if (dadosSalvos) {
        lista = JSON.parse(dadosSalvos);
    }

    lista.push(usuario);

    localStorage.setItem(
        "usuariosCadastrados",
        JSON.stringify(lista)
    );
}

function carregarUsuarios() {
    const tabela = document.getElementById("corpoTabela");
    const dadosSalvos = localStorage.getItem("usuariosCadastrados");

    let lista = dadosSalvos ? JSON.parse(dadosSalvos) : [];

    if (lista.length === 0) {
        tabela.innerHTML = `
            <tr class="linha-mensagem">
                <td colspan="6">Nenhum registro encontrado!</td>
            </tr>
        `;
        return;
    }

    montarTabela(lista);
}

function montarTabela(lista) {
    const tabela = document.getElementById("corpoTabela");
    let linhas = "";

    lista.forEach(function (pessoa) {
        linhas += `
        <tr>
            <td data-cell="Nome">${pessoa.nome}</td>
            <td data-cell="Altura">${pessoa.altura}m</td>
            <td data-cell="Peso">${pessoa.peso}kg</td>
            <td data-cell="IMC">${pessoa.imc}</td>
            <td data-cell="Classificação">${pessoa.classificacao}</td>
            <td data-cell="Data">${pessoa.dataCadastro}</td>
        </tr>
        `;
    });

    tabela.innerHTML = linhas;
}