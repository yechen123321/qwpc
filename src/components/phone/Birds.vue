<template>
  <div class="species-collection-page">
    <!-- Subcategory Characteristics -->

    <!-- Species Cards Section -->
    <section class="species-cards-section">
      <div class="container">
        <div class="section-header">
          <h2>{{ subcategory.name }}物种</h2>
          <p>
            共 {{ filteredSpecies.length }} 种 (总计 {{ allSpecies.length }} 种)
          </p>
        </div>

        <div v-if="loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>加载物种数据...</p>
        </div>

        <div v-else-if="filteredSpecies.length === 0" class="no-results">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h3>未找到物种</h3>
          <p>尝试调整您的搜索或筛选条件</p>
          <button class="reset-button" @click="clearAllFilters">
            重置筛选条件
          </button>
        </div>

        <div v-else class="species-grid">
          <div
            v-for="species in filteredSpecies"
            :key="species.id"
            class="species-card"
            @click="navigateToSpeciesDetail(species.id)"
          >
            <div class="species-image">
              <img :src="species.image" :alt="species.commonName" />
              <div
                class="conservation-badge"
                :class="getConservationStatusClass(species.conservationStatus)"
              >
                {{ species.conservationStatus }}
              </div>
            </div>
            <div class="species-content">
              <h3>{{ species.commonName }}</h3>
              <p class="scientific-name">{{ species.scientificName }}</p>
              <div class="species-info">
                <div class="info-item">
                  <span class="info-label">体重:</span>
                  <span class="info-value">{{ species.weight }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">体长:</span>
                  <span class="info-value">{{ species.length }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">寿命:</span>
                  <span class="info-value">{{ species.lifespan }}</span>
                </div>
              </div>
              <p class="species-description">{{ species.shortDescription }}</p>
              <div class="species-tags">
                <span
                  v-for="(habitat, index) in species.habitats.slice(0, 3)"
                  :key="index"
                  class="species-tag"
                >
                  {{ habitat }}
                </span>
                <span
                  class="species-tag more"
                  v-if="species.habitats.length > 3"
                  >+{{ species.habitats.length - 3 }}</span
                >
              </div>
              <button class="view-details-button">查看详情</button>
            </div>
          </div>
        </div>

        <div class="pagination" v-if="totalPages > 1">
          <button
            class="pagination-button prev"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            上一页
          </button>

          <div class="page-numbers">
            <button
              v-for="page in displayedPages"
              :key="page"
              :class="['page-number', page === currentPage ? 'active' : '']"
              @click="changePage(page)"
            >
              {{ page }}
            </button>
          </div>

          <button
            class="pagination-button next"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            下一页
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Conservation Status -->
    <section class="conservation-section">
      <div class="container">
        <h2>保护状况</h2>
        <div class="conservation-overview">
          <div class="conservation-chart">
            <div class="chart-container">
              <div
                v-for="status in conservationData"
                :key="status.code"
                class="chart-bar"
                :style="{
                  width: `${status.percentage}%`,
                  backgroundColor: getStatusColor(status.code),
                }"
              >
                <span class="bar-label">{{ status.code }}</span>
                <span class="bar-value">{{ status.count }}</span>
              </div>
            </div>
            <div class="chart-legend">
              <div
                class="legend-item"
                v-for="status in conservationData"
                :key="status.code"
              >
                <div
                  class="legend-color"
                  :style="{ backgroundColor: getStatusColor(status.code) }"
                ></div>
                <div class="legend-text">
                  <span class="legend-code">{{ status.code }}</span>
                  <span class="legend-name">{{ status.name }}</span>
                </div>
                <span class="legend-percentage">{{ status.percentage }}%</span>
              </div>
            </div>
          </div>
          <div class="conservation-text">
            <p>{{ subcategory.conservationSummary }}</p>
            <p>
              在{{ subcategory.name }}中，有
              {{ endangeredCount }} 种被列为濒危或极危物种，需要紧急保护措施。
            </p>
            <a href="#" class="conservation-link"
              >了解更多关于{{ subcategory.name }}保护工作</a
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  
  <script setup>
import {
  ref,
  computed,
  onMounted,
  watch,
  nextTick,
  onBeforeUnmount,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import AMapLoader from "@amap/amap-jsapi-loader";
const route = useRoute();
const router = useRouter();

// State
const loading = ref(true);
const searchQuery = ref("");
const conservationFilter = ref("all");
const habitatFilter = ref("all");
const sortBy = ref("name");
const currentPage = ref(1);
const itemsPerPage = ref(12);

// Map-related state
const map = ref(null);
const heatmapLayer = ref(null);

// Initialize allSpecies as an empty array to avoid undefined errors
const allSpecies = ref([]);

// Mock data for category and subcategory
const category = ref({
  id: "mammals",
  name: "哺乳动物",
});

const subcategory = ref({
  id: "birds",
  name: "鸟类",
  description:
    "鸟类是地球上最多样化的脊椎动物类群之一，以其羽毛、喙和飞行能力而闻名。它们分布于全球各种生态系统中，从极地到热带雨林，展现了惊艳的适应能力和行为多样性。",
  backgroundImage: "/placeholder.svg?height=800&width=1200",
  speciesCount: 11000,
  regions: ["全球各大洲", "南北极", "海洋岛屿", "高山地区"],
  characteristics: [
    {
      title: "羽毛覆盖",
      description:
        "鸟类是唯一拥有羽毛的动物，羽毛不仅用于飞行，还能提供保暖、防水和伪装功能。",
    },
    {
      title: "飞行能力",
      description:
        "大多数鸟类具有飞行能力，其翅膀由前肢演化而来，骨骼轻盈且中空以适应飞行需求。",
    },
    {
      title: "喙的多样性",
      description:
        "鸟类的喙形状和大小因饮食习惯不同而异，例如鹰的钩状喙适合撕裂猎物，蜂鸟的长喙适合吸食花蜜。",
    },
    {
      title: "复杂的行为",
      description:
        "鸟类展现出复杂的行为，如迁徙、筑巢、求偶舞蹈和鸣叫，用于交流和繁殖。",
    },
    {
      title: "多样化的饮食",
      description:
        "鸟类的饮食范围广泛，包括种子、果实、昆虫、鱼类、肉类甚至腐肉，适应不同的生态位。",
    },
    {
      title: "卵生繁殖",
      description:
        "鸟类通过产卵繁殖，蛋壳坚硬以保护胚胎，许多鸟类会精心孵化和抚育幼雏。",
    },
  ],
  conservationSummary:
    "鸟类面临多种威胁，包括栖息地丧失、气候变化、污染和非法捕猎。据估计，约13%的鸟类物种受到灭绝威胁。保护鸟类对于维持生态平衡至关重要，因为它们在授粉、种子传播和控制害虫方面发挥着重要作用。",
});
// Mock data for related subcategories
const relatedSubcategories = ref([
  {
    id: "carnivores",
    name: "食肉目",
    image: "/placeholder.svg?height=300&width=400",
    speciesCount: 280,
  },
  {
    id: "cetaceans",
    name: "鲸目",
    image: "/placeholder.svg?height=300&width=400",
    speciesCount: 89,
  },
  {
    id: "rodents",
    name: "啮齿目",
    image: "/placeholder.svg?height=300&width=400",
    speciesCount: 2277,
  },
  {
    id: "marsupials",
    name: "有袋目",
    image: "/placeholder.svg?height=300&width=400",
    speciesCount: 331,
  },
]);

// Extract unique habitats from all species
const habitats = computed(() => {
  const habitatSet = new Set();
  allSpecies.value.forEach((species) => {
    species.habitats.forEach((habitat) => habitatSet.add(habitat));
  });
  return Array.from(habitatSet).sort();
});

// Computed properties
const hasActiveFilters = computed(() => {
  return (
    searchQuery.value !== "" ||
    conservationFilter.value !== "all" ||
    habitatFilter.value !== "all"
  );
});

const filteredSpecies = computed(() => {
  let result = [...allSpecies.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (species) =>
        species.commonName.toLowerCase().includes(query) ||
        species.scientificName.toLowerCase().includes(query) ||
        species.shortDescription.toLowerCase().includes(query)
    );
  }

  // Apply conservation status filter
  if (conservationFilter.value !== "all") {
    result = result.filter(
      (species) => species.conservationStatus === conservationFilter.value
    );
  }

  // Apply habitat filter
  if (habitatFilter.value !== "all") {
    result = result.filter((species) =>
      species.habitats.includes(habitatFilter.value)
    );
  }

  // Apply sorting
  switch (sortBy.value) {
    case "name":
      result.sort((a, b) => a.commonName.localeCompare(b.commonName));
      break;
    case "nameDesc":
      result.sort((a, b) => b.commonName.localeCompare(a.commonName));
      break;
    case "conservation":
      result.sort(
        (a, b) =>
          getConservationValue(a.conservationStatus) -
          getConservationValue(b.conservationStatus)
      );
      break;
    case "conservationDesc":
      result.sort(
        (a, b) =>
          getConservationValue(b.conservationStatus) -
          getConservationValue(a.conservationStatus)
      );
      break;
    case "weight":
      result.sort((a, b) => parseWeight(a.weight) - parseWeight(b.weight));
      break;
    case "weightDesc":
      result.sort((a, b) => parseWeight(b.weight) - parseWeight(a.weight));
      break;
  }

  return result;
});

// Pagination
const paginatedSpecies = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredSpecies.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(filteredSpecies.value.length / itemsPerPage.value);
});

