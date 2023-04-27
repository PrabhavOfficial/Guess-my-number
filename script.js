'use strict';
/*

//..................Selecting and manipulating elements..................

console.log(document.querySelector('.message').textContent); // to select an element in DOM manipulation we write document.querySelector(). here we use message class from HTML Document and .textContent to show the text that this class holds. here we start with reading the content of the element.
document.querySelector('.message').textContent = '🎉 Correct Number!';
//here we manipulated the text content of one of the DOM nodes. we change start guessing... to Correct Number!.this is DOM Manipulation.

document.querySelector('.number').textContent = 13; // to select secret number element form number class in HTML Document

document.querySelector('.score').textContent = 10; // to select score element form score class in HTML Document.

document.querySelector('.guess').value = 23; // here we manipulated the above guess class
console.log(document.querySelector('.guess').value); // to select input element from guess class, but the big difference is that in "input field" to get the actual value we use .value property.

*/

//...........................Handling click Events............................

//here this is gonna be the first time that our code reacts to something that happens in the DOM for that we have to event listner. An event is something that happens on a page then in event listner we can wait for a certain event to happen and then react to it.

//here we need the random number b/w 1 to 20 .
let secretNumber = Math.trunc(Math.random() * 20) + 1; //here we defined the secret no. outside the button handler because we only need to define the secret no. once, but if we define the secret no. inside of button handler then in each click we get the new secret no. which is not the correct scenario here.

let score = 20; // here the game wants that in each wrong guess the score is decrease by 1 so we initially take the score variable and assign the value 20 because initially the score is 20.
let highscore = 0;

//here we have multiple messages and whenevr that happens we can also refractor the same code into a function and call the function in all the places where we have to duplicate code.
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

//note:- in above secret no. we add + 1 because without +1 it will only include (0 to 19)

//here we first select the element from .check class and a Event listener and give a click type of the event and function to get the actual value for .guess class then we store it in a variable guess then log it in console.
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  //note:- whenever we get something form the user interface for example form an input field it usually always is a string so when we want to compare no. to a no. we first need to convert that string into number using Number function.

  console.log(guess, typeof guess);

  //   document.querySelector('.message').textContent = '🎉 Correct Number!'; // here we also doing DOM manipulation which is onclick it gives the text Correct Number!

  //when there is no input...............
  //here we use if block statement because if we click the button without giving any no. to it ,it gives 0 in console but remember 0 is a falsy value so guess is false now then we use not operator ! to invert the value to true to make the if block of code executed.
  if (!guess) {
    // document.querySelector('.message').textContent = '⛔ No Number!';

    //instead to doing above code use function that we created above to display in order to get a DRY code.
    displayMessage('⛔ No Number!'); // here we calling the function.

    //when player wins...................
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = '🎉 Correct Number!';
    displayMessage('🎉 Correct Number!');

    document.querySelector('.number').textContent = secretNumber; // for checking it is working or not. here we display correct no.

    //here we manipulate the CSS :- here we select whole body element.
    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem'; // here we change the width of the secretnumber if player wins.

    if (score > highscore) {
      // here we implementing high score logic.
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }
  // here we doing refractoring to eleminate the duplicate code.

  //when guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      // this if block is used to begin this below scenario when score is above 1 otherwise it will continue to decreasing the score by 1 in continuos click .
      // document.querySelector('.message').textContent =
      //   guess > secretNumber ? '📈Too High!' : '📉Too Low!'; // here we using ternary operator to eliminate duplicate code.
      displayMessage(guess > secretNumber ? '📈Too High!' : '📉Too Low!');
      score = score - 1;
      document.querySelector('.score').textContent = score; // to display score
    } else {
      // document.querySelector('.message').textContent = '🧨You lost the game!';
      displayMessage('🧨You lost the game!');
      document.querySelector('.score').textContent = 0; // here we update the score to 0 when we lost the game.
    }
  }

  //when guess is Too High...............
  // } else if (guess > secretNumber) {
  //   if (score > 1) {
  //     // this if block is used to begin this below scenario when score is above 1 otherwise it will continue to decreasing the score by 1 in continuos click .
  //     document.querySelector('.message').textContent = '📈Too High!'; // wrong guess situation
  //     score = score - 1;
  //     document.querySelector('.score').textContent = score; // to display score
  //   } else {
  //     document.querySelector('.message').textContent = '🧨You lost the game!';
  //     document.querySelector('.score').textContent = 0; // here we update the score to 0 when we lost the game.
  //   }

  //   //when guess is Too Low...............
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📉Too Low!'; // wrong guess situation
  //     score = score - 1;
  //     document.querySelector('.score').textContent = score; // to display score
  //   } else {
  //     document.querySelector('.message').textContent = '🧨You lost the game!';
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20; // initial value of score.
  secretNumber = Math.trunc(Math.random() * 20) + 1; // reassigning secretnumber after clicking the again button

  // document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});

// also note here that we do not called this function here we only define the function here and then pass into the event handler but it is the javaScript engine who will call this function as soon as the event happens.

//Coding Challenge #1.......................

// Implement a game rest functionality, so that the player can make a new guess!
// Your tasks:
// 1. Select the element with the 'again' class and attach a click event handler
// 2. In the handler function, restore initial values of the 'score' and
// 'secretNumber' variables
// 3. Restore the initial conditions of the message, number, score and guess input
// fields
// 4. Also restore the original background color (#222) and number width (15rem)
