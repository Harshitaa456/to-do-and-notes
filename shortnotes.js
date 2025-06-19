document.addEventListener("DOMContentLoaded", () => {
  const notesContainer = document.getElementById("notesContainer");
  const addBtn = document.getElementById("addBtn");
  const backBtn = document.getElementById("backBtn");

  // — Load saved notes on page load —
  const savedNotes = JSON.parse(localStorage.getItem("shortNotes")) || [];
  savedNotes.forEach(text => createNote(text));

  // Event to add a new note
  addBtn.addEventListener("click", () => {
    createNote("");
    saveAllNotes();
  });

  // Back button navgates to the to-do list
  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  function createNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note");

    const editableDiv = document.createElement("div");
    editableDiv.contentEditable = true;
    editableDiv.classList.add("note-text");
    editableDiv.innerHTML = text || "";

    // — save whenever content changes —
    editableDiv.addEventListener("input", saveAllNotes);

    const iconContainer = document.createElement("div");
    iconContainer.classList.add("note-icons");

    // Bold icon
    const boldIcon = document.createElement("img");
    boldIcon.src = "images/bold.png";
    boldIcon.alt = "Bold";
    boldIcon.title = "Bold Selected Text";
    boldIcon.classList.add("icon-btn");
    boldIcon.addEventListener("click", () => {
      document.execCommand("bold"); // 👈 Bold real text visually
    });

    // Delete icon
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "images/delete (1).png";
    deleteIcon.alt = "Delete";
    deleteIcon.title = "Delete Note";
    deleteIcon.classList.add("icon-btn");
    deleteIcon.addEventListener("click", () => {
      note.remove();
      saveAllNotes();
    });

    // Add icons to icon container
    iconContainer.appendChild(deleteIcon);
    iconContainer.appendChild(boldIcon);

    // Append elements to the note
    note.appendChild(iconContainer);
    note.appendChild(editableDiv); // ✅ Correctly appending contenteditable div
    notesContainer.appendChild(note);
  }

  //  collect all notes and save to localStorage —
  function saveAllNotes() {
    const texts = Array.from(document.querySelectorAll('.note-text'))
                      .map(div => div.innerHTML);
    localStorage.setItem("shortNotes", JSON.stringify(texts));
  }
});
