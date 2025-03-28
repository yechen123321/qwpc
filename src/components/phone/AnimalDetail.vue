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
  id: 'dolphin',
  title: '海豚',
  subtitle: 'Delphinidae，海洋中的智慧生物',
  category: '哺乳动物',
  heroImage: 'src/assets/dolphin.png',
  heroImageCaption: '海豚在海洋中自由游动',
  lastUpdated: '2023-11-15',
  quickFacts: [
    { label: '学名', value: 'Delphinidae' },
    { label: '保护状态', value: '不同物种有不同状态' },
    { label: '分布', value: '全球各大洋' },
    { label: '栖息地', value: '海洋' },
    { label: '体重', value: '视物种而定，50-5000公斤' },
    { label: '寿命', value: '20-50年' }
  ],
  sections: [
    {
      title: '简介',
      content: `
        <p>海豚（科名：<em>Delphinidae</em>）是一类生活在海洋中的哺乳动物，以其高智商和社交行为而闻名。海豚分布于全球各大洋，从热带到极地海域都有它们的踪迹。</p>
        <p>海豚是海洋生态系统中的重要成员，它们在食物链中扮演着捕食者的角色。海豚的保护状态因物种而异，一些物种面临着生存威胁，而另一些则相对稳定。</p>
      `,
      images: [
        { url: 'src/assets/dolphin_jump.png', caption: '海豚跃出水面' },
        { url: 'src/assets/dolphin_pod.png', caption: '海豚群在海洋中游动' }
      ],
      imageCaption: '海豚在自然环境中的生活场景'
    },
    {
      title: '形态特征',
      content: `
        <p>海豚是流线型的海洋哺乳动物，体型大小因物种而异，从小型的毛伊海豚（约1.7米，40公斤）到大型的虎鲸（约9米，5吨）。海豚的皮肤光滑，通常呈灰色，但也有其他颜色的物种。</p>
        <p>海豚的头部有一个突出的喙，眼睛位于头部两侧。它们的背部有一个背鳍，用于稳定游动。海豚的尾鳍是水平方向的，这与鱼类的垂直尾鳍不同。</p>
      `,
      images: [
        { url: 'src/assets/dolphin_anatomy.png', caption: '海豚的解剖结构' },
        { url: 'src/assets/dolphin_teeth.png', caption: '海豚的牙齿特写' }
      ]
    },
    {
      title: '生态与行为',
      content: `
        <p>海豚是群居动物，通常以小群体生活，群体大小从几只到数百只不等。它们通过复杂的声波系统进行交流和导航，这种能力被称为回声定位。</p>
        <p>海豚是肉食性动物，主要以鱼类和鱿鱼为食。它们使用回声定位来寻找猎物，并通过合作狩猎来提高捕食效率。</p>
      `,
      subsections: [
        {
          title: '繁殖与发育',
          content: `
            <p>海豚的繁殖季节因物种和地理位置而异。雌性海豚的怀孕期约为10-12个月，通常每次产下一只幼崽。</p>
            <p>海豚幼崽出生时已经相当大，能够立即游动。它们会与母亲生活数年，学习生存技能和社会行为。</p>
          `
        },
        {
          title: '社会行为',
          content: `
            <p>海豚以其复杂的社会结构和行为而闻名。它们通过身体接触、跳跃和发声来交流和建立社会联系。</p>
            <p>海豚还表现出玩耍行为，如追逐、跳跃和与物体互动，这被认为是智力高的表现。</p>
          `
        }
      ]
    },
    {
      title: '保护状况',
      content: `
        <p>海豚的保护状况因物种而异。一些物种，如白鱀豚，已经灭绝，而其他物种如宽吻海豚则相对常见。</p>
        <p>海豚面临的主要威胁包括渔业副渔获、海洋污染、栖息地丧失和气候变化。保护海豚需要国际合作和综合管理策略。</p>
      `,
      images: [
        { url: 'src/assets/dolphin_stranded.png', caption: '搁浅的海豚' },
        { url: 'src/assets/dolphin_conservation.png', caption: '海豚保护行动' }
      ]
    },
    {
      title: '文化意义',
      content: `
        <p>海豚在人类文化中一直扮演着重要角色。在许多文化中，海豚被视为智慧、友好和救世主的象征。</p>
        <p>海豚也是海洋保护运动的重要象征，它们的形象常被用来提高公众对海洋生态问题的关注。</p>
      `
    }
  ],
  references: [
    {
      text: 'Reeves, R. R., Smith, B. D., Crespo, E. A., & Notarbartolo di Sciara, G. (2003). Dolphins, whales and porpoises: 2002–2010 conservation action plan for the world’s cetaceans. IUCN.',
      url: 'https://example.com/reference1',
      urlText: '查看报告'
    },
    {
      text: 'Würsig, B., Thewissen, J. G. M., & Kovacs, K. M. (Eds.). (2017). Encyclopedia of marine mammals. Academic Press.',
      url: 'https://example.com/reference2',
      urlText: '查看书籍'
    }
  ],
  relatedEntries: [
    {
      id: 'whale',
      title: '鲸',
      category: '哺乳动物',
      image: 'src/assets/whale.png'
    },
    {
      id: 'coral_reef',
      title: '珊瑚礁',
      category: '生态系统',
      image: 'src/assets/coral_reef.png'
    }
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