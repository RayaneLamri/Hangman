//Where the random word is displayed asigned
const target = document.getElementById("target");

//Lives and the collection of responses in the form of letters and booleans and good responses init
let word;
let lives = 10;
let res = [];
let tries = [];
let guesses = [];

//Canevas init
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 7;

//-----------------------------------------------------------------------------

//At almost each step it asks itself 'it the end?', because of a mistake or a victory or simply because you waste all you chances...
const isEndGame = (word, arr) => {
  Array.from(document.getElementsByTagName("a")).filter(item => item.textContent == res.slice(-1)[0]).map(item => item.style.backgroundColor = tries.slice(-1)[0] == true ? "#1B998B" : "#FF1654"); 
  if(lives == 0 || guesses.length == word.length){endGame(word, arr)};
}

//end game handler
const endGame = (word, arr) => {
   guesses.length == word.length ? alert("YOU WIN!") : alert("You've lost! It was: " + word.join(""));
   clear(word, arr);   
 }

//Add one counter and go to the next step, is a good or a bad call
 const newInput = (word, arr, input) => {
   tries.push(word.indexOf(input) != -1);
   isEndGame(word, arr);
   tries.slice(-1)[0] == true ? good(word, arr, input) : draw(word, arr, input);
 }

//Good awsers handler
 const good = (word, arr, guess) => {
   arr = arr.map((element,i) => element = word[i] == guess ? returnMap(guess) : element);
   target.innerText = arr.join(" ");
   isEndGame(word, arr);
 }

//Push the good anwser in an array
 const returnMap = (letter) => {
   guesses.push(letter);
   return letter;
 }

 // Canevas handler-----------------------------------------------------------------------------

const draw = (word, arr) => {
  --lives;
  switch (10-lives) {
    case 1:
      ctx.beginPath();
      ctx.moveTo(50, 130);
      ctx.lineTo(150, 130);
      ctx.stroke();
      break;
    case 2:
      ctx.beginPath();
      ctx.moveTo(70, 130);
      ctx.lineTo(70, 10);
      ctx.stroke();
      break;
    case 3:
      ctx.beginPath();
      ctx.moveTo(70, 10);
      ctx.lineTo(200, 10);
      ctx.stroke();
      break;
    case 4:
      ctx.beginPath();
      ctx.moveTo(200, 10);
      ctx.lineTo(200, 30);
      ctx.stroke();
     break;
     case 5:
       ctx.beginPath();
       ctx.arc(200, 40, 10, 0, 10 * Math.PI);
       ctx.stroke();
       break;
    case 6:
      ctx.beginPath();
      ctx.moveTo(200, 50);
      ctx.lineTo(200, 90);
      ctx.stroke();
      break;  
    case 7:
      ctx.beginPath();
      ctx.moveTo(200, 90);
      ctx.lineTo(180, 120);
      ctx.stroke();
      break;
    case 8:
      ctx.beginPath();
      ctx.moveTo(200, 90);
      ctx.lineTo(220, 120);
      ctx.stroke();
    break;
    case 9:
      ctx.beginPath();
      ctx.moveTo(200, 60);
      ctx.lineTo(220, 80);
      ctx.stroke();
    break;
    case 10:
      ctx.beginPath();
      ctx.moveTo(200, 60);
      ctx.lineTo(180, 80);
      ctx.stroke();
    break;
  }
  isEndGame(word, arr);
}

 // Clean everything and restart the game-----------------------------------------------------------------------------

 const clear = (word, arr) => {
   arr = Array.from({length: word.length}, element => element = "_");
   document.getElementById("target").innerText = Array.from({length: word.length}, element => element = "_").join(" ");
   Array.from(document.getElementsByTagName("a")).map(item => item.style.backgroundColor = "");
   guesses = [];
   tries = [];
   lives = 10;
   res = [];
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   debut();
}

// API for random words-----------------------------------------------------------------------------

const debut = () => fetch("https://random-word-form.herokuapp.com/random/animal").then((response) => response.json()).then((data) => {
  console.log(data[0].toUpperCase())
  word = Array.from(data[0].toUpperCase());
  let arr = Array.from({length: word.length}, (element, i) => element = word[i] != " " || "-" ? "_" : word[i] == "-" ? "-" : " ");
  target.innerText = arr.join(" ");
  
  
  // UNCOMMENT FOR DEV console.log(word);



// Keypad event-----------------------------------------------------------------------------

/*Each time you press a key on your pad, it checks if: 
    - one, does the key exists on the displayed keyboard;
    - two, if it does it sends the key to the next method to process.  */

 document.body.addEventListener("keyup", (e) => {
   Array.from(document.getElementsByTagName("a")).forEach(item => {
     if(e.key.toUpperCase() == item.innerText && res.indexOf(item.innerText) == -1){
       res.push(item.innerText);
       newInput(word, Array.from(Array.from(target.innerText).filter(element => element != " ")), item.innerText);
      }
    })
  })

 document.getElementById("newGame").addEventListener("click", clear);

 });

//Page loaded? Let's start the game!
 (debut());

 // Keypad generator-----------------------------------------------------------------------------

Array.from({length:26}, (_, i) => String.fromCharCode(65 + i)).map(
  (k,i) => ["<a href='#' style='grid-area:span" + i + "'>" + k + "</a>"]).map(
  item => document.querySelector("#container").innerHTML += item.join(""));