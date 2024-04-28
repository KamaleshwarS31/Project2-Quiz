const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')

const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click',startGame)
nextButton.addEventListener( 'click' , () => {
    currentQuestionIndex++
    nextQuestion()
})

function startGame(){
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.randon() -0.5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove( 'hide' )
    nextQuestion()
    quizScore=0
}
function nextQuestion(){
    resetState();
    loadQuiz(shuffledQuestions[currentQuestionIndex]);
}
function loadQuiz(questions){
    questionElement.innerText = questions.question;
    questions.answers.forEach(answers => {
        const button = document.createElement('button')
        button.innerText = answers.text;
        button.classList.add('btn')
        if(answers.correct){
            button.dataset.correct = answers.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonElement.appendChild(button)
    })
}
function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}
function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct

    setStatusClass(document.body, correct)
    Array.from(answerButtonElement.children).forEach((button)=>{
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex +1){
        nextButton.classList.remove('hide')
    }else{
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    if(correct){
        quizScore++
    }
    document.getElementById('right-answers').innerText = quizScore
}
function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}
function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
const questions = [
    {
        question: 'Which one of those is a JavaScript framework ?',
        answers: [
            {text: 'Python', correct:false},
            {text: 'Django', correct:false},
            {text: 'React', correct:true},
            {text: 'Eclipse', correct:false}
        ],
    },
    {
        question: 'Who is the prime minister of India ?',
        answers: [
            {text: 'Netaji Subaschandra Bose', correct:false},
            {text: 'Narendra Modi', correct:true},
            {text: 'Jawaharlal Nehru', correct:false},
            {text: 'Sivasubramani', correct:false}
        ],
    },
    {
        question: 'What is 4 * 3 = ?',
        answers: [
            {text: '10', correct:false},
            {text: '6', correct:false},
            {text: '15', correct:false},
            {text: '12', correct:true}
        ],
    },
]