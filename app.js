$(document).ready(function(){

let $upperKeyboard = $('#keyboard-upper-container');
let $lowerKeyboard = $('#keyboard-lower-container');
let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let sentenceNum = 0;
let letterNum = 0;
let error = 0;
var startTime;

// sentences[0] will be the first sentence of array 
let currentSentence = sentences[0];
// currentSentence.charAt(0) will be first letter of current sentence 
let currentLetter = currentSentence.charAt(0);


// hide the uppercase keyboard when the page loads.

  $upperKeyboard.hide();

// While the shift key is held down, hide the lowercase keyboard and show the uppercase one
// When the shift key is released, show the lowercase keyboard and hide the uppercase one

$(document).keydown(function(e) {
  if (e.which === 16) {
    $($upperKeyboard).show();
    $($lowerKeyboard).hide();
  }
});
$(document).keyup(function(e) {
  if (e.which === 16) {
    $($lowerKeyboard).show();
    $($upperKeyboard).hide();
  }
});

//   When keys are pressed, they should be highlighted in the browser.

$(document).keypress(function(e) {
  let $key = $("#" + e.which);
  $($key).css("background-color", "yellow");
  $(document).keyup(function(e) {
    //background color back to normal google helps alot
    $($key).css("background-color", "#f5f5f5");
  });
});

// to show one sentence at a time and one letter at a time

$('#sentence').text(currentSentence);
$('#target-letter').text(currentLetter);

// highlight the currently expected letter in the on-screen sentence that should be typed next

$(document).keypress(function(e){
//  prevent default function will prevent default things from heppening in this case scrolling page
//  when we press space 
  event.preventDefault();
  if(!startTime){
    startTime = e.timeStamp;
  } else if(e.which === currentLetter.charCodeAt(0)){
    $('#feedback').append('<span class="glyphicon glyphicon-ok"></span>');
    // letterNum++;
    // currentLetter = currentSentence.charAt(letterNum);
    // $('#target-letter').text(currentLetter);
  } else {
    $('#feedback').append('<span class="glyphicon glyphicon-remove"></span>');
    error++;
    // letterNum++;
    // currentLetter = currentSentence.charAt(letterNum);
    // $('#target-letter').text(currentLetter);
  }

  letterNum++;
  // currentLetter = currentSentence.charAt(letterNum);

  //for the end of current sentence and end of letter

  if(letterNum === currentSentence.length){
    sentenceNum++;
    currentSentence = sentences[sentenceNum];
    $('#sentence').text(currentSentence);

    // end of sentences means end of game 
    if(sentenceNum === sentences.length){
      var endTime = event.timeStamp;
      var totalTimeTaken = (endTime - startTime)/ (60* 1000);
      // 60*1000 so that time return will be in seconds 
      
      var winningPoints = 54 / totalTimeTaken - 2 * error;
      // 54 is total no of words in sentences

      $('#feedback').text('your finals score is ' + winningPoints + 'words per minute.');

      // make a delay to ask user weather he/she wants to play again

      setTimeout(function(){
        if(confirm('would you like to play again?')) {
          sentenceNum = 0;
          letterNum = 0;
          currentSentence = sentences[0];
          currentLetter = currentSentence.charAt(0);
          $('#sentence').text(currentSentence);
          $('#target-letter').text(currentLetter);
          $('#feedback').empty();
          startTime = undefined;
        }
      }, 5000); // 5000 means this will run for 5 seconds
    } else {
      //if its not the last sentence then move on to next sentence and its first letter

      letterNum = 0;
      currentLetter = currentSentence.charAt(letterNum);
      $('#target-letter').text(currentLetter);
      $('#feedback').empty();
      $('#yellow-block').css('left', '+=17.5px');
    }
  } else {
    //if its not the last letter of the sentence then move on to the next letter 
    currentLetter = currentSentence.charAt(letterNum);
    $('#target-letter').text(currentLetter);

    $('#yellow-block').css('left', '+=17.5px');
  }
});

});