const displayedPages = computed(() => {
  const pages = [];
  const maxPagesToShow = 5;

  if (totalPages.value <= maxPagesToShow) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    let startPage = Math.max(2, currentPage.value - 1);
    let endPage = Math.min(totalPages.value - 1, currentPage.value + 1);

    if (currentPage.value <= 3) {
      endPage = Math.min(totalPages.value - 1, 4);
    }

    if (currentPage.value >= totalPages.value - 2) {
      startPage = Math.max(2, totalPages.value - 3);
    }

    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages.value - 1) {
      pages.push("...");
    }

    pages.push(totalPages.value);
  }

  return pages;
});

// Conservation data with guard for allSpecies
const conservationData = computed(() => {
  const statusCounts = {
    LC: 0,
    NT: 0,
    VU: 0,
    EN: 0,
    CR: 0,
    EW: 0,
    EX: 0,
  };

  // Guard: Return default data if allSpecies is not yet populated
  if (!allSpecies.value || allSpecies.value.length === 0) {
    return [
      { code: "LC", name: "无危", count: 0, percentage: 0 },
      { code: "NT", name: "近危", count: 0, percentage: 0 },
      { code: "VU", name: "易危", count: 0, percentage: 0 },
      { code: "EN", name: "濒危", count: 0, percentage: 0 },
      { code: "CR", name: "极危", count: 0, percentage: 0 },
      { code: "EW", name: "野外灭绝", count: 0, percentage: 0 },
      { code: "EX", name: "灭绝", count: 0, percentage: 0 },
    ];
  }

  allSpecies.value.forEach((species) => {
    if (statusCounts[species.conservationStatus] !== undefined) {
      statusCounts[species.conservationStatus]++;
    }
  });

  const totalSpecies = allSpecies.value.length;

  return [
    {
      code: "LC",
      name: "无危",
      count: statusCounts["LC"],
      percentage: totalSpecies
        ? Math.round((statusCounts["LC"] / totalSpecies) * 100)
        : 0,
    },
    {
      code: "NT",
      name: "近危",
      count: statusCounts["NT"],
      percentage: totalSpecies
        ? Math.round((statusCounts["NT"] / totalSpecies) * 100)
        : 0,
    },
    {
      code: "VU",
      name: "易危",
      count: statusCounts["VU"],
      percentage: totalSpecies
        ? Math.round((statusCounts["VU"] / totalSpecies) * 100)
        : 0,
    },
    {
      code: "EN",
      name: "濒危",
      count: statusCounts["EN"],
      percentage: totalSpecies
        ? Math.round((statusCounts["EN"] / totalSpecies) * 100)
        : 0,
    },
    {
      code: "CR",
      name: "极危",
      count: statusCounts["CR"],
      percentage: totalSpecies
        ? Math.round((statusCounts["CR"] / totalSpecies) * 100)
        : 0,
    },
    {
      code: "EW",
      name: "野外灭绝",
      count: statusCounts["EW"],
      percentage: totalSpecies
        ? Math.round((statusCounts["EW"] / totalSpecies) * 100)
        : 0,
    },
    {
      code: "EX",
      name: "灭绝",
      count: statusCounts["EX"],
      percentage: totalSpecies
        ? Math.round((statusCounts["EX"] / totalSpecies) * 100)
        : 0,
    },
  ];
});

const endangeredCount = computed(() => {
  // Guard: Return 0 if allSpecies is not yet populated
  if (!allSpecies.value || allSpecies.value.length === 0) {
    return 0;
  }

  return allSpecies.value.filter(
    (species) =>
      species.conservationStatus === "EN" || species.conservationStatus === "CR"
  ).length;
});

