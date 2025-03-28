<template>
    <div class="page-container">
      <!-- 页面头部 -->
      <!-- <div class="status-bar">
        <div class="time">{{ currentTime }}</div>
        <div class="status-icons">
          <div class="signal">
            <span></span><span></span><span></span><span></span>
          </div>
          <div class="wifi">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z" />
            </svg>
          </div>
          <div class="battery">
            <div class="battery-icon">
              <div class="battery-level"></div>
            </div>
          </div>
        </div>
      </div> -->
      
      <!-- 页面头部 -->
      <div class="page-header">
        <button class="back-button" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
        </button>
        <h1>我的物品</h1>
        <button class="icon-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
        </button>
      </div>
      
      <!-- 环保影响概览 -->
      <div class="impact-overview">
        <div class="impact-header">
          <h2>环保影响</h2>
          <button class="view-all-button" @click="viewAllImpact">查看详情</button>
        </div>
        
        <div class="impact-stats">
          <div class="impact-stat">
            <div class="impact-icon saved">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v8"></path><path d="m4.93 10.93 1.41 1.41"></path><path d="M2 18h2"></path><path d="M20 18h2"></path><path d="m19.07 10.93-1.41 1.41"></path><path d="M22 22H2"></path><path d="m16 6-4 4-4-4"></path><path d="M16 18a4 4 0 0 0-8 0"></path></svg>
            </div>
            <div class="stat-value">{{ environmentalImpact.disposableReduced }}</div>
            <div class="stat-label">减少一次性物品</div>
          </div>
          
          <div class="impact-stat">
            <div class="impact-icon recycled">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"></path><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"></path><path d="m14 16-3 3 3 3"></path><path d="M8.293 13.596 7.196 9.5 3.1 10.598"></path><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"></path><path d="m13.378 9.633 4.096 1.098 1.097-4.096"></path></svg>
            </div>
            <div class="stat-value">{{ environmentalImpact.itemsRecycled }}</div>
            <div class="stat-label">回收物品</div>
          </div>
          
          <div class="impact-stat">
            <div class="impact-icon co2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20"></path><path d="M2 12a10 10 0 0 1 20 0"></path><path d="M2 12a10 10 0 0 0 20 0"></path></svg>
            </div>
            <div class="stat-value">{{ environmentalImpact.co2Reduced }}kg</div>
            <div class="stat-label">减少碳排放</div>
          </div>
        </div>
      </div>
      
      <!-- 物品分类标签 -->
      <div class="item-categories">
        <div class="categories-scroll">
          <button 
            v-for="category in categories" 
            :key="category.id"
            class="category-button" 
            :class="{ active: activeCategory === category.id }"
            @click="setActiveCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
      
      <!-- 物品搜索 -->
      <div class="search-container">
        <div class="search-input">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          <input 
            type="text" 
            placeholder="搜索物品..." 
            v-model="searchQuery"
            @input="filterItems"
          >
        </div>
        <button class="filter-button" @click="toggleFilters">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
        </button>
      </div>
      
      <!-- 可重复使用物品 -->
      <div class="items-section" v-if="filteredReusableItems.length > 0">
        <div class="section-header">
          <h2>可重复使用物品</h2>
          <button class="view-all-button" @click="viewAllReusable">查看全部</button>
        </div>
        
        <div class="items-grid">
          <div 
            v-for="item in filteredReusableItems" 
            :key="item.id" 
            class="item-card"
            @click="viewItemDetails(item)"
          >
            <div class="item-image">
              <img :src="item.image" :alt="item.name">
              <div class="item-badge">{{ item.status }}</div>
            </div>
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <div class="item-meta">
                <div class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
                  <span>{{ item.acquiredDate }}</span>
                </div>
                <div class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v8"></path><path d="m4.93 10.93 1.41 1.41"></path><path d="M2 18h2"></path><path d="M20 18h2"></path><path d="m19.07 10.93-1.41 1.41"></path><path d="M22 22H2"></path><path d="m16 6-4 4-4-4"></path><path d="M16 18a4 4 0 0 0-8 0"></path></svg>
                  <span>{{ item.impact }}</span>
                </div>
              </div>
              <div class="item-usage">
                <div class="usage-label">使用次数</div>
                <div class="usage-bar">
                  <div 
                    class="usage-fill"
                    :style="{ width: `${(item.usageCount / item.maxUsage) * 100}%` }"
                  ></div>
                </div>
                <div class="usage-value">{{ item.usageCount }}次</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 可回收物品 -->
      <div class="items-section" v-if="filteredRecyclableItems.length > 0">
        <div class="section-header">
          <h2>可回收物品</h2>
          <button class="view-all-button" @click="viewAllRecyclable">查看全部</button>
        </div>
        
        <div class="items-list">
          <div 
            v-for="item in filteredRecyclableItems" 
            :key="item.id"
            class="item-row"
            @click="viewItemDetails(item)"
          >
            <div class="item-icon recycled">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"></path><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"></path><path d="m14 16-3 3 3 3"></path><path d="M8.293 13.596 7.196 9.5 3.1 10.598"></path><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"></path><path d="m13.378 9.633 4.096 1.098 1.097-4.096"></path></svg>
            </div>
            <div class="item-info">
              <h3>{{ item.name }}</h3>
              <div class="item-meta">
                <span>回收日期: {{ item.recycleDate }}</span>
                <span>•</span>
                <span>{{ item.details }}</span>
              </div>
            </div>
            <div class="item-impact">
              <div class="impact-value">{{ item.co2Impact }}</div>
              <div class="impact-label">CO₂</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 节能物品 -->
      <div class="items-section" v-if="filteredEnergyItems.length > 0">
        <div class="section-header">
          <h2>节能物品</h2>
          <button class="view-all-button" @click="viewAllEnergy">查看全部</button>
        </div>
        
        <div class="items-grid">
          <div 
            v-for="item in filteredEnergyItems" 
            :key="item.id"
            class="item-card"
            @click="viewItemDetails(item)"
          >
            <div class="item-image">
              <img :src="item.image" :alt="item.name">
              <div class="item-badge">{{ item.status }}</div>
            </div>
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <div class="item-meta">
                <div class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
                  <span>{{ item.acquiredDate }}</span>
                </div>
                <div class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v8"></path><path d="m4.93 10.93 1.41 1.41"></path><path d="M2 18h2"></path><path d="M20 18h2"></path><path d="m19.07 10.93-1.41 1.41"></path><path d="M22 22H2"></path><path d="m16 6-4 4-4-4"></path><path d="M16 18a4 4 0 0 0-8 0"></path></svg>
                  <span>{{ item.impact }}</span>
                </div>
              </div>
              <div class="item-savings">
                <div class="savings-label">{{ item.savingsLabel1 }}</div>
                <div class="savings-value">{{ item.savingsValue1 }}</div>
                <div class="savings-label">{{ item.savingsLabel2 }}</div>
                <div class="savings-value">{{ item.savingsValue2 }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 物品提醒 -->
      <div class="reminders-section" v-if="reminders.length > 0">
        <div class="section-header">
          <h2>物品提醒</h2>
          <button class="view-all-button" @click="viewAllReminders">查看全部</button>
        </div>
        
        <div class="reminders-list">
          <div 
            v-for="(reminder, index) in reminders" 
            :key="reminder.id"
            class="reminder-card"
          >
            <div class="reminder-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </div>
            <div class="reminder-content">
              <h3>{{ reminder.title }}</h3>
              <p>{{ reminder.description }}</p>
            </div>
            <div class="reminder-actions">
              <button class="dismiss-button" @click.stop="dismissReminder(index)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 添加物品按钮 -->
      <button class="add-item-button" @click="openAddItemModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
      </button>
      
      <!-- 添加物品模态框 -->
      <div class="modal-overlay" v-if="showAddItemModal" @click="closeAddItemModal">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h2>添加新物品</h2>
            <button class="close-button" @click="closeAddItemModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          
          <div class="modal-body">
            <!-- 物品类型选择 -->
            <div class="form-group">
              <label>物品类型</label>
              <div class="item-type-selector">
                <button 
                  v-for="type in itemTypes" 
                  :key="type.id"
                  class="type-button" 
                  :class="{ active: newItem.type === type.id }"
                  @click="selectItemType(type.id)"
                >
                  <div class="type-icon" :class="type.id">
                    <div v-if="type.id === 'reusable'">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 2v8"></path>
                        <path d="m4.93 10.93 1.41 1.41"></path>
                        <path d="M2 18h2"></path>
                        <path d="M20 18h2"></path>
                        <path d="m19.07 10.93-1.41 1.41"></path>
                        <path d="M22 22H2"></path>
                        <path d="m16 6-4 4-4-4"></path>
                        <path d="M16 18a4 4 0 0 0-8 0"></path>
                      </svg>
                    </div>
                    <div v-else-if="type.id === 'recyclable'">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"></path>
                        <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"></path>
                        <path d="m14 16-3 3 3 3"></path>
                        <path d="M8.293 13.596 7.196 9.5 3.1 10.598"></path>
                        <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"></path>
                        <path d="m13.378 9.633 4.096 1.098 1.097-4.096"></path>
                      </svg>
                    </div>
                    <div v-else-if="type.id === 'energy'">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 2v8"></path>
                        <path d="m4.93 10.93 1.41 1.41"></path>
                        <path d="M2 18h2"></path>
                        <path d="M20 18h2"></path>
                        <path d="m19.07 10.93-1.41 1.41"></path>
                        <path d="M22 22H2"></path>
                        <path d="m16 6-4 4-4-4"></path>
                        <path d="M16 18a4 4 0 0 0-8 0"></path>
                      </svg>
                    </div>
                  </div>
                  <span>{{ type.name }}</span>
                </button>
              </div>
            </div>
            
            <!-- 基本信息 -->
            <div class="form-group">
              <label for="item-name">物品名称 <span class="required">*</span></label>
              <input 
                type="text" 
                id="item-name" 
                v-model="newItem.name" 
                placeholder="输入物品名称"
                :class="{ 'error': errors.name }"
              >
              <div class="error-message" v-if="errors.name">{{ errors.name }}</div>
            </div>
            
            <!-- 图片上传 -->
            <div class="form-group">
              <label>物品图片</label>
              <div class="image-upload" @click="triggerImageUpload">
                <div v-if="!newItem.image" class="upload-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path><rect width="5" height="5" x="16" y="3" rx="1"></rect><path d="m8 16 3-3 2 2 3-3 2 2"></path></svg>
                  <span>点击上传图片</span>
                </div>
                <div v-else class="image-preview">
                  <img :src="newItem.image" alt="物品图片预览">
                  <button class="remove-image" @click.stop="removeImage">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                  </button>
                </div>
                <input 
                  type="file" 
                  ref="imageInput" 
                  accept="image/*" 
                  style="display: none"
                  @change="handleImageUpload"
                >
              </div>
            </div>
            
            <!-- 可重复使用物品特有字段 -->
            <template v-if="newItem.type === 'reusable'">
              <div class="form-group">
                <label for="item-status">使用状态</label>
                <select id="item-status" v-model="newItem.status">
                  <option value="使用中">使用中</option>
                  <option value="闲置">闲置</option>
                  <option value="已损坏">已损坏</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="item-impact">环保影响 <span class="required">*</span></label>
                <input 
                  type="text" 
                  id="item-impact" 
                  v-model="newItem.impact" 
                  placeholder="例如：减少45个一次性杯子"
                  :class="{ 'error': errors.impact }"
                >
                <div class="error-message" v-if="errors.impact">{{ errors.impact }}</div>
              </div>
              
              <div class="form-group">
                <label for="item-usage">当前使用次数</label>
                <input 
                  type="number" 
                  id="item-usage" 
                  v-model.number="newItem.usageCount" 
                  min="0"
                >
              </div>
              
              <div class="form-group">
                <label for="item-max-usage">预计最大使用次数</label>
                <input 
                  type="number" 
                  id="item-max-usage" 
                  v-model.number="newItem.maxUsage" 
                  min="1"
                >
              </div>
            </template>
            
            <!-- 可回收物品特有字段 -->
            <template v-if="newItem.type === 'recyclable'">
              <div class="form-group">
                <label for="item-recycle-date">回收日期 <span class="required">*</span></label>
                <input 
                  type="date" 
                  id="item-recycle-date" 
                  v-model="newItem.recycleDate"
                  :class="{ 'error': errors.recycleDate }"
                >
                <div class="error-message" v-if="errors.recycleDate">{{ errors.recycleDate }}</div>
              </div>
              
              <div class="form-group">
                <label for="item-details">详细信息</label>
                <input 
                  type="text" 
                  id="item-details" 
                  v-model="newItem.details" 
                  placeholder="例如：重量、数量等"
                >
              </div>
              
              <div class="form-group">
                <label for="item-co2">碳排放影响 (kg CO₂) <span class="required">*</span></label>
                <div class="input-with-prefix">
                  <span class="input-prefix">-</span>
                  <input 
                    type="number" 
                    id="item-co2" 
                    v-model.number="newItem.co2Impact" 
                    min="0"
                    step="0.1"
                    placeholder="0.0"
                    :class="{ 'error': errors.co2Impact }"
                  >
                </div>
                <div class="error-message" v-if="errors.co2Impact">{{ errors.co2Impact }}</div>
              </div>
              <div>
              v-if="errors.co2Impact">{{ errors.co2Impact }}
              </div>
            </template>
            
            <!-- 节能物品特有字段 -->
            <template v-if="newItem.type === 'energy'">
              <div class="form-group">
                <label for="item-status">使用状态</label>
                <select id="item-status" v-model="newItem.status">
                  <option value="使用中">使用中</option>
                  <option value="闲置">闲置</option>
                  <option value="已损坏">已损坏</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="item-impact">环保影响 <span class="required">*</span></label>
                <input 
                  type="text" 
                  id="item-impact" 
                  v-model="newItem.impact" 
                  placeholder="例如：节省75%能源"
                  :class="{ 'error': errors.impact }"
                >
                <div class="error-message" v-if="errors.impact">{{ errors.impact }}</div>
              </div>
              
              <div class="form-group">
                <label for="savings-label-1">节省指标1名称 <span class="required">*</span></label>
                <input 
                  type="text" 
                  id="savings-label-1" 
                  v-model="newItem.savingsLabel1" 
                  placeholder="例如：节省电量"
                  :class="{ 'error': errors.savingsLabel1 }"
                >
                <div class="error-message" v-if="errors.savingsLabel1">{{ errors.savingsLabel1 }}</div>
              </div>
              
              <div class="form-group">
                <label for="savings-value-1">节省指标1数值 <span class="required">*</span></label>
                <input 
                  type="text" 
                  id="savings-value-1" 
                  v-model="newItem.savingsValue1" 
                  placeholder="例如：120 kWh"
                  :class="{ 'error': errors.savingsValue1 }"
                >
                <div class="error-message" v-if="errors.savingsValue1">{{ errors.savingsValue1 }}</div>
              </div>
              
              <div class="form-group">
                <label for="savings-label-2">节省指标2名称</label>
                <input 
                  type="text" 
                  id="savings-label-2" 
                  v-model="newItem.savingsLabel2" 
                  placeholder="例如：减少碳排放"
                >
              </div>
              
              <div class="form-group">
                <label for="savings-value-2">节省指标2数值</label>
                <input 
                  type="text" 
                  id="savings-value-2" 
                  v-model="newItem.savingsValue2" 
                  placeholder="例如：48 kg CO₂"
                >
              </div>
            </template>
          </div>
          <div class="modal-footer">
            <button class="cancel-button" @click="closeAddItemModal">取消</button>
            <button class="save-button" @click="saveNewItem">保存</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  // 当前时间
  const currentTime = ref('');
  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    currentTime.value = `${hours}:${minutes}`;
  };
  
  // 环保影响数据
  const environmentalImpact = ref({
    disposableReduced: 125,
    itemsRecycled: 45,
    co2Reduced: 78
  });
  
  // 分类数据
  const categories = ref([
    { id: 'all', name: '全部' },
    { id: 'reusable', name: '可重复使用' },
    { id: 'recyclable', name: '可回收' },
    { id: 'energy', name: '节能' },
    { id: 'organic', name: '有机' },
    { id: 'other', name: '其他' }
  ]);
  const activeCategory = ref('all');
  
  // 搜索和过滤
  const searchQuery = ref('');
  const showFilters = ref(false);
  
  // 可重复使用物品数据
  const reusableItems = ref([
    {
      id: 'r1',
      name: '不锈钢保温杯',
      status: '使用中',
      image: '/placeholder.svg?height=120&width=120&text=保温杯',
      acquiredDate: '2024年3月获得',
      impact: '减少45个一次性杯子',
      usageCount: 45,
      maxUsage: 50,
      category: 'reusable'
    },
    {
      id: 'r2',
      name: '环保购物袋',
      status: '使用中',
      image: '/placeholder.svg?height=120&width=120&text=购物袋',
      acquiredDate: '2024年1月获得',
      impact: '减少32个塑料袋',
      usageCount: 32,
      maxUsage: 50,
      category: 'reusable'
    }
  ]);
  
  // 可回收物品数据
  const recyclableItems = ref([
    {
      id: 'rc1',
      name: '纸质包装',
      recycleDate: '2025年6月15日',
      details: '重量: 2.5kg',
      co2Impact: '-1.2kg',
      category: 'recyclable'
    },
    {
      id: 'rc2',
      name: '塑料瓶',
      recycleDate: '2025年6月10日',
      details: '数量: 12个',
      co2Impact: '-3.6kg',
      category: 'recyclable'
    },
    {
      id: 'rc3',
      name: '电子设备',
      recycleDate: '2025年5月28日',
      details: '类型: 旧手机',
      co2Impact: '-25kg',
      category: 'recyclable'
    }
  ]);
  
  // 节能物品数据
  const energyItems = ref([
    {
      id: 'e1',
      name: 'LED灯泡套装',
      status: '使用中',
      image: '/placeholder.svg?height=120&width=120&text=LED灯',
      acquiredDate: '2024年4月获得',
      impact: '节省75%能源',
      savingsLabel1: '节省电量',
      savingsValue1: '120 kWh',
      savingsLabel2: '减少碳排放',
      savingsValue2: '48 kg CO₂',
      category: 'energy'
    },
    {
      id: 'e2',
      name: '节水淋浴头',
      status: '使用中',
      image: '/placeholder.svg?height=120&width=120&text=淋浴头',
      acquiredDate: '2024年2月获得',
      impact: '节省30%用水量',
      savingsLabel1: '节省水量',
      savingsValue1: '2,500 L',
      savingsLabel2: '减少碳排放',
      savingsValue2: '15 kg CO₂',
      category: 'energy'
    }
  ]);
  
  // 提醒数据
  const reminders = ref([
    {
      id: 'rem1',
      title: '别忘了带上你的环保购物袋',
      description: '今天下午3点你有购物计划'
    },
    {
      id: 'rem2',
      title: '是时候回收纸质包装了',
      description: '已经收集了2.5kg，足够进行回收了'
    }
  ]);
  
  // 添加物品相关
  const showAddItemModal = ref(false);
  const imageInput = ref(null);
  
  // 物品类型
  const itemTypes = [
    { 
      id: 'reusable', 
      name: '可重复使用'
    },
    { 
      id: 'recyclable', 
      name: '可回收'
    },
    { 
      id: 'energy', 
      name: '节能'
    }
  ];
  
  // 新物品表单
  const newItem = ref({
    type: 'reusable',
    name: '',
    image: '',
    status: '使用中',
    impact: '',
    usageCount: 0,
    maxUsage: 50,
    recycleDate: '',
    details: '',
    co2Impact: 0,
    savingsLabel1: '',
    savingsValue1: '',
    savingsLabel2: '',
    savingsValue2: ''
  });
  
  // 表单错误
  const errors = ref({});
  
  // 过滤物品
  const filteredReusableItems = computed(() => {
    return filterItemsByCategory(reusableItems.value);
  });
  
  const filteredRecyclableItems = computed(() => {
    return filterItemsByCategory(recyclableItems.value);
  });
  
  const filteredEnergyItems = computed(() => {
    return filterItemsByCategory(energyItems.value);
  });
  
  function filterItemsByCategory(items) {
    if (activeCategory.value === 'all') {
      return items.filter(item => {
        if (searchQuery.value === '') return true;
        return item.name.toLowerCase().includes(searchQuery.value.toLowerCase());
      });
    } else {
      return items.filter(item => {
        const categoryMatch = item.category === activeCategory.value;
        if (searchQuery.value === '') return categoryMatch;
        return categoryMatch && item.name.toLowerCase().includes(searchQuery.value.toLowerCase());
      });
    }
  }
  
  // 功能方法
  function setActiveCategory(categoryId) {
    activeCategory.value = categoryId;
  }
  
  function filterItems() {
    // 搜索功能已通过计算属性实现
  }
  
  function toggleFilters() {
    showFilters.value = !showFilters.value;
    // 这里可以实现更复杂的筛选逻辑或弹出筛选对话框
    console.log('打开筛选选项');
  }
  
  function viewItemDetails(item) {
    console.log('查看物品详情:', item);
    // 在这里实现导航到物品详情页的逻辑
  }
  
  function goBack() {
    console.log('返回上一页');
    // 在这里实现返回上一页的逻辑
  }
  
  // 添加物品相关方法
  function openAddItemModal() {
    showAddItemModal.value = true;
    resetNewItem();
  }
  
  function closeAddItemModal() {
    showAddItemModal.value = false;
  }
  
  function resetNewItem() {
    newItem.value = {
      type: 'reusable',
      name: '',
      image: '',
      status: '使用中',
      impact: '',
      usageCount: 0,
      maxUsage: 50,
      recycleDate: '',
      details: '',
      co2Impact: 0,
      savingsLabel1: '',
      savingsValue1: '',
      savingsLabel2: '',
      savingsValue2: ''
    };
    errors.value = {};
  }
  
  function selectItemType(typeId) {
    newItem.value.type = typeId;
  }
  
  function triggerImageUpload() {
    imageInput.value.click();
  }
  
  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      // 在实际应用中，这里应该上传图片到服务器
      // 这里使用本地 URL 作为演示
      newItem.value.image = URL.createObjectURL(file);
    }
  }
  
  function removeImage() {
    newItem.value.image = '';
    if (imageInput.value) {
      imageInput.value.value = '';
    }
  }
  
  function validateForm() {
    errors.value = {};
    let isValid = true;
    
    // 通用验证
    if (!newItem.value.name.trim()) {
      errors.value.name = '请输入物品名称';
      isValid = false;
    }
    
    // 根据物品类型进行特定验证
    if (newItem.value.type === 'reusable') {
      if (!newItem.value.impact.trim()) {
        errors.value.impact = '请输入环保影响';
        isValid = false;
      }
    } else if (newItem.value.type === 'recyclable') {
      if (!newItem.value.recycleDate) {
        errors.value.recycleDate = '请选择回收日期';
        isValid = false;
      }
      if (!newItem.value.co2Impact) {
        errors.value.co2Impact = '请输入碳排放影响';
        isValid = false;
      }
    } else if (newItem.value.type === 'energy') {
      if (!newItem.value.impact.trim()) {
        errors.value.impact = '请输入环保影响';
        isValid = false;
      }
      if (!newItem.value.savingsLabel1.trim()) {
        errors.value.savingsLabel1 = '请输入节省指标1名称';
        isValid = false;
      }
      if (!newItem.value.savingsValue1.trim()) {
        errors.value.savingsValue1 = '请输入节省指标1数值';
        isValid = false;
      }
    }
    
    return isValid;
  }
  
  function saveNewItem() {
  if (!validateForm()) {
    return;
  }

  const newId = `${newItem.value.type}-${Date.now()}`;

  if (newItem.value.type === 'reusable') {
    const formattedDate = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' }) + '获得';
    reusableItems.value.push({
      id: newId,
      name: newItem.value.name,
      status: newItem.value.status,
      image: newItem.value.image || '/placeholder.svg?height=120&width=120&text=' + newItem.value.name,
      acquiredDate: formattedDate,
      impact: newItem.value.impact,
      usageCount: newItem.value.usageCount,
      maxUsage: newItem.value.maxUsage,
      category: 'reusable'
    });
    environmentalImpact.value.disposableReduced += newItem.value.usageCount;
  } else if (newItem.value.type === 'recyclable') {
    const formattedDate = new Date(newItem.value.recycleDate).toLocaleDateString('zh-CN', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    recyclableItems.value.push({
      id: newId,
      name: newItem.value.name,
      recycleDate: formattedDate,
      details: newItem.value.details || '无详细信息',
      co2Impact: `-${newItem.value.co2Impact}kg`,
      category: 'recyclable'
    });
    environmentalImpact.value.itemsRecycled += 1;
    environmentalImpact.value.co2Reduced += Number(newItem.value.co2Impact);
  } else if (newItem.value.type === 'energy') {
    const formattedDate = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' }) + '获得';
    energyItems.value.push({
      id: newId,
      name: newItem.value.name,
      status: newItem.value.status,
      image: newItem.value.image || '/placeholder.svg?height=120&width=120&text=' + newItem.value.name,
      acquiredDate: formattedDate,
      impact: newItem.value.impact,
      savingsLabel1: newItem.value.savingsLabel1,
      savingsValue1: newItem.value.savingsValue1,
      savingsLabel2: newItem.value.savingsLabel2 || '减少碳排放',
      savingsValue2: newItem.value.savingsValue2 || '计算中...',
      category: 'energy'
    });
  }

  // 同步分类
  activeCategory.value = newItem.value.type;

  // 调试日志
  console.log('添加后 reusableItems:', reusableItems.value);
  console.log('添加后 recyclableItems:', recyclableItems.value);
  console.log('添加后 energyItems:', energyItems.value);

  closeAddItemModal();
  alert('物品添加成功！');
}
  
  function dismissReminder(index) {
    console.log('忽略提醒:', reminders.value[index]);
    reminders.value.splice(index, 1);
  }
  
  // 查看全部按钮功能
  function viewAllImpact() {
    console.log('查看所有环保影响');
  }
  
  function viewAllReusable() {
    console.log('查看所有可重复使用物品');
  }
  
  function viewAllRecyclable() {
    console.log('查看所有可回收物品');
  }
  
  function viewAllEnergy() {
    console.log('查看所有节能物品');
  }
  
  function viewAllReminders() {
    console.log('查看所有提醒');
  }
  
  // 添加物品按钮功能
  function addNewItem() {
    openAddItemModal();
  }
  
  // 在组件挂载时更新时间
  onMounted(() => {
    updateTime();
    setInterval(updateTime, 60000); // 每分钟更新一次时间
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
    --background-light: #f5f5f5;
    --background-white: #ffffff;
    --danger-color: #d32f2f;
    --success-color: #388e3c;
    --warning-color: #ff9800;
    --info-color: #2196f3;
    
    --border-radius: 12px;
    --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .page-container {
    background-color: var(--background-light);
    min-height: 100vh;
    padding-bottom: 2rem;
    position: relative;
  }
  
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: var(--background-white);
    position: sticky;
    top: -10px;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .page-header h1 {
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .back-button, .icon-button {
    background: none;
    border: none;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
  }
  
  /* 环保影响概览 */
  .impact-overview {
    background-color: var(--background-white);
    padding: 1.5rem 1rem;
    margin-bottom: 1rem;
  }
  
  .impact-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .impact-header h2 {
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .view-all-button {
    background: none;
    border: none;
    color: var(--primary-color);
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .impact-stats {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
  
  .impact-stat {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: var(--background-light);
    padding: 1.5rem 1rem;
    border-radius: var(--border-radius);
  }
  
  .impact-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .impact-icon.saved {
    background-color: rgba(46, 125, 50, 0.1);
    color: var(--primary-color);
  }
  
  .impact-icon.recycled {
    background-color: rgba(33, 150, 243, 0.1);
    color: var(--info-color);
  }
  
  .impact-icon.co2 {
    background-color: rgba(255, 193, 7, 0.1);
    color: var(--accent-color);
  }
  
  .stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  /* 物品分类标签 */
  .item-categories {
    background-color: var(--background-white);
    padding: 1rem;
    margin-bottom: 1rem;
    overflow-x: auto;
  }
  
  .categories-scroll {
    display: flex;
    gap: 0.75rem;
    padding-bottom: 0.5rem;
  }
  
  .category-button {
    white-space: nowrap;
    background: none;
    border: 1px solid #ddd;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-size: 0.9rem;
  }
  
  .category-button.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
  
  /* 物品搜索 */
  .search-container {
    display: flex;
    gap: 1rem;
    padding: 0 1rem;
    margin-bottom: 1.5rem;
  }
  
  .search-input {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background-color: var(--background-white);
    padding: 0.75rem 1rem;
    border-radius: 50px;
  }
  
  .search-input input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 0.95rem;
    background: transparent;
  }
  
  .filter-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--background-white);
    color: var(--text-primary);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* 物品部分 */
  .items-section {
    background-color: var(--background-white);
    padding: 1.5rem 1rem;
    margin-bottom: 1rem;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .section-header h2 {
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }
  
  .item-card {
    background-color: var(--background-light);
    border-radius: var(--border-radius);
    overflow: hidden;
  }
  
  .item-image {
    position: relative;
    height: 120px;
  }
  
  .item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .item-badge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background-color: var(--primary-color);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-size: 0.8rem;
  }
  
  .item-details {
    padding: 1.5rem;
  }
  
  .item-details h3 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  .item-meta {
    margin-bottom: 1rem;
  }
  
  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
  }
  
  .item-usage {
    margin-top: 1rem;
  }
  
  .usage-label, .savings-label {
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
  }
  
  .usage-bar {
    height: 6px;
    background-color: #e0e0e0;
    border-radius: 3px;
    margin-bottom: 0.5rem;
    overflow: hidden;
  }
  
  .usage-fill {
    height: 100%;
    background-color: var(--primary-color);
    border-radius: 3px;
  }
  
  .usage-value, .savings-value {
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.75rem;
  }
  
  .item-savings {
    margin-top: 1rem;
  }
  
  /* 物品列表样式 */
  .items-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .item-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: var(--background-light);
    padding: 1.25rem;
    border-radius: var(--border-radius);
  }
  
  .item-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .item-icon.recycled {
    background-color: rgba(33, 150, 243, 0.1);
    color: var(--info-color);
  }
  
  .item-info {
    flex: 1;
  }
  
  .item-info h3 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  .item-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  .item-impact {
    text-align: right;
  }
  
  .impact-value {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--success-color);
  }
  
  .impact-label {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }
  
  /* 提醒部分 */
  .reminders-section {
    background-color: var(--background-white);
    padding: 1.5rem 1rem;
    margin-bottom: 1rem;
  }
  
  .reminders-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .reminder-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: var(--background-light);
    padding: 1.25rem;
    border-radius: var(--border-radius);
    border-left: 4px solid var(--accent-color);
  }
  
  .reminder-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: rgba(255, 193, 7, 0.1);
    color: var(--accent-color);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .reminder-content {
    flex: 1;
  }
  
  .reminder-content h3 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  .reminder-content p {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  .reminder-actions {
    display: flex;
    align-items: center;
  }
  
  .dismiss-button {
    background: none;
    border: none;
    color: var(--text-secondary);
    padding: 0.5rem;
  }
  

/* 添加物品按钮 */
.add-item-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 100;
  cursor: pointer;
  transition: var(--transition);
}

.add-item-button:hover {
  background-color: var(--primary-dark);
  transform: scale(1.05);
}

/* 模态框样式 */
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
  padding: 1rem;
}

