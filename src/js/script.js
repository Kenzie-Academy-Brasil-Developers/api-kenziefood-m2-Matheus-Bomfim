import { Api } from "./API.js";

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
