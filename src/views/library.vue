<template>
  <div class="app-container">
    <!-- Navigation Header -->
    <header class="main-header">
      <div class="logo">
        <a href="/">
          <img style="width:180px;" src="../assets/logo.png" alt="">
        </a>
      </div>
      <nav class="main-nav">
        <a href="/" class="nav-link ">首页</a>
          <a href="/library" class="nav-link active">百科</a>
          <a href="/public" class="nav-link">发现</a>
          <a href="/chat" class="nav-link">助手</a>
      </nav>
    </header>

    <!-- Hero Section with Search -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>探索地球的生物多样性</h1>
        <p class="hero-subtitle">
          探索令人着迷的物种世界，从微生物到壮丽的生物
        </p>

        <div class="search-container">
          <input
            type="search"
            v-model="searchQuery"
            placeholder="搜索物种，栖息地或类别..."
            class="search-input"
          />
          <button class="search-button">搜索</button>
        </div>

        <div class="quick-links">
          <a href="#" class="quick-link">濒危物种</a>
          <a href="#" class="quick-link">海洋生物</a>
          <a href="#" class="quick-link">雨林</a>
          <a href="#" class="quick-link">沙漠</a>
        </div>
      </div>
    </section>

    <!-- Featured Highlight -->
    <section class="featured-highlight">
      <div class="highlight-content">
        <div class="highlight-text">
          <span class="highlight-label">精选</span>
          <h2>大熊猫</h2>
          <p class="highlight-scientific">大熊猫</p>
          <p class="highlight-description">
            大熊猫是中国特有的熊类，以其独特的黑白皮毛而闻名。作为保护工作的成功典范，大熊猫在全球濒临灭绝的物种名单上已从“濒危”降低到“易危”。
          </p>
          <button class="highlight-button">了解更多</button>
        </div>
        <div class="highlight-image">
          <img src="../assets/pandafinger.png" alt="Giant Panda" />
        </div>
      </div>
    </section>

    <!-- Main Categories -->
    <section class="main-categories">
      <div class="section-header">
        <h2>按类别浏览</h2>
        <a href="/categories" class="view-all">查看所有类别</a>
      </div>

      <div class="category-grid">
        <div
          class="category-card"
          v-for="category in mainCategories"
          :key="category.id"
        >
          <div
            class="category-icon"
            :style="{ backgroundColor: category.color }"
          >
            <component :is="category.icon" />
          </div>
          <h3>{{ category.name }}</h3>
          <p>{{ category.description }}</p>
          <span class="species-count">{{ category.count }} 种</span>
        </div>
      </div>
    </section>

    <!-- Featured Species -->
    <section class="featured-species">
      <div class="section-header">
        <h2>特色物种</h2>
        <a href="#" class="view-all">查看更多</a>
      </div>

      <div class="species-grid">
        <article
          class="species-card"
          v-for="species in featuredSpecies"
          :key="species.id"
          @click="navigateToSpeciesDetail(species.id)"
        >
          <div class="species-image">
            <img :src="species.image" :alt="species.name" />
            <div class="species-badge" v-if="species.status">
              {{ species.status }}
            </div>
          </div>
          <div class="species-info">
            <h3>{{ species.name }}</h3>
            <p class="scientific-name">{{ species.scientificName }}</p>
            <p class="species-description">{{ species.shortDescription }}</p>
            <div class="species-tags">
              <span
                class="species-tag"
                v-for="(tag, index) in species.tags"
                :key="index"
                >{{ tag }}</span
              >
            </div>
            <button class="species-button">查看详细信息</button>
          </div>
        </article>
      </div>
    </section>

    <!-- Conservation Spotlight -->
    <section class="conservation-spotlight">
      <div class="spotlight-header">
        <h2>保护焦点</h2>
      </div>
      <div class="spotlight-content">
        <div class="spotlight-image">
          <img
            src="../assets/3.png?height=300&width=400"
            alt="Conservation Efforts"
          />
        </div>
        <div class="spotlight-text">
          <h3>保护生物多样性</h3>
          <p>
            生物多样性对于维护地球的健康至关重要。世界各地的保护工作都在努力保护濒危物种及其栖息地免受气候变化、栖息地丧失和污染等威胁。
          </p>
          <div class="conservation-stats">
            <div class="stat-item">
              <span class="stat-number">41,415</span>
              <span class="stat-label">IUCN 红色名录中的物种</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">16,306</span>
              <span class="stat-label">濒危物种</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">7,815</span>
              <span class="stat-label">极度濒危</span>
            </div>
          </div>
          <button class="spotlight-button">了解保护</button>
        </div>
      </div>
    </section>

    <!-- Recent Discoveries -->
    <section class="recent-discoveries">
      <div class="section-header">
        <h2>最新发现</h2>
        <a href="#" class="view-all">查看全部</a>
      </div>

      <div class="discoveries-grid">
        <div
          class="discovery-card"
          v-for="discovery in recentDiscoveries"
          :key="discovery.id"
           @click="navigateToRecentDiscoveries(discovery.id)"
        >
          <div class="discovery-image">
            <img :src="discovery.image" :alt="discovery.title" />
          </div>
          <div class="discovery-info">
            <span class="discovery-date">{{ discovery.date }}</span>
            <h3>{{ discovery.title }}</h3>
            <p>{{ discovery.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Browse by Habitat -->
    <section class="habitat-section">
      <div class="section-header">
        <h2>按栖息地浏览</h2>
      </div>

      <div class="habitat-grid">
        <div class="habitat-card" v-for="habitat in habitats" :key="habitat.id">
          <img :src="habitat.image" :alt="habitat.name" />
          <div class="habitat-overlay">
            <h3>{{ habitat.name }}</h3>
            <p>{{ habitat.speciesCount }} 种</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <!-- <section class="newsletter-section">
      <div class="newsletter-content">
        <h2>保持更新</h2>
        <p>
          Subscribe to our newsletter for the latest discoveries and
          conservation news
        </p>
        <div class="newsletter-form">
          <input
            type="email"
            placeholder="Your email address"
            class="newsletter-input"
          />
          <button class="newsletter-button">Subscribe</button>
        </div>
      </div>
    </section> -->

    <!-- Footer -->
    <footer class="main-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>生息云纪</h3>
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
    </footer>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
import {
  Leaf,
  Fish,
  Cat,
  Bird,
  Bug,
  Flower,
  Mountain,
  Droplets,
} from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToSpeciesDetail = (id) => {
  router.push({ name: "SpeciesDetail", params: { id } });
};

const navigateToRecentDiscoveries = (id) => {
  router.push({ name: "RecentDiscoveries", params: { id } });
};
const searchQuery = ref("");

const mainCategories = [
  {
    id: 1,
    name: "哺乳动物",
    icon: Cat,
    color: "#e3f2fd",
    description: "温血脊椎动物，其特征是具有毛发、乳腺和新皮质",
    count: 6400,
  },
  {
    id: 2,
    name: "鸟类",
    icon: Bird,
    color: "#fff8e1",
    description:
      "温血脊椎动物，其特征是长有羽毛、无牙的喙状颌骨和坚固轻便的骨骼。",
    count: 10800,
  },
  {
    id: 3,
    name: "海洋生物",
    icon: Fish,
    color: "#e0f7fa",
    description: "生活在海洋和其他咸水环境中的生物",
    count: 28000,
  },
  {
    id: 4,
    name: "植物",
    icon: Leaf,
    color: "#e8f5e9",
    description: "利用光合作用制造自己食物的多细胞生物。",
    count: 390000,
  },
  {
    id: 5,
    name: "昆虫",
    icon: Bug,
    color: "#fff3e0",
    description: "具有外骨骼、三部分身体和六条关节足的无脊椎动物。",
    count: 1000000,
  },
  {
    id: 6,
    name: "真菌",
    icon: Flower,
    color: "#f3e5f5",
    description: "真核生物包括酵母和霉菌等微生物以及蘑菇。",
    count: 120000,
  },
];

const featuredSpecies = [
  {
    id: 1,
    name: "蓝鲸",
    scientificName: "鲸鳖",
    image: "src/assets/whale.png?height=300&width=400",
    shortDescription: "迄今为止已知存在的最大动物，最大确认长度达29.9米。",
    status: "濒危",
    tags: ["海洋", "哺乳动物", "食肉动物"],
  },
  {
    id: 2,
    name: "巨型红杉",
    scientificName: "巨型红杉",
    image: "src/assets/jxhs.png?height=300&width=400",
    shortDescription:
      "这些巨树是地球上最大的树木，寿命可达 3,000 年甚至更长时间。",
    status: "易受伤害的",
    tags: ["植物", "树木"],
  },
  {
    id: 3,
    name: "帝王蝶",
    scientificName: "斑蝶",
    image: "src/assets/dwd.png?height=300&width=400",
    shortDescription: "因其每年横跨北美、跨越多代人的壮观迁徙而闻名。",
    status: "易受伤害的",
    tags: ["昆虫", "迁徙", "传粉者"],
  },
];

const recentDiscoveries = [
  {
    id: 1,
    title: "秘鲁雨林发现新兰花物种",
    date: "2024年6月15日",
    description: "科学家在秘鲁亚马逊偏远地区发现了一种以前未知的兰花物种。",
    image: "src/assets/lh.png?height=300&width=400",
  },
  {
    id: 2,
    title: "深海探险发现生物发光鱼",
    date: "2024年5月28日",
    description:
      "海洋生物学家已经记录了几种生活在 3,000 米深水下的新种类发光鱼。",
    image: "src/assets/fgy.png?height=300&width=400",
  },
];

const habitats = [
  {
    id: 1,
    name: "热带雨林",
    speciesCount: "10+ million",
    image: "src/assets/where/rdyl.png?height=300&width=400",
  },
  {
    id: 2,
    name: "温带森林",
    speciesCount: "1+ million",
    image: "src/assets/where/wdsl.png?height=300&width=400",
  },
  {
    id: 3,
    name: "草原",
    speciesCount: "1,200+",
    image: "src/assets/where/cy.png?height=300&width=400",
  },
  {
    id: 4,
    name: "沙漠",
    speciesCount: "1,700+",
    image: "src/assets/where/sm.png?height=300&width=400",
  },
  {
    id: 5,
    name: "苔原",
    speciesCount: "1,700+",
    image: "src/assets/where/ty.png?height=300&width=400",
  },
  {
    id: 6,
    name: "海洋生态系统",
    speciesCount: "1,700+",
    image: "src/assets/where/hy.png?height=300&width=400",
  },
  {
    id: 7,
    name: "淡水生态系统",
    speciesCount: "1,700+",
    image: "src/assets/where/ds.png?height=300&width=400",
  },
  {
    id: 8,
    name: "极地生态系统",
    speciesCount: "1,700+",
    image: "src/assets/where/jd.png?height=300&width=400",
  },
];
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
  --danger-color: #d32f2f;
  --success-color: #388e3c;
  --border-color: #e0e0e0;
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

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 600;
  line-height: 1.3;
}

a {
  text-decoration: none;
  color: var(--secondary-color);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

button {
  cursor: pointer;
  font-family: inherit;
}

.app-container {
  max-width: 100%;
  margin: 0 auto;
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
  transition: var(--transition);
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary-color);
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
.hero-section {
  background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
  color: white;
  padding: 5rem 5%;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-section h1 {
  font-size: 3rem;
  color: #fff;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.search-container {
  display: flex;
  max-width: 600px;
  margin: 0 auto 1.5rem;
}

.search-input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  color: #000;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  font-size: 1rem;
}

.search-button {
  background-color: var(--accent-color);
  color: var(--text-primary);
  font-weight: 600;
  padding: 0 1.5rem;
  border: none;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  transition: var(--transition);
}

.search-button:hover {
  background-color: #ffb300;
}

.quick-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.quick-link {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  transition: var(--transition);
}

.quick-link:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

/* Featured Highlight */
.featured-highlight {
  padding: 3rem 5%;
  background-color: var(--background-white);
}

.highlight-content {
  display: flex;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.highlight-text {
  flex: 1;
}

.highlight-label {
  display: inline-block;
  background-color: var(--primary-light);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.highlight-text h2 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary-dark);
}

.highlight-scientific {
  font-style: italic;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.highlight-description {
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.highlight-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: var(--transition);
}

.highlight-button:hover {
  background-color: var(--primary-dark);
}

.highlight-image {
  flex: 1;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.highlight-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

/* Section Headers */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.8rem;
  color: var(--primary-dark);
}

.view-all {
  color: var(--secondary-color);
  font-weight: 500;
  transition: var(--transition);
}

.view-all:hover {
  text-decoration: underline;
}

/* Main Categories */
.main-categories {
  padding: 3rem 5%;
  background-color: var(--background-light);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.category-card {
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.category-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.category-icon svg {
  width: 30px;
  height: 30px;
  color: var(--primary-color);
}

.category-card h3 {
  margin-bottom: 0.5rem;
  color: var(--primary-dark);
}

.category-card p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.species-count {
  display: inline-block;
  background-color: var(--background-light);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

/* Featured Species */
.featured-species {
  padding: 3rem 5%;
  background-color: var(--background-white);
}

.species-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.species-card {
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  background-color: var(--background-white);
}

.species-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.species-image {
  position: relative;
  height: 200px;
}

.species-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.species-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: var(--danger-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
}

.species-info {
  padding: 1.5rem;
}

.species-info h3 {
  margin-bottom: 0.25rem;
  color: var(--primary-dark);
}

.scientific-name {
  font-style: italic;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.species-description {
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.species-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.species-tag {
  background-color: var(--background-light);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.species-button {
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: var(--transition);
}

.species-button:hover {
  background-color: var(--primary-color);
  color: white;
}

/* Conservation Spotlight */
.conservation-spotlight {
  padding: 3rem 5%;
  background-color: var(--background-light);
}

.spotlight-header {
  text-align: center;
  margin-bottom: 2rem;
}

.spotlight-header h2 {
  font-size: 2rem;
  color: var(--primary-dark);
}

.spotlight-content {
  display: flex;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
}

.spotlight-image {
  flex: 1;
}

.spotlight-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spotlight-text {
  flex: 1;
  padding: 2rem;
}

.spotlight-text h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--primary-dark);
}

.spotlight-text p {
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.conservation-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.spotlight-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: var(--transition);
}

.spotlight-button:hover {
  background-color: var(--primary-dark);
}

/* Recent Discoveries */
.recent-discoveries {
  padding: 3rem 5%;
  background-color: var(--background-white);
}

.discoveries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.discovery-card {
  display: flex;
  background-color: var(--background-light);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
}

.discovery-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.discovery-image {
  width: 150px;
  min-width: 150px;
}

.discovery-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.discovery-info {
  padding: 1.5rem;
}

.discovery-date {
  display: block;
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.discovery-info h3 {
  margin-bottom: 0.5rem;
  color: var(--primary-dark);
}

.discovery-info p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Habitat Section */
.habitat-section {
  padding: 3rem 5%;
  background-color: var(--background-light);
}

.habitat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.habitat-card {
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  height: 200px;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
}

.habitat-card:hover {
  transform: scale(1.03);
}

.habitat-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.habitat-card:hover img {
  transform: scale(1.1);
}

.habitat-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  transition: var(--transition);
}

.habitat-card:hover .habitat-overlay {
  padding-bottom: 2rem;
}

.habitat-overlay h3 {
  margin-bottom: 0.25rem;
  font-size: 1.2rem;
}

.habitat-overlay p {
  font-size: 0.9rem;
  opacity: 0.9;
}

/* Newsletter Section */
.newsletter-section {
  padding: 4rem 5%;
  background-color: var(--primary-dark);
  color: white;
  text-align: center;
}

.newsletter-content {
  max-width: 600px;
  margin: 0 auto;
}

.newsletter-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.newsletter-content p {
  margin-bottom: 2rem;
  opacity: 0.9;
}

.newsletter-form {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
}

.newsletter-input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  font-size: 1rem;
}

.newsletter-button {
  background-color: var(--accent-color);
  color: var(--text-primary);
  font-weight: 600;
  padding: 0 1.5rem;
  border: none;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  transition: var(--transition);
}

.newsletter-button:hover {
  background-color: #ffb300;
}

/* Footer */
.main-footer {
  background-color: #1b5e20;
  color: white;
  padding: 3rem 5% 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 2rem;
}

.footer-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.footer-section h4 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
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
  .highlight-content,
  .spotlight-content {
    flex-direction: column;
  }

  .spotlight-image {
    order: -1;
  }

  .conservation-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .stat-item {
    text-align: left;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .stat-number {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }

  .search-container {
    flex-direction: column;
  }

  .search-input,
  .search-button {
    width: 100%;
    border-radius: var(--border-radius);
  }

  .search-button {
    margin-top: 0.5rem;
    padding: 0.75rem;
  }

  .discoveries-grid {
    grid-template-columns: 1fr;
  }

  .discovery-card {
    flex-direction: column;
  }

  .discovery-image {
    width: 100%;
    height: 150px;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-input,
  .newsletter-button {
    width: 100%;
    border-radius: var(--border-radius);
  }

  .newsletter-button {
    margin-top: 0.5rem;
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .main-header {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .main-nav {
    width: 100%;
    justify-content: space-between;
  }

  .hero-section {
    padding: 3rem 1rem;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .quick-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .category-grid,
  .species-grid,
  .habitat-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>