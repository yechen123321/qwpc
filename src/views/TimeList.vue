<template>
    
  <div class="bbody">
    <NavBar />
    <ul class="slider" ref="slider">
        <li
          class="item"
          :style="{
            backgroundImage: `url(${getImageUrl23})`
          }"
        >
          <div class="content">
            <h2 class="title">"Lossless Youths"</h2>
            <p class="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              fuga voluptatum, iure corporis inventore praesentium nisi. Id
              laboriosam ipsam enim.
            </p>
            <button @click="goto('/')">Read More</button>
          </div>
        </li>
        <li
          class="item"
          :style="{
            backgroundImage: `url(${getImageUrl24})`
          }"
        >
          <div class="content">
            <h2 class="title">"Estrange Bond"</h2>
            <p class="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              fuga voluptatum, iure corporis inventore praesentium nisi. Id
              laboriosam ipsam enim.
            </p>
            <button>Read More</button>
          </div>
        </li>
        <li
          class="item"
          :style="{
            backgroundImage: `url(${getImageUrl25})`
          }"
        >
          <div class="content">
            <h2 class="title">"The Gate Keeper"</h2>
            <p class="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              fuga voluptatum, iure corporis inventore praesentium nisi. Id
              laboriosam ipsam enim.
            </p>
            <button>Read More</button>
          </div>
        </li>
        <li
          class="item"
          :style="{
            backgroundImage: `url(${getImageUrl26})`
          }"
        >
          <div class="content">
            <h2 class="title">"Last Trace Of Us"</h2>
            <p class="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              fuga voluptatum, iure corporis inventore praesentium nisi. Id
              laboriosam ipsam enim.
            </p>
            <button>Read More</button>
          </div>
        </li>
        <li
          class="item"
          :style="{
            backgroundImage: `url(${getImageUrl27})`
          }"
        >
          <div class="content">
            <h2 class="title">"Urban Decay"</h2>
            <p class="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              fuga voluptatum, iure corporis inventore praesentium nisi. Id
              laboriosam ipsam enim.
            </p>
            <button>Read More</button>
          </div>
        </li>
        <li
          class="item"
          :style="{
            backgroundImage: `url(${getImageUrl28})`
          }"
        >
          <div class="content">
            <h2 class="title">"The Migration"</h2>
            <p class="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              fuga voluptatum, iure corporis inventore praesentium nisi. Id
              laboriosam ipsam enim.
            </p>
            <button>Read More</button>
          </div>
        </li>
      </ul>
      <nav class="nav">
      <ion-icon class="btn prev" name="arrow-back-outline" @click="handleClick"></ion-icon>
      <ion-icon class="btn next" name="arrow-forward-outline" @click="handleClick"></ion-icon>
    </nav>
  </div>
</template>
<script setup>
import NavBar from '../components/NavBar.vue';
import { useRouter } from 'vue-router';
import { onMounted, ref } from "vue";
import image23 from '../assets/images/23.png';  // 导入图片
import image24 from '../assets/images/24.png';  // 导入图片
import image25 from '../assets/images/23.png';  // 导入图片
import image26 from '../assets/images/24.png';  // 导入图片
import image27 from '../assets/images/23.png';  // 导入图片
import image28 from '../assets/images/24.png';  // 导入图片
const getImageUrl23 = image23;  // 使用导入的图片
const getImageUrl24 = image24;  // 使用导入的图片
const getImageUrl25 = image25;  // 使用导入的图片
const getImageUrl26 = image26;  // 使用导入的图片
const getImageUrl27 = image27;  // 使用导入的图片
const getImageUrl28 = image28;  // 使用导入的图片
const slider = ref(null);

const router = useRouter();
const goto = (path) => {
  router.push(path);
};


const handleClick = (e) => {
  const items = document.querySelectorAll(".item");
  if (e.target.matches(".next")) {
    slider.value.append(items[0]);
  }
  if (e.target.matches(".prev")) {
    slider.value.prepend(items[items.length - 1]);
  }
};

