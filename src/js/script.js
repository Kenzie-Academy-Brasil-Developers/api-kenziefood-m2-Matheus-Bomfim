import { Api } from "./API.js";
import {UsuarioLogin,UsuarioCadastro} from "./Usuario.js"

async function templateProdutos(obj) {

  const listarProdutos = document.querySelector(".cardProdutos");

    listarProdutos.innerHTML += `
      <li class="box">
            <img class="imagemProduto" src="${obj.imagem}" alt="panqueca">
            <h2 class="tituloProduto">${obj.nome}</h2 class="tituloProduto">
              <p class="textoProduto">${obj.descricao}</p>
          
                <p class="categoria">${obj.categoria}</p>          
             
              <div class="finaliza">
                <p class="preco">${obj.preco.toLocaleString("pt-BR", {
                  minimunFractionDigits: 2,
                  style: "currency",
                  currency: "BRL",
                })}</p>
                <button id=${obj.id} class="adicionarParaCarrinho">
                <img src="./src/img/Text.svg" alt="carrinho de compras">
              </button>
              </div>
            </li>`;
}

const produtos = await Api.produtosPublicos();

produtos.forEach(element => {
    console.log(element)
    templateProdutos(element)
});


const busca = document.getElementById("pesquisarProduto")
let container = document.getElementById("cardProdutos")

busca.onkeyup = (event) => {
    let dado = busca.value
    container.innerHTML = ""
    produtos.forEach(element => {
        if(element.nome.toUpperCase().includes(dado.toUpperCase().trim()) == true){
            templateProdutos(element)
        }
    });
}

let btnTodos = document.getElementById("btnTodos")
let btnPanificadora = document.getElementById("btnPanificadora")
let btnFrutas = document.getElementById("btnFrutas")
let btnBebidas = document.getElementById("btnBebidas")

btnTodos.addEventListener("click", () => {
    container.innerHTML = ""
    produtos.forEach(element => {
        templateProdutos(element)
    });
})

btnPanificadora.addEventListener("click", () => {
    container.innerHTML = ""
    produtos.forEach(element => {
        if(element.categoria.toUpperCase() == "PANIFICADORA"){
            templateProdutos(element)
        }
    });
})

btnFrutas.addEventListener("click", () => {
    container.innerHTML = ""
    produtos.forEach(element => {
        if(element.categoria.toUpperCase() == "FRUTAS"){
            templateProdutos(element)
        }
    });
})

btnBebidas.addEventListener("click", () => {
    container.innerHTML = ""
    produtos.forEach(element => {
        if(element.categoria.toUpperCase() == "BEBIDAS"){
            templateProdutos(element)
        }
    });
})


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
            },3000)
  
            setTimeout(()=>{
                login.innerHTML = `
                <button id="fecharmain">X</button>
                <button id="dashboard">DashBoard</button>
                <button id="logout">Logout</button>
                `
                const fecharmain = document.querySelector("#fecharmain")
                
                fecharmain.addEventListener("click",()=>{
                    login.style.display = "none"
                })
                
                login.style.display = "none"
            },6000)
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
              <button id="dashboard">DashBoard</button>
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
                    window.location.reload()
                },3000)
            }
        })
        if(localStorage.getItem("token")){
          login.innerHTML = `
          <button id="fecharmain">X</button>
          <button id="dashboard">DashBoard</button>
          <button id="logout">Logout</button>
          `
          }
  
          document.addEventListener("click",(e)=>{
              if(e.target.id == "dashboard"){
                  window.location = "./src/pages/indexDashboard.html"
              }
          })
  
  }
  
  loginUsuario()
