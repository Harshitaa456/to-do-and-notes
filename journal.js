document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.getElementById("addBtn");
  const backBtn = document.getElementById("backBtn");
  const entriesContainer = document.getElementById("entriesContainer");
  const moodSelectorTemplate = document.getElementById("moodSelectorTemplate"); // ✅ FIXED ID here

  // Load entries from localStorage on page load
  const savedEntries = JSON.parse(localStorage.getItem("entries")) || [];
  for (let i = 0; i < savedEntries.length; i++) {
    showEntry(savedEntries[i]);
  }

  // When you click the "+" button
  addBtn.addEventListener("click", function () {
    const box = document.createElement("div");
    box.className = "entry-box";

    // ✅ Clone mood selector
    const moodSelect = moodSelectorTemplate.cloneNode(true);
    moodSelect.style.display = "inline-block"; // make it visible
    moodSelect.removeAttribute("id");

    // ✅ Create input box
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Write one line...";
    input.className = "journal-input";

    // ✅ Create save button
    const save = document.createElement("button");
    save.innerText = "✅ Save";
    save.className = "save-btn";
    save.style.fontWeight = "bold";

    // ✅ Save entry when save button is clicked
    save.addEventListener("click", function () {
      const text = input.value.trim();
      if (text === "") {
        alert("Please write something!");
        return;
      }

      const mood = moodSelect.value;
      const entryWithMood = `${mood} ${text}`;

      showEntry(entryWithMood);
      saveEntry(entryWithMood);
      box.remove();
    });

    // ✅ Append all elements to box
    box.appendChild(moodSelect);
    box.appendChild(input);
    box.appendChild(save);

    // ✅ Show new box at the top
    entriesContainer.prepend(box);
  });

  // Back button
  backBtn.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  // Show a saved journal entry
  function showEntry(text) {
    const box = document.createElement("div");
    box.className = "entry-box";

    const line = document.createElement("div");
    line.className = "entry-text";
    line.innerText = text;

    const del = document.createElement("img");
    del.src = "images/delete (1).png";
    del.alt = "Delete";
    del.className = "delete-icon";

    del.addEventListener("click", function () {
      box.remove();
      removeEntry(text);
    });

    box.appendChild(line);
    box.appendChild(del);
    entriesContainer.appendChild(box);
  }

  // Save entry to localStorage
  function saveEntry(text) {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push(text);
    localStorage.setItem("entries", JSON.stringify(entries));
  }

  // Remove entry from localStorage
  function removeEntry(text) {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries = entries.filter(function (entry) {
      return entry !== text;
    });
    localStorage.setItem("entries", JSON.stringify(entries));
  }
});