onMounted(() => {
//   Load ionicons
  const script1 = document.createElement("script");
  script1.type = "module";
  script1.src =
    "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js";
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.noModule = true;
  script2.src = "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js";
  document.head.appendChild(script2);
});
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.bbody {
    width: 100vw;
    height: 100vh;
}

body {
  height: 100vh;
  display: grid;
  place-items: center;
  overflow: hidden;
}

main {
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
}

.item {
  width: 200px;
  height: 300px;
  list-style-type: none;
  position: absolute;
  top: 70%;
  transform: translateY(-50%);
  z-index: 1;
  background-position: center;
  background-size: cover;
  border-radius: 20px;
  box-shadow: 0 20px 30px rgba(255, 255, 255, 0.3) inset;
  transition: transform 0.1s, left 0.75s, top 0.75s, width 0.75s, height 0.75s;

  &:nth-child(1),
  &:nth-child(2) {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: none;
    border-radius: 0;
    box-shadow: none;
    opacity: 1;
  }

  &:nth-child(3) {
    left: 60%;
  }
  &:nth-child(4) {
    left: calc(60% + 220px);
  }
  &:nth-child(5) {
    left: calc(60% + 440px);
  }
  &:nth-child(6) {
    left: calc(60% + 660px);
    opacity: 0;
  }
}

.content {
  width: min(30vw, 400px);
  position: absolute;
  top: 50%;
  left: 3rem;
  transform: translateY(-50%);
  font: 400 0.85rem helvetica, sans-serif;
  color: white;
  text-shadow: 0 3px 8px rgba(0, 0, 0, 0.5);
  opacity: 0;
  display: none;

  & .title {
    font-family: "arial-black";
    text-transform: uppercase;
  }

  & .description {
    line-height: 1.7;
    margin: 1rem 0 1.5rem;
    font-size: 0.8rem;
  }

  & button {
    width: fit-content;
    background-color: rgba(0, 0, 0, 0.1);
    color: white;
    border: 2px solid white;
    border-radius: 0.25rem;
    padding: 0.75rem;
    cursor: pointer;
  }
}

.item:nth-of-type(2) .content {
  display: block;
  animation: show 0.75s ease-in-out 0.3s forwards;
}

@keyframes show {
  0% {
    filter: blur(5px);
    transform: translateY(calc(-50% + 75px));
  }
  100% {
    opacity: 1;
    filter: blur(0);
  }
}

.nav {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  user-select: none;

  & .btn {
    background-color: rgba(255, 255, 255, 0.5);
    color: rgba(0, 0, 0, 0.7);
    border: 2px solid rgba(0, 0, 0, 0.6);
    margin: 0 0.25rem;
    padding: 0.75rem;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
}

@media (width > 650px) and (width < 900px) {
  .content {
    & .title {
      font-size: 1rem;
    }
    & .description {
      font-size: 0.7rem;
    }
    & button {
      font-size: 0.7rem;
    }
  }
  .item {
    width: 160px;
    height: 270px;

    &:nth-child(3) {
      left: 50%;
    }
    &:nth-child(4) {
      left: calc(50% + 170px);
    }
    &:nth-child(5) {
      left: calc(50% + 340px);
    }
    &:nth-child(6) {
      left: calc(50% + 510px);
      opacity: 0;
    }
  }
}

@media (width < 650px) {
  .content {
    & .title {
      font-size: 0.9rem;
    }
    & .description {
      font-size: 0.65rem;
    }
    & button {
      font-size: 0.7rem;
    }
  }
  .item {
    width: 130px;
    height: 220px;

    &:nth-child(3) {
      left: 50%;
    }
    &:nth-child(4) {
      left: calc(50% + 140px);
    }
    &:nth-child(5) {
      left: calc(50% + 280px);
    }
    &:nth-child(6) {
      left: calc(50% + 420px);
      opacity: 0;
    }
  }
}
</style>