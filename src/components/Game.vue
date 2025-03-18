<template>
  <div class="bbody">
    <div class="board"></div>
    <div class="clone">
      <div class="face"></div>
      <div class="face"></div>
      <div class="face"></div>
      <div class="face"></div>
      <div class="face"></div>
      <div class="face"></div>
    </div>
    <div class="overlay hidden">
      <div class="gameover">
        <p>你赢了!</p>
        <button class="reset">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
            <path
              d="M485.8 113.9L349.3 250.5c-3.5 3.5-3.5 9.1 0 12.6l136.6 136.6c5.6 5.6 15.2 1.6 15.2-6.3V120.2c-.1-7.9-9.7-11.9-15.3-6.3z"
              fill="#fff"
            />
            <path
              d="M500 194.8V317c125.9 0 228 102.1 228 228S625.9 773 500 773v121.8c193.3 0 350-156.7 350-350s-156.7-350-350-350zM272 545c0-55.1 19.6-105.7 52.1-145.1 6.5-7.9 5.9-19.5-1.4-26.8l-58.3-58.3c-8.2-8.2-21.7-7.7-29.3 1-53 61.5-85.1 141.5-85.1 229 0 193.3 156.7 350 350 350V773c-125.9 0-228-102.1-228-228z"
              fill="#fff"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Preload Game Sounds -->
    <audio preload="auto" class="audio-win">
      <source
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/dino-win.mp3"
      />
      <source
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/dino-win.ogg"
      />
    </audio>
    <audio preload="auto" class="audio-ahahah">
      <source
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/audio-ahahah.mp3"
      />
      <source
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/audio-ahahah.ogg"
      />
    </audio>
    <audio preload="auto" class="audio-dino">
      <source
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/audo-dino.mp3"
      />
      <source
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/audio-dino.ogg"
      />
    </audio>
    <audio preload="auto" class="audio-egg">
      <source
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/audio-egg.mp3"
      />
      <source
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/audio-egg.ogg"
      />
    </audio>
    <audio preload="auto" class="audio-erupt">
      <source
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/audio-erupt.mp3"
      />
      <source
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/audio-erupt.ogg"
      />
    </audio>
    <audio preload="auto" class="audio-ptero">
      <source
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/audio-ptero.mp3"
      />
      <source
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/audio-ptero.ogg"
      />
    </audio>
    <audio preload="auto" class="audio-tri">
      <source
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/audio-tri.mp3"
      />
      <source
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/audio-tri.ogg"
      />
    </audio>

  </div>
</template>

<style lang="scss" scoped>
// Mmm subset fonts!
@import url("https://fonts.googleapis.com/css?family=Fredoka+One&text=%3FYOUWON!");

body {
  align-items: center;

  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  overflow: hidden;
}

.bbody {
    width: 100vw;
    height: 100vh;
    background-image: radial-gradient(
    circle 448px at center,
    #16d9e3 0%,
    #30c7ec 47%,
    #46aef7 100%
  );
}

.board {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 100px);
  grid-template-rows: repeat(4, 100px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform-style: preserve-3d;
  transform: translate(-50%, -50%) rotateX(50deg) rotateZ(22deg);
  user-select: none;
}

.clone {
  display: none;
}

.cube {
  animation: enter 600ms ease-out;
  transform-style: preserve-3d;
  transform: translateZ(0) scale(1);
  transition: all 350ms ease-out;
  transform-origin: 50% 50%;
  backface-visibility: hidden;

  &.flipped {
    pointer-events: none;
    transform: rotateY(180deg) translateZ(0) scale(1);
    transition: all 500ms ease-out;
  }

  &.matched {
    pointer-events: none;
    transform: rotateY(180deg) translateZ(0) scale(1);
    animation: match 650ms ease-out;
  }
}

.face {
  outline: 1px solid transparent;
  backface-visibility: hidden;
  box-shadow: inset 0 0 2px 1px #fff0d2;
  height: 100px;
  overflow: hidden;
  position: absolute;
  transform-origin: 50% 50%;
  width: 100px;
}

