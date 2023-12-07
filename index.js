const questions = [
    {
        num:1,
        question: "JavaScript is a static language?",
        type: "trueFalse",
        options: ["ture,","false"],
        answer: ['false']
    },
    {
        num:2,
        question: "Which keyword declares a variable?",
        type: "multipleChoice",
        options: ["let", "const", "var", "def"],
        answer: ["let", "const", "var"]
    },
    {
        num:3,
        question: "What does HTML stand for?",
        type: "singleChoice",
        options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Tool Markup Language"],
        answer: ["Hyper Text Markup Language"]
    },
    {
        num:4,
        question: "Is CSS an abbreviation for Cascading Style Sheets?",
        type: "trueFalse",
        options: ["true", "false"],
        answer: ["true"]
    },
    {
        num:5,
        question: "Which of the following is not a programming language?",
        type: "singleChoice",
        options: ["Python", "Java", "HTML", "C++"],
        answer: ["HTML"]
    },
    {
        num:6,
        question: "React was developed by Google?",
        type: "trueFalse",
        options: ["true", "false"],
        answer: ["false"]
    },
    {
        num:7,
        question: "Which of the following is a way of data storage? (",
        type: "multipleChoice",
        options: ["Array", "Object", "String", "All of the above"],
        answer: ["Array", "Object"]
    },
    {
        num:8,
        question: "What is the full form of API?",
        type: "singleChoice",
        options: ["Apple Programming Interface", "Application Programming Interface", "Automated Programming Interface", "All Programming Interface"],
        answer: ["Application Programming Interface"]
    },
    {
        num:9,
        question: "In JavaScript, '===' is the same as '=='?",
        type: "trueFalse",
        options: ["true", "false"],
        answer: ["false"]
    },
    {
        num:10,
        question: "Which one is not a version control system?",
        type: "singleChoice",
        options: ["Git", "SVN", "Mercurial", "Python"],
        answer: ["Python"]
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
  const pointCurrentQue = document.querySelector('#current_que');

//set start feature
  const startQuiz = document.querySelector('#start');
  const startBtn = document.querySelector('#go');
  quizContainer.style.display = 'none';
  startBtn.addEventListener('click',()=>{
    startQuiz.style.display = "none";
    quizContainer.style.display = '';
  })

  let score = 0;
  let currentQuestion = 0;

  const loadQuestion = () => {
    const currentQuiz = questions[currentQuestion];

    questionContainer.innerText = currentQuiz.question;
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
    let seletedInput = document.querySelectorAll('#options_container input')

    seletedInput.forEach((input)=>{
         
        if(input.checked){
            const button = document.createElement('button');
            button.innerText = 'Submit';
          
            optionsContainer.appendChild(button);
        }
        console.log(input.value);
    })
  }
 
  loadQuestion();