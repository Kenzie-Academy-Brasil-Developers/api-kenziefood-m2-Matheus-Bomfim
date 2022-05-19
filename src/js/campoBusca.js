class API {

    static async publicRequest(){
        return fetch("https://api-kenzie-food.herokuapp.com/products")
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))
    }

}

const container = document.getElementById("container")


function render(obj){
        let item = document.createElement("li")
        item.innerText = obj.nome
        container.appendChild(item)
}

const array = await API.publicRequest()

array.forEach(element => {
    render(element)
});

const busca = document.getElementById("texto")
const btn = document.getElementById("btn")

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