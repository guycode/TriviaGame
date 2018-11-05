var quizArea = $("#quiz-area");
var beginningCounter = 30;

// Question set
var questions = [{
  question : '1. Which of the following set a record for being the youngest 100 point player?',
  answers : ['A. Wayne Gretzky',
         'B. Bobby Orr',
         'C. Rick MacLeish',
         'D. Dale Hawerchuck'],
 correctAnswer : 'D. Dale Hawerchuck',
  image :  "http://www.hockeydb.com/ihdb/photos/dale-hawerchuk-1997-53.jpg"
}, 

{
  question : '2. Out of the 4 players listed here who has the most "first-team" All-Star selections during his career?',
  answers : ['A. Ray Bourque',
         'B. Patrick Roy',
         'C. Joe Thorton',
         'D. Sidney Crosby'],
 correctAnswer : 'A. Ray Bourque',
  image :  "http://www.espn.com/media/classic/2001/0620/photo/bourque_ht.jpg"
}, 

{
  question : '3. Which was the first arena to feature on-ice advertising?',
  answers : ['A. Madison Square Garden',
         'B. Toronto Maple Leaf Gardens',
         'C. Joe Louis Arena',
         'D. Boston Gardens'],
  correctAnswer : 'B. Toronto Maple Leaf Gardens',
  image : "https://www.ctvnews.ca/polopoly_fs/1.1786279.1398186147!/httpImage/image.jpg_gen/derivatives/landscape_960/image.jpg"
}, 

{
  question : '4. Which of the following set a record for being the oldest player to win the Stanley Cup?',
  answers : ['A. Johnny Bower',
         'B. Ray Bourque',
         'C. Gordie Howe',
         'D. Dave Andreychuk'],
  correctAnswer : 'B. Ray Bourque',
  image : "http://www.espn.com/media/classic/2001/0620/photo/bourque_ht.jpg"
}, 

{
  question : '5. What was the first NHL team to win back-to-back Stanley Cup titles?',
  answers : ['A. Montreal Canadians',
         'B. Vancouver Canucks',
         'C. Ottowa Senators',
         'D. New York Rangers'],
  correctAnswer : 'C. Ottowa Senators',
  image : "https://upload.wikimedia.org/wikipedia/en/thumb/d/db/Ottawa_Senators.svg/220px-Ottawa_Senators.svg.png"
}, 

{
  question : '6. Who was the fastest player in NHL history to reach 1,000 career points?',
  answers : ['A. Eddie Shore',
         'B. Wayne Gretzky',
         'C. Guy Lefleur',
         'D. Mario Lemieux'],
  correctAnswer : 'B. Wayne Gretzky',
  image : "https://shawetcanada.files.wordpress.com/2018/05/wanye.jpg?quality=80&strip=all&w=605"
}, 

{
 question : '7. Who was the first hockey player to win Sportsman of the Year honors from Sports Illustrated?',
 answers : ['A. Eddie Shore',
         'B. Bob Bourne',
         'C. Bobby Orr',
         'D. Wayne Gretzky'],
  correctAnswer : 'C. Bobby Orr',
  image : "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Bobby_Orr_in_mid-air_%281970%29.jpg/200px-Bobby_Orr_in_mid-air_%281970%29.jpg"
}, 

{
  question : '8. Which team has won the Stanley Cup the most times?',
  answers : ['A. Montreal Canadians',
         'B. San Jose Sharks',
         'C. New York Rangers',
         'D. Chicago Black Hawks'],
  correctAnswer : 'A. Montreal Canadians',
  image : "https://3kzxyv3txbz4d5ul83baelzn-wpengine.netdna-ssl.com/wp-content/uploads/sites/15/2018/02/hqdefault.jpg"

},

{

  question : '9. How long is an overtime period in a hockey game?',
  answers : ['A. 2 minutes',
         'B. 5 minutes',
         'C. 10 minutes',
         'D. 20 minutes'],
  correctAnswer : 'B. 5 minutes',
  
},

{

 question : "10. When was the last game played where the goalie didn't wear a mask?",
  answers : ['A. 1945',
         'B. 1954',
         'C. 1963',
         'D. 1974'],
  correctAnswer : 'D. 1974',
  

}];

// Variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: beginningCounter,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("TIMES UP");
      game.timeUp();
    }
  },
  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    quizArea.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      quizArea.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = beginningCounter;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    quizArea.html("<h2>Out of Time!</h2>");
    quizArea.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    quizArea.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    quizArea.html("<h2>Here's Your Scores!</h2>");

    $("#counter-number").text(game.counter);

    quizArea.append("<h3>Correct Answers: " + game.correct + "</h3>");
    quizArea.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    quizArea.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    quizArea.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    quizArea.html("<h2>Nope!</h2>");
    quizArea.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    quizArea.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    quizArea.html("<h2>Correct!</h2>");
    quizArea.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = beginningCounter;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-container").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});