// Methods
const fetchSpeciesData = async () => {
  loading.value = true;

  try {
    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulated species data (expanded to 50 species for better representation)
    const mockSpecies = [
      {
        id: "haliaeetus-albicilla",
        commonName: "白尾海雕",
        scientificName: "Haliaeetus albicilla",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "3.1-6.9 kg",
        length: "66-94 cm",
        lifespan: "20-30 年",
        shortDescription:
          "白尾海雕是欧洲最大的猛禽之一，以其白色尾巴和强大的捕鱼能力而闻名，广泛分布于北欧和亚洲的沿海地区。",
        habitats: ["沿海地区", "湖泊", "河流"],
      },
      {
        id: "buteo-buteo",
        commonName: "普通鵟",
        scientificName: "Buteo buteo",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.6-1.4 kg",
        length: "46-58 cm",
        lifespan: "10-15 年",
        shortDescription:
          "普通鵟是欧洲最常见的猛禽之一，以其宽阔的翅膀和盘旋飞行而闻名，主要捕食小型哺乳动物。",
        habitats: ["森林", "草原", "农田"],
      },
      {
        id: "struthio-camelus",
        commonName: "鸵鸟",
        scientificName: "Struthio camelus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "90-150 kg",
        length: "2.1-2.8 m",
        lifespan: "30-40 年",
        shortDescription:
          "鸵鸟是世界上最大的鸟类，无法飞行，但以其强大的奔跑能力而闻名，生活在非洲的草原和沙漠地区。",
        habitats: ["草原", "沙漠", "稀树草原"],
      },
      {
        id: "aptéryx-australis",
        commonName: "南岛几维",
        scientificName: "Apteryx australis",
        conservationStatus: "VU",
        image: "/placeholder.svg?height=500&width=700",
        weight: "1.5-3.3 kg",
        length: "35-55 cm",
        lifespan: "30-50 年",
        shortDescription:
          "南岛几维是新西兰的特有无翼鸟，以其长喙和嗅觉灵敏而闻名，主要在夜间活动。",
        habitats: ["森林", "灌木丛", "草地"],
      },
      {
        id: "psittacula-krameri",
        commonName: "玫瑰环鹦鹉",
        scientificName: "Psittacula krameri",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.1-0.15 kg",
        length: "38-42 cm",
        lifespan: "20-30 年",
        shortDescription:
          "玫瑰环鹦鹉以其鲜艳的绿色羽毛和红色喙而闻名，广泛分布于非洲和亚洲，常被作为宠物饲养。",
        habitats: ["森林", "城市公园", "农田"],
      },
      {
        id: "spheniscus-demersus",
        commonName: "非洲企鹅",
        scientificName: "Spheniscus demersus",
        conservationStatus: "EN",
        image: "/placeholder.svg?height=500&width=700",
        weight: "2.2-3.5 kg",
        length: "60-70 cm",
        lifespan: "10-15 年",
        shortDescription:
          "非洲企鹅是生活在非洲南部的企鹅，以其黑白相间的羽毛和独特叫声而闻名，面临海洋污染威胁。",
        habitats: ["沿海地区", "岛屿", "海洋"],
      },
      {
        id: "ara-macao",
        commonName: "绯红金刚鹦鹉",
        scientificName: "Ara macao",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.9-1.5 kg",
        length: "81-96 cm",
        lifespan: "40-50 年",
        shortDescription:
          "绯红金刚鹦鹉以其鲜艳的红色羽毛而闻名，生活在中美洲和南美洲的热带雨林中。",
        habitats: ["热带雨林", "河岸森林", "低地森林"],
      },
      {
        id: "buceros-bicornis",
        commonName: "双角犀鸟",
        scientificName: "Buceros bicornis",
        conservationStatus: "VU",
        image: "/placeholder.svg?height=500&width=700",
        weight: "2.1-3.4 kg",
        length: "95-120 cm",
        lifespan: "30-40 年",
        shortDescription:
          "双角犀鸟以其巨大的喙和头上的双角而闻名，生活在东南亚的热带雨林中，主要以水果为食。",
        habitats: ["热带雨林", "山地森林"],
      },
      {
        id: "tyto-alba",
        commonName: "仓鸮",
        scientificName: "Tyto alba",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.3-0.5 kg",
        length: "33-39 cm",
        lifespan: "5-10 年",
        shortDescription:
          "仓鸮以其心形面盘和白色羽毛而闻名，是一种夜行性猛禽，广泛分布于全球，主要捕食小型哺乳动物。",
        habitats: ["农田", "草原", "城市边缘"],
      },
      {
        id: "calidris-alba",
        commonName: "白腰杓鹬",
        scientificName: "Calidris alba",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.04-0.06 kg",
        length: "18-21 cm",
        lifespan: "5-10 年",
        shortDescription:
          "白腰杓鹬是一种小型候鸟，以其快速奔跑和觅食行为而闻名，繁殖于北极，冬季迁徙至热带海岸。",
        habitats: ["海滩", "泥滩", "北极苔原"],
      },
      {
        id: "amazona-aestiva",
        commonName: "蓝额亚马逊鹦鹉",
        scientificName: "Amazona aestiva",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.4-0.5 kg",
        length: "35-38 cm",
        lifespan: "40-60 年",
        shortDescription:
          "蓝额亚马逊鹦鹉以其蓝色额头和绿色羽毛而闻名，生活在南美洲，常被作为宠物饲养。",
        habitats: ["热带雨林", "草原林地", "城市公园"],
      },
      {
        id: "aquila-chrysaetos",
        commonName: "金雕",
        scientificName: "Aquila chrysaetos",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "3-6 kg",
        length: "66-100 cm",
        lifespan: "20-30 年",
        shortDescription:
          "金雕是一种大型猛禽，以其金色颈羽和强大的捕猎能力而闻名，分布于北半球的山地和草原地区。",
        habitats: ["山地", "草原", "森林边缘"],
      },
      {
        id: "rhea-americana",
        commonName: "美洲鸵",
        scientificName: "Rhea americana",
        conservationStatus: "NT",
        image: "/placeholder.svg?height=500&width=700",
        weight: "20-40 kg",
        length: "1.2-1.7 m",
        lifespan: "10-15 年",
        shortDescription:
          "美洲鸵是南美洲的大型无翼鸟，以其快速奔跑能力而闻名，生活在草原和灌木丛中。",
        habitats: ["草原", "灌木丛", "农田"],
      },
      {
        id: "dromaius-novaehollandiae",
        commonName: "鸸鹋",
        scientificName: "Dromaius novaehollandiae",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "30-55 kg",
        length: "1.5-1.9 m",
        lifespan: "10-20 年",
        shortDescription:
          "鸸鹋是澳大利亚的特有无翼鸟，是世界上第二大的鸟类，以其快速奔跑能力而闻名。",
        habitats: ["草原", "稀树草原", "沙漠"],
      },
      {
        id: "cathartes-aura",
        commonName: "火鸡秃鹫",
        scientificName: "Cathartes aura",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.8-2 kg",
        length: "62-81 cm",
        lifespan: "15-20 年",
        shortDescription:
          "火鸡秃鹫以其红色头部和嗅觉灵敏而闻名，广泛分布于美洲，主要以腐肉为食。",
        habitats: ["森林", "草原", "沙漠"],
      },
      {
        id: "columba-livia",
        commonName: "岩鸽",
        scientificName: "Columba livia",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.3-0.4 kg",
        length: "29-37 cm",
        lifespan: "5-15 年",
        shortDescription:
          "岩鸽是城市中常见的鸽子，以其适应性强而闻名，是家鸽的野生祖先。",
        habitats: ["城市", "农田", "悬崖"],
      },
      {
        id: "cygnus-olor",
        commonName: "疣鼻天鹅",
        scientificName: "Cygnus olor",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "9-15 kg",
        length: "1.2-1.5 m",
        lifespan: "20-30 年",
        shortDescription:
          "疣鼻天鹅以其优雅的姿态和白色羽毛而闻名，广泛分布于欧洲和亚洲的湖泊和河流中。",
        habitats: ["湖泊", "河流", "湿地"],
      },
      {
        id: "falco-peregrinus",
        commonName: "游隼",
        scientificName: "Falco peregrinus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.5-1.5 kg",
        length: "34-58 cm",
        lifespan: "15-20 年",
        shortDescription:
          "游隼是世界上最快的鸟类，俯冲速度可达300公里/小时，分布于全球，主要捕食其他鸟类。",
        habitats: ["山地", "沿海悬崖", "城市高楼"],
      },
      {
        id: "gypaetus-barbatus",
        commonName: "胡兀鹫",
        scientificName: "Gypaetus barbatus",
        conservationStatus: "NT",
        image: "/placeholder.svg?height=500&width=700",
        weight: "4.5-7 kg",
        length: "94-125 cm",
        lifespan: "20-30 年",
        shortDescription:
          "胡兀鹫以其独特的外观和以骨头为食的习性而闻名，分布于欧洲、非洲和亚洲的山地地区。",
        habitats: ["高山", "峡谷", "草原"],
      },
      {
        id: "phoenicopterus-roseus",
        commonName: "大火烈鸟",
        scientificName: "Phoenicopterus roseus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "2-4 kg",
        length: "1.2-1.5 m",
        lifespan: "30-40 年",
        shortDescription:
          "大火烈鸟以其粉红色羽毛和长腿而闻名，生活在非洲、欧洲和亚洲的盐湖和湿地中。",
        habitats: ["盐湖", "湿地", "沿海泻湖"],
      },
      {
        id: "alcedo-atthis",
        commonName: "普通翠鸟",
        scientificName: "Alcedo atthis",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.03-0.04 kg",
        length: "16-18 cm",
        lifespan: "5-10 年",
        shortDescription:
          "普通翠鸟以其鲜艳的蓝色和橙色羽毛而闻名，分布于欧洲和亚洲，主要捕食小鱼。",
        habitats: ["河流", "湖泊", "湿地"],
      },
      {
        id: "puffinus-puffinus",
        commonName: "海鸥",
        scientificName: "Puffinus puffinus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.4-0.5 kg",
        length: "30-38 cm",
        lifespan: "15-30 年",
        shortDescription:
          "海鸥是一种海洋鸟类，以其优雅的滑翔飞行而闻名，分布于北大西洋地区。",
        habitats: ["海洋", "沿海地区", "岛屿"],
      },
      {
        id: "turdus-merula",
        commonName: "欧亚鸫",
        scientificName: "Turdus merula",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.08-0.12 kg",
        length: "23-29 cm",
        lifespan: "5-10 年",
        shortDescription:
          "欧亚鸫以其黑色羽毛和黄色喙而闻名，广泛分布于欧洲和亚洲，常在花园和森林中觅食。",
        habitats: ["森林", "花园", "城市公园"],
      },
      {
        id: "corvus-corax",
        commonName: "大乌鸦",
        scientificName: "Corvus corax",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.7-2 kg",
        length: "54-67 cm",
        lifespan: "10-15 年",
        shortDescription:
          "大乌鸦是最大的鸦科鸟类，以其高智商和黑色羽毛而闻名，分布于北半球的多种栖息地。",
        habitats: ["森林", "山地", "荒野"],
      },
      {
        id: "pelecanus-onocrotalus",
        commonName: "白鹈鹕",
        scientificName: "Pelecanus onocrotalus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "9-15 kg",
        length: "1.4-1.8 m",
        lifespan: "15-25 年",
        shortDescription:
          "白鹈鹕以其巨大的喙和白色羽毛而闻名，分布于非洲和欧洲的湖泊和湿地中。",
        habitats: ["湖泊", "湿地", "沿海地区"],
      },
      {
        id: "ciconia-ciconia",
        commonName: "白鹳",
        scientificName: "Ciconia ciconia",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "2.5-4.5 kg",
        length: "1.0-1.2 m",
        lifespan: "20-30 年",
        shortDescription:
          "白鹳以其白色羽毛和长腿而闻名，分布于欧洲和非洲，常在人类村庄附近筑巢。",
        habitats: ["湿地", "草原", "农田"],
      },
      {
        id: "nectarinia-famosa",
        commonName: "艳丽花蜜鸟",
        scientificName: "Nectarinia famosa",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.01-0.02 kg",
        length: "14-16 cm",
        lifespan: "5-10 年",
        shortDescription:
          "艳丽花蜜鸟以其金属光泽的羽毛而闻名，分布于非洲南部，主要以花蜜为食。",
        habitats: ["花园", "灌木丛", "森林边缘"],
      },
      {
        id: "grus-grus",
        commonName: "灰鹤",
        scientificName: "Grus grus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "3-6 kg",
        length: "1.0-1.3 m",
        lifespan: "20-30 年",
        shortDescription:
          "灰鹤以其优雅的舞姿和灰色羽毛而闻名，分布于欧洲和非洲，常在湿地中觅食。",
        habitats: ["湿地", "草原", "农田"],
      },
      {
        id: "lophura-nycthemera",
        commonName: "白鹇",
        scientificName: "Lophura nycthemera",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.7-1.2 kg",
        length: "60-80 cm",
        lifespan: "10-15 年",
        shortDescription:
          "白鹇以其白色羽毛和长尾巴而闻名，分布于亚洲的森林中，常被作为观赏鸟饲养。",
        habitats: ["森林", "灌木丛", "竹林"],
      },
      {
        id: "pavo-cristatus",
        commonName: "蓝孔雀",
        scientificName: "Pavo cristatus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "4-6 kg",
        length: "1.0-1.2 m",
        lifespan: "15-20 年",
        shortDescription:
          "蓝孔雀以其华丽的尾羽而闻名，分布于南亚，常被作为观赏鸟饲养。",
        habitats: ["森林", "草原", "农田"],
      },
      {
        id: "eudocimus-ruber",
        commonName: "红鹮",
        scientificName: "Eudocimus ruber",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.8-1.5 kg",
        length: "56-71 cm",
        lifespan: "15-20 年",
        shortDescription:
          "红鹮以其鲜艳的红色羽毛而闻名，分布于南美洲和加勒比海的湿地中。",
        habitats: ["湿地", "红树林", "沿海地区"],
      },
      {
        id: "chloroceryle-amazona",
        commonName: "亚马逊翠鸟",
        scientificName: "Chloroceryle amazona",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.1-0.15 kg",
        length: "28-30 cm",
        lifespan: "5-10 年",
        shortDescription:
          "亚马逊翠鸟以其绿色羽毛而闻名，分布于南美洲的河流和湖泊中，主要捕食鱼类。",
        habitats: ["河流", "湖泊", "红树林"],
      },
      {
        id: "ramphastos-toco",
        commonName: "巨嘴鹃",
        scientificName: "Ramphastos toco",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.5-0.8 kg",
        length: "55-65 cm",
        lifespan: "15-20 年",
        shortDescription:
          "巨嘴鹃以其巨大的彩色喙而闻名，分布于南美洲的热带雨林中，主要以水果为食。",
        habitats: ["热带雨林", "河岸森林"],
      },
      {
        id: "copsychus-saularis",
        commonName: "鹊鸲",
        scientificName: "Copsychus saularis",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.03-0.04 kg",
        length: "19-23 cm",
        lifespan: "5-10 年",
        shortDescription:
          "鹊鸲以其黑白羽毛和美妙歌声而闻名，分布于亚洲，常在花园和森林中觅食。",
        habitats: ["森林", "花园", "城市公园"],
      },
      {
        id: "ardea-alba",
        commonName: "大白鹭",
        scientificName: "Ardea alba",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.7-1.5 kg",
        length: "85-100 cm",
        lifespan: "15-20 年",
        shortDescription:
          "大白鹭以其白色羽毛和优雅姿态而闻名，分布于全球的湿地中，主要捕食鱼类和昆虫。",
        habitats: ["湿地", "河流", "沿海地区"],
      },
      {
        id: "accipiter-nisus",
        commonName: "雀鹰",
        scientificName: "Accipiter nisus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.1-0.3 kg",
        length: "28-38 cm",
        lifespan: "5-10 年",
        shortDescription:
          "雀鹰是一种小型猛禽，以其敏捷飞行和捕鸟能力而闻名，分布于欧洲和亚洲。",
        habitats: ["森林", "灌木丛", "城市边缘"],
      },
      {
        id: "fratercula-arctica",
        commonName: "北极海鹦",
        scientificName: "Fratercula arctica",
        conservationStatus: "VU",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.3-0.5 kg",
        length: "28-30 cm",
        lifespan: "15-30 年",
        shortDescription:
          "北极海鹦以其彩色喙和滑稽外形而闻名，分布于北大西洋，主要以鱼类为食。",
        habitats: ["海洋", "沿海悬崖", "岛屿"],
      },
      {
        id: "diomedea-exulans",
        commonName: "漂泊信天翁",
        scientificName: "Diomedea exulans",
        conservationStatus: "VU",
        image: "/placeholder.svg?height=500&width=700",
        weight: "6-12 kg",
        length: "1.1-1.4 m",
        lifespan: "50-70 年",
        shortDescription:
          "漂泊信天翁是世界上翼展最大的鸟类，分布于南半球的海洋中，以其长距离滑翔能力而闻名。",
        habitats: ["海洋", "岛屿"],
      },
      {
        id: "pyrrhula-pyrrhula",
        commonName: "红腹锦鸡",
        scientificName: "Pyrrhula pyrrhula",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.02-0.03 kg",
        length: "14-16 cm",
        lifespan: "5-10 年",
        shortDescription:
          "红腹锦鸡以其鲜艳的红色腹部而闻名，分布于欧洲和亚洲的森林中，主要以种子为食。",
        habitats: ["森林", "灌木丛", "花园"],
      },
      {
        id: "garrulax-canorus",
        commonName: "画眉",
        scientificName: "Garrulax canorus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.05-0.07 kg",
        length: "21-24 cm",
        lifespan: "5-10 年",
        shortDescription:
          "画眉以其美妙歌声而闻名，分布于亚洲，常被作为笼鸟饲养。",
        habitats: ["森林", "灌木丛", "城市公园"],
      },
      {
        id: "aix-galericulata",
        commonName: "鸳鸯",
        scientificName: "Aix galericulata",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.4-0.7 kg",
        length: "41-49 cm",
        lifespan: "5-10 年",
        shortDescription:
          "鸳鸯以其华丽的羽毛而闻名，分布于东亚，常被视为爱情的象征。",
        habitats: ["湖泊", "河流", "森林"],
      },
      {
        id: "bubo-bubo",
        commonName: "雕鸮",
        scientificName: "Bubo bubo",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "1.5-4 kg",
        length: "60-75 cm",
        lifespan: "20-30 年",
        shortDescription:
          "雕鸮是世界上最大的鸮类之一，以其橙色眼睛和耳羽而闻名，分布于欧亚大陆。",
        habitats: ["森林", "山地", "荒野"],
      },
      {
        id: "calyptomena-viridis",
        commonName: "绿阔嘴鸟",
        scientificName: "Calyptomena viridis",
        conservationStatus: "NT",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.1-0.15 kg",
        length: "17-20 cm",
        lifespan: "5-10 年",
        shortDescription:
          "绿阔嘴鸟以其鲜艳的绿色羽毛而闻名，分布于东南亚的热带雨林中，主要以水果为食。",
        habitats: ["热带雨林", "低地森林"],
      },
      {
        id: "crotophaga-ani",
        commonName: "黑啄木鸟",
        scientificName: "Crotophaga ani",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.07-0.12 kg",
        length: "30-36 cm",
        lifespan: "5-10 年",
        shortDescription:
          "黑啄木鸟以其黑色羽毛和独特喙而闻名，分布于南美洲，常成群活动。",
        habitats: ["草原", "灌木丛", "农田"],
      },
      {
        id: "upupa-epops",
        commonName: "戴胜",
        scientificName: "Upupa epops",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.06-0.08 kg",
        length: "25-32 cm",
        lifespan: "5-10 年",
        shortDescription:
          "戴胜以其独特的冠羽和粉红色羽毛而闻名，分布于欧亚大陆和非洲，主要捕食昆虫。",
        habitats: ["草原", "森林边缘", "农田"],
      },
      {
        id: "tragopan-temminckii",
        commonName: "红腹角雉",
        scientificName: "Tragopan temminckii",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.9-1.4 kg",
        length: "58-64 cm",
        lifespan: "5-10 年",
        shortDescription:
          "红腹角雉以其鲜艳的羽毛和红色腹部而闻名，分布于亚洲的山地森林中。",
        habitats: ["山地森林", "灌木丛"],
      },
      {
        id: "leucophaeus-scoresbii",
        commonName: "海豚鸥",
        scientificName: "Leucophaeus scoresbii",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.3-0.5 kg",
        length: "38-42 cm",
        lifespan: "10-15 年",
        shortDescription:
          "海豚鸥以其灰色羽毛和红色喙而闻名，分布于南美洲的沿海地区。",
        habitats: ["海洋", "沿海地区", "岛屿"],
      },
      {
        id: "chlorophanes-spiza",
        commonName: "绿蜜雀",
        scientificName: "Chlorophanes spiza",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.01-0.02 kg",
        length: "12-14 cm",
        lifespan: "5-10 年",
        shortDescription:
          "绿蜜雀以其绿色羽毛而闻名，分布于中美洲和南美洲的热带雨林中，主要以花蜜为食。",
        habitats: ["热带雨林", "花园"],
      },
      {
        id: "gymnogyps-californianus",
        commonName: "加州神鹫",
        scientificName: "Gymnogyps californianus",
        conservationStatus: "CR",
        image: "/placeholder.svg?height=500&width=700",
        weight: "7-14 kg",
        length: "1.1-1.4 m",
        lifespan: "50-60 年",
        shortDescription:
          "加州神鹫是北美最大的陆鸟，以其巨大的翼展而闻名，面临严重的灭绝威胁。",
        habitats: ["山地", "峡谷", "草原"],
      },
      {
        id: "harpia-harpyja",
        commonName: "角雕",
        scientificName: "Harpia harpyja",
        conservationStatus: "NT",
        image: "/placeholder.svg?height=500&width=700",
        weight: "4-9 kg",
        length: "86-107 cm",
        lifespan: "25-35 年",
        shortDescription:
          "角雕是南美洲最强大的猛禽，以其巨大的爪子和捕猎能力而闻名，生活在热带雨林中。",
        habitats: ["热带雨林", "低地森林"],
      },
      {
        id: "cotinga-cayana",
        commonName: "紫蓝伞鸟",
        scientificName: "Cotinga cayana",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.05-0.07 kg",
        length: "20-22 cm",
        lifespan: "5-10 年",
        shortDescription:
          "紫蓝伞鸟以其鲜艳的紫蓝色羽毛而闻名，分布于南美洲的热带雨林中。",
        habitats: ["热带雨林", "河岸森林"],
      },
      {
        id: "argusianus-argus",
        commonName: "大眼斑雉",
        scientificName: "Argusianus argus",
        conservationStatus: "NT",
        image: "/placeholder.svg?height=500&width=700",
        weight: "2-3 kg",
        length: "1.6-2.0 m",
        lifespan: "10-15 年",
        shortDescription:
          "大眼斑雉以其华丽的尾羽和眼斑图案而闻名，分布于东南亚的热带雨林中。",
        habitats: ["热带雨林", "低地森林"],
      },
      {
        id: "eudyptula-minor",
        commonName: "小蓝企鹅",
        scientificName: "Eudyptula minor",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "1-1.5 kg",
        length: "30-40 cm",
        lifespan: "6-10 年",
        shortDescription:
          "小蓝企鹅是世界上最小的企鹅，分布于澳大利亚和新西兰的沿海地区。",
        habitats: ["海洋", "沿海地区", "岛屿"],
      },
      {
        id: "melopsittacus-undulatus",
        commonName: "虎皮鹦鹉",
        scientificName: "Melopsittacus undulatus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.03-0.04 kg",
        length: "18-20 cm",
        lifespan: "5-10 年",
        shortDescription:
          "虎皮鹦鹉以其绿色和黄色条纹而闻名，分布于澳大利亚，常被作为宠物饲养。",
        habitats: ["草原", "灌木丛", "沙漠"],
      },
      {
        id: "sterna-paradisaea",
        commonName: "北极燕鸥",
        scientificName: "Sterna paradisaea",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.09-0.12 kg",
        length: "33-39 cm",
        lifespan: "15-30 年",
        shortDescription:
          "北极燕鸥以其长距离迁徙而闻名，每年从北极飞往南极，往返约4万公里。",
        habitats: ["海洋", "北极苔原", "沿海地区"],
      },
      {
        id: "andigena-hypoglauca",
        commonName: "蓝喉山鹃",
        scientificName: "Andigena hypoglauca",
        conservationStatus: "NT",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.3-0.4 kg",
        length: "46-50 cm",
        lifespan: "10-15 年",
        shortDescription:
          "蓝喉山鹃以其蓝色喉部而闻名，分布于南美洲安第斯山脉的森林中。",
        habitats: ["山地森林", "云雾林"],
      },
      {
        id: "polyplectron-bicalcaratum",
        commonName: "灰孔雀雉",
        scientificName: "Polyplectron bicalcaratum",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.5-0.7 kg",
        length: "50-60 cm",
        lifespan: "5-10 年",
        shortDescription:
          "灰孔雀雉以其灰色羽毛和眼斑图案而闻名，分布于亚洲的森林中。",
        habitats: ["热带雨林", "竹林"],
      },
      {
        id: "threskiornis-melanocephalus",
        commonName: "黑头鹮",
        scientificName: "Threskiornis melanocephalus",
        conservationStatus: "NT",
        image: "/placeholder.svg?height=500&width=700",
        weight: "1-1.5 kg",
        length: "70-80 cm",
        lifespan: "15-20 年",
        shortDescription:
          "黑头鹮以其黑色头部和白色羽毛而闻名，分布于亚洲的湿地中。",
        habitats: ["湿地", "河流", "农田"],
      },
      {
        id: "calidris-canutus",
        commonName: "红腹滨鹬",
        scientificName: "Calidris canutus",
        conservationStatus: "NT",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.1-0.2 kg",
        length: "23-26 cm",
        lifespan: "10-15 年",
        shortDescription:
          "红腹滨鹬以其红色腹部而闻名，繁殖于北极，冬季迁徙至热带海岸。",
        habitats: ["北极苔原", "海滩", "泥滩"],
      },
      {
        id: "psittacus-erithacus",
        commonName: "灰鹦鹉",
        scientificName: "Psittacus erithacus",
        conservationStatus: "EN",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.4-0.5 kg",
        length: "33-35 cm",
        lifespan: "40-60 年",
        shortDescription:
          "灰鹦鹉以其高智商和模仿能力而闻名，分布于非洲中部，常被作为宠物饲养。",
        habitats: ["热带雨林", "岛屿"],
      },
      {
        id: "rallus-aquaticus",
        commonName: "水鸡",
        scientificName: "Rallus aquaticus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.1-0.15 kg",
        length: "23-28 cm",
        lifespan: "5-10 年",
        shortDescription:
          "水鸡以其蓝色和棕色羽毛而闻名，分布于欧洲和亚洲的湿地中。",
        habitats: ["湿地", "芦苇丛", "沼泽"],
      },
      {
        id: "chloris-chloris",
        commonName: "欧金翅雀",
        scientificName: "Chloris chloris",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.02-0.03 kg",
        length: "14-16 cm",
        lifespan: "5-10 年",
        shortDescription:
          "欧金翅雀以其绿色羽毛和黄色翅膀而闻名，分布于欧洲，常在花园中觅食。",
        habitats: ["森林", "花园", "农田"],
      },
      {
        id: "aegithalos-caudatus",
        commonName: "长尾山雀",
        scientificName: "Aegithalos caudatus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.007-0.01 kg",
        length: "13-15 cm",
        lifespan: "5-10 年",
        shortDescription:
          "长尾山雀以其长尾巴和粉红色羽毛而闻名，分布于欧洲，常成群活动。",
        habitats: ["森林", "灌木丛", "花园"],
      },
      {
        id: "cuculus-canorus",
        commonName: "普通杜鹃",
        scientificName: "Cuculus canorus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.1-0.15 kg",
        length: "32-34 cm",
        lifespan: "5-10 年",
        shortDescription:
          "普通杜鹃以其“布谷”叫声和寄生繁殖行为而闻名，分布于欧亚大陆和非洲。",
        habitats: ["森林", "草原", "灌木丛"],
      },
      {
        id: "dendrocopos-major",
        commonName: "大斑啄木鸟",
        scientificName: "Dendrocopos major",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.07-0.1 kg",
        length: "20-24 cm",
        lifespan: "5-10 年",
        shortDescription:
          "大斑啄木鸟以其黑白羽毛和红色腹部而闻名，分布于欧亚大陆，常在树干上觅食。",
        habitats: ["森林", "公园", "花园"],
      },
      {
        id: "passer-domesticus",
        commonName: "家雀",
        scientificName: "Passer domesticus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.02-0.03 kg",
        length: "14-16 cm",
        lifespan: "3-5 年",
        shortDescription:
          "家雀是城市中常见的鸟类，以其适应性强而闻名，常在人类居住区附近觅食。",
        habitats: ["城市", "农田", "村庄"],
      },
      {
        id: "strix-aluco",
        commonName: "灰林鸮",
        scientificName: "Strix aluco",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.4-0.6 kg",
        length: "37-39 cm",
        lifespan: "10-15 年",
        shortDescription:
          "灰林鸮以其灰色羽毛和夜行性而闻名，分布于欧洲和亚洲，主要捕食小型哺乳动物。",
        habitats: ["森林", "公园", "城市边缘"],
      },
      {
        id: "merops-apiaster",
        commonName: "欧洲蜂虎",
        scientificName: "Merops apiaster",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.05-0.07 kg",
        length: "27-29 cm",
        lifespan: "5-10 年",
        shortDescription:
          "欧洲蜂虎以其彩色羽毛而闻名，分布于欧洲和非洲，主要捕食蜜蜂和其他昆虫。",
        habitats: ["草原", "河岸", "农田"],
      },
      {
        id: "sula-nebouxii",
        commonName: "蓝脚鲣鸟",
        scientificName: "Sula nebouxii",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "1.5-2 kg",
        length: "76-84 cm",
        lifespan: "15-20 年",
        shortDescription:
          "蓝脚鲣鸟以其鲜艳的蓝色脚而闻名，分布于太平洋沿岸，主要以鱼类为食。",
        habitats: ["海洋", "沿海地区", "岛屿"],
      },
      {
        id: "agapornis-roseicollis",
        commonName: "桃脸牡丹鹦鹉",
        scientificName: "Agapornis roseicollis",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.05-0.06 kg",
        length: "15-17 cm",
        lifespan: "10-15 年",
        shortDescription:
          "桃脸牡丹鹦鹉以其粉红色面部而闻名，分布于非洲西南部，常被作为宠物饲养。",
        habitats: ["草原", "灌木丛", "沙漠"],
      },
      {
        id: "branta-canadensis",
        commonName: "加拿大雁",
        scientificName: "Branta canadensis",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "3-9 kg",
        length: "76-110 cm",
        lifespan: "10-24 年",
        shortDescription:
          "加拿大雁以其黑色颈部和白色下巴而闻名，分布于北美，常成群迁徙。",
        habitats: ["湖泊", "湿地", "草原"],
      },
      {
        id: "phoenicurus-phoenicurus",
        commonName: "红尾鸲",
        scientificName: "Phoenicurus phoenicurus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.01-0.02 kg",
        length: "13-14 cm",
        lifespan: "5-10 年",
        shortDescription:
          "红尾鸲以其橙红色尾巴而闻名，分布于欧洲和亚洲，常在森林和花园中觅食。",
        habitats: ["森林", "花园", "灌木丛"],
      },
      {
        id: "gavia-immer",
        commonName: "普通潜鸟",
        scientificName: "Gavia immer",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "3-5 kg",
        length: "61-100 cm",
        lifespan: "15-25 年",
        shortDescription:
          "普通潜鸟以其黑白羽毛和红色眼睛而闻名，分布于北美和欧洲的湖泊中。",
        habitats: ["湖泊", "海洋", "沿海地区"],
      },
      {
        id: "picus-viridis",
        commonName: "绿啄木鸟",
        scientificName: "Picus viridis",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.18-0.22 kg",
        length: "31-33 cm",
        lifespan: "5-10 年",
        shortDescription:
          "绿啄木鸟以其绿色羽毛和红色头顶而闻名，分布于欧洲，常在草地上觅食蚂蚁。",
        habitats: ["森林", "草原", "公园"],
      },
      {
        id: "larus-argentatus",
        commonName: "银鸥",
        scientificName: "Larus argentatus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.8-1.5 kg",
        length: "55-67 cm",
        lifespan: "10-20 年",
        shortDescription:
          "银鸥以其白色羽毛和黄色喙而闻名，分布于北半球的沿海地区。",
        habitats: ["海洋", "沿海地区", "湖泊"],
      },
      {
        id: "spizaetus-ornatus",
        commonName: "华丽鹰",
        scientificName: "Spizaetus ornatus",
        conservationStatus: "NT",
        image: "/placeholder.svg?height=500&width=700",
        weight: "1-1.5 kg",
        length: "58-67 cm",
        lifespan: "15-20 年",
        shortDescription:
          "华丽鹰以其华丽的羽毛而闻名，分布于南美洲的热带雨林中，主要捕食小型哺乳动物。",
        habitats: ["热带雨林", "低地森林"],
      },
      {
        id: "cacomantis-merulinus",
        commonName: "哀杜鹃",
        scientificName: "Cacomantis merulinus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.03-0.04 kg",
        length: "20-23 cm",
        lifespan: "5-10 年",
        shortDescription:
          "哀杜鹃以其哀怨的叫声而闻名，分布于亚洲，常以寄生繁殖方式繁殖。",
        habitats: ["森林", "灌木丛", "农田"],
      },
      {
        id: "cyanopica-cyanus",
        commonName: "灰喜鹊",
        scientificName: "Cyanopica cyanus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.07-0.09 kg",
        length: "30-35 cm",
        lifespan: "5-10 年",
        shortDescription:
          "灰喜鹊以其蓝色翅膀和长尾巴而闻名，分布于东亚，常成群活动。",
        habitats: ["森林", "灌木丛", "城市公园"],
      },
      {
        id: "pica-pica",
        commonName: "喜鹊",
        scientificName: "Pica pica",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.2-0.25 kg",
        length: "44-46 cm",
        lifespan: "5-10 年",
        shortDescription:
          "喜鹊以其黑白羽毛和长尾巴而闻名，分布于欧亚大陆，常被视为吉祥的象征。",
        habitats: ["森林", "农田", "城市公园"],
      },
      {
        id: "parus-major",
        commonName: "大山雀",
        scientificName: "Parus major",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.016-0.021 kg",
        length: "13-15 cm",
        lifespan: "5-10 年",
        shortDescription:
          "大山雀以其黄色腹部和蓝色翅膀而闻名，分布于欧洲和亚洲，常在花园中觅食。",
        habitats: ["森林", "花园", "城市公园"],
      },
      {
        id: "anas-platyrhynchos",
        commonName: "绿头鸭",
        scientificName: "Anas platyrhynchos",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.7-1.6 kg",
        length: "50-65 cm",
        lifespan: "5-10 年",
        shortDescription:
          "绿头鸭以其雄鸟的绿色头部而闻名，分布于北半球，是家鸭的祖先。",
        habitats: ["湖泊", "河流", "湿地"],
      },
      {
        id: "gallina-gallina",
        commonName: "原鸡",
        scientificName: "Gallina gallina",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.5-1 kg",
        length: "40-50 cm",
        lifespan: "5-10 年",
        shortDescription:
          "原鸡是家鸡的野生祖先，分布于亚洲的森林中，以其多彩羽毛而闻名。",
        habitats: ["森林", "灌木丛", "农田"],
      },
      {
        id: "coracias-garrulus",
        commonName: "蓝胸佛法僧",
        scientificName: "Coracias garrulus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.1-0.15 kg",
        length: "29-32 cm",
        lifespan: "5-10 年",
        shortDescription:
          "蓝胸佛法僧以其蓝色和橙色羽毛而闻名，分布于欧洲和非洲，主要捕食昆虫。",
        habitats: ["草原", "森林边缘", "农田"],
      },
      {
        id: "lanius-excubitor",
        commonName: "灰伯劳",
        scientificName: "Lanius excubitor",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.06-0.08 kg",
        length: "22-26 cm",
        lifespan: "5-10 年",
        shortDescription:
          "灰伯劳以其捕猎行为而闻名，常将猎物挂在刺上，分布于北半球。",
        habitats: ["草原", "灌木丛", "森林边缘"],
      },
      {
        id: "oriolus-oriolus",
        commonName: "黄鹂",
        scientificName: "Oriolus oriolus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.06-0.09 kg",
        length: "24-25 cm",
        lifespan: "5-10 年",
        shortDescription:
          "黄鹂以其鲜艳的黄色羽毛和美妙歌声而闻名，分布于欧洲和亚洲。",
        habitats: ["森林", "花园", "灌木丛"],
      },
      {
        id: "saxicola-rubicola",
        commonName: "红尾鸲",
        scientificName: "Saxicola rubicola",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.013-0.017 kg",
        length: "12-14 cm",
        lifespan: "5-10 年",
        shortDescription:
          "红尾鸲以其橙红色尾巴而闻名，分布于欧洲和非洲，常在开阔地带觅食。",
        habitats: ["草原", "灌木丛", "农田"],
      },
      {
        id: "erithacus-rubecula",
        commonName: "欧亚鸲",
        scientificName: "Erithacus rubecula",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.016-0.022 kg",
        length: "12-14 cm",
        lifespan: "5-10 年",
        shortDescription:
          "欧亚鸲以其橙红色胸部而闻名，分布于欧洲，常在花园和森林中觅食。",
        habitats: ["森林", "花园", "灌木丛"],
      },
      {
        id: "fregata-magnificens",
        commonName: "华丽军舰鸟",
        scientificName: "Fregata magnificens",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "1-1.5 kg",
        length: "89-114 cm",
        lifespan: "15-25 年",
        shortDescription:
          "华丽军舰鸟以其红色喉囊和长翼而闻名，分布于热带海洋，常以抢夺其他鸟类的食物为生。",
        habitats: ["海洋", "沿海地区", "岛屿"],
      },
      {
        id: "coccothraustes-coccothraustes",
        commonName: "锦雀",
        scientificName: "Coccothraustes coccothraustes",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.05-0.06 kg",
        length: "16-18 cm",
        lifespan: "5-10 年",
        shortDescription:
          "锦雀以其强大的喙和多彩羽毛而闻名，分布于欧洲和亚洲，主要以种子为食。",
        habitats: ["森林", "花园", "灌木丛"],
      },
      {
        id: "milvus-milvus",
        commonName: "红鸢",
        scientificName: "Milvus milvus",
        conservationStatus: "NT",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.8-1.3 kg",
        length: "60-66 cm",
        lifespan: "15-20 年",
        shortDescription:
          "红鸢以其红色羽毛和叉形尾巴而闻名，分布于欧洲，主要以腐肉和小动物为食。",
        habitats: ["森林", "草原", "农田"],
      },
      {
        id: "apodidae-apus",
        commonName: "普通雨燕",
        scientificName: "Apus apus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.03-0.05 kg",
        length: "16-17 cm",
        lifespan: "5-10 年",
        shortDescription:
          "普通雨燕以其快速飞行而闻名，分布于欧洲和非洲，几乎一生都在空中度过。",
        habitats: ["城市", "森林", "草原"],
      },
      {
        id: "ardea-cinerea",
        commonName: "苍鹭",
        scientificName: "Ardea cinerea",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "1-2 kg",
        length: "84-102 cm",
        lifespan: "15-20 年",
        shortDescription:
          "苍鹭以其灰色羽毛和长颈而闻名，分布于欧亚大陆和非洲，主要捕食鱼类。",
        habitats: ["湿地", "河流", "湖泊"],
      },
      {
        id: "bubulcus-ibis",
        commonName: "牛背鹭",
        scientificName: "Bubulcus ibis",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.3-0.5 kg",
        length: "46-56 cm",
        lifespan: "5-10 年",
        shortDescription:
          "牛背鹭以其白色羽毛而闻名，常跟随牛群觅食昆虫，分布于全球热带和温带地区。",
        habitats: ["草原", "湿地", "农田"],
      },
      {
        id: "chloris-sinica",
        commonName: "金翅雀",
        scientificName: "Chloris sinica",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.01-0.02 kg",
        length: "12-14 cm",
        lifespan: "5-10 年",
        shortDescription:
          "金翅雀以其黄色翅膀而闻名，分布于东亚，常在开阔地带觅食种子。",
        habitats: ["草原", "灌木丛", "农田"],
      },
      {
        id: "cuculus-micropterus",
        commonName: "四声杜鹃",
        scientificName: "Cuculus micropterus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.1-0.15 kg",
        length: "30-33 cm",
        lifespan: "5-10 年",
        shortDescription:
          "四声杜鹃以其“布谷布谷”叫声而闻名，分布于亚洲，常以寄生繁殖方式繁殖。",
        habitats: ["森林", "灌木丛", "农田"],
      },
      {
        id: "dendrocitta-vagabunda",
        commonName: "树鹊",
        scientificName: "Dendrocitta vagabunda",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.09-0.12 kg",
        length: "35-40 cm",
        lifespan: "5-10 年",
        shortDescription:
          "树鹊以其棕色羽毛和长尾巴而闻名，分布于南亚，常在树上觅食。",
        habitats: ["森林", "灌木丛", "城市公园"],
      },
      {
        id: "eophona-personata",
        commonName: "黑头蜡嘴雀",
        scientificName: "Eophona personata",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.05-0.07 kg",
        length: "18-20 cm",
        lifespan: "5-10 年",
        shortDescription:
          "黑头蜡嘴雀以其黑色头部和黄色喙而闻名，分布于东亚，主要以种子为食。",
        habitats: ["森林", "灌木丛", "农田"],
      },
      {
        id: "garrulus-glandarius",
        commonName: "松鸦",
        scientificName: "Garrulus glandarius",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.14-0.19 kg",
        length: "32-35 cm",
        lifespan: "5-10 年",
        shortDescription:
          "松鸦以其蓝色和白色翅膀而闻名，分布于欧洲和亚洲，常储存橡果过冬。",
        habitats: ["森林", "灌木丛", "公园"],
      },
      {
        id: "hirundo-rustica",
        commonName: "家燕",
        scientificName: "Hirundo rustica",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.016-0.025 kg",
        length: "17-19 cm",
        lifespan: "5-10 年",
        shortDescription:
          "家燕以其叉形尾巴和蓝色背部而闻名，分布于全球，常在人类房屋附近筑巢。",
        habitats: ["农田", "村庄", "湿地"],
      },
      {
        id: "lophophanes-cristatus",
        commonName: "凤头山雀",
        scientificName: "Lophophanes cristatus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.01-0.015 kg",
        length: "11-12 cm",
        lifespan: "5-10 年",
        shortDescription:
          "凤头山雀以其独特冠羽而闻名，分布于欧洲，常在针叶林中觅食。",
        habitats: ["针叶林", "森林", "灌木丛"],
      },
      {
        id: "motacilla-alba",
        commonName: "白鹡鸰",
        scientificName: "Motacilla alba",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.02-0.025 kg",
        length: "16-19 cm",
        lifespan: "5-10 年",
        shortDescription:
          "白鹡鸰以其黑白羽毛和长尾巴而闻名，分布于欧亚大陆，常在水边觅食。",
        habitats: ["河流", "农田", "城市公园"],
      },
      {
        id: "nycticorax-nycticorax",
        commonName: "夜鹭",
        scientificName: "Nycticorax nycticorax",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.5-0.8 kg",
        length: "58-65 cm",
        lifespan: "5-10 年",
        shortDescription:
          "夜鹭以其夜行性和灰色羽毛而闻名，分布于全球的湿地中，主要捕食鱼类和昆虫。",
        habitats: ["湿地", "河流", "红树林"],
      },
      {
        id: "perdix-perdix",
        commonName: "灰山鹑",
        scientificName: "Perdix perdix",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.3-0.5 kg",
        length: "29-31 cm",
        lifespan: "3-5 年",
        shortDescription:
          "灰山鹑以其灰色羽毛和橙色面部而闻名，分布于欧洲，常在农田中觅食。",
        habitats: ["农田", "草原", "灌木丛"],
      },
      {
        id: "phasianus-colchicus",
        commonName: "环颈雉",
        scientificName: "Phasianus colchicus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.9-1.5 kg",
        length: "60-90 cm",
        lifespan: "5-10 年",
        shortDescription:
          "环颈雉以其多彩羽毛和长尾巴而闻名，分布于欧亚大陆，常被作为猎鸟。",
        habitats: ["农田", "草原", "森林边缘"],
      },
      {
        id: "platalea-leucorodia",
        commonName: "白琵鹭",
        scientificName: "Platalea leucorodia",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "1.2-2 kg",
        length: "80-100 cm",
        lifespan: "15-20 年",
        shortDescription:
          "白琵鹭以其勺形喙和白色羽毛而闻名，分布于欧洲和非洲的湿地中。",
        habitats: ["湿地", "沿海地区", "湖泊"],
      },
      {
        id: "podiceps-cristatus",
        commonName: "凤头鸊鷉",
        scientificName: "Podiceps cristatus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.6-1.5 kg",
        length: "46-51 cm",
        lifespan: "10-15 年",
        shortDescription:
          "凤头鸊鷉以其头上的冠羽而闻名，分布于欧洲和亚洲的湖泊中，常以潜水捕鱼。",
        habitats: ["湖泊", "河流", "湿地"],
      },
      {
        id: "regulus-regulus",
        commonName: "戴菊莺",
        scientificName: "Regulus regulus",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.005-0.007 kg",
        length: "9-10 cm",
        lifespan: "3-5 年",
        shortDescription:
          "戴菊莺是欧洲最小的鸟类之一，以其黄色冠羽而闻名，常在针叶林中觅食。",
        habitats: ["针叶林", "森林", "灌木丛"],
      },
      {
        id: "sitta-europaea",
        commonName: "欧亚鹟",
        scientificName: "Sitta europaea",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.02-0.025 kg",
        length: "13-14 cm",
        lifespan: "5-10 年",
        shortDescription:
          "欧亚鹟以其蓝色背部和爬树能力而闻名，分布于欧亚大陆，常在树干上觅食。",
        habitats: ["森林", "公园", "花园"],
      },
      {
        id: "streptopelia-decaocto",
        commonName: "斑鸠",
        scientificName: "Streptopelia decaocto",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.15-0.2 kg",
        length: "31-33 cm",
        lifespan: "5-10 年",
        shortDescription:
          "斑鸠以其灰色羽毛和黑色颈环而闻名，分布于欧亚大陆，常在城市中觅食。",
        habitats: ["城市", "农田", "森林边缘"],
      },
      {
        id: "sylvia-atricapilla",
        commonName: "黑顶莺",
        scientificName: "Sylvia atricapilla",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.015-0.022 kg",
        length: "13-15 cm",
        lifespan: "5-10 年",
        shortDescription:
          "黑顶莺以其黑色头顶和美妙歌声而闻名，分布于欧洲和非洲，常在灌木丛中觅食。",
        habitats: ["森林", "灌木丛", "花园"],
      },
      {
        id: "tachybaptus-ruficollis",
        commonName: "小鸊鷉",
        scientificName: "Tachybaptus ruficollis",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.13-0.2 kg",
        length: "23-29 cm",
        lifespan: "5-10 年",
        shortDescription:
          "小鸊鷉以其小型体型和潜水能力而闻名，分布于欧亚大陆和非洲的湖泊中。",
        habitats: ["湖泊", "河流", "湿地"],
      },
      {
        id: "troglodytes-troglodytes",
        commonName: "鹪鹩",
        scientificName: "Troglodytes troglodytes",
        conservationStatus: "LC",
        image: "/placeholder.svg?height=500&width=700",
        weight: "0.008-0.012 kg",
        length: "9-10 cm",
        lifespan: "3-5 年",
        shortDescription:
          "鹪鹩是欧洲最小的鸟类之一，以其响亮的歌声而闻名，常在灌木丛中觅食。",
        habitats: ["森林", "灌木丛", "花园"],
      },
    ];

    allSpecies.value = mockSpecies;
  } catch (error) {
    console.error("Error fetching species data:", error);
  } finally {
    loading.value = false;
  }
};

