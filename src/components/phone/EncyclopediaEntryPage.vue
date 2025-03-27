<template>
    <div class="encyclopedia-entry" :class="{ 'dark-mode': isDarkMode }">
      <!-- Header Section -->
      <header class="entry-header">
        <div class="header-top">
          <button class="icon-btn back-btn" @click="goBack">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
          </button>
          <div class="header-actions">
            <button class="icon-btn" @click="toggleBookmark">
              <svg v-if="isBookmarked" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
            </button>
            <button class="icon-btn" @click="toggleShare">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" x2="12" y1="2" y2="15"></line></svg>
            </button>
            <button class="icon-btn" @click="toggleDarkMode">
              <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
            </button>
          </div>
        </div>
        
        <div class="title-container">
          <div class="category-badge">{{ entry.category }}</div>
          <h1 class="entry-title">{{ entry.title }}</h1>
          <p class="entry-subtitle">{{ entry.subtitle }}</p>
        </div>
      </header>
      
      <!-- Main Content -->
      <main class="entry-content">
        <!-- Hero Image -->
        <div class="hero-image-container" @click="openGallery(0)">
          <img :src="entry.heroImage" :alt="entry.title" class="hero-image">
          <div class="image-caption">{{ entry.heroImageCaption }}</div>
        </div>
        
        <!-- Quick Facts -->
        <div class="quick-facts-card">
          <h3 class="section-title">快速了解</h3>
          <div class="facts-grid">
            <div v-for="(fact, index) in entry.quickFacts" :key="index" class="fact-item">
              <div class="fact-label">{{ fact.label }}</div>
              <div class="fact-value">{{ fact.value }}</div>
            </div>
          </div>
        </div>
        
        <!-- Table of Contents -->
        <div class="toc-container">
          <div class="toc-header" @click="toggleToc">
            <h3 class="section-title">目录</h3>
            <button class="icon-btn">
              <svg v-if="!isTocExpanded" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"></path></svg>
            </button>
          </div>
          <div class="toc-links" v-if="isTocExpanded">
            <a 
              v-for="(section, index) in entry.sections" 
              :key="index" 
              :href="'#section-' + index" 
              class="toc-link"
              @click.prevent="scrollToSection('section-' + index)"
            >
              {{ section.title }}
            </a>
          </div>
        </div>
        
        <!-- Content Sections -->
        <div class="content-sections">
          <div 
            v-for="(section, index) in entry.sections" 
            :key="index" 
            :id="'section-' + index" 
            class="content-section"
          >
            <h2 class="section-title">{{ section.title }}</h2>
            
            <!-- Text Content -->
            <div class="section-content" v-html="section.content"></div>
            
            <!-- Section Images -->
            <div v-if="section.images && section.images.length" class="section-images">
              <div class="image-gallery">
                <div 
                  v-for="(image, imgIndex) in section.images" 
                  :key="imgIndex" 
                  class="gallery-image-container"
                  @click="openGallery(getGalleryIndex(index, imgIndex))"
                >
                  <img :src="image.url" :alt="image.caption" class="gallery-image">
                </div>
              </div>
              <div class="gallery-caption">{{ section.imageCaption || '点击查看更多图片' }}</div>
            </div>
            
            <!-- Expandable Subsections -->
            <div v-if="section.subsections && section.subsections.length" class="subsections">
              <div 
                v-for="(subsection, subIndex) in section.subsections" 
                :key="subIndex" 
                class="subsection"
              >
                <div 
                  class="subsection-header" 
                  @click="toggleSubsection(index, subIndex)"
                >
                  <h3 class="subsection-title">{{ subsection.title }}</h3>
                  <button class="icon-btn">
                    <svg v-if="!isSubsectionExpanded(index, subIndex)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"></path></svg>
                  </button>
                </div>
                <div 
                  v-if="isSubsectionExpanded(index, subIndex)" 
                  class="subsection-content"
                  v-html="subsection.content"
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- References -->
        <div class="references-section" v-if="entry.references && entry.references.length">
          <h2 class="section-title">参考资料</h2>
          <div class="references-list">
            <div 
              v-for="(reference, index) in entry.references" 
              :key="index" 
              class="reference-item"
            >
              <div class="reference-number">{{ index + 1 }}</div>
              <div class="reference-content">
                <div class="reference-text">{{ reference.text }}</div>
                <a v-if="reference.url" :href="reference.url" class="reference-link" target="_blank">
                  {{ reference.urlText || '查看来源' }}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Related Entries -->
        <div class="related-entries" v-if="entry.relatedEntries && entry.relatedEntries.length">
          <h2 class="section-title">相关条目</h2>
          <div class="related-entries-grid">
            <div 
              v-for="(relatedEntry, index) in entry.relatedEntries" 
              :key="index" 
              class="related-entry-card"
              @click="navigateToEntry(relatedEntry.id)"
            >
              <div class="related-entry-image">
                <img :src="relatedEntry.image" :alt="relatedEntry.title">
              </div>
              <div class="related-entry-info">
                <div class="related-entry-title">{{ relatedEntry.title }}</div>
                <div class="related-entry-category">{{ relatedEntry.category }}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <!-- Footer -->
      <footer class="entry-footer">
        <div class="footer-content">
          <div class="last-updated">最后更新: {{ formatDate(entry.lastUpdated) }}</div>
          <div class="footer-actions">
            <button class="action-btn edit-btn" @click="suggestEdit">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
              建议编辑
            </button>
            <button class="action-btn report-btn" @click="reportIssue">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
              报告问题
            </button>
          </div>
        </div>
      </footer>
      
      <!-- Back to Top Button -->
      <button 
        class="back-to-top" 
        :class="{ 'visible': showBackToTop }"
        @click="scrollToTop"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"></path></svg>
      </button>
      
      <!-- Share Modal -->
      <div class="modal-overlay" v-if="showShareModal" @click="toggleShare">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3>分享条目</h3>
            <button class="close-btn" @click="toggleShare">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          <div class="modal-content">
            <div class="share-options">
              <button class="share-option">
                <div class="share-icon wechat">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path><path d="M5 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1"></path></svg>
                </div>
                <span>微信</span>
              </button>
              <button class="share-option">
                <div class="share-icon weibo">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </div>
                <span>微博</span>
              </button>
              <button class="share-option">
                <div class="share-icon qq">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </div>
                <span>QQ</span>
              </button>
              <button class="share-option">
                <div class="share-icon copy">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
                </div>
                <span>复制链接</span>
              </button>
            </div>
            <div class="share-link-container">
              <input type="text" readonly :value="shareUrl" class="share-link-input">
              <button class="copy-btn" @click="copyShareLink">复制</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Image Gallery Modal -->
      <div class="gallery-modal" v-if="showGallery" @click="closeGallery">
        <div class="gallery-header">
          <div class="gallery-counter">{{ currentGalleryIndex + 1 }} / {{ allImages.length }}</div>
          <button class="close-btn" @click="closeGallery">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </div>
        <div class="gallery-content" @click.stop>
          <button class="gallery-nav prev" @click.stop="prevImage" v-if="currentGalleryIndex > 0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
          </button>
          
          <div class="gallery-image-wrapper" @click.stop>
            <img :src="currentGalleryImage.url" :alt="currentGalleryImage.caption" class="gallery-full-image">
          </div>
          
          <button class="gallery-nav next" @click.stop="nextImage" v-if="currentGalleryIndex < allImages.length - 1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
          </button>
        </div>
        <div class="gallery-caption" v-if="currentGalleryImage.caption">
          {{ currentGalleryImage.caption }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  
  // State
  const isDarkMode = ref(false);
  const isBookmarked = ref(false);
  const isTocExpanded = ref(false);
  const expandedSubsections = ref({});
  const showBackToTop = ref(false);
  const showShareModal = ref(false);
  const showGallery = ref(false);
  const currentGalleryIndex = ref(0);
  
  // Mock data for the encyclopedia entry
  const entry = ref({
    id: 'giant-panda',
    title: '大熊猫',
    subtitle: 'Ailuropoda melanoleuca，中国特有的珍稀濒危物种',
    category: '哺乳动物',
    heroImage: 'src/assets/panda.png',
    heroImageCaption: '大熊猫在四川卧龙自然保护区的竹林中',
    lastUpdated: '2023-11-15',
    quickFacts: [
      { label: '学名', value: 'Ailuropoda melanoleuca' },
      { label: '保护状态', value: '易危 (IUCN)' },
      { label: '分布', value: '中国四川、陕西、甘肃' },
      { label: '栖息地', value: '温带森林' },
      { label: '体重', value: '70-120公斤' },
      { label: '寿命', value: '15-20年 (野外)' }
    ],
    sections: [
      {
        title: '简介',
        content: `
          <p>大熊猫（学名：<em>Ailuropoda melanoleuca</em>）是一种原产于中国中部山区的熊科动物，以其独特的黑白相间的毛色而闻名于世。它们主要分布在中国四川、陕西和甘肃省的山区森林中，栖息于海拔1,200至3,500米的地区。</p>
          <p>大熊猫是中国的国宝，也是世界自然基金会（WWF）的标志性动物。由于栖息地丧失和破碎化，大熊猫曾一度濒临灭绝。经过数十年的保护努力，大熊猫的野外种群数量已经有所回升，但仍然被列为易危物种。</p>
        `,
        images: [
          { url: 'src/assets/pamdaeat.png', caption: '大熊猫在竹林中觅食' },
          { url: 'src/assets/pamdaeat.png', caption: '大熊猫幼崽在保护中心玩耍' }
        ],
        imageCaption: '大熊猫在自然栖息地和保护中心的生活场景'
      },
      {
        title: '形态特征',
        content: `
          <p>大熊猫是中型熊类，成年大熊猫体长约120-180厘米，体重约70-120公斤。它们最显著的特征是黑白相间的毛色：眼睛周围、耳朵、四肢和肩部为黑色，其余部分为白色。这种独特的毛色可能有助于它们在雪地和阴影交错的竹林中进行伪装。</p>
          <p>大熊猫的头部圆而大，有着圆形的面部轮廓和短吻部。它们的耳朵相对较小而圆，眼睛较小。大熊猫的牙齿和消化系统与其他熊类相似，但它们的前掌有一个特殊的"伪拇指"——实际上是腕骨的延伸，这使它们能够更有效地抓握竹子。</p>
        `,
        images: [
          { url: 'src/assets/pandaface.png', caption: '大熊猫的特写，展示其独特的面部特征' },
          { url: 'src/assets/pandafinger.png', caption: '大熊猫的"伪拇指"使其能够有效抓握竹子' }
        ]
      },
      {
        title: '生态与行为',
        content: `
          <p>大熊猫主要是独居动物，每只大熊猫都有自己的领地。它们主要在黎明、黄昏和夜间活动，白天大部分时间用于休息和睡眠。大熊猫的日常活动主要包括觅食和休息，它们每天大约有10-16小时用于进食。</p>
          <p>尽管大熊猫属于食肉目，但它们的饮食主要由竹子构成，约占其饮食的99%。大熊猫每天需要消耗大量竹子（约9-14公斤）来满足其营养需求。除竹子外，它们偶尔也会食用其他植物、小型哺乳动物、鸟类和鱼类。</p>
        `,
        subsections: [
          {
            title: '繁殖与发育',
            content: `
              <p>大熊猫的繁殖期通常在每年的3月至5月。雌性大熊猫每2-3年发情一次，发情期仅持续2-3天。这种短暂的发情期是大熊猫繁殖困难的主要原因之一。</p>
              <p>怀孕期约为3-5个月，雌性大熊猫通常会生产1-2只幼崽，但通常只有一只能够存活。新生幼崽非常小，体重仅约100克，相当于成年大熊猫体重的1/900。幼崽出生时几乎是无毛的，眼睛和耳朵都是闭合的，完全依赖母亲照顾。</p>
              <p>幼崽在6-8个月大时开始吃竹子，但通常会继续哺乳到1-1.5岁。它们通常会与母亲一起生活到1.5-2.5岁，然后开始独立生活。大熊猫在野外的寿命约为15-20年，在人工饲养条件下可以活到25-30岁。</p>
            `
          },
          {
            title: '交流方式',
            content: `
              <p>大熊猫主要通过声音、气味和视觉信号进行交流。它们有多种发声方式，包括吼叫、咆哮、吠叫和尖叫等，用于表达不同的情绪和意图。</p>
              <p>气味标记是大熊猫领地行为的重要组成部分。它们会通过在树干上摩擦身体、排泄物和尿液来留下气味标记，以此宣示领地所有权并向其他大熊猫传递信息。</p>
            `
          }
        ]
      },
      {
        title: '保护状况',
        content: `
          <p>大熊猫曾经广泛分布于中国南部和东部的大部分地区，但由于人类活动导致的栖息地丧失和破碎化，其分布范围大大缩小。截至2021年，野生大熊猫数量估计约为1,800只，主要分布在中国四川、陕西和甘肃省的山区。</p>
          <p>中国政府自20世纪60年代开始实施大熊猫保护措施，包括建立自然保护区、开展科学研究、发展人工繁育技术等。这些努力取得了显著成效，大熊猫的保护状态已从"濒危"降为"易危"。</p>
          <p>然而，气候变化对大熊猫的主要食物来源——竹子的影响，以及栖息地继续破碎化的威胁，使大熊猫的长期生存仍面临挑战。</p>
        `,
        images: [
          { url: 'src/assets/pandalive.png', caption: '四川卧龙国家级自然保护区的大熊猫栖息地' },
          { url: 'src/assets/sypd.png', caption: '保护人员正在监测野生大熊猫' }
        ]
      },
      {
        title: '文化意义',
        content: `
          <p>大熊猫在中国文化中有着重要地位，被视为和平与友谊的象征。自1958年以来，中国政府开始将大熊猫作为外交礼物赠送给其他国家，这种做法被称为"熊猫外交"。</p>
          <p>作为世界自然基金会（WWF）的标志性动物，大熊猫已成为全球野生动物保护的标志和象征。大熊猫的形象广泛出现在各种媒体、艺术作品和商业产品中，深受世界各地人们的喜爱。</p>
          <p>在中国传统文化中，大熊猫也被赋予了许多美好的寓意，如坚韧、和谐与平衡等。大熊猫的黑白相间的毛色也被视为阴阳平衡的象征。</p>
        `
      }
    ],
    references: [
      { 
        text: 'Wei, F., Swaisgood, R., Hu, Y., Nie, Y., Yan, L., Zhang, Z., Qi, D. & Zhu, L. (2020). "Giant pandas in the wild: biology and conservation". Science China Life Sciences, 63(8), 1-12.',
        url: 'https://example.com/reference1',
        urlText: '查看论文'
      },
      { 
        text: '国家林业和草原局. (2021). "第四次全国大熊猫调查报告". 中国林业出版社.',
        url: 'https://example.com/reference2',
        urlText: '查看报告'
      },
      { 
        text: 'Schaller, G.B., Hu, J., Pan, W. & Zhu, J. (1985). "The Giant Pandas of Wolong". University of Chicago Press.',
        url: 'https://example.com/reference3',
        urlText: '查看书籍'
      }
    ],
    relatedEntries: [
      {
        id: 'red-panda',
        title: '小熊猫',
        category: '哺乳动物',
        image: 'src/assets/xxm.png'
      },
      {
        id: 'bamboo',
        title: '竹',
        category: '植物',
        image: 'src/assets/zhu.png'
      },
    ]
  });
  
  // Computed properties
  const shareUrl = computed(() => {
    return `https://example.com/encyclopedia/${entry.value.id}`;
  });
  
  const allImages = computed(() => {
    // Collect all images from the entry
    let images = [];
    
    // Add hero image
    if (entry.value.heroImage) {
      images.push({
        url: entry.value.heroImage,
        caption: entry.value.heroImageCaption || ''
      });
    }
    
    // Add section images
    entry.value.sections.forEach(section => {
      if (section.images && section.images.length) {
        images = images.concat(section.images);
      }
    });
    
    return images;
  });
  
  const currentGalleryImage = computed(() => {
    return allImages.value[currentGalleryIndex.value] || { url: '', caption: '' };
  });
  
  // Methods
  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
  }
  
  function toggleBookmark() {
    isBookmarked.value = !isBookmarked.value;
  }
  
  function toggleShare() {
    showShareModal.value = !showShareModal.value;
  }
  
  function toggleToc() {
    isTocExpanded.value = !isTocExpanded.value;
  }
  
  function toggleSubsection(sectionIndex, subsectionIndex) {
    const key = `${sectionIndex}-${subsectionIndex}`;
    expandedSubsections.value[key] = !expandedSubsections.value[key];
  }
  
  function isSubsectionExpanded(sectionIndex, subsectionIndex) {
    const key = `${sectionIndex}-${subsectionIndex}`;
    return !!expandedSubsections.value[key];
  }
  
  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    isTocExpanded.value = false;
  }
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  function copyShareLink() {
    navigator.clipboard.writeText(shareUrl.value)
      .then(() => {
        alert('链接已复制到剪贴板');
      })
      .catch(err => {
        console.error('无法复制链接: ', err);
      });
  }
  
  function openGallery(index) {
    currentGalleryIndex.value = index;
    showGallery.value = true;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
  
  function closeGallery() {
    showGallery.value = false;
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  function prevImage() {
    if (currentGalleryIndex.value > 0) {
      currentGalleryIndex.value--;
    }
  }
  
  function nextImage() {
    if (currentGalleryIndex.value < allImages.value.length - 1) {
      currentGalleryIndex.value++;
    }
  }
  
  function getGalleryIndex(sectionIndex, imageIndex) {
    // Calculate the actual index in the allImages array
    let index = 1; // Start after hero image
    
    for (let i = 0; i < sectionIndex; i++) {
      if (entry.value.sections[i].images) {
        index += entry.value.sections[i].images.length;
      }
    }
    
    return index + imageIndex;
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  
  function goBack() {
    // In a real app, this would navigate back
    console.log('Go back');
  }
  
  function navigateToEntry(entryId) {
    // In a real app, this would navigate to the related entry
    console.log('Navigate to entry:', entryId);
  }
  
  function suggestEdit() {
    // In a real app, this would open a form to suggest edits
    console.log('Suggest edit');
  }
  
  function reportIssue() {
    // In a real app, this would open a form to report issues
    console.log('Report issue');
  }
  
  // Scroll event handler
  function handleScroll() {
    showBackToTop.value = window.scrollY > 300;
  }
  
  // Lifecycle hooks
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    
    // Expand first subsection by default
    if (entry.value.sections[2] && entry.value.sections[2].subsections) {
      expandedSubsections.value['2-0'] = true;
    }
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>
  
  <style>
  :root {
    --primary-color: #2e7d32;
    --primary-light: #60ad5e;
    --primary-dark: #005005;
    --secondary-color: #1565c0;
    --accent-color: #ffc107;
    --text-primary: #212121;
    --text-secondary: #757575;
    --text-tertiary: #9e9e9e;
    --background-light: #f5f5f5;
    --background-white: #ffffff;
    --border-color: #e0e0e0;
    --box-shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
    --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    --border-radius-sm: 8px;
    --border-radius: 12px;
    --border-radius-lg: 16px;
    --transition: all 0.3s ease;
    
    /* Share icons */
    --wechat-color: #07C160;
    --weibo-color: #E6162D;
    --qq-color: #12B7F5;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  }
  
  body {
    background-color: var(--background-light);
    color: var(--text-primary);
    line-height: 1.6;
  }
  
  .encyclopedia-entry {
    max-width: 768px;
    margin: 0 auto;
    background-color: var(--background-white);
    min-height: 100vh;
  }
  
  /* Dark mode styles */
  .dark-mode {
    --text-primary: #f5f5f5;
    --text-secondary: #b0b0b0;
    --text-tertiary: #909090;
    --background-light: #121212;
    --background-white: #1e1e1e;
    --border-color: #333333;
  }
  
  /* Header styles */
  .entry-header {
    padding: 1rem 1.25rem;
    background-color: var(--primary-color);
    color: white;
  }
  
  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .header-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .icon-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .icon-btn:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  .title-container {
    margin-bottom: 1rem;
  }
  
  .category-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50px;
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
  }
  
  .entry-title {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .entry-subtitle {
    font-size: 1rem;
    font-weight: 400;
    opacity: 0.9;
  }
  
  /* Main content styles */
  .entry-content {
    padding: 0 1.25rem 2rem;
  }
  
  .hero-image-container {
    margin: -1.25rem -1.25rem 1.25rem;
    position: relative;
    cursor: pointer;
  }
  
  .hero-image {
    width: 100%;
    height: auto;
    display: block;
  }
  
  .image-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
  
  /* Quick facts card */
  .quick-facts-card {
    background-color: var(--background-light);
    border-radius: var(--border-radius);
    padding: 1.25rem;
    margin-bottom: 1.5rem;
  }
  
  .facts-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .fact-item {
    display: flex;
    flex-direction: column;
  }
  
  .fact-label {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: 0.25rem;
  }
  
  .fact-value {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text-primary);
  }
  
  /* Table of contents */
  .toc-container {
    background-color: var(--background-light);
    border-radius: var(--border-radius);
    margin-bottom: 1.5rem;
    overflow: hidden;
  }
  
  .toc-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    cursor: pointer;
  }
  
  .section-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .toc-links {
    padding: 0 1.25rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .toc-link {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.95rem;
    transition: var(--transition);
    padding: 0.25rem 0;
  }
  
  .toc-link:hover {
    color: var(--primary-color);
  }
  
  /* Content sections */
  .content-section {
    margin-bottom: 2rem;
    scroll-margin-top: 1rem;
  }
  
  .content-section .section-title {
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }
  
  .section-content {
    margin-bottom: 1.25rem;
  }
  
  .section-content p {
    margin-bottom: 1rem;
    font-size: 1rem;
    color: var(--text-primary);
  }
  
  .section-content p:last-child {
    margin-bottom: 0;
  }
  
  .section-content em {
    font-style: italic;
  }
  
  /* Image gallery */
  .section-images {
    margin-bottom: 1.25rem;
  }
  
  .image-gallery {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }
  
  .image-gallery::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  .gallery-image-container {
    flex: 0 0 auto;
    width: 200px;
    height: 150px;
    border-radius: var(--border-radius-sm);
    overflow: hidden;
    cursor: pointer;
  }
  
  .gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
  }
  
  .gallery-image:hover {
    transform: scale(1.05);
  }
  
  .gallery-caption {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-top: 0.5rem;
    text-align: center;
  }
  
  /* Subsections */
  .subsections {
    margin-top: 1.25rem;
  }
  
  .subsection {
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    margin-bottom: 0.75rem;
    overflow: hidden;
  }
  
  .subsection-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    cursor: pointer;
    background-color: var(--background-light);
  }
  
  .subsection-title {
    font-size: 1rem;
    font-weight: 500;
  }
  
  .subsection-content {
    padding: 1rem;
    border-top: 1px solid var(--border-color);
  }
  
  .subsection-content p {
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
  }
  
  .subsection-content p:last-child {
    margin-bottom: 0;
  }
  
  /* References section */
  .references-section {
    margin-bottom: 2rem;
  }
  
  .references-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .reference-item {
    display: flex;
    gap: 0.75rem;
  }
  
  .reference-number {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    flex-shrink: 0;
  }
  
  .reference-content {
    flex: 1;
  }
  
  .reference-text {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 0.25rem;
  }
  
  .reference-link {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--primary-color);
    text-decoration: none;
    font-size: 0.85rem;
  }
  
  /* Related entries */
  .related-entries {
    margin-bottom: 2rem;
  }
  
  .related-entries-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .related-entry-card {
    border-radius: var(--border-radius-sm);
    overflow: hidden;
    box-shadow: var(--box-shadow-sm);
    cursor: pointer;
    transition: var(--transition);
  }
  
  .related-entry-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--box-shadow);
  }
  
  .related-entry-image {
    height: 100px;
    overflow: hidden;
  }
  
  .related-entry-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .related-entry-info {
    padding: 0.75rem;
  }
  
  .related-entry-title {
    font-size: 0.95rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
    color: var(--text-primary);
  }
  
  .related-entry-category {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }
  
  /* Footer */
  .entry-footer {
    padding: 1.25rem;
    border-top: 1px solid var(--border-color);
  }
  
  .footer-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .last-updated {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
  
  .footer-actions {
    display: flex;
    gap: 1rem;
  }
  
  .action-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius-sm);
    background-color: var(--background-light);
    border: none;
    color: var(--text-primary);
    font-size: 0.9rem;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .action-btn:hover {
    background-color: #e0e0e0;
  }
  
  .edit-btn {
    color: var(--primary-color);
  }
  
  .report-btn {
    color: var(--text-secondary);
  }
  
  /* Back to top button */
  .back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: var(--box-shadow);
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
    z-index: 90;
  }
  
  .back-to-top.visible {
    opacity: 1;
    visibility: visible;
  }
  
  /* Share modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  }
  
  .modal-container {
    background-color: var(--background-white);
    border-radius: var(--border-radius-lg);
    width: 90%;
    max-width: 400px;
    box-shadow: var(--box-shadow);
    animation: slideUp 0.3s ease;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
    border-bottom: 1px solid var(--border-color);
  }
  
  .modal-header h3 {
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  .close-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: none;
    border: none;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .modal-content {
    padding: 1.25rem;
  }
  
  .share-options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .share-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .share-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  
  .share-icon.wechat {
    background-color: var(--wechat-color);
  }
  
  .share-icon.weibo {
    background-color: var(--weibo-color);
  }
  
  .share-icon.qq {
    background-color: var(--qq-color);
  }
  
  .share-icon.copy {
    background-color: var(--text-secondary);
  }
  
  .share-option span {
    font-size: 0.85rem;
    color: var(--text-primary);
  }
  
  .share-link-container {
    display: flex;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    overflow: hidden;
  }
  
  .share-link-input {
    flex: 1;
    padding: 0.75rem;
    border: none;
    background-color: var(--background-light);
    color: var(--text-primary);
    font-size: 0.9rem;
  }
  
  .copy-btn {
    padding: 0 1rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    font-size: 0.9rem;
    cursor: pointer;
  }
  
  /* Gallery modal */
  .gallery-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    flex-direction: column;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  }
  
  .gallery-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    color: white;
  }
  
  .gallery-counter {
    font-size: 0.9rem;
  }
  
  .gallery-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .gallery-image-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .gallery-full-image {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
  }
  
  .gallery-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
  }
  
  .gallery-nav.prev {
    left: 1rem;
  }
  
  .gallery-nav.next {
    right: 1rem;
  }
  
  .gallery-modal .gallery-caption {
    color: white;
    text-align: center;
    padding: 1rem;
    font-size: 0.9rem;
  }
  
  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  /* Responsive adjustments */
  @media (min-width: 768px) {
    .entry-title {
      font-size: 2rem;
    }
    
    .facts-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    
    .related-entries-grid {
      grid-template-columns: repeat(4, 1fr);
    }
    
    .gallery-image-container {
      width: 250px;
      height: 180px;
    }
    
    .footer-content {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  
  @media (max-width: 480px) {
    .entry-title {
      font-size: 1.5rem;
    }
    
    .section-title {
      font-size: 1.2rem;
    }
    
    .subsection-title {
      font-size: 0.95rem;
    }
    
    .share-options {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
  }
  </style>