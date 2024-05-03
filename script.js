var formContainer = document.getElementById("form-container");

formContainer.addEventListener("dragover", allowDrop);
formContainer.addEventListener("drop", drop);

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("element", event.target.dataset.element);
}

function drop(event) {
  event.preventDefault();
  var element = event.dataTransfer.getData("element");
  var form = document.getElementById("form");
  var input;

  if (element === "text") {
    input = document.createElement("input");
    input.setAttribute("type", "text");
  } else if (element === "select") {
    input = document.createElement("select");

    var option = document.createElement("option");
    option.text = "Option 1";
    input.add(option);
    option = document.createElement("option");
    option.text = "Option 2";
    input.add(option);
  } else if (element === "textarea") {
    input = document.createElement("textarea");
    input.setAttribute("rows", "4"); // Set number of rows
    input.setAttribute("cols", "50"); // Set number of columns
  }

  var containerDiv = document.createElement("div");

  var label = document.createElement("label");
  if (element === "text") label.textContent = "Input";
  if (element === "select") label.textContent = "Dropdown";
  if (element === "textarea") label.textContent = "TextArea";

  label.setAttribute("contenteditable", true); // Make label editable

  var inputContainerDiv = document.createElement("div");
  inputContainerDiv.appendChild(label);
  inputContainerDiv.appendChild(input);

  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    form.removeChild(containerDiv);
  });
  var deleteBtnDiv = document.createElement("div");
  deleteBtnDiv.appendChild(deleteBtn);

  containerDiv.appendChild(inputContainerDiv);
  containerDiv.appendChild(deleteBtnDiv);

  containerDiv.className = "form-element";
  form.appendChild(containerDiv);
}

document.getElementById("save-btn").addEventListener("click", function () {
  const formData = {};
  document.querySelectorAll(".form-element").forEach((element, index) => {
    const label = element.querySelector("label").textContent;
    let value = null;
    const input = element.querySelector("input");
    const select = element.querySelector("select");
    const textarea = element.querySelector("textarea");

    if (input) {
      value = input.value;
    } else if (select) {
      value = Array.from(select.selectedOptions).map((option) => option.value);
    } else if (textarea) {
      value = textarea.value;
    }
    formData[label] = value;
  });
  console.log(formData);
});

var draggables = document.querySelectorAll(".draggable");
draggables.forEach(function (draggable) {
  draggable.addEventListener("dragstart", drag);
});
