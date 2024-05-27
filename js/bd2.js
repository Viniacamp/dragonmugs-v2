// carregar banco de dados do sistema (cadastro/login)
 function loadBanco(){
    let banco = JSON.parse(localStorage.getItem("banco"))
    if (banco === null){
        let banco = [ { "id":1,"nome":"admin","email": "admin@teste.com", "senha":123 }

        ]
        let b = JSON.stringify(banco);
        localStorage.setItem("banco", b)
        return banco;
    }
    return banco 
 }   
    
function adicionar() {
    var ListaClientes = JSON.parse(localStorage.getItem("banco"))
    let nome = document.querySelector("#nome").value
    let email = document.querySelector("#email").value
    let senha = document.querySelector("#senha").value
    let endereco = document.querySelector("#endereco").value
    let user = { id: Date.now(), nome: nome, email: email, senha: senha, endereco: endereco }
    ListaClientes.push(user)
    localStorage.setItem("banco", JSON.stringify(ListaClientes))
alert("Cadastro criado.")
let url = "login.html"
window.open(url)
}

function tabela(){
    var dados = JSON.parse(localStorage.getItem("banco"))
    for (let i = 0; dados.length > i; i++) {
        document.querySelector("#cod").innerHTML = dados[i].id
        document.querySelector("#nome").innerHTML = dados[i].nome
        document.querySelector("#mail").innerHTML = dados[i].email
        document.querySelector("#pass").innerHTML = dados[i].senha 
        document.querySelector("#end").innerHTML = dados[i].endereco 
    } 
}

function login(){
    const dados = JSON.parse(localStorage.getItem("banco"))
    let login = document.querySelector("#email").value
    let senha = document.querySelector("#senha").value

    for (let i = 0; dados.length > i; i++) {
        if (login == dados[i].email && senha == dados[i].senha) {
            console.log("conectado")
            let n = JSON.stringify(dados[i]);
            sessionStorage.setItem("user", n)
            let url = "index.html"
            window.open(url)
            break
        } 
    }
}

function logout(){
    sessionStorage.removeItem("user")
    let url = "login.html"
    window.open(url)
    window.close()    
}

function apagarItemVetor() {
    let email = document.querySelector("#email").value
    let senha = document.querySelector("#senha").value
    var dados = JSON.parse(localStorage.getItem("banco"))
    localStorage.removeItem("banco")
    
   for (let i = 0; dados.length > i; i++) {
      if (dados[i] == null) {
         alert("Verificando")       
      } else { 
        if (email == dados[i].email && senha == dados[i].nome) {
        delete dados[i]
        document.getElementById("#email").value = "";
        document.getElementById("#senha").value = "";
        break;
      } 
     }
    }   
    localStorage.setItem("banco", JSON.stringify(dados))
}


// adicionar produtos da pagina inicial ao carrinho
document.addEventListener('DOMContentLoaded', () => {
    // Recupera o carrinho do localStorage e atualiza a contagem no ícone do carrinho
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cartItems.length;
});

function adicionarAoCarrinho(sku, name, price) {
    const item = { sku, name, price };

    // Recupera os itens existentes no carrinho do localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Adiciona o novo item ao carrinho
    cartItems.push(item);

    // Atualiza o carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Atualiza a contagem no ícone do carrinho
    document.getElementById('cart-count').textContent = cartItems.length;
    console.log(`Produto adicionado ao carrinho: ${name} - ${price}`);
    renderCartItems();
}


// Função para renderizar os itens do carrinho na página
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    cartItemsContainer.innerHTML = '';

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('card', 'p-3', 'product-card');
        itemElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="mb-0">${item.name}</h5>
                    <p class="text-muted">Preço: R$${item.price}</p>
                </div>
                <button class="btn btn-danger" onclick="removeItemFromCart('${item.name}')">Excluir</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

}

// Função para remover um item do carrinho
function removeItemFromCart(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
}

function proceedToPay() {
    alert('Função ainda não implementada...');
}

// Ao carregar a página, renderiza os itens do carrinho se houver algum
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
});

