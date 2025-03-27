<template>
  <div class="items-page">
    <!-- Floating Action Button -->
    <button class="floating-action-btn" @click="showAddItemModal = true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 5v14"></path>
        <path d="M5 12h14"></path>
      </svg>
    </button>

    <!-- Header Section -->
    <header class="page-header">
      <div class="header-content">
        <div class="header-actions">
          <button class="icon-btn back-btn" @click="goBack">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
          <h1>物品管理</h1>
          <button class="icon-btn" @click="showSearch = !showSearch">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </button>
        </div>

        <!-- Search Bar -->
        <div class="search-container" v-if="showSearch">
          <div class="search-input-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="search-icon"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="搜索物品..."
              class="search-input"
              @input="filterItems"
            />
            <button
              class="clear-search-btn"
              v-if="searchQuery"
              @click="clearSearch"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>

          <div class="search-filters">
            <button class="filter-btn" @click="showFilterModal = true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"></path>
              </svg>
              筛选
            </button>
            <button class="filter-btn" @click="toggleSortMenu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M11 5h10"></path>
                <path d="M11 9h7"></path>
                <path d="M11 13h4"></path>
                <path d="m3 17 3 3 3-3"></path>
                <path d="M6 5v15"></path>
              </svg>
              排序
            </button>

            <!-- Sort Dropdown Menu -->
            <div class="sort-dropdown" v-if="showSortMenu">
              <button
                class="sort-option"
                :class="{ active: sortBy === 'name' }"
                @click="setSorting('name')"
              >
                名称
                <svg
                  v-if="sortBy === 'name'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
              <button
                class="sort-option"
                :class="{ active: sortBy === 'date' }"
                @click="setSorting('date')"
              >
                添加日期
                <svg
                  v-if="sortBy === 'date'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
              <button
                class="sort-option"
                :class="{ active: sortBy === 'usage' }"
                @click="setSorting('usage')"
              >
                使用次数
                <svg
                  v-if="sortBy === 'usage'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
              <button
                class="sort-option"
                :class="{ active: sortBy === 'impact' }"
                @click="setSorting('impact')"
              >
                环保影响
                <svg
                  v-if="sortBy === 'impact'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-cards">
        <div class="stat-card">
          <div class="stat-icon total">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a1.93 1.93 0 0 0-.97 1.68v4.8a1.93 1.93 0 0 0 .97 1.68l3.65 1.9"
              ></path>
              <path d="m22 17.5-9.54 5.01a1.08 1.08 0 0 1-.92 0L2 17.5"></path>
              <path d="m20 14.5-8.54 4.01a1.08 1.08 0 0 1-.92 0L2 14.5"></path>
              <path d="M22 12.5 12.46 17.5a1.08 1.08 0 0 1-.92 0L2 12.5"></path>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">95</div>
            <div class="stat-label">总物品</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon eco">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M2 22a8 8 0 0 1 8-8"></path>
              <path d="M2 22a8 8 0 0 0 8-8"></path>
              <path d="M12 14a8 8 0 0 0 8 8"></path>
              <path d="M12 14a8 8 0 0 1 8 8"></path>
              <circle cx="12" cy="6" r="4"></circle>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">35</div>
            <div class="stat-label">环保物品</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon reused">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"
              ></path>
              <path
                d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"
              ></path>
              <path d="m14 16-3 3 3 3"></path>
              <path d="M8.293 13.596 7.196 9.5 3.1 10.598"></path>
              <path
                d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"
              ></path>
              <path d="m13.378 9.633 4.096 1.098 1.097-4.096"></path>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">47</div>
            <div class="stat-label">再利用物品</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon impact">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 2v8"></path>
              <path d="m4.93 10.93 1.41 1.41"></path>
              <path d="M2 18h2"></path>
              <path d="M20 18h2"></path>
              <path d="m19.07 10.93-1.41 1.41"></path>
              <path d="M22 22H2"></path>
              <path d="M16 6 8 14"></path>
              <path d="M16 14 8 6"></path>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">13</div>
            <div class="stat-label">减少碳排放 (kg)</div>
          </div>
        </div>
      </div>

      <div class="impact-summary">
        <div class="impact-progress">
          <svg viewBox="0 0 36 36" class="impact-circle">
            <path
              class="impact-circle-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#eee"
              stroke-width="3"
            />
            <path
              class="impact-circle-fill"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#4caf50"
              stroke-width="3"
              stroke-dasharray="75, 100"
            />
          </svg>
          <div class="impact-content">
            <span class="impact-percentage">75%</span>
            <span class="impact-label">环保评分</span>
          </div>
        </div>
        <div class="impact-details">
          <p>
            您的物品使用减少了 <strong>13kg</strong> 碳排放，相当于种植了
            <strong>2</strong> 棵树！
          </p>
          <p>继续使用环保物品可以提高您的环保评分。</p>
        </div>
      </div>
    </section>

    <!-- Categories Navigation -->
    <section class="categories-nav">
      <div class="categories-scroll">
        <button
          v-for="category in categories"
          :key="category.id"
          class="category-btn"
          :class="{ active: activeCategory === category.id }"
          @click="setCategory(category.id)"
        >
          <div class="category-icon" :class="category.id">
            <component :is="category.icon" />
          </div>
          <span>{{ category.name }}</span>
        </button>
      </div>
    </section>

    <!-- View Toggle -->
    <section class="view-toggle">
      <div class="toggle-container">
        <button
          class="toggle-btn"
          :class="{ active: viewMode === 'grid' }"
          @click="viewMode = 'grid'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect width="7" height="7" x="3" y="3" rx="1"></rect>
            <rect width="7" height="7" x="14" y="3" rx="1"></rect>
            <rect width="7" height="7" x="14" y="14" rx="1"></rect>
            <rect width="7" height="7" x="3" y="14" rx="1"></rect>
          </svg>
          网格视图
        </button>
        <button
          class="toggle-btn"
          :class="{ active: viewMode === 'list' }"
          @click="viewMode = 'list'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="8" x2="21" y1="6" y2="6"></line>
            <line x1="8" x2="21" y1="12" y2="12"></line>
            <line x1="8" x2="21" y1="18" y2="18"></line>
            <line x1="3" x2="3.01" y1="6" y2="6"></line>
            <line x1="3" x2="3.01" y1="12" y2="12"></line>
            <line x1="3" x2="3.01" y1="18" y2="18"></line>
          </svg>
          列表视图
        </button>
      </div>
    </section>

    <!-- Items Content -->
    <main class="items-content">
      <!-- Empty State -->
      <div class="empty-state" v-if="filteredItems.length === 0">
        <div class="empty-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a1.93 1.93 0 0 0-.97 1.68v4.8a1.93 1.93 0 0 0 .97 1.68l3.65 1.9"
            ></path>
            <path d="m22 17.5-9.54 5.01a1.08 1.08 0 0 1-.92 0L2 17.5"></path>
            <path d="m20 14.5-8.54 4.01a1.08 1.08 0 0 1-.92 0L2 14.5"></path>
            <path d="M22 12.5 12.46 17.5a1.08 1.08 0 0 1-.92 0L2 12.5"></path>
          </svg>
        </div>
        <h3>未找到物品</h3>
        <p>尝试更改筛选条件或添加新物品</p>
        <button class="primary-btn" @click="showAddItemModal = true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 5v14"></path>
            <path d="M5 12h14"></path>
          </svg>
          添加物品
        </button>
      </div>

      <!-- Grid View -->
      <div class="items-grid" v-else-if="viewMode === 'grid'">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          class="grid-item"
          @click="selectItem(item)"
        >
          <div class="item-image">
            <img :src="item.image" :alt="item.name" />
            <div class="item-badges">
              <div class="item-badge" :class="item.type">
                {{ getTypeLabel(item.type) }}
              </div>
              <div class="item-status" :class="item.status" v-if="item.status">
                {{ getStatusLabel(item.status) }}
              </div>
            </div>
          </div>
          <div class="item-info">
            <h3 class="item-name">{{ item.name }}</h3>
            <div class="item-meta">
              <div class="item-category">
                {{ getCategoryName(item.category) }}
              </div>
              <div class="item-impact" v-if="item.impact">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 2v8"></path>
                  <path d="m4.93 10.93 1.41 1.41"></path>
                  <path d="M2 18h2"></path>
                  <path d="M20 18h2"></path>
                  <path d="m19.07 10.93-1.41 1.41"></path>
                  <path d="M22 22H2"></path>
                  <path d="M16 6 8 14"></path>
                  <path d="M16 14 8 6"></path>
                </svg>
                减少 {{ item.impact }} kg
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div class="items-list" v-else>
        <div
          v-for="item in filteredItems"
          :key="item.id"
          class="list-item"
          @click="selectItem(item)"
        >
          <div class="item-image">
            <img :src="item.image" :alt="item.name" />
            <div class="item-badge" :class="item.type">
              {{ getTypeLabel(item.type) }}
            </div>
          </div>
          <div class="item-content">
            <div class="item-header">
              <h3 class="item-name">{{ item.name }}</h3>
              <div class="item-status" :class="item.status" v-if="item.status">
                {{ getStatusLabel(item.status) }}
              </div>
            </div>
            <p class="item-description">{{ item.description }}</p>
            <div class="item-footer">
              <div class="item-category">
                {{ getCategoryName(item.category) }}
              </div>
              <div class="item-usage">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
                使用 {{ item.usageDays }} 天
              </div>
              <div class="item-impact" v-if="item.impact">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 2v8"></path>
                  <path d="m4.93 10.93 1.41 1.41"></path>
                  <path d="M2 18h2"></path>
                  <path d="M20 18h2"></path>
                  <path d="m19.07 10.93-1.41 1.41"></path>
                  <path d="M22 22H2"></path>
                  <path d="M16 6 8 14"></path>
                  <path d="M16 14 8 6"></path>
                </svg>
                减少 {{ item.impact }} kg
              </div>
            </div>
          </div>
          <button class="quick-action-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>
    </main>

    <!-- Add Item Modal -->
    <div
      class="modal-overlay"
      v-if="showAddItemModal"
      @click="showAddItemModal = false"
    >
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h2>添加新物品</h2>
          <button class="close-btn" @click="showAddItemModal = false">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        <div class="modal-content">
          <div class="image-upload">
            <div class="upload-preview" v-if="newItem.image">
              <img :src="newItem.image" alt="物品图片预览" />
              <button class="remove-image-btn" @click="removeImage">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <label class="upload-btn" v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"
                ></path>
                <line x1="16" x2="22" y1="5" y2="5"></line>
                <line x1="19" x2="19" y1="2" y2="8"></line>
                <circle cx="9" cy="9" r="2"></circle>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
              </svg>
              <span>上传图片</span>
              <input
                type="file"
                class="file-input"
                accept="image/*"
                @change="handleImageUpload"
              />
            </label>
          </div>

          <div class="form-group">
            <label>物品名称</label>
            <input
              type="text"
              v-model="newItem.name"
              placeholder="输入物品名称"
            />
          </div>

          <div class="form-group">
            <label>物品描述</label>
            <textarea
              v-model="newItem.description"
              placeholder="输入物品描述"
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>类别</label>
              <select v-model="newItem.category">
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>物品类型</label>
              <select v-model="newItem.type">
                <option value="eco">环保物品</option>
                <option value="reused">再利用物品</option>
                <option value="recycled">回收物品</option>
                <option value="regular">普通物品</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>购买/获得日期</label>
              <input type="date" v-model="newItem.acquiredDate" />
            </div>

            <div class="form-group">
              <label>状态</label>
              <select v-model="newItem.status">
                <option value="active">使用中</option>
                <option value="inactive">存放中</option>
                <option value="maintenance">维护中</option>
                <option value="disposed">已处理</option>
              </select>
            </div>
          </div>

          <div class="form-group" v-if="newItem.type !== 'regular'">
            <label>环保数据</label>

            <div class="eco-data-row">
              <div class="eco-data-field">
                <label>使用天数</label>
                <input type="number" v-model="newItem.usageDays" min="0" />
              </div>

              <div class="eco-data-field">
                <label>替代次数</label>
                <input type="number" v-model="newItem.replacements" min="0" />
              </div>
            </div>

            <div class="eco-data-row">
              <div class="eco-data-field">
                <label>碳减排 (kg)</label>
                <input
                  type="number"
                  v-model="newItem.impact"
                  step="0.1"
                  min="0"
                />
              </div>

              <div class="eco-data-field">
                <label>节约资源</label>
                <input
                  type="text"
                  v-model="newItem.resourcesSaved"
                  placeholder="如: 5L 水"
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>标签</label>
            <div class="tags-input">
              <div class="tags-container">
                <div
                  class="tag"
                  v-for="(tag, index) in newItem.tags"
                  :key="index"
                >
                  {{ tag }}
                  <button class="remove-tag-btn" @click="removeTag(index)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <input
                type="text"
                v-model="tagInput"
                placeholder="输入标签并按回车添加"
                @keyup.enter="addTag"
              />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="secondary-btn" @click="showAddItemModal = false">
            取消
          </button>
          <button class="primary-btn" @click="addNewItem">保存</button>
        </div>
      </div>
    </div>

    <!-- Item Detail Modal -->
    <div class="modal-overlay" v-if="selectedItem" @click="selectedItem = null">
      <div
        class="modal-container item-detail-modal"
        @click.stop
        @click="selectedItem = null"
      >
        <div class="modal-container item-detail-modal" @click.stop>
          <div class="modal-header">
            <button class="close-btn" @click="selectedItem = null">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>

          <div class="item-detail-content">
            <div class="item-detail-image">
              <img :src="selectedItem.image" :alt="selectedItem.name" />
              <div class="item-badges">
                <div class="item-badge" :class="selectedItem.type">
                  {{ getTypeLabel(selectedItem.type) }}
                </div>
                <div
                  class="item-status"
                  :class="selectedItem.status"
                  v-if="selectedItem.status"
                >
                  {{ getStatusLabel(selectedItem.status) }}
                </div>
              </div>
            </div>

            <div class="item-detail-info">
              <h2 class="item-detail-name">{{ selectedItem.name }}</h2>
              <div class="item-detail-category">
                {{ getCategoryName(selectedItem.category) }}
              </div>

              <p class="item-detail-description">
                {{ selectedItem.description }}
              </p>

              <div class="item-detail-section">
                <h3 class="section-title">基本信息</h3>
                <div class="detail-grid">
                  <div class="detail-item">
                    <div class="detail-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="4"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" x2="16" y1="2" y2="6"></line>
                        <line x1="8" x2="8" y1="2" y2="6"></line>
                        <line x1="3" x2="21" y1="10" y2="10"></line>
                      </svg>
                    </div>
                    <div class="detail-content">
                      <span class="detail-label">获得日期</span>
                      <span class="detail-value">{{
                        formatDate(selectedItem.acquiredDate)
                      }}</span>
                    </div>
                  </div>

                  <div class="detail-item">
                    <div class="detail-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"
                        ></path>
                      </svg>
                    </div>
                    <div class="detail-content">
                      <span class="detail-label">当前状态</span>
                      <span class="detail-value">{{
                        getStatusLabel(selectedItem.status)
                      }}</span>
                    </div>
                  </div>

                  <div class="detail-item" v-if="selectedItem.usageDays">
                    <div class="detail-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div class="detail-content">
                      <span class="detail-label">使用天数</span>
                      <span class="detail-value"
                        >{{ selectedItem.usageDays }} 天</span
                      >
                    </div>
                  </div>

                  <div class="detail-item" v-if="selectedItem.replacements">
                    <div class="detail-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
                        ></path>
                        <path d="M3 3v5h5"></path>
                      </svg>
                    </div>
                    <div class="detail-content">
                      <span class="detail-label">替代次数</span>
                      <span class="detail-value"
                        >{{ selectedItem.replacements }} 次</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="item-detail-section"
                v-if="selectedItem.type !== 'regular'"
              >
                <h3 class="section-title">环保影响</h3>
                <div class="impact-cards">
                  <div class="impact-card" v-if="selectedItem.impact">
                    <div class="impact-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M12 2v8"></path>
                        <path d="m4.93 10.93 1.41 1.41"></path>
                        <path d="M2 18h2"></path>
                        <path d="M20 18h2"></path>
                        <path d="m19.07 10.93-1.41 1.41"></path>
                        <path d="M22 22H2"></path>
                        <path d="M16 6 8 14"></path>
                        <path d="M16 14 8 6"></path>
                      </svg>
                    </div>
                    <div class="impact-data">
                      <div class="impact-value">
                        {{ selectedItem.impact }} kg
                      </div>
                      <div class="impact-label">减少碳排放</div>
                    </div>
                  </div>

                  <div class="impact-card" v-if="selectedItem.resourcesSaved">
                    <div class="impact-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"
                        ></path>
                        <path
                          d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"
                        ></path>
                        <circle cx="18" cy="6" r="3"></circle>
                      </svg>
                    </div>
                    <div class="impact-data">
                      <div class="impact-value">
                        {{ selectedItem.resourcesSaved }}
                      </div>
                      <div class="impact-label">节约资源</div>
                    </div>
                  </div>

                  <div class="impact-card" v-if="selectedItem.replacements">
                    <div class="impact-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M17 14V2"></path>
                        <path
                          d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"
                        ></path>
                      </svg>
                    </div>
                    <div class="impact-data">
                      <div class="impact-value">
                        {{ selectedItem.replacements }} 件
                      </div>
                      <div class="impact-label">减少使用一次性物品</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div
                class="item-detail-section"
                v-if="selectedItem.tags && selectedItem.tags.length"
              >
                <h3 class="section-title">标签</h3>
                <div class="tags-container detail-tags">
                  <div
                    class="tag"
                    v-for="(tag, index) in selectedItem.tags"
                    :key="index"
                  >
                    {{ tag }}
                  </div>
                </div>
              </div> -->
            </div>
          </div>

          <div class="modal-footer item-actions">
            <button class="secondary-btn danger" @click="deleteItem">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
              删除
            </button>
            <button class="secondary-btn" @click="shareItem">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" x2="12" y1="2" y2="15"></line>
              </svg>
              分享
            </button>
            <button class="primary-btn" @click="editItem">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
              </svg>
              编辑
            </button>
          </div>
        </div>
      </div>

      <!-- Filter Modal -->
      <div
        class="modal-overlay"
        v-if="showFilterModal"
        @click="showFilterModal = false"
      >
        <div class="modal-container filter-modal" @click.stop>
          <div class="modal-header">
            <h2>筛选物品</h2>
            <button class="close-btn" @click="showFilterModal = false">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>

          <div class="modal-content">
            <div class="filter-section">
              <h3>物品类型</h3>
              <div class="filter-options">
                <label
                  class="filter-option"
                  v-for="type in itemTypes"
                  :key="type.value"
                >
                  <input
                    type="checkbox"
                    v-model="filters.types"
                    :value="type.value"
                  />
                  <span class="checkbox-custom"></span>
                  <span>{{ type.label }}</span>
                </label>
              </div>
            </div>

            <div class="filter-section">
              <h3>物品状态</h3>
              <div class="filter-options">
                <label
                  class="filter-option"
                  v-for="status in itemStatuses"
                  :key="status.value"
                >
                  <input
                    type="checkbox"
                    v-model="filters.statuses"
                    :value="status.value"
                  />
                  <span class="checkbox-custom"></span>
                  <span>{{ status.label }}</span>
                </label>
              </div>
            </div>

            <div class="filter-section">
              <h3>使用时长</h3>
              <div class="filter-range">
                <input
                  type="range"
                  v-model="filters.usageDays"
                  min="0"
                  max="365"
                  step="30"
                />
                <div class="range-values">
                  <span>{{ filters.usageDays }} 天以上</span>
                </div>
              </div>
            </div>

            <div class="filter-section">
              <h3>环保影响</h3>
              <div class="filter-range">
                <input
                  type="range"
                  v-model="filters.impact"
                  min="0"
                  max="20"
                  step="1"
                />
                <div class="range-values">
                  <span>{{ filters.impact }} kg 以上</span>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="secondary-btn" @click="resetFilters">
              重置筛选
            </button>
            <button class="primary-btn" @click="applyFilters">应用筛选</button>
          </div>
        </div>
      </div>

      <!-- Bottom Navigation -->
      <nav class="bottom-nav">
        <button class="nav-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>首页</span>
        </button>
        <button class="nav-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
            ></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
          <span>行动</span>
        </button>
        <button class="nav-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>地图</span>
        </button>
        <button class="nav-item active">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="8" r="5"></circle>
            <path d="M20 21a8 8 0 1 0-16 0"></path>
          </svg>
          <span>我的</span>
        </button>
      </nav>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, computed, onMounted } from "vue";

