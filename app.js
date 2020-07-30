var result = false;
var answer;
var count = 0;
var score = 0;
var selection = 10;
const totalCount = 25;
var scoreCounterBoxes = 0;
var quizSets = [1, 2, 3, 4, 5];
var quizTaken = [];
var hitCount = 0;

function setupNextQuestion() {
    let emptyDivElement = !!document.getElementById("empty-quiz-container-message");
    if (emptyDivElement)
        document.getElementById("empty-quiz-container-message").remove();
    let loaderElement = !!document.getElementById("loader");
    if (loaderElement)
        document.getElementById("loader").remove();
    let className = (count + 1) % 2 !== 0 ? "dark" : "light";

    let mainDiv = document.createElement("div");
    mainDiv.id = "q_" + (count + 1);
    mainDiv.className = "inner-grid inner-grid-" + className + " fade-in";
    mainDiv.style = "grid-row-start:" + orientation[count][0].split("~")[0] + "; grid-row-end:" + orientation[count][0].split("~")[1] +
        "; grid-column-start:" + orientation[count][0].split("~")[2] + "; grid-column-end:" + orientation[count][0].split("~")[3] + ";";

    let sectionA = document.createElement("div");
    sectionA.className = "inner-grid-section_a";
    let sectionALabel = document.createElement("label");
    sectionALabel.innerText = data[selection][count].number;
    sectionA.appendChild(sectionALabel);

    let sectionB = document.createElement("div");
    sectionB.className = "inner-grid-section_b";
    let sectionBLabel = document.createElement("label");
    sectionBLabel.innerText = data[selection][count].category;
    sectionB.appendChild(sectionBLabel);

    let sectionC = document.createElement("div");
    sectionC.className = "inner-grid-section_c";
    sectionC.id = "clue_" + (count + 1);
    let sectionCSpan = document.createElement("span");
    let sectionCSpanITag = document.createElement("i");
    sectionCSpanITag.id = "clue-icon-" + (count + 1);
    sectionCSpanITag.className = "fa fa-lock";
    sectionCSpanITag.style = "cursor: pointer;";
    sectionCSpanITag.onclick = function () {
        revealClue(this.id.split("-")[2]);
    }
    sectionCSpan.appendChild(sectionCSpanITag);
    sectionC.appendChild(sectionCSpan);

    let sectionD = document.createElement("div");
    sectionD.className = "inner-grid-section_d";
    let sectionDLabel = document.createElement("label");
    sectionDLabel.innerText = data[selection][count].emojis;
    sectionD.appendChild(sectionDLabel);

    let sectionE = document.createElement("div");
    sectionE.className = "inner-grid-section_e has-animation animation-ltr";
    sectionE.id = "clue-container-" + (count + 1);
    sectionE.setAttribute("data-delay", "10");
    let sectionEPara = document.createElement("p");
    sectionEPara.className = "bigger";
    sectionEPara.innerText = data[selection][count].clue;
    sectionE.appendChild(sectionEPara);

    mainDiv.appendChild(sectionA);
    mainDiv.appendChild(sectionB);
    mainDiv.appendChild(sectionC);
    mainDiv.appendChild(sectionD);
    mainDiv.appendChild(sectionE);

    document.getElementById("quiz-container").appendChild(mainDiv);
}

