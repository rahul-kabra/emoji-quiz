var result = false;
var answer;
var count = 0;
var score = 0;
var selection = 10;
const totalCount = 25;
let scoreCounterBoxes = 0;
let quizSets = [1, 2, 3, 4, 5];
let quizTaken = [];

function setupNextQuestion() {
    $("#empty-quiz-container-message").remove();
    $(".loader").remove();
    let className = (count + 1) % 2 !== 0 ? "dark" : "light";
    $("<div/>", {
        "id": "q_" + (count + 1),
        "class": "inner-grid inner-grid-" + className + " fade-in",
        "style": "grid-row-start:" + orientation[count].split("~")[0] + "; grid-row-end:" + orientation[count].split("~")[1] +
            "; grid-column-start:" + orientation[count].split("~")[2] + "; grid-column-end:" + orientation[count].split("~")[3] + ";"
    }).append($("<div/>", {
        "class": "inner-grid-section_a"
    }).append($("<label/>").text(data[selection][count].number)))
        .append($("<div/>", {
            "class": "inner-grid-section_b"
        }).append($("<label/>").text(data[selection][count].category)))
        .append($("<div/>", {
            "class": "inner-grid-section_c",
            "id": "clue_" + (count + 1),
        }).append($("<span/>").append($("<i/>", {
            "id": "clue-icon-" + (count + 1),
            "class": "fa fa-lock",
            "onclick": "revealClue(" + (count + 1) + ")",
            "style": "cursor: pointer;"
        }))))
        .append($("<div/>", {
            "class": "inner-grid-section_d"
        }).append($("<label/>").text(data[selection][count].emojis)))
        .append($("<div/>", {
            "id": "clue-container-" + (count + 1),
            "class": "inner-grid-section_e has-animation animation-ltr",
            "data-delay": "10"
        }).append($("<p/>", {
            "class": "bigger"
        }).text(data[selection][count].clue)))
        .appendTo($("#quiz-container"));
}

function onAnswerSubmit() {

    answer = $("#input-data").val().toLowerCase();
    if (answer === data[selection][count].answer) {
        result = true;
        score++;
        $("#score-" + (count + 1)).css("color", "green");
        var randomNumber = Math.floor(Math.random() * 10);
        typewriterEffect(correct[randomNumber]);
    }
    else {
        result = false;
        $("#score-" + (count + 1)).css("color", "red");
        var randomNumber = Math.floor(Math.random() * 10);
        typewriterEffect(wrong[randomNumber]);
    }

    $("#input-data").val("");
    $("#input-data").focusout();
    $("#answer").attr("disabled", true);
    $("#answer").addClass("disabled");
    $("#score-counter").text(score);
    if (score === totalCount && (count + 1) === totalCount) {
        $("#quiz-container div").remove();
        $("#quiz-container").addClass("centered");
        createLoader();
        $(".loader").addClass("loader-style");
        setTimeout(() => {
            $(".loader").remove();
            $(".loader").removeClass("loader-style");
            $("#quiz-container").removeClass("centered");
            $("<div/>", {
                "id": "empty-quiz-container-message"
            }).appendTo($("#quiz-container"));
            $("#empty-quiz-container-message").text("You have done a remarkable job by managing a 100% hit rate. 🥳 Please select a different set now to proceed forward.");
            $("#score-counter").text(0);
            $.grep(quizSets, function (index) {
                if ((selection + 1) === index) {
                    $("#set-" + index).css("pointer-events", "none");
                    $("#set-" + index + "> span").removeClass("fa fa-anchor");
                    $("#set-" + index + "> span").addClass("fa fa-check-circle");
                    $("#answer-message").text("");
                    $("#score-checker-graph").remove();
                }
                else {
                    $("#set-" + index).css("pointer-events", "auto");
                }
            });
            setTimeout(() => {
                if (quizTaken.length === 5)
                    $("#empty-quiz-container-message").text("Well, seems like you have answers to everything. 🎉 Take a bow. 🙌 And for now, you deserve this 🥇.You are a champion. 🏆 We will add more sets in the near future.");
            }, 2000);
        }, 5000);
    }
    else if ((count + 1) === totalCount) {
        $("#quiz-container div").remove();
        $("#quiz-container").addClass("centered");
        createLoader();
        $(".loader").addClass("loader-style");
        setTimeout(() => {
            $(".loader").remove();
            $(".loader").removeClass("loader-style");
            $("#quiz-container").removeClass("centered");
            $("<div/>", {
                "id": "empty-quiz-container-message"
            }).appendTo($("#quiz-container"));
            $("#empty-quiz-container-message").text("You have finished the quiz by managing a " + ((score / totalCount) * 100) + "% hit rate. Please select a different set now to proceed forward.");
            $("#score-counter").text(0);
            $.grep(quizSets, function (index) {
                if ((selection + 1) === index) {
                    $("#set-" + index).css("pointer-events", "none");
                    $("#set-" + index + "> span").removeClass("fa fa-anchor");
                    $("#set-" + index + "> span").addClass("fa fa-check-circle");
                    console.log("removing text");
                    $("#answer-message").text("");
                    $("#score-checker-graph").remove();
                }
                else {
                    $("#set-" + index).css("pointer-events", "auto");
                }
            });
            setTimeout(() => {
                if (quizTaken.length === 5)
                    $("#empty-quiz-container-message").text("We have run out of quiz sets. You stumped us with your enthusiasm. 👏 We will add more sets in the near future.");
            }, 2000);
        }, 5000);
        if (quizTaken.length === 5)
            $("#empty-quiz-container-message").text("We have run out of quiz sets. You stumped us with your enthusiasm. We will add more sets in the near future.");
    }
    else {
        count++;
        setupNextQuestion();
    }
}

