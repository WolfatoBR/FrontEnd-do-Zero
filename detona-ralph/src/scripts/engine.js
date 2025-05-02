const state = {
    //Variaveis visuais onde o jogo irá interagir
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    //Variaveis de estado do jogo onde irá armazenar os valores do jogo
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    //Funções que irão ser executadas no jogo
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countdown, 1000),
    },
};

//Função que irá decrementar o tempo do jogo e verificar se o tempo acabou
function countdown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! Sua pontuação final foi " + state.values.result);
        playsound("gameOver");
    }
}

//Função que irá tocar o som do jogo
function playsound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.3;
    audio.play();
}

//Função que irá gerar um quadrado aleatório para o jogador clicar
function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
};

//Função que irá adicionar um evento de clique para o jogador clicar no quadrado
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mouseup", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playsound("hit");
            }
        });
    });
}

//Função que irá iniciar o jogo
function init() {
    addListenerHitBox();
};

init();