function onAnswerSubmit() {
    answer = document.getElementById("input-data").value.toLowerCase();
    if (answer === data[selection][count].answer) {
        result = true;
        score++;
        hitCount++;
        document.getElementById("score-" + (count + 1)).style.color = "green";
        let randomNumber = Math.floor(Math.random() * 10);
        typewriterEffect(correct[randomNumber]);
    }
    else {
        result = false;
        document.getElementById("score-" + (count + 1)).style.color = "red";
        let randomNumber = Math.floor(Math.random() * 5);
        typewriterEffect(wrong[randomNumber]);
    }

    document.getElementById("input-data").value = "";
    document.getElementById("input-data-label").classList.remove("label-active");
    document.getElementById("answer").disabled = true;
    document.getElementById("answer").classList.add("disabled");
    document.getElementById("score-counter").innerText = score;
    if (score === totalCount && (count + 1) === totalCount) {
        document.getElementById("quiz-container").innerHTML = "";
        document.getElementById("quiz-container").classList.add("centered");
        createLoader();
        document.getElementById("loader").classList.add("loader-style");
        setTimeout(() => {
            document.getElementById("loader").remove();
            document.getElementById("quiz-container").classList.remove("centered");
            let div = document.createElement("div");
            div.id = "empty-quiz-container-message";
            document.getElementById("quiz-container").appendChild(div);
            document.getElementById("empty-quiz-container-message").innerText = "You have done a remarkable job by managing a 100% hit rate. 🥳 Please select a different set now to proceed forward.";
            document.getElementById("score-counter").innerText = 0;
            quizSets.filter(function (index) {
                if ((selection + 1) === index) {
                    document.getElementById("set-" + index).style.pointerEvents = "none";
                    document.getElementById("set-" + index).children[0].classList.remove("fa-anchor");
                    document.getElementById("set-" + index).children[0].classList.add("fa-check-circle");
                    document.getElementById("answer-message").innerText = "";
                    document.getElementById("score-checker-graph").remove();
                }
                else {
                    document.getElementById("set-" + index).style.pointerEvents = "auto";
                }
            });
            setTimeout(() => {
                if (quizTaken.length === 5 && hitCount == 125)
                    document.getElementById("empty-quiz-container-message").innerText = "Well, seems like you have answers to everything. 🎉 Take a bow. 🙌 And for now, you deserve this 🥇.You are a champion. 🏆 We will add more sets in the near future.";
                else if (quizTaken.length === 5)
                    document.getElementById("empty-quiz-container-message").innerText = "We have run out of quiz sets. You stumped us with your enthusiasm. 👏 We will add more sets in the near future.";
            }, 2000);
        }, 5000);
    }
    else if ((count + 1) === totalCount) {
        document.getElementById("quiz-container").innerHTML = "";
        document.getElementById("quiz-container").classList.add("centered");
        createLoader();
        document.getElementById("loader").classList.add("loader-style");
        setTimeout(() => {
            document.getElementById("loader").remove();
            document.getElementById("quiz-container").classList.remove("centered");
            let div = document.createElement("div");
            div.id = "empty-quiz-container-message";
            document.getElementById("quiz-container").appendChild(div);
            document.getElementById("empty-quiz-container-message").innerText = "You have finished the quiz by managing a " + ((score / totalCount) * 100) + "% hit rate. Please select a different set now to proceed forward.";
            document.getElementById("score-counter").innerText = 0;
            quizSets.filter(function (index) {
                if ((selection + 1) === index) {
                    document.getElementById("set-" + index).style.pointerEvents = "none";
                    document.getElementById("set-" + index).children[0].classList.remove("fa-anchor");
                    document.getElementById("set-" + index).children[0].classList.add("fa-check-circle");
                    document.getElementById("answer-message").innerText = "";
                    document.getElementById("score-checker-graph").remove();
                }
                else {
                    document.getElementById("set-" + index).style.pointerEvents = "auto";
                }
            });
            setTimeout(() => {
                if (quizTaken.length === 5)
                    document.getElementById("empty-quiz-container-message").innerText = "We have run out of quiz sets. You stumped us with your enthusiasm. 👏 We will add more sets in the near future.";
            }, 2000);
        }, 5000);
    }
    else {
        count++;
        setupNextQuestion();
    }
}

document.getElementById('input-data').addEventListener("focusin", function () {
    document.getElementById("input-data-label").classList.add("label-active");
});

document.getElementById('input-data').addEventListener("focusout", function () {
    if (document.getElementById('input-data').value === '') {
        document.getElementById("input-data-label").classList.remove("label-active");
    };
});

function checkVal() {
    if (document.getElementById('input-data').value !== '') {
        document.getElementById("answer").disabled = false;
        document.getElementById("answer").classList.remove("disabled");
    }
    else {
        document.getElementById("answer").disabled = true;
        document.getElementById("answer").classList.add("disabled");
    }
}

window.addEventListener("load", checkVal);

