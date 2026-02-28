const STORAGE_KEY = "usuarioIdade"

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formImc");
    formulario.addEventListener("submit", handleSubmit);


    carregarUsuarios()
});

function handleSubmit(event) {
    event.preventDefault()
    // console.log ("Formulário enviado!!")

    const dados = obterDadosFormulario()
    const idade = calcularIdade(dados.anoNascimento);

    const usuarioFinal = montarUsuarioFinal(dados, idade)
    salvarUsuario(usuarioFinal)
    adicionarUsuarioNaTabela(usuarioFinal)

    event.target.reset()
}
function obterDadosFormulario() {
    const nome = document.getElementById("nome").value.trim();
    const anoNascimento = parseInt(document.getElementById("Ano").value);
    return {
        nome: nome,
        anoNascimento: anoNascimento
    }
}
function calcularIdade(anoNascimento) {
    const anoAtual = new Date().getFullYear();
    return anoAtual - anoNascimento;
}

function montarUsuarioFinal(dados, idade) {
    return {
        nome: dados.nome,
        anoNascimento: dados.anoNascimento,
        idade: idade,
        dataCadastro: new Date().toLocaleDateString("pt-BR")
    }
}

function adicionarUsuarioNaTabela(usuario) {
    const tabela = document.getElementById("corpoTabela")

    const linha = document.createElement("tr");

    linha.innerHTML = `
    <td>${usuario.nome}</td>
    <td>${usuario.anoNascimento}</td>
    <td>${usuario.idade}</td>
    <td>${usuario.dataCadastro}</td>
      
    `
    tabela.appendChild(linha);
}

function obterUsuarios() {
    const dados = localStorage.getItem(STORAGE_KEY)
    return dados ? JSON.parse(dados) : [];
}

function salvarUsuario(usuario) {
    const lista = obterUsuarios();

    lista.push(usuario);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}
function carregarUsuarios (){
const usuarios = obterUsuarios()
usuarios.forEach(usuarios => {  
    adicionarUsuarioNaTabela (usuarios)
    
});

}