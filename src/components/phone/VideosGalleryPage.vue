<template>
  <div class="mobile-container">
    <header class="detail-header">
      <div class="header-left">
        <button class="back-button" @click="goBack">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="#333"
              d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
            />
          </svg>
        </button>
      </div>
      <h1 class="header-title">科普视频</h1>
      <div class="header-right"></div>
    </header>
    <!-- 顶部搜索栏 -->
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索科普视频..."
        @input="handleSearchInput"
      />
      <button @click="handleSearch">搜索</button>
    </div>

    <!-- 分类筛选 -->
    <div class="category-filter">
      <div
        v-for="category in categories"
        :key="category.id"
        :class="[
          'category-item',
          activeCategory === category.id ? 'active' : '',
        ]"
        @click="filterByCategory(category.id)"
      >
        {{ category.name }}
      </div>
    </div>

    <!-- 视频列表 -->
    <div class="video-list">
      <div
        v-for="video in filteredVideos"
        :key="video.id"
        class="video-card"
        @click="goToDetail(video.id)"
      >
        <img :src="video.cover" class="video-cover" alt="视频封面" />
        <div class="video-info">
          <h3 class="video-title">{{ video.title }}</h3>
          <div class="video-meta">
            <span class="author">{{ video.author }}</span>
            <span class="views">{{ formatViews(video.views) }}次播放</span>
          </div>
          <p class="video-desc">{{ video.desc }}</p>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <span>加载中...</span>
      </div>

      <!-- 没有更多提示 -->
      <div v-if="!hasMore && filteredVideos.length > 0" class="no-more">
        没有更多内容了
      </div>

      <!-- 空状态 -->
      <div v-if="filteredVideos.length === 0 && !loading" class="empty-state">
        <img src="@/assets/2.svg" alt="空状态" />
        <p>暂无相关视频</p>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 模拟数据
const mockVideos = Array.from({ length: 30 }, (_, i) => ({
  id: `video-${i + 1}`,
  title: `科普视频标题 ${i + 1}`,
  cover: `https://picsum.photos/300/200?random=${i + 1}`,
  author: ["科学探索", "自然世界", "宇宙奥秘", "生物奇观"][i % 4],
  views: Math.floor(Math.random() * 10000) + 1000,
  category: `${Math.floor(Math.random() * 5) + 1}`,
  desc:
    "这是关于" +
    ["宇宙", "生物", "物理", "化学", "地球"][i % 5] +
    "的科普视频内容简介",
}));
const goBack = () => {
  router.go(-1);
};
// 分类数据
const categories = ref([
  { id: "0", name: "全部" },
  { id: "1", name: "天文" },
  { id: "2", name: "生物" },
  { id: "3", name: "物理" },
  { id: "4", name: "化学" },
  { id: "5", name: "地球科学" },
]);

// 状态管理
const searchQuery = ref("");
const activeCategory = ref("0");
const videoList = ref([]);
const page = ref(1);
const pageSize = 10;
const hasMore = ref(true);
const loading = ref(false);
const searchTimer = ref(null);

// 计算属性 - 过滤后的视频列表
const filteredVideos = computed(() => {
  let result = videoList.value;

  // 分类筛选
  if (activeCategory.value !== "0") {
    result = result.filter((video) => video.category === activeCategory.value);
  }

  // 模糊搜索
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim().toLowerCase();
    result = result.filter(
      (video) =>
        video.title.toLowerCase().includes(query) ||
        video.desc.toLowerCase().includes(query) ||
        video.author.toLowerCase().includes(query)
    );
  }

  return result;
});

// 初始化加载数据
const loadData = async () => {
  if (loading.value || !hasMore.value) return;

  loading.value = true;
  try {
    // 模拟API请求延迟
    await new Promise((resolve) => setTimeout(resolve, 800));

    const startIdx = (page.value - 1) * pageSize;
    const endIdx = page.value * pageSize;
    const newData = mockVideos.slice(startIdx, endIdx);

    if (newData.length) {
      videoList.value = [...videoList.value, ...newData];
      hasMore.value = newData.length === pageSize;
      page.value++;
    } else {
      hasMore.value = false;
    }
  } finally {
    loading.value = false;
  }
};

// 分类筛选
const filterByCategory = (categoryId) => {
  activeCategory.value = categoryId;
  resetAndReload();
};

// 搜索输入处理（带防抖）
const handleSearchInput = () => {
  clearTimeout(searchTimer.value);
  searchTimer.value = setTimeout(() => {
    handleSearch();
  }, 500);
};

// 搜索处理
const handleSearch = () => {
  resetAndReload();
};

// 重置并重新加载
const resetAndReload = () => {
  page.value = 1;
  videoList.value = [];
  hasMore.value = true;
  loadData();
};

// 格式化播放量
const formatViews = (views) => {
  if (views >= 10000) {
    return (views / 10000).toFixed(1) + "万";
  }
  return views;
};

// 跳转详情页
const goToDetail = (id) => {
  router.push({ name: "VideoDetail", params: { id } });
};

// 滚动加载
const handleScroll = () => {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const windowHeight = window.innerHeight;
  const scrollHeight = document.documentElement.scrollHeight;

  if (scrollTop + windowHeight >= scrollHeight - 100 && !loading.value) {
    loadData();
  }
};

// 初始化
onMounted(() => {
  loadData();
  window.addEventListener("scroll", handleScroll);
});
</script>
  
  <style scoped>
/* 新增header样式 */
.detail-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.header-left {
  width: 60px;
}

.back-button {
  padding: 8px;
  border: none;
  background: none;
  cursor: pointer;
}

.back-button svg {
  vertical-align: middle;
}

.header-title {
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 20px;
}

.header-right {
  width: 60px;
}

.mobile-container {
  max-width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
}

/* 搜索栏样式 */
.search-bar {
  display: flex;
  padding-top: 70px;
  background-color: #fff;
  z-index: 10;
}

.search-bar input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  outline: none;
  font-size: 14px;
}

.search-bar button {
  margin-left: 10px;
  padding: 0 15px;
  background-color: #4fa673;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
}

/* 分类筛选样式 */
.category-filter {
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.category-filter::-webkit-scrollbar {
  display: none;
}

.category-item {
  display: inline-block;
  padding: 6px 15px;
  margin-right: 8px;
  border-radius: 15px;
  background-color: #f5f5f5;
  color: #666;
  font-size: 13px;
}

.category-item.active {
  background-color: #48a351;
  color: white;
}

/* 视频列表样式 */
.video-list {
  margin-top: 10px;
}

.video-card {
  display: flex;
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.video-cover {
  width: 120px;
  height: 80px;
  object-fit: cover;
}

.video-info {
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.video-title {
  margin: 0 0 5px 0;
  font-size: 15px;
  font-weight: 500;
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.video-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 12px;
  color: #999;
}

.video-desc {
  margin: 0;
  font-size: 13px;
  color: #666;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

/* 加载状态 */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 0;
  color: #999;
  font-size: 14px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #48a351;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 5px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.no-more {
  text-align: center;
  padding: 15px 0;
  color: #999;
  font-size: 14px;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  color: #999;
}

.empty-state img {
  width: 120px;
  margin-bottom: 15px;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

/* 响应式调整 */
@media (max-width: 375px) {
  .video-cover {
    width: 100px;
    height: 70px;
  }

  .video-title {
    font-size: 14px;
  }

  .video-desc {
    font-size: 12px;
  }
}
</style>