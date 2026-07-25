import "@pnotify/core/dist/PNotify.css";
import { error, notice } from "@pnotify/core";
import "@pnotify/core/BrightTheme.css";
import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

const keys = ["a", "z", "x", "u", "w", "m", "j", "k", "l", "d"];
let currentKeyIndex = 0;

const keyEl = document.querySelector("#key");
const msgEl = document.querySelector("#message");
const btnEl = document.querySelector("#newGameBtn");
const secretVideo = atob(
  "aHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvZFF3NHc5V2dYY1E/YXV0b3BsYXk9MQ==",
);

function render() {
  const currentKey = keys[currentKeyIndex];

  if (currentKey) {
    keyEl.textContent = currentKey;
    msgEl.textContent = `Натисни: ${currentKey}`;
  } else {
    keyEl.textContent = "-";
    msgEl.textContent = "Вітаємо! Гра завершена.";
  }
}

function startNewGame() {
  currentKeyIndex = 0;
  render();
  notice({ text: "Нова гра розпочата!" });
}

document.addEventListener("keydown", (e) => {
  if (currentKeyIndex >= keys.length) return;
  if (e.key.length > 1) return;

  if (e.key.toLowerCase() === keys[currentKeyIndex]) {
    currentKeyIndex++;
    render();

    if (currentKeyIndex === keys.length) {
      basicLightbox
        .create(
          `
       <iframe style="width: 80vw; height: 80vh; border: none;" 
          src="${secretVideo}" 
          allow="autoplay; encrypted-media" allowfullscreen>
        </iframe>
      `,
        )
        .show();
    }
  } else {
    error({ text: "Невірна клавіша!" });
  }
});

document.addEventListener("keypress", (e) => {
  e.preventDefault();
});

btnEl.addEventListener("click", startNewGame);

render();