.face:nth-child(1) {
  background-color: wheat;
  cursor: pointer;
  transform: rotateY(0deg) translateZ(10px);
  transition: background 150ms ease-out;

  &:before {
    align-items: center;
    bottom: 0;
    color: #93794c;
    content: "?";
    display: flex;
    font-family: "Fredoka One", cursive;
    font-size: 60px;
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
}

.face:nth-child(2) {
  background-color: darken(wheat, 10%);
  width: 20px;
  transform: rotateY(90deg) translateZ(90px);
}
.face:nth-child(3) {
  background-color: dodgerblue;
  transform: rotateY(180deg) translateZ(10px);
}
.face:nth-child(4) {
  background-color: darken(wheat, 10%);
  width: 20px;
  transform: rotateY(270deg) translateZ(10px);
}
.face:nth-child(5) {
  background-color: darken(wheat, 10%);
  height: 20px;
  transform: rotateX(90deg) translateZ(10px);
}
.face:nth-child(6) {
  background-color: darken(wheat, 10%);
  height: 20px;
  transform: rotateX(-90deg) translateZ(90px);
}

.overlay {
  align-items: center;
  background: rgba(255, 255, 255, 0.75);
  width: 100vw;
  display: flex;
  justify-content: center;
  left: 0;
  opacity: 1;
  position: absolute;
  height: 100vh;
  top: 0;
  transition: all 500ms ease-out;
  z-index: 100;

  &.hidden {
    opacity: 0;
    pointer-events: none;
    transition: all 300ms ease-out;

    .gameover {
      transform: translateY(60px);
      transition: all 300ms ease-out;
    }
  }
}

.gameover {
  align-items: center;
  background-color: #fff;
  border-radius: 120px;
  border: 12px solid #50b8f7;
  color: #2e2e2e;
  display: flex;
  font-family: "Fredoka One", cursive;
  font-size: 40px;
  height: 120px;
  width: 340px;
  justify-content: space-between;
  padding: 0 10px 0 30px;
  transform: translateY(0);
  transition: all 500ms ease-out;
  user-select: none;
}

.reset {
  background-color: #fbc300;
  border-radius: 50%;
  border: 0;
  box-shadow: 0px 6px 0px 0px #f2a003;
  cursor: pointer;
  display: block;
  height: 94px;
  margin-left: 20px;
  position: relative;
  top: -3px;
  width: 96px;

  &:active {
    box-shadow: none;
    top: 0;
  }

  &:focus {
    outline: 0;
  }
}

.twitter__link {
  user-select: none;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 12px;
  z-index: -1;
  background: #fff;
  border-radius: 20px;
  height: 30px;
  text-decoration: none;
  padding-right: 10px;
  justify-content: space-between;
  font-family: sans-serif;
  font-weight: 600;
  display: flex;
  align-items: center;
  color: #00aced;
  font-size: 14px;
  width: 74px;
  opacity: 0.4;
  z-index: 10;

  &:hover {
    opacity: 1;
  }
}

.twitter__icon {
  height: 30px;
}

[data-tile="egg"] {
  div:nth-child(3) {
    background: #fff8e7
      url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/dino-egg.svg)
      center center no-repeat;
    background-size: 60px;
  }
}

[data-tile="dino"] {
  div:nth-child(3) {
    background: #fff8e7
      url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/dino-dino1.svg)
      bottom center no-repeat;
    background-size: 85px;
  }
}

[data-tile="ahahah"] {
  div:nth-child(3) {
    background: #fff8e7
      url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/dino-ah.svg) center
      center no-repeat;
    background-size: 60px;
  }
}

[data-tile="tri"] {
  div:nth-child(3) {
    background: #fff8e7
      url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/dino-tri.svg)
      center center no-repeat;
    background-size: 85px;
  }
}

