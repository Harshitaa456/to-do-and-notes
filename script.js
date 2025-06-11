const inputBox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === '') {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listcontainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }

  inputBox.value = "";
  // saveData(); // ⬅️ Commented for backend use
}

listcontainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    // saveData(); // ⬅️ Commented for backend use
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    // saveData(); // ⬅️ Commented for backend use
  }
}, false);

// function saveData() {
//   localStorage.setItem("data", listcontainer.innerHTML);
// }

// function showTask() {
//   listcontainer.innerHTML = localStorage.getItem("data");
// }

// showTask(); // ⬅️ Commented for backend use

// 🌟 Motivation Feature
const motivationQuotes = [
  "You're doing better than you think! 💫",
  "Believe in yourself — you’ve got this. 💪",
  "Keep going — you're closer than you were yesterday! 🚶‍♀️➡️🏁",
  "Progress, not perfection. 🎯",
  "Stay focused. Stay determined. 🔒💡",
  "One task at a time, one victory at a time. ✅🏆"
];

const motivateBtn = document.getElementById("motivateBtn");
const motivationText = document.getElementById("motivationText");

motivateBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * motivationQuotes.length);
  motivationText.textContent = motivationQuotes[randomIndex];
});
