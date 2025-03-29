const table = document.getElementById("table");

function addBook() {
  let newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td><input type="text"></td>
    <td><input type="text"></td>
    <td>
      <button onclick="saveBook(this)">Save</button>
      <button onclick="removeBook(this)">Remove</button>
    </td>`;
  table.appendChild(newRow);
}

function saveBook(button) {
  let row = button.parentElement.parentElement;
  let author = row.cells[0].querySelector("input").value;
  let title = row.cells[1].querySelector("input").value;

  row.innerHTML = `
    <td>${author}</td>
    <td>${title}</td>
    <td>
      <button onclick="editBook(this)">Edit</button>
      <button onclick="removeBook(this)">Remove</button>
    </td>`;
}

function editBook(button) {
  let row = button.parentElement.parentElement;
  let author = row.cells[0].textContent;
  let title = row.cells[1].textContent;

  row.innerHTML = `
    <td><input type="text" value="${author}"></td>
    <td><input type="text" value="${title}"></td>
    <td>
      <button onclick="saveBook(this)">Save</button>
      <button onclick="removeBook(this)">Remove</button>
    </td>`;
}

function removeBook(button) {
  let row = button.parentElement.parentElement;
  row.remove();
}
