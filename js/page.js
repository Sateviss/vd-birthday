
function correctResponse(event) {
    console.log("CORRECT");
    event.target.classList.add("btn-success");
    event.target.classList.remove("btn-secondary");
    readyNextQuestion();
}

function incorrectResponse(event) {
    console.log("WRONG");
    event.target.classList.add("btn-danger");
    event.target.classList.remove("btn-secondary");
    readyNextQuestion();
}

function readyNextQuestion() {
    seekVideo(PAUSE_AT);
    playVideo();
    let buttons = document.getElementsByClassName("btn-secondary");
    for (let i = 0; i < buttons.length; i++)
        buttons.item(i).onclick = null;
    let control = document.getElementById("control");
    control.innerText = "Следующий вопрос";
    control.onclick = () => window.location.href = NEXT_QUESTION;
    control.classList.remove("btn-primary");
    control.classList.add("btn-success");
}

function repeatVideo() {
    seekVideo(START_AT);
    playVideo();
}

function initialize() {
    const correctAnswer = ANSWERS[CORRECT];
    const shuffledAnswers = shuffleArray(ANSWERS);
    const newCorrectAnswerId = shuffledAnswers.findIndex(e => correctAnswer === e);
    for (let i = 0; i < shuffledAnswers.length; i++) {
        let button = document.getElementById("answer-" + i);
        button.innerText = shuffledAnswers[i];
        button.onclick = incorrectResponse;
        if (i == newCorrectAnswerId) {
            button.onclick = correctResponse;
        }
    }
    document.getElementById("title").innerText = TITLE;
    document.getElementById("question").innerText = TEXT;
    document.getElementById("control").innerText = "Повторить видео";
    document.getElementById("control").onclick = repeatVideo;
}

function showButtons() {
    document.getElementById("buttons").hidden = false;
}

document.addEventListener("DOMContentLoaded", function (event) {
    initialize();
    loadVideo(VIDEO_ID, START_AT, PAUSE_AT, END_AT, showButtons);
});