const navigateTo = (page, id) => {
  console.log(`Navigate to ${page}${id ? ": " + id : ""}`);
};

const navigateToSubcategory = (subcategoryId) => {
  console.log(`Navigate to subcategory: ${subcategoryId}`);
};

const navigateToSpeciesDetail = (speciesId) => {
  console.log(`Navigate to species detail: ${speciesId}`);
};

const filterSpecies = () => {
  currentPage.value = 1;
};

const clearSearch = () => {
  searchQuery.value = "";
  filterSpecies();
};

const clearConservationFilter = () => {
  conservationFilter.value = "all";
  filterSpecies();
};

const clearHabitatFilter = () => {
  habitatFilter.value = "all";
  filterSpecies();
};

const clearAllFilters = () => {
  searchQuery.value = "";
  conservationFilter.value = "all";
  habitatFilter.value = "all";
  sortBy.value = "name";
  filterSpecies();
};

const changePage = (page) => {
  if (typeof page === "number") {
    currentPage.value = page;
    document
      .querySelector(".species-cards-section")
      .scrollIntoView({ behavior: "smooth" });
  }
};

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M+";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K+";
  }
  return num.toLocaleString();
};

const getConservationStatusClass = (status) => {
  const statusMap = {
    LC: "status-lc",
    NT: "status-nt",
    VU: "status-vu",
    EN: "status-en",
    CR: "status-cr",
    EW: "status-ew",
    EX: "status-ex",
  };

  return statusMap[status] || "";
};

