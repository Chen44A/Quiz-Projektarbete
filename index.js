const questions = [
    {
        num:1,
        question: "1. Is the Chinese New Year determined by the lunar calendar rather than the Gregorian calendar?",
        type: "trueFalse",
        options: ["true","false"],
        answer: ['true']
    },
    {
        num:2,
        question: "2. [multipleChoice] Which of the following are Chinese inventions?",
        type: "multipleChoice",
        options: ["Gunpowder", "Paper", "Compass", "Printing"],
        answer: ["Gunpowder", "Paper", "Compass", "Printing"],
    },
    {
        num:3,
        question: "3. Does China have 56 different ethnic groups?",
        type: "trueFalse",
        options: ["true","false"],
        answer: ["true"],
    },
    {
        num:4,
        question: "4. Does China have over 100 languages?",
        type: "trueFalse",
        options: ["true", "false"],
        answer: ["true"]
    },
    {
        num:5,
        question: "5. Which city is the capital of China?",
        type: "singleChoice",
        options: ["Shanghai", "Beijing", "Hong Kong", "Guangzhou"],
        answer: ["Beijing"]
    },
    {
        num:6,
        question: "6. [multipleChoice] What are some of the most famous Chinese architectural landmarks?",
        type: "multipleChoice",
        options: ["The Forbidden City","The Great Wall", "Oriental Pearl Tower","Eiffel Tower"],
        answer: ["The Forbidden City","The Great Wall", "Oriental Pearl Tower"]
    },
    {
        num:7,
        question: "7. [multipleChoice] Which of the following are traditional Chinese festivals?",
        type: "multipleChoice",
        options: ["Qingming Festival", "Dragon Boat Festival", "Christmas", "Mid-Autumn Festival"],
        answer: ["Qingming Festival", "Dragon Boat Festival", "Mid-Autumn Festival"]
    },
    {
        num:8,
        question: "8. Which of the following is the currency unit in China?",
        type: "singleChoice",
        options: ["Dollar", "Euro", "Renminbi (RMB)", "Yen"],
        answer: ["Renminbi (RMB)"],
    },
    {
        num:9,
        question: "9. Which of the following is a traditional Chinese food?",
        type: "singleChoice",
        options: ["Pizza", "Dumplings","Hamburger","Pasta"],
        answer: ["Dumplings"]
    },
    {
        num:10,
        question: "10. The highest peak in China is?",
        type: "singleChoice",
        options: ["Mount Everest", "The Alps", "Mount Fuji", "Mount Huangshan"],
        answer: ["Mount Everest"]
    }
]

//dark mode feature
const darkMode = document.querySelector('#darkMode');
  darkMode.addEventListener('click',()=> {
    document.body.classList.toggle('darkmode');
 
  });

//set variables
const quizContainer = document.querySelector('#quiz_container');
const questionContainer = document.querySelector('#question_container');
const optionsContainer = document.querySelector('#options_container');
const toNextQue = document.querySelector('#toNextQue');
const section = document.querySelector('section');
const result = document.querySelector('#result');


//set start feature
  const startQuiz = document.querySelector('#start');
  const startBtn = document.querySelector('#go');
  quizContainer.style.display = 'none';
  startBtn.addEventListener('click',()=>{
    startQuiz.style.display = "none";
    quizContainer.style.display = '';
  })
 
