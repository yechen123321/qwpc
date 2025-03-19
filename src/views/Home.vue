<!-- HomePage.vue -->
<template>
  <div class="home-page">
    <!-- 导航头部 -->
    <header class="main-header">
      <div class="logo">
        <a href="/">
          <img style="width:180px;" src="../assets/logo.png" alt="地球编年史">
        </a>
      </div>
      <nav class="main-nav">
        <a href="/" class="nav-link active">首页</a>
        <a href="/library" class="nav-link">百科</a>
        <a href="#" class="nav-link">发现</a>
        <a href="/chat" class="nav-link">助手</a>
      </nav>
    </header>

    <!-- 英雄部分 -->
    <section class="hero-section">
      <div class="container">
        <h1>穿越地球历史的旅程</h1>
        <p class="hero-description">
          探索地球上生命引人入胜的故事，从最早的微生物到今日复杂的生态系统。
          了解地球生物多样性如何演化，以及塑造我们世界的环境变化。
        </p>
        <div class="hero-buttons">
          <button class="primary-button" @click="scrollToTimeline">探索时间线</button>
          <button class="secondary-button">了解保护工作</button>
        </div>
      </div>
    </section>

    <!-- 时间线介绍 -->
    <section class="timeline-intro">
      <div class="container">
        <div class="section-header">
          <h2>地球生命的历史</h2>
          <p>我们的互动时间线跨越了46亿年的地球历史，突出了塑造地球生物多样性的关键进化里程碑和环境事件。</p>
        </div>
        <div class="timeline-stats">
          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div class="stat-number">46亿</div>
            <div class="stat-description">地球历史年限</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.4 5.4 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.4 5.4 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.4 5.4 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <div class="stat-number">870万</div>
            <div class="stat-description">今日地球上的物种数量</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22c6.23-.05 11.25-7.27 9.61-13"></path>
                <path d="M8.5 17c1.5 1 3.5 1 5-1"></path>
                <path d="M15 8.5c1.5-1 3-1 4.5.5"></path>
                <path d="M13 2c-2.25-.5-5.25.5-9 5"></path>
                <path d="M13 2c1.38 2.5 2 5 1 8"></path>
                <path d="M13 10c-1.66.5-3.5.5-5.5-1"></path>
                <path d="M4 10c-.5 1.5-.5 3 .5 4.5"></path>
              </svg>
            </div>
            <div class="stat-number">5</div>
            <div class="stat-description">大规模灭绝事件</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 21h18"></path>
                <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
                <path d="M19 7V5a2 2 0 0 0-2-2h-2"></path>
                <path d="M13 3h-2"></path>
                <path d="M13 21v-9a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v9"></path>
                <path d="M21 21v-14a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v14"></path>
              </svg>
            </div>
            <div class="stat-number">4</div>
            <div class="stat-description">主要地质时代</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 互动时间线 -->
    <section id="timeline-section" class="timeline-section">
      <div class="container">
        <div class="timeline-controls">
          <button 
            v-for="era in eras" 
            :key="era.id" 
            @click="selectEra(era.id)"
            :class="['era-button', selectedEra === era.id ? 'active' : '']"
          >
            {{ era.name }}
          </button>
        </div>
        
        <div class="timeline-container">
          <div class="timeline-scale">
            <div class="scale-marker" v-for="marker in timelineMarkers" :key="marker.year">
              <div class="marker-line"></div>
              <div class="marker-label">{{ marker.label }}</div>
            </div>
          </div>
          
          <div class="timeline-visual">
            <div 
              v-for="era in eras" 
              :key="era.id"
              :class="['era-block', selectedEra === era.id ? 'active' : '']"
              :style="{ width: calculateEraWidth(era), backgroundColor: era.color }"
              @click="selectEra(era.id)"
            >
              <div class="era-name">{{ era.name }}</div>
            </div>
          </div>
          
          <!-- 时代详情与过渡动画 -->
          <Transition name="scale" mode="out-in">
            <div class="era-details" v-if="currentEra" key="era-details">
              <div class="era-header">
                <h3>{{ currentEra.name }} <span class="era-period">{{ currentEra.period }}</span></h3>
                <p class="era-description">{{ currentEra.description }}</p>
              </div>
              
              <div class="era-content">
                <div class="era-species">
                  <h4>代表性物种</h4>
                  <TransitionGroup name="scale" tag="div" class="species-grid">
                    <div class="species-card" v-for="species in currentEra.species" :key="species.id">
                      <div class="species-image">
                        <img :src="species.image" :alt="species.name">
                      </div>
                      <div class="species-info">
                        <h5>{{ species.name }}</h5>
                        <p class="species-scientific-name">{{ species.scientificName }}</p>
                        <p class="species-description">{{ species.description }}</p>
                      </div>
                    </div>
                  </TransitionGroup>
                </div>
                
                <div class="era-events">
                  <h4>关键环境事件</h4>
                  <TransitionGroup name="scale" tag="div" class="events-timeline">
                    <div class="event-item" v-for="event in currentEra.events" :key="event.id">
                      <div class="event-time">{{ event.time }}</div>
                      <div class="event-content">
                        <h5>{{ event.title }}</h5>
                        <p>{{ event.description }}</p>
                      </div>
                    </div>
                  </TransitionGroup>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>

    <!-- 生物多样性的重要性 -->
    <section class="biodiversity-section">
      <div class="container">
        <div class="section-header">
          <h2>为什么生物多样性重要</h2>
          <p>了解地球的生物历史有助于我们认识到保护今日生物多样性的重要性。</p>
        </div>
        
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <h3>生态系统稳定性</h3>
            <p>多样化的生态系统对环境变化更具韧性，能够更好地从干扰中恢复。</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
              </svg>
            </div>
            <h3>人类健康</h3>
            <p>生物多样性为医药、营养以及清洁的空气和水提供了重要资源。</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3>气候调节</h3>
            <p>多样化的生态系统通过储存碳和缓解极端天气事件来帮助调节气候。</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3>科学知识</h3>
            <p>研究生物多样性为进化、适应和新技术的开发提供了深刻见解。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 保护行动号召 -->
    <section class="conservation-cta">
      <div class="container">
        <div class="cta-content">
          <h2>加入我们的保护工作</h2>
          <p>帮助保护地球的生物多样性，为子孙后代守护自然。了解保护倡议以及您如何做出贡献。</p>
          <button class="primary-button">参与其中</button>
        </div>
        <div class="cta-image">
          <img src="../assets/2.svg" alt="保护工作">
        </div>
      </div>
    </section>

    <!-- 教育资源 -->
    <section class="resources-section">
      <div class="container">
        <div class="section-header">
          <h2>教育资源</h2>
          <p>探索我们关于地球生物历史和保护的文章、视频和互动材料的收藏。</p>
        </div>
        
        <div class="resources-grid">
          <div class="resource-card">
            <div class="resource-image">
              <img src="../assets/2.svg" alt="文章">
              <div class="resource-type">文章</div>
            </div>
            <div class="resource-content">
              <h3>五大灭绝事件</h3>
              <p>了解五次大规模灭绝事件如何显著改变了地球上的生命。</p>
              <a href="#" class="resource-link">阅读更多 →</a>
            </div>
          </div>
          <div class="resource-card">
            <div class="resource-image">
              <img src="../assets/2.svg" alt="视频">
              <div class="resource-type">视频</div>
            </div>
            <div class="resource-content">
              <h3>哺乳动物的进化</h3>
              <p>观看哺乳动物如何从小型夜行生物进化成遍布全球的多样物种。</p>
              <a href="#" class="resource-link">立即观看 →</a>
            </div>
          </div>
          <div class="resource-card">
            <div class="resource-image">
              <img src="../assets/2.svg" alt="互动">
              <div class="resource-type">互动</div>
            </div>
            <div class="resource-content">
              <h3>气候变化模拟器</h3>
              <p>探索不同因素如何随时间影响地球的气候和生物多样性。</p>
              <a href="#" class="resource-link">尝试一下 →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 通讯订阅 -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-container">
          <div class="newsletter-content">
            <h2>保持更新</h2>
            <p>订阅我们的通讯，获取最新的研究、保护新闻和教育资源。</p>
          </div>
          <div class="newsletter-form">
            <input type="email" placeholder="您的电子邮件地址" v-model="emailInput">
            <button @click="subscribeNewsletter" class="subscribe-button">订阅</button>
          </div>
          <p class="privacy-note">我们尊重您的隐私，绝不分享您的信息。</p>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="main-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>地球编年史</h3>
            <p>探索地球的生物历史并推动保护工作</p>
            <div class="social-icons">
              <a href="#" class="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" class="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497 -3.753C20.18 7.773 21.692 5.25 22 4.009z"></path>
                </svg>
              </a>
              <a href="#" class="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" class="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
          <div class="footer-section">
            <h4>探索</h4>
            <ul>
              <li><a href="#">时间线</a></li>
              <li><a href="#">物种数据库</a></li>
              <li><a href="#">地质时代</a></li>
              <li><a href="#">保护</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>资源</h4>
            <ul>
              <li><a href="#">文章</a></li>
              <li><a href="#">视频</a></li>
              <li><a href="#">互动工具</a></li>
              <li><a href="#">教育材料</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>联系我们</h4>
            <ul>
              <li><a href="#">关于我们</a></li>
              <li><a href="#">联系方式</a></li>
              <li><a href="#">志愿者</a></li>
              <li><a href="#">捐款</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© {{ new Date().getFullYear() }} 地球编年史。保留所有权利。</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// 状态