// State
const viewMode = ref("grid");
const showSearch = ref(false);
const showSortMenu = ref(false);
const showAddItemModal = ref(false);
const showFilterModal = ref(false);
const selectedItem = ref(null);
const searchQuery = ref("");
const activeCategory = ref("all");
const sortBy = ref("date");
const tagInput = ref("");

// New item form
const newItem = ref({
  name: "",
  description: "",
  category: "daily",
  type: "eco",
  image: "",
  acquiredDate: new Date().toISOString().substring(0, 10),
  status: "active",
  usageDays: 0,
  replacements: 0,
  impact: 0,
  resourcesSaved: "",
  tags: [],
});

// Filter options
const filters = ref({
  types: [],
  statuses: [],
  usageDays: 0,
  impact: 0,
});

// Item Types
const itemTypes = [
  { value: "eco", label: "环保物品" },
  { value: "reused", label: "再利用物品" },
  { value: "recycled", label: "回收物品" },
  { value: "regular", label: "普通物品" },
];

// Item Statuses
const itemStatuses = [
  { value: "active", label: "使用中" },
  { value: "inactive", label: "存放中" },
  { value: "maintenance", label: "维护中" },
  { value: "disposed", label: "已处理" },
];

// Categories
const categories = [
  { id: "all", name: "全部物品", icon: "AllIcon" },
  { id: "daily", name: "日常用品", icon: "DailyIcon" },
  { id: "kitchen", name: "厨房用品", icon: "KitchenIcon" },
  { id: "clothing", name: "服装", icon: "ClothingIcon" },
  { id: "electronics", name: "电子产品", icon: "ElectronicsIcon" },
  { id: "stationery", name: "文具", icon: "StationeryIcon" },
  { id: "sports", name: "运动器材", icon: "SportsIcon" },
  { id: "furniture", name: "家具", icon: "FurnitureIcon" },
  { id: "others", name: "其他", icon: "OthersIcon" },
];

