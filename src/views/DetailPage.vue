<template>
  <div class="species-collection-page">
    <!-- Navigation Header -->
    <header class="main-header">
      <div class="logo">
        <a href="/">
          <img style="width:180px;" src="../assets/logo.png" alt="">
        </a>
      </div>
      <nav class="main-nav">
        <a href="/" class="nav-link">首页</a>
          <a href="/library" class="nav-link active">百科</a>
          <a href="/public" class="nav-link">发现</a>
          <a href="/chat" class="nav-link">助手</a>
      </nav>
    </header>

    <!-- Breadcrumb Navigation -->
    <section class="breadcrumb-section">
      <div class="container">
        <div class="breadcrumb">
          <a href="/" @click.prevent="navigateTo('home')">主页</a> &gt;
          <a href="/categories" @click.prevent="navigateTo('categories')"
            >类别</a
          >
          &gt;
          <a href="#" @click.prevent="navigateTo('category', category.id)">{{
            category.name
          }}</a>
          &gt;
          <span>{{ subcategory.name }}</span>
        </div>
      </div>
    </section>

    <!-- Hero Section -->
    <section
      class="subcategory-hero"
      :style="{
        backgroundImage: `url(${subcategory.backgroundImage})`,
      }"
    >
      <div class="container">
        <h1>{{ subcategory.name }}</h1>
        <p class="hero-description">{{ subcategory.description }}</p>
        <div class="subcategory-stats">
          <div class="stat-item">
            <div class="stat-icon">
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
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div class="stat-value">
              {{ formatNumber(subcategory.speciesCount) }}
            </div>
            <div class="stat-label">已知物种</div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
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
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div class="stat-value">{{ subcategory.regions.length }}</div>
            <div class="stat-label">分布区域</div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
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
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div class="stat-value">
              {{ subcategory.characteristics.length }}
            </div>
            <div class="stat-label">主要特征</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Search and Filter Section -->
    <section class="search-filter-section">
      <div class="container">
        <div class="search-filter-container">
          <div class="search-box">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="搜索物种..."
              @input="filterSpecies"
            />
            <button class="search-button">
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
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>

          <div class="filter-options">
            <div class="filter-group">
              <label>保护状态:</label>
              <select v-model="conservationFilter" @change="filterSpecies">
                <option value="all">全部</option>
                <option value="LC">无危 (LC)</option>
                <option value="NT">近危 (NT)</option>
                <option value="VU">易危 (VU)</option>
                <option value="EN">濒危 (EN)</option>
                <option value="CR">极危 (CR)</option>
                <option value="EW">野外灭绝 (EW)</option>
                <option value="EX">灭绝 (EX)</option>
              </select>
            </div>

            <div class="filter-group">
              <label>栖息地:</label>
              <select v-model="habitatFilter" @change="filterSpecies">
                <option value="all">全部</option>
                <option
                  v-for="habitat in habitats"
                  :key="habitat"
                  :value="habitat"
                >
                  {{ habitat }}
                </option>
              </select>
            </div>

            <div class="filter-group">
              <label>排序:</label>
              <select v-model="sortBy" @change="filterSpecies">
                <option value="name">名称 (A-Z)</option>
                <option value="nameDesc">名称 (Z-A)</option>
                <option value="conservation">保护状态 (低风险-高风险)</option>
                <option value="conservationDesc">
                  保护状态 (高风险-低风险)
                </option>
                <option value="weight">体重 (低-高)</option>
                <option value="weightDesc">体重 (高-低)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="active-filters" v-if="hasActiveFilters">
          <p>当前筛选条件:</p>
          <div class="filter-tags">
            <span class="filter-tag" v-if="searchQuery">
              搜索: "{{ searchQuery }}"
              <button @click="clearSearch">×</button>
            </span>
            <span class="filter-tag" v-if="conservationFilter !== 'all'">
              保护状态: {{ getConservationStatusText(conservationFilter) }}
              <button @click="clearConservationFilter">×</button>
            </span>
            <span class="filter-tag" v-if="habitatFilter !== 'all'">
              栖息地: {{ habitatFilter }}
              <button @click="clearHabitatFilter">×</button>
            </span>
          </div>
          <button class="clear-all" @click="clearAllFilters">清除全部</button>
        </div>
      </div>
    </section>

    <!-- Subcategory Characteristics -->
    <section class="characteristics-section">
      <div class="container">
        <h2>{{ subcategory.name }}的主要特征</h2>
        <div class="characteristics-grid">
          <div
            class="characteristic-card"
            v-for="(characteristic, index) in subcategory.characteristics"
            :key="index"
          >
            <div class="characteristic-icon">
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
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <div class="characteristic-content">
              <h3>{{ characteristic.title }}</h3>
              <p>{{ characteristic.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Species Cards Section -->
    <section class="species-cards-section">
      <div class="container">
        <div class="section-header">
          <h2>{{ subcategory.name }}物种</h2>
          <p>
            共 521 种 (总计 521 种)
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

    <!-- Distribution Map -->
    <section class="distribution-section">
      <div class="container">
        <h2>{{ subcategory.name }}全球分布</h2>
        <div class="distribution-map-container">
            <Maps></Maps>    
          <div id="gaode-map" class="gaode-map"></div>
          <div class="map-legend">
            <div class="legend-item">
              <div class="legend-color high-density"></div>
              <span>高密度</span>
            </div>
            <div class="legend-item">
              <div class="legend-color medium-density"></div>
              <span>中密度</span>
            </div>
            <div class="legend-item">
              <div class="legend-color low-density"></div>
              <span>低密度</span>
            </div>
          </div>
        </div>
        <div class="region-list">
          <h3>主要分布区域</h3>
          <div class="regions">
            <div
              class="region-item"
              v-for="(region, index) in subcategory.regions"
              :key="index"
            >
              <div class="region-icon">
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
                  <path
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                  ></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <span>{{ region }}</span>
            </div>
          </div>
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

    <!-- Related Subcategories -->
    <section class="related-subcategories">
      <div class="container">
        <h2>相关分类</h2>
        <div class="subcategories-grid">
          <div
            v-for="relatedSubcategory in relatedSubcategories"
            :key="relatedSubcategory.id"
            class="subcategory-card"
            @click="navigateToSubcategory(relatedSubcategory.id)"
          >
            <img
              :src="relatedSubcategory.image"
              :alt="relatedSubcategory.name"
            />
            <div class="subcategory-overlay">
              <h3>{{ relatedSubcategory.name }}</h3>
              <span
                >{{ formatNumber(relatedSubcategory.speciesCount) }} 种</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="main-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>生物百科</h3>
            <p>地球生物多样性综合指南</p>
          </div>
          <div class="footer-section">
            <h4>探索</h4>
            <ul>
              <li><a href="#">动物</a></li>
              <li><a href="#">植物</a></li>
              <li><a href="#">真菌</a></li>
              <li><a href="#">微生物</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>资源</h4>
            <ul>
              <li><a href="#">保护</a></li>
              <li><a href="#">研究</a></li>
              <li><a href="#">教育</a></li>
              <li><a href="#">出版物</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>连接</h4>
            <ul>
              <li><a href="#">关于我们</a></li>
              <li><a href="#">接触</a></li>
              <li><a href="#">隐私政策</a></li>
              <li><a href="#">使用条款</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 生息云纪. 保留所有权利.</p>
        </div>
      </div>
    </footer>
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
import Maps from '../components/map.vue'
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
  id: "primates",
  name: "灵长类",
  description:
    "灵长类是一个多样化的哺乳动物类群，包括猴子、猿和人类。它们以高度发达的大脑、灵活的手指和拇指对握能力、前向的眼睛和复杂的社会行为为特征。",
  backgroundImage: "/src/assets/more/title.png?height=800&width=1200",
  speciesCount: 521,
  regions: ["非洲", "亚洲", "中南美洲", "马达加斯加"],
  characteristics: [
    {
      title: "高度发达的大脑",
      description:
        "灵长类动物拥有相对于体型较大的脑容量，使它们具有复杂的认知能力、问题解决能力和学习能力。",
    },
    {
      title: "灵活的手部",
      description:
        "大多数灵长类动物具有灵活的手指和拇指对握能力，使它们能够精确操作物体和使用工具。",
    },
    {
      title: "前向的眼睛",
      description:
        "灵长类动物的眼睛位于面部前方，提供立体视觉，有助于判断距离和深度。",
    },
    {
      title: "复杂的社会结构",
      description:
        "灵长类动物通常生活在复杂的社会群体中，具有复杂的社会行为、沟通方式和社会层级。",
    },
    {
      title: "多样的饮食习惯",
      description:
        "灵长类动物的饮食范围从纯素食（如叶子和水果）到杂食（包括昆虫和小型脊椎动物）不等。",
    },
    {
      title: "长寿和缓慢发育",
      description:
        "与其他同等大小的哺乳动物相比，灵长类动物通常寿命更长，发育更慢，有更长的幼年期和学习期。",
    },
  ],
  conservationSummary:
    "灵长类动物是地球上受威胁最严重的哺乳动物类群之一，约60%的灵长类物种面临灭绝风险。主要威胁包括栖息地丧失、非法野生动物贸易、气候变化和疾病。保护灵长类动物对于维持森林生态系统健康至关重要，因为它们在种子传播和维持植物多样性方面发挥着关键作用。",
});