const emailInput = ref('');
const selectedEra = ref('cenozoic');
const timelineMarkers = ref([
  { year: 4600, label: '46亿年前' },
  { year: 3500, label: '35亿年前' },
  { year: 2500, label: '25亿年前' },
  { year: 541, label: '5.41亿年前' },
  { year: 252, label: '2.52亿年前' },
  { year: 66, label: '6600万年前' },
  { year: 0, label: '现在' },
]);

// 时代数据
const eras = ref([
  {
    id: 'precambrian',
    name: '前寒武纪',
    period: '46亿年前 - 5.41亿年前',
    color: '#8C6BB1',
    startYear: 4600,
    endYear: 541,
    description: '前寒武纪涵盖了地球历史的约88%。这一时期见证了地球的形成、大陆、海洋、大气的出现，以及最早的生命形式——简单的单细胞生物，后来演化为更复杂的形态。',
    species: [
      {
        id: 'stromatolites',
        name: '叠层石',
        scientificName: '多种蓝细菌',
        image: '../assets/2.svg?height=200&width=200',
        description: '由光合蓝细菌群落形成的层状结构。它们是地球上最古老的生命证据之一，可追溯到超过35亿年前。',
      },
      {
        id: 'ediacaran',
        name: '埃迪卡拉生物群',
        scientificName: '多种软体生物',
        image: '../assets/2.svg?height=200&width=200',
        description: '大约5.75亿年前出现的神秘软体生物。它们代表了地球历史上首批复杂的多细胞生物。',
      },
      {
        id: 'cloudina',
        name: '克劳迪纳',
        scientificName: 'Cloudina hartmannae',
        image: '../assets/2.svg?height=200&width=200',
        description: '首批产生矿化骨骼的动物之一，出现于约5.5亿年前。这些小型管状化石标志着重要的进化里程碑。',
      },
    ],
    events: [
      {
        id: 'earth-formation',
        time: '46亿年前',
        title: '地球形成',
        description: '地球从太阳星云中形成，太阳星云是太阳形成后留下的气体和尘埃盘。',
      },
      {
        id: 'first-oceans',
        time: '44亿年前',
        title: '首批海洋形成',
        description: '随着地球冷却，水蒸气凝结形成首批海洋，为生命最终出现创造了环境。',
      },
      {
        id: 'first-life',
        time: '约35亿年前',
        title: '首批生命出现',
        description: '简单的单细胞原核生物出现，可能在海洋中的热液喷口附近。',
      },
      {
        id: 'oxygen-revolution',
        time: '24亿 - 20亿年前',
        title: '大氧化事件',
        description: '光合蓝细菌将氧气作为废物产生，逐渐改变了地球的大气，使需氧生命得以进化。',
      },
      {
        id: 'multicellular',
        time: '约15亿年前',
        title: '首批多细胞生物',
        description: '细胞开始合作并特化，导致首批简单的多细胞生物出现。',
      },
    ],
  },
  {
    id: 'paleozoic',
    name: '古生代',
    period: '5.41亿年前 - 2.52亿年前',
    color: '#41AB5D',
    startYear: 541,
    endYear: 252,
    description: '古生代见证了生命形式的爆发，包括首批鱼类、陆地植物、昆虫和爬行动物。它始于寒武纪大爆发，复杂的生命迅速多样化，并以地球历史上最大的大规模灭绝事件结束。',
    species: [
      {
        id: 'trilobite',
        name: '三叶虫',
        scientificName: '三叶虫门',
        image: '../assets/2.svg?height=200&width=200',
        description: '海洋节肢动物，在早古生代海洋中占主导地位。它们是当时最成功和多样化的群体之一，已知有超过20,000种。',
      },
      {
        id: 'dunkleosteus',
        name: '邓氏鱼',
        scientificName: 'Dunkleosteus terrelli',
        image: '../assets/2.svg?height=200&width=200',
        description: '晚泥盆纪的一种巨大装甲鱼，体长可达6米。它是首批脊椎动物顶级掠食者之一。',
      },
      {
        id: 'meganeura',
        name: '巨脉蜻蜓',
        scientificName: 'Meganeura monyi',
        image: '../assets/2.svg?height=200&width=200',
        description: '一种巨型蜻蜓状昆虫，翼展可达65厘米。它生活在石炭纪，当时氧气水平远高于今天。',
      },
      {
        id: 'dimetrodon',
        name: '异齿龙',
        scientificName: 'Dimetrodon limbatus',
        image: '../assets/2.svg?height=200&width=200',
        description: '常被误认为是恐龙，这种背帆爬行动物实际上与哺乳动物更接近。它生活在二叠纪。',
      },
    ],
    events: [
      {
        id: 'cambrian-explosion',
        time: '5.41亿 - 5.30亿年前',
        title: '寒武纪大爆发',
        description: '一个相对较短的时期，大多数主要动物门类在化石记录中出现。复杂生命在此期间迅速多样化。',
      },
      {
        id: 'land-plants',
        time: '约4.7亿年前',
        title: '首批陆地植物',
        description: '类似苔藓和地钱这样的简单植物开始在陆地上定居，最终发展成森林。',
      },
      {
        id: 'vertebrates-land',
        time: '约3.75亿年前',
        title: '脊椎动物登陆',
        description: '鱼类进化成四足动物，四肢脊椎动物能够冒险登陆，导致两栖动物和最终爬行动物的出现。',
      },
      {
        id: 'coal-forests',
        time: '3.60亿 - 3亿年前',
        title: '石炭纪煤林',
        description: '热带陆地上覆盖着巨大的沼泽森林，最终形成了煤层。地球历史上的氧气水平达到最高。',
      },
      {
        id: 'permian-extinction',
        time: '2.52亿年前',
        title: '二叠纪-三叠纪灭绝',
        description: '地球历史上最大的大规模灭绝事件，消灭了约96%的海洋物种和70%的陆地脊椎动物物种。可能是由西伯利亚的大规模火山喷发引起的。',
      },
    ],
  },
  {
    id: 'mesozoic',
    name: '中生代',
    period: '2.52亿年前 - 6600万年前',
    color: '#E6550D',
    startYear: 252,
    endYear: 66,
    description: '常被称为“恐龙时代”，中生代见证了这些标志性爬行动物的兴衰。它还见证了首批哺乳动物、鸟类和开花植物的出现，以及超大陆盘古大陆的解体。',
    species: [
      {
        id: 'tyrannosaurus',
        name: '霸王龙',
        scientificName: 'Tyrannosaurus rex',
        image: '../assets/2.svg?height=200&width=200',
        description: '最大的肉食性恐龙之一，生活在白垩纪末期。这种顶级掠食者可长到12米长，拥有强大的下颚和碎骨牙齿。',
      },
      {
        id: 'stegosaurus',
        name: '剑龙',
        scientificName: 'Stegosaurus stenops',
        image: '../assets/2.svg?height=200&width=200',
        description: '晚侏罗纪的大型植食性恐龙，以其背部独特的板状结构和用于防御的尖尾而闻名。',
      },
      {
        id: 'archaeopteryx',
        name: '始祖鸟',
        scientificName: 'Archaeopteryx lithographica',
        image: '../assets/2.svg?height=200&width=200',
        description: '恐龙与鸟类之间的过渡物种，显示出两者的特征。它生活在晚侏罗纪，为进化提供了重要证据。',
      },
      {
        id: 'ichthyosaur',
        name: '鱼龙',
        scientificName: '鱼龙目',
        image: '../assets/2.svg?height=200&width=200',
        description: '通过趋同进化形成鱼类体型的海洋爬行动物。它们高度适应水生生活，一些物种在水中直接产下活仔。',
      },
    ],
    events: [
      {
        id: 'pangaea-breakup',
        time: '2亿 - 1.45亿年前',
        title: '盘古大陆解体',
        description: '超大陆盘古大陆开始分裂，最终形成了我们今天所知的各大洲。这创造了新的栖息地并影响了进化。',
      },
      {
        id: 'first-mammals',
        time: '约2.25亿年前',
        title: '首批哺乳动物出现',
        description: '小型夜行动物从爬行动物祖先进化而来。它们在恐龙灭绝之前一直相对低调。',
      },
      {
        id: 'first-birds',
        time: '约1.5亿年前',
        title: '首批鸟类进化',
        description: '鸟类从小型兽脚类恐龙进化而来，始祖鸟代表了早期的过渡形态。',
      },
      {
        id: 'flowering-plants',
        time: '约1.3亿年前',
        title: '开花植物出现',
        description: '被子植物（开花植物）出现并迅速多样化，最终成为主要植物群体，并与许多动物传粉者形成共进化关系。',
      },
      {
        id: 'kt-extinction',
        time: '6600万年前',
        title: '白垩纪-古近纪灭绝',
        description: '一颗小行星撞击尤卡坦半岛引发了大规模灭绝，消灭了所有非鸟类恐龙和许多其他物种，为哺乳动物多样化开辟了生态位。',
      },
    ],
  },
  {
    id: 'cenozoic',
    name: '新生代',
    period: '6600万年前 - 现在',
    color: '#3182BD',
    startYear: 66,
    endYear: 0,
    description: '“哺乳动物时代”，新生代以恐龙灭绝后哺乳动物、鸟类和开花植物的多样化为特征。它见证了灵长类动物（包括人类）的进化，以及包括多次冰期在内的剧烈气候变化。',
    species: [
      {
        id: 'mammoth',
        name: '猛犸象',
        scientificName: 'Mammuthus primigenius',
        image: '../assets/2.svg?height=200&width=200',
        description: '冰期哺乳动物，与现代大象有关，适应寒冷环境，长有长毛和弯曲的象牙。它们在大约4000年前灭绝。',
      },
      {
        id: 'megalodon',
        name: '巨齿鲨',
        scientificName: 'Otodus megalodon',
        image: '../assets/2.svg?height=200&width=200',
        description: '有史以来最大的鲨鱼，体长可达18米。这种顶级掠食者在2300万至360万年前主宰了海洋。',
      },
      {
        id: 'smilodon',
        name: '剑齿猫',
        scientificName: 'Smilodon fatalis',
        image: '../assets/2.svg?height=200&width=200',
        description: '冰期的标志性掠食者，拥有长长的犬齿。它在美洲猎食大型食草动物，直到大约1万年前灭绝。',
      },
      {
        id: 'homo',
        name: '早期人类',
        scientificName: '人属物种',
        image: '../assets/2.svg?height=200&width=200',
        description: '各种人类物种在非洲进化并扩散到全球。智人约30万年前出现，最终成为唯一幸存的人类物种。',
      },
    ],
    events: [
      {
        id: 'mammal-radiation',
        time: '6600万 - 5600万年前',
        title: '哺乳动物适应性辐射',
        description: '恐龙灭绝后，哺乳动物迅速多样化，填补了空缺的生态位，进化出许多新形态和体型。',
      },
      {
        id: 'himalaya-formation',
        time: '5000万 - 4000万年前',
        title: '喜马拉雅山形成',
        description: '印度板块与欧亚板块碰撞，开始形成喜马拉雅山脉，影响了全球气候模式。',
      },
      {
        id: 'antarctica-ice',
        time: '约3400万年前',
        title: '南极冰盖形成',
        description: '随着全球气温下降，南极洲被冰盖覆盖，标志着向现代气候的重大转变。',
      },
      {
        id: 'grasslands-spread',
        time: '约2500万年前',
        title: '草原扩展',
        description: '草原在全球范围内扩展，导致食草动物的进化和新生态系统的形成。',
      },
      {
        id: 'ice-ages',
        time: '260万 - 1.17万年前',
        title: '更新世冰期',
        description: '一系列冰川期，冰盖在北美和欧亚大陆反复前进和后退，推动了迁徙和灭绝。',
      },
      {
        id: 'human-agriculture',
        time: '约1.2万年前',
        title: '农业发展',
        description: '人类开始驯化植物和动物，导致定居文明的出现，并最终改变了地球表面的大部分。',
      },
      {
        id: 'anthropocene',
        time: '现在',
        title: '人类世',
        description: '当前的地质时代，非正式定义为人类活动显著影响地球地质和生态系统的时期。',
      },
    ],
  },
]);

