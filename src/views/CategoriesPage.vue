<template>
  <div class="categories-page">
    <!-- Navigation Header -->
    <header class="main-header">
      <!-- <div class="logo">
        <a href="/">
          <img style="width: 180px" src="../assets/logo.png" alt="" />
        </a>
      </div>
      <nav class="main-nav">
        <a href="/" class="nav-link">首页</a>
        <a href="/library" class="nav-link active">百科</a>
        <a href="#" class="nav-link">发现</a>
        <a href="#" class="nav-link">助手</a>
      </nav> -->
    </header>

    <!-- Hero Section -->
    <section class="categories-hero">
      <div class="container">
        <h1>探索生物类别</h1>
        <p class="hero-description">
          通过我们全面的分类系统探索地球上令人难以置信的生命多样性。从微小的细菌到参天大树，探索构成我们生命世界的生物主要群体。
        </p>
      </div>
    </section>

    <!-- Search and Filter -->
    <section class="search-section">
      <div class="container">
        <div class="breadcrumb">
          <a href="#" @click.prevent="goBack">主页</a>&gt; 
          <a href="#" @click.prevent="goToCategory">类别</a> 
        </div>
        <div class="search-container">
          <div class="search-box">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="搜索类别..."
              @input="filterCategories"
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
            <label>筛选依据:</label>
            <select v-model="selectedDomain" @change="filterCategories">
              <option value="all">所有种类</option>
              <option value="Bacteria">细菌</option>
              <option value="Archaea">古菌</option>
              <option value="Eukarya">真核生物</option>
            </select>

            <select v-model="sortBy" @change="filterCategories">
              <option value="name">类名 (A-Z)</option>
              <option value="nameDesc">类名 (Z-A)</option>
              <option value="speciesCount">物种数量 (High-Low)</option>
              <option value="speciesCountAsc">物种数量 (Low-High)</option>
            </select>
          </div>
        </div>

        <div
          class="active-filters"
          v-if="searchQuery || selectedDomain !== 'all'"
        >
          <p>Active filters:</p>
          <div class="filter-tags">
            <span class="filter-tag" v-if="searchQuery">
              Search: "{{ searchQuery }}"
              <button @click="clearSearch">×</button>
            </span>
            <span class="filter-tag" v-if="selectedDomain !== 'all'">
              Domain: {{ selectedDomain }}
              <button @click="clearDomain">×</button>
            </span>
          </div>
          <button class="clear-all" @click="clearAllFilters">Clear All</button>
        </div>
      </div>
    </section>

    <!-- Main Categories Grid -->
    <section class="main-categories">
      <div class="container">
        <div v-if="filteredCategories.length === 0" class="no-results">
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
          <h2>未找到类别</h2>
          <p>尝试调整您的搜索或过滤器来找到您要查找的内容。</p>
          <button class="reset-button" @click="clearAllFilters">
            重置筛选条件
          </button>
        </div>

        <div v-else class="categories-grid">
          <div
            v-for="category in filteredCategories"
            :key="category.id"
            class="category-card"
            @click="navigateToCategory(category.id)"
          >
            <div class="category-image">
              <img :src="category.image" :alt="category.name" />
              <div class="species-count">
                {{ formatNumber(category.speciesCount) }} 种
              </div>
            </div>
            <div class="category-content">
              <h2>{{ category.name }}</h2>
              <p class="scientific-name">
                {{ category.scientificClassification }}
              </p>
              <p class="category-description">{{ category.description }}</p>
              <div class="category-meta">
                <span
                  class="domain-tag"
                  :class="getDomainClass(category.domain)"
                  >{{ category.domain }}</span
                >
                <span class="subcategories-count"
                  >{{ category.subcategories.length }} 子类别</span
                >
              </div>
              <button class="explore-button">探索 {{ category.name }}</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Taxonomy Overview -->
    <section class="taxonomy-overview">
      <div class="container">
        <h2>了解生物分类</h2>
        <p>
          了解生物分类
          生物分类根据共同特征和进化关系将生物体划分为等级组。从最广泛到最具体的主要分类等级为：域、界、门、纲、目、科、属和种。
        </p>

        <div class="taxonomy-tree">
          <div class="taxonomy-node">
            <div class="node-label">域</div>
            <div class="node-examples">细菌、古菌、真核生物</div>
          </div>
          <div class="node-connector"></div>
          <div class="taxonomy-node">
            <div class="node-label">界</div>
            <div class="node-examples">动物、植物、真菌、原生生物</div>
          </div>
          <div class="node-connector"></div>
          <div class="taxonomy-node">
            <div class="node-label">门</div>
            <div class="node-examples">脊索动物门、节肢动物门、软体动物门</div>
          </div>
          <div class="node-connector"></div>
          <div class="taxonomy-node">
            <div class="node-label">纲</div>
            <div class="node-examples">哺乳动物、鸟类、爬行动物</div>
          </div>
          <div class="node-connector"></div>
          <div class="taxonomy-node">
            <div class="node-label">目</div>
            <div class="node-examples">食肉动物、灵长类动物、啮齿动物</div>
          </div>
          <div class="node-connector"></div>
          <div class="taxonomy-node">
            <div class="node-label">科</div>
            <div class="node-examples">猫科、犬科、人科</div>
          </div>
          <div class="node-connector"></div>
          <div class="taxonomy-node">
            <div class="node-label">属</div>
            <div class="node-examples">豹属、犬属、人属</div>
          </div>
          <div class="node-connector"></div>
          <div class="taxonomy-node">
            <div class="node-label">种</div>
            <div class="node-examples">狮子、狼、智人</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Subcategories -->
    <section class="popular-subcategories">
      <div class="container">
        <h2>热门子类别</h2>
        <div class="subcategories-grid">
          <div
            v-for="subcategory in popularSubcategories"
            :key="subcategory.id"
            class="subcategory-card"
            @click="navigateToSubcategory(subcategory.id)"
          >
            <img :src="subcategory.image" :alt="subcategory.name" />
            <div class="subcategory-overlay">
              <h3>{{ subcategory.name }}</h3>
              <span>{{ formatNumber(subcategory.speciesCount) }} 种</span>
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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
// State
const searchQuery = ref("");
const selectedDomain = ref("all");
const sortBy = ref("name");
const categories = ref([]);
const popularSubcategories = ref([]);
const goBack = () => {
  console.log("Go back to home");
  router.push({ name: "library" });
  // In a real app, this would navigate back to the home page
};

