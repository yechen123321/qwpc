<template>
  <div class="home">
    <NavBar />
    <!-- 主横幅区域 -->
    <section class="hero-section">
      <div class="carousel-container">
        <div class="carousel-track">
          <div
            v-for="(slide, index) in slides"
            :key="index"
            class="carousel-slide"
            :class="{
              active: currentSlide === index,
              selected: selectedSlide === index,
            }"
            @click="handleSlideClick(index)"
            @dblclick="handleDoubleClick"
          >
            <img :src="slide.image" :alt="slide.title" />
            <div class="slide-overlay"></div>
            <div class="slide-content">
              <span class="slide-number">0{{ index + 1 }}</span>
              <h2 class="slide-title">{{ slide.title }}</h2>
              <p class="slide-description">{{ slide.description }}</p>
            </div>
            <div
              class="slide-detail"
              :class="{ 'show-detail': selectedSlide === index }"
            >
              <h3>{{ slide.title }}</h3>
              <p>{{ slide.detail }}</p>
            </div>
          </div>
        </div>
        <!-- <div class="carousel-controls">
          <button @click.stop="prevSlide" class="control-btn prev">&lt;</button>
          <button @click.stop="nextSlide" class="control-btn next">&gt;</button>
        </div> -->
      </div>
    </section>

    <!-- 特色功能展示 -->
    <section class="feature-section">
      <div class="feature-content">
        <h2>3D交互式生物模型</h2>
        <p>突破传统学习方式，让知识更直观</p>
      </div>
      <div class="feature-image">
        <!-- 这里可以放置3D模型预览图 -->
      </div>
    </section>

    <!-- 知识问答展示 -->
    <section class="qa-section">
      <div class="qa-content">
        <h2>智能知识问答</h2>
        <p>专业解答，让学习更轻松</p>
        <el-button type="primary" size="large" class="learn-more"
          >立即体验</el-button
        >
      </div>
    </section>

    <!-- 生态系统展示 -->
    <section class="ecosystem-section">
      <div class="ecosystem-grid">
        <div class="ecosystem-item">
          <h3>海洋生态</h3>
          <p>探索海洋生物的奥秘</p>
        </div>
        <div class="ecosystem-item">
          <h3>陆地生态</h3>
          <p>了解陆地生物的演变</p>
        </div>
        <div class="ecosystem-item">
          <h3>空中生态</h3>
          <p>发现飞行生物的特点</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import slide1 from "../assets/images/12.png";
import NavBar from '../components/NavBar.vue';
const slides = [
  {
    image: slide1,
    title: "探索生命奥秘",
    description: "沉浸式体验生物世界",
    detail:
      "通过先进的3D建模技术，我们为您呈现最真实的生物世界。从微观的细胞结构到宏观的生态系统，让您身临其境地了解生命的奥秘。",
  },
  {
    image: slide1,
    title: "基因科技",
    description: "解密生命密码",
    detail:
      "深入浅出地讲解基因科技，从DNA双螺旋结构到基因编辑技术，帮助您理解现代生物科技的前沿发展。",
  },
  {
    image: slide1,
    title: "生态保护",
    description: "守护地球家园",
    detail:
      "探索地球生态系统的奥秘，了解生物多样性的重要性，以及我们如何能够为保护地球生态系统贡献力量。",
  },
  {
    image: slide1,
    title: "进化历程",
    description: "追溯生命起源",
    detail:
      "带您穿越时空，回顾生命演化的漫长历程，了解从单细胞生物到复杂生命体的进化过程。",
  },
];

const currentSlide = ref(0);
const selectedSlide = ref(0);

const nextSlide = () => {
  if (selectedSlide.value === -1) {
    // 只有在未选中状态下才自动轮播
    currentSlide.value = (currentSlide.value + 1) % slides.length;
  }
};

// const prevSlide = () => {
//   currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
// };

const handleSlideClick = (index: number) => {
  currentSlide.value = index;
  selectedSlide.value = index;
  stopAutoPlay(); // 点击时停止自动轮播
};

const handleDoubleClick = () => {
  selectedSlide.value = -1; // 重置选中状态
  startAutoPlay(); // 重新开始自动轮播
};

const autoPlayInterval = ref<number | null>(null);

const startAutoPlay = () => {
  selectedSlide.value = -1; // 重置选中状态
  autoPlayInterval.value = setInterval(() => {
    nextSlide();
  }, 3000);
};

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value);
    autoPlayInterval.value = null;
  }
};
// 视差滚动效果
const handleScroll = () => {
  const scrolled = window.scrollY;
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const offset = section.offsetTop - window.innerHeight / 2;
    if (scrolled > offset) {
      section.classList.add("visible");
    }
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  startAutoPlay();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  stopAutoPlay();
});
</script>

<!-- 修改样式部分 -->
<style scoped>
.hero-section {
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #000;
}

.carousel-controls {
  position: absolute;
  bottom: 40px;
  right: 40px;
  display: flex;
  gap: 20px;
  z-index: 10;
}

