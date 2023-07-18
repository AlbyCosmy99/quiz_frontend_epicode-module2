import { questions } from "../questions/questions.js"

let points = 0;

let index = 0;
let inputButtons = []
let questionContainer = document.querySelector('.questionContainer')
const INPUT_ATTRIBUTE_NAME = 'question'
const QUESTION_CLASS_NAME = 'question'
const POINTS_TEXT_PREVIEW = 'Points: '

let pointsText = document.querySelector('.points')

window.onload = function load(){
    if(pointsText !== null) {
        pointsText.innerHTML = POINTS_TEXT_PREVIEW + points
    }
    nextQuestion()  
    const btn = document.querySelector('.btn')
    btn.addEventListener('click',nextQuestion)
}

function nextQuestion() {
    if(index > 0) {
        const previousQuestion = questions[index - 1];
        inputButtons = document.querySelectorAll('input[type=radio]')
        for(const inputButton of inputButtons) {
            if(inputButton.checked) {
                if(inputButton.value === previousQuestion.correct_answer) { 
                    points++;
                    pointsText.innerHTML = POINTS_TEXT_PREVIEW + points
                }
            }
        }
    }
    inputButtons = []

    if(index >= questions.length){
        savePoints()
        showResults()
    }

    showQuestion()
}

function showQuestion() {
    const question = questions[index];

    let answers = question.incorrect_answers
    answers.push(question.correct_answer)
    answers = shuffleAnswers(answers)

    questionContainer.innerHTML = ''

    let h2 = document.createElement('h2')
    h2.className = QUESTION_CLASS_NAME
    questionContainer.appendChild(h2)

    let questionText = document.querySelector('.' + QUESTION_CLASS_NAME)
    questionText.innerHTML = question.question

    for(let i = 0; i < answers.length; i++) {
        let input = document.createElement('input')
        input.setAttribute('type', 'radio')
        input.setAttribute('name', INPUT_ATTRIBUTE_NAME)

        questionContainer.appendChild(input);
        input.value = answers[i]
        input.outerHTML += answers[i]
    }

    index++;
}

function shuffleAnswers(arr) {
    return arr.sort(() => Math.random() - 0.5); 
}

function showResults() {
    window.location.href = '../results/results.html'
}

function savePoints() {
    sessionStorage.setItem('points', points)
}
