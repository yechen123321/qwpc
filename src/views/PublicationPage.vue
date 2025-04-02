<template>
    <div class="publications-page">
      <!-- Navigation Header -->
      <header class="main-header">
        <div class="container header-container">
          <div class="logo">
            <a href="/">
              <img style="width: 180px" src="../assets/logo.png" alt="生息云纪" />
            </a>
          </div>
          <nav class="main-nav">
            <a href="/" class="nav-link">首页</a>
            <a href="/library" class="nav-link">百科</a>
            <a href="/public" class="nav-link active">出版物</a>
            <a href="/chat" class="nav-link">助手</a>
          </nav>
        </div>
      </header>
  
      <!-- Hero Section -->
      <section class="publications-hero">
        <div class="container">
          <h1>探索出版物</h1>
          <p class="hero-description">
            发现最新的生物学研究、环境保护报告和科学出版物。深入了解我们星球上丰富多样的生命形式和保护它们的方法。
          </p>
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
                placeholder="搜索出版物..." 
                @input="handleSearch"
              />
              <button class="search-button" @click="handleSearch">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
            
            <div class="filter-options">
              <div class="filter-group">
                <label>分类:</label>
                <select v-model="categoryFilter" @change="applyFilters">
                  <option value="all">全部</option>
                  <option value="research">研究论文</option>
                  <option value="report">调查报告</option>
                  <option value="article">科普文章</option>
                  <option value="book">图书摘录</option>
                </select>
              </div>
              
              <div class="filter-group">
                <label>排序:</label>
                <select v-model="sortBy" @change="applyFilters">
                  <option value="date-desc">最新发布</option>
                  <option value="date-asc">最早发布</option>
                  <option value="title-asc">标题 (A-Z)</option>
                  <option value="title-desc">标题 (Z-A)</option>
                  <option value="popularity">热门程度</option>
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
              <span class="filter-tag" v-if="categoryFilter !== 'all'">
                分类: {{ getCategoryName(categoryFilter) }}
                <button @click="clearCategoryFilter">×</button>
              </span>
            </div>
            <button class="clear-all" @click="clearAllFilters">清除全部</button>
          </div>
        </div>
      </section>
  
      <!-- Featured Publications Carousel -->
      <section class="featured-publications" v-if="!searchQuery && categoryFilter === 'all' && currentPage === 1">
        <div class="container">
          <h2>精选出版物</h2>
          <div class="featured-carousel">
            <button class="carousel-nav prev" @click="prevFeatured" :disabled="featuredIndex === 0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <div class="carousel-container">
              <div 
                class="carousel-track"
                :style="{ transform: `translateX(-${featuredIndex * 100}%)` }"
              >
                <div 
                  v-for="publication in featuredPublications" 
                  :key="publication.id"
                  class="featured-card"
                  @click="navigateToPublication(publication.id)"
                >
                  <div class="featured-image">
                    <img :src="publication.coverImage" :alt="publication.title">
                    <div class="featured-badge">精选</div>
                    <div class="featured-category">{{ getCategoryName(publication.category) }}</div>
                  </div>
                  <div class="featured-content">
                    <h3>{{ publication.title }}</h3>
                    <p class="featured-author">{{ publication.author }}</p>
                    <p class="featured-date">{{ formatDate(publication.publishDate) }}</p>
                    <p class="featured-summary">{{ publication.summary }}</p>
                    <button class="read-more-button">阅读更多</button>
                  </div>
                </div>
              </div>
            </div>
            
            <button class="carousel-nav next" @click="nextFeatured" :disabled="featuredIndex >= featuredPublications.length - 1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          
          <div class="carousel-indicators">
            <button 
              v-for="(_, index) in featuredPublications" 
              :key="index"
              :class="['indicator', index === featuredIndex ? 'active' : '']"
              @click="featuredIndex = index"
            ></button>
          </div>
        </div>
      </section>
  
      <!-- Publications Grid -->
      <section class="publications-section">
        <div class="container">
          <div class="section-header">
            <h2>{{ sectionTitle }}</h2>
            <p>{{ filteredPublications.length }} 个出版物</p>
          </div>
          
          <div v-if="loading" class="loading-container">
            <div class="loading-spinner"></div>
            <p>加载出版物...</p>
          </div>
          
          <div v-else-if="filteredPublications.length === 0" class="no-results">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <h3>未找到出版物</h3>
            <p>尝试调整您的搜索或筛选条件</p>
            <button class="reset-button" @click="clearAllFilters">重置筛选条件</button>
          </div>
          
          <div v-else class="publications-grid">
            <div 
              v-for="publication in paginatedPublications" 
              :key="publication.id"
              class="publication-card"
              @click="navigateToPublication(publication.id)"
            >
              <div class="publication-image">
                <img 
                  :src="publication.coverImage" 
                  :alt="publication.title"
                  loading="lazy"
                >
                <div class="publication-category">{{ getCategoryName(publication.category) }}</div>
              </div>
              <div class="publication-content">
                <h3>{{ publication.title }}</h3>
                <div class="publication-meta">
                  <span class="publication-author">{{ publication.author }}</span>
                  <span class="publication-date">{{ formatDate(publication.publishDate) }}</span>
                </div>
                <p class="publication-summary">{{ publication.summary }}</p>
                <div class="publication-tags">
                  <span 
                    v-for="(tag, index) in publication.tags.slice(0, 3)" 
                    :key="index" 
                    class="publication-tag"
                  >
                    {{ tag }}
                  </span>
                  <span class="publication-tag more" v-if="publication.tags.length > 3">+{{ publication.tags.length - 3 }}</span>
                </div>
                <div class="publication-stats">
                  <div class="stat-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span>{{ publication.views }}</span>
                  </div>
                  <div class="stat-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>{{ publication.likes }}</span>
                  </div>
                  <div class="stat-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span>{{ publication.comments }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Pagination -->
          <div class="pagination-container" v-if="totalPages > 1">
            <div class="pagination">
              <button 
                class="pagination-button prev" 
                :disabled="currentPage === 1"
                @click="changePage(currentPage - 1)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Categories Section -->
      <section class="categories-section">
        <div class="container">
          <h2>出版物分类</h2>
          <div class="categories-grid">
            <div 
              v-for="category in categories" 
              :key="category.id"
              class="category-card"
              @click="selectCategory(category.id)"
            >
              <div class="category-icon">
                <component :is="category.icon" />
              </div>
              <h3>{{ category.name }}</h3>
              <p>{{ category.description }}</p>
              <span class="category-count">{{ category.count }} 个出版物</span>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Popular Tags Section -->
      <section class="tags-section">
        <div class="container">
          <h2>热门标签</h2>
          <div class="tags-cloud">
            <a 
              v-for="tag in popularTags" 
              :key="tag.id"
              href="#" 
              @click.prevent="searchByTag(tag.name)"
              :style="{ fontSize: `${tag.size}rem` }"
              class="tag-cloud-item"
            >
              {{ tag.name }}
            </a>
          </div>
        </div>
      </section>
  
      <!-- Newsletter Section -->
      <section class="newsletter-section">
        <div class="container">
          <div class="newsletter-container">
            <div class="newsletter-content">
              <h2>订阅我们的通讯</h2>
              <p>获取最新的出版物、研究发现和保护新闻，直接发送到您的收件箱。</p>
            </div>
            <div class="newsletter-form">
              <input type="email" placeholder="您的电子邮箱地址" v-model="emailInput">
              <button class="subscribe-button" @click="subscribeNewsletter">订阅</button>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Footer -->
      <footer class="main-footer">
        <div class="container">
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
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch, nextTick } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // State
  const loading = ref(false);
  const searchQuery = ref('');
  const categoryFilter = ref('all');
  const sortBy = ref('date-desc');
  const currentPage = ref(1);
  const itemsPerPage = ref(9);
  const emailInput = ref('');
  const featuredIndex = ref(0);
  
  // Mock data for publications
  const allPublications = ref([]);
  const featuredPublications = ref([]);
  
  // Popular tags for tag cloud
  const popularTags = ref([
    { id: 1, name: '生物多样性', size: 1.6 },
    { id: 2, name: '亚马逊', size: 1.4 },
    { id: 3, name: '保护', size: 1.5 },
    { id: 4, name: '热带雨林', size: 1.3 },
    { id: 5, name: '气候变化', size: 1.4 },
    { id: 6, name: '濒危物种', size: 1.2 },
    { id: 7, name: '生态系统', size: 1.3 },
    { id: 8, name: '可持续发展', size: 1.1 },
    { id: 9, name: '物种调查', size: 1.0 },
    { id: 10, name: '栖息地', size: 1.2 },
    { id: 11, name: '森林砍伐', size: 1.1 },
    { id: 12, name: '保护区', size: 1.0 }
  ]);
  
  // Categories with icons as components
  const categories = ref([
    {
      id: 'research',
      name: '研究论文',
      description: '最新的科学研究和发现',
      count: 42,
      icon: {
        render() {
          return h('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            width: '32',
            height: '32',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
          }, [
            h('path', { d: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' }),
            h('path', { d: 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' })
          ]);
        }
      }
    },
    {
      id: 'report',
      name: '调查报告',
      description: '环境和生物多样性调查报告',
      count: 28,
      icon: {
        render() {
          return h('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            width: '32',
            height: '32',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
          }, [
            h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
            h('polyline', { points: '14 2 14 8 20 8' }),
            h('line', { x1: '16', y1: '13', x2: '8', y2: '13' }),
            h('line', { x1: '16', y1: '17', x2: '8', y2: '17' }),
            h('polyline', { points: '10 9 9 9 8 9' })
          ]);
        }
      }
    },
    {
      id: 'article',
      name: '科普文章',
      description: '通俗易懂的科学知识普及',
      count: 56,
      icon: {
        render() {
          return h('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            width: '32',
            height: '32',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
          }, [
            h('path', { d: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20' }),
            h('path', { d: 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' })
          ]);
        }
      }
    },
    {
      id: 'book',
      name: '图书摘录',
      description: '精选生物学和环保图书章节',
      count: 19,
      icon: {
        render() {
          return h('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            width: '32',
            height: '32',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
          }, [
            h('path', { d: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20' }),
            h('path', { d: 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' })
          ]);
        }
      }
    }
  ]);
  
  // Computed properties
  const hasActiveFilters = computed(() => {
    return searchQuery.value !== '' || categoryFilter.value !== 'all';
  });
  
  const filteredPublications = computed(() => {
    let result = [...allPublications.value];
    
    // Apply search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(pub => 
        pub.title.toLowerCase().includes(query) || 
        pub.author.toLowerCase().includes(query) ||
        pub.summary.toLowerCase().includes(query) ||
        pub.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply category filter
    if (categoryFilter.value !== 'all') {
      result = result.filter(pub => pub.category === categoryFilter.value);
    }
    
    // Apply sorting
    switch (sortBy.value) {
      case 'date-desc':
        result.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
        break;
      case 'title-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'popularity':
        result.sort((a, b) => b.views - a.views);
        break;
    }
    
    return result;
  });
  
  const paginatedPublications = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;
    return filteredPublications.value.slice(startIndex, endIndex);
  });
  
  const totalPages = computed(() => {
    return Math.ceil(filteredPublications.value.length / itemsPerPage.value);
  });
  
  const displayedPages = computed(() => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages.value <= maxPagesToShow) {
      // If we have fewer pages than the max to show, display all pages
      for (let i = 1; i <= totalPages.value; i++) {
        pages.push(i);
      }
    } else {
      // Always include the first page
      pages.push(1);
      
      // Calculate the range of pages to show around the current page
      let startPage = Math.max(2, currentPage.value - 1);
      let endPage = Math.min(totalPages.value - 1, currentPage.value + 1);
      
      // Adjust if we're near the beginning
      if (currentPage.value <= 3) {
        endPage = Math.min(totalPages.value - 1, 4);
      }
      
      // Adjust if we're near the end
      if (currentPage.value >= totalPages.value - 2) {
        startPage = Math.max(2, totalPages.value - 3);
      }
      
      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push('...');
      }
      
      // Add the range of pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (endPage < totalPages.value - 1) {
        pages.push('...');
      }
      
      // Always include the last page
      pages.push(totalPages.value);
    }
    
    return pages;
  });
  
  const sectionTitle = computed(() => {
    if (searchQuery.value) {
      return `搜索结果: "${searchQuery.value}"`;
    } else if (categoryFilter.value !== 'all') {
      return getCategoryName(categoryFilter.value);
    } else {
      return '所有出版物';
    }
  });
  
  // Methods
  const fetchPublicationsData = async () => {
    loading.value = true;
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a short delay and return mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate mock publications data
      const mockPublications = [
        {
          id: 'pub-001',
          title: '亚马逊雨林生物多样性调查报告',
          author: '李明博士',
          publishDate: '2023-11-15',
          category: 'report',
          summary: '本报告详细记录了2023年亚马逊雨林生物多样性调查的结果，包括新发现的物种和濒危物种的最新状况。',
          tags: ['亚马逊', '生物多样性', '热带雨林', '保护'],
          coverImage: '/src/assets/public/yms.png?height=700&width=700',
          views: 3245,
          likes: 287,
          comments: 42,
          featured: true
        },
        {
          id: 'pub-002',
          title: '气候变化对海洋生态系统的影响',
          author: '张海教授',
          publishDate: '2023-10-28',
          category: 'research',
          summary: '这项研究探讨了全球气候变化如何影响海洋生态系统，特别关注珊瑚礁和海洋哺乳动物的生存状况。',
          tags: ['气候变化', '海洋生态', '珊瑚礁', '全球变暖'],
          coverImage: '/src/assets/public/qhbh.png?height=500&width=700',
          views: 2876,
          likes: 342,
          comments: 56,
          featured: true
        },
        {
          id: 'pub-003',
          title: '微生物世界：土壤中的隐形守护者',
          author: '王芳研究员',
          publishDate: '2023-09-12',
          category: 'article',
          summary: '这篇科普文章介绍了土壤微生物的重要性，它们如何支持植物生长，维持生态系统健康，以及在环境修复中的应用。',
          tags: ['微生物', '土壤生态', '环境修复', '科普'],
          coverImage: '/src/assets/public/wsw.png?height=500&width=700',
          views: 4532,
          likes: 521,
          comments: 78,
          featured: false
        },
        {
          id: 'pub-004',
          title: '《生物多样性与人类未来》第三章：森林生态系统',
          author: '刘伟教授',
          publishDate: '2023-08-05',
          category: 'book',
          summary: '这是《生物多样性与人类未来》一书的第三章摘录，详细讨论了森林生态系统的结构、功能及其对人类社会的重要性。',
          tags: ['森林', '生态系统', '生物多样性', '可持续发展'],
          coverImage: '/src/assets/public/slstxt.png?height=500&width=700',
          views: 1876,
          likes: 203,
          comments: 31,
          featured: false
        },
        {
          id: 'pub-005',
          title: '青藏高原植物适应极端环境的分子机制',
          author: '赵雪博士',
          publishDate: '2023-07-20',
          category: 'research',
          summary: '本研究揭示了青藏高原植物如何在极端高海拔环境中生存的分子适应机制，为理解植物进化和气候变化适应提供了新见解。',
          tags: ['青藏高原', '植物适应', '分子生物学', '极端环境'],
          coverImage: '/src/assets/public/qzgy.png?height=500&width=700',
          views: 2134,
          likes: 178,
          comments: 25,
          featured: false
        },
        {
          id: 'pub-006',
          title: '全球两栖动物减少趋势分析',
          author: '陈明教授',
          publishDate: '2023-06-18',
          category: 'report',
          summary: '这份报告分析了过去30年全球两栖动物数量减少的趋势，探讨了栖息地丧失、气候变化和疾病等主要威胁因素。',
          tags: ['两栖动物', '物种减少', '保护生物学', '全球趋势'],
          coverImage: '/src/assets/public/lqdw.png?height=500&width=700',
          views: 3021,
          likes: 267,
          comments: 39,
          featured: false
        },
        {
          id: 'pub-007',
          title: '昆虫：地球上最成功的生命形式',
          author: '林小红研究员',
          publishDate: '2023-05-10',
          category: 'article',
          summary: '这篇科普文章探讨了昆虫作为地球上最成功的生命形式，它们的多样性、适应性以及对生态系统和人类社会的重要贡献。',
          tags: ['昆虫', '生物多样性', '生态系统', '科普'],
          coverImage: '/src/assets/public/kc.png?height=500&width=700',
          views: 5678,
          likes: 432,
          comments: 67,
          featured: false
        },
        {
          id: 'pub-008',
          title: '《海洋奇迹》第五章：深海生物的奇特适应',
          author: '黄海教授',
          publishDate: '2023-04-22',
          category: 'book',
          summary: '这是《海洋奇迹》一书的第五章摘录，介绍了深海生物如何适应高压、低温和黑暗环境的奇特进化适应机制。',
          tags: ['深海生物', '进化适应', '海洋生态', '极端环境'],
          coverImage: '/src/assets/public/sh.png?height=500&width=700',
          views: 2345,
          likes: 198,
          comments: 29,
          featured: false
        },
        {
          id: 'pub-009',
          title: '城市生物多样性保护策略研究',
          author: '郑光明博士',
          publishDate: '2023-03-15',
          category: 'research',
          summary: '本研究探讨了在城市化进程中保护和促进生物多样性的有效策略，包括城市绿地规划、生态廊道建设和公民科学参与。',
          tags: ['城市生态', '生物多样性', '保护策略', '可持续城市'],
          coverImage: '/src/assets/public/cssw.png?height=500&width=700',
          views: 1987,
          likes: 156,
          comments: 23,
          featured: false
        },
        {
          id: 'pub-010',
          title: '蜜蜂减少与全球粮食安全',
          author: '孙丽研究员',
          publishDate: '2023-02-28',
          category: 'report',
          summary: '这份报告分析了全球蜜蜂数量减少的趋势及其对粮食安全的潜在影响，强调了保护授粉者对维持农业生产的重要性。',
          tags: ['蜜蜂', '授粉', '粮食安全', '农业生态'],
          coverImage: '/src/assets/public/mf.png?height=500&width=700',
          views: 4123,
          likes: 387,
          comments: 59,
          featured: true
        },
        {
          id: 'pub-011',
          title: '基因编辑技术在濒危物种保护中的应用与伦理',
          author: '张伟教授',
          publishDate: '2023-01-20',
          category: 'research',
          summary: '这项研究讨论了基因编辑技术如何应用于濒危物种保护，以及相关的伦理考量和潜在风险。',
          tags: ['基因编辑', '濒危物种', '保护生物学', '生物伦理'],
          coverImage: '/src/assets/public/jybjjs.png?height=500&width=700',
          views: 2765,
          likes: 231,
          comments: 47,
          featured: false
        },
        {
          id: 'pub-012',
          title: '植物如何交流：地下菌根网络的秘密',
          author: '李芳研究员',
          publishDate: '2022-12-15',
          category: 'article',
          summary: '这篇科普文章揭示了植物通过地下菌根网络进行交流和资源共享的惊人能力，改变了我们对植物社会性的理解。',
          tags: ['植物通讯', '菌根网络', '生态互动', '森林生态'],
          coverImage: '/src/assets/public/zwjl.png?height=500&width=700',
          views: 3876,
          likes: 342,
          comments: 51,
          featured: false
        },
        {
          id: 'pub-013',
          title: '《生物进化的故事》第二章：达尔文的革命',
          author: '王明教授',
          publishDate: '2022-11-10',
          category: 'book',
          summary: '这是《生物进化的故事》一书的第二章摘录，详细介绍了达尔文的进化论如何彻底改变了我们对生命起源和发展的理解。',
          tags: ['进化论', '达尔文', '科学史', '自然选择'],
          coverImage: '/src/assets/public/dew.png?height=500&width=700',
          views: 2543,
          likes: 213,
          comments: 38,
          featured: false
        },
        {
          id: 'pub-014',
          title: '全球塑料污染对海洋生物的影响',
          author: '陈海博士',
          publishDate: '2022-10-05',
          category: 'report',
          summary: '这份报告综合了最新研究，详细分析了塑料污染对海洋生态系统和海洋生物的多层面影响，并提出了减少塑料污染的建议。',
          tags: ['塑料污染', '海洋生态', '环境保护', '可持续发展'],
          coverImage: '/src/assets/public/qqsl.png?height=500&width=700',
          views: 4532,
          likes: 423,
          comments: 76,
          featured: false
        },
        {
          id: 'pub-015',
          title: '热带雨林药用植物的潜力与保护',
          author: '赵明研究员',
          publishDate: '2022-09-18',
          category: 'research',
          summary: '本研究探讨了热带雨林药用植物的多样性、药用潜力以及面临的保护挑战，强调了生物多样性保护对药物发现的重要性。',
          tags: ['药用植物', '热带雨林', '生物多样性', '传统医学'],
          coverImage: '/src/assets/public/rdyl.png?height=500&width=700',
          views: 3210,
          likes: 276,
          comments: 42,
          featured: false
        }
      ];
      
      allPublications.value = mockPublications;
      featuredPublications.value = mockPublications.filter(pub => pub.featured);
    } catch (error) {
      console.error('Error fetching publications data:', error);
    } finally {
      loading.value = false;
    }
  };
  
  // Carousel methods
  const nextFeatured = () => {
    if (featuredIndex.value < featuredPublications.value.length - 1) {
      featuredIndex.value++;
    }
  };
  
  const prevFeatured = () => {
    if (featuredIndex.value > 0) {
      featuredIndex.value--;
    }
  };
  
  // Auto-rotate featured carousel
  let carouselInterval;
  const startCarouselInterval = () => {
    carouselInterval = setInterval(() => {
      if (featuredIndex.value < featuredPublications.value.length - 1) {
        featuredIndex.value++;
      } else {
        featuredIndex.value = 0;
      }
    }, 5000);
  };
  
  const stopCarouselInterval = () => {
    clearInterval(carouselInterval);
  };
  
  const handleSearch = () => {
    currentPage.value = 1; // Reset to first page when search changes
    applyFilters();
  };
  
  const applyFilters = () => {
    currentPage.value = 1; // Reset to first page when filters change
  };
  
  const clearSearch = () => {
    searchQuery.value = '';
    applyFilters();
  };
  
  const clearCategoryFilter = () => {
    categoryFilter.value = 'all';
    applyFilters();
  };
  
  const clearAllFilters = () => {
    searchQuery.value = '';
    categoryFilter.value = 'all';
    sortBy.value = 'date-desc';
    applyFilters();
  };
  
  const changePage = (page) => {
    if (typeof page === 'number') {
      currentPage.value = page;
      // Scroll to top of publications section
      document.querySelector('.publications-section').scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const navigateToPublication = (publicationId) => {
    if (publicationId == 'pub-001') {
      router.push(`/public/detail`);
    }
  };
  
  const selectCategory = (categoryId) => {
    categoryFilter.value = categoryId;
    applyFilters();
    // Scroll to publications section
    document.querySelector('.publications-section').scrollIntoView({ behavior: 'smooth' });
  };
  
  const searchByTag = (tag) => {
    searchQuery.value = tag;
    categoryFilter.value = 'all';
    applyFilters();
    // Scroll to publications section
    document.querySelector('.publications-section').scrollIntoView({ behavior: 'smooth' });
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('zh-CN', options);
  };
  
  const getCategoryName = (categoryId) => {
    const category = categories.value.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };
  
  const subscribeNewsletter = () => {
    if (emailInput.value && isValidEmail(emailInput.value)) {
      alert(`感谢订阅！确认邮件已发送至 ${emailInput.value}`);
      emailInput.value = '';
    } else {
      alert('请输入有效的电子邮箱地址');
    }
  };
  
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  // Implement intersection observer for lazy loading
  const setupLazyLoading = () => {
    if ('IntersectionObserver' in window) {
      const lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            lazyLoadObserver.unobserve(img);
          }
        });
      });
  
      document.querySelectorAll('img[data-src]').forEach(img => {
        lazyLoadObserver.observe(img);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
      });
    }
  };
  
  // Lifecycle hooks
  onMounted(() => {
    fetchPublicationsData();
    startCarouselInterval();
    
    // Setup lazy loading after content is loaded
    nextTick(() => {
      setupLazyLoading();
    });
  });
  
  // Clean up carousel interval when component is unmounted
  onBeforeUnmount(() => {
    stopCarouselInterval();
  });
  
  // Watch for filter changes to update lazy loading
  watch([currentPage, searchQuery, categoryFilter, sortBy], () => {
    nextTick(() => {
      setupLazyLoading();
    });
  });
  
  // Import h for rendering icons
  import { h, onBeforeUnmount } from 'vue';
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
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: var(--text-primary);
    background-color: var(--background-light);
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  
  h1, h2, h3, h4 {
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
    background-color: var(--background-white);
    padding: 1rem 0;
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
  
  .nav-link:hover, .nav-link.active {
    color: var(--primary-color);
    text-decoration: none;
  }
  
  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--primary-color);
  }
  
  /* Hero Section */
  .publications-hero {
    background-color: var(--primary-dark);
    color: white;
    padding: 5rem 0;
    text-align: center;
    background-image: linear-gradient(rgba(0, 80, 5, 0.8), rgba(0, 80, 5, 0.9)), url('/placeholder.svg?height=800&width=1200');
    background-size: cover;
    background-position: center;
  }
  
  .publications-hero h1 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    color: white;
  }
  
  .hero-description {
    max-width: 800px;
    margin: 0 auto;
    font-size: 1.2rem;
    opacity: 0.9;
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
  
  /* Featured Publications Carousel */
  .featured-publications {
    padding: 3rem 0;
    background-color: var(--background-light);
  }
  
  .featured-publications h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
  }
  
  .featured-carousel {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .carousel-container {
    width: 100%;
    overflow: hidden;
    border-radius: var(--border-radius);
  }
  
  .carousel-track {
    display: flex;
    transition: transform 0.5s ease;
  }
  
  .featured-card {
    min-width: 100%;
    background-color: var(--background-white);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--box-shadow);
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }
  
  @media (min-width: 768px) {
    .featured-card {
      flex-direction: row;
      height: 400px;
    }
    
    .featured-image {
      width: 50%;
    }
    
    .featured-content {
      width: 50%;
    }
  }
  
  .featured-image {
    position: relative;
    height: 100%;
  }
  
  .featured-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .featured-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: var(--accent-color);
    color: var(--text-primary);
    padding: 0.5rem 0.75rem;
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.8rem;
  }
  
  .featured-category {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 50px;
    font-size: 0.8rem;
  }
  
  .featured-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
  }
  
  .featured-content h3 {
    margin-bottom: 0.5rem;
    font-size: 1.6rem;
  }
  
  .featured-author {
    color: var(--text-secondary);
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .featured-date {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .featured-summary {
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    flex: 1;
    line-height: 1.7;
  }
  
  .read-more-button {
    background-color: var(--primary-color);
    color: white;
    padding: 0.75rem 0;
    border-radius: var(--border-radius);
    font-weight: 500;
    text-align: center;
    width: 100%;
    margin-top: auto;
  }
  
  .read-more-button:hover {
    background-color: var(--primary-dark);
  }
  
  .carousel-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .carousel-nav.prev {
    left: -20px;
  }
  
  .carousel-nav.next {
    right: -20px;
  }
  
  .carousel-nav:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .carousel-indicators {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ddd;
    border: none;
    padding: 0;
  }
  
  .indicator.active {
    background-color: var(--primary-color);
  }
  
  /* Publications Section */
  .publications-section {
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
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
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
  
  .publications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
  }
  
  .publication-card {
    background-color: var(--background-white);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--box-shadow);
    transition: var(--transition);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .publication-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  .publication-image {
    position: relative;
    height: 200px;
  }
  
  .publication-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .publication-category {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 50px;
    font-size: 0.8rem;
  }
  
  .publication-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  .publication-content h3 {
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
  }
  
  .publication-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
  
  .publication-author {
    font-weight: 500;
  }
  
  .publication-summary {
    color: var(--text-primary);
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }
  
  .publication-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .publication-tag {
    background-color: rgba(46, 125, 50, 0.1);
    color: var(--primary-color);
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-size: 0.8rem;
  }
  
  .publication-tag.more {
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--text-secondary);
  }
  
  .publication-stats {
    display: flex;
    gap: 1rem;
    border-top: 1px solid #eee;
    padding-top: 1rem;
    margin-top: auto;
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
  
  /* Pagination */
  .pagination-container {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
  }
  
  .pagination {
    display: flex;
    align-items: center;
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
  
  /* Categories Section */
  .categories-section {
    padding: 4rem 0;
    background-color: var(--background-light);
  }
  
  .categories-section h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
  }
  
  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .category-card {
    background-color: var(--background-white);
    border-radius: var(--border-radius);
    padding: 2rem;
    text-align: center;
    box-shadow: var(--box-shadow);
    transition: var(--transition);
    cursor: pointer;
  }
  
  .category-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  .category-icon {
    color: var(--primary-color);
    margin-bottom: 1.5rem;
  }
  
  .category-card h3 {
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }
  
  .category-card p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
  }
  
  .category-count {
    display: inline-block;
    background-color: rgba(46, 125, 50, 0.1);
    color: var(--primary-color);
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  /* Tags Section */
  .tags-section {
    padding: 4rem 0;
    background-color: var(--background-white);
  }
  
  .tags-section h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
  }
  
  .tags-cloud {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    max-width: 900px;
    margin: 0 auto;
  }
  
  .tag-cloud-item {
    color: var(--primary-color);
    transition: var(--transition);
    padding: 0.5rem;
  }
  
  .tag-cloud-item:hover {
    color: var(--primary-dark);
    text-decoration: none;
    transform: scale(1.1);
  }
  
  /* Newsletter Section */
  .newsletter-section {
    padding: 4rem 0;
    background-color: var(--primary-dark);
    color: white;
  }
  
  .newsletter-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }
  
  .newsletter-content {
    flex: 1;
  }
  
  .newsletter-content h2 {
    color: white;
    margin-bottom: 1rem;
    font-size: 2rem;
  }
  
  .newsletter-content p {
    opacity: 0.9;
    font-size: 1.1rem;
  }
  
  .newsletter-form {
    flex: 1;
    display: flex;
    gap: 1rem;
  }
  
  .newsletter-form input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: var(--border-radius);
    font-size: 1rem;
  }
  
  .subscribe-button {
    background-color: var(--accent-color);
    color: var(--text-primary);
    padding: 0 1.5rem;
    border-radius: var(--border-radius);
    font-weight: 500;
  }
  
  .subscribe-button:hover {
    background-color: #e6a800;
  }
  
  /* Footer */
  .main-footer {
    background-color: #1b5e20;
    color: white;
    padding: 3rem 0 1rem;
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
    .featured-carousel {
      padding: 0 2rem;
    }
    
    .publications-grid {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
  }
  
  @media (max-width: 768px) {
    .publications-hero h1 {
      font-size: 2.5rem;
    }
    
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
      margin-top: 1rem;
    }
    
    .newsletter-container {
      flex-direction: column;
      text-align: center;
    }
    
    .newsletter-form {
      width: 100%;
    }
    
    .publications-grid {
      grid-template-columns: 1fr;
    }
    
    .page-numbers {
      display: none;
    }
    
    .pagination {
      width: 100%;
      justify-content: space-between;
    }
  }
  
  @media (max-width: 480px) {
    .publications-hero h1 {
      font-size: 2rem;
    }
    
    .hero-description {
      font-size: 1rem;
    }
    
    .filter-group {
      width: 100%;
    }
    
    .filter-group select {
      flex: 1;
    }
    
    .newsletter-form {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .subscribe-button {
      width: 100%;
      padding: 0.75rem 0;
    }
    
    .carousel-nav {
      width: 30px;
      height: 30px;
    }
    
    .carousel-nav.prev {
      left: 0;
    }
    
    .carousel-nav.next {
      right: 0;
    }
  }
  </style>