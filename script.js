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
    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button");
    let button = document.createElement("button");
    button.innerHTML = "Начать заново";
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
    timer.append("00:00");
    return theCard;
}
let pages = {
    level: { DOM: layoutLevel, js: levelScript },
    game: { DOM: layoutGame, js: gameScript },
};
let complexity;
document.addEventListener("DOMContentLoaded", ready);
let content = document.querySelector(".content");
function ready() {
    loadPage(pages.level);
}
function loadPage(page) {
    content.innerHTML = "";
    content.append(page.DOM());
    page.js();
}
function levelScript() {
    let level1 = document.querySelector(".level1");
    let level2 = document.querySelector(".level2");
    let level3 = document.querySelector(".level3");
    let button = document.querySelector(".button");
    button.onclick = function () {
        loadPage(pages.game);
    };
    level1.onclick = function () {
        complexity = 1;
        console.log(complexity);
    };
    level2.onclick = function () {
        complexity = 2;
        console.log(complexity);
    };
    level3.onclick = function () {
        complexity = 3;
        console.log(complexity);
    };
}

let winsCount = 0;
function gameScript() {
    let cardForGame = [];
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
    function rundomDeck(count) {
        for (let i = 0; i < count; i++) {
            let a = getRandomInt(copyDeck["length"]);
            let randomCard = copyDeck.splice(a, 1)[0];
            cardForGame[i] = randomCard;
            cardForGame[count + i] = randomCard;
        }
        console.log(cardForGame);
    }
    shuffle(cardForGame);
    console.log(cardForGame);
    let numberLastCard = "";
    let elementLastCard = "";
    function clickCard(el, card) {
        if (!el.classList.contains("cardClosed")) return;
        el.classList.remove("cardClosed");
        console.log(el, card);
        if (numberLastCard === "") {
            numberLastCard = card;
            elementLastCard = el;
        } else {
            if (numberLastCard === card) {
                winsCount++;
                console.log(winsCount);
                if (winsCount === complexity * 3) {
                    alert("Вы выиграли");
                }
                elementLastCard.style.display = "none";
                el.style.display = "none";
            } else {
                alert("вы проиграли");
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

    function drawCards(cards) {
        for (let card in cards) {
            let suit = cards[card][0];
            let number = cards[card].substring(1);
            console.log(suit, number);
            let gameCard = document.querySelector(".gameCard");
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
                cardOpen.classList.add("cardClosed");
            }, 5000);
            cardOpen.onclick = () => {
                clickCard(cardOpen, cards[card]);
            };
        }
    }
    drawCards(cardForGame);
}
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
