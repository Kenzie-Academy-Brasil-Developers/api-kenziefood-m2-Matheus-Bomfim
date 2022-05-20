import { Api } from "./API.js";
import {UsuarioLogin,UsuarioCadastro} from "./Usuario.js"

function loginUsuario(){
    const buttonUser = document.querySelector(".user")
    const login = document.querySelector(".loginCadastro")
    
    buttonUser.addEventListener("click",(e)=>{
    e.preventDefault()
    login.style.display = "flex"    
  })
    
    document.addEventListener("click",async (e)=>{
        e.preventDefault()
        if (e.target.innerHTML == "Login"){
        const inputEmail = document.querySelector("#email").value
        const inputSenha = document.querySelector("#senha").value
        const UserLogin = new UsuarioLogin(inputEmail,inputSenha)
        const loginToken = await Api.loginUsuario(UserLogin)
        if(loginToken.length > 0 && typeof loginToken == "string"){
            localStorage.setItem("token",loginToken)
            Api.token = loginToken
            setTimeout(()=>{
                login.innerHTML = "<p>Login Efetuado com Sucesso</p>"
            },2000)
  
            setTimeout(()=>{
                login.innerHTML = `
                <button id="fecharmain">X</button>
                <button id="dashboard">Home</button>
                <button id="logout">Logout</button>
                `
                const fecharmain = document.querySelector("#fecharmain")
                
                fecharmain.addEventListener("click",()=>{
                    login.style.display = "none"
                })
                
                login.style.display = "none"
            },5000)
        }
        else{
            const p = document.getElementById("falho")
            p.innerText = "Email ou Senha Incorretos"
        }
    }
    })
  
    document.addEventListener("click",(e)=>{
        if(e.target.innerHTML == "Cadastre-se"){
            login.innerHTML = `
            <button id="fecharcadastro">X</button>
            <input type="text" id="name" placeholder="UserName">
            <input type="text" id="email"placeholder="E-mail">
            <input type="password" id="senha" placeholder="Senha">
            <button id="fazercadastro">Cadastre-Se</button>
            <p id="falho"></p>`
        }
    })
        
        document.addEventListener("click",(e)=>{
            e.preventDefault()
            if(e.target.id == "fecharlogincadastro" || e.target.id == "fecharcadastro" || e.target.id == "fecharmain"){
            login.innerHTML = `
            <button id="fecharlogincadastro">X</button>
            <input type="text" id="email"placeholder="E-mail">
            <input type="password" id="senha" placeholder="Senha">
            <button id="fazerlogin">Login</button>
            <p id="falho"></p>
            <a id="Cadastro">Cadastre-se</a>`
            
            login.style.display = "none"
        }
              if(localStorage.getItem("token") && e.target.id == "fecharmain"){
              login.innerHTML = `
              <button id="fecharmain">X</button>
              <button id="dashboard">Home</button>
              <button id="logout">Logout</button>
              `
              login.style.display = "none"
            }
        })
  
        document.addEventListener("click",async (e)=>{
            if (e.target.innerHTML == "Cadastre-Se"){
            const inputs = document.querySelectorAll("input")
            const userCadastro = new UsuarioCadastro(inputs[0].value,inputs[1].value,inputs[2].value)
            const CadastroId = await Api.cadastroUsuario(userCadastro)
            
            if(CadastroId.id){
                setTimeout(()=>{
                    login.innerHTML = "<p>Cadastro Efetuado com Sucesso</p>"
                },3000)
    
                setTimeout(()=>{
                    login.innerHTML = `
                    <button id="fecharlogincadastro">X</button>
                    <input type="text" id="email"placeholder="E-mail">
                    <input type="password" id="senha" placeholder="Senha">
                    <button id="fazerlogin">Login</button>
                    <p id="falho"></p>
                    <a id="Cadastro">Cadastre-se</a>
                    `
                    login.style.display = "none"
                },6000)
            }
            else{
                const p = document.getElementById("falho")
                p.innerText = "Algo Deu Errado"
            }
        }
        })
  
        document.addEventListener("click",(e)=>{
            e.preventDefault()
            if(e.target.id == "logout"){
                localStorage.removeItem("token")
                login.innerHTML = "<p>Logout Realizado Com Sucesso</p>"
                setTimeout(()=>{
                    window.location = "./../../index.html"
                },3000)
            }
        })
        if(localStorage.getItem("token")){
          login.innerHTML = `
          <button id="fecharmain">X</button>
          <button id="dashboard">Home</button>
          <button id="logout">Logout</button>
          `
          }
  
          document.addEventListener("click",(e)=>{
              if(e.target.id == "dashboard"){
                  window.location = "./../../index.html"
              }
          })
  }
  
  loginUsuario()


  async function templateDashboard(obj){

    const listarProdutosDashboard = document.querySelector('#listaDeProdutosDashboard');

    
        listarProdutosDashboard.innerHTML += `
        <li>
            <div id="identProdutos">
                <img src="${obj.imagem}">
                <h3>${obj.nome}</h3>
            </div>
        
            <div id="categoria">
                <p>${obj.categoria}</p>
            </div>
            <div id="descricaoDashboard">
            ${obj.descricao}
            </div>
        
            <div id="acoes">
                <img src="../img/EditarIcon.png" id="acoesEditar">
                <img src="../img/LixeiraIcon.png" id="acoesExcluir">
            </div>
      </li>`;
   
};
templateDashboard();


