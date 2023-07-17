document.addEventListener("DOMContentLoaded", function() {
    var questions = document.querySelectorAll('.question');
    var currentIndex = 0;
  
    questions[currentIndex].classList.remove('hidden'); // Show the first question
  
    function answerQuestion(answer) {
      // Logic to handle the current question's answer
      console.log('Question ' + (currentIndex + 1) + ':', answer);
  
      questions[currentIndex].classList.add('hidden'); // Hide the current question
      currentIndex++; // Move to the next question
  
      if (currentIndex < questions.length) {
        questions[currentIndex].classList.remove('hidden'); // Show the next question
      } else {
        // Redirect to the next page or perform further actions
        window.location.href = 'step3.html';
      }
    }
  
    window.answerQuestion = answerQuestion; // Exposing the function globally
  });