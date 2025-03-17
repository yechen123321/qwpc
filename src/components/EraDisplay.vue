<template>
  <div 
    class="era-display"
    :style="{ backgroundColor: era.color }"
  >
    <!-- Background pattern -->
    <div class="background-pattern" :style="patternStyle"></div>
    
    <!-- Era content with image as background -->
    <div class="era-content">
      <!-- Era image container with two images for seamless transition -->
      <div class="era-image-container">
        <!-- Current image (始终显示，直到新图片完全替换) -->
        <img 
          :src="currentImage" 
          :alt="era.name" 
          class="era-image current-image"
          :class="{ 'slide-out': isTransitioning }"
        />
        <!-- Next image (新图片加载并滑入) -->
        <img 
          v-if="nextImage"
          :src="nextImage" 
          :alt="era.name" 
          class="era-image next-image"
          :class="{ 'slide-in': isTransitioning }"
        />
        
        <!-- Overlay gradient for better text readability -->
        <div class="image-overlay" :style="{ background: `linear-gradient(to bottom, transparent, ${era.color}E6)` }"></div>
        
        <!-- Era time badge -->
        <div 
          class="era-time-badge"
          :style="{ backgroundColor: `${era.color}CC` }"
          :class="textColorClass"
        >
          {{ era.startMya }}-{{ era.endMya }} 百万年前
        </div>
        
        <!-- Era description floating over the image -->
        <div class="era-description">
          <h1 class="era-title" :class="textColorClass">
            {{ era.name }}
          </h1>
          
          <div class="era-text" :class="isDarkColor ? 'light-text' : 'dark-text'">
            <p class="era-summary">
              {{ eraDescription }}
            </p>
            
            <h3 class="era-features-title">主要特征</h3>
            <ul class="era-features-list">
              <li v-for="(feature, index) in eraFeatures" :key="index">
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  era: {
    type: Object,
    required: true
  }
});

// 管理当前图片和下一张图片
const currentImage = ref('');
const nextImage = ref(null);
const isTransitioning = ref(false);

// 定义 eraImage
const eraImage = computed(() => {
  switch (props.era.id) {
    case 'cambrian':
      return "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop";
    case 'ordovician':
      return "https://images.unsplash.com/photo-1478479405421-ce83c92fb3ba?q=80&w=2000&auto=format&fit=crop";
    case 'silurian':
      return "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=2000&auto=format&fit=crop";
    case 'devonian':
      return "https://images.unsplash.com/photo-1621188988909-fbef0a88dc04?q=80&w=2000&auto=format&fit=crop";
    case 'carboniferous':
      return "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=2000&auto=format&fit=crop";
    case 'permian':
      return "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop";
    case 'triassic':
      return "https://images.unsplash.com/photo-1519074031893-eff5d79b3f0c?q=80&w=2000&auto=format&fit=crop";
    case 'jurassic':
      return "https://images.unsplash.com/photo-1606856110002-d0991ce78250?q=80&w=2000&auto=format&fit=crop";
    case 'cretaceous':
      return "https://images.unsplash.com/photo-1525877442103-5ddb2089b2bb?q=80&w=2000&auto=format&fit=crop";
    case 'paleogene':
      return "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=2000&auto=format&fit=crop";
    case 'neogene':
      return "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=2000&auto=format&fit=crop";
    case 'quaternary':
      return "https://images.unsplash.com/photo-1552799446-159ba9523315?q=80&w=2000&auto=format&fit=crop";
    default:
      return "/placeholder.svg?height=600&width=800";
  }
});

// 初始化当前图片
currentImage.value = eraImage.value;

// 监听 era.id 变化以触发图片过渡
watch(() => props.era.id, (newId, oldId) => {
  if (newId !== oldId) {
    // 设置新图片并开始过渡
    nextImage.value = eraImage.value;
    isTransitioning.value = true;

    // 预加载新图片
    const img = new Image();
    img.src = nextImage.value;
    img.onload = () => {
      // 新图片加载完成后，更新当前图片并结束过渡
      setTimeout(() => {
        currentImage.value = nextImage.value;
        nextImage.value = null;
        isTransitioning.value = false;
      }, 1000); // 与 CSS 动画时间一致（1秒）
    };
  }
});