[data-tile="ptero"] {
  div:nth-child(3) {
    background: #fff8e7
      url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/dino-ptero.svg)
      center center no-repeat;
    background-size: 85px;
  }
}

[data-tile="erupt"] {
  div:nth-child(3) {
    background: #fff8e7
      url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/dino-erupt.svg)
      center center no-repeat;
    background-size: 85px;
  }
}

audio {
  display: none;
}

@keyframes enter {
  0% {
    transform: translateZ(-20px) scale(0.3);
  }
  50% {
    transform: translateZ(20px) scale(1.02);
  }
  100% {
    transform: translateZ(0) scale(1);
  }
}

@keyframes match {
  0% {
    transform: rotateY(180deg) translateZ(-15px);
  }
  50% {
    transform: rotateY(180deg) translateZ(10px);
  }
  100% {
    transform: rotateY(180deg) translateZ(0);
  }
}
</style>

<script setup>
import { ref, onMounted } from "vue";

const board = ref(null);
const clone = ref(null);
const overlay = ref(null);
const reset = ref(null);
const tileOptions = ["erupt", "ptero", "tri", "ahahah", "egg", "dino"];

const state = ref({
  selections: [],
  boardLocked: false,
  matches: 0,
});

function resetGame() {
  state.value.boardLocked = true;
  state.value.selections = [];
  state.value.matches = 0;

  document.querySelectorAll(".cube").forEach((tile) => {
    tile.removeEventListener("click", () => selectTile(tile));
    tile.remove();
  });

  overlay.value.classList.add("hidden");
  createBoard();
}

function createBoard() {
  const tiles = shuffleArray([...tileOptions, ...tileOptions]);
  const length = tiles.length;

  for (let i = 0; i < length; i++) {
    window.setTimeout(() => {
      board.value.appendChild(buildTile(tiles.pop(), i));
    }, i * 100);
  }

  window.setTimeout(() => {
    document.querySelectorAll(".cube").forEach((tile) => {
      tile.addEventListener("click", () => selectTile(tile));
    });

    state.value.boardLocked = false;
  }, tiles.length * 100);
}

function buildTile(option, id) {
  const tile = clone.value.cloneNode(true);
  tile.classList.remove("clone");
  tile.classList.add("cube");
  tile.setAttribute("data-tile", option);
  tile.setAttribute("data-id", id);
  return tile;
}

function selectTile(selectedTile) {
  if (state.value.boardLocked || selectedTile.classList.contains("flipped"))
    return;

  state.value.boardLocked = true;

  if (state.value.selections.length <= 1) {
    selectedTile.classList.add("flipped");
    state.value.selections.push({
      id: selectedTile.dataset.id,
      tile: selectedTile.dataset.tile,
      el: selectedTile,
    });
  }

  if (state.value.selections.length === 2) {
    if (state.value.selections[0].tile === state.value.selections[1].tile) {
      window.setTimeout(() => {
        state.value.selections[0].el.classList.add("matched");
        state.value.selections[1].el.classList.add("matched");

        state.value.boardLocked = false;
        state.value.matches = state.value.matches + 1;

        if (state.value.matches === tileOptions.length) {
          window.setTimeout(() => {
            overlay.value.classList.remove("hidden");
            document.querySelector(".audio-win").play();
          }, 600);
        }
        state.value.selections = [];
        document.querySelector(`.audio-${selectedTile.dataset.tile}`).play();
      }, 600);
    } else {
      setTimeout(() => {
        document.querySelectorAll(".cube").forEach((tile) => {
          tile.classList.remove("flipped");
        });
        state.value.boardLocked = false;
      }, 800);
      state.value.selections = [];
    }
  } else {
    state.value.boardLocked = false;
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

onMounted(() => {
  board.value = document.querySelector(".board");
  clone.value = document.querySelector(".clone");
  overlay.value = document.querySelector(".overlay");
  reset.value = document.querySelector(".reset");

  reset.value.addEventListener("click", () => {
    if (state.value.boardLocked) return;
    resetGame();
  });

  createBoard();
});
</script>