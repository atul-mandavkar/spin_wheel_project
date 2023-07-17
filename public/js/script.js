document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById('myVideo');
    var background = document.querySelector('.background');
  
    video.addEventListener('ended', function() {
      // Redirect to Step 2 or trigger the necessary logic for Step 2
      window.location.href = 'step2.html';
    });
  
    // Pause the video after 30 seconds
    setTimeout(function() {
      video.pause();
      background.style.display = 'none';
    }, 30000);
  });