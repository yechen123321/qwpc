<template>
  <header data-header class="page-header">
    <nav>
      <ul class="nav__list">
        <li class="nav__item">
          <a href="/">Our mission</a>
        </li>
        <li class="nav__item">
          <a href="/">Get in touch</a>
        </li>
        <li class="nav__item nav__item--cta">
          <a href="/">Book now</a>
        </li>
      </ul>
    </nav>
  </header>

  <main>
    <section class="section hero">
      <div class="hero__bg">
        <img
          class="hero__img"
          srcset="
            https://s3-us-west-2.amazonaws.com/s.cdpn.io/85648/hero_2000.jpg 2000w,
            https://s3-us-west-2.amazonaws.com/s.cdpn.io/85648/hero_1200.jpg 1200w,
            https://s3-us-west-2.amazonaws.com/s.cdpn.io/85648/hero_800.jpg   800w
          "
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/85648/hero_1200.jpg"
          alt="Rainforest view with sunset"
        />
      </div>
      <div class="hero__content" data-content>
        <div class="hero__text">
          <img
            class="hero__footprint"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/85648/footprint_01a.svg"
            alt="Dinosaur footprint"
          />
          <h1 class="hero__title">Dinosaur<br />Park</h1>
          <p class="hero__intro">Get ready for the ultimate adventure</p>
        </div>
      </div>
    </section>

    <section class="section gentle-giants">
      <header class="section__header">
        <h3 class="section__title">Explore & Discover</h3>
      </header>
      <div
        class="section__content section__content--gentle-giants"
        data-content
      >
        <img
          class="section__img"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/85648/parasaurolophus.svg"
          alt="Parasaurolophus"
        />
        <h2 class="section__main-title section__main-title--left">
          Gentle Giants
        </h2>
        <div class="section__intro gentle-giants__intro">
          <p>
            Go on safari and explore the world of our giant herbiverous
            dinosaurs – the largest animals to have ever lived.
          </p>
          <p><a href="">Find out more</a></p>
        </div>
      </div>
    </section>

    <section class="section carnivore-kingdom">
      <header class="section__header">
        <h3 class="section__title">Experience Adventures</h3>
      </header>
      <div class="section__content" data-content>
        <img
          class="section__img section__img--left"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/85648/trex.svg"
          alt="T-rex"
        />
        <h2 class="section__main-title section__main-title--right">
          Carnivore Kingdom
        </h2>
        <div class="section__intro carnivore-kingdom__intro">
          <p>
            Prepare to be terrified...walk among the largest, fiercest predators
            to ever have walked the earth.
          </p>
          <p><a href="">Find out more</a></p>
        </div>
      </div>
    </section>

    <section class="section aerial-adventure">
      <header class="section__header">
        <h3 class="section__title">Learn & Connect</h3>
      </header>
      <div class="section__content" data-content>
        <img
          class="section__img"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/85648/pterodactyl.svg"
          alt="Pterodactyl"
        />
        <h2 class="section__main-title section__main-title--left">
          Aerial Adventure
        </h2>
        <div class="section__intro aerial-adventure__intro">
          <p>Get a birds’ eye view of the most magnificent aerial predators!</p>
        </div>
      </div>
    </section>

    <section class="section U-Boat">
      <header class="section__header">
        <h3 class="section__title">Learn & Connect</h3>
      </header>
      <div class="section__content" data-content>
        <img
          class="section__img"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/85648/pterodactyl.svg"
          alt="Pterodactyl"
        />
        <h2 class="section__main-title section__main-title--left">
          Underwater Maze
        </h2>
        <div class="section__intro U-Boat__intro">
          <p>Get a birds’ eye view of the most magnificent aerial predators!</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted } from "vue";

// 配置项保持不变
const options = {
  rootMargin: "0px",
  threshold: 0.75,
};

// 回调函数保持不变
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    const { target } = entry;
    if (entry.intersectionRatio >= 0.75) {
      target.classList.add("is-visible");
    } else {
      target.classList.remove("is-visible");
    }
  });
};

// 将 DOM 操作移到 onMounted 钩子中
onMounted(() => {
  const sections = [...document.querySelectorAll("section")];
  const observer = new IntersectionObserver(callback, options);

  sections.forEach((section) => {
    const sectionChildren = [
      ...section.querySelector("[data-content]").children,
    ];

    sectionChildren.forEach((el, index) => {
      el.style.setProperty("--delay", `${index * 250}ms`);
    });

    observer.observe(section);
  });
});
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Anton|Overpass+Mono:600&display=swap");

/* Variables */
$sm: 40em;
$md: 60em;
$sm-h: 30em;

$font-heading: "Anton", sans-serif;
$font-body: "Overpass Mono", monospace;

$primary: #ffa700;

/* Mixins and functions */
@function rem($size) {
  $remSize: $size / 16px;
  @return #{$remSize}rem;
}

/* Reset */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Helvetica, sans-serif;
}