// 计算属性
const currentEra = computed(() => {
  return eras.value.find(era => era.id === selectedEra.value);
});

// 方法
const calculateEraWidth = (era) => {
  const totalYears = 4600;
  const eraSpan = era.startYear - era.endYear;
  const percentage = (eraSpan / totalYears) * 100;
  return `${percentage}%`;
};

const selectEra = (eraId) => {
  selectedEra.value = eraId;
};

const scrollToTimeline = () => {
  document.getElementById('timeline-section').scrollIntoView({ behavior: 'smooth' });
};

const subscribeNewsletter = () => {
  if (emailInput.value && emailInput.value.includes('@')) {
    alert(`感谢您使用 ${emailInput.value} 订阅！`);
    emailInput.value = '';
  } else {
    alert('请输入有效的电子邮件地址');
  }
};
</script>

<style>
/* 基础样式 */
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
  
  /* 时代颜色 */
  --precambrian-color: #8C6BB1;
  --paleozoic-color: #41AB5D;
  --mesozoic-color: #E6550D;
  --cenozoic-color: #3182BD;
  
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

h1, h2, h3, h4, h5 {
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

/* 头部样式 */
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

/* 英雄部分 */
.hero-section {
  background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: white;
}

.hero-description {
  max-width: 800px;
  margin: 0 auto 2rem;
  font-size: 1.2rem;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.primary-button {
  background-color: var(--accent-color);
  color: var(--text-primary);
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
}

.primary-button:hover {
  background-color: #ffb300;
  transform: translateY(-2px);
}

.secondary-button {
  background-color: transparent;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  border: 2px solid white;
}

.secondary-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* 部分标题 */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.section-header p {
  max-width: 700px;
  margin: 0 auto;
  color: var(--text-secondary);
  font-size: 1.1rem;
}

/* 时间线介绍 */
.timeline-intro {
  padding: 5rem 0 3rem;
  background-color: var(--background-white);
}

.timeline-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.stat-card {
  text-align: center;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  background-color: var(--background-light);
  transition: var(--transition);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--box-shadow);
}

.stat-icon {
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--primary-dark);
}