const getConservationStatusText = (status) => {
  const statusMap = {
    LC: "无危 (LC)",
    NT: "近危 (NT)",
    VU: "易危 (VU)",
    EN: "濒危 (EN)",
    CR: "极危 (CR)",
    EW: "野外灭绝 (EW)",
    EX: "灭绝 (EX)",
  };

  return statusMap[status] || status;
};

const getConservationValue = (status) => {
  const statusValues = {
    LC: 1,
    NT: 2,
    VU: 3,
    EN: 4,
    CR: 5,
    EW: 6,
    EX: 7,
  };

  return statusValues[status] || 0;
};

const getStatusColor = (status) => {
  const colorMap = {
    LC: "var(--status-lc)",
    NT: "var(--status-nt)",
    VU: "var(--status-vu)",
    EN: "var(--status-en)",
    CR: "var(--status-cr)",
    EW: "var(--status-ew)",
    EX: "var(--status-ex)",
  };

  return colorMap[status] || "#999";
};

const parseWeight = (weightStr) => {
  const match = weightStr.match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
};

// 转换 density 为热力图的强度值
const getDensityValue = (density) => {
  switch (density) {
    case "high":
      return 10;
    case "medium":
      return 5;
    case "low":
      return 2;
    default:
      return 1;
  }
};