.modal-container {
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.modal-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.cancel-button {
  background-color: var(--background-light);
  color: var(--text-primary);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
}

.save-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
}

/* 表单样式 */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.required {
  color: var(--danger-color);
}

.form-group input, .form-group select, .form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-group input.error, .form-group select.error {
  border-color: var(--danger-color);
}

.error-message {
  color: var(--danger-color);
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

/* 物品类型选择器 */
.item-type-selector {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.type-button {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  background: none;
  cursor: pointer;
  transition: var(--transition);
}

.type-button.active {
  border-color: var(--primary-color);
  background-color: rgba(46, 125, 50, 0.05);
}

.type-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.type-icon.reusable {
  background-color: rgba(46, 125, 50, 0.1);
  color: var(--primary-color);
}

.type-icon.recyclable {
  background-color: rgba(33, 150, 243, 0.1);
  color: var(--info-color);
}

.type-icon.energy {
  background-color: rgba(255, 193, 7, 0.1);
  color: var(--accent-color);
}

/* 图片上传 */
.image-upload {
  width: 100%;
  height: 150px;
  border: 2px dashed #ddd;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
}

.image-preview {
  width: 100%;
  height: 100%;
  position: relative;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.input-with-prefix {
  display: flex;
  align-items: center;
}

.input-prefix {
  padding: 0.75rem;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-right: none;
  border-radius: 4px 0 0 4px;
}

.input-with-prefix input {
  border-radius: 0 4px 4px 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .impact-stats {
    flex-direction: column;
  }
  
  .items-grid {
    grid-template-columns: 1fr;
  }
  
  .item-row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .item-impact {
    align-self: flex-end;
    margin-top: 1rem;
  }
  
  .item-type-selector {
    flex-direction: column;
  }
}
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    .impact-stats {
      flex-direction: column;
    }
    
    .items-grid {
      grid-template-columns: 1fr;
    }
    
    .item-row {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .item-impact {
      align-self: flex-end;
      margin-top: 1rem;
    }
  }
  </style>