.control-btn {
  background: transparent;
  border: 2px solid white;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: white;
  color: black;
}

.carousel-container {
  width: 100%;
  height: 100vh;
  background: #000;
  overflow: hidden;
}

.carousel-track {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  gap: 0;
  transition: all 0.5s ease;
}

.carousel-slide {
  position: relative;
  height: 100%;
  transition: all 0.8s ease;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}

/* 修改轮播和选中状态的样式 */
.carousel-track:has(.carousel-slide.active:not(.selected)) {
  grid-template-columns: repeat(4, 25%);
}

.carousel-track:has(.carousel-slide.active:not(.selected)):has(
    .carousel-slide:nth-child(1).active
  ) {
  grid-template-columns: 31% 23% 23% 23%;
}

.carousel-track:has(.carousel-slide.active:not(.selected)):has(
    .carousel-slide:nth-child(2).active
  ) {
  grid-template-columns: 23% 31% 23% 23%;
}

.carousel-track:has(.carousel-slide.active:not(.selected)):has(
    .carousel-slide:nth-child(3).active
  ) {
  grid-template-columns: 23% 23% 31% 23%;
}

.carousel-track:has(.carousel-slide.active:not(.selected)):has(
    .carousel-slide:nth-child(4).active
  ) {
  grid-template-columns: 23% 23% 23% 31%;
}

/* 选中状态的样式 */
.carousel-track:has(.carousel-slide.selected):has(
    .carousel-slide:nth-child(1).selected
  ) {
  grid-template-columns: 70% 10% 10% 10%;
}

.carousel-track:has(.carousel-slide.selected):has(
    .carousel-slide:nth-child(2).selected
  ) {
  grid-template-columns: 10% 70% 10% 10%;
}

.carousel-track:has(.carousel-slide.selected):has(
    .carousel-slide:nth-child(3).selected
  ) {
  grid-template-columns: 10% 10% 70% 10%;
}

.carousel-track:has(.carousel-slide.selected):has(
    .carousel-slide:nth-child(4).selected
  ) {
  grid-template-columns: 10% 10% 10% 70%;
}

/* 淡出效果 */
.carousel-slide {
  opacity: 1;
  transition: all 0.8s ease;
}

.carousel-track:has(.active) .carousel-slide:not(.active) {
  opacity: 0.6;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 微调 */
  object-position: 30% center;
  transition: all 0.8s ease;
}

.carousel-slide.selected img {
  object-position: center;
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  transition: opacity 0.3s ease;
}

.carousel-slide.active .slide-overlay {
  opacity: 0;
}

.slide-detail {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.5s ease;
  position: absolute;
  font-size: 0.9rem;
  line-height: 1.6;
  color: white;
  top: 50%;
  left: 75%;
  transform: translate(-50%, calc(-50% + 30px));
  width: 50%;
  text-align: left;
  padding: 0 20px;
}

.slide-detail.show-detail {
  max-height: 200px;
  opacity: 1;
  transform: translate(-50%, -50%);
}

.slide-detail h3 {
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.5s ease 0.2s;
}

.slide-detail p {
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.5s ease 0.4s;
}

.slide-detail.show-detail h3,
.slide-detail.show-detail p {
  transform: translateY(0);
  opacity: 1;
}

.carousel-slide.selected .slide-content {
  transform: scale(1);
  opacity: 1;
  width: 90%;
}

.slide-content {
  position: absolute;
  bottom: 40px;
  left: 20px;
  color: white;
  z-index: 2;
  width: 80%;
  transition: all 0.8s ease;
  transform-origin: left center;
}

.carousel-slide:not(.active) .slide-content {
  transform: scale(0.8);
  opacity: 0.6;
}

.carousel-slide.active .slide-content {
  transform: scale(1);
  opacity: 1;
}

.slide-number {
  font-size: 1.2rem;
  opacity: 0.7;
  margin-bottom: 0.5rem;
  display: block;
  white-space: nowrap;
}

.slide-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.slide-description {
  font-size: 1rem;
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.carousel-controls {
  position: absolute;
  bottom: 40px;
  right: 40px;
  display: flex;
  gap: 20px;
  z-index: 3;
}

.control-btn {
  background: transparent;
  border: 2px solid white;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: white;
  color: black;
}

.feature-section,
.qa-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 4rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s ease;
}

.feature-section.visible,
.qa-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.feature-content,
.qa-content {
  max-width: 600px;
}

.feature-content h2,
.qa-content h2 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(120deg, #1890ff, #36cfc9);
  -webkit-background-clip: text;
  color: transparent;
}

.ecosystem-section {
  padding: 4rem;
  background: #f8fafc;
}

.ecosystem-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.ecosystem-item {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.ecosystem-item:hover {
  transform: translateY(-10px);
}

.learn-more {
  margin-top: 2rem;
  padding: 12px 32px;
  font-size: 1.1rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .ecosystem-grid {
    grid-template-columns: 1fr;
  }

  .feature-section,
  .qa-section {
    padding: 2rem;
  }
}
</style>