onMounted(() => {
  fetchSpeciesData();
});

onBeforeUnmount(() => {
  if (map.value) {
    map.value.destroy();
  }
  if (heatmapLayer.value) {
    heatmapLayer.value.destroy();
  }
});
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
  --status-vu: #ffc107;
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

button {
  cursor: pointer;
  font-family: inherit;
  border: none;
  transition: var(--transition);
}

/* Header Styles */
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background-color: var(--background-white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h2 {
  color: var(--primary-color);
  font-size: 1.5rem;
}

.main-nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: var(--text-secondary);
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary-color);
  text-decoration: none;
}

.nav-link.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
}

/* Breadcrumb */
.breadcrumb-section {
  background-color: var(--background-white);
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.breadcrumb {
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
  color: var(--text-primary);
  font-weight: 500;
}

/* Hero Section */
.subcategory-hero {
  background-size: cover;
  background-position: center;
  color: white;
  padding: 5rem 0;
  position: relative;
}

.subcategory-hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.7)
  );
}

.subcategory-hero .container {
  position: relative;
  z-index: 1;
}

.subcategory-hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: white;
}

.hero-description {
  max-width: 800px;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  opacity: 0.9;
}

.subcategory-stats {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  backdrop-filter: blur(5px);
  min-width: 150px;
}

