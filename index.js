const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");

let cards, interval, firstCard = false, secondCard = false;

const items = [
    {name: "01", image: "./Img/01.png"},
    {name: "02", image: "./Img/02.png"},
    {name: "03", image: "./Img/03.png"},
    {name: "04", image: "./Img/04.png"},
    {name: "05", image: "./Img/05.png"},
    {name: "06", image: "./Img/06.png"},
    {name: "07", image: "./Img/07.png"},
    {name: "08", image: "./Img/08.png"},
    {name: "09", image: "./Img/09.png"},
    {name: "10", image: "./Img/10.png"},
    {name: "11", image: "./Img/11.png"},
    {name: "12", image: "./Img/12.png"},
    {name: "13", image: "./Img/13.png"},
    {name: "14", image: "./Img/14.png"},
    {name: "15", image: "./Img/15.png"},
    {name: "16", image: "./Img/16.png"},
    {name: "17", image: "./Img/17.png"},
    {name: "18", image: "./Img/18.png"},
    {name: "19", image: "./Img/19.png"},
    {name: "20", image: "./Img/20.png"},
    {name: "21", image: "./Img/21.png"},
    {name: "22", image: "./Img/22.png"},
    {name: "23", image: "./Img/23.png"},
    {name: "24", image: "./Img/24.png"},
    {name: "25", image: "./Img/25.png"},
    {name: "26", image: "./Img/26.png"},
    {name: "27", image: "./Img/27.png"},
];
let seconds = 0,
    minutes = 0;

let movesCount = 0,
    winCount   = 0;

const timeGenerator = () => {
    seconds += 1;

    if(seconds >= 60){
        minutes += 1;
        seconds = 0;
    }

    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;

    timeValue.innerHTML = `<span>Time: </span> ${minutesValue}:${secondsValue}`;
};

const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves: </span> ${movesCount}`;
};


const generateRandom = (size = 4) => {
    

    let temporary = [...items];
    

    let cardValues = [];
    size = (size * size) / 2
    for(let i = 0; i < size; i++){
        const randomIndex = Math.floor(Math.random() * temporary.length);
        cardValues.push(temporary[randomIndex]);

        temporary.splice(randomIndex, 1);
    }

    return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];

    cardValues.sort(() => Math.random() - 0.5);
    
    for(let i = 0; i < size * size; i++){
        gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${cardValues[i].name}">
            <div class="card-before">?</div>
            <div class="card-after"><img src="${cardValues[i].image}" class="image"/></div>
        `;
    }

    //Grid
    gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;

    //Cards
    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
        if (!card.classList.contains("matched")) {
            
            card.classList.add("flipped");

            if (!firstCard) {

            firstCard = card;
            firstCardValue = card.getAttribute("data-card-value");
            } else {
            
            movesCounter();
            
            secondCard = card;
            let secondCardValue = card.getAttribute("data-card-value");
            if (firstCardValue == secondCardValue) {
                
                firstCard.classList.add("matched");
                secondCard.classList.add("matched");
                
                firstCard = false;
                
                winCount += 1;
                
                if (winCount == Math.floor(cardValues.length / 2)) {
                result.innerHTML = `<h2>You Won</h2>
                <h4>Moves: ${movesCount}</h4>`;
                stopGame();
                }
            } else {
                
                
                let [tempFirst, tempSecond] = [firstCard, secondCard];
                firstCard = false;
                secondCard = false;
                
                setTimeout(() => {
                tempFirst.classList.remove("flipped");
                tempSecond.classList.remove("flipped");
                }, 900);
            }
            }
        }
        });
    });
    };


startButton.addEventListener("click", () => {
    movesCount = 0;
    seconds = 0;
    minutes = 0;


    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");


    interval = setInterval(timeGenerator, 1000);


    moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
    initializer();
});

stopButton.addEventListener(
    "click",
    (stopGame = () => {
        controls.classList.remove("hide");
        stopButton.classList.add("hide");
        startButton.classList.remove("hide");
        clearInterval(interval);
    })
);


const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};