console.log("Жэпа");
function layoutLevel() {
    let difficultySelection = document.createElement("div");
    difficultySelection.classList.add("difficultySelection");
    let styleText = document.createElement("h1");
    styleText.classList.add("styleText");
    styleText.innerHTML = "Выберите сложность";
    let blocks = document.createElement("div");
    blocks.classList.add("blocks");
    let block1 = document.createElement("div");
    block1.classList.add("block1", "level1");
    block1.innerHTML = "1";
    let block2 = document.createElement("div");
    block2.classList.add("block1", "level2");
    block2.innerHTML = "2";
    let block3 = document.createElement("div");
    block3.classList.add("block1", "level3");
    block3.innerHTML = "3";
    let button = document.createElement("button");
    button.classList.add("button");
    button.innerHTML = "Старт";

    difficultySelection.append(styleText);
    difficultySelection.append(blocks);
    blocks.append(block1);
    blocks.append(block2);
    blocks.append(block3);
    difficultySelection.append(button);
    return difficultySelection;
}

function layoutGame() {
    let theCard = document.createElement("div");
    theCard.classList.add("theCard");
    let menuGame = document.createElement("div");
    menuGame.classList.add("menuGame");
    let timer = document.createElement("div");
    timer.classList.add("timer");
    let minSek = document.createElement("div");
    minSek.classList.add("minSek");
    let spanMinSek = document.createElement("span");
    spanMinSek.innerHTML = "min";
    let spanMinSek2 = document.createElement("span");
    spanMinSek2.innerHTML = "sek";
    let realTimer = document.createElement("div");
    realTimer.classList.add("realTimer");
    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button");
    let button = document.createElement("button");
    button.innerHTML = "Начать заново";
    button.onclick = () => {
        loadPage(pages.level);
    };
    let gameCard = document.createElement("div");
    gameCard.classList.add("gameCard");

    theCard.append(menuGame);
    theCard.append(gameCard);
    menuGame.append(timer);
    menuGame.append(buttonDiv);
    buttonDiv.append(button);
    timer.append(minSek);
    minSek.append(spanMinSek);
    minSek.append(spanMinSek2);
    timer.append(realTimer);
    return theCard;
}
function timeFromTheStarToTheGame() {
    endTime = new Date();
    let minut: any = "" + new Date(endTime - startTime).getMinutes();
    if ((minut + "").length <= 1) {
        minut = "0" + minut;
    }
    let sekund: string = new Date(endTime - startTime).getSeconds() + "";
    if ((sekund + "").length <= 1) {
        sekund = "0" + sekund;
    }
    return minut + "." + sekund;
}
function renderResultGame(total: string) {
    let resultContener = document.createElement("div");
    resultContener.classList.add("resultContener");
    let result = document.createElement("div");
    result.classList.add("result");
    let resultContent = document.createElement("div");
    resultContent.classList.add("resultContent");
    let img = document.createElement("img");
    img.src = `image/${total}.svg`;
    let resultText = document.createElement("h1");
    resultText.classList.add("resultText");
    resultText.innerHTML = total === "win" ? "Вы выиграли!" : "Вы проиграли!";
    let elapsedTimeBlock = document.createElement("div");
    elapsedTimeBlock.classList.add("elapsedTimeBlock");
    let elapsedTime = document.createElement("h2");
    elapsedTime.classList.add("elapsedTime");
    elapsedTime.innerHTML = "Затраченное время:";
    let time = document.createElement("h1");
    time.classList.add("time");
    time.innerHTML = timeFromTheStarToTheGame();
    let button = document.createElement("button");
    button.classList.add("button");
    button.innerHTML = "Играть снова";
    button.onclick = () => {
        loadPage(pages.level);
    };

    resultContener.append(result);
    result.append(resultContent);
    resultContent.append(img);
    resultContent.append(resultText);
    resultContent.append(elapsedTimeBlock);
    elapsedTimeBlock.append(elapsedTime);
    elapsedTimeBlock.append(time);
    resultContent.append(button);
    content.append(resultContener);
}
let pages = {
    level: { DOM: layoutLevel, js: levelScript },
    game: { DOM: layoutGame, js: gameScript },
};
let complexity: number;
document.addEventListener("DOMContentLoaded", ready);
let content: any = document.querySelector(".content");
function ready() {
    loadPage(pages.level);
}
function loadPage(page: any) {
    content.innerHTML = "";
    content.append(page.DOM());
    page.js();
}
function levelScript() {
    let level1: any = document.querySelector(".level1");
    let level2: any = document.querySelector(".level2");
    let level3: any = document.querySelector(".level3");
    let button: any = document.querySelector(".button");
    button.onclick = function () {
        loadPage(pages.game);
    };
    level1.onclick = function () {
        complexity = 1;
    };
    level2.onclick = function () {
        complexity = 2;
    };
    level3.onclick = function () {
        complexity = 3;
    };
}