// Mock data for items
const items = ref([
  {
    id: 1,
    name: "可重复使用水杯",
    description: "不锈钢保温杯，减少一次性杯子的使用",
    category: "daily",
    type: "eco",
    image: "/placeholder.svg?height=200&width=200",
    acquiredDate: "2023-01-15",
    status: "active",
    usageDays: 145,
    replacements: 29,
    impact: 0.7,
    resourcesSaved: "29个一次性杯子",
    tags: ["水杯", "不锈钢", "保温"],
  },
  {
    id: 2,
    name: "环保购物袋",
    description: "可折叠环保购物袋，减少塑料袋的使用",
    category: "daily",
    type: "reused",
    image: "/placeholder.svg?height=200&width=200",
    acquiredDate: "2023-02-20",
    status: "active",
    usageDays: 78,
    replacements: 78,
    impact: 1.2,
    resourcesSaved: "78个塑料袋",
    tags: ["购物袋", "可折叠", "布制"],
  },
  {
    id: 3,
    name: "太阳能充电宝",
    description: "带太阳能充电面板的移动电源，可减少用电量",
    category: "electronics",
    type: "eco",
    image: "/placeholder.svg?height=200&width=200",
    acquiredDate: "2023-03-10",
    status: "active",
    usageDays: 92,
    replacements: 0,
    impact: 4.6,
    resourcesSaved: "4.6度电",
    tags: ["充电宝", "太阳能", "移动电源"],
  },
  {
    id: 4,
    name: "二手书籍",
    description: "二手购入的环保相关书籍",
    category: "stationery",
    type: "reused",
    image: "/placeholder.svg?height=200&width=200",
    acquiredDate: "2023-04-05",
    status: "active",
    usageDays: 65,
    replacements: 1,
    impact: 0.5,
    resourcesSaved: "1本新书",
    tags: ["书籍", "二手", "环保"],
  },
  {
    id: 5,
    name: "竹制牙刷",
    description: "可生物降解的竹制牙刷，替代塑料牙刷",
    category: "daily",
    type: "eco",
    image: "/placeholder.svg?height=200&width=200",
    acquiredDate: "2023-05-01",
    status: "active",
    usageDays: 45,
    replacements: 3,
    impact: 0.3,
    resourcesSaved: "3个塑料牙刷",
    tags: ["牙刷", "竹制", "生物降解"],
  },
  {
    id: 6,
    name: "节水花洒",
    description: "节水型淋浴花洒，减少用水量",
    category: "daily",
    type: "eco",
    image: "/placeholder.svg?height=200&width=200",
    acquiredDate: "2023-05-20",
    status: "active",
    usageDays: 25,
    replacements: 0,
    impact: 5.0,
    resourcesSaved: "约500L水",
    tags: ["花洒", "节水", "淋浴"],
  },
  {
    id: 7,
    name: "再生纸笔记本",
    description: "使用再生纸制作的笔记本",
    category: "stationery",
    type: "recycled",
    image: "/placeholder.svg?height=200&width=200",
    acquiredDate: "2023-06-10",
    status: "active",
    usageDays: 15,
    replacements: 2,
    impact: 0.2,
    resourcesSaved: "约0.5kg纸",
    tags: ["笔记本", "再生纸", "文具"],
  },
  {
    id: 8,
    name: "旧衣改造手袋",
    description: "将旧衣服改造的手提袋",
    category: "clothing",
    type: "reused",
    image: "/placeholder.svg?height=200&width=200",
    acquiredDate: "2023-06-15",
    status: "active",
    usageDays: 10,
    replacements: 1,
    impact: 0.6,
    resourcesSaved: "1个新手袋",
    tags: ["手袋", "旧衣改造", "手工"],
  },
]);

