class Api{
    static token = ""

    static async cadastroUsuario(user){
        const response = await fetch("https://api-kenzie-food.herokuapp.com/auth/register",{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }).then(response => response.json()).then(response => response).catch(err => console.error(err))

        return response
    }

    static async loginUsuario(user){
        const response = await fetch("https://api-kenzie-food.herokuapp.com/auth/login",{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }).then(response => response.json()).then(response => response).catch(err => console.error(err))

        return response
    }

    static async produtosPublicos(){
        const response = await fetch("https://api-kenzie-food.herokuapp.com/products",{
            method:"GET"
        }).then(response => response.json()).then(response => response).catch(err => console.error(err))

        return response
    }

    static async produtosPrivados(){
        const response = await fetch("https://api-kenzie-food.herokuapp.com/my/products",{
            method:"GET",
            headers: {"Authorization": `Bearer ${Api.token}`}
        }).then(response => response.json()).then(response => response).catch(err => console.error(err))

        return response
    }

    static async cadastrarProdutos(product){
        const response = await fetch("https://api-kenzie-food.herokuapp.com/my/products",{
            method:"POST",
            headers: {"Content-Type": "application/json","Authorization": `Bearer ${Api.token}`},
            body: JSON.stringify(product)
        }).then(response => response.json()).then(response => response).catch(err => console.error(err))

        return response
    }

    static async editarProduto(id,product){
        const response = await fetch(`https://api-kenzie-food.herokuapp.com/my/products/${id}`,{
            method:"PATCH",
            headers: {"Content-Type": "application/json","Authorization": `Bearer ${Api.token}`},
            body: JSON.stringify(product)
        }).then(response => response.json()).then(response => response).catch(err => console.error(err))

        return response
    }

    static async deletarProduto(id){
        const response = await fetch(`https://api-kenzie-food.herokuapp.com/my/products/${id}`,{
            method:"DELETE"
        }).then(response => response.json()).then(response => response).catch(err => console.error(err))

        return response
    }
    
    static async produtosCarrinho(){
        const response = await fetch("https://api-kenzie-food.herokuapp.com/cart",{
            method:"GET",
            headers: {"Authorization": `Bearer ${Api.token}`}
        }).then(response => response.json()).then(response => response).catch(err => console.error(err))

        return response
    }

    static async adicionarCarrinho(product){
        const response = await fetch(`https://api-kenzie-food.herokuapp.com/cart/add`,{
            method:"POST",
            headers: {"Content-Type": "application/json","Authorization": `Bearer ${Api.token}`},
            body: JSON.stringify(product)
        }).then(response => response.json()).then(response => response).catch(err => console.error(err))

        return response
    }

    static async deletarCarrinho(id){
        const response = await fetch(`https://api-kenzie-food.herokuapp.com/cart/remove/${id}`,{
            method:"DELETE"
        }).then(response => response.json()).then(response => response).catch(err => console.error(err))

        return response
    }
}

export {Api}
