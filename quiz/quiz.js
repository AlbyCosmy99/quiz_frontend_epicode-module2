import { questions } from "../questions/questions.js"

let shuffledQuestions = shuffleAnswers(questions)

let points = 0;

let index = 0;

const TIME_PER_QUESTION = 360
let timeouts = []

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
    for(let timeout of timeouts) {
        clearTimeout(timeout)
    }

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

    timeout()
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
        let div = document.createElement('div')
        div.className = 'item'

        answersContainer.appendChild(div);

        let input = document.createElement('input')
        input.setAttribute('type', 'radio')
        input.setAttribute('name', INPUT_ATTRIBUTE_NAME)
        div.appendChild(input);

        let label = document.createElement('label')
        label.innerHTML = answers[i]
        div.appendChild(label);
    }

    index++;
}

function shuffleAnswers(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function log() {
    console.log('ok')
}


//results

function showResults() {
    let resultsContainer = document.querySelector('.results')
    let testContainer = document.querySelector('.testing')

    let pointsText = document.querySelector('#points')
    let percentage = (points/MAX_QUESTIONS)*100
    pointsText.innerHTML = points + '/' + MAX_QUESTIONS + ' (' + percentage + '%)'

    let wrongPointsText = document.querySelector('#wrong-points')
    let wrongPercentage = ((MAX_QUESTIONS - points)/MAX_QUESTIONS)*100
    wrongPointsText.innerHTML = (MAX_QUESTIONS - points) + '/' + MAX_QUESTIONS + ' (' + wrongPercentage + '%)'

    let finalText = document.querySelector('#finalText')

    const PASSED_TEST_POINTS = Math.ceil((shuffledQuestions.length*6)/10)

    if(points >= PASSED_TEST_POINTS) {
        finalText.innerHTML = 'Complimenti, Hai superato il test!'
    }
    else {
        finalText.innerHTML = 'Peccato, non hai superato il test!'
    }


    //circular points rapresentation
    let circularResults = document.querySelector('.circularPercentageVisualization')
    let pointsDeg = (percentage*360)/100
    circularResults.style.background = 'conic-gradient(#9D1D8F 0deg ' + (360 - pointsDeg) + 'deg, #00FFFF ' + (360 - pointsDeg) + 'deg 360deg)'


    //show results
    resultsContainer.style.display = 'block'
    testContainer.style.display = 'none'
}


//countdown 

function setTime(start, timeout) {
    let time = document.querySelector('#time')
    timeouts.push(
        setTimeout(function(){
            time.innerHTML = start
    
            if(start === 0) {
                nextQuestion()
            }
        },timeout)
    ) 
}

function timeout(timeout = 1000) {
    let _start = TIME_PER_QUESTION
    let currentTime = TIME_PER_QUESTION
    while(currentTime >= 0){
        let timeValue = (_start-currentTime) + 1
        setTime(currentTime--, 1000*timeValue)
    }
}