let winsCount = 0;
let startTime: any = 0;
let endTime: any;
function gameScript() {
    let timer: any = document.querySelector(".realTimer");
    function onlineTimer() {
        timer.innerHTML = timeFromTheStarToTheGame();
    }
    winsCount = 0;
    let cardForGame: string[] = [];
    const deck = [
        "pA",
        "pK",
        "pQ",
        "pJ",
        "p10",
        "p9",
        "p8",
        "p7",
        "p6",
        "hA",
        "hK",
        "hQ",
        "hJ",
        "h10",
        "h9",
        "h8",
        "h7",
        "h6",
        "bA",
        "bK",
        "bQ",
        "bJ",
        "b10",
        "b9",
        "b8",
        "b7",
        "b6",
        "kA",
        "kK",
        "kQ",
        "kJ",
        "k10",
        "k9",
        "k8",
        "k7",
        "k6",
    ];
    let copyDeck = [...deck];
    rundomDeck(complexity * 3);
    function rundomDeck(count: number) {
        for (let i = 0; i < count; i++) {
            let a = getRandomInt(copyDeck["length"]);
            let randomCard = copyDeck.splice(a, 1)[0];
            cardForGame[i] = randomCard;
            cardForGame[count + i] = randomCard;
        }
    }
    shuffle(cardForGame);
    let numberLastCard = "";
    let elementLastCard: any;
    function clickCard(el: any, card: any) {
        if (!el.classList.contains("cardClosed")) return;
        el.classList.remove("cardClosed");
        if (numberLastCard === "") {
            numberLastCard = card;
            elementLastCard = el;
        } else {
            if (numberLastCard === card) {
                winsCount++;
                if (winsCount === complexity * 3) {
                    endTime = new Date();
                    renderResultGame("win");
                }
                elementLastCard.style.display = "none";
                el.style.display = "none";
            } else {
                endTime = new Date();
                renderResultGame("lose");
            }
            let copyLastCard = elementLastCard;
            let timerClosed = setTimeout(() => {
                el.classList.add("cardClosed");
                copyLastCard.classList.add("cardClosed");
            }, 1000);
            numberLastCard = "";
            elementLastCard = "";
        }
    }

    function drawCards(cards: any) {
        for (let card in cards) {
            let suit = cards[card][0];
            let number = cards[card].substring(1);
            let gameCard: any = document.querySelector(".gameCard");
            let cardOpen = document.createElement("div");
            cardOpen.classList.add("cardOpen");
            let topCard = document.createElement("div");
            topCard.classList.add("topCard");
            let imgTop = document.createElement("img");
            imgTop.src = `image/${suit}suit.svg`;
            let imgMid = document.createElement("img");
            imgMid.src = `image/${suit}suit.svg`;
            let imgBot = document.createElement("img");
            imgBot.src = `image/${suit}suit.svg`;
            let midCard = document.createElement("div");
            midCard.classList.add("midCard");
            let botCard = document.createElement("div");
            botCard.classList.add("botCard");

            cardOpen.append(topCard);
            topCard.append(number);
            topCard.append(imgTop);

            cardOpen.append(midCard);
            midCard.append(imgMid);
            cardOpen.append(botCard);
            botCard.append(number);
            botCard.append(imgBot);
            gameCard.append(cardOpen);
            let timerClosed = setTimeout(() => {
                startTime = new Date();
                cardOpen.classList.add("cardClosed");
            }, 5000);
            cardOpen.onclick = () => {
                clickCard(cardOpen, cards[card]);
            };
        }
        let timerCloseder = setTimeout(() => {
            let timerStartGame = setInterval(onlineTimer, 1000);
        }, 5000);
    }
    drawCards(cardForGame);
}
function shuffle(array: any) {
    array.sort(() => Math.random() - 0.5);
}

function getRandomInt(max: any) {
    return Math.floor(Math.random() * max);
}
