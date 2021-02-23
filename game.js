const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0 
let availableQuestions = []

let questions = [
    {
        question: "When was 'Extra-Time' first introduced in football?",
        choice1: '1963',
        choice2: '1912',
        choice3: '1891',
        choice4: '1952',
        answer: 3,
    },
    {
        question: "Who has scored the most goals in a singular European football season?",
        choice1: 'Cristiano Ronaldo',
        choice2: 'Lionel Messi',
        choice3: 'Gerd Muller',
        choice4: 'Pele',
        answer: 2,
    },
    {
        question: "Which country won the 1987 Copa America final?",
        choice1: 'Uruguay',
        choice2: 'Brazi',
        choice3: 'Argentina',
        choice4: 'Colombia',
        answer: 1,
    },
    {
        question: "Who has the most caps for Angola?",
        choice1: 'Zito Luvumba',
        choice2: 'Pedro Concalves',
        choice3: 'Akwa',
        choice4: 'Flavio',
        answer: 4,
    },
    {
        question: "Which team received the most yellow cards in the 2010-11?",
        choice1: 'Wigan Athletic',
        choice2: 'Newcastle',
        choice3: 'Arsenal',
        choice4: 'Manchester City',
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questioncounter = 0 
    score = 0 
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

         }, 1000)

        })
    })


incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()