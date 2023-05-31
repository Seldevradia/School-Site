const conteiner = document.getElementById("conteiner");
const test = document.getElementById("test");
const button = document.getElementById("button");
const question_name = document.getElementById("question_name");
var btn_txt = document.getElementById("submit_btn");


let quests_answs = [];
quests_answs.push(["radio", "1. Правоздатність виникає з:", ["А народження", "Б 14 років", "В 16 років", "Г 18 років"], 0]);
quests_answs.push(["radio", "2. Об’єктами цивільних правовідносин є:", ["А нематеріальні блага", "Б юридичні факти", "В фізичні особи"], 0]);
quests_answs.push(["radio", "3. Здатність особи своїми діями набувати прав та обов’язків:", ["А правоздатність", "Б дієздатність", "В деліктоздатність"], 1]);
quests_answs.push(["radio", "4. Особа з неповною дієздатністю:", ["А може самостійно розпоряджатися своїм заробітком", "Б може розпоряджатися своїм заробітком лише за згодою батьків", "В повинна віддавати свій заробіток на користь сім’ї"], 0]);
quests_answs.push(["radio", "5. Шлюбний вік чоловіків в Україні становить ... років:", ["А 15", "Б 16", "В 17", "Г 18"], 3]);
quests_answs.push(["radio", "6. Який із перелічених документів є обов’язковим при прийнятті на роботу 16-літньої особи?", ["А довідка про навчання зі школи", "Б довідка про стан здоров’я", "В дозвіл одного з батьків"], 1]);
quests_answs.push(["checkbox", "7. Ознаками злочину є:", ["А винність", "Б протиправність", "В караність", "Г суспільно-небезпечні наслідки діяння", "Д наявність мотиву"], [0, 1, 2]]);
quests_answs.push(["checkbox", "8. Оберіть правильні відповіді. Скорочений робочий час встановлюється:", ["А для працівників з 16 до 18 років — 30 годин на тиждень", "Б для працівників 15–16 років — 28 годин на тиждень", "В для працівників 14–16 років під час канікул — 24 години на тиждень", "Г для працівників 16–18 років під час навчання — 18 годин на тиждень"], [2, 3]]);
quests_answs.push(["checkbox", "9. Умовами вступу до шлюбу є:", ["А згода на шлюб батьків чоловіка і жінки", "Б досягнення шлюбного віку подружжям", "В вільна згода чоловіка і жінки", "Г взаємне обов’язкове надання довідок про стан здоров’я"], [1, 2]]);
let next_quest = 0;
var answers = [];
var answ;
var score = 0;



function create_EndText() {
    conteiner.innerHTML = `<div id="end"></div>`;
}

function clearTest() {
    test.innerHTML="";
    question_name.innerHTML="";
}

function showRad(n) {
    let quest_arr = quests_answs[n];
    let quest_name = quest_arr[1];
    question_name.innerHTML=quest_name;
    let quest = quest_arr[2];
    let text = "";
    for (let i = 0; i<quest_arr[2].length; i++) {
        text += 
            `<div class="answ">
                <input type="radio" name="1" data-answ="${i}">
                <p>${quest[i]}</p>
            </div>`;
    }
    test.innerHTML = text;

}

function showCheck(n) {
    let quest_arr = quests_answs[n];
    let quest_name = quest_arr[1];
    question_name.innerHTML=quest_name;
    let quest = quest_arr[2];
    let text = "";
    for (let i = 0; i<quest_arr[2].length; i++) {
        text += 
            `<div class="answ">
                <input type="checkbox" name="${i}">
                <p>${quest[i]}</p>
            </div>`;
    }
    test.innerHTML = text;

}

function showNext(n) {
    switch (quests_answs[n][0]) {
        case "radio":
            showRad(n);
            break;
        case "checkbox":
            showCheck(n);
            break;
    }
}

function calculate() {
    for (var i = 0; i < quests_answs.length; i++) {
        let localScore = 0
        switch (quests_answs[i][0]) {
            case "radio":
                if (answers[i] == quests_answs[i][3]) {
                    localScore ++;
                }
                break;
            case "checkbox":
                for (var l = 0; l<answers[i].length; l++) {
                    if (quests_answs[i][3].find((i) => i === answers[i][l]) != -1) {
                        localScore += 0.5;
                    }
                    else {
                        localScore -= 0.5;
                    }
                }
        }
        if (localScore > 0) {
            score += localScore;
        }
    }
}

showNext(next_quest);
next_quest++;

submit_btn.addEventListener("click", function() {
    if (next_quest <= quests_answs.length) {
        switch (quests_answs[next_quest-1][0]) {
            case "radio":
                answ = document.querySelector('input[name="1"]:checked');
                if (answ != undefined) {
                    answers.push(answ.dataset.answ);
                }
                break;
            
            case "checkbox":
                let localanswers = []
                for (let j = 0; j < quests_answs[next_quest-1][2].length; j++) {
                    answ = document.querySelector(`input[name="${j}"]:checked`);
                    if (answ != null) {
                        localanswers.push(answ.getAttribute("name"));
                    }
                }
                answers.push(localanswers);
                break;
        }

    if (next_quest < quests_answs.length) {
        showNext(next_quest);
    }

    if (next_quest <= quests_answs.length) {
        next_quest++;
    }

    if (next_quest == quests_answs.length) {
        btn_txt.innerHTML = "End Test";
    }

    }
    if (next_quest == quests_answs.length+1) {
        create_EndText();
        calculate();
        const end_text = document.getElementById("end");
        end_text.innerHTML = " Your grade is " + (score / 8 * 12);
    }
}
)