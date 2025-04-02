<template>
  <div class="species-detail">
    <!-- Species Header -->
    <header class="species-header">
      <div class="container">
        <div class="breadcrumb">
          <a href="#" @click.prevent="goBack">主页</a> &gt;
          <a href="#" @click.prevent="goToCategory">{{ species.category }}</a>
          &gt;
          <span>{{ species.name }}</span>
        </div>

        <div class="header-content">
          <div class="species-titles">
            <h1>{{ species.name }}</h1>
            <p class="scientific-name">{{ species.scientificName }}</p>
            <div class="taxonomy">
              <span
                >界: <strong>{{ species.taxonomy.kingdom }}</strong></span
              >
              <span
                >门: <strong>{{ species.taxonomy.phylum }}</strong></span
              >
              <span
                >纲: <strong>{{ species.taxonomy.class }}</strong></span
              >
              <span
                >目: <strong>{{ species.taxonomy.order }}</strong></span
              >
              <span
                >科: <strong>{{ species.taxonomy.family }}</strong></span
              >
            </div>
          </div>

          <div
            class="conservation-badge"
            :class="getStatusClass(species.conservationStatus.status)"
          >
            <span class="status-icon"></span>
            <span class="status-text">{{
              species.conservationStatus.status
            }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="species-main">
      <div class="container">
        <div class="content-grid">
          <!-- Image Gallery Section -->
          <section class="image-gallery">
            <div
              class="main-image"
              :style="{ backgroundImage: `url(${currentImage})` }"
              @click="openZoomView"
            >
              <div class="zoom-hint">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
                <span>点击放大</span>
              </div>
            </div>

            <div class="thumbnails">
              <button
                v-for="(image, index) in species.images"
                :key="index"
                class="thumbnail"
                :class="{ active: currentImage === image.url }"
                @click="setCurrentImage(image.url)"
              >
                <img :src="image.url" :alt="image.caption" />
              </button>
            </div>

            <div class="image-caption">
              {{ getCurrentImageCaption() }}
            </div>
          </section>

          <!-- Quick Facts -->
          <section class="quick-facts">
            <h2>简要事实</h2>
            <div class="fact-grid">
              <div class="fact-item">
                <div class="fact-icon habitat-icon">
                  <img src="/src/assets/qxd.svg" style="width: 70%; height: 70%; margin: 5px 5px" alt="">
                </div>
                <div class="fact-content">
                  <h3>栖息地</h3>
                  <p>{{ species.quickFacts.habitat }}</p>
                </div>
              </div>
              
              <div class="fact-item">
                <div class="fact-icon diet-icon">
                  <img src="/src/assets/ys.svg" style="width: 70%; height: 70%; margin: 5px 5px" alt="">
                </div>
                <div class="fact-content">
                  <h3>饮食</h3>
                  <p>{{ species.quickFacts.diet }}</p>
                </div>
              </div>
              
              <div class="fact-item">
                <div class="fact-icon lifespan-icon">
                  <img src="/src/assets/sm.svg" style="width: 70%; height: 70%; margin: 5px 5px" alt="">
                </div>
                <div class="fact-content">
                  <h3>寿命</h3>
                  <p>{{ species.quickFacts.lifespan }}</p>
                </div>
              </div>
              
              <div class="fact-item">
                <div class="fact-icon size-icon">
                  <img src="/src/assets/cc.svg" style="width: 70%; height: 70%; margin: 5px 5px" alt="">
                </div>
                <div class="fact-content">
                  <h3>尺寸</h3>
                  <p>{{ species.quickFacts.size }}</p>
                </div>
              </div>
              
              <div class="fact-item">
                <div class="fact-icon weight-icon">
                  <img src="/src/assets/zl.svg" style="width: 70%; height: 70%; margin: 5px 5px" alt="">
                </div>
                <div class="fact-content">
                  <h3>重量</h3>
                  <p>{{ species.quickFacts.weight }}</p>
                </div>
              </div>
              
              <div class="fact-item">
                <div class="fact-icon population-icon">
                  <img src="/src/assets/sl.svg" style="width: 70%; height: 70%; margin: 5px 5px" alt="">
                </div>
                <div class="fact-content">
                  <h3>数量</h3>
                  <p>{{ species.quickFacts.population }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Detailed Information Tabs -->
        <section class="detailed-info">
          <div class="tabs">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="tab-button"
              :class="{ active: activeTab === tab.id }"
              @click="activeTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>

          <div class="tab-content">
            <!-- Characteristics Tab -->
            <div v-if="activeTab === 'characteristics'" class="tab-panel">
              <h2>物理特性</h2>
              <div class="info-content">
                <p
                  v-for="(paragraph, index) in species.characteristics.physical"
                  :key="'phys-' + index"
                >
                  {{ paragraph }}
                </p>

                <h3>行为</h3>
                <p
                  v-for="(paragraph, index) in species.characteristics.behavior"
                  :key="'behav-' + index"
                >
                  {{ paragraph }}
                </p>

                <h3>生命周期</h3>
                <p
                  v-for="(paragraph, index) in species.characteristics
                    .lifeCycle"
                  :key="'life-' + index"
                >
                  {{ paragraph }}
                </p>
              </div>
            </div>

            <!-- Habitat Tab -->
            <div v-if="activeTab === 'habitat'" class="tab-panel">
              <h2>栖息地与分布</h2>
              <div class="info-content">
                <div class="habitat-map">
                  <!-- <img :src="species.habitat.mapImage" alt="Distribution map"> -->
                  <Maps style="height: 400px"></Maps>
                  <p class="map-caption">
                    Geographical distribution of {{ species.name }}
                  </p>
                </div>

                <h3>自然栖息地</h3>
                <p
                  v-for="(paragraph, index) in species.habitat.description"
                  :key="'hab-' + index"
                >
                  {{ paragraph }}
                </p>

                <h3>地理范围</h3>
                <p>{{ species.habitat.geographicalRange }}</p>

                <div class="habitat-regions">
                  <h3>区域</h3>
                  <div class="region-tags">
                    <span
                      v-for="(region, index) in species.habitat.regions"
                      :key="index"
                      class="region-tag"
                    >
                      {{ region }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Diet Tab -->
            <div v-if="activeTab === 'diet'" class="tab-panel">
              <h2>饮食与喂养</h2>
              <div class="info-content">
                <p
                  v-for="(paragraph, index) in species.diet.description"
                  :key="'diet-' + index"
                >
                  {{ paragraph }}
                </p>

                <h3>饮食结构</h3>
                <ul class="food-list">
                  <li
                    v-for="(food, index) in species.diet.foodSources"
                    :key="index"
                  >
                    {{ food }}
                  </li>
                </ul>

                <h3>进食行为</h3>
                <p>{{ species.diet.feedingBehavior }}</p>
              </div>
            </div>

            <!-- Conservation Tab -->
            <div v-if="activeTab === 'conservation'" class="tab-panel">
              <h2>保护现状</h2>
              <div class="info-content">
                <div class="conservation-status">
                  <div
                    class="status-indicator"
                    :class="getStatusClass(species.conservationStatus.status)"
                  >
                    <span class="status-label">{{
                      species.conservationStatus.status
                    }}</span>
                  </div>
                  <div class="status-scale">
                    <div
                      class="scale-item"
                      :class="{ active: isStatusActive('无危') }"
                    >
                      无危
                    </div>
                    <div
                      class="scale-item"
                      :class="{ active: isStatusActive('近危') }"
                    >
                      近危
                    </div>
                    <div
                      class="scale-item"
                      :class="{ active: isStatusActive('易危') }"
                    >
                      易危
                    </div>
                    <div
                      class="scale-item"
                      :class="{ active: isStatusActive('濒危') }"
                    >
                      濒危
                    </div>
                    <div
                      class="scale-item"
                      :class="{ active: isStatusActive('极度濒危') }"
                    >
                      极度濒危
                    </div>
                    <div
                      class="scale-item"
                      :class="{ active: isStatusActive('野外灭绝') }"
                    >
                      野外灭绝
                    </div>
                    <div
                      class="scale-item"
                      :class="{ active: isStatusActive('灭绝') }"
                    >
                      灭绝
                    </div>
                  </div>
                </div>

                <p>{{ species.conservationStatus.description }}</p>

                <h3>威胁</h3>
                <ul class="threats-list">
                  <li
                    v-for="(threat, index) in species.conservationStatus
                      .threats"
                    :key="index"
                  >
                    {{ threat }}
                  </li>
                </ul>

                <h3>保护工作</h3>
                <p
                  v-for="(effort, index) in species.conservationStatus.efforts"
                  :key="index"
                >
                  {{ effort }}
                </p>

                <div class="conservation-organizations">
                  <h3>参与组织</h3>
                  <div class="org-list">
                    <a
                      v-for="(org, index) in species.conservationStatus
                        .organizations"
                      :key="index"
                      :href="org.url"
                      target="_blank"
                      class="org-item"
                    >
                      {{ org.name }}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'model'" class="tab-panel">
              <ModelViewer style="height: 800px"></ModelViewer>
            </div>
          </div>
        </section>

        <!-- Related Species -->
        <section class="related-species">
          <h2>相关物种</h2>
          <div class="related-grid">
            <div
              v-for="related in species.relatedSpecies"
              :key="related.id"
              class="related-card"
              @click="navigateToSpecies(related.id)"
            >
              <div class="related-image">
                <img :src="related.image" :alt="related.name" />
                <div
                  class="related-status"
                  v-if="related.status"
                  :class="getStatusClass(related.status)"
                ></div>
              </div>
              <div class="related-info">
                <h3>{{ related.name }}</h3>
                <p class="scientific-name">{{ related.scientificName }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- References -->
        <section class="references">
          <h2>参考文献及进一步阅读</h2>
          <ul class="reference-list">
            <li v-for="(reference, index) in species.references" :key="index">
              <a :href="reference.url" target="_blank">{{ reference.title }}</a>
              <span class="reference-author">{{ reference.author }}</span>
              <span class="reference-year">({{ reference.year }})</span>
            </li>
          </ul>
        </section>
      </div>
    </main>

    <!-- Image Zoom Modal -->
    <div class="zoom-modal" v-if="zoomActive" @click="closeZoomView">
      <div class="zoom-container">
        <img :src="currentImage" :alt="getCurrentImageCaption()" />
        <button class="close-zoom" @click.stop="closeZoomView">×</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import ModelViewer from "./Models.vue";
import Maps from "./mapscopy.vue";

const router = useRouter();
// State
const activeTab = ref("characteristics");
const currentImage = ref("");
const zoomActive = ref(false);

// Tabs configuration
const tabs = [
  { id: "characteristics", label: "特征" },
  { id: "habitat", label: "栖息地与分布" },
  { id: "diet", label: "饮食与喂养" },
  { id: "conservation", label: "保护" },
  { id: "model", label: "模型" },
];

// Sample species data (in a real app, this would come from an API)
const species = {
  id: "diana-monkey",
  name: "戴安娜猴",
  scientificName: "Cercopithecus diana",
  category: "灵长类动物",
  taxonomy: {
    kingdom: "动物界",
    phylum: "脊索动物门",
    class: "哺乳纲",
    order: "灵长目",
    family: "猴科",
  },
  conservationStatus: {
    status: "易危",
    description:
      "戴安娜猴被列为《世界自然保护联盟濒危物种红色名录》的易危等级。主要威胁包括栖息地丧失、森林砍伐和狩猎。保护工作包括栖息地保护和反偷猎巡逻。",
    threats: ["栖息地丧失", "森林砍伐", "狩猎", "宠物贸易"],
    efforts: ["建立保护区", "反偷猎巡逻", "社区教育项目"],
    organizations: [
      { name: "世界自然基金会", url: "#" },
      { name: "国际灵长类保护协会", url: "#" },
      { name: "西非灵长类保护计划", url: "#" },
    ],
  },
  images: [
    {
      url: "/src/assets/dan/danss.png?height=600&width=800",
      caption: "戴安娜猴在树上休息",
    },
    {
      url: "/src/assets/dan/face.png?height=600&width=800",
      caption: "戴安娜猴面部特写",
    },
    {
      url: "/src/assets/dan/hq.png?height=600&width=800",
      caption: "戴安娜猴群",
    },
  ],
  quickFacts: {
    habitat: "西非热带雨林",
    diet: "水果、叶子、昆虫",
    lifespan: "20-30年",
    size: "体长40-55厘米，尾长60-75厘米",
    weight: "4-8千克",
    population: "数量减少，具体数据不详",
  },
  characteristics: {
    physical: [
      "黑白相间的毛色，面部有明显白色斑纹",
      "长尾巴，有助于在树上保持平衡",
      "手指和脚趾有吸盘状结构，适合抓握",
    ],
    behavior: [
      "日间活动，树栖生活",
      "群居，群体通常由一只成年雄性和多只雌性及幼崽组成",
      "使用多种叫声进行交流",
    ],
    lifeCycle: [
      "雌性2-3岁性成熟",
      "妊娠期约5个月",
      "通常每胎产一仔",
      "幼崽依赖母亲约6个月",
    ],
  },
  habitat: {
    description: ["栖息于西非的热带雨林和次生林", "偏好高大树木的中上层"],
    geographicalRange: "几内亚、塞拉利昂、利比里亚、科特迪瓦、加纳",
    regions: ["几内亚", "塞拉利昂", "利比里亚", "科特迪瓦", "加纳"],
    mapImage: "/placeholder.svg",
  },
  diet: {
    description: [
      "以水果为主食，也吃叶子、花、昆虫和小型无脊椎动物",
      "使用手指灵活摘取食物",
    ],
    foodSources: ["热带水果", "嫩叶", "昆虫", "蜘蛛"],
    feedingBehavior: "在树冠层觅食，使用手指摘取食物",
  },
  relatedSpecies: [
    {
      id: "sooty-monkey",
      name: "烟色猴",
      scientificName: "Cercopithecus mona",
      image: "/src/assets/dan/ysh.png?",
      status: "无危",
    },
    {
      id: "crowned-monkey",
      name: "冠毛猴",
      scientificName: "Cercopithecus pogonias",
      image: "/src/assets/dan/gmh.png",
      status: "易危",
    },
    {
      id: "red-monkey",
      name: "赤猴",
      scientificName: "Cercopithecus erythrarcys",
      image: "/src/assets/dan/ch.png",
      status: "濒危",
    },
  ],
  references: [
    {
      title: "《世界自然保护联盟濒危物种红色名录：戴安娜猴》",
      author: "IUCN",
      year: 2022,
      url: "#",
    },
    {
      title: "《西非灵长类动物保护现状》",
      author: "Smith, A. 与 Jones, B.",
      year: 2021,
      url: "#",
    },
    {
      title: "《戴安娜猴的行为学研究》",
      author: "Brown, C. 等",
      year: 2020,
      url: "#",
    },
  ],
};

// Set initial image
currentImage.value = species.images[0].url;

// Methods
const setCurrentImage = (url) => {
  currentImage.value = url;
};

const getCurrentImageCaption = () => {
  const image = species.images.find((img) => img.url === currentImage.value);
  return image ? image.caption : "";
};

const openZoomView = () => {
  zoomActive.value = true;
  document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
};

const closeZoomView = () => {
  zoomActive.value = false;
  document.body.style.overflow = ""; // Restore scrolling
};

const getStatusClass = (status) => {
  const statusMap = {
    无危: "status-lc",
    近危: "status-nt",
    易危: "status-vu",
    濒危: "status-en",
    极度濒危: "status-cr",
    野外灭绝: "status-ew",
    灭绝: "status-ex",
  };

  return statusMap[status] || "";
};

const isStatusActive = (status) => {
  return species.conservationStatus.status === status;
};

const navigateToSpecies = (id) => {
  console.log("Navigate to species:", id);
  // In a real app, this would navigate to the new species page
};

const goBack = () => {
  console.log("Go back to home");
  router.push({ name: "library" });
  // In a real app, this would navigate back to the home page
};

const goToCategory = () => {
  console.log("Go to category:", species.category);
  // In a real app, this would navigate to the category page
};
</script>

<style>
/* Base Styles */
:root {
  --primary-color: #2e7d32;
  --primary-light: #60ad5e;
  --primary-dark: #005005;
  --secondary-color: #1565c0;
  --text-primary: #212121;
  --text-secondary: #757575;
  --background-light: #f5f5f5;
  --background-white: #ffffff;
  --accent-color: #ffc107;

  /* Conservation status colors */
  --status-lc: #4caf50;
  --status-nt: #8bc34a;
  --status-vu: #ffeb3b;
  --status-en: #ff9800;
  --status-cr: #f44336;
  --status-ew: #9c27b0;
  --status-ex: #000000;

  --border-radius: 8px;
  --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--background-light);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

h1,
h2,
h3,
h4 {
  font-weight: 600;
  line-height: 1.3;
  color: var(--primary-dark);
}

a {
  color: var(--secondary-color);
  text-decoration: none;
  transition: var(--transition);
}

a:hover {
  text-decoration: underline;
}

/* Species Header */
.species-header {
  background-color: var(--background-white);
  padding: 2rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.breadcrumb {
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.breadcrumb a {
  color: var(--text-secondary);
  margin-right: 0.5rem;
}

.breadcrumb a:hover {
  color: var(--primary-color);
}

.breadcrumb span {
  margin-left: 0.5rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.species-titles h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.scientific-name {
  font-style: italic;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.taxonomy {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.conservation-badge {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: 600;
}

.status-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.status-lc {
  background-color: rgba(76, 175, 80, 0.1);
  color: var(--status-lc);
}

.status-lc .status-icon {
  background-color: var(--status-lc);
}

.status-nt {
  background-color: rgba(139, 195, 74, 0.1);
  color: var(--status-nt);
}

.status-nt .status-icon {
  background-color: var(--status-nt);
}

.status-vu {
  background-color: rgba(255, 235, 59, 0.1);
  color: #b2a429;
}

.status-vu .status-icon {
  background-color: var(--status-vu);
}

.status-en {
  background-color: rgba(255, 152, 0, 0.1);
  color: var(--status-en);
}

.status-en .status-icon {
  background-color: var(--status-en);
}

.status-cr {
  background-color: rgba(244, 67, 54, 0.1);
  color: var(--status-cr);
}

.status-cr .status-icon {
  background-color: var(--status-cr);
}

.status-ew {
  background-color: rgba(156, 39, 176, 0.1);
  color: var(--status-ew);
}

.status-ew .status-icon {
  background-color: var(--status-ew);
}

.status-ex {
  background-color: rgba(0, 0, 0, 0.1);
  color: var(--status-ex);
}

.status-ex .status-icon {
  background-color: var(--status-ex);
}

/* Main Content */
.species-main {
  padding: 2rem 0 4rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Image Gallery */
.image-gallery {
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
}

.main-image {
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: zoom-in;
}

.zoom-hint {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  opacity: 0.8;
  transition: var(--transition);
}

.zoom-hint svg {
  width: 16px;
  height: 16px;
  margin-right: 0.5rem;
}

.main-image:hover .zoom-hint {
  opacity: 1;
}

.thumbnails {
  display: flex;
  padding: 1rem;
  gap: 0.5rem;
  overflow-x: auto;
  background-color: #f9f9f9;
}

.thumbnail {
  width: 80px;
  height: 60px;
  border: 2px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  transition: var(--transition);
}

.thumbnail.active {
  border-color: var(--primary-color);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-caption {
  padding: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  border-top: 1px solid #eee;
}

/* Quick Facts */
.quick-facts {
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
}

.quick-facts h2 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.fact-grid {
  display: grid;
  gap: 1.5rem;
}

.fact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.fact-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(46, 125, 50, 0.1);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px;
  flex-shrink: 0;
}

.fact-content h3 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.fact-content p {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* Detailed Information Tabs */
.detailed-info {
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  margin-bottom: 3rem;
  box-shadow: var(--box-shadow);
}

.tabs {
  display: flex;
  border-bottom: 1px solid #eee;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
}

.tabs::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

.tab-button {
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  white-space: nowrap;
  transition: var(--transition);
  border-bottom: 2px solid transparent;
}

.tab-button.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

.tab-content {
  padding: 2rem;
}

.tab-panel h2 {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.tab-panel h3 {
  margin: 1.5rem 0 1rem;
  font-size: 1.3rem;
}

.info-content p {
  margin-bottom: 1rem;
  line-height: 1.7;
}

.info-content ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.info-content li {
  margin-bottom: 0.5rem;
}

/* Habitat Map */
.habitat-map {
  margin: 1.5rem 0;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.habitat-map img {
  width: 100%;
  height: auto;
  display: block;
}

.map-caption {
  text-align: center;
  padding: 0.75rem;
  background-color: #f5f5f5;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.region-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.region-tag {
  background-color: #f0f0f0;
  padding: 0.5rem 0.75rem;
  border-radius: 50px;
  font-size: 0.9rem;
}

/* Conservation Status */
.conservation-status {
  margin: 1.5rem 0;
}

.status-indicator {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
  margin-bottom: 1rem;
}

.status-scale {
  display: flex;
  margin: 1rem 0 2rem;
  border-radius: 4px;
  overflow: hidden;
}

.scale-item {
  flex: 1;
  text-align: center;
  padding: 0.5rem;
  font-weight: 600;
  font-size: 0.8rem;
  background-color: #f0f0f0;
  color: #999;
}

.scale-item.active {
  color: white;
}

.scale-item:nth-child(1).active {
  background-color: var(--status-lc);
}

.scale-item:nth-child(2).active {
  background-color: var(--status-nt);
}

.scale-item:nth-child(3).active {
  background-color: var(--status-vu);
}

.scale-item:nth-child(4).active {
  background-color: var(--status-en);
}

.scale-item:nth-child(5).active {
  background-color: var(--status-cr);
}

.scale-item:nth-child(6).active {
  background-color: var(--status-ew);
}

.scale-item:nth-child(7).active {
  background-color: var(--status-ex);
}

.conservation-organizations {
  margin-top: 2rem;
}

.org-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
}

.org-item {
  background-color: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: var(--transition);
}

.org-item:hover {
  background-color: var(--primary-light);
  color: white;
  text-decoration: none;
}

/* Related Species */
.related-species {
  margin-bottom: 3rem;
}

.related-species h2 {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.related-card {
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  cursor: pointer;
  transition: var(--transition);
}

.related-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.related-image {
  position: relative;
  height: 150px;
}

.related-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-status {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.related-info {
  padding: 1rem;
}

.related-info h3 {
  margin-bottom: 0.25rem;
  font-size: 1.1rem;
}

.related-info .scientific-name {
  font-size: 0.9rem;
  margin-bottom: 0;
}

/* References */
.references {
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
}

.references h2 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.reference-list {
  list-style: none;
}

.reference-list li {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.reference-list li:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.reference-author,
.reference-year {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-left: 0.5rem;
}

/* Image Zoom Modal */
.zoom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.zoom-container {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.zoom-container img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}

.close-zoom {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .main-image {
    height: 350px;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
  }

  .conservation-badge {
    margin-top: 1rem;
    align-self: flex-start;
  }

  .tab-button {
    padding: 1rem;
  }

  .tab-content {
    padding: 1.5rem;
  }

  .spotlight-content {
    flex-direction: column;
  }

  .conservation-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .related-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 480px) {
  .species-titles h1 {
    font-size: 2rem;
  }

  .main-image {
    height: 250px;
  }

  .tab-content {
    padding: 1rem;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }

  .status-scale {
    flex-wrap: wrap;
  }

  .scale-item {
    flex: 1 0 33.333%;
  }
}
</style>