.stat-icon {
  margin-bottom: 1rem;
  color: var(--accent-color);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Search and Filter Section */
.search-filter-section {
  background-color: var(--background-white);
  padding: 2rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.search-filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-box {
  display: flex;
  flex: 1;
  max-width: 400px;
}

.search-box input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  font-size: 1rem;
}

.search-button {
  background-color: var(--primary-color);
  color: white;
  padding: 0 1rem;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button:hover {
  background-color: var(--primary-dark);
}

.filter-options {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-group label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.filter-group select {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  background-color: white;
  font-size: 0.9rem;
}

.active-filters {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.active-filters p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-tag {
  background-color: #f0f0f0;
  padding: 0.5rem 0.75rem;
  border-radius: 50px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-tag button {
  background: none;
  border: none;
  font-size: 1.2rem;
  line-height: 1;
  color: var(--text-secondary);
}

.clear-all {
  background: none;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.clear-all:hover {
  background-color: #f0f0f0;
}

/* Characteristics Section */
.characteristics-section {
  padding: 3rem 0;
  background-color: var(--background-white);
}

.characteristics-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.characteristics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.characteristic-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--background-light);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  transition: var(--transition);
}

.characteristic-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.characteristic-icon {
  color: var(--primary-color);
  flex-shrink: 0;
}

.characteristic-content h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.characteristic-content p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

/* Species Cards Section */
.species-cards-section {
  padding: 3rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.section-header p {
  color: var(--text-secondary);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid var(--background-light);
  border-top: 5px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1.5rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.no-results {
  text-align: center;
  padding: 3rem 0;
}

.no-results svg {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.no-results h3 {
  margin-bottom: 0.5rem;
}

.no-results p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.reset-button {
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
}

.reset-button:hover {
  background-color: var(--primary-dark);
}

.species-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.species-card {
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  cursor: pointer;
}

.species-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.species-image {
  position: relative;
  height: 220px;
}

.species-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.conservation-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 0.75rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.8rem;
  color: white;
}

.status-lc {
  background-color: var(--status-lc);
}
.status-nt {
  background-color: var(--status-nt);
}
.status-vu {
  background-color: var(--status-vu);
  color: var(--text-primary);
}
.status-en {
  background-color: var(--status-en);
}
.status-cr {
  background-color: var(--status-cr);
}
.status-ew {
  background-color: var(--status-ew);
}
.status-ex {
  background-color: var(--status-ex);
}

.species-content {
  padding: 1.5rem;
}

.species-content h3 {
  margin-bottom: 0.25rem;
  font-size: 1.4rem;
}

.scientific-name {
  font-style: italic;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.species-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.info-value {
  font-weight: 500;
  font-size: 0.9rem;
}

.species-description {
  margin-bottom: 1rem;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.95rem;
}

.species-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.species-tag {
  background-color: rgba(46, 125, 50, 0.1);
  color: var(--primary-color);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
}

.species-tag.more {
  background-color: rgba(0, 0, 0, 0.05);
  color: var(--text-secondary);
}

.view-details-button {
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 0;
  border-radius: var(--border-radius);
  font-weight: 500;
  text-align: center;
}

.view-details-button:hover {
  background-color: var(--primary-dark);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  gap: 1rem;
}

.pagination-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--background-white);
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  color: var(--text-primary);
}

.pagination-button:hover:not(:disabled) {
  background-color: var(--background-light);
  border-color: var(--primary-color);
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--background-white);
  border: 1px solid #ddd;
  color: var(--text-primary);
}

.page-number:hover:not(.active) {
  background-color: var(--background-light);
  border-color: var(--primary-color);
}

.page-number.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

/* Distribution Map */
.distribution-section {
  padding: 4rem 0;
  background-color: var(--background-white);
}

.distribution-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.distribution-map-container {
  position: relative;
  margin-bottom: 2rem;
  height: 500px; /* 调整高度 */
}

.gaode-map {
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.map-legend {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 100;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.high-density {
  background-color: rgba(255, 0, 0, 0.8); /* 与热力图高密度颜色一致 */
}

.medium-density {
  background-color: rgba(0, 255, 0, 0.2); /* 与热力图中密度颜色一致 */
}

.low-density {
  background-color: rgba(0, 128, 255, 0.5); /* 与热力图低密度颜色一致 */
}

.region-list {
  max-width: 800px;
  margin: 0 auto;
}

.region-list h3 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.regions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.region-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--background-light);
  padding: 0.75rem 1.25rem;
  border-radius: 50px;
}

.region-icon {
  color: var(--primary-color);
}

/* 移除不再需要的 info-window 样式 */
.info-window {
  display: none; /* 热力图不需要信息窗口 */
}

/* Conservation Status */
.conservation-section {
  padding: 4rem 0;
}

.conservation-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.conservation-overview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.conservation-chart {
  background-color: var(--background-white);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.chart-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.chart-bar {
  height: 30px;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
  min-width: 40px;
  transition: width 1s ease-in-out;
}

.chart-legend {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.legend-text {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.legend-code {
  font-weight: 600;
}

.legend-name {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.legend-percentage {
  font-weight: 500;
}

.conservation-text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.conservation-text p {
  line-height: 1.7;
}

.conservation-link {
  display: inline-block;
  margin-top: 1rem;
  color: var(--primary-color);
  font-weight: 500;
}

.conservation-link:hover {
  color: var(--primary-dark);
}

/* Related Subcategories */
.related-subcategories {
  padding: 4rem 0;
  background-color: var(--background-white);
}

.related-subcategories h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.subcategories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.subcategory-card {
  position: relative;
  height: 180px;
  border-radius: var(--border-radius);
  overflow: hidden;
  cursor: pointer;
}

.subcategory-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.subcategory-card:hover img {
  transform: scale(1.1);
}

.subcategory-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
}

.subcategory-overlay h3 {
  color: white;
  margin-bottom: 0.25rem;
}

.subcategory-overlay span {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Footer */
.main-footer {
  background-color: #1b5e20;
  color: white;
  padding: 3rem 0 1rem;
  margin-top: 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
}

.footer-section h4 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: white;
}

.footer-section p {
  opacity: 0.8;
  margin-bottom: 1rem;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul li a {
  color: white;
  opacity: 0.8;
  transition: var(--transition);
}

.footer-section ul li a:hover {
  opacity: 1;
  text-decoration: underline;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom p {
  opacity: 0.7;
  font-size: 0.9rem;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .conservation-overview {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .subcategory-hero h1 {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .search-filter-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-box {
    max-width: 100%;
    width: 100%;
  }

  .filter-options {
    width: 100%;
    justify-content: space-between;
  }

  .species-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .subcategory-hero h1 {
    font-size: 2rem;
  }

  .map-legend {
    position: static;
    margin-top: 1rem;
  }
}

@media (max-width: 480px) {
  .species-grid {
    grid-template-columns: 1fr;
  }

  .filter-options {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-group {
    width: 100%;
  }

  .filter-group select {
    flex: 1;
  }

  .subcategory-stats {
    justify-content: center;
  }

  .page-numbers {
    display: none;
  }

  .pagination {
    justify-content: space-between;
    width: 100%;
  }
}

/* Gaode Map Styles */
.distribution-map-container {
  position: relative;
  margin-bottom: 2rem;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
}

.gaode-map {
  width: 100%;
  height: 500px;
}

.map-legend {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 100;
}

.info-window {
  padding: 10px;
  max-width: 200px;
}

.info-window h4 {
  margin-bottom: 5px;
  color: var(--primary-dark);
}

.info-window p {
  margin: 5px 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* Make sure the map is responsive */
/* 响应式样式 */
@media (max-width: 768px) {
  .gaode-map {
    height: 400px;
  }

  .map-legend {
    position: static;
    margin-top: 1rem;
    background-color: var(--background-white);
  }
}

@media (max-width: 480px) {
  .gaode-map {
    height: 300px;
  }
}
</style>