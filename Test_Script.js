const test = document.getElementById("test");
const button = document.getElementById("button");
const question_name = document.getElementById("question_name");
var submit_btn = document.getElementById("submit_btn");
const end_text = document.getElementById("end");

let quests_answs = [];
quests_answs.push(["radio", "Question 1", ["answ1", "answ2", "answ3", "answ4"], 2]);
quests_answs.push(["radio", "Question 2", ["answ1", "answ2", "answ3", "answ4"], 0]);
quests_answs.push(["radio", "Question 3", ["answ1", "answ2", "answ3", "answ4"], 1]);
quests_answs.push(["radio", "Question 4", ["answ1", "answ2", "answ3", "answ4"], 3]);
quests_answs.push(["radio", "Question 5", ["answ1", "answ2", "answ3", "answ4"], 1]);
quests_answs.push(["radio", "Question 6", ["answ1", "answ2", "answ3", "answ4"], 0]);
quests_answs.push(["checkbox", "Question 7", ["answ1", "answ2", "answ3", "answ4"], [2, 3]]);
quests_answs.push(["checkbox", "Question 8", ["answ1", "answ2", "answ3", "answ4"], [0, 2]]);
let next_quest = 0;
var answers = [];
var answ;
var score = 0;



function clearPage() {
    test.innerHTML="";
    question_name.innerHTML="";
    button.innerHTML="";
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
                console.log("rad");
                if (answers[i] == quests_answs[i][3]) {
                    localScore ++;
                }
                break;
            case "checkbox":
                console.log("check");
                for (var l = 0; l<answers[i].length; l++) {
                    console.log(quests_answs[i][3]);
                    console.log(answers[i][l]);
                    for (var j = 0; j < quests_answs[i][3].length; j++) {
                        if (quests_answs[i][3][j] === answers[i][l]) {
                            localScore += 0.5;
                        }
                        else {
                            localScore -= 0.5;
                        }
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

    }
    if (next_quest == quests_answs.length+1) {
        clearPage();
        calculate();
        end_text.innerHTML = "Right answers: " + score;
        end_text.innerHTML += " Your grade is " + (score / 8 * 12);
    }
}
)