// Custom component definitions for category icons
const AllIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a1.93 1.93 0 0 0-.97 1.68v4.8a1.93 1.93 0 0 0 .97 1.68l3.65 1.9"></path><path d="m22 17.5-9.54 5.01a1.08 1.08 0 0 1-.92 0L2 17.5"></path><path d="m20 14.5-8.54 4.01a1.08 1.08 0 0 1-.92 0L2 14.5"></path><path d="M22 12.5 12.46 17.5a1.08 1.08 0 0 1-.92 0L2 12.5"></path></svg>`,
};

const DailyIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12"></path><path d="M8 12h8"></path><path d="M9 16h6"></path><path d="M18 20V4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14"></path></svg>`,
};

const KitchenIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20"></path><path d="M12 2v20"></path><circle cx="12" cy="12" r="10"></circle></svg>`,
};

const ClothingIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 17h11v4h-11z"></path><path d="m3 7 7-4s-1 6 2 6 2-6 2-6l7 4-2.5 10h-13z"></path></svg>`,
};

const ElectronicsIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a5 5 0 0 0-5 5v14a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"></path><path d="M15 7H9"></path><path d="M15 17H9"></path></svg>`,
};

const StationeryIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"></path><path d="M5 12h14"></path></svg>`,
};

const SportsIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m16.24 7.76-4.24 4.24-4.24-4.24"></path><path d="m16.24 16.24-4.24-4.24-4.24 4.24"></path></svg>`,
};

const FurnitureIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 8H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z"></path><path d="M4 8v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"></path><path d="M18 5H6"></path></svg>`,
};

const OthersIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
};

// Register components
const app = {
  components: {
    AllIcon,
    DailyIcon,
    KitchenIcon,
    ClothingIcon,
    ElectronicsIcon,
    StationeryIcon,
    SportsIcon,
    FurnitureIcon,
    OthersIcon,
  },
};

// Computed properties
const filteredItems = computed(() => {
  let result = items.value;

  // Filter by search query
  if (searchQuery.value) {
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        (item.tags &&
          item.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.value.toLowerCase())
          ))
    );
  }

  // Filter by category
  if (activeCategory.value !== "all") {
    result = result.filter((item) => item.category === activeCategory.value);
  }

//   // Apply advanced filters
//   if (filters.types.length > 0) {
//     result = result.filter((item) => filters.types.includes(item.type));
//   }

//   if (filters.statuses.length > 0) {
//     result = result.filter((item) => filters.statuses.includes(item.status));
//   }

//   if (filters.usageDays > 0) {
//     result = result.filter((item) => item.usageDays >= filters.usageDays);
//   }

//   if (filters.impact > 0) {
//     result = result.filter((item) => item.impact >= filters.impact);
//   }

  // Apply sorting
  if (sortBy.value === "name") {
    result = result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy.value === "date") {
    result = result.sort(
      (a, b) => new Date(b.acquiredDate) - new Date(a.acquiredDate)
    );
  } else if (sortBy.value === "usage") {
    result = result.sort((a, b) => b.usageDays - a.usageDays);
  } else if (sortBy.value === "impact") {
    result = result.sort((a, b) => b.impact - a.impact);
  }

  return result;
});