img {
  max-width: 100%;
  display: block;
  width: 100%;
  height: auto;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Typography */
body {
  font-family: $font-body;
}

h1,
h2,
h3 {
  font-family: $font-heading;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 1;
}

h1 {
  font-size: rem(48px);

  @media (min-width: $sm) {
    font-size: rem(80px);
  }

  @media (min-width: $md) {
    font-size: rem(110px);
  }
}

h2 {
  font-size: rem(30px);
  letter-spacing: 0.03em;
  margin: 0;

  @media (min-width: $sm) {
    font-size: rem(60px);
  }

  @media (min-width: $md) {
    font-size: rem(88px);
  }
}

a {
  color: inherit;
}

/* Header */
.page-header {
  position: fixed;
  z-index: 2;
  width: 100%;
}

/* Scroll behaviour */
main {
  @media (min-height: $sm-h) {
    scroll-snap-type: y mandatory;
    height: 100vh;
    overflow-y: scroll;
  }
}

/* Nav */
.nav__list {
  display: flex;
  height: rem(80px);
  align-items: center;
  justify-content: flex-end;
  padding: rem(10px) rem(20px);
}

.nav__item {
  a {
    color: white;
    display: block;
    text-decoration: none;
    padding: rem(12px) rem(20px);

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
}

.nav__item--cta {
  margin-left: rem(20px);

  a {
    font-family: $font-heading;
    font-size: rem(20px);
    text-transform: uppercase;
    line-height: 1;
    color: black;
    background: $primary;
    border-radius: rem(6px);
    min-width: rem(180px);
    text-align: center;

    &:hover,
    &:focus {
      text-decoration: none;
      background-color: darken($primary, 15%);
    }
  }
}

/* Sections */
.section {
  color: white;
  position: relative;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media (min-height: $sm-h) {
    height: 100vh;
  }

  a {
    text-decoration: underline;
    color: white;

    &:hover,
    &:focus {
      opacity: 0.7;
    }
  }
}

.section__header {
  display: none;
  position: sticky;
  top: 0;
  left: 0;
  padding: rem(20px);
  color: #6b6a67;
  height: rem(80px);
  flex: 0 0 auto;
  z-index: 2;
  align-items: center;
  width: 300px;
  clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%);
  background-color: black;

  @media (min-width: $md) {
    display: flex;
  }
}

.section__title {
  margin: 0;
  font-size: rem(22px);
  letter-spacing: 0.03rem;
}

.section__content {
  --pad: #{rem(20px)};
  padding: var(--pad);
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  position: relative;
  z-index: 1;

  @media (min-width: $md) {
    --pad: #{rem(40px)};
    display: grid;
    grid-template-columns: 4fr 3fr 1fr 4fr 2fr 2fr 4fr 1fr 3fr 4fr;
    grid-template-rows: minmax(0, 1fr) repeat(6, minmax(rem(40px), auto)) minmax(
        0,
        1fr
      );
    gap: rem(20px);
  }

  > * {
    @media (min-height: $sm-h) {
      opacity: 0;
      transform: translate3d(0, 4rem, 0);
      transition: opacity 800ms var(--delay),
        transform 800ms cubic-bezier(0.13, 0.07, 0.26, 0.99) var(--delay);
    }
  }
}

.is-visible {
  .section__content > * {
    opacity: 1;
    transform: translate3d(0, 1rem, 0);
  }

  .section__img {
    opacity: 0.75;
  }
}

.section__main-title {
  width: 100%;
  text-align: center;

  @media (min-width: $md) {
    text-align: left;
  }
}

.section__main-title--left {
  grid-column: 2 / -2;
  grid-row: 4 / 6;
}

.section__main-title--right {
  grid-column: 2 / -2;
  grid-row: 4 / 6;

  @media (min-width: $md) {
    text-align: right;
  }
}

.section__img {
  max-width: rem(300px);
  margin-bottom: rem(30px);
  grid-column: 4 / -1;
  grid-row: 1 / -1;

  @media (min-width: $md) {
    margin-bottom: 0;
    max-width: none;
  }
}

.section__img--left {
  grid-column: 1 / -4;
}

.section__intro {
  text-align: center;
  max-width: 50ch;

  @media (min-width: $md) {
    text-align: left;
  }
}

/* Hero */
.hero {
  max-height: rem(800px);
  position: relative;
  color: #fff;
  background-color: #364b3b;
  overflow: hidden;
}

.hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: rem(20px);
}

.hero__bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    top: 0;
    left: 0;
    background: radial-gradient(rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 1));
    opacity: 1;
    transition: opacity 4000ms;
  }
}

.is-visible {
  .hero__bg {
    filter: grayscale(0);

    &::after {
      opacity: 0.6;
    }
  }
}

.hero__text {
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  text-shadow: 0 0.1em rem(15px) rgba(0, 0, 0, 0.25);
}

.hero__title {
  margin-bottom: 0;
  width: 100%;
  z-index: 1;
}

.hero__intro {
  width: 100%;
  z-index: 1;

  @media (min-width: $md) {
    font-size: rem(22px);
  }
}

.hero__footprint {
  opacity: 0.7;
  position: absolute;
  width: 150%;
  height: 150%;
  object-fit: contain;
  object-position: cneter;
}

.gentle-giants {
  background-color: rgba(43, 138, 130, 0.8);
}

.gentle-giants__intro {
  grid-column: 3 / 6;
  grid-row: 6 / 8;
}

.gentle-giants__img {
  grid-column: 4 / -1;
  grid-row: 1 / -1;
}

.carnivore-kingdom__intro {
  grid-column: -6 / -3;
  grid-row: 6 / 8;
}

.aerial-adventure {
  background-color: rgba(138, 43, 68, 0.8);
}

.aerial-adventure__intro {
  grid-column: 3 / 6;
  grid-row: 6 / 8;
}

.U-Boat {
  background-color: rgba(138, 43, 68, 0.8);
}

.U-Boat__intro {
  grid-column: 3 / 6;
  grid-row: 6 / 8;
}
</style>