const addNovoProduto = document.querySelector('#addNovoProduto')
const cadastrarProdutos = document.querySelector('.cadastrarProdutoContainer')
addNovoProduto.addEventListener("click", function(){
    focus.style.display = 'flex'
    cadastrarProdutos.style.display = 'flex'
    const fecharCadastro = document.querySelector('#fecharCadastro')
})

fecharCadastro.addEventListener("click", function(){
    focus.style.display = 'none'
    cadastrarProdutos.style.display = 'none'

    
})
// const editarProduto = document.getElementById('acoesEditar')
const editarProdutoContainer = document.querySelector('.editarProdutoContainer')
const excluirProdutoContainer = document.querySelector('#confirmarExclusao')
const focus = document.querySelector('#focusBackground')

document.addEventListener("click",function(e){
    if(e.target.id == 'acoesEditar'){
        focus.style.display = 'flex'
        editarProdutoContainer.style.display = 'flex'
        const fecharEditar = document.querySelector('#fecharEditar')
    }
    if(e.target.id == 'acoesExcluir'){
        focus.style.display = 'flex'

        excluirProdutoContainer.style.display = 'flex'
        const fecharExclusao = document.querySelector("#fecharExclusao")
    }
})

fecharEditar.addEventListener('click', function(){
    focus.style.display = 'none'
    editarProdutoContainer.style.display = 'none'
})
fecharExclusao.addEventListener('click', function(){
    focus.style.display = 'none'
    excluirProdutoContainer.style.display = 'none'
})
function addProduto(){
    const objCadastrar = {}
    const inputNome = document.querySelector('.cadastroNome')
    const inputDescricao = document.querySelector('.cadastroDescricao')
    const inputValor = document.querySelector('.cadastroValor')
    const inputImg = document.querySelector('.cadastroImg')
    const botaoCadastrar = document.querySelector('#botaoCadastrar')

    const categoriaPani = document.querySelector('#cadastroCategoriaPani')
    const categoriaBebidas = document.querySelector('#cadastroCategoriaBebidas')
    const categoriaFrutas = document.querySelector('#cadastroCategoriaFrutas')
    categoriaPani.addEventListener('click', function(){
        objCadastrar.categoria = ''
        objCadastrar.categoria = 'Panificadora'
        categoriaPani.classList.remove('categoriaLi')
        categoriaPani.classList.add('categoriaAtivado')
        categoriaBebidas.classList.remove('categoriaAtivado')
        categoriaFrutas.classList.remove('categoriaAtivado')
    })
    categoriaBebidas.addEventListener('click', function(){
        objCadastrar.categoria = ''
        objCadastrar.categoria = 'Bebidas'
        categoriaBebidas.classList.remove('categoriaLi')
        categoriaBebidas.classList.add('categoriaAtivado')
        categoriaPani.classList.remove('categoriaAtivado')
        categoriaFrutas.classList.remove('categoriaAtivado')
    })
    categoriaFrutas.addEventListener('click', function(){
        objCadastrar.categoria = ''
        objCadastrar.categoria = 'Frutas'
        categoriaFrutas.classList.remove('categoriaLi')
        categoriaFrutas.classList.add('categoriaAtivado')
        categoriaBebidas.classList.remove('categoriaAtivado')
        categoriaPani.classList.remove('categoriaAtivado')
    })

    
    

    botaoCadastrar.addEventListener('click', function(){
        objCadastrar.nome = inputNome.value
        objCadastrar.descricao = inputDescricao.value
        objCadastrar.preco = inputValor.value
        objCadastrar.imagem = inputImg.value
        console.log(objCadastrar)
        focus.style.display = 'none'
        cadastrarProdutos.style.display = 'none'
    })
}
addProduto()

