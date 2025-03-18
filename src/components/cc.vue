<template>
    <div id="timeline-1" class="timeline-container" :style="{ backgroundImage: `url(${activeImage})` }">
      <!-- 时间轴头部 -->
      <div class="timeline-header">
        <h2 class="timeline-header__title">Mustafa Kemal Atatürk</h2>
        <h3 class="timeline-header__subtitle">FATHER OF THE TURKS</h3>
      </div>
  
      <!-- 时间轴主体 -->
      <div class="timeline">
        <div
          v-for="(item, index) in timelineItems"
          :key="index"
          class="timeline-item"
          :class="{ 'timeline-item--active': activeIndex === index }"
          :data-text="item.dataText"
        >
          <div class="timeline__content">
            <img
              :src="item.image"
              :alt="`Timeline image for ${item.year}`"
              class="timeline__img"
            />
            <h2 class="timeline__content-title">{{ item.year }}</h2>
            <p class="timeline__content-desc" v-html="item.description"></p>
          </div>
        </div>
      </div>
  
      <!-- 页脚 -->
      <div class="demo-footer">
        <a
          href="http://www.turkishnews.com/Ataturk/life.htm"
          target="_blank"
        >
          Source/Kaynak
        </a>
      </div>
    </div>
  </template>


<script setup>
import { ref, onMounted, watch, computed } from 'vue';

// 时间轴数据
const timelineItems = ref([
  {
    year: '1881',
    image: 'http://i.cdn.ensonhaber.com/resimler/diger/ataturk_3473.jpg',
    description: 'He was born in 1881 (probably in the spring) in Salonica, then an Ottoman city, now in Greece. His father Ali Riza, a customs official turned lumber merchant, died when Mustafa was still a boy. His mother Zubeyde, a devout and strong-willed woman, raised him and his sister.',
    dataText: 'FATHER OF THE TURKS'
  },
  {
    year: '1893',
    image: 'http://gazetemanifesto.com/wp-content/uploads/2015/11/mustafa-kemal.jpg',
    description: 'First enrolled in a traditional religious school, he soon switched to a modern school. In 1893, he entered a military high school where his mathematics teacher gave him the second name Kemal (meaning perfection) in recognition of young Mustafa\'s superior achievement.',
    dataText: 'FATHER OF THE TURKS'
  },
  // 其他时间轴项...
  {
    year: '1938',
    image: 'http://www.bik.gov.tr/wp-content/uploads/2016/11/20161110_2_20037273_15856882.jpg?fit=1024%2C863',
    description: 'On November 10, 1938, following an illness of a few months, the national liberator and the Father of modern Turkey died. But his legacy to his people and to the world endures.',
    dataText: 'FATHER OF THE TURKS'
  }
]);

// 当前激活的时间轴项索引
const activeIndex = ref(0);

// 当前激活的时间轴项的图片
const activeImage = computed(() => timelineItems.value[activeIndex.value].image);

// 监听滚动事件
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// 清除事件监听器
watch(
  () => timelineItems.value,
  () => {
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll);
  }
);

// 处理滚动事件
const handleScroll = () => {
  const timelineItemsElements = document.querySelectorAll('.timeline-item');
  const scrollPosition = window.scrollY;

  timelineItemsElements.forEach((item, index) => {
    const itemTop = item.offsetTop;
    const itemHeight = item.offsetHeight;

    if (scrollPosition >= itemTop - itemHeight / 2 && scrollPosition < itemTop + itemHeight / 2) {
      activeIndex.value = index;
    }
  });
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Cardo|Pathway+Gothic+One');
// Responsive
@mixin responsive() {
  @media only screen and (max-width: 767px) {
    @content;
  }
}

$content-font: Cardo;
$heading-font: 'Pathway Gothic One', sans-serif;
$timeline-width: 700px;
$timeline-container-width: 100%;
.timeline {
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: $timeline-width;
  position: relative;
  &__content {
    &-title {
      font-weight: normal;
      font-size: 66px;
      margin: -10px 0 0 0;
      transition: .4s;
      padding: 0 10px;
      box-sizing: border-box;
      font-family: $heading-font;
      color: #fff;
    }
    &-desc {
      margin: 0;
      font-size: 15px;
      box-sizing: border-box;
      color: rgba(#fff, .7);
      font-family: $content-font;
      font-weight: normal;
      line-height: 25px;
    }
  }
  &:before {
    position: absolute;
    left: 50%;
    width: 2px;
    height: 100%;
    margin-left: -1px;
    content: "";
    background: rgba(255, 255, 255, .07);
    @include responsive() {
      left: 40px;
    }
  }
  &-item {
    padding: 40px 0;
    opacity: .3;
    filter: blur(2px);
    transition: .5s;
    box-sizing: border-box;
    width: calc(50% - 40px);
    display: flex;
    position: relative;
    transform: translateY(-80px);
    &:before {
      content: attr(data-text);
      letter-spacing: 3px;
      width: 100%;
      position: absolute;
      color: rgba(#fff, .5);
      font-size: 13px;
      font-family: $heading-font;
      border-left: 2px solid rgba(#fff, .5);
      top: 70%;
      margin-top: -5px;
      padding-left: 15px;
      opacity: 0;
      right: calc(-100% - 56px);
    }
    &:nth-child(even) {
      align-self: flex-end;
      &:before {
        right: auto;
        text-align: right;
        left: calc(-100% - 56px);
        padding-left: 0;
        border-left: none;
        border-right: 2px solid rgba(#fff, .5);
        padding-right: 15px;
      }
    }
    &--active {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0px);
      &:before {
        top: 50%;
        transition: .3s all .2s;
        opacity: 1;
      }
      .timeline__content-title {
        margin: -50px 0 20px 0;
      }
    }
    @include responsive() {
      align-self: baseline !important;
      width: 100%;
      padding: 0 30px 150px 80px;
      &:before {
        left: 10px !important;
        padding: 0 !important;
        top: 50px;
        text-align: center !important;
        width: 60px;
        border: none !important;
      }
      &:last-child {
        padding-bottom: 40px;
      }
    }
  }
  &__img {
    max-width: 100%;
    box-shadow: 0 10px 15px rgba(0, 0, 0, .4);
  }
  &-container {
    width: $timeline-container-width;
    position: relative;
    padding: 80px 0;
    transition: .3s ease 0s;
    background-attachment: fixed;
    background-size: cover;
    &:before {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(99, 99, 99, 0.8);
      content: "";
    }
  }
  &-header {
    width: 100%;
    text-align: center;
    margin-bottom: 80px;
    position: relative;
    &__title {
      color: #fff;
      font-size: 46px;
      font-family: $content-font;
      font-weight: normal;
      margin: 0;
    }
    &__subtitle {
      color: rgba(255, 255, 255, .5);
      font-family: $heading-font;
      font-size: 16px;
      letter-spacing: 5px;
      margin: 10px 0 0 0;
      font-weight: normal;
    }
  }
}

// DEMO
.demo-footer {
  padding: 60px 0;
  text-align: center;
  a {
    color: #999;
    display: inline-block;
    font-family: $content-font;
  }
}
</style>