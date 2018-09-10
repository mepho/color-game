var colors = [];
var pickedColor;
var difficulty = "hard";
var squares = document.querySelectorAll(".color_squares");
var pickedColorSpan = document.querySelector("#pickedColor");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var newColors = document.querySelector("#newColors");
var easyBtn = document.querySelector("#easy");
var hardBtn = document.querySelector("#hard");

init();

function init() {
	easyBtn.addEventListener("click", function(){
		hardBtn.classList.remove("selected");
		easyBtn.classList.add("selected");
		difficulty = "easy";
		resetColors(difficulty);
		for (var i = 3; i < squares.length; i++) {
			eraseSquare(squares[i]);
		}
	});

	hardBtn.addEventListener("click", function(){
		easyBtn.classList.remove("selected");
		hardBtn.classList.add("selected");
		difficulty = "hard";
		resetColors(difficulty);
	});

	newColors.addEventListener('click', function(){
		newColors.textContent = "New Colors";
		h1.style.backgroundColor = "rgb(86, 124, 165)";
		resetColors(difficulty);
	});

	resetColors(difficulty);
}

// Creating functions to pick a random RGB color
function getRandomRGB(){
	var r = getRandomNumber(0,255);
	var g = getRandomNumber(0,255);
	var b = getRandomNumber(0,255);
	var randomRGB = "rgb(" + r + ", " 
						   + g + ", " 
						   + b + ")";
	return randomRGB;
}

function getRandomNumber(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is exclusive and the minimum is inclusive
}

function generateRandomColors(num){
	var colors = [];
	for (var i = 0; i < num; i++) {
		colors.push(getRandomRGB());
	}
	return colors;
}

// Abstracting functions for sub-tasks
function compareColors(square) {
	if(square.style.backgroundColor === pickedColor) {
		setSquareColor(pickedColor);
		messageDisplay.textContent = "Correct!";
		h1.style.backgroundColor = pickedColor;
		newColors.textContent = "Play Again?"
	} else {
		eraseSquare(square);
	}
}

function setSquareColor(color) {
	for (var i = 0; i < colors.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function eraseSquare(square){
	square.style.backgroundColor = window.getComputedStyle(document.body).backgroundColor;
}

function resetColors(difficulty) {
	if(difficulty==="hard"){
		colors = generateRandomColors(6);
		pickedColor = colors[getRandomNumber(0,5)];
	} else {
		colors = generateRandomColors(3);
		pickedColor = colors[getRandomNumber(0,2)];
	}
	
	// Setting the color of the squares and adding listener to evaluate user clicks
	for (var i = 0; i < colors.length; i++) {
		squares[i].style.backgroundColor = colors[i];
		squares[i].addEventListener('click', function(square) {
			compareColors(this);
		});
	}
	
	// Styling the color header
	pickedColorSpan.textContent = pickedColor.toUpperCase();
	messageDisplay.textContent = "";
}











