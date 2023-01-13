// import levelPage from './level.json' assert { type: 'json' };
// import gamePage from './db.json' assert { type: 'json' };

{/* <div class='difficultySelection'>
    <h1 class='styleText'>Выбери сложность</h1>
    <div class='blocks'>
        <div class='block1 level1'>1</div>
        <div class='block1 level2'>2</div>
        <div class='block1 level3'>3</div>
    </div><button class='button'>Старт</button>
</div> */}

function layoutLevel() {
    let difficultySelection = document.createElement("div")
    difficultySelection.classList.add("difficultySelection")
    let styleText = document.createElement("h1")
    styleText.classList.add("styleText")
    styleText.innerHTML = "Выберите сложность"
    let blocks = document.createElement("div")
    blocks.classList.add("blocks")
    let block1 = document.createElement("div")
    block1.classList.add("block1", "level1")
    block1.innerHTML = "1"
    let block2 = document.createElement("div")
    block2.classList.add("block1", "level2")
    block2.innerHTML = "2"
    let block3 = document.createElement("div")
    block3.classList.add("block1", "level3")
    block3.innerHTML = "3"
    let button = document.createElement("button")
    button.classList.add("button")
    button.innerHTML = "Старт"

    difficultySelection.append(styleText)
    difficultySelection.append(blocks)
    blocks.append(block1)
    blocks.append(block2)
    blocks.append(block3)
    difficultySelection.append(button)
    return difficultySelection
}
function layoutGame() {
    let div = document.createElement("div")
    return div
}
let pages = {
    level: { DOM: layoutLevel, js: levelScript },
    game: { DOM: layoutGame, js: levelGame }
}
let complexity
document.addEventListener("DOMContentLoaded", ready);
let content = document.querySelector(".content")
function ready() {
    loadPage(pages.level)
}
function loadPage(page) {
    content.innerHTML = ""
    content.append(page.DOM())
    page.js()
}
function levelScript() {
    console.log("ЛВЛ ЗАГРУЗИЛСЯ!!!!")
    let level1 = document.querySelector(".level1")
    let level2 = document.querySelector(".level2")
    let level3 = document.querySelector(".level3")
    let button = document.querySelector(".button")
    button.onclick = function () {
        loadPage(pages.game)

    }
    level1.onclick = function () {
        complexity = 1
        console.log(complexity)
    }
    level2.onclick = function () {
        complexity = 2
        console.log(complexity)
    }
    level3.onclick = function () {
        complexity = 3
        console.log(complexity)
    }
}
function levelGame() {
    console.log("Новая Страница загрузилась")
}


