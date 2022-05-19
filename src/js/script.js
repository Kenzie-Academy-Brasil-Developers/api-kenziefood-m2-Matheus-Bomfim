import { Api } from "./API.js";
import {UsuarioLogin,UsuarioCadastro} from "./Usuario.js"
async function templateProdutos() {
  const produtos = await Api.produtosPublicos();

  const listarProdutos = document.querySelector("ul");

  produtos.forEach((produto) => {
    console.log(produto);
    listarProdutos.innerHTML += `
      <li class="box">
            <img class="imagemProduto" src="${produto.imagem}" alt="panqueca">
            <h2 class="tituloProduto">${produto.nome}</h2 class="tituloProduto">
              <p class="textoProduto">${produto.descricao}</p>
          
                <p class="categoria">${produto.categoria}</p>          
             
              <div class="finaliza">
                <p class="preco">${produto.preco.toLocaleString("pt-BR", {
                  minimunFractionDigits: 2,
                  style: "currency",
                  currency: "BRL",
                })}</p>
                <button id=${produto.id} class="adicionarParaCarrinho">
                <img src="./src/img/Text.svg" alt="carrinho de compras">
              </button>
              </div>
            </li>`;
  });
}

templateProdutos();

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
              <a>DashBoard</a>
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
          if(e.target.id == "fecharlogincadastro" || e.target.id == "fecharcadastro"){
          login.innerHTML = `
          <button id="fecharlogincadastro">X</button>
          <input type="text" id="email"placeholder="E-mail">
          <input type="password" id="senha" placeholder="Senha">
          <button id="fazerlogin">Login</button>
          <p id="falho"></p>
          <a id="Cadastro">Cadastre-se</a>`
          
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

}

loginUsuario()