// DECLARE & ASIGN-----------------------------------------------------------------------------

//Where the random word is displayed asigned
const target = document.getElementById("target");

//Lives and the collection of responses in the form of letters and booleans and good responses init
let lives = 10;
let res = [];
let tries = [];
let guesses = [];

//Canevas init
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 7;

// Keypad generator-----------------------------------------------------------------------------

Array.from({length:26}, (_, i) => String.fromCharCode(65 + i)).map(
  (k,i) => ["<a href='#' style='grid-area:span" + i + "'>" + k + "</a>"]).map(
  item => document.querySelector("#container").innerHTML += item.join(""));

//-----------------------------------------------------------------------------

// document.getElementById("screen").addEventListener("click", (e) => {
//   document.getElementById("container").classList.toggle("visible");
//   e.target.parentElement.style.display = "none";
// })


const isEndGame = (word, arr) => {
  console.log(arr);
  Array.from(document.getElementsByTagName("a")).filter(item => item.textContent == res.slice(-1)[0]).map(item => item.style.backgroundColor = tries.slice(-1)[0] == true ? "#1B998B" : "#FF1654"); 
  console.log(arr);  
  if(lives == 0 || guesses.length == word.length){endGame(word, arr)};
  console.log(arr);
}

const endGame = (word, arr) => {
   //Array.from(document.getElementById("target").innerText).filter(item => item != " ").join("") == word ? alert("YOU WIN") : alert("YOU'VE LOST");
   clear(word, arr);   
 }

 const newInput = (word, arr, input) => {
   tries.push(word.indexOf(input) != -1);
   console.log(tries);
   isEndGame(word, arr);
   tries.slice(-1)[0] == true ? good(word, arr, input) : draw(word, arr, input);
 }

 const good = (word, arr, guess) => {
   //picture("lion");
   console.log(arr);
   arr = arr.map((element,i) => element = word[i] == guess ? returnMap(guess) : element);
   console.log(arr);
   document.getElementById("target").innerText = arr.join(" ");
   console.log(arr);
   isEndGame(word, arr);
   console.log(arr);
 }

 const returnMap = (letter) => {
   guesses.push(letter);
   return letter;
 }

 // Canevas handler-----------------------------------------------------------------------------

const draw = (word, arr) => {
  //picture("cat");
  lives--;
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

 const clear = (word, arr) => {
   arr = Array.from({length: word.length}, element => element = "_");
   document.getElementById ("target").innerText = arr.join(" ");
   Array.from(document.getElementsByTagName("a")).map(item => item.style.backgroundColor = "");
   guesses = [];
   tries = [];
   lives = 10;
   res = [];
   //ctx.clearRect(0, 0, canvas.width, canvas.height);
}


fetch("https://random-word-form.herokuapp.com/random/animal").then((response) => response.json()).then((data) => {
  
  let word = Array.from(data[0].toUpperCase());
    let arr = Array.from({length: word.length}, element => element = "_");
    target.innerText = arr.join(" ");
    console.log(arr);

// EVENT-----------------------------------------------------------------------------

 document.body.addEventListener("keyup", (e) => {
   console.log(arr);
   Array.from(document.getElementsByTagName("a")).forEach(item => {
     if(e.key.toUpperCase() == item.innerText && res.indexOf(item.innerText) == -1){
       res.push(item.innerText);
       newInput(word, arr, item.innerText);
      }
    })
  })

 document.getElementById("newGame").addEventListener("click", clear);


    /*const picture = (animal) => {
   let requestUrl = "https://api.unsplash.com/search/photos?query=" + animal + "&fit=facearea&client_id=RTBdnYQXZLWgJdiIu1jSRaitf4HMVeVqTiUrplwOOzc";
    async () => {
      let randomImage = await getNewImage();
      document.querySelector('main').style.backgroundImage = "url('" + randomImage + "')" ;
      console.log(document.querySelector('main').style.backgroundImage);
    };

    async function getNewImage() {
      let randomNumber = Math.floor(Math.random() * 10);
      return fetch(requestUrl)
        .then((response) => response.json())
        .then((data) => {
          let allImages = data.results[randomNumber];
          return allImages.urls.thumb;
        });
    }
    }*/ 


 })