.stat-description {
  color: var(--text-secondary);
}

/* 时间线部分 */
.timeline-section {
  padding: 3rem 0 5rem;
  background-color: var(--background-light);
}

.timeline-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.era-button {
  padding: 0.75rem 1.5rem;
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  font-weight: 500;
  color: var(--text-primary);
  transition: var(--transition);
}

.era-button:hover {
  transform: translateY(-3px);
  box-shadow: var(--box-shadow);
}

.era-button.active {
  background-color: var(--primary-color);
  color: white;
}

.timeline-container {
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
}

.timeline-scale {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  position: relative;
}

.scale-marker {
  text-align: center;
  position: relative;
  flex: 1;
}

.marker-line {
  height: 12px;
  width: 2px;
  background-color: var(--text-secondary);
  margin: 0 auto 0.5rem;
}

.marker-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  transform: rotate(-45deg);
  transform-origin: top left;
  position: absolute;
  white-space: nowrap;
}

.timeline-visual {
  display: flex;
  height: 60px;
  margin-bottom: 2rem;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.era-block {
  height: 100%;
  position: relative;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.era-block:hover {
  transform: translateY(-3px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.era-block.active {
  height: 70px;
  margin-top: -5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 20;
}

.era-name {
  color: white;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  font-size: 0.9rem;
}

/* 动画定义 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.scale-leave-to {
  opacity: 0;
  transform: scale(1.2);
}

.scale-move {
  transition: transform 0.5s ease;
}

/* 确保文本缩放时保持可读性 */
.event-item, .species-card {
  transform-origin: center;
}

/* 时代详情（保持原有样式，调整为支持动画） */
.era-details {
  margin-top: 2rem;
}

.era-header {
  margin-bottom: 2rem;
}

.era-header h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--primary-dark);
}

.era-period {
  font-size: 1.2rem;
  font-weight: normal;
  color: var(--text-secondary);
  margin-left: 1rem;
}

.era-description {
  color: var(--text-primary);
  font-size: 1.1rem;
  line-height: 1.7;
}

.era-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 768px) {
  .era-content {
    grid-template-columns: 1fr 1fr;
  }
}

.era-species h4,
.era-events h4 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-dark);
}

