<template>
    <div class="event-page" :class="{ 'dark-mode': isDarkMode }">
      <!-- Hero Section -->
      <div class="hero-section">
        <img src="@/assets/htql.png" alt="Beach cleanup volunteers" class="hero-image">
        <div class="hero-overlay">
          <div class="event-badge">环保活动</div>
          <h1 class="event-title">海滩清洁日</h1>
          <p class="event-tagline">一起守护我们的海洋</p>
        </div>
      </div>
      
      <!-- Quick Info Bar -->
      <div class="quick-info-bar">
        <div class="info-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
          <span>2025年4月15日</span>
        </div>
        <div class="info-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span>上午9:00 - 下午1:00</span>
        </div>
        <div class="info-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>金沙湾海滩</span>
        </div>
      </div>
      
      <!-- Registration CTA -->
      <div class="registration-container">
        <button class="register-btn" @click="openRegistrationForm">
          立即报名参加
        </button>
        <div class="registration-info">
          <div class="info-stat">
            <span class="stat-number">{{ registeredCount }}</span>
            <span class="stat-label">已报名</span>
          </div>
          <div class="info-stat">
            <span class="stat-number">{{ daysLeft }}</span>
            <span class="stat-label">剩余天数</span>
          </div>
        </div>
      </div>
      
      <!-- Main Content -->
      <main class="event-content">
        <!-- Event Description -->
        <section class="content-section">
          <h2 class="section-title">活动简介</h2>
          <div class="section-content">
            <p>加入我们的海滩清洁日活动，一起为保护海洋环境贡献力量！我们将在金沙湾海滩进行垃圾清理，减少塑料污染，保护海洋生物。</p>
            <p>这次活动不仅是一次环保行动，也是一次环保教育和社区建设的机会。我们将提供所有必要的清洁工具，并组织志愿者进行分组活动。</p>
            <p>活动结束后，我们将对收集的垃圾进行分类统计，数据将用于当地环保研究和宣传教育。</p>
          </div>
        </section>
        
        <!-- Event Schedule -->
        <section class="content-section">
          <h2 class="section-title">活动日程</h2>
          <div class="schedule-timeline">
            <div class="timeline-item">
              <div class="timeline-time">09:00</div>
              <div class="timeline-content">
                <h3 class="timeline-title">签到与欢迎</h3>
                <p>在集合点签到并领取清洁工具包</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-time">09:30</div>
              <div class="timeline-content">
                <h3 class="timeline-title">活动简介与安全指导</h3>
                <p>组织者介绍活动流程和安全注意事项</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-time">10:00</div>
              <div class="timeline-content">
                <h3 class="timeline-title">清洁活动开始</h3>
                <p>分组进行海滩垃圾收集</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-time">12:00</div>
              <div class="timeline-content">
                <h3 class="timeline-title">垃圾分类与统计</h3>
                <p>对收集的垃圾进行分类和记录</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-time">12:30</div>
              <div class="timeline-content">
                <h3 class="timeline-title">午餐与交流</h3>
                <p>提供简单午餐，志愿者交流经验</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-time">13:00</div>
              <div class="timeline-content">
                <h3 class="timeline-title">活动总结与合影</h3>
                <p>分享活动成果，合影留念</p>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Location Map -->
        <section class="content-section">
          <h2 class="section-title">活动地点</h2>
          <div class="location-info">
            <div class="location-address">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <div>
                <p class="address-main">金沙湾海滩</p>
                <p class="address-detail">广东省深圳市南山区金沙湾路1号</p>
              </div>
            </div>
            <!-- <div class="map-container" @click="openFullMap">
              <img src="/placeholder.svg?height=300&width=600" alt="活动地点地图" class="location-map">
              <div class="map-overlay">
                <button class="map-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
                  查看完整地图
                </button>
              </div>
            </div>
            <div class="location-directions">
              <button class="direction-btn" @click="getDirections">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v8"></path><path d="m4.93 10.93 1.41 1.41"></path><path d="M2 18h2"></path><path d="M20 18h2"></path><path d="m19.07 10.93-1.41 1.41"></path><path d="M22 22H2"></path><path d="M12 10v10"></path></svg>
                获取路线
              </button>
            </div> -->
          </div>
        </section>
        
        <!-- What to Bring -->
        <section class="content-section">
          <h2 class="section-title">物品准备</h2>
          <div class="items-grid">
            <div class="item-card">
              <div class="item-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </div>
              <div class="item-name">防晒霜</div>
            </div>
            <div class="item-card">
              <div class="item-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
              </div>
              <div class="item-name">帽子</div>
            </div>
            <div class="item-card">
              <div class="item-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" x2="6" y1="1" y2="4"></line><line x1="10" x2="10" y1="1" y2="4"></line><line x1="14" x2="14" y1="1" y2="4"></line></svg>
              </div>
              <div class="item-name">水壶</div>
            </div>
            <div class="item-card">
              <div class="item-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" x2="21" y1="6" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              </div>
              <div class="item-name">环保袋</div>
            </div>
            <div class="item-card">
              <div class="item-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M21.2 8.4c.5.9.8 2 .8 3.1"></path></svg>
              </div>
              <div class="item-name">小吃</div>
            </div>
            <div class="item-card">
              <div class="item-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3.45v6"></path><path d="M6 12v6"></path><path d="M10 6v6"></path><path d="M18 9v6"></path><path d="M12 3c.6 0 1 .4 1 1v5c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1h10z"></path><path d="M22 9c.6 0 1 .4 1 1v5c0 .6-.4 1-1 1H12c-.6 0-1-.4-1-1v-5c0-.6.4-1 1-1h10z"></path><path d="M10 15c.6 0 1 .4 1 1v5c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1v-5c0-.6.4-1 1-1h8z"></path><path d="M22 15c.6 0 1 .4 1 1v5c0 .6-.4 1-1 1h-8c-.6 0-1-.4-1-1v-5c0-.6.4-1 1-1h8z"></path></svg>
              </div>
              <div class="item-name">手套</div>
            </div>
          </div>
          <div class="note-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" x2="12" y1="9" y2="13"></line><line x1="12" x2="12.01" y1="17" y2="17"></line></svg>
            <p>我们将提供垃圾袋、夹子和手套，但建议您自备上述物品以确保舒适和安全。</p>
          </div>
        </section>
        
        <!-- Safety Guidelines -->
        <section class="content-section">
          <h2 class="section-title">安全指南</h2>
          <div class="safety-guidelines">
            <div class="guideline-item">
              <div class="guideline-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <div class="guideline-content">
                <h3>保持水分</h3>
                <p>活动期间请多喝水，防止脱水。</p>
              </div>
            </div>
            <div class="guideline-item">
              <div class="guideline-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path><circle cx="18" cy="6" r="3"></circle></svg>
              </div>
              <div class="guideline-content">
                <h3>防晒保护</h3>
                <p>使用防晒霜，戴帽子，穿长袖衣物。</p>
              </div>
            </div>
            <div class="guideline-item">
              <div class="guideline-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <div class="guideline-content">
                <h3>正确处理垃圾</h3>
                <p>使用提供的工具，不要徒手捡拾尖锐物品。</p>
              </div>
            </div>
            <div class="guideline-item">
              <div class="guideline-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div class="guideline-content">
                <h3>团队合作</h3>
                <p>与搭档一起行动，不要独自远离团队。</p>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Photo Gallery -->
        <section class="content-section">
          <h2 class="section-title">活动照片</h2>
          <div class="photo-gallery">
            <div class="gallery-grid">
              <div class="gallery-item" @click="openGallery(0)">
                <img src="@/assets/htql.png" alt="往期活动照片1">
              </div>
              <div class="gallery-item" @click="openGallery(1)">
                <img src="@/assets/htql.png"  alt="往期活动照片2">
              </div>
              <div class="gallery-item" @click="openGallery(2)">
                <img src="@/assets/htql.png" alt="往期活动照片3">
              </div>
              <div class="gallery-item" @click="openGallery(3)">
                <img src="@/assets/htql.png" alt="往期活动照片4">
              </div>
            </div>
            <button class="view-all-btn" @click="viewAllPhotos">
              查看全部照片
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
            </button>
          </div>
        </section>
        
        <!-- Sponsors
        <section class="content-section">
          <h2 class="section-title">活动赞助商</h2>
          <div class="sponsors-container">
            <div class="sponsor-item">
              <img src="/placeholder.svg?height=80&width=160" alt="赞助商1" class="sponsor-logo">
              <div class="sponsor-name">海洋保护协会</div>
            </div>
            <div class="sponsor-item">
              <img src="/placeholder.svg?height=80&width=160" alt="赞助商2" class="sponsor-logo">
              <div class="sponsor-name">绿色地球基金会</div>
            </div>
            <div class="sponsor-item">
              <img src="/placeholder.svg?height=80&width=160" alt="赞助商3" class="sponsor-logo">
              <div class="sponsor-name">蓝色海湾计划</div>
            </div>
          </div>
        </section>
         -->
        <!-- FAQ Section -->
        <section class="content-section">
          <h2 class="section-title">常见问题</h2>
          <div class="faq-container">
            <div class="faq-item" :class="{ 'active': expandedFaq === 0 }" @click="toggleFaq(0)">
              <div class="faq-question">
                <span>活动会因天气取消吗？</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="faq-icon"><path d="m6 9 6 6 6-6"></path></svg>
              </div>
              <div class="faq-answer" v-if="expandedFaq === 0">
                <p>是的，如遇恶劣天气（如暴雨、台风等），活动将会延期举行。我们会提前24小时通过短信或邮件通知所有报名参与者。</p>
              </div>
            </div>
            <div class="faq-item" :class="{ 'active': expandedFaq === 1 }" @click="toggleFaq(1)">
              <div class="faq-question">
                <span>儿童可以参加吗？</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="faq-icon"><path d="m6 9 6 6 6-6"></path></svg>
              </div>
              <div class="faq-answer" v-if="expandedFaq === 1">
                <p>欢迎儿童在成人陪同下参加。这是一个很好的环保教育机会，但请确保12岁以下儿童全程有家长或监护人陪同。</p>
              </div>
            </div>
            <div class="faq-item" :class="{ 'active': expandedFaq === 2 }" @click="toggleFaq(2)">
              <div class="faq-question">
                <span>需要支付费用吗？</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="faq-icon"><path d="m6 9 6 6 6-6"></path></svg>
              </div>
              <div class="faq-answer" v-if="expandedFaq === 2">
                <p>不需要。这是一个免费的志愿者活动，我们将提供必要的清洁工具和简单的午餐。</p>
              </div>
            </div>
            <div class="faq-item" :class="{ 'active': expandedFaq === 3 }" @click="toggleFaq(3)">
              <div class="faq-question">
                <span>如何获得志愿者证明？</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="faq-icon"><path d="m6 9 6 6 6-6"></path></svg>
              </div>
              <div class="faq-answer" v-if="expandedFaq === 3">
                <p>活动结束后，我们将为所有参与者提供电子版志愿者证明。如需纸质证明，请在活动当天向工作人员提出申请。</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <!-- Share Section -->
      <!-- <section class="share-section">
        <h2 class="share-title">分享活动</h2>
        <p class="share-text">邀请朋友一起参与，共同保护我们的海洋环境</p>
        <div class="share-buttons">
          <button class="share-btn wechat" @click="shareToWechat">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13 15v6"></path><path d="M11 15v6"></path><path d="M12 3v5"></path></svg>
            微信
          </button>
          <button class="share-btn weibo" @click="shareToWeibo">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            微博
          </button>
          <button class="share-btn copy" @click="copyEventLink">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
            复制链接
          </button>
        </div>
      </section> -->
      
      <!-- Footer -->
      <!-- <footer class="event-footer">
        <div class="organizer-info">
          <img src="/placeholder.svg?height=60&width=120" alt="组织者Logo" class="organizer-logo">
          <div class="organizer-details">
            <h3 class="organizer-name">海洋守护者协会</h3>
            <p class="organizer-desc">致力于海洋环境保护和公众环保意识提升</p>
          </div>
        </div>
        <div class="contact-info">
          <div class="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span>400-123-4567</span>
          </div>
          <div class="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <span>contact@oceanprotectors.org</span>
          </div>
        </div>
        <div class="footer-links">
          <a href="#" class="footer-link">关于我们</a>
          <a href="#" class="footer-link">隐私政策</a>
          <a href="#" class="footer-link">更多活动</a>
        </div>
      </footer> -->
      
      <!-- Registration Modal -->
      <div class="modal-overlay" v-if="showRegistrationModal" @click="closeRegistrationForm">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3>活动报名</h3>
            <button class="close-btn" @click="closeRegistrationForm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          <div class="modal-content">
            <form class="registration-form" @submit.prevent="submitRegistration">
              <div class="form-group">
                <label for="name">姓名</label>
                <input type="text" id="name" v-model="formData.name" required>
              </div>
              <div class="form-group">
                <label for="phone">手机号码</label>
                <input type="tel" id="phone" v-model="formData.phone" required>
              </div>
              <div class="form-group">
                <label for="email">电子邮箱</label>
                <input type="email" id="email" v-model="formData.email" required>
              </div>
              <div class="form-group">
                <label for="participants">参与人数</label>
                <select id="participants" v-model="formData.participants">
                  <option value="1">1人</option>
                  <option value="2">2人</option>
                  <option value="3">3人</option>
                  <option value="4">4人</option>
                  <option value="5+">5人以上</option>
                </select>
              </div>
              <div class="form-group">
                <label for="experience">是否有海滩清洁经验</label>
                <div class="radio-group">
                  <label class="radio-label">
                    <input type="radio" name="experience" value="yes" v-model="formData.hasExperience">
                    <span>是</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" name="experience" value="no" v-model="formData.hasExperience">
                    <span>否</span>
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label for="notes">备注信息</label>
                <textarea id="notes" v-model="formData.notes" placeholder="有特殊需求请在此说明"></textarea>
              </div>
              <div class="form-group checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="formData.agreeTerms" required>
                  <span>我已阅读并同意<a href="#" class="terms-link">活动条款</a></span>
                </label>
              </div>
              <button type="submit" class="submit-btn">提交报名</button>
            </form>
          </div>
        </div>
      </div>
      
      <!-- Gallery Modal -->
      <div class="gallery-modal" v-if="showGalleryModal" @click="closeGallery">
        <div class="gallery-header">
          <div class="gallery-counter">{{ currentGalleryIndex + 1 }} / {{ galleryImages.length }}</div>
          <button class="close-btn" @click="closeGallery">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </div>
        <div class="gallery-content" @click.stop>
          <button class="gallery-nav prev" @click.stop="prevImage" v-if="currentGalleryIndex > 0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
          </button>
          
          <div class="gallery-image-wrapper" @click.stop>
            <img :src="galleryImages[currentGalleryIndex]" :alt="'活动照片 ' + (currentGalleryIndex + 1)" class="gallery-full-image">
          </div>
          
          <button class="gallery-nav next" @click.stop="nextImage" v-if="currentGalleryIndex < galleryImages.length - 1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
          </button>
        </div>
      </div>
      
      <!-- Success Toast -->
      <div class="toast-message" v-if="showSuccessToast">
        <div class="toast-content success">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <span>{{ toastMessage }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  // State
  const isDarkMode = ref(false);
  const showRegistrationModal = ref(false);
  const showGalleryModal = ref(false);
  const showSuccessToast = ref(false);
  const toastMessage = ref('');
  const expandedFaq = ref(null);
  const currentGalleryIndex = ref(0);
  
  // Form data
  const formData = ref({
    name: '',
    phone: '',
    email: '',
    participants: '1',
    hasExperience: 'no',
    notes: '',
    agreeTerms: false
  });
  
  // Mock data
  const registeredCount = ref(127);
  const eventDate = new Date('2023-07-15');
  const daysLeft = computed(() => {
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  });
  
  // Gallery images
  const galleryImages = ref([
   "@/assets/htql.png",
   "@/assets/htql.png",
   "@/assets/htql.png",
   "@/assets/htql.png",
  ]);
  
  // Methods
  function openRegistrationForm() {
    showRegistrationModal.value = true;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
  
  function closeRegistrationForm() {
    showRegistrationModal.value = false;
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  function submitRegistration() {
    // In a real app, this would send the form data to a server
    console.log('Form submitted:', formData.value);
    
    // Show success message
    showSuccessToast.value = true;
    toastMessage.value = '报名成功！我们将通过短信和邮件发送活动详情。';
    
    // Close modal
    closeRegistrationForm();
    
    // Reset form
    formData.value = {
      name: '',
      phone: '',
      email: '',
      participants: '1',
      hasExperience: 'no',
      notes: '',
      agreeTerms: false
    };
    
    // Increment registered count
    registeredCount.value++;
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      showSuccessToast.value = false;
    }, 3000);
  }
  
  function toggleFaq(index) {
    if (expandedFaq.value === index) {
      expandedFaq.value = null;
    } else {
      expandedFaq.value = index;
    }
  }
  
  function openGallery(index) {
    currentGalleryIndex.value = index;
    showGalleryModal.value = true;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
  
  function closeGallery() {
    showGalleryModal.value = false;
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  function prevImage() {
    if (currentGalleryIndex.value > 0) {
      currentGalleryIndex.value--;
    }
  }
  
  function nextImage() {
    if (currentGalleryIndex.value < galleryImages.value.length - 1) {
      currentGalleryIndex.value++;
    }
  }
  
  function viewAllPhotos() {
    // In a real app, this would navigate to a photo gallery page
    console.log('View all photos');
  }
  
  function openFullMap() {
    // In a real app, this would open a full map view or navigate to Google Maps
    window.open('https://maps.google.com/?q=金沙湾海滩,深圳', '_blank');
  }
  
  function getDirections() {
    // In a real app, this would open directions in a map app
    window.open('https://maps.google.com/maps?daddr=金沙湾海滩,深圳', '_blank');
  }
  
  function shareToWechat() {
    // In a real app, this would open WeChat sharing
    console.log('Share to WeChat');
    showToast('已复制链接，请打开微信分享');
  }
  
  function shareToWeibo() {
    // In a real app, this would open Weibo sharing
    console.log('Share to Weibo');
    window.open(`http://service.weibo.com/share/share.php?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent('海滩清洁日活动 - 一起守护我们的海洋')}`, '_blank');
  }
  
  function copyEventLink() {
    // Copy the current URL to clipboard
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        showToast('链接已复制到剪贴板');
      })
      .catch(err => {
        console.error('无法复制链接: ', err);
      });
  }
  
  function showToast(message) {
    toastMessage.value = message;
    showSuccessToast.value = true;
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      showSuccessToast.value = false;
    }, 3000);
  }
  
  // Lifecycle hooks
  onMounted(() => {
    // Check if user prefers dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDarkMode.value = true;
    }
    
    // Expand first FAQ by default
    expandedFaq.value = 0;
  });
  </script>
  
  <style>
  :root {
    --primary-color: #0288d1;
    --primary-light: #5eb8ff;
    --primary-dark: #005b9f;
    --secondary-color: #26a69a;
    --accent-color: #ffc107;
    --text-primary: #212121;
    --text-secondary: #757575;
    --text-tertiary: #9e9e9e;
    --background-light: #f5f5f5;
    --background-white: #ffffff;
    --border-color: #e0e0e0;
    --success-color: #4caf50;
    --error-color: #f44336;
    --warning-color: #ff9800;
    
    --box-shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
    --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    --border-radius-sm: 8px;
    --border-radius: 12px;
    --border-radius-lg: 16px;
    --transition: all 0.3s ease;
    
    /* Share icons */
    --wechat-color: #07C160;
    --weibo-color: #E6162D;
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
  
  .event-page {
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
  
  /* Hero Section */
  .hero-section {
    position: relative;
    height: 50vh;
    min-height: 300px;
    max-height: 400px;
    overflow: hidden;
  }
  
  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .hero-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem 1.5rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    color: white;
  }
  
  .event-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background-color: var(--primary-color);
    border-radius: 50px;
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
  }
  
  .event-title {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .event-tagline {
    font-size: 1rem;
    opacity: 0.9;
  }
  
  /* Quick Info Bar */
  .quick-info-bar {
    display: flex;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    background-color: var(--primary-color);
    color: white;
  }
  
  .info-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
  }
  
  /* Registration CTA */
  .registration-container {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .register-btn {
    width: 100%;
    padding: 1rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .register-btn:hover {
    background-color: var(--primary-dark);
  }
  
  .registration-info {
    display: flex;
    justify-content: space-around;
  }
  
  .info-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .stat-number {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
  }
  
  .stat-label {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
  
  /* Main Content */
  .event-content {
    padding: 0 1.25rem 2rem;
  }
  
  .content-section {
    margin-bottom: 2rem;
  }
  
  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  .section-content {
    margin-bottom: 1rem;
  }
  
  .section-content p {
    margin-bottom: 1rem;
    font-size: 1rem;
    color: var(--text-primary);
  }
  
  .section-content p:last-child {
    margin-bottom: 0;
  }
  
  /* Schedule Timeline */
  .schedule-timeline {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .timeline-item {
    display: flex;
    gap: 1rem;
  }
  
  .timeline-time {
    width: 60px;
    font-weight: 600;
    color: var(--primary-color);
    flex-shrink: 0;
  }
  
  .timeline-content {
    flex: 1;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
  }
  
  .timeline-title {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .timeline-content p {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  /* Location Map */
  .location-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .location-address {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    background-color: var(--background-light);
    border-radius: var(--border-radius);
  }
  
  .address-main {
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .address-detail {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  .map-container {
    position: relative;
    height: 200px;
    border-radius: var(--border-radius);
    overflow: hidden;
    cursor: pointer;
  }
  
  .location-map {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .map-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: var(--transition);
  }
  
  .map-container:hover .map-overlay {
    opacity: 1;
  }
  
  .map-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background-color: white;
    border: none;
    border-radius: var(--border-radius);
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    box-shadow: var(--box-shadow);
  }
  
  .location-directions {
    display: flex;
    justify-content: center;
  }
  
  .direction-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background-color: var(--background-light);
    border: none;
    border-radius: var(--border-radius);
    font-size: 0.9rem;
    color: var(--primary-color);
    font-weight: 500;
    cursor: pointer;
  }
  
  /* What to Bring */
  .items-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .item-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background-color: var(--background-light);
    border-radius: var(--border-radius);
  }
  
  .item-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: rgba(2, 136, 209, 0.1);
    color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .item-name {
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .note-box {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    background-color: rgba(255, 193, 7, 0.1);
    border-radius: var(--border-radius);
    border-left: 4px solid var(--accent-color);
  }
  
  .note-box svg {
    color: var(--accent-color);
    flex-shrink: 0;
    margin-top: 0.25rem;
  }
  
  .note-box p {
    font-size: 0.9rem;
    color: var(--text-primary);
  }
  
  /* Safety Guidelines */
  .safety-guidelines {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .guideline-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--background-light);
    border-radius: var(--border-radius);
  }
  
  .guideline-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: rgba(2, 136, 209, 0.1);
    color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .guideline-content {
    flex: 1;
  }
  
  .guideline-content h3 {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .guideline-content p {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  /* Photo Gallery */
  .photo-gallery {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
  
  .gallery-item {
    border-radius: var(--border-radius-sm);
    overflow: hidden;
    cursor: pointer;
  }
  
  .gallery-item img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    transition: var(--transition);
  }
  
  .gallery-item:hover img {
    transform: scale(1.05);
  }
  
  .view-all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background-color: var(--background-light);
    border: none;
    border-radius: var(--border-radius);
    font-size: 0.9rem;
    color: var(--primary-color);
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .view-all-btn:hover {
    background-color: #e0e0e0;
  }
  
  /* Sponsors */
  .sponsors-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
  }
  
  .sponsor-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  
  .sponsor-logo {
    width: 120px;
    height: 60px;
    object-fit: contain;
  }
  
  .sponsor-name {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
  
  /* FAQ Section */
  .faq-container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .faq-item {
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    overflow: hidden;
  }
  
  .faq-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    cursor: pointer;
    background-color: var(--background-light);
  }
  
  .faq-question span {
    font-weight: 500;
  }
  
  .faq-icon {
    transition: var(--transition);
  }
  
  .faq-item.active .faq-icon {
    transform: rotate(180deg);
  }
  
  .faq-answer {
    padding: 0 1rem 1rem;
  }
  
  .faq-answer p {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  /* Share Section */
  .share-section {
    padding: 2rem 1.25rem;
    background-color: var(--primary-color);
    color: white;
    text-align: center;
  }
  
  .share-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .share-text {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    opacity: 0.9;
  }
  
  .share-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  
  .share-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }
  
  .share-btn svg {
    width: 48px;
    height: 48px;
    padding: 0.75rem;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    transition: var(--transition);
  }
  
  .share-btn:hover svg {
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  .share-btn span {
    font-size: 0.85rem;
  }
  
  /* Footer */
  .event-footer {
    padding: 2rem 1.25rem;
    background-color: var(--background-light);
    border-top: 1px solid var(--border-color);
  }
  
  .organizer-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .organizer-logo {
    width: 80px;
    height: 40px;
    object-fit: contain;
  }
  
  .organizer-details {
    flex: 1;
  }
  
  .organizer-name {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .organizer-desc {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
  
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  .footer-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color);
  }
  
  .footer-link {
    font-size: 0.85rem;
    color: var(--text-secondary);
    text-decoration: none;
    transition: var(--transition);
  }
  
  .footer-link:hover {
    color: var(--primary-color);
  }
  
  /* Modal Styles */
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
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
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
  
  /* Registration Form */
  .registration-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .form-group label {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    font-size: 0.95rem;
    background-color: var(--background-light);
    color: var(--text-primary);
  }
  
  .form-group textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  .radio-group,
  .checkbox-group {
    display: flex;
    gap: 1.5rem;
  }
  
  .radio-label,
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  
  .terms-link {
    color: var(--primary-color);
    text-decoration: none;
  }
  
  .submit-btn {
    padding: 0.75rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .submit-btn:hover {
    background-color: var(--primary-dark);
  }
  
  /* Gallery Modal */
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
  
  /* Toast Message */
  .toast-message {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1100;
    animation: slideUp 0.3s ease;
  }
  
  .toast-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    background-color: white;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
  }
  
  .toast-content.success {
    border-left: 4px solid var(--success-color);
  }
  
  .toast-content.success svg {
    color: var(--success-color);
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
    .event-title {
      font-size: 2rem;
    }
    
    .quick-info-bar {
      justify-content: center;
      gap: 3rem;
    }
    
    .registration-container {
      flex-direction: row;
      align-items: center;
    }
    
    .register-btn {
      flex: 2;
    }
    
    .registration-info {
      flex: 1;
    }
    
    .items-grid {
      grid-template-columns: repeat(6, 1fr);
    }
    
    .gallery-grid {
      grid-template-columns: repeat(4, 1fr);
    }
    
    .sponsors-container {
      justify-content: space-between;
    }
  }
  
  @media (max-width: 480px) {
    .event-title {
      font-size: 1.5rem;
    }
    
    .quick-info-bar {
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .items-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .share-buttons {
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
  </style>