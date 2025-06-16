document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.getElementById("addBtn");
  const backBtn = document.getElementById("backBtn");
  const entriesContainer = document.getElementById("entriesContainer");

  // Load saved entries when page opens
  const savedEntries = JSON.parse(localStorage.getItem("entries")) || [];
  for (let i = 0; i < savedEntries.length; i++) {
    showEntry(savedEntries[i]);
  }

  // When you click the Add (+) button
  addBtn.addEventListener("click", function () {
    const box = document.createElement("div");

    const input = document.createElement("textarea");
    input.placeholder = "Write one line...";

    const save = document.createElement("button");
    save.innerText = "✅ Save";
    save.style.fontWeight = "bold";


    save.addEventListener("click", function () {
      const text = input.value.trim();
      if (text === "") {
        alert("Please write something!");
        return;
      }

      showEntry(text);
      saveEntry(text);
      box.remove();
    });

    box.appendChild(input);
    box.appendChild(save);
    entriesContainer.prepend(box);
  });

  // Go back to main page
  backBtn.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  // Function to show a saved entry with delete button
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

  // Save a new entry in localStorage
  function saveEntry(text) {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push(text);
    localStorage.setItem("entries", JSON.stringify(entries));
  }

  // Remove a deleted entry from localStorage
  function removeEntry(text) {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries = entries.filter(function (entry) {
      return entry !== text;
    });
    localStorage.setItem("entries", JSON.stringify(entries));
  }
});