const goToCategory = () => {
  console.log("Go to category:", species.category);
  // In a real app, this would navigate to the category page
};
// Fetch categories data (in a real app, this would come from an API)
onMounted(() => {
  // Simulate API call
  setTimeout(() => {
    categories.value = [
      {
        id: "mammals",
        name: "哺乳动物",
        scientificClassification: "哺乳纲",
        description:
          "恒温脊椎动物，特征包括体表被毛、雌性具有产奶的乳腺，以及三块听小骨。",
        image: "/placeholder.svg?height=400&width=600",
        speciesCount: 6495,
        domain: "真核生物域",
        subcategories: [
          { id: "primates", name: "灵长类" },
          { id: "carnivores", name: "食肉目" },
          { id: "rodents", name: "啮齿类" },
          { id: "cetaceans", name: "鲸目" },
          { id: "marsupials", name: "有袋类" },
        ],
      },
      {
        id: "birds",
        name: "鸟类",
        scientificClassification: "鸟纲",
        description:
          "恒温脊椎动物，特征包括羽毛、无牙喙状嘴、高代谢率、四腔心脏和轻量化骨骼结构。",
        image: "/placeholder.svg?height=400&width=600",
        speciesCount: 10234,
        domain: "真核生物域",
        subcategories: [
          { id: "passerines", name: "雀形目" },
          { id: "raptors", name: "猛禽类" },
          { id: "waterfowl", name: "水禽类" },
          { id: "flightless", name: "平胸类" },
        ],
      },
      {
        id: "reptiles",
        name: "爬行动物",
        scientificClassification: "爬行纲",
        description:
          "变温脊椎动物，特征包括干燥鳞状皮肤、肺呼吸和在陆地产卵。包含蛇类、蜥蜴、龟鳖类和鳄类等。",
        image: "/placeholder.svg?height=400&width=600",
        speciesCount: 11341,
        domain: "真核生物域",
        subcategories: [
          { id: "snakes", name: "蛇类" },
          { id: "lizards", name: "蜥蜴类" },
          { id: "turtles", name: "龟鳖类" },
          { id: "crocodilians", name: "鳄类" },
        ],
      },
      {
        id: "amphibians",
        name: "两栖动物",
        scientificClassification: "两栖纲",
        description:
          "变温脊椎动物，通常幼体在水中用鳃呼吸，成体发育出肺和四肢适应陆地生活。包含蛙类、蝾螈和蚓螈等。",
        image: "/placeholder.svg?height=400&width=600",
        speciesCount: 8372,
        domain: "真核生物域",
        subcategories: [
          { id: "frogs", name: "蛙类" },
          { id: "salamanders", name: "蝾螈类" },
          { id: "caecilians", name: "蚓螈类" },
        ],
      },
      {
        id: "fish",
        name: "鱼类",
        scientificClassification: "鱼类总纲",
        description:
          "水生脊椎动物，用鳃呼吸并通过鳍运动。包含硬骨鱼、软骨鱼和无颌鱼等。",
        image: "/placeholder.svg?height=400&width=600",
        speciesCount: 34300,
        domain: "真核生物域",
        subcategories: [
          { id: "bony-fish", name: "硬骨鱼" },
          { id: "cartilaginous-fish", name: "鲨鱼与鳐类" },
          { id: "jawless-fish", name: "无颌鱼类" },
          { id: "deep-sea-fish", name: "深海鱼类" },
        ],
      },
      {
        id: "insects",
        name: "昆虫",
        scientificClassification: "昆虫纲",
        description:
          "地球上最多样化的动物类群，特征包括三部分身体结构、六足、复眼和触角。包含甲虫、蝴蝶、蜜蜂等。",
        image: "/placeholder.svg?height=400&width=600",
        speciesCount: 1000000,
        domain: "真核生物域",
        subcategories: [
          { id: "beetles", name: "鞘翅目" },
          { id: "butterflies", name: "鳞翅目" },
          { id: "bees", name: "膜翅目" },
          { id: "flies", name: "双翅目" },
          { id: "grasshoppers", name: "直翅目" },
        ],
      },
      {
        id: "arachnids",
        name: "蛛形纲",
        scientificClassification: "蛛形纲",
        description:
          "具有八足、无触角无翅膀的节肢动物，包含蜘蛛、蝎子、蜱螨等。",
        image: "/placeholder.svg?height=400&width=600",
        speciesCount: 100000,
        domain: "真核生物域",
        subcategories: [
          { id: "spiders", name: "蜘蛛" },
          { id: "scorpions", name: "蝎子" },
          { id: "ticks", name: "蜱螨类" },
        ],
      },
      {
        id: "mollusks",
        name: "软体动物",
        scientificClassification: "软体动物门",
        description:
          "具有柔软身体的無脊椎動物，多数有硬壳。包含螺类、双壳类和头足类等。",
        image: "/placeholder.svg?height=400&width=600",
        speciesCount: 85000,
        domain: "真核生物域",
        subcategories: [
          { id: "gastropods", name: "腹足类" },
          { id: "bivalves", name: "双壳类" },
          { id: "cephalopods", name: "头足类" },
        ],
      },
      {
        id: "flowering-plants",
        name: "被子植物",
        scientificClassification: "被子植物门",
        description:
          "能够开花结果的植物，是陆地植物中最多样化的类群，包含乔木、灌木、草本植物和主要农作物。",
        image: "/placeholder.svg?height=400&width=600",
        speciesCount: 300000,
        domain: "真核生物域",
        subcategories: [
          { id: "trees", name: "乔木" },
          { id: "shrubs", name: "灌木" },
          { id: "grasses", name: "禾草类" },
          { id: "herbs", name: "草本植物" },
          { id: "crops", name: "农作物" },
        ],
      },
      {
        id: "conifers",
        name: "针叶植物",
        scientificClassification: "裸子植物门",
        description: "具有球果的种子植物，包含松树、云杉、冷杉等常绿乔木。",
        image: "/placeholder.svg?height=400&width=600",
        speciesCount: 630,
        domain: "真核生物域",
        subcategories: [
          { id: "pines", name: "松属" },
          { id: "spruces", name: "云杉属" },
          { id: "cedars", name: "雪松属" },
        ],
      },
      {
        id: "fungi",
        name: "真菌",
        scientificClassification: "真菌界",
        description:
          "包含酵母、霉菌和蘑菇的真核生物，在分解和营养循环中起关键作用。",
        image: "/placeholder.svg?height=400&width=600",
        speciesCount: 120000,
        domain: "真核生物域",
        subcategories: [
          { id: "mushrooms", name: "伞菌类" },
          { id: "yeasts", name: "酵母菌" },
          { id: "molds", name: "霉菌" },
          { id: "lichens", name: "地衣" },
        ],
      },
      {
        id: "bacteria",
        name: "细菌",
        scientificClassification: "细菌域",
        description:
          "无细胞核的单细胞微生物，存在于几乎所有环境中，在固氮、分解等生态过程中起关键作用。",
        image: "/placeholder.svg?height=400&width=600",
        speciesCount: 30000,
        domain: "细菌域",
        subcategories: [
          { id: "proteobacteria", name: "变形菌门" },
          { id: "cyanobacteria", name: "蓝菌门" },
          { id: "firmicutes", name: "厚壁菌门" },
          { id: "actinobacteria", name: "放线菌门" },
        ],
      },
    ];

    // Set popular subcategories
    popularSubcategories.value = [
      {
        id: "primates",
        name: "灵长类动物",
        image: "/placeholder.svg?height=300&width=400",
        speciesCount: 521,
      },
      {
        id: "sharks",
        name: "鲨鱼和鳐鱼",
        image: "/placeholder.svg?height=300&width=400",
        speciesCount: 1250,
      },
      {
        id: "butterflies",
        name: "蝴蝶和飞蛾",
        image: "/placeholder.svg?height=300&width=400",
        speciesCount: 180000,
      },
      {
        id: "orchids",
        name: "兰花",
        image: "/placeholder.svg?height=300&width=400",
        speciesCount: 28000,
      },
      {
        id: "mushrooms",
        name: " 蘑菇",
        image: "/placeholder.svg?height=300&width=400",
        speciesCount: 14000,
      },
      {
        id: "corals",
        name: "珊瑚",
        image: "/placeholder.svg?height=300&width=400",
        speciesCount: 2500,
      },
    ];
  }, 500);
});

