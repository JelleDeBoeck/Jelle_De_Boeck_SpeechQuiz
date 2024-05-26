const questions = [
    {
        question: "Hoeveel dagen heeft een schrikkeljaar?",
        answer: "366"
    },
    {
        question: "Wat is de hoofdstad van Frankrijk?",
        answer: "Parijs"
    },
    {
        question: "Hoeveel poten heeft een spin?",
        answer: "8"
    },
    {
        question: "Welk land won het WK van 2022?",
        answer: "Argentinië"
    },
];

let currentQuestionIndex = 0;

const synth = window.speechSynthesis;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'nl-NL';

function startQuiz() {
    currentQuestionIndex = 0;
    document.getElementById('feedback').textContent = '';
    askQuestion();
}

function askQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex].question;
        document.getElementById('question').textContent = question;
        document.getElementById('feedback').textContent = ''; 
    } else {
        document.getElementById('question').textContent = "Je hebt de quiz voltooid!";
        document.getElementById('feedback').textContent = '';
    }
}

function speakQuestion() {
    const question = questions[currentQuestionIndex].question;
    const utterance = new SpeechSynthesisUtterance(question);
    synth.speak(utterance);
}

function startRecognition() {
    recognition.start();
}

recognition.onresult = function(event) {
    const spokenAnswer = event.results[0][0].transcript.toLowerCase();
    checkAnswer(spokenAnswer);
    recognition.stop(); 
};

recognition.onend = function() {
    if (currentQuestionIndex < questions.length) {
        recognition.start();
    }
};

function checkAnswer(answer) {
    const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();
    if (answer === correctAnswer) {
        document.getElementById('feedback').textContent = "Juist!";
    } else {
        document.getElementById('feedback').textContent = `Fout! Het juiste antwoord is ${questions[currentQuestionIndex].answer}`;
    }
    currentQuestionIndex++;
    setTimeout(askQuestion, 2000);
}
