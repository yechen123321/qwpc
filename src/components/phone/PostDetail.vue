<template>
    <div class="publication-detail-page">
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>加载出版物内容...</p>
      </div>
  
      <div v-else-if="error" class="error-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h2>加载错误</h2>
        <p>{{ error }}</p>
        <button class="primary-button" @click="fetchPublicationData">重试</button>
      </div>
  
      <!-- 使用v-else-if确保只有在数据加载完成且没有错误时才渲染内容 -->
      <template v-else>
        <!-- Publication Hero -->
        <section v-if="publication && publication.title" class="publication-hero" :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${publication.coverImage})` }">
          <div class="container">
            <div class="publication-category-badge">{{ getCategoryName(publication.category) }}</div>
            <h1>{{ publication.title }}</h1>
            <div class="publication-meta">
              <div class="author-info">
                <div class="author-avatar">
                  <img :src="publication.authorAvatar || '/placeholder.svg?height=100&width=100'" alt="Author">
                </div>
                <div class="author-details">
                  <div class="author-name">{{ publication.author }}</div>
                  <div class="publication-date">{{ formatDate(publication.publishDate) }}</div>
                </div>
              </div>
              <div class="publication-stats">
                <div class="stat-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span>{{ publication.views }} 次阅读</span>
                </div>
                <div class="stat-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  <span>{{ publication.likes }} 人喜欢</span>
                </div>
                <div class="stat-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  <span>{{ publication.comments }} 条评论</span>
                </div>
              </div>
            </div>
            <div class="publication-tags">
              <span v-for="(tag, index) in publication.tags" :key="index" class="publication-tag">{{ tag }}</span>
            </div>
          </div>
        </section>
  
        <!-- Main Content -->
        <section v-if="publication && publication.title" class="publication-content">
          <div class="container">
            <div class="content-layout">
              <!-- Main Article -->
              <div class="main-article">
                <div class="article-summary">
                  <p>{{ publication.summary }}</p>
                </div>
                
                <div class="article-content">
                  <div v-for="(section, index) in publication.content" :key="index" class="content-section" :id="getSectionId(section.title)">
                    <h2 v-if="section.title">{{ section.title }}</h2>
                    
                    <div v-if="section.image" class="section-image">
                      <img :src="section.image" :alt="section.imageCaption || section.title" loading="lazy">
                      <p v-if="section.imageCaption" class="image-caption">{{ section.imageCaption }}</p>
                    </div>
                    
                    <div v-for="(paragraph, pIndex) in section.paragraphs" :key="`p-${index}-${pIndex}`" class="paragraph">
                      <p>{{ paragraph }}</p>
                    </div>
                  </div>
                </div>
                
                <!-- References -->
                <div class="article-references" v-if="publication.references && publication.references.length">
                  <h2>参考文献</h2>
                  <ol class="references-list">
                    <li v-for="(reference, index) in publication.references" :key="index">
                      {{ reference.authors }}. ({{ reference.year }}). {{ reference.title }}. <em>{{ reference.journal }}</em>, {{ reference.volume }}{{ reference.pages ? ', ' + reference.pages : '' }}.
                      <a v-if="reference.doi" :href="`https://doi.org/${reference.doi}`" target="_blank" rel="noopener noreferrer">https://doi.org/{{ reference.doi }}</a>
                    </li>
                  </ol>
                </div>
                
                <!-- Author Bio -->
                <div class="author-bio">
                  <div class="author-avatar">
                    <img :src="publication.authorAvatar || '/placeholder.svg?height=100&width=100'" alt="Author">
                  </div>
                  <div class="author-details">
                    <h3>关于作者</h3>
                    <h4>{{ publication.author }}</h4>
                    <p>{{ publication.authorBio }}</p>
                  </div>
                </div>
                
                <!-- Social Sharing -->
                <!-- <div class="social-sharing">
                  <h3>分享这篇文章</h3>
                  <div class="sharing-buttons">
                    <button class="share-button facebook" @click="shareOnSocial('facebook')">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                      Facebook
                    </button>
                    <button class="share-button twitter" @click="shareOnSocial('twitter')">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                      Twitter
                    </button>
                    <button class="share-button linkedin" @click="shareOnSocial('linkedin')">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                      LinkedIn
                    </button>
                    <button class="share-button email" @click="shareByEmail">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      Email
                    </button>
                  </div>
                </div> -->
                
                <!-- Comments Section -->
                <!-- <div class="comments-section">
                  <h2>评论 ({{ publication.comments }})</h2>
                  
                  <div class="comment-form">
                    <h3>发表评论</h3>
                    <div class="form-group">
                      <label for="comment-name">姓名</label>
                      <input type="text" id="comment-name" v-model="commentName" placeholder="您的姓名">
                    </div>
                    <div class="form-group">
                      <label for="comment-email">电子邮箱</label>
                      <input type="email" id="comment-email" v-model="commentEmail" placeholder="您的电子邮箱">
                    </div>
                    <div class="form-group">
                      <label for="comment-content">评论</label>
                      <textarea id="comment-content" v-model="commentContent" placeholder="您的评论" rows="4"></textarea>
                    </div>
                    <button class="submit-comment" @click="submitComment">提交评论</button>
                  </div>
                  
                  <div class="comments-list">
                    <div v-for="(comment, index) in publication.commentsList" :key="index" class="comment">
                      <div class="comment-avatar">
                        <img :src="comment.avatar || '/placeholder.svg?height=50&width=50'" alt="Commenter">
                      </div>
                      <div class="comment-content">
                        <div class="comment-header">
                          <span class="commenter-name">{{ comment.name }}</span>
                          <span class="comment-date">{{ formatDate(comment.date) }}</span>
                        </div>
                        <p>{{ comment.content }}</p>
                        <div class="comment-actions">
                          <button class="comment-action" @click="likeComment(index)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                            </svg>
                            喜欢 ({{ comment.likes }})
                          </button>
                          <button class="comment-action" @click="replyToComment(index)">回复</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="load-more-comments" v-if="publication.commentsList && publication.commentsList.length < publication.comments">
                    <button class="load-more-button" @click="loadMoreComments">加载更多评论</button>
                  </div>
                </div> -->
              </div>
              
              <!-- Sidebar -->
              <div class="sidebar">
                <!-- Table of Contents -->
                <!-- <div class="sidebar-section toc-section">
                  <h3>目录</h3>
                  <ul class="toc-list">
                    <li v-for="(section, index) in publication.content" :key="index" v-if="section && section.title">
                      <a href="#" @click.prevent="scrollToSection(section.title)">{{ section.title }}</a>
                    </li>
                  </ul>
                </div> -->
                
                <!-- Related Publications -->
                <div class="sidebar-section" v-if="relatedPublications && relatedPublications.length">
                  <h3>相关出版物</h3>
                  <div class="related-publications">
                    <div v-for="(relatedPub, index) in relatedPublications" :key="index" class="related-publication" @click="navigateToPublication(relatedPub.id)">
                      <div class="related-pub-image">
                        <img :src="relatedPub.coverImage" :alt="relatedPub.title" loading="lazy">
                      </div>
                      <div class="related-pub-content">
                        <h4>{{ relatedPub.title }}</h4>
                        <p class="related-pub-author">{{ relatedPub.author }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Download Resources -->
                <!-- <div class="sidebar-section" v-if="publication.resources && publication.resources.length">
                  <h3>下载资源</h3>
                  <ul class="resources-list">
                    <li v-for="(resource, index) in publication.resources" :key="index">
                      <a :href="resource.url" class="resource-link" download>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        {{ resource.name }} ({{ formatFileSize(resource.size) }})
                      </a>
                    </li>
                  </ul>
                </div> -->
                
                <!-- Tags Cloud -->
                <!-- <div class="sidebar-section" v-if="popularTags && popularTags.length">
                  <h3>标签云</h3>
                  <div class="tags-cloud">
                    <a 
                      v-for="(tag, index) in popularTags" 
                      :key="index" 
                      href="#" 
                      @click.prevent="searchByTag(tag.name)"
                      :style="{ fontSize: `${tag.size}rem` }"
                      class="tag-cloud-item"
                    >
                      {{ tag.name }}
                    </a>
                  </div>
                </div> -->
                
                <!-- Reading Progress -->
                <!-- <div class="sidebar-section reading-progress-section">
                  <h3>阅读进度</h3>
                  <div class="reading-progress-container">
                    <div class="reading-progress-bar" :style="{ width: `${readingProgress}%` }"></div>
                  </div>
                  <div class="reading-progress-text">{{ Math.round(readingProgress) }}% 已阅读</div>
                </div> -->
              </div>
            </div>
          </div>
        </section>
  
        <!-- More From This Author -->
        <!-- <section v-if="publication && publication.author && authorPublications && authorPublications.length" class="more-from-author">
          <div class="container">
            <h2>来自 {{ publication.author }} 的更多出版物</h2>
            <div class="author-publications">
              <div 
                v-for="(authorPub, index) in authorPublications" 
                :key="index"
                class="author-pub-card"
                @click="navigateToPublication(authorPub.id)"
              >
                <div class="author-pub-image">
                  <img :src="authorPub.coverImage" :alt="authorPub.title" loading="lazy">
                </div>
                <div class="author-pub-content">
                  <h3>{{ authorPub.title }}</h3>
                  <p class="author-pub-date">{{ formatDate(authorPub.publishDate) }}</p>
                  <p class="author-pub-summary">{{ authorPub.summary }}</p>
                </div>
              </div>
            </div>
          </div>
        </section> -->
  
        <!-- You May Also Like -->
        <!-- <section v-if="recommendedPublications && recommendedPublications.length" class="you-may-also-like">
          <div class="container">
            <h2>您可能也喜欢</h2>
            <div class="recommended-publications">
              <div 
                v-for="(recommendedPub, index) in recommendedPublications" 
                :key="index"
                class="recommended-pub-card"
                @click="navigateToPublication(recommendedPub.id)"
              >
                <div class="recommended-pub-image">
                  <img :src="recommendedPub.coverImage" :alt="recommendedPub.title" loading="lazy">
                  <div class="recommended-pub-category">{{ getCategoryName(recommendedPub.category) }}</div>
                </div>
                <div class="recommended-pub-content">
                  <h3>{{ recommendedPub.title }}</h3>
                  <p class="recommended-pub-author">{{ recommendedPub.author }}</p>
                  <p class="recommended-pub-date">{{ formatDate(recommendedPub.publishDate) }}</p>
                </div>
              </div>
            </div>
          </div>
        </section> -->
  
        <!-- Newsletter Section -->
        <!-- <section class="newsletter-section">
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
        </section> -->
      </template>
  
      <!-- Footer -->
      <!-- <footer class="main-footer">
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
      </footer> -->
  
      <!-- Back to Top Button -->
      <!-- <button 
        class="back-to-top" 
        :class="{ 'visible': showBackToTop }"
        @click="scrollToTop"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button> -->
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  
  // State
  const loading = ref(true); // 初始设置为true，表示正在加载
  const error = ref(null);
  const publication = ref({});
  const relatedPublications = ref([]);
  const authorPublications = ref([]);
  const recommendedPublications = ref([]);
  const commentName = ref('');
  const commentEmail = ref('');
  const commentContent = ref('');
  const emailInput = ref('');
  const readingProgress = ref(0);
  const showBackToTop = ref(false);
  
  // Popular tags for tag cloud
  const popularTags = ref([
    { name: '生物多样性', size: 1.6 },
    { name: '亚马逊', size: 1.4 },
    { name: '保护', size: 1.5 },
    { name: '热带雨林', size: 1.3 },
    { name: '气候变化', size: 1.4 },
    { name: '濒危物种', size: 1.2 },
    { name: '生态系统', size: 1.3 },
    { name: '可持续发展', size: 1.1 },
    { name: '物种调查', size: 1.0 },
    { name: '栖息地', size: 1.2 },
    { name: '森林砍伐', size: 1.1 },
    { name: '保护区', size: 1.0 }
  ]);
  
  // Fetch publication data
  const fetchPublicationData = async () => {
    loading.value = true;
    error.value = null;
  
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 初始化 publication 对象
      publication.value = {
        id: 'pub-001',
        title: '亚马逊雨林生物多样性调查报告',
        author: '李明博士',
        authorAvatar: '/src/assets/avatar.png?height=100&width=100',
        authorBio: '李明博士是一位资深的生态学家，专注于热带雨林生态系统研究已有15年。他曾参与多个国际保护项目，发表过30多篇学术论文，并著有《热带雨林的秘密生活》一书。',
        publishDate: '2023-11-15',
        category: 'report',
        summary: '本报告详细记录了2023年亚马逊雨林生物多样性调查的结果，包括新发现的物种和濒危物种的最新状况。调查团队在为期六个月的实地考察中，记录了超过2000种植物和1500种动物，其中包括12个可能的新物种。',
        tags: ['亚马逊', '生物多样性', '热带雨林', '保护', '物种调查', '濒危物种'],
        coverImage: '/src/assets/public/yms.png?height=800&width=1200',
        views: 3245,
        likes: 287,
        comments: 42,
        content: [
          {
            title: '调查背景',
            paragraphs: [
              '亚马逊雨林是地球上生物多样性最丰富的地区之一，拥有全球约10%的已知物种。然而，由于持续的森林砍伐、气候变化和其他人类活动，这一独特生态系统正面临前所未有的威胁。',
              '为了更好地了解亚马逊雨林的当前状况和生物多样性变化趋势，我们组织了一支由来自12个国家的30名科学家组成的国际调查团队，于2023年1月至6月对亚马逊雨林的四个关键区域进行了全面调查。'
            ]
          },
          {
            title: '调查方法',
            paragraphs: [
              '本次调查采用了多种科学方法，包括样线调查、红外相机陷阱、声音监测、环境DNA采样以及传统的物种分类学鉴定。调查区域覆盖了亚马逊雨林的四个不同生态区：北部高地、中部河岸、西部山麓和南部季节性洪泛区。',
              '每个区域设置了25个1公顷的永久样方，进行了详细的植物群落调查。同时，在每个样方周围2公里范围内，安装了10台红外相机陷阱和5个声音监测装置，持续记录野生动物活动。环境DNA样本从每个区域的主要水体中采集，用于检测难以直接观察的水生物种。'
            ],
            image: '/src/assets/public/hw.png?height=600&width=800',
            imageCaption: '科研团队在亚马逊雨林中设置红外相机陷阱'
          },
          {
            title: '主要发现',
            paragraphs: [
              '在为期六个月的调查中，我们共记录了2,143种植物、1,021种昆虫、312种鸟类、89种哺乳动物、76种爬行动物、54种两栖动物和103种鱼类。其中，我们发现了12个可能的新物种，包括5种兰花、3种甲虫、2种蛙类、1种小型啮齿动物和1种鱼类。这些潜在的新物种正在进行进一步的分类学研究和DNA分析，以确认其分类地位。',
              '特别值得注意的是，我们在北部高地区域发现了一个被认为已在该地区灭绝的黑脸狮猴（Leontopithecus caissara）小种群，这一发现为该濒危物种的保护提供了新的希望。',
              '调查还记录了43种IUCN红色名录中的濒危或极危物种，其中包括亚马逊河豚（Inia geoffrensis）、巨水獭（Pteronura brasiliensis）和美洲虎（Panthera onca）。通过与历史数据比较，我们发现这些物种的种群数量和分布范围继续呈下降趋势，尤其是在靠近人类活动区域的地方。'
            ],
            image: '/src/assets/public/hlsh.png?height=600&width=800',
            imageCaption: '调查中发现的黑脸狮猴（Leontopithecus caissara）'
          },
          {
            title: '栖息地变化',
            paragraphs: [
              '通过与10年前的调查数据比较，我们发现亚马逊雨林的栖息地结构和质量发生了显著变化。在所有调查区域，原始森林覆盖率平均下降了12.3%，而次生林和退化区域增加了15.7%。',
              '最严重的栖息地丧失出现在南部季节性洪泛区，那里的原始森林覆盖率下降了近20%，主要是由于农业扩张和非法采伐。相比之下，受保护区内的栖息地变化相对较小，强调了有效保护区管理的重要性。',
              '气候变化的影响也变得越来越明显，特别是在干旱频率和强度增加的地区。在西部山麓区域，我们观察到一些湿润森林物种向更高海拔迁移的趋势，这可能是对气候变暖的适应性反应。'
            ]
          },
          {
            title: '保护建议',
            paragraphs: [
              '基于本次调查的发现，我们提出以下保护建议：',
              '1. 扩大和加强现有保护区网络，特别是在发现高度濒危物种和新物种的地区。',
              '2. 建立生态走廊，连接现有保护区，促进物种迁移和基因流动，增强生态系统对气候变化的适应能力。',
              '3. 加强对非法采伐、偷猎和野生动物贸易的执法力度，特别是在保护区边界和缓冲区。',
              '4. 支持当地社区参与保护工作，发展可持续的生计选择，减少对森林资源的依赖。',
              '5. 建立长期监测系统，持续跟踪生物多样性变化和栖息地状况，为适应性管理提供科学依据。'
            ]
          },
          {
            title: '结论',
            paragraphs: [
              '本次亚马逊雨林生物多样性调查提供了关于这一全球重要生态系统当前状况的宝贵信息。尽管面临诸多威胁，亚马逊雨林仍然是地球上生物多样性最丰富的地区之一，继续发挥着维持全球气候稳定和保护无数物种的关键作用。',
              '调查结果强调了加强保护努力的紧迫性，同时也带来了希望——新物种的发现和被认为已局部灭绝物种的重新发现表明，通过有效的保护措施，我们仍有机会挽救这一独特的生态系统及其丰富的生物多样性。',
              '未来的研究应继续关注气候变化对亚马逊生态系统的影响，以及不同保护策略的有效性评估，为制定更加科学、有效的保护政策提供依据。'
            ]
          }
        ],
        references: [
          {
            authors: 'Silva, M., Johnson, K., & Wang, L.',
            year: '2022',
            title: 'Biodiversity patterns in Amazonian rainforests: A decade of change',
            journal: 'Journal of Tropical Ecology',
            volume: '38(2)',
            pages: '145-162',
            doi: '10.1111/jte.12345'
          },
          {
            authors: 'Rodriguez, A., Chen, H., & Patel, S.',
            year: '2021',
            title: 'Climate change impacts on Amazonian species distribution',
            journal: 'Global Change Biology',
            volume: '27(3)',
            pages: '578-591',
            doi: '10.1111/gcb.15467'
          },
          {
            authors: 'Martinez, C., Brown,D., & Garcia, J.',
            year: '2023',
            title: 'Novel approaches for biodiversity monitoring in tropical forests',
            journal: 'Methods in Ecology and Evolution',
            volume: '14(1)',
            pages: '33-47',
            doi: '10.1111/mee.13789'
          }
        ],
        resources: [
          {
            name: '完整调查报告 (PDF)',
            url: '/src/assets/1.pdf',
            size: 4500000
          },
          {
            name: '物种名录 (Excel)',
            url: '#',
            size: 2300000
          },
          {
            name: '高分辨率地图数据 (ZIP)',
            url: '#',
            size: 15000000
          }
        ],
        commentsList: [
          {
            name: '张伟',
            avatar: '/src/assets/avatar.png?height=50&width=50',
            date: '2023-11-16',
            content: '非常详尽的调查报告！我特别关注亚马逊地区的两栖动物多样性，很高兴看到有新的蛙类被发现。希望能看到更多关于这些新物种的详细信息。',
            likes: 12
          },
          {
            name: '王丽',
            avatar: '/src/assets/avatar.png?height=50&width=50',
            date: '2023-11-17',
            content: '作为一名保护生物学研究生，这份报告对我的研究非常有帮助。我想知道调查团队是否计划公开发布原始数据集？这对比较研究将非常有价值。',
            likes: 8
          },
          {
            name: '刘明',
            avatar: '/src/assets/avatar.png?height=50&width=50',
            date: '2023-11-18',
            content: '报告中提到的黑脸狮猴重新发现令人振奋！我曾在2015年参与过该地区的一项调查，当时我们没有发现任何这个物种的踪迹。这真的给保护工作带来了希望。',
            likes: 15
          }
        ]
      };
      
      // 初始化相关出版物数据
      relatedPublications.value = [
        {
          id: 'pub-006',
          title: '全球两栖动物减少趋势分析',
          author: '陈明教授',
          coverImage: '/src/assets/public/yms.png?height=150&width=200'
        },
        {
          id: 'pub-014',
          title: '全球塑料污染对海洋生物的影响',
          author: '陈海博士',
          coverImage: '/src/assets/public/qqsl.png?height=150&width=200'
        },
        {
          id: 'pub-010',
          title: '蜜蜂减少与全球粮食安全',
          author: '孙丽研究员',
          coverImage: '/src/assets/public/mf.png?height=150&width=200'
        }
      ];
      
      // 初始化作者出版物数据
      authorPublications.value = [
        {
          id: 'pub-016',
          title: '热带雨林碳储量变化研究',
          publishDate: '2022-08-10',
          summary: '这项研究分析了过去20年热带雨林碳储量的变化趋势，评估了森林保护措施对碳封存的影响。',
          coverImage: '/src/assets/public/rdyl.png?height=200&width=300'
        },
        {
          id: 'pub-017',
          title: '亚马逊河流域水质与生物多样性关系',
          publishDate: '2021-05-22',
          summary: '本研究探讨了亚马逊河流域水质变化与水生生物多样性之间的关系，为水资源保护提供科学依据。',
          coverImage: '/src/assets/public/yms.png?height=200&width=300'
        }
      ];
      
      // 初始化推荐出版物数据
      recommendedPublications.value = [
        {
          id: 'pub-003',
          title: '微生物世界：土壤中的隐形守护者',
          author: '王芳研究员',
          publishDate: '2023-09-12',
          category: 'article',
          coverImage: '/src/assets/public/wsw.png?height=200&width=300'
        },
        {
          id: 'pub-007',
          title: '昆虫：地球上最成功的生命形式',
          author: '林小红研究员',
          publishDate: '2023-05-10',
          category: 'article',
          coverImage: '/src/assets/public/kc.png?height=200&width=300'
        },
        {
          id: 'pub-012',
          title: '植物如何交流：地下菌根网络的秘密',
          author: '李芳研究员',
          publishDate: '2022-12-15',
          category: 'article',
          coverImage: '/src/assets/public/zwjl.png?height=200&width=300'
        },
        {
          id: 'pub-015',
          title: '热带雨林药用植物的潜力与保护',
          author: '赵明研究员',
          publishDate: '2022-09-18',
          category: 'research',
          coverImage: '/src/assets/public/rdyl.png?height=200&width=300'
        }
      ];
      
    } catch (err) {
      console.error('Error fetching publication data:', err);
      error.value = '获取出版物数据时出错。请稍后再试。';
      publication.value = {}; // 确保在错误情况下 publication 是一个空对象
    } finally {
      loading.value = false;
    }
  };
  
  // Methods
  const navigateTo = (page, id) => {
    console.log(`Navigate to ${page}${id ? ': ' + id : ''}`);
    // In a real app, this would use router.push to navigate
  };
  
  const navigateToPublication = (publicationId) => {
    console.log(`Navigate to publication: ${publicationId}`);
    // In a real app, this would navigate to the publication detail page
    // router.push(`/publications/${publicationId}`);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('zh-CN', options);
  };
  
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  const getCategoryName = (categoryId) => {
    if (!categoryId) return '';
    const categories = {
      'research': '研究论文',
      'report': '调查报告',
      'article': '科普文章',
      'book': '图书摘录'
    };
    return categories[categoryId] || categoryId;
  };
  
  const getSectionId = (title) => {
    if (!title) return '';
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
  };
  
  const scrollToSection = (sectionTitle) => {
    if (!sectionTitle) return;
    const sectionId = getSectionId(sectionTitle);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const updateReadingProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    // Calculate reading progress
    const scrollDistance = scrollHeight - clientHeight;
    const progress = (scrollTop / scrollDistance) * 100;
    readingProgress.value = Math.min(Math.max(progress, 0), 100);
    
    // Show back to top button when scrolled down
    showBackToTop.value = scrollTop > 300;
  };
  
  const submitComment = () => {
    if (!commentName.value || !commentEmail.value || !commentContent.value) {
      alert('请填写所有必填字段');
      return;
    }
  
    if (!isValidEmail(commentEmail.value)) {
      alert('请输入有效的电子邮箱地址');
      return;
    }
  
    // In a real app, this would send the comment to the server
    alert('评论已提交，等待审核');
  
    // Clear form
    commentName.value = '';
    commentEmail.value = '';
    commentContent.value = '';
  };
  
  const likeComment = (index) => {
    if (publication.value.commentsList && publication.value.commentsList[index]) {
      publication.value.commentsList[index].likes++;
    }
  };
  
  const replyToComment = (index) => {
    if (!publication.value.commentsList) return;
    const commenterName = publication.value.commentsList[index]?.name;
    if (commenterName) {
      commentContent.value = `@${commenterName} `;
      
      // Focus on comment textarea
      nextTick(() => {
        const commentTextarea = document.getElementById('comment-content');
        if (commentTextarea) {
          commentTextarea.focus();
        }
      });
    }
  };
  
  const loadMoreComments = () => {
    // In a real app, this would load more comments from the server
    console.log('Loading more comments...');
  };
  
  const searchByTag = (tag) => {
    console.log(`Search by tag: ${tag}`);
    // In a real app, this would navigate to the publications page with the tag as a filter
    // router.push(`/publications?tag=${tag}`);
  };
  
  const shareOnSocial = (platform) => {
    if (!publication.value || !publication.value.title) return;
    
    const url = window.location.href;
    const title = publication.value.title;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };
  
  const shareByEmail = () => {
    if (!publication.value || !publication.value.title) return;
    
    const subject = encodeURIComponent(publication.value.title);
    const body = encodeURIComponent(`我想与你分享这篇文章：${publication.value.title}\n\n${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
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
  
  // Lifecycle hooks
  onMounted(() => {
    // 立即获取数据
    fetchPublicationData();
    
    // Add scroll event listener for reading progress
    window.addEventListener('scroll', updateReadingProgress);
    
    // Initialize reading progress
    updateReadingProgress();
  });
  
  onUnmounted(() => {
    // Remove scroll event listener
    window.removeEventListener('scroll', updateReadingProgress);
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
  
  /* Loading and Error States */
  .loading-container, .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5rem 0;
    text-align: center;
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
  
  .error-container svg {
    color: #f44336;
    margin-bottom: 1.5rem;
  }
  
  .error-container h2 {
    margin-bottom: 1rem;
    color: #f44336;
  }
  
  .error-container p {
    margin-bottom: 1.5rem;
    max-width: 500px;
  }
  
  .primary-button {
    background-color: var(--primary-color);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    font-weight: 500;
  }
  
  .primary-button:hover {
    background-color: var(--primary-dark);
  }
  
  /* Publication Hero */
  .publication-hero {
    background-size: cover;
    background-position: center;
    color: white;
    padding: 5rem 0 3rem;
    position: relative;
  }
  
  .publication-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8));
  }
  
  .publication-hero .container {
    position: relative;
    z-index: 1;
  }
  
  .publication-category-badge {
    display: inline-block;
    background-color: var(--accent-color);
    color: var(--text-primary);
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
  
  .publication-hero h1 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: white;
  }
  
  .publication-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .author-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .author-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
  }
  
  .author-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .author-details {
    display: flex;
    flex-direction: column;
  }
  
  .author-name {
    font-weight: 600;
    font-size: 1.1rem;
  }
  
  .publication-date {
    font-size: 0.9rem;
    opacity: 0.8;
  }
  
  .publication-stats {
    display: flex;
    gap: 1.5rem;
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
  }
  
  .publication-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .publication-tag {
    background-color: rgba(255, 255, 255, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-size: 0.8rem;
  }
  
  /* Publication Content */
  .publication-content {
    padding: 3rem 0;
  }
  
  .content-layout {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
  }
  
  .main-article {
    background-color: var(--background-white);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    overflow: hidden;
  }
  
  .article-summary {
    background-color: var(--background-light);
    padding: 2rem;
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--text-primary);
    border-bottom: 1px solid #eee;
  }
  
  .article-content {
    padding: 2rem;
  }
  
  .content-section {
    margin-bottom: 2.5rem;
  }
  
  .content-section:last-child {
    margin-bottom: 0;
  }
  
  .content-section h2 {
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    color: var(--primary-dark);
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
  }
  
  .section-image {
    margin: 1.5rem 0;
  }
  
  .section-image img {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius);
  }
  
  .image-caption {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
    text-align: center;
    font-style: italic;
  }
  
  .paragraph {
    margin-bottom: 1.5rem;
  }
  
  .paragraph:last-child {
    margin-bottom: 0;
  }
  
  .paragraph p {
    font-size: 1.05rem;
    line-height: 1.7;
  }
  
  /* References */
  .article-references {
    padding: 2rem;
    border-top: 1px solid #eee;
  }
  
  .article-references h2 {
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }
  
  .references-list {
    padding-left: 1.5rem;
  }
  
  .references-list li {
    margin-bottom: 1rem;
    font-size: 0.95rem;
    color: var(--text-secondary);
  }
  
  .references-list li a {
    display: block;
    margin-top: 0.25rem;
    word-break: break-all;
  }
  
  /* Author Bio */
  .author-bio {
    padding: 2rem;
    background-color: var(--background-light);
    border-top: 1px solid #eee;
    display: flex;
    gap: 1.5rem;
  }
  
  .author-bio .author-avatar {
    width: 100px;
    height: 100px;
    flex-shrink: 0;
  }
  
  .author-bio .author-details {
    flex: 1;
  }
  
  .author-bio h3 {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  
  .author-bio h4 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  .author-bio p {
    color: var(--text-secondary);
    font-size: 0.95rem;
  }
  
  /* Social Sharing */
  .social-sharing {
    padding: 2rem;
    border-top: 1px solid #eee;
  }
  
  .social-sharing h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  .sharing-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .share-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: var(--border-radius);
    font-weight: 500;
    color: white;
  }
  
  .share-button.facebook {
    background-color: #3b5998;
  }
  
  .share-button.twitter {
    background-color: #1da1f2;
  }
  
  .share-button.linkedin {
    background-color: #0077b5;
  }
  
  .share-button.email {
    background-color: #ea4335;
  }
  
  .share-button:hover {
    opacity: 0.9;
  }
  
  /* Comments Section */
  .comments-section {
    padding: 2rem;
    border-top: 1px solid #eee;
  }
  
  .comments-section h2 {
    margin-bottom: 2rem;
    font-size: 1.8rem;
  }
  
  .comment-form {
    background-color: var(--background-light);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    margin-bottom: 2rem;
  }
  
  .comment-form h3 {
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: var(--border-radius);
    font-family: inherit;
    font-size: 1rem;
  }
  
  .form-group textarea {
    resize: vertical;
  }
  
  .submit-comment {
    background-color: var(--primary-color);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    font-weight: 500;
  }
  
  .submit-comment:hover {
    background-color: var(--primary-dark);
  }
  
  .comments-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .comment {
    display: flex;
    gap: 1rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #eee;
  }
  
  .comment:last-child {
    border-bottom: none;
  }
  
  .comment-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
  }
  
  .comment-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .comment-content {
    flex: 1;
  }
  
  .comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  
  .commenter-name {
    font-weight: 600;
  }
  
  .comment-date {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  .comment-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .comment-action {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
  
  .comment-action:hover {
    color: var(--primary-color);
  }
  
  .load-more-comments {
    margin-top: 2rem;
    text-align: center;
  }
  
  .load-more-button {
    background-color: var(--background-light);
    color: var(--text-primary);
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    font-weight: 500;
    border: 1px solid #ddd;
  }
  
  .load-more-button:hover {
    background-color: #eee;
  }
  
  /* Sidebar */
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .sidebar-section {
    background-color: var(--background-white);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    overflow: hidden;
  }
  
  .sidebar-section h3 {
    padding: 1.5rem;
    background-color: var(--primary-color);
    color: white;
    font-size: 1.2rem;
  }
  
  .toc-section {
    position: sticky;
    top: 90px;
  }
  
  .toc-list {
    padding: 1.5rem;
    list-style: none;
  }
  
  .toc-list li {
    margin-bottom: 0.75rem;
  }
  
  .toc-list li:last-child {
    margin-bottom: 0;
  }
  
  .toc-list a {
    color: var(--text-primary);
    transition: var(--transition);
  }
  
  .toc-list a:hover {
    color: var(--primary-color);
    text-decoration: none;
  }
  
  .related-publications {
    padding: 1.5rem;
  }
  
  .related-publication {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
  }
  
  .related-publication:last-child {
    margin-bottom: 0;
  }
  
  .related-pub-image {
    width: 80px;
    height: 60px;
    border-radius: var(--border-radius);
    overflow: hidden;
    flex-shrink: 0;
  }
  
  .related-pub-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .related-pub-content {
    flex: 1;
  }
  
  .related-pub-content h4 {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
  
  .related-pub-author {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  .resources-list {
    padding: 1.5rem;
    list-style: none;
  }
  
  .resources-list li {
    margin-bottom: 1rem;
  }
  
  .resources-list li:last-child {
    margin-bottom: 0;
  }
  
  .resource-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--text-primary);
  }
  
  .resource-link:hover {
    color: var(--primary-color);
  }
  
  .tags-cloud {
    padding: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .tag-cloud-item {
    color: var(--primary-color);
    transition: var(--transition);
  }
  
  .tag-cloud-item:hover {
    color: var(--primary-dark);
    text-decoration: none;
  }
  
  /* Reading Progress */
  .reading-progress-section {
    position: sticky;
    top: 160px;
  }
  
  .reading-progress-container {
    height: 6px;
    background-color: #eee;
    border-radius: 3px;
    margin: 0 1.5rem 1rem;
    overflow: hidden;
  }
  
  .reading-progress-bar {
    height: 100%;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
  }
  
  .reading-progress-text {
    text-align: center;
    font-size: 0.9rem;
    color: var(--text-secondary);
    padding-bottom: 1.5rem;
  }
  
  /* More From Author */
  .more-from-author {
    padding: 4rem 0;
    background-color: var(--background-light);
  }
  
  .more-from-author h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
  }
  
  .author-publications {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
  }
  
  .author-pub-card {
    background-color: var(--background-white);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--box-shadow);
    transition: var(--transition);
    cursor: pointer;
  }
  
  .author-pub-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  .author-pub-image {
    height: 200px;
  }
  
  .author-pub-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .author-pub-content {
    padding: 1.5rem;
  }
  
  .author-pub-content h3 {
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
  }
  
  .author-pub-date {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }
  
  .author-pub-summary {
    color: var(--text-primary);
    font-size: 0.95rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* You May Also Like */
  .you-may-also-like {
    padding: 4rem 0;
    background-color: var(--background-white);
  }
  
  .you-may-also-like h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
  }
  
  .recommended-publications {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .recommended-pub-card {
    background-color: var(--background-light);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--box-shadow);
    transition: var(--transition);
    cursor: pointer;
  }
  
  .recommended-pub-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  .recommended-pub-image {
    position: relative;
    height: 150px;
  }
  
  .recommended-pub-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .recommended-pub-category {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 50px;
    font-size: 0.8rem;
  }
  
  .recommended-pub-content {
    padding: 1.5rem;
  }
  
  .recommended-pub-content h3 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  .recommended-pub-author, .recommended-pub-date {
    font-size: 0.9rem;
    color: var(--text-secondary);
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
  
  /* Back to Top Button */
  .back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background-color: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
    z-index: 99;
  }
  
  .back-to-top.visible {
    opacity: 1;
    visibility: visible;
  }
  
  .back-to-top:hover {
    background-color: var(--primary-dark);
    transform: translateY(-3px);
  }
  
  /* Responsive Styles */
  @media (max-width: 1024px) {
    .content-layout {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  
    .sidebar {
      order: 1;
    }
  
    .toc-section {
      position: static;
    }
  
    .author-publications {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
    
    .recommended-publications {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    }
  }
  
  @media (max-width: 768px) {
    .publication-hero h1 {
      font-size: 2rem;
    }
  
    .publication-meta {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .publication-stats {
      margin-top: 1rem;
    }
  
    .author-bio {
      flex-direction: column;
    }
  
    .newsletter-container {
      flex-direction: column;
      text-align: center;
    }
  
    .newsletter-form {
      width: 100%;
    }
  
    .author-publications, .recommended-publications {
      grid-template-columns: 1fr;
    }
    
    .sharing-buttons {
      justify-content: center;
    }
  }
  
  @media (max-width: 480px) {
    .publication-hero {
      padding: 3rem 0 2rem;
    }
  
    .publication-hero h1 {
      font-size: 1.5rem;
    }
  
    .sharing-buttons {
      flex-direction: column;
    }
  
    .share-button {
      width: 100%;
      justify-content: center;
    }
  
    .newsletter-form {
      flex-direction: column;
      gap: 0.5rem;
    }
  
    .subscribe-button {
      width: 100%;
      padding: 0.75rem 0;
    }
  
    .comment {
      flex-direction: column;
    }
  
    .comment-avatar {
      margin-bottom: 0.5rem;
    }
    
    .back-to-top {
      width: 40px;
      height: 40px;
      bottom: 1rem;
      right: 1rem;
    }
  }
  </style>