class API {

    static async publicRequest(){
        return fetch("https://api-kenzie-food.herokuapp.com/products")
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))
    }

}

let container = document.getElementById("container")


function render(obj){
        let item = document.createElement("li")
        item.innerText = obj.nome
        container.appendChild(item)
}

let array = await API.publicRequest()

array.forEach(element => {
    render(element)
});

let busca = document.getElementById("texto")
let btn = document.getElementById("btn")

busca.onkeyup = (event) => {
    console.log(event)
    let dado = busca.value
    container.innerHTML = ""
    array.forEach(element => {
        if(element.nome.toUpperCase().includes(dado.toUpperCase().trim()) == true){
            render(element)
        }
    });
}