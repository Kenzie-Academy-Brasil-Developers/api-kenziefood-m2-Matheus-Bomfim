// class API {

//     static async publicRequest(){
//         return fetch("https://api-kenzie-food.herokuapp.com/products")
//         .then(res => res.json())
//         .then(res => res)
//         .catch(err => console.log(err))
//     }

// }

import { Api } from "./API.js";

// const container = document.getElementById("container")


// function render(obj){
//         let item = document.createElement("li")
//         item.innerText = obj.nome
//         container.appendChild(item)
// }

// const array = await Api.produtosPublicos()

// array.forEach(element => {
//     render(element)
// });

// const busca = document.getElementById("pesquisarProduto")
// let container = document.getElementById("cardProdutos")
// const produtos = await Api.produtosPublicos();

// busca.onkeyup = (event) => {
//     let dado = busca.value
//     container.innerHTML = ""
//     produtos.forEach(element => {
//         if(element.nome.toUpperCase().includes(dado.toUpperCase().trim()) == true){
//             templateProdutos(element)
//         }
//     });
// }