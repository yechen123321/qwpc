<template>
  <section class="intro">
    <div class="container">
      <h1>Vertical Timeline &darr;</h1>
      <p>
        Timeline v2
        <a href="https://codepen.io/tutsplus/pen/zYQqPYG" target="_blank"
          >here</a
        >
      </p>
    </div>
  </section>

  <section class="timeline">
    <ul>
      <li>
        <div>
          <time>1934</time> At vero eos et accusamus et iusto odio dignissimos
          ducimus qui blanditiis praesentium At vero eos et accusamus et iusto
          odio dignissimos ducimus qui blanditiis praesentium
        </div>
      </li>
      <li>
        <div>
          <time>1937</time> Proin quam velit, efficitur vel neque vitae, rhoncus
          commodo mi. Suspendisse finibus mauris et bibendum molestie. Aenean ex
          augue, varius et pulvinar in, pretium non nisi.
        </div>
      </li>
      <li>
        <div>
          <time>1940</time> Proin iaculis, nibh eget efficitur varius, libero
          tellus porta dolor, at pulvinar tortor ex eget ligula. Integer eu
          dapibus arcu, sit amet sollicitudin eros.
        </div>
      </li>
      <li>
        <div>
          <time>1943</time> In mattis elit vitae odio posuere, nec maximus massa
          varius. Suspendisse varius volutpat mattis. Vestibulum id magna est.
        </div>
      </li>
      <li>
        <div>
          <time>1946</time> In mattis elit vitae odio posuere, nec maximus massa
          varius. Suspendisse varius volutpat mattis. Vestibulum id magna est.
        </div>
      </li>
      <li>
        <div>
          <time>1956</time> In mattis elit vitae odio posuere, nec maximus massa
          varius. Suspendisse varius volutpat mattis. Vestibulum id magna est.
        </div>
      </li>
      <li>
        <div>
          <time>1957</time> In mattis elit vitae odio posuere, nec maximus massa
          varius. Suspendisse varius volutpat mattis. Vestibulum id magna est.
        </div>
      </li>
      <li>
        <div>
          <time>1967</time> Aenean condimentum odio a bibendum rhoncus. Ut
          mauris felis, volutpat eget porta faucibus, euismod quis ante.
        </div>
      </li>
      <li>
        <div>
          <time>1977</time> Vestibulum porttitor lorem sed pharetra dignissim.
          Nulla maximus, dui a tristique iaculis, quam dolor convallis enim, non
          dignissim ligula ipsum a turpis.
        </div>
      </li>
      <li>
        <div>
          <time>1985</time> In mattis elit vitae odio posuere, nec maximus massa
          varius. Suspendisse varius volutpat mattis. Vestibulum id magna est.
        </div>
      </li>
      <li>
        <div>
          <time>2000</time> In mattis elit vitae odio posuere, nec maximus massa
          varius. Suspendisse varius volutpat mattis. Vestibulum id magna est.
        </div>
      </li>
      <li>
        <div>
          <time>2005</time> In mattis elit vitae odio posuere, nec maximus massa
          varius. Suspendisse varius volutpat mattis. Vestibulum id magna est.
        </div>
      </li>
    </ul>
  </section>
  <footer class="page-footer">
    <span>made by </span>
    <a href="https://georgemartsoukos.com/" target="_blank">
      <img
        width="24"
        height="24"
        src="https://assets.codepen.io/162656/george-martsoukos-small-logo.svg"
        alt="George Martsoukos logo"
      />
    </a>
  </footer>
</template>

<script>
import { onBeforeUnmount, onMounted } from 'vue'

export default {
  setup() {
    let items;
    
    // 检查元素是否在视口中
    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    const callbackFunc = () => {
      items = document.querySelectorAll(".timeline li");
      for (let i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("in-view");
        }
      }
    };

    onMounted(() => {
      // 监听事件
      window.addEventListener("load", callbackFunc);
      window.addEventListener("resize", callbackFunc);
      window.addEventListener("scroll", callbackFunc);
    });

    onBeforeUnmount(() => {
      // 组件销毁时移除事件监听
      window.removeEventListener("load", callbackFunc);
      window.removeEventListener("resize", callbackFunc);
      window.removeEventListener("scroll", callbackFunc);
    });
  }
};
</script>
<style scoped>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  color: inherit;
}

