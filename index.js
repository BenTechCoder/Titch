import randomItemFromArray from "./lib/random.js";

const randomizer = document.querySelector(".randomizer-form");
const randomItemContainer = document.querySelector(".randomizer-list");
const randomizerBtn = document.querySelector(".randomizer-btn");
const randomOutput = document.querySelector(".randomizer-output");
let itemArray = [];

/*
!important
1. Add percentage discount calculator

*/

function storeToLocalStorage() {
  localStorage.setItem("randomizerItems", JSON.stringify(itemArray));
}

function restoreFromLocalStorage() {
  const lsItems = JSON.parse(localStorage.getItem("randomizerItems"));
  if (lsItems.length) {
    itemArray.push(...lsItems);
  }
  randomItemContainer.dispatchEvent(new CustomEvent("updateList"));
}

function displayItems() {
  const template = itemArray
    .map((item) => {
      return `<div class="item with-sidebar">
          <p>${item.content}</p>
          <button value="${item.id}" class="randomizer-item-btn">X</button>
        </div>`;
    })
    .join("");
  randomItemContainer.innerHTML = template;
}

function addItem(e) {
  e.preventDefault();
  let content = e.currentTarget.input.value;
  const item = {
    content,
    id: Date.now(),
  };
  itemArray.push(item);
  e.target.reset();
  randomItemContainer.dispatchEvent(new CustomEvent("updateList"));
}

function removeItem(id) {
  itemArray = itemArray.filter((item) => item.id != id);
  randomItemContainer.dispatchEvent(new CustomEvent("updateList"));
}

function randomize() {
  const chosen = randomItemFromArray(itemArray, randomOutput.textContent);
  randomOutput.textContent = chosen.content;
}

function outputValueChecker() {
  if (itemArray.length < 1) {
    randomOutput.textContent = "";
  }
}

// event listeners

randomizer.addEventListener("submit", addItem);
randomItemContainer.addEventListener("updateList", displayItems);
randomItemContainer.addEventListener("updateList", storeToLocalStorage);
randomItemContainer.addEventListener("updateList", outputValueChecker);
randomItemContainer.addEventListener("click", (e) => {
  const id = parseInt(e.target.value);
  if (e.target.matches("button")) {
    removeItem(parseInt(id));
  }
});
randomizerBtn.addEventListener("click", randomize);

// restore state of app on reload
restoreFromLocalStorage();