// Methods
function setCategory(categoryId) {
  activeCategory.value = categoryId;
}

function toggleSortMenu() {
  showSortMenu.value = !showSortMenu.value;
}

function setSorting(sort) {
  sortBy.value = sort;
  showSortMenu.value = false;
}

function filterItems() {
  // Search is handled by computed property
}

function clearSearch() {
  searchQuery.value = "";
}

function selectItem(item) {
  selectedItem.value = item;
}

function getTypeLabel(type) {
  const typeObj = itemTypes.find((t) => t.value === type);
  return typeObj ? typeObj.label : "";
}

function getStatusLabel(status) {
  const statusObj = itemStatuses.find((s) => s.value === status);
  return statusObj ? statusObj.label : "";
}

function getCategoryName(categoryId) {
  const category = categories.find((c) => c.id === categoryId);
  return category ? category.name : "";
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    // In a real app, this would upload to a server
    // For this demo, we'll use a placeholder
    newItem.value.image = "/placeholder.svg?height=200&width=200";
  }
}

function removeImage() {
  newItem.value.image = "";
}

function addTag() {
  if (
    tagInput.value.trim() &&
    !newItem.value.tags.includes(tagInput.value.trim())
  ) {
    newItem.value.tags.push(tagInput.value.trim());
    tagInput.value = "";
  }
}

function removeTag(index) {
  newItem.value.tags.splice(index, 1);
}

function addNewItem() {
  const item = {
    id: items.value.length + 1,
    ...newItem.value,
  };

  items.value.push(item);
  showAddItemModal.value = false;

  // Reset form
  newItem.value = {
    name: "",
    description: "",
    category: "daily",
    type: "eco",
    image: "",
    acquiredDate: new Date().toISOString().substring(0, 10),
    status: "active",
    usageDays: 0,
    replacements: 0,
    impact: 0,
    resourcesSaved: "",
    tags: [],
  };
}

function resetFilters() {
  filters.value = {
    types: [],
    statuses: [],
    usageDays: 0,
    impact: 0,
  };
}

function applyFilters() {
  showFilterModal.value = false;
  // The filtering is handled by the computed property
}

function deleteItem() {
  if (selectedItem.value) {
    const index = items.value.findIndex(
      (item) => item.id === selectedItem.value.id
    );
    if (index !== -1) {
      items.value.splice(index, 1);
    }
    selectedItem.value = null;
  }
}

function editItem() {
  // In a real app, this would open the edit form
  // For this demo, we'll just close the modal
  selectedItem.value = null;
}

function shareItem() {
  // In a real app, this would open sharing options
  // For this demo, we'll just show an alert
  alert(`分享 ${selectedItem.value.name}`);
}

function goBack() {
  // In a real app, this would navigate back
  console.log("Go back");
}

