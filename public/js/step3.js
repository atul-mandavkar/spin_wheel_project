const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const reward = document.getElementById("rewardName");
const popupWin = document.getElementById("popupContainer");
const containerSubmit = document.getElementById("containerSubmit");
const thankyouContainer = document.getElementById("thankyouContainer");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 2 },
  { minDegree: 31, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 150, value: 6 },
  { minDegree: 151, maxDegree: 210, value: 5 },
  { minDegree: 211, maxDegree: 270, value: 4 },
  { minDegree: 271, maxDegree: 330, value: 3 },
  { minDegree: 331, maxDegree: 360, value: 2 },
];
//Size of each piece
const data = [16, 16, 16, 16, 16, 16];
//background color for each piece
var pieColors = [
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: [1, 2, 3, 4, 5, 6],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
      if(i.value == 2){
        popupWin.style.display = "flex";
        reward.innerHTML = "<b>Congradulation! You won $10</b>";
      }
      else if(i.value == 4){
        popupWin.style.display = "flex";
        reward.innerHTML = "<b>Congradulation! You won $100</b>";
      }
      else if(i.value == 6){
        popupWin.style.display = "flex";
        reward.innerHTML = "<b>Congradulation! You won $500</b>";
      }
      else{
        finalValue.innerHTML = "Better luck next time!";
      }
      spinBtn.disabled = false;
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  // Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  // Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  // Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    // Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    // Update chart with new value
    myChart.update();
    // If rotation > 360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
      spinBtn.style.pointerEvents = "none";
      // Addition for stop the spinning sound
      stopSpinSound();
    }
  }, 10);
  // Addition for play the spinning sound
  playSpinSound();
});

// Creating fuction to handle sound effect
// Function to play the spinning sound
function playSpinSound() {
  var spinSound = document.getElementById("spin-sound");
  spinSound.loop = true; // Enable looping
  // Play the spinning sound with initial settings
  spinSound.playbackRate = 2; // Fast initial speed
  spinSound.volume = 1; // Full volume
  spinSound.play();
  slowDownSound();
}

// Function to stop the spinning sound
function stopSpinSound() {
  var spinSound = document.getElementById("spin-sound");
  spinSound.loop = false; // Disable looping
  spinSound.pause();
  spinSound.currentTime = 0; // Reset the sound to the beginning
}

// Function to gradually slow down the sound
function slowDownSound() {
  //console.log("hello");
  var spinSound = document.getElementById("spin-sound");
  if (spinSound.playbackRate > 0.1) {
    spinSound.playbackRate -= 0.01; // Decrease playback rate
    if(spinSound.volume > 0.1) {
      spinSound.volume -= 0.01; // Decrease volume
    }
    setTimeout(slowDownSound, 100); // Adjust the delay as per your preference
  }
}

// fiuction to redeem reward
function redeemReward(){
  //console.log("heeee");
  popupWin.style.display = "none";
  containerSubmit.style.display = "flex";
}
// fiuction to thank you msg
function thankyouWindow(){
  event.preventDefault();
  var userName = document.getElementById("userName").value;
  containerSubmit.style.display = "none";
  thankyouContainer.style.display = "flex";
  var thankyouText = document.getElementById("thankyouMsg");
  thankyouText.innerHTML = `Thank you!<br> ${userName}`;
}