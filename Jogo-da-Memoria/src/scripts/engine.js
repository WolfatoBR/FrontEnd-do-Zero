const emojis = [
    "🍎", "🍎", "🍌", "🍌", "🍒", "🍒", "🍇", "🍇", "🍉", "🍉", "🍊", "🍊", "🍍", "🍍", "🥭", "🥭"
];
let openCards = [];

let shuflleEmojis = emojis.sort(() => Math.random() > 0.5 ? 2: -1); // Embaralha os emojis

for( let i = 0; i < emojis.length; i++ ) {
    let box = document.createElement("div"); // Cria um elemento div
    box.className = "item"; // Adiciona a classe item
    box.innerHTML = shuflleEmojis[i]; // Adiciona o emoji embaralhado ao elemento div
    box.onclick = handleClick; // Adiciona o evento de clique ao elemento div
    document.querySelector(".game").appendChild(box); // Adiciona o elemento div ao container do jogo
}

function handleClick() {
   if(openCards.length < 2){
    this.classList.add("boxOpen"); // Adiciona a classe boxOpen ao elemento clicado
    openCards.push(this); // Adiciona o elemento clicado ao array openCards

    if(openCards.length == 2){
        setTimeout(checkMatch, 500); // Verifica se os dois emojis são iguais após 500ms
    }
   }
}

function checkMatch() {
    if(openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch"); // Adiciona a classe boxMatch ao primeiro elemento
        openCards[1].classList.add("boxMatch"); // Adiciona a classe boxMatch ao segundo elemento
    }else{
        openCards[0].classList.remove("boxOpen"); // Remove a classe boxOpen do primeiro elemento
        openCards[1].classList.remove("boxOpen"); // Remove a classe boxOpen do segundo elemento
    }

    openCards = []; // Limpa o array openCards

    if(document.querySelectorAll(".boxMatch").length === emojis.length) {
            alert("Parabéns! Você encontrou todos os pares!");
    }
}