// set load question process
  let score = 0;
  let currentQuestion = 0;
  
  const loadQuestion = () => {
    const currentQuiz = questions[currentQuestion];
    questionContainer.innerText = currentQuiz.question;
    //empty questions and options
    optionsContainer.innerHTML = '';

    if (currentQuiz.type === 'trueFalse' || currentQuiz.type === 'singleChoice') {
        currentQuiz.options.forEach((option,index) => {
            const input = document.createElement('input');
            input.type = 'radio';
            input.value = option;
            input.name = `num${currentQuiz.num}`; 
            input.id = index
            optionsContainer.appendChild(input);
            
            const label = document.createElement('label');
            label.innerText = option;
            label.setAttribute('for',index)
            optionsContainer.appendChild(label);
            optionsContainer.appendChild(document.createElement('br'));
        });
    }else if (currentQuiz.type === 'multipleChoice') {
        currentQuiz.options.forEach((option ,index) => {
          const input = document.createElement('input');
          input.type = 'checkbox';
          input.value = option;
          input.name = `num${currentQuiz.num}`; 
          input.id = index
          optionsContainer.appendChild(input);
    
          const label = document.createElement('label');
          label.innerText = option;
          label.setAttribute('for',index)
          optionsContainer.appendChild(label);
          optionsContainer.appendChild(document.createElement('br'));
        });
    }
    // set submit button efter option selected
    let seletedInput = document.querySelectorAll('#options_container input')
    const submitBtn = document.createElement('div');
    submitBtn.innerHTML = `<button>Next</button>`;
    
    toNextQue.innerHTML= "";
    seletedInput.forEach((radioBtn)=>{
        radioBtn.addEventListener('change',()=>{
            toNextQue.appendChild(submitBtn);
            // add check restult feature on button
            submitBtn.addEventListener('click',checkAnswer);
        }) 
    })
}
let userAnswer = [];
// set check point stystem
  let checkAnswer = () => {
    const currentQuiz = questions[currentQuestion];
    //alternativ 1 collect all of the checked value in a new array
    const selectedRadios =Array.from(document.querySelectorAll('input[type="radio"]:checked'));
    let radioValue = selectedRadios.map(radio => {
        return radio.value;
    })
    //alternativ 2  这里.map()缩写要注意内(),{}是没有的
    const selectedCheckboxes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(chexbox => chexbox.value);
  
    if(document.querySelectorAll('input[type="radio"]').length > 0){
        radioValue.forEach((value) => { 
            userAnswer.push(value);
        })
        // userAnswer.push(radioValue.toString());
    } else if (document.querySelectorAll('input[type="checkbox"]')){
        userAnswer.push(selectedCheckboxes.toString());
    }

  //check the answer and calculate the score.
    let isEqual1 = JSON.stringify(radioValue) === JSON.stringify(currentQuiz.answer);
    let isEqual2 = JSON.stringify(selectedCheckboxes) === JSON.stringify(currentQuiz.answer);
    if (isEqual1 === true || isEqual2 === true){
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    }else {
        showResult();
    }
  }

// show result feature
let showResult = () => {
    if (score < questions.length * 0.5){
        quizContainer.style.color = 'red';
        quizContainer.innerHTML = `<div><h2>Sorry, you failed!</h2> <p>Your score is: ${score} / ${questions.length}</p></div>`
    } else if ( score < questions.length * 0.75){
        quizContainer.style.color = 'orange';
        quizContainer.innerHTML = `<div><h2>Well done!</h2> <p>Your score is: ${score} / ${questions.length}</p></div>`
    }else{
        quizContainer.style.color = 'green';
        quizContainer.innerHTML = `<div><h2>Excellent!</h2> <p>Your score is: ${score} / ${questions.length}</p></div>`
    }
    let myAnswer = document.createElement('button');
    myAnswer.innerText= 'My Answer';
    quizContainer.append(myAnswer);
    myAnswer.addEventListener('click', showMyAnswer);
}



let showMyAnswer = () => {
    result.innerHTML = "";
    const facitArray = questions.map((data)=> {
        return data.answer.join(',')
    })
    const questionArray = questions.map((question)=> {
        return question.question
    })
    
    for (let i = 0; i < userAnswer.length; i++) {
        if (userAnswer[i] !== facitArray[i]){
            let li = document.createElement('li');
                li.innerHTML = `${questionArray[i]} <p>[ ✗ ] Your answer: ${userAnswer[i]} <p>[ ✓ ] Right answer: ${facitArray[i]}</p></p><br>`
                result.append(li)
                section.style.display = "none"
                result.style.display ="";
        }
    }
    let replay = document.createElement('button');
    replay.innerText = 'Play Again';
    result.append(replay)
    replay.addEventListener('click', (event)=>{
        event.preventDefault();
        location.reload()
    });
}

loadQuestion();
