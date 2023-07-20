const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const reward = document.getElementById("rewardName");
const popupWin = document.getElementById("popupContainer");
const containerSubmit = document.getElementById("containerSubmit");
const userNameInput = document.getElementById("userName");
const userEmailInput = document.getElementById("userEmail");

// Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 2 },
  { minDegree: 31, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 150, value: 6 },
  { minDegree: 151, maxDegree: 210, value: 5 },
  { minDegree: 211, maxDegree: 270, value: 4 },
  { minDegree: 271, maxDegree: 330, value: 3 },
  { minDegree: 331, maxDegree: 360, value: 2 },
];

// Size of each piece
const data = [16, 16, 16, 16, 16, 16];

// Background color for each piece
const pieColors = [
  "#712edd",
  "#8969bd",
  "#712edd",
  "#8969bd",
  "#712edd",
  "#8969bd",
];

// Create chart
let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

// Display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
      if (i.value == 2 || i.value == 4 || i.value == 6) {
        popupWin.style.display = "flex";
        reward.innerHTML = `Congratulations! You won $${i.value}`;
      } else {
        popupWin.style.display = "flex";
        reward.innerHTML = "Better luck next time!";
      }
      spinBtn.disabled = false;
      break;
    }
  }
};

// Spinner count
let count = 0;
// 100 rotations for animation and last rotation for result
let resultValue = 101;
// Start spinning
// Rest of the code remains the same

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
      spinBtn.disabled = false; // Re-enable the spin button after wheel stops spinning
      stopSpinSound();

      // Show popup and redeem button only if the user wins a reward
      if (finalValue.innerText !== "Better luck next time!") {
        popupWin.style.display = "flex";
        if (finalValue.innerText === "Value: 2") {
          reward.innerHTML = "You won $10";
          containerSubmit.style.display = "none";
        } else if (finalValue.innerText === "Value: 4") {
          reward.innerHTML = "You won $100";
          containerSubmit.style.display = "none";
        } else if (finalValue.innerText === "Value: 6") {
          reward.innerHTML = "You won $500";
          containerSubmit.style.display = "none";
        } else {
          // If the user wins something other than 2, 4, or 6
          popupWin.style.display = "none";
          containerSubmit.style.display = "flex";
        }
      } else {
        // If the user gets "Better luck next time!"
        popupWin.style.display = "none";
        containerSubmit.style.display = "none";
      }
    }
  }, 10);
  playSpinSound();
});
// Function to play the spinning sound
function playSpinSound() {
  var spinSound = document.getElementById("spin-sound");
  spinSound.loop = true;
  spinSound.playbackRate = 2;
  spinSound.volume = 1;
  spinSound.play();
  slowDownSound();
}

// Function to stop the spinning sound
function stopSpinSound() {
  var spinSound = document.getElementById("spin-sound");
  spinSound.loop = false;
  spinSound.pause();
  spinSound.currentTime = 0;
}

// Function to gradually slow down the sound
function slowDownSound() {
  var spinSound = document.getElementById("spin-sound");
  if (spinSound.playbackRate > 0.1) {
    spinSound.playbackRate -= 0.01;
    if (spinSound.volume > 0.1) {
      spinSound.volume -= 0.01;
    }
    setTimeout(slowDownSound, 100);
  }
}

// Function to redeem reward
function redeemReward() {
  popupWin.style.display = "none";
  containerSubmit.style.display = "flex";
}

// Function to handle form submission
document.getElementById("submitForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const userName = userNameInput.value;
  const userEmail = userEmailInput.value;
  // Process the user's name and email, e.g., send it to a server or perform some other action
  console.log(`User Name: ${userName}, User Email: ${userEmail}`);
  // Reset form fields
  userNameInput.value = "";
  userEmailInput.value = "";
  containerSubmit.style.display = "none";
});