// Computed properties
const filteredCategories = computed(() => {
  let result = [...categories.value];

  // Filter by domain
  if (selectedDomain.value !== "all") {
    result = result.filter(
      (category) => category.domain === selectedDomain.value
    );
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query) ||
        category.scientificClassification.toLowerCase().includes(query)
    );
  }

  // Sort results
  switch (sortBy.value) {
    case "name":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "nameDesc":
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "speciesCount":
      result.sort((a, b) => b.speciesCount - a.speciesCount);
      break;
    case "speciesCountAsc":
      result.sort((a, b) => a.speciesCount - b.speciesCount);
      break;
  }

  return result;
});

// Methods
const filterCategories = () => {
  // This function is called when filters change
  // The actual filtering is handled by the computed property
};

const clearSearch = () => {
  searchQuery.value = "";
  filterCategories();
};

const clearDomain = () => {
  selectedDomain.value = "all";
  filterCategories();
};

const clearAllFilters = () => {
  searchQuery.value = "";
  selectedDomain.value = "all";
  sortBy.value = "name";
  filterCategories();
};

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M+";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K+";
  }
  return num.toLocaleString();
};

const getDomainClass = (domain) => {
  const domainMap = {
    Bacteria: "domain-bacteria",
    Archaea: "domain-archaea",
    Eukarya: "domain-eukarya",
  };

  return domainMap[domain] || "";
};

