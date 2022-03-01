let order = [];
let clickedOrder = [];
let score = 0;
//Cores: 0: verde, 1: vermelho, 2: amarelo, 3: azul
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//Cria ordem aleatoria de cores
let shuffleOrder = () => { //Funcao que sorteia numeros (isto é, as cores)
    let colorOrder = Math.floor(Math.random() * 4);//Seleciona um numero aleatorio de 0 a 3
    order[order.length] = colorOrder; //Insere o elemento no array;
    clickedOrder = [];

    for(let i in order) { //acender a cor ao numero sorteado
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i)+1); //acenda para clicar
    }
};

//acende a proxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => { //acende a luz
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => { //apaga a luz
        element.classList.remove('selected');
    });
}

//compara se a ordem de cores fornecidas pelo jogo é a mesma que foi selecionada pelo jogador
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) { //perdeu
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) { //proximo nivel
        alert(`Pontuacao: ${score}\nVoce acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

//funcao para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected'); //seleciona a cor
    setTimeout(() => { //apaga a luz
        createColorElement(color).classList.remove('selected');
        checkOrder(); //checa a cor
    }, 250);    
};

//funcao que retorna a cores
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if(color == 2) {
        return yellow;
    } else if(color == 3) {
        return blue;
    }
};

//funcao para o proximo nivel do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
};

//funcao para fim de jogo
let gameOver = () => {
    alert(`Pontuacao: ${score}\nVoce perdeu o jogo!\nClique em OK para iniciar um novo jogo!`);
    order = [];
    clickedOrder = [];    
    playGame();
};

//funcao de inicio de jogo
let playGame = () => {
    alert('Bem vindo ao Genesis! Iniciando novo jogo!');
    score = 0;    
    nextLevel();
};

//eventos de clique para as cores;
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

/*green.addEventListener('click', click(0));
red.addEventListener('click', click(1));
yellow.addEventListener('click', click(2));
blue.addEventListener('click', click(3));*/

//inicio do jogo
playGame();