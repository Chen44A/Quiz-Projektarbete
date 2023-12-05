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
