document.addEventListener("DOMContentLoaded", function() {
  var video = document.getElementById('myVideo');
  var background = document.querySelector('.background');

  video.addEventListener('ended', function() {
    window.location.href = 'step2.html';
  });

  setTimeout(function() {
    video.pause();
    background.style.display = 'none';
  }, 80000);
});