body {
  font: normal 16px/1.5 "Helvetica Neue", sans-serif;
  background: #456990;
  color: #fff;
  overflow-x: hidden;
  padding-bottom: 50px;
}

/* INTRO SECTION
–––––––––––––––––––––––––––––––––––––––––––––––––– */

.intro {
  background: #f45b69;
  padding: 100px 0;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
}

/* TIMELINE
–––––––––––––––––––––––––––––––––––––––––––––––––– */

.timeline {
  font: normal 16px/1.5 "Helvetica Neue", sans-serif;
  background: #456990;
  color: #fff;
  overflow-x: hidden;
  padding-bottom: 50px;
}

.timeline ul {
  background: #456990;
  padding: 50px 0;
}

.timeline ul li {
  list-style-type: none;
  position: relative;
  width: 6px;
  margin: 0 auto;
  padding-top: 50px;
  background: #fff;
}

.timeline ul li::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: inherit;
  z-index: 1;
}

.timeline ul li div {
  position: relative;
  bottom: 0;
  width: 400px;
  padding: 15px;
  background: #f45b69;
}

.timeline ul li div::before {
  content: "";
  position: absolute;
  bottom: 7px;
  width: 0;
  height: 0;
  border-style: solid;
}

.timeline ul li:nth-child(odd) div {
  left: 45px;
}

.timeline ul li:nth-child(odd) div::before {
  left: -15px;
  border-width: 8px 16px 8px 0;
  border-color: transparent #f45b69 transparent transparent;
}

.timeline ul li:nth-child(even) div {
  left: -439px;
}

.timeline ul li:nth-child(even) div::before {
  right: -15px;
  border-width: 8px 0 8px 16px;
  border-color: transparent transparent transparent #f45b69;
}

time {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
}

/* EFFECTS
–––––––––––––––––––––––––––––––––––––––––––––––––– */

.timeline ul li::after {
  transition: background 0.5s ease-in-out;
}

.timeline ul li.in-view::after {
  background: #f45b69;
}

.timeline ul li div {
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s ease-in-out;
}

.timeline ul li:nth-child(odd) div {
  transform: translate3d(200px, 0, 0);
}

.timeline ul li:nth-child(even) div {
  transform: translate3d(-200px, 0, 0);
}

.timeline ul li.in-view div {
  transform: none;
  visibility: visible;
  opacity: 1;
}

/* GENERAL MEDIA QUERIES
–––––––––––––––––––––––––––––––––––––––––––––––––– */

@media screen and (max-width: 900px) {
  .timeline ul li div {
    width: 250px;
  }
  .timeline ul li:nth-child(even) div {
    left: -289px;
    /*250+45-6*/
  }
}

@media screen and (max-width: 600px) {
  .timeline ul li {
    margin-left: 20px;
  }
  .timeline ul li div {
    width: calc(100vw - 91px);
  }
  .timeline ul li:nth-child(even) div {
    left: 45px;
  }
  .timeline ul li:nth-child(even) div::before {
    left: -15px;
    border-width: 8px 16px 8px 0;
    border-color: transparent #f45b69 transparent transparent;
  }
}

/* EXTRA/CLIP PATH STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.timeline-clippy ul li::after {
  width: 40px;
  height: 40px;
  border-radius: 0;
}

.timeline-rhombus ul li::after {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.timeline-rhombus ul li div::before {
  bottom: 12px;
}

.timeline-star ul li::after {
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
}

.timeline-heptagon ul li::after {
  clip-path: polygon(
    50% 0%,
    90% 20%,
    100% 60%,
    75% 100%,
    25% 100%,
    0% 60%,
    10% 20%
  );
}

.timeline-infinite ul li::after {
  animation: scaleAnimation 2s infinite;
}

@keyframes scaleAnimation {
  0% {
    transform: translateX(-50%) scale(1);
  }
  50% {
    transform: translateX(-50%) scale(1.25);
  }
  100% {
    transform: translateX(-50%) scale(1);
  }
}

/* FOOTER STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.page-footer {
  position: fixed;
  right: 0;
  bottom: 20px;
  display: flex;
  align-items: center;
  padding: 5px;
  color: black;
  background: rgba(255, 255, 255, 0.65);
}

.page-footer a {
  display: flex;
  margin-left: 4px;
}
</style>
