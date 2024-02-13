const sketchContainer = document.querySelector(".sketchContainer");
const colorContainer = document.querySelector(".colorContainer");
const eraseBtn = document.querySelector(".eraseBtn");
const editGridBtn = document.querySelector(".sizeInput");
const currentSizeText = document.querySelector(".sizeText");
const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
  "white",
  "black",
];
let currentColor;
let size = 16;
const background = `style="background-color:${currentColor};"`;

// Creates flex boxes
function createGrid() {
  for (let i = 1; i <= 256; i++) {
    sketchContainer.innerHTML += `<div class="sketchBox"></div>`;
  }
}
createGrid();

//Finds hovered flex item and changes color
const sketchBox = document.querySelectorAll(".sketchBox");
sketchContainer.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("sketchBox")) {
    e.target.style.backgroundColor = currentColor;
  }
});

// Creates color selection
function colorGrid() {
  colors.forEach((color) => {
    colorContainer.innerHTML += `<div class="colorBox" value="${color}" style="background-color:${color}"></div>`;
  });
}
colorGrid();
//Erase Screen
eraseBtn.addEventListener("click", () => {
  for (const box of sketchContainer.children) {
    box.style.backgroundColor = "white";
  }
});

// Sets the chosen color
const colorBox = document.querySelectorAll(".colorBox");
colorBox.forEach((box) =>
  box.addEventListener("click", () => {
    currentColor = box.getAttribute("value");
  })
);

editGridBtn.addEventListener("click", () => {
  size = window.prompt("Enter Grid Size. Ex: 64 = 64 x 64");
  console.log(typeof size);
  if (!Number.isInteger(Number(size))) {
    alert("Please input a valid number!");
  } else {
    if (size < 2 || size > 100) {
      alert("Must be between 2x2 and 100x100");
    } else {
      const grid = size * size;
      const pixelsize = 476.8 / size;
      const frag = document.createDocumentFragment();
      for (let i = 0; i < grid; i++) {
        const box = document.createElement("div");
        box.className = "sketchBox";
        box.style.width = `${pixelsize}px`;
        box.style.height = `${pixelsize}px`;
        frag.appendChild(box);
      }
      sketchContainer.innerHTML = ``;
      sketchContainer.appendChild(frag);
      displaySize();
    }
  }
});

function displaySize() {
  currentSizeText.innerHTML = `Current Size: ${size}x${size}`;
}

displaySize();