// Lifecycle hooks
onMounted(() => {
  // Initialize
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
  --danger-color: #d32f2f;
  --success-color: #388e3c;
  --warning-color: #ff9800;
  --info-color: #2196f3;

  /* Item type colors */
  --eco-color: #4caf50;
  --reused-color: #8bc34a;
  --recycled-color: #00bcd4;
  --regular-color: #9e9e9e;

  /* Status colors */
  --active-color: #4caf50;
  --inactive-color: #9e9e9e;
  --maintenance-color: #ff9800;
  --disposed-color: #f44336;

  --border-radius-sm: 8px;
  --border-radius: 12px;
  --border-radius-lg: 16px;
  --box-shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --box-shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.items-page {
  background-color: var(--background-light);
  min-height: 100vh;
  position: relative;
  padding-bottom: 70px; /* 为底部导航留出空间 */
}

/* 浮动操作按钮 */
.floating-action-btn {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: var(--box-shadow-lg);
  z-index: 100;
  cursor: pointer;
  transition: var(--transition);
}

.floating-action-btn:hover {
  transform: translateY(-4px);
  background-color: var(--primary-dark);
}

/* 页面头部 */
.page-header {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 0;
}

.header-content {
  padding: 0 1.25rem;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions h1 {
  font-size: 1.25rem;
  font-weight: 600;
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

/* 搜索栏 */
.search-container {
  margin-top: 1rem;
  animation: slideDown 0.3s ease;
}

.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 0.5rem 1rem;
  margin-bottom: 0.75rem;
}

.search-icon {
  margin-right: 0.5rem;
  color: white;
}

.search-input {
  flex: 1;
  background: none;
  border: none;
  color: white;
  outline: none;
  font-size: 0.95rem;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.clear-search-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.search-filters {
  display: flex;
  gap: 0.75rem;
  position: relative;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 50px;
  color: white;
  font-size: 0.85rem;
  cursor: pointer;
  transition: var(--transition);
}

.filter-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.sort-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 0.5rem;
  z-index: 50;
  min-width: 150px;
  animation: slideUp 0.3s ease;
}

.sort-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: left;
  padding: 0.75rem;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  font-size: 0.9rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: var(--transition);
}

.sort-option:hover {
  background-color: var(--background-light);
}

.sort-option.active {
  color: var(--primary-color);
  font-weight: 500;
}

/* 统计部分 */
.stats-section {
  padding: 1.25rem;
  margin-bottom: 1rem;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.stat-card {
  display: flex;
  align-items: center;
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  padding: 1rem;
  box-shadow: var(--box-shadow-sm);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.stat-icon.total {
  background-color: rgba(96, 125, 139, 0.1);
  color: var(--secondary-color);
}

.stat-icon.eco {
  background-color: rgba(76, 175, 80, 0.1);
  color: var(--eco-color);
}

.stat-icon.reused {
  background-color: rgba(139, 195, 74, 0.1);
  color: var(--reused-color);
}

.stat-icon.impact {
  background-color: rgba(0, 188, 212, 0.1);
  color: var(--recycled-color);
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.impact-summary {
  display: flex;
  align-items: center;
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  padding: 1.25rem;
  box-shadow: var(--box-shadow-sm);
}

.impact-progress {
  position: relative;
  width: 80px;
  height: 80px;
  margin-right: 1.25rem;
  flex-shrink: 0;
}

.impact-circle {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.impact-circle-bg {
  stroke-width: 3;
}

.impact-circle-fill {
  stroke-width: 3;
  stroke-linecap: round;
}

.impact-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.impact-percentage {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--eco-color);
}

.impact-label {
  font-size: 0.7rem;
  color: var(--text-secondary);
}

.impact-details {
  flex: 1;
}

.impact-details p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.impact-details p:last-child {
  margin-bottom: 0;
}

.impact-details strong {
  color: var(--text-primary);
  font-weight: 600;
}

/* 类别导航 */
.categories-nav {
  margin-bottom: 1rem;
  background-color: var(--background-white);
  padding: 1rem 0;
}

.categories-scroll {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 0 1.25rem;
}

.categories-scroll::-webkit-scrollbar {
  display: none;
}

.category-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
  background: none;
  border: none;
  padding: 0.75rem 0.5rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition);
}

.category-btn.active {
  color: var(--primary-color);
}

.category-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  background-color: var(--background-light);
  color: var(--text-secondary);
  transition: var(--transition);
}

.category-btn.active .category-icon {
  background-color: rgba(46, 125, 50, 0.1);
  color: var(--primary-color);
}

/* 视图切换 */
.view-toggle {
  padding: 0 1.25rem;
  margin-bottom: 1rem;
}

.toggle-container {
  display: flex;
  background-color: var(--background-light);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.toggle-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: none;
  border: none;
  padding: 0.75rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition);
}

.toggle-btn.active {
  background-color: var(--background-white);
  color: var(--primary-color);
  font-weight: 500;
  box-shadow: var(--box-shadow-sm);
}

/* 物品内容 */
.items-content {
  padding: 0 1.25rem 1.25rem;
}

.empty-state {
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  padding: 2.5rem 1.5rem;
  text-align: center;
  box-shadow: var(--box-shadow-sm);
}

.empty-icon {
  color: var(--text-tertiary);
  margin-bottom: 1.25rem;
}

.empty-state h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.empty-state p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

/* 网格视图 */
.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.grid-item {
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow-sm);
  cursor: pointer;
  transition: var(--transition);
}

.grid-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--box-shadow);
}

