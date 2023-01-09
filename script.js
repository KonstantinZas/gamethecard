import levelPage from './level.json' assert { type: 'json' };
import gamePage from './db.json' assert { type: 'json' };
let pages = {
    level: { JSON: levelPage, js: levelScript },
    game: { JSON: gamePage, js: levelGame }
}
let complexity
document.addEventListener("DOMContentLoaded", ready);
let content = document.querySelector(".content")
function ready() {
    loadPage(pages.level)
}
function loadPage(page) {
    content.innerHTML = page.JSON.body
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


