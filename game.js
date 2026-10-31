var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// 1. Listen for any keydown event to start the game
$(document).keydown(function(event) {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// 2. Detect when a colored button is clicked
$(".btn").click(function() {
  if (!started) return; // Prevent clicks before game starts

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// 3. Check user's answers against the game pattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// 4. Generate the next sequence step
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playSequence();
}

// 5. Replay the sequence for the player
function playSequence() {
  let i = 0;
  let interval = setInterval(function() {
    let colour = gamePattern[i];
    $("#" + colour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(colour);
    i++;
    if (i >= gamePattern.length) {
      clearInterval(interval);
    }
  }, 600);
}

// 6. Audio helper
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// 7. Visual button press flash
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// 8. Reset variables on game over
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}