.species-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.species-card {
  display: flex;
  background-color: var(--background-light);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: var(--transition);
}

.species-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--box-shadow);
}

.species-image {
  width: 100px;
  min-width: 100px;
  height: 100px;
}

.species-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.species-info {
  padding: 1rem;
}

.species-info h5 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.species-scientific-name {
  font-style: italic;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.species-description {
  font-size: 0.9rem;
  color: var(--text-primary);
}

.events-timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.event-item {
  display: flex;
  gap: 1.5rem;
}

.event-time {
  min-width: 120px;
  font-weight: 600;
  color: var(--primary-color);
}

.event-content h5 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.event-content p {
  font-size: 0.9rem;
  color: var(--text-primary);
}

/* 生物多样性部分 */
.biodiversity-section {
  padding: 5rem 0;
  background-color: var(--background-white);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.benefit-card {
  padding: 2rem;
  background-color: var(--background-light);
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--box-shadow);
}

.benefit-icon {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.benefit-card h3 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.benefit-card p {
  color: var(--text-secondary);
}

/* 保护行动号召 */
.conservation-cta {
  padding: 5rem 0;
  background-color: var(--background-light);
}

.conservation-cta .container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 768px) {
  .conservation-cta .container {
    grid-template-columns: 1fr 1fr;
  }
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.cta-content p {
  margin-bottom: 2rem;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.cta-image img {
  width: 100%;
  height: auto;
  border-radius: var(--border-radius);
}

/* 资源部分 */
.resources-section {
  padding: 5rem 0;
  background-color: var(--background-white);
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.resource-card {
  background-color: var(--background-light);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: var(--transition);
}

.resource-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--box-shadow);
}

.resource-image {
  position: relative;
  height: 180px;
}

.resource-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.resource-type {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
}

.resource-content {
  padding: 1.5rem;
}

.resource-content h3 {
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.resource-content p {
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
}

.resource-link {
  color: var(--primary-color);
  font-weight: 500;
}

.resource-link:hover {
  text-decoration: underline;
}

/* 通讯部分 */
.newsletter-section {
  padding: 5rem 0;
}

.newsletter-container {
  background-color: var(--primary-color);
  padding: 3rem;
  border-radius: var(--border-radius);
  color: white;
  text-align: center;
}

.newsletter-content {
  max-width: 600px;
  margin: 0 auto 2rem;
}

.newsletter-content h2 {
  color: white;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.newsletter-form {
  display: flex;
  max-width: 500px;
  margin: 0 auto 1rem;
}

.newsletter-form input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  font-size: 1rem;
}

.subscribe-button {
  background-color: var(--accent-color);
  color: var(--text-primary);
  padding: 0 1.5rem;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  font-weight: 500;
}

.subscribe-button:hover {
  background-color: #ffb300;
}

.privacy-note {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* 页脚 */
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

.social-icons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  transition: var(--transition);
}

.social-icon:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
  text-decoration: none;
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

/* 响应式样式 */
@media (max-width: 1024px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .era-header h3 {
    font-size: 1.75rem;
  }
  
  .era-period {
    display: block;
    margin-left: 0;
    margin-top: 0.5rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 0;
  }
  
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .timeline-scale .marker-label {
    font-size: 0.7rem;
  }
  
  .era-name {
    font-size: 0.8rem;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .newsletter-form input {
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
  }
  
  .subscribe-button {
    border-radius: var(--border-radius);
    padding: 0.75rem 0;
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
  
  .section-header h2 {
    font-size: 1.75rem;
  }
  
  .timeline-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .timeline-scale {
    display: none;
  }
  
  .era-block .era-name {
    display: none;
  }
  
  .event-item {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .event-time {
    min-width: auto;
  }
  
  .species-card {
    flex-direction: column;
  }
  
  .species-image {
    width: 100%;
    height: 150px;
  }
  
  .newsletter-container {
    padding: 2rem 1rem;
  }
}
</style>