.item-image {
  position: relative;
  height: 150px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-badges {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-badge {
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  background-color: var(--eco-color);
  color: white;
  font-weight: 500;
}

.item-badge.eco {
  background-color: var(--eco-color);
}

.item-badge.reused {
  background-color: var(--reused-color);
}

.item-badge.recycled {
  background-color: var(--recycled-color);
}

.item-badge.regular {
  background-color: var(--regular-color);
}

.item-status {
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  color: white;
  font-weight: 500;
}

.item-status.active {
  background-color: var(--active-color);
}

.item-status.inactive {
  background-color: var(--inactive-color);
}

.item-status.maintenance {
  background-color: var(--maintenance-color);
}

.item-status.disposed {
  background-color: var(--disposed-color);
}

.item-info {
  padding: 0.75rem;
}

.item-name {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.item-category {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.item-impact {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--recycled-color);
}

/* 列表视图 */
.items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.list-item {
  display: flex;
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow-sm);
  cursor: pointer;
  transition: var(--transition);
}

.list-item:hover {
  transform: translateY(-3px);
  box-shadow: var(--box-shadow);
}

.list-item .item-image {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.list-item .item-badge {
  font-size: 0.65rem;
  padding: 0.15rem 0.4rem;
}

.item-content {
  flex: 1;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.list-item .item-name {
  margin-bottom: 0;
  font-size: 1rem;
}

.list-item .item-status {
  font-size: 0.65rem;
  padding: 0.15rem 0.4rem;
}

.item-description {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  flex: 1;
}

.item-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.item-category,
.item-usage,
.item-impact {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.quick-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.75rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition);
}

.quick-action-btn:hover {
  color: var(--text-primary);
  background-color: var(--background-light);
}

/* 模态框 */
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
  box-shadow: var(--box-shadow-lg);
  animation: slideUp 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
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
  transition: var(--transition);
}

.close-btn:hover {
  background-color: var(--background-light);
}

.modal-content {
  padding: 1.25rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.25rem;
  border-top: 1px solid #f0f0f0;
}

/* 表单样式 */
.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  background-color: var(--background-light);
  color: var(--text-primary);
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.form-row .form-group {
  flex: 1;
  margin-bottom: 0;
}

.eco-data-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.eco-data-row:last-child {
  margin-bottom: 0;
}

.eco-data-field {
  flex: 1;
}

.eco-data-field label {
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
}

/* 图片上传 */
.image-upload {
  margin-bottom: 1.5rem;
}

.upload-preview {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
}

.remove-image-btn:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.upload-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  border: 2px dashed #ddd;
  border-radius: var(--border-radius);
  background-color: var(--background-light);
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition);
}

.upload-btn:hover {
  background-color: #eee;
}

.upload-btn span {
  margin-top: 0.75rem;
  font-size: 0.9rem;
}

.file-input {
  display: none;
}

/* 标签输入 */
.tags-input {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem 0.75rem;
  background-color: var(--background-light);
  border-radius: 50px;
  font-size: 0.85rem;
  color: var(--text-primary);
}

.detail-tags .tag {
  padding: 0.5rem 0.75rem;
}

/* 物品详情模态框 */
.item-detail-modal {
  max-width: 600px;
}

.item-detail-modal .modal-header {
  border-bottom: none;
  padding: 1rem;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
}

.item-detail-modal .close-btn {
  background-color: rgba(255, 255, 255, 0.8);
}

.item-detail-content {
  display: flex;
  flex-direction: column;
}

.item-detail-image {
  position: relative;
  height: 250px;
  width: 100%;
}

.item-detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-detail-info {
  padding: 1.5rem;
}

.item-detail-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.item-detail-category {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1.25rem;
}

.item-detail-description {
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.item-detail-section {
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 0.5rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.detail-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--background-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.detail-content {
  flex: 1;
}

.detail-label {
  display: block;
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
}

.impact-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.impact-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--background-light);
  border-radius: var(--border-radius);
  padding: 1.25rem;
}

.impact-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(76, 175, 80, 0.1);
  color: var(--eco-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.impact-data {
  text-align: center;
}

.impact-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.impact-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.item-actions {
  display: flex;
  justify-content: space-between;
}

.danger {
  color: var(--danger-color);
}

/* 筛选模态框 */
.filter-modal .modal-content {
  padding-top: 0;
}

.filter-section {
  padding: 1.25rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.filter-section:last-child {
  border-bottom: none;
}

.filter-section h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.filter-option input[type="checkbox"] {
  display: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 4px;
  position: relative;
}

.filter-option input[type="checkbox"]:checked + .checkbox-custom::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 6px;
  width: 5px;
  height: 10px;
  border: solid var(--primary-color);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.filter-range {
  padding: 0 0.5rem;
}

.filter-range input[type="range"] {
  width: 100%;
  margin-bottom: 0.5rem;
  height: 5px;
  -webkit-appearance: none;
  background: #ddd;
  border-radius: 5px;
  outline: none;
}

.filter-range input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
}

.range-values {
  display: flex;
  justify-content: center;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* 按钮样式 */
.primary-btn,
.secondary-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.primary-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.primary-btn:hover {
  background-color: var(--primary-dark);
}

.secondary-btn {
  background-color: var(--background-light);
  color: var(--text-primary);
  border: none;
}

.secondary-btn:hover {
  background-color: #e0e0e0;
}

.secondary-btn.danger {
  color: var(--danger-color);
}

.secondary-btn.danger:hover {
  background-color: rgba(211, 47, 47, 0.1);
}

/* 底部导航 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: var(--background-white);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 90;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 0;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 0.8rem;
  cursor: pointer;
}

.nav-item.active {
  color: var(--primary-color);
}

.nav-item span {
  margin-top: 0.25rem;
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 响应式设计 */
@media (min-width: 768px) {
  .header-content,
  .stats-section,
  .categories-nav,
  .view-toggle,
  .items-content {
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
  }

  .stats-cards {
    grid-template-columns: repeat(4, 1fr);
  }

  .items-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .item-detail-content {
    flex-direction: row;
  }

  .item-detail-image {
    width: 40%;
    height: auto;
  }

  .item-detail-info {
    width: 60%;
  }

  .bottom-nav {
    max-width: 768px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 16px 16px 0 0;
  }
}

@media (min-width: 480px) and (max-width: 767px) {
  .items-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 暗色模式支持 */
.dark {
  --text-primary: #f5f5f5;
  --text-secondary: #b0b0b0;
  --text-tertiary: #909090;
  --background-light: #1e1e1e;
  --background-white: #2d2d2d;
}
</style>