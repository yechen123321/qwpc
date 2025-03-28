<script setup>
import { ref, computed } from 'vue';

// 模拟的科普帖子数据
const posts = ref([
  { id: 1, title: '太阳系的奥秘', content: '太阳系由太阳和围绕它运行的行星、卫星、小行星等组成。太阳是太阳系的中心，提供了能量和引力，使行星沿着椭圆轨道运行。', category: '天文' },
  { id: 2, title: '恐龙灭绝的原因', content: '恐龙灭绝的原因有多种学说，包括小行星撞击、火山爆发等。小行星撞击假说认为，6500万年前一颗巨大的小行星撞击地球，导致气候剧变。', category: '古生物' },
  { id: 3, title: '量子力学入门', content: '量子力学是研究微观世界的物理学理论，揭示了粒子行为的奇特性质，例如波粒二象性和量子叠加态。', category: '物理' },
  { id: 4, title: '黑洞的形成', content: '黑洞是由质量极大的恒星在燃料耗尽后坍缩形成的，其引力极强，连光都无法逃逸。', category: '天文' },
]);

// 分类选项
const categories = ref(['全部', '天文', '古生物', '物理']);

// 搜索关键词和分类选择
const searchQuery = ref('');
const selectedCategory = ref('全部');

// 当前查看的帖子ID（用于显示完整内容）
const selectedPostId = ref(null);

// 计算属性：模糊查询后的帖子
const filteredPosts = computed(() => {
  if (!searchQuery.value) return posts.value;
  return posts.value.filter(post => 
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// 计算属性：按分类过滤后的帖子
const categorizedPosts = computed(() => {
  if (selectedCategory.value === '全部') return filteredPosts.value;
  return filteredPosts.value.filter(post => post.category === selectedCategory.value);
});

// 点击查看完整帖子
const viewPost = (postId) => {
  selectedPostId.value = postId;
};

// 返回帖子列表
const closePost = () => {
  selectedPostId.value = null;
};
</script>

<template>
  <div class="container">
    <!-- 搜索和分类区域 -->
    <header v-if="!selectedPostId">
      <input v-model="searchQuery" placeholder="搜索帖子" />
      <select v-model="selectedCategory">
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </header>

    <!-- 帖子列表或完整帖子内容 -->
    <main>
      <!-- 显示帖子列表 -->
      <ul v-if="!selectedPostId">
        <li v-for="post in categorizedPosts" :key="post.id" @click="viewPost(post.id)">
          <h2>{{ post.title }}</h2>
          <p>{{ post.content.substring(0, 50) }}...</p>
        </li>
      </ul>

      <!-- 显示完整帖子内容 -->
      <div v-else class="post-detail">
        <h2>{{ posts.find(p => p.id === selectedPostId).title }}</h2>
        <p>{{ posts.find(p => p.id === selectedPostId).content }}</p>
        <button @click="closePost">返回</button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.container {
  max-width: 100%;
  padding: 10px;
  font-family: Arial, sans-serif;
}

header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

input, select {
  width: 48%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 15px;
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

li:hover {
  background-color: #f9f9f9;
}

h2 {
  font-size: 18px;
  margin: 0 0 5px 0;
}

p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.post-detail {
  padding: 15px;
}

.post-detail h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.post-detail p {
  font-size: 16px;
  color: #333;
  line-height: 1.5;
}

button {
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>