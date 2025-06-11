document.addEventListener("DOMContentLoaded", () => {
  const notesContainer = document.getElementById("notesContainer");
  const addBtn = document.getElementById("addBtn");
  const backBtn = document.getElementById("backBtn");

  // Event to add a new note
  addBtn.addEventListener("click", () => {
    createNote("");
  });

  // Back button navigates to the to-do list
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
    });

    // Add icons to icon container
    iconContainer.appendChild(deleteIcon);
    iconContainer.appendChild(boldIcon);

    // Append elements to the note
    note.appendChild(iconContainer);
    note.appendChild(editableDiv); // ✅ Correctly appending contenteditable div
    notesContainer.appendChild(note);
  }
});
