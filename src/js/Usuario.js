class UsuarioLogin{
constructor(email,senha){
    this.email = email
    this.password = senha
}
}
class UsuarioCadastro{
    constructor(nome,email,senha){
        this.name = nome
        this.email = email
        this.password = senha
    }
}
export{UsuarioLogin,UsuarioCadastro}