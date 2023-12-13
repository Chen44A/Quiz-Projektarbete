const questions = [
    {
        num:1,
        question: "1. [trueFalse] Is the Chinese New Year determined by the lunar calendar rather than the Gregorian calendar?",
        type: "trueFalse",
        options: ["ture","false"],
        answer: ['ture']
    },
    {
        num:2,
        question: "2. [multipleChoice] Which of the following are Chinese inventions? ",
        type: "multipleChoice",
        options: ["Gunpowder", "Paper", "Compass", "Printing"],
        answer: ["Gunpowder", "Paper", "Compass", "Printing"],
    },
    {
        num:3,
        question: "3. [trueFalse] Does China have 56 different ethnic groups? ",
        type: "trueFalse",
        options: ["ture","false"],
        answer: ["ture"],
    },
    {
        num:4,
        question: "4. [trueFalse] Does China have over 100 languages? ",
        type: "trueFalse",
        options: ["true", "false"],
        answer: ["true"]
    },
    {
        num:5,
        question: "5. [singleChoice] Which city is the capital of China?",
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
        question: "8. [singleChoice] Which of the following is the currency unit in China?",
        type: "singleChoice",
        options: ["Dollar", "Euro", "Renminbi (RMB)", "Yen"],
        answer: ["Renminbi (RMB)"],
    },
    {
        num:9,
        question: "9. [singleChoice] Which is the largest internet company in China?",
        type: "singleChoice",
        options: ["Baidu", "Alibaba","Xiaomi","Tencent"],
        answer: ["Alibaba"]
    },
    {
        num:10,
        question: "10. [singleChoice] The highest peak in China is?",
        type: "singleChoice",
        options: ["Mount Everest", "The Alps", "Mount Fuji", "Mount Huangshan"],
        answer: ["Mount Everest"]
    }
]

//dark mode feature
const darkMode = document.querySelector('#darkMode');
  let isDarkMode = false;
  darkMode.addEventListener('click',()=> {
    if(!isDarkMode) {
    document.body.style.backgroundColor ="black";
    document.body.style.color ="white";
    } else {
    document.body.style.backgroundColor ="";
    document.body.style.color ="";
    }
    isDarkMode =!isDarkMode;
  });

//set variables
const quizContainer = document.querySelector('#quiz_container');
const questionContainer = document.querySelector('#question_container');
const optionsContainer = document.querySelector('#options_container');
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
    const submitBtn = document.createElement('button');
    submitBtn.innerText = 'Submit';
    
    seletedInput.forEach((radioBtn)=>{
        radioBtn.addEventListener('change',()=>{
            optionsContainer.appendChild(submitBtn);
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
        quizContainer.innerHTML = `<h2>Your score is: ${score} / ${questions.length}</h2> <p>Fail!</p>`
    } else if ( score < questions.length * 0.75){
        quizContainer.style.color = 'orange';
        quizContainer.innerHTML = `<h2>Your score is: ${score} / ${questions.length}</h2> <p>Good!</p>`
    }else{
        quizContainer.style.color = 'green';
        quizContainer.innerHTML = `<h2>Your score is: ${score} / ${questions.length}</h2> <p>Excellent!</p>`
    }
    let myAnswer = document.createElement('button');
    myAnswer.innerText= 'Show My Answer';
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
                li.innerHTML = `${questionArray[i]} <p>${userAnswer[i]} (${facitArray[i]})</p>`
                li.style.color = 'red';
                result.append(li)
        }
    }
}

loadQuestion();