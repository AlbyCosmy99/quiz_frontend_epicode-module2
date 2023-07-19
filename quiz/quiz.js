import { questions } from "../questions/questions.js"

let shuffledQuestions = shuffleAnswers(questions)

let points = 0;

let index = 0;

let inputButtons = []
const INPUT_ATTRIBUTE_NAME = 'question'

const QUESTION_CLASS_NAME = 'question'
const ANSWERS_CONTAINER_ID_NAME = 'answers'
const PROCEED_BTN_ID_NAME = 'proceedBtn'
const QUESTION_TEXT_ID_NAME = 'titleQuiz'
const QUESTION_NUMBER_ID_NAME = 'questionNumber'

const MAX_QUESTIONS = shuffledQuestions.length

let answersContainer = document.querySelector('#' + ANSWERS_CONTAINER_ID_NAME)
let questionContainer = document.querySelector('#' + QUESTION_TEXT_ID_NAME)
let questionNumberTag = document.querySelector('#' + QUESTION_NUMBER_ID_NAME)

window.onload = function load(){
    nextQuestion()
    const btn = document.querySelector('#' + PROCEED_BTN_ID_NAME)
    btn.addEventListener('click',nextQuestion)
}

function nextQuestion() {
    if(index > 0) {
        const previousQuestion = shuffledQuestions[index - 1];
        inputButtons = document.querySelectorAll('input[type=radio]')
        for(const inputButton of inputButtons) {
            if(inputButton.checked) {
                if(inputButton.value === previousQuestion.correct_answer) { 
                    points++;
                }
            }
        }
    }

    if(index >= shuffledQuestions.length){
        showResults()
        return 
    }

    questionNumberTag.innerHTML = index + 1 + '/' + MAX_QUESTIONS
    
    showQuestionAndAnswers()
    inputButtons = []
}

function showQuestionAndAnswers() {
    const question = shuffledQuestions[index];

    let answers = question.incorrect_answers
    answers.push(question.correct_answer)
    answers = shuffleAnswers(answers)

    questionContainer.innerHTML = ''
    answersContainer.innerHTML = ''

    let h2 = document.createElement('h2')
    h2.className = QUESTION_CLASS_NAME
    h2.innerHTML = question.question
    questionContainer.appendChild(h2)

    for(let i = 0; i < answers.length; i++) {
        let input = document.createElement('input')
        input.setAttribute('type', 'radio')
        input.setAttribute('name', INPUT_ATTRIBUTE_NAME)

        answersContainer.appendChild(input);
        input.value = answers[i]
        input.outerHTML += answers[i]
    }

    index++;
}

function shuffleAnswers(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function showResults() {
     
}