// Era descriptions - more detailed and poetic
const eraDescriptions = {
  cambrian:
    "寒武纪是生命爆发的序章，海洋中突然涌现出前所未有的生物多样性。这一时期的生命形式奇特而多变，为地球生命的演化奠定了基础。三叶虫在浅海中游弋，奇妙的布尔吉斯页岩生物群展示了早期生命的无限可能。",
  ordovician:
    "奥陶纪的海洋中，生命继续蓬勃发展。第一批脊椎动物——无颌鱼类悄然出现，开启了脊椎动物演化的漫长旅程。与此同时，最早的植物开始尝试登陆，为未来的陆地生态系统埋下种子。",
  silurian:
    "志留纪的海洋中，有颌鱼类的出现标志着捕食者的进化。陆地上，植物开始扎根并繁衍，形成了最早的陆地生态系统，为未来的生命登陆创造了条件。",
  devonian:
    "泥盆纪被誉为'鱼类的黄金时代'，各种鱼类在海洋中繁盛。陆地上，第一批真正的森林出现，改变了大气成分。最重要的是，一些鱼类开始向两栖动物过渡，迈出了生命登陆的关键一步。",
  carboniferous:
    "石炭纪的地球是一个充满巨型昆虫的奇异世界。高含氧量的大气使蜻蜓翼展可达75厘米，巨型蜈蚣在茂密的森林中穿行。这些森林后来形成了今天的煤炭矿床，而第一批爬行动物也在此时出现。",
  permian:
    "二叠纪见证了盘古大陆的形成，所有大陆聚合为一体。哺乳型爬行动物开始出现，为哺乳动物的崛起埋下伏笔。然而，这一时期以地球历史上最严重的灭绝事件结束，约96%的海洋物种消失。",
  triassic:
    "三叠纪是生命复苏的时期。在大灭绝后的废墟上，新的生命形式崛起，包括最早的恐龙和小型哺乳动物。这是一个机遇与挑战并存的时代，为恐龙的统治奠定了基础。",
  jurassic:
    "侏罗纪是恐龙的黄金时代，巨型蜥脚类恐龙如梁龙在茂密的森林中漫步，掠食性恐龙如异特龙在猎食中展现敏捷。天空中，始祖鸟的出现标志着鸟类的起源，开启了征服天空的新篇章。",
  cretaceous:
    "白垩纪是恐龙统治的最后辉煌。霸王龙和三角龙等标志性恐龙出现，被子植物的演化改变了陆地生态系统。然而，一颗小行星的撞击结束了恐龙的统治，为哺乳动物的崛起创造了条件。",
  paleogene:
    "古近纪是哺乳动物的崛起时期。在恐龙灭绝后的空缺中，哺乳动物迅速多样化，占据了各种生态位。早期灵长类动物出现，为人类的演化埋下伏笔。",
  neogene:
    "新近纪见证了现代生态系统的形成。草原的扩张促进了草食动物的演化，人猿分化开启了人类独立演化的道路。早期人类祖先如南方古猿在非洲草原上直立行走，开始了人类征程。",
  quaternary:
    "第四纪是人类崛起的时代。冰河时期的气候波动塑造了现代生物分布格局，智人在非洲出现并扩散全球。农业革命彻底改变了人类生活方式，最终导致了现代文明的诞生和人类世的开始。",
};