const navigateToCategory = (categoryId) => {
  console.log("Navigate to category:", categoryId);
  // In a real app, this would navigate to the category page
};

const navigateToSubcategory = (subcategoryId) => {
  console.log("Navigate to subcategory:", subcategoryId);
  // In a real app, this would navigate to the subcategory page
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

  /* Domain colors */
  --bacteria-color: #e91e63;
  --archaea-color: #9c27b0;
  --eukarya-color: #2196f3;

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

/* Hero Section */
.categories-hero {
  background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.categories-hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: white;
}

.hero-description {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  opacity: 0.9;
}

/* Search Section */
.search-section {
  background-color: var(--background-white);
  padding: 2rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-box {
  display: flex;
  flex: 1;
  max-width: 500px;
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
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-options label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.filter-options select {
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

/* Main Categories */
.main-categories {
  padding: 3rem 0;
}

.no-results {
  text-align: center;
  padding: 3rem 0;
  color: var(--text-secondary);
}

.no-results svg {
  margin-bottom: 1rem;
  color: var(--text-secondary);
}

.no-results h2 {
  margin-bottom: 1rem;
}

.reset-button {
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  margin-top: 1.5rem;
  font-weight: 500;
}

.reset-button:hover {
  background-color: var(--primary-dark);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.category-card {
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.category-image {
  position: relative;
  height: 200px;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.species-count {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
}

.category-content {
  padding: 1.5rem;
}

.category-content h2 {
  margin-bottom: 0.25rem;
  font-size: 1.5rem;
}

.scientific-name {
  font-style: italic;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.category-description {
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.category-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.domain-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
}

.domain-bacteria {
  background-color: rgba(233, 30, 99, 0.1);
  color: var(--bacteria-color);
}

.domain-archaea {
  background-color: rgba(156, 39, 176, 0.1);
  color: var(--archaea-color);
}

.domain-eukarya {
  background-color: rgba(33, 150, 243, 0.1);
  color: var(--eukarya-color);
}

.subcategories-count {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.explore-button {
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 0;
  border-radius: var(--border-radius);
  font-weight: 500;
  text-align: center;
}

.explore-button:hover {
  background-color: var(--primary-dark);
}

/* Taxonomy Overview */
.taxonomy-overview {
  padding: 4rem 0;
  background-color: var(--background-white);
}

.taxonomy-overview h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.taxonomy-overview p {
  max-width: 800px;
  margin: 0 auto 2rem;
  text-align: center;
}

.taxonomy-tree {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.taxonomy-node {
  background-color: var(--background-light);
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius);
  width: 100%;
  text-align: center;
}

.node-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--primary-dark);
}

.node-examples {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.node-connector {
  width: 2px;
  height: 2rem;
  background-color: var(--primary-color);
}

/* Popular Subcategories */
.popular-subcategories {
  padding: 4rem 0;
}

.popular-subcategories h2 {
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
  .search-container {
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
}

@media (max-width: 768px) {
  .categories-hero h1 {
    font-size: 2rem;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .filter-options {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-options select {
    width: 100%;
  }

  .subcategories-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 480px) {
  .main-header .container {
    flex-direction: column;
    gap: 1rem;
  }

  .main-nav {
    width: 100%;
    justify-content: space-between;
  }

  .categories-hero {
    padding: 3rem 0;
  }

  .active-filters {
    flex-direction: column;
    align-items: flex-start;
  }

  .subcategories-grid {
    grid-template-columns: 1fr;
  }
}
</style>