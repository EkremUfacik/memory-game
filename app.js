import { data } from "./data.js";

const container = document.querySelector(".container");
let score = 0;
let count = 0;
let moves = document.querySelector(".moves");
const restart = document.querySelector("button");

start();

restart.addEventListener("click", () => {
  container.innerText = "";
  score = 0;
  count = 0;
  moves.textContent = 0;
  start();
});

function start() {
  restart.disabled = true;
  data
    .sort(() => Math.random() - 0.5)
    .forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";
      const face = document.createElement("img");
      face.className = "face";
      const back = document.createElement("div");
      back.className = "back";

      container.appendChild(card);
      card.appendChild(face);
      card.appendChild(back);

      face.src = item.imgPath;
      face.alt = item.name;

      card.setAttribute("name", item.name);
    });
}

container.addEventListener("click", (e) => {
  e.target.classList.add("toggle-card");

  clickedCard(e);
});

const clickedCard = (e) => {
  const clickedCards = e.target;
  clickedCards.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");

  if (flippedCards.length === 2) {
    console.log(flippedCards);
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      count++;
      flippedCards.forEach((i) => {
        i.classList.remove("flipped");
        i.style.pointerEvents = "none";
      });
    } else {
      flippedCards.forEach((i) => {
        i.classList.remove("flipped");
        setTimeout(() => i.classList.remove("toggle-card"), 500);
      });
    }
    score++;
    moves.textContent = score;
  }

  if (count === 8) {
    restart.disabled = false;
  }
};