// Era features - key characteristics
const eraFeatures = computed(() => {
  switch (props.era.id) {
    case "cambrian":
      return [
        "三叶虫成为海洋中的主要生物之一",
        "几乎所有现代动物门类的祖先在此时期出现",
        "奇特的有壳动物和软体动物多样化",
        "布尔吉斯页岩生物群展示了早期生命的多样性",
      ];
    case "ordovician":
      return [
        "无颌鱼类成为最早的脊椎动物",
        "海洋无脊椎动物多样性达到高峰",
        "最早的陆地植物开始出现",
        "末期发生大规模灭绝事件",
      ];
    case "silurian":
      return [
        "有颌鱼类的出现改变了海洋生态",
        "陆地植物开始广泛分布",
        "最早的陆地节肢动物出现",
        "全球海平面上升，形成广泛的浅海环境",
      ];
    case "devonian":
      return [
        "鱼类多样性达到历史高峰",
        "第一批真正的森林形成",
        "四足动物开始登陆",
        "末期发生大规模灭绝事件",
      ];
    case "carboniferous":
      return [
        "巨型昆虫和节肢动物繁盛",
        "广泛的煤炭森林覆盖陆地",
        "第一批真正的爬行动物出现",
        "高氧含量的大气环境",
      ];
    case "permian":
      return [
        "盘古大陆的形成改变全球气候",
        "哺乳型爬行动物出现",
        "爬行动物成为陆地主要脊椎动物",
        "末期发生地球历史上最严重的灭绝事件",
      ];
    case "triassic":
      return [
        "生命从二叠纪末期大灭绝中复苏",
        "最早的恐龙和哺乳动物出现",
        "针叶树成为主要植被",
        "末期发生灭绝事件，为恐龙繁盛创造条件",
      ];
    case "jurassic":
      return [
        "巨型蜥脚类恐龙如梁龙繁盛",
        "始祖鸟出现，标志鸟类起源",
        "针叶树和蕨类植物构成主要植被",
        "超大陆开始分裂",
      ];
    case "cretaceous":
      return [
        "霸王龙、三角龙等标志性恐龙出现",
        "被子植物出现并迅速多样化",
        "现代鸟类开始形成",
        "小行星撞击导致恐龙灭绝",
      ];
    case "paleogene":
      return [
        "哺乳动物迅速多样化",
        "早期灵长类动物出现",
        "现代鸟类辐射",
        "全球气候逐渐变冷",
      ];
    case "neogene":
      return [
        "草原生态系统扩张",
        "人猿分化",
        "南方古猿等早期人类祖先出现",
        "现代哺乳动物群形成",
      ];
    case "quaternary":
      return [
        "多次冰川期和间冰期交替",
        "智人出现并扩散全球",
        "农业革命改变人类生活方式",
        "人类活动成为地球变化的主要驱动力",
      ];
    default:
      return [];
  }
});

const eraDescription = computed(() => {
  return (
    eraDescriptions[props.era.id] ||
    `${props.era.name}是地球历史上的重要地质时期。`
  );
});

// Determine if the background color is dark or light to set appropriate text color
const isDarkColor = computed(() => {
  // Simple function to determine if a color is dark
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgb = hexToRgb(props.era.color);
  if (!rgb) return false;

  // Calculate brightness
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness < 128;
});

const textColorClass = computed(() => {
  return isDarkColor.value ? "light-text" : "dark-text";
});

// Background pattern style
const patternStyle = computed(() => {
  return {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='${encodeURIComponent(
      props.era.color
    )}' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    backgroundSize: "150px 150px",
  };
});
</script>
  
  <style>
/* Era display */
.era-display {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  transition: background-color 0.5s ease;
}

/* Background pattern */
.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: 1;
}

/* Era content */
.era-content {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Image container */
.era-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Era image (通用样式) */
.era-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

/* Current image (默认状态) */
.current-image {
  transform: translateX(0);
  transition: transform 1s ease-in-out; /* 平滑滑动 */
}

/* Next image (初始在右侧等待) */
.next-image {
  transform: translateX(100%);
  z-index: 2; /* 新图片在旧图片之上 */
  transition: transform 1s ease-in-out; /* 平滑滑动 */
}

/* 滑动退出动画 */
.slide-out {
  transform: translateX(-100%);
}

/* 滑动进入动画 */
.slide-in {
  transform: translateX(0);
}

/* Image overlay */
.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70%;
  z-index: 3;
}

/* Era time badge */
.era-time-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  z-index: 4;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* Era description */
.era-description {
  position: absolute;
  bottom: 10%;
  left: 0;
  width: 100%;
  padding: 40px;
  z-index: 4;
}

/* Era title */
.era-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Era text */
.era-text {
  max-width: 800px;
}

/* Era summary */
.era-summary {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 24px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* Era features title */
.era-features-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* Era features list */
.era-features-list {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 20px;
}

.era-features-list li {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 8px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* Text colors */
.light-text {
  color: #ffffff;
}

.dark-text {
  color: #1a1a1a;
}

/* Media queries for responsiveness */
@media (max-width: 768px) {
  .era-description {
    padding: 20px;
  }

  .era-title {
    font-size: 36px;
  }

  .era-summary {
    font-size: 16px;
  }

  .era-features-title {
    font-size: 18px;
  }

  .era-features-list li {
    font-size: 14px;
  }

  .era-time-badge {
    top: 10px;
    right: 10px;
    font-size: 12px;
    padding: 6px 12px;
  }
}

@media (max-width: 480px) {
  .era-title {
    font-size: 28px;
  }

  .era-summary {
    font-size: 14px;
  }

  .era-features-list li {
    font-size: 13px;
  }
}
</style>