function editarProduto(){
    const objEditar = {}
    const inputNome = document.querySelector('.editarNome')
    const inputDescricao = document.querySelector('.editarDescricao')
    const inputValor = document.querySelector('.editarValor')
    const inputImg = document.querySelector('.editarImg')
    const salvarAlteracoes = document.querySelector('#botaoEditarSalvar')

    const categoriaPani = document.querySelector('#editarCategoriaPani')
    const categoriaBebidas = document.querySelector('#editarCategoriaBebidas')
    const categoriaFrutas = document.querySelector('#editarCategoriaFrutas')
    categoriaPani.addEventListener('click', function(){
        objEditar.categoria = ''
        objEditar.categoria = 'Panificadora'
        categoriaPani.classList.remove('categoriaLi')
        categoriaPani.classList.add('categoriaAtivado')
        categoriaBebidas.classList.remove('categoriaAtivado')
        categoriaFrutas.classList.remove('categoriaAtivado')
    })
    categoriaBebidas.addEventListener('click', function(){
        objEditar.categoria = ''
        objEditar.categoria = 'Bebidas'
        categoriaBebidas.classList.remove('categoriaLi')
        categoriaBebidas.classList.add('categoriaAtivado')
        categoriaPani.classList.remove('categoriaAtivado')
        categoriaFrutas.classList.remove('categoriaAtivado')
    })
    categoriaFrutas.addEventListener('click', function(){
        objEditar.categoria = ''
        objEditar.categoria = 'Frutas'
        categoriaFrutas.classList.remove('categoriaLi')
        categoriaFrutas.classList.add('categoriaAtivado')
        categoriaBebidas.classList.remove('categoriaAtivado')
        categoriaPani.classList.remove('categoriaAtivado')
    })


    salvarAlteracoes.addEventListener('click', function(){
        console.log('oi')
        objEditar.nome = inputNome.value
        objEditar.descricao = inputDescricao.value
        objEditar.preco = inputValor.value
        objEditar.imagem = inputImg.value
        console.log(objEditar)
        focus.style.display = 'none'
        editarProdutoContainer.style.display = 'none'
    })
}
editarProduto()

const listarProdutosDashboard = document.querySelector('#listaDeProdutosDashboard');

const produtos = await Api.produtosPublicos();

produtos.forEach(element => {
    templateDashboard(element)
});

let btnTodos = document.getElementById("botaoTodos")
let btnPanificadora = document.getElementById("botaoPani")
let btnFrutas = document.getElementById("botaoFrutas")
let btnBebidas = document.getElementById("botaoBebidas")

btnTodos.addEventListener("click", () => {
    listarProdutosDashboard.innerHTML = ""
    produtos.forEach(element => {
        templateDashboard(element)
    });
})

btnPanificadora.addEventListener("click", () => {
    listarProdutosDashboard.innerHTML = ""
    produtos.forEach(element => {
        if(element.categoria.toUpperCase() == "PANIFICADORA"){
            templateDashboard(element)
        }
    });
})

btnFrutas.addEventListener("click", () => {
    listarProdutosDashboard.innerHTML = ""
    produtos.forEach(element => {
        if(element.categoria.toUpperCase() == "FRUTAS"){
            templateDashboard(element)
        }
    });
})

btnBebidas.addEventListener("click", () => {
    listarProdutosDashboard.innerHTML = ""
    produtos.forEach(element => {
        if(element.categoria.toUpperCase() == "BEBIDAS"){
            templateDashboard(element)
        }
    });
})

let busca = document.getElementById("pesquisarProduto")
let container = document.getElementById("listaDeProdutosDashboard")
let array = await Api.produtosPrivados(localStorage.getItem("token"))
console.log(localStorage.getItem("token"))
console.log(array)
busca.onkeyup = (event) => {
    let dado = busca.value
    container.innerHTML = ""
    array.forEach(element => {
        if(element.nome.toUpperCase().includes(dado.toUpperCase().trim()) == true){
            templateProdutos(element)
        }
    });
    adicionaListeners()
}