// Mock data for related subcategories
const relatedSubcategories = ref([
  {
    id: "carnivores",
    name: "食肉目",
    image: "/src/assets/more/srm.png?height=300&width=400",
    speciesCount: 280,
  },
  {
    id: "cetaceans",
    name: "鲸目",
    image: "/src/assets/more/jm.png?height=300&width=400",
    speciesCount: 89,
  },
  {
    id: "rodents",
    name: "啮齿目",
    image: "/src/assets/more/ncm.png?height=300&width=400",
    speciesCount: 2277,
  },
  {
    id: "marsupials",
    name: "有袋目",
    image: "/src/assets/more/ydm.png?height=300&width=400",
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
        id: "gorilla-gorilla",
        commonName: "西部低地大猩猩",
        scientificName: "Gorilla gorilla",
        conservationStatus: "CR",
        image: "/src/assets/more/xbdxx.png?height=500&width=700",
        weight: "135-220 kg",
        length: "1.4-1.8 m",
        lifespan: "35-40 年",
        shortDescription:
          "西部低地大猩猩是大型类人猿，生活在非洲中部和西部的热带森林中。它们主要以植物为食，形成由一个雄性领导的家族群体。",
        habitats: ["热带雨林", "沼泽森林", "低地森林"],
      },
      {
        id: "pan-troglodytes",
        commonName: "黑猩猩",
        scientificName: "Pan troglodytes",
        conservationStatus: "EN",
        image: "/src/assets/more/hxx.png?height=500&width=700",
        weight: "40-70 kg",
        length: "1.0-1.7 m",
        lifespan: "40-50 年",
        shortDescription:
          "黑猩猩是与人类基因最接近的生物，拥有复杂的社会结构和工具使用能力。它们生活在非洲的森林和草原地区。",
        habitats: ["热带雨林", "山地森林", "草原林地"],
      },
      {
        id: "pongo-pygmaeus",
        commonName: "婆罗洲猩猩",
        scientificName: "Pongo pygmaeus",
        conservationStatus: "CR",
        image: "/src/assets/more/blzxx.png?height=500&width=700",
        weight: "30-90 kg",
        length: "1.2-1.4 m",
        lifespan: "35-45 年",
        shortDescription:
          "婆罗洲猩猩是亚洲唯一的大型类人猿，生活在婆罗洲的热带雨林中。它们大部分时间在树上度过，以水果为主食。",
        habitats: ["热带雨林", "泥炭沼泽林", "低地森林"],
      },
      {
        id: "macaca-mulatta",
        commonName: "恒河猴",
        scientificName: "Macaca mulatta",
        conservationStatus: "LC",
        image: "/src/assets/more/henh.png?height=500&width=700",
        weight: "5-12 kg",
        length: "47-64 cm",
        lifespan: "20-30 年",
        shortDescription:
          "恒河猴是一种适应性强的猴子，分布于南亚和东南亚。它们能够适应多种栖息地，从森林到城市环境。",
        habitats: ["落叶林", "常绿林", "城市环境", "农田"],
      },
      {
        id: "papio-anubis",
        commonName: "橄榄狒狒",
        scientificName: "Papio anubis",
        conservationStatus: "LC",
        image: "/src/assets/more/glff.png??height=500&width=700",
        weight: "14-45 kg",
        length: "60-86 cm",
        lifespan: "30-45 年",
        shortDescription:
          "橄榄狒狒是非洲最大的猴子之一，生活在撒哈拉以南非洲的草原和稀树草原。它们是杂食性动物，有复杂的社会结构。",
        habitats: ["草原", "稀树草原", "灌木丛"],
      },
      {
        id: "lemur-catta",
        commonName: "环尾狐猴",
        scientificName: "Lemur catta",
        conservationStatus: "EN",
        image: "/src/assets/more/hwhh.png?height=500&width=700",
        weight: "2.2-3.5 kg",
        length: "39-46 cm",
        lifespan: "16-19 年",
        shortDescription:
          "环尾狐猴以其黑白相间的长尾巴而闻名，是马达加斯加特有的灵长类动物。它们生活在社会群体中，主要以水果和树叶为食。",
        habitats: ["落叶林", "灌木林", "岩石地带"],
      },
      {
        id: "hylobates-lar",
        commonName: "白掌长臂猿",
        scientificName: "Hylobates lar",
        conservationStatus: "EN",
        image: "/src/assets/more/bzcby.png?height=500&width=700",
        weight: "4.5-7.5 kg",
        length: "45-60 cm",
        lifespan: "25-30 年",
        shortDescription:
          "白掌长臂猿是小型类人猿，以其臂展长和树上杂技能力而闻名。它们生活在东南亚的热带雨林中，形成单配偶家庭群体。",
        habitats: ["热带雨林", "季风林", "山地森林"],
      },
      {
        id: "nasalis-larvatus",
        commonName: "长鼻猴",
        scientificName: "Nasalis larvatus",
        conservationStatus: "EN",
        image: "/src/assets/more/cbh.png?height=500&width=700",
        weight: "16-22 kg",
        length: "61-76 cm",
        lifespan: "20-25 年",
        shortDescription:
          "长鼻猴以其独特的大鼻子而闻名，是婆罗洲特有的物种。它们生活在红树林和沼泽森林中，主要以叶子为食。",
        habitats: ["红树林", "沼泽森林", "河岸森林"],
      },
      {
        id: "alouatta-palliata",
        commonName: "黑吼猴",
        scientificName: "Alouatta palliata",
        conservationStatus: "VU",
        image: "/src/assets/more/hhh.png?height=500&width=700",
        weight: "4.5-9.8 kg",
        length: "55-67 cm",
        lifespan: "15-20 年",
        shortDescription:
          "黑吼猴以其响亮的叫声而闻名，可在几公里外听到。它们生活在中美洲和南美洲的热带森林中，主要以叶子为食。",
        habitats: ["热带雨林", "云雾林", "红树林"],
      },
      {
        id: "trachypithecus-obscurus",
        commonName: "叶猴",
        scientificName: "Trachypithecus obscurus",
        conservationStatus: "NT",
        image: "/src/assets/more/yh.png?height=500&width=700",
        weight: "5-9 kg",
        length: "42-61 cm",
        lifespan: "20-25 年",
        shortDescription:
          "叶猴是一种树栖猴子，生活在东南亚的森林中。它们有特殊的胃部结构，能够消化高纤维的叶子。",
        habitats: ["常绿林", "落叶林", "石灰岩森林"],
      },
      {
        id: "callithrix-jacchus",
        commonName: "白耳狨",
        scientificName: "Callithrix jacchus",
        conservationStatus: "LC",
        image: "/src/assets/more/ber.png?height=500&width=700",
        weight: "0.3-0.4 kg",
        length: "18-30 cm",
        lifespan: "10-15 年",
        shortDescription:
          "白耳狨是一种小型新世界猴，原产于巴西东北部。它们以其白色耳簇和长尾巴为特征，主要以树液和昆虫为食。",
        habitats: ["热带雨林", "次生林", "城市公园"],
      },
      {
        id: "mandrillus-sphinx",
        commonName: "山魈",
        scientificName: "Mandrillus sphinx",
        conservationStatus: "VU",
        image: "/src/assets/more/sx.png?height=500&width=700",
        weight: "12-54 kg",
        length: "61-76 cm",
        lifespan: "20-30 年",
        shortDescription:
          "山魈是世界上最大的猴子，以其鲜艳的蓝色和红色面部为特征。它们生活在非洲中部的热带雨林中，形成大型社会群体。",
        habitats: ["热带雨林", "森林边缘", "灌木丛"],
      },
      {
        id: "saimiri-sciureus",
        commonName: "松鼠猴",
        scientificName: "Saimiri sciureus",
        conservationStatus: "LC",
        image: "/src/assets/more/ssh.png?height=500&width=700",
        weight: "0.7-1.1 kg",
        length: "25-35 cm",
        lifespan: "15-20 年",
        shortDescription:
          "松鼠猴是小型新世界猴，以其敏捷和类似松鼠的行为而得名。它们生活在南美洲的热带雨林中，主要以水果和昆虫为食。",
        habitats: ["热带雨林", "河岸森林", "沼泽森林"],
      },
      {
        id: "daubentonia-madagascariensis",
        commonName: "指猴",
        scientificName: "Daubentonia madagascariensis",
        conservationStatus: "EN",
        image: "/src/assets/more/zh.png?height=500&width=700",
        weight: "2.5-3.5 kg",
        length: "36-44 cm",
        lifespan: "18-23 年",
        shortDescription:
          "指猴是马达加斯加特有的灵长类动物，以其异常细长的中指而闻名，用于从树洞中挖出昆虫。它们是夜行性动物，有独特的牙齿结构。",
        habitats: ["热带雨林", "红树林", "竹林"],
      },
      {
        id: "ateles-geoffroyi",
        commonName: "蜘蛛猴",
        scientificName: "Ateles geoffroyi",
        conservationStatus: "EN",
        image: "/src/assets/more/zzh.png?height=500&width=700",
        weight: "6-9 kg",
        length: "30-63 cm",
        lifespan: "20-27 年",
        shortDescription:
          "蜘蛛猴以其长臂和抓握尾巴而闻名，能够在树冠中敏捷移动。它们生活在中美洲和南美洲的热带雨林中，主要以水果为食。",
        habitats: ["热带雨林", "云雾林", "季节性落叶林"],
      },
      {
        id: "tarsius-tarsier",
        commonName: "眼镜猴",
        scientificName: "Tarsius tarsier",
        conservationStatus: "VU",
        image: "/src/assets/more/yjh.png?height=500&width=700",
        weight: "0.1-0.15 kg",
        length: "10-15 cm",
        lifespan: "12-20 年",
        shortDescription:
          "眼镜猴是小型夜行性灵长类动物，以其巨大的眼睛和跳跃能力而闻名。它们生活在东南亚的森林中，是纯肉食性动物，主要捕食昆虫。",
        habitats: ["热带雨林", "次生林", "竹林"],
      },
      {
        id: "cercopithecus-diana",
        commonName: "戴安娜猴",
        scientificName: "Cercopithecus diana",
        conservationStatus: "VU",
        image: "/src/assets/more/danh.png?height=500&width=700",
        weight: "4-7 kg",
        length: "40-55 cm",
        lifespan: "20-25 年",
        shortDescription:
          "戴安娜猴是一种色彩鲜艳的猴子，生活在西非的热带雨林中。它们有独特的白色胡须和胸部标记，主要以水果和昆虫为食。",
        habitats: ["热带雨林", "沼泽森林", "山地森林"],
      },
      {
        id: "homo-sapiens",
        commonName: "人类",
        scientificName: "Homo sapiens",
        conservationStatus: "LC",
        image: "/src/assets/more/rl.png?height=500&width=700",
        weight: "50-90 kg",
        length: "1.5-1.8 m",
        lifespan: "70-85 年",
        shortDescription:
          "人类是唯一现存的人属物种，以高度发达的大脑、直立行走和复杂语言能力为特征。人类已经适应并定居在地球上几乎所有的环境中。",
        habitats: ["城市", "农村", "几乎所有陆地生态系统"],
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
  // console.log(`Navigate to species detail: ${speciesId}`);
  if (speciesId === "cercopithecus-diana") {
    router.push({ name: "SpeciesDetails", params: { id: speciesId } });
  }
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
  background-color:  rgba(0, 255, 0, 0.2); /* 与热力图中密度颜色一致 */
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
  z-index: 1;
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