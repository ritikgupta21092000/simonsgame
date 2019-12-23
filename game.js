var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red" , "blue" , "green" , "yellow"];
var randomChosenColor;
var randomNumber;
var userChoosenColor;
var level = 0;
var userClickedPattern_length;
var start_to_toggle = false;

$(document).keypress(function() {
  if(start_to_toggle != true) {
  randomSequence();
  start_to_toggle = true;
  }

});

$(".btn-primary").click(function() {
  if(start_to_toggle != true) {
  randomSequence();
  start_to_toggle = true;
  }
});

function randomSequence() {
  userClickedPattern = [];
  $("h1").text("Level "+(++level));
    randomNumber = Math.random();
    randomNumber =Math.floor(randomNumber * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(300).fadeIn(300);
    makeSound(randomChosenColor);
  }

function makeSound(randomChosenColor) {
    var audio = new Audio("sounds/"+randomChosenColor+".mp3");
    audio.play();
}

$(".btn").click(function() {
  userChoosenColor = $(this).attr("id");
  animatePress(userChoosenColor);
  userClickedPattern.push(userChoosenColor);
  // console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
  makeSound(userChoosenColor);

});


function animatePress(currentColor) {
  $("."+currentColor).addClass("pressed");
  setTimeout(function() {
    $("."+currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        randomSequence();
      },1000);
    }

    }
    else {
      $("body").addClass("game-over");
      var audio = new Audio("sounds/"+"wrong"+".mp3");
      audio.play();
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over,press any key to restart");
      startOver();
  }
}

function startOver() {
  gamePattern = [];
  level = 0;
  start_to_toggle = false;
}