$('#input-data').focus(function () {
    $(this).parent().find(".label-txt").addClass('label-active');
});

$("#input-data").focusout(function () {
    if ($(this).val() == '') {
        $(this).parent().find(".label-txt").removeClass('label-active');
    };
});

function checkVal() {
    if ($("#input-data").val() !== "") {
        $("#answer").attr("disabled", false);
        $("#answer").removeClass("disabled");
    }
    else {
        $("#answer").attr("disabled", true);
        $("#answer").addClass("disabled");
    }
}

$(document).ready(function () {
    if ($("#input-data").val() !== "") {
        $("#answer").attr("disabled", false);
        $("#answer").removeClass("disabled");
    }
    else {
        $("#answer").attr("disabled", true);
        $("#answer").addClass("disabled");
    }
});

function setupQuizGrid(event) {
    count = 0;
    score = 0;
    scoreCounterBoxes = 0;
    $("#" + event.id + "> span").text("");
    $("#" + event.id + "> span").addClass("fa fa-anchor");
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

    $.grep(quizSets, function (index) {
        if (choice !== index) {
            $("#set-" + index).css("pointer-events", "none");
        }
    });
    $("#data-container").addClass("fade-in");
    createScoreChecker();
    setupScoreChecker();
    $("#score-checker").addClass("fade-in");
    $("#data-container").css("opacity", 1);
    $("#score-checker").css("opacity", 1);
    $("#empty-quiz-container-message").text("You have selected set " + choice + ". Please wait while we set up the quiz deck.");
    createLoader();
    setTimeout(setupNextQuestion, 3000);
}

function revealClue(index) {
    if ($("#clue-icon-" + index).hasClass("fa-lock")) {
        $("#clue-icon-" + index).removeClass("fa-lock").addClass("fa-unlock-alt");

        $("#clue-container-" + index).removeClass("has-animation-active")
        $("#clue-container-" + index).removeClass('animation-rtl');
        $("#clue-container-" + index).removeClass('animate-out');

        $("#clue-container-" + index).addClass('animate-in');
        $("#clue-container-" + index).addClass('animation-ltr');
        $("#clue-container-" + index).addClass('has-animation');
    }
    else if ($("#clue-icon-" + index).hasClass("fa-unlock-alt")) {
        $("#clue-icon-" + index).removeClass("fa-unlock-alt").addClass("fa-lock");

        $("#clue-container-" + index).removeClass('animate-in');
        $("#clue-container-" + index).removeClass('animation-ltr');
        $("#clue-container-" + index).removeClass('has-animation');

        $("#clue-container-" + index).addClass("has-animation-active")
        $("#clue-container-" + index).addClass('animation-rtl');
        $("#clue-container-" + index).addClass('animate-out');
    }
};

function createScoreChecker() {
    $("<div/>", {
        "id": "score-checker-graph"
    })
        .appendTo($("#score-checker"));
}

function setupScoreChecker() {
    if (scoreCounterBoxes < 25) {
        $("<div/>", {
            "id": "score-" + (scoreCounterBoxes + 1),
            "style": "padding: 5px; grid-row-start:" + orientation[scoreCounterBoxes].split("~")[0] + "; grid-row-end:" + orientation[scoreCounterBoxes].split("~")[1] +
                "; grid-column-start:" + orientation[scoreCounterBoxes].split("~")[2] + "; grid-column-end:" + orientation[scoreCounterBoxes].split("~")[3] + ";"
        }).append($("<label/>").text(scoreCounterBoxes + 1))
            .appendTo($("#score-checker-graph"));
        scoreCounterBoxes++;
        setupScoreChecker();
    }
}

$('#about').click(function () {
    $('#overlay').addClass('open');
});

function closeModal() {
    $('#overlay').removeClass('open');
}

function typewriterEffect(data) {
    var result = "";
    for (let i = 0; i < data[0].length; i++) {
        setTimeout(function () {
            result += data[0][i];
            $("#answer-message").html(result);
        }, 50 * i);
    }
}


function createLoader() {
    $("<div/>", {
        "class": "loader"
    }).append($("<div/>", {
        "class": "loader-icon"
    })).append($("<div/>", {
        "class": "loader-icon loader-delay"
    })).append($("<div/>", {
        "class": "loader-icon loader-delay"
    })).append($("<div/>", {
        "class": "loader-icon"
    }))
        .appendTo($("#quiz-container"));
}