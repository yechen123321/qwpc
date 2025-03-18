<template>
    <div class="app-container">
      <!-- 导航栏 -->
      <header class="main-header">
        <div class="logo">
          <h2>生物百科</h2>
        </div>
        <nav class="main-nav">
          <a href="/library" class="nav-link">主页</a>
          <a href="/categories" class="nav-link">类别</a>
          <a href="#" class="nav-link active">发现</a>
          <a href="#" class="nav-link">关于</a>
        </nav>
      </header>
  
      <!-- 报道详情部分 -->
      <section class="discovery-detail">
        <div class="detail-content">
          <div class="detail-header">
            <span class="detail-date">2024年6月15日</span>
            <h1>秘鲁雨林发现新兰花物种</h1>
          </div>
          <div class="detail-image">
            <img src="../assets/2.svg?height=400&width=600" alt="New Orchid Species" />
          </div>
          <div class="detail-text">
            <p class="lead-text">
              科学家们在秘鲁亚马逊雨林的偏远地区发现了一种以前未知的兰花物种，这一发现为地球生物多样性增添了新的篇章。
            </p>
            <p>
              这株新发现的兰花被命名为 <em>Phalaenopsis peruviensis</em>，其独特的花瓣形态和鲜艳的紫红色使其在众多兰花中脱颖而出。研究团队在为期三周的探险中，于海拔约1200米的云雾林中发现了这一物种。初步分析表明，这种兰花可能具有特殊的传粉机制，吸引特定的昆虫种类。
            </p>
            <p>
              此次发现由秘鲁国立圣马科斯大学和国际自然保护组织的联合团队完成。他们表示，这一发现凸显了亚马逊雨林作为全球生物多样性热点的重要性，同时也提醒人们保护这些脆弱生态系统的迫切性。
            </p>
            <div class="detail-stats">
              <div class="stat-item">
                <span class="stat-number">1200</span>
                <span class="stat-label">发现海拔（米）</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">3周</span>
                <span class="stat-label">探险时长</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">未知</span>
                <span class="stat-label">潜在相关物种</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- 页脚 -->
      <footer class="main-footer">
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
        </div>
        <div class="footer-bottom">
          <p>© 2025 生息云纪. 保留所有权利.</p>
        </div>
      </footer>
    </div>
  </template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.push({ name: "RecentDiscoveries" }); // 假设返回到发现列表页面
};
</script>

<style>
/* 继承全局样式变量 */
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

/* 报道详情样式 */
.discovery-detail {
  padding: 3rem 5%;
  background-color: var(--background-white);
}

.detail-content {
  max-width: 1200px;
  margin: 0 auto;
}

.detail-header {
  margin-bottom: 2rem;
}

.detail-date {
  display: block;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.detail-header h1 {
  font-size: 2.5rem;
  color: var(--primary-dark);
  line-height: 1.3;
}

.detail-image {
  margin-bottom: 2rem;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
}

.detail-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.detail-text {
  line-height: 1.7;
}

.lead-text {
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.detail-text p {
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.detail-text em {
  color: var(--secondary-color);
  font-style: italic;
}

.detail-stats {
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  max-width: 600px;
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

.detail-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: var(--transition);
}

.detail-button:hover {
  background-color: var(--primary-dark);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .detail-header h1 {
    font-size: 2rem;
  }

  .detail-image img {
    height: 300px;
  }

  .detail-stats {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .detail-header h1 {
    font-size: 1.8rem;
  }

  .detail-image img {
    height: 200px;
  }
}
</style>