function setupQuizGrid(event) {
    count = 0;
    score = 0;
    scoreCounterBoxes = 0;
    document.getElementById(event.id).children[0].innerText = "";
    document.getElementById(event.id).children[0].classList.add("fa", "fa-anchor");
    let choice = parseInt(event.id.split("-")[1]);
    if (choice === 1)
        selection = 0;
    else if (choice === 2)
        selection = 1;
    else if (choice === 3)
        selection = 2;
    else if (choice === 4)
        selection = 3;
    else if (choice === 5)
        selection = 4;

    quizTaken.push(choice);

    quizSets.filter(function (index) {
        if (choice !== index) {
            document.getElementById("set-" + index).style.pointerEvents = "none";
        }
    });
    document.getElementById("data-container").classList.add("fade-in");
    createScoreChecker();
    setupScoreChecker();
    document.getElementById("score-checker").classList.add("fade-in");
    document.getElementById("data-container").style.opacity = 1;
    document.getElementById("score-checker").style.opacity = 1;
    document.getElementById("empty-quiz-container-message").innerText = "You have selected set " + choice + ". Please wait while we set up the quiz deck.";
    createLoader();
    setTimeout(setupNextQuestion, 3000);
}

function revealClue(index) {
    if (document.getElementById("clue-icon-" + index).classList.contains("fa-lock")) {
        document.getElementById("clue-icon-" + index).classList.remove("fa-lock");
        document.getElementById("clue-icon-" + index).classList.add("fa-unlock-alt");

        document.getElementById("clue-container-" + index).classList.remove("has-animation-active");
        document.getElementById("clue-container-" + index).classList.remove("animation-rtl");
        document.getElementById("clue-container-" + index).classList.remove("animate-out");

        document.getElementById("clue-container-" + index).classList.add("animate-in");
        document.getElementById("clue-container-" + index).classList.add("animation-ltr");
        document.getElementById("clue-container-" + index).classList.add("has-animation");
    }
    else if (document.getElementById("clue-icon-" + index).classList.contains("fa-unlock-alt")) {
        document.getElementById("clue-icon-" + index).classList.remove("fa-unlock-alt");
        document.getElementById("clue-icon-" + index).classList.add("fa-lock");

        document.getElementById("clue-container-" + index).classList.remove("animate-in");
        document.getElementById("clue-container-" + index).classList.remove("animation-ltr");
        document.getElementById("clue-container-" + index).classList.remove("has-animation");

        document.getElementById("clue-container-" + index).classList.add("has-animation-active");
        document.getElementById("clue-container-" + index).classList.add("animation-rtl");
        document.getElementById("clue-container-" + index).classList.add("animate-out");
    }
}

function createScoreChecker() {
    let div = document.createElement("div");
    div.id = "score-checker-graph";
    document.getElementById("score-checker").appendChild(div);
}

function setupScoreChecker() {
    if (scoreCounterBoxes < 25) {
        let div = document.createElement("div");
        div.id = "score-" + (scoreCounterBoxes + 1);
        div.style = "padding: 5px; grid-row-start:" + orientation[scoreCounterBoxes][0].split("~")[0] + "; grid-row-end:" + orientation[scoreCounterBoxes][0].split("~")[1] +
            "; grid-column-start:" + orientation[scoreCounterBoxes][0].split("~")[2] + "; grid-column-end:" + orientation[scoreCounterBoxes][0].split("~")[3] + ";";
        let divLabel = document.createElement("label");
        divLabel.innerText = scoreCounterBoxes + 1;
        div.appendChild(divLabel);
        document.getElementById("score-checker-graph").appendChild(div);
        scoreCounterBoxes++;
        setupScoreChecker();
    }
}

document.getElementById("about").addEventListener("click", function () {
    document.getElementById("overlay").classList.add("open");
});

function closeModal() {
    document.getElementById("overlay").classList.remove("open");
}

function typewriterEffect(data) {
    let result = "";
    for (let i = 0; i < data[0].length; i++) {
        setTimeout(function () {
            result += data[0][i];
            document.getElementById("answer-message").innerHTML = result;
        }, 50 * i);
    }
}

function createLoader() {
    let div = document.createElement("div");
    div.id = "loader";
    let iconDivFirst = document.createElement("div");
    iconDivFirst.className = "loader-icon";
    let iconDivSecond = document.createElement("div");
    iconDivSecond.className = "loader-icon loader-delay";
    let iconDivThird = document.createElement("div");
    iconDivThird.className = "loader-icon loader-delay";
    let iconDivFourth = document.createElement("div");
    iconDivFourth.className = "loader-icon";
    div.appendChild(iconDivFirst);
    div.appendChild(iconDivSecond);
    div.appendChild(iconDivThird);
    div.appendChild(iconDivFourth);
    document.getElementById("quiz-container").appendChild(div);
}