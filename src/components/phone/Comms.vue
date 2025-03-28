<template>
  <div class="community-page">
    <!-- Navigation Header -->
    <!-- <header class="main-header">
        <div class="container">
          <div class="logo">
            <h2>CommunityHub</h2>
          </div>
          <button class="menu-toggle" @click="toggleMobileMenu">
            <svg v-if="!showMobileMenu" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <nav class="main-nav" :class="{ 'active': showMobileMenu }">
            <a href="#" class="nav-link">Home</a>
            <a href="#" class="nav-link active">Community</a>
            <a href="#" class="nav-link">Explore</a>
            <a href="#" class="nav-link">Profile</a>
          </nav>
        </div>
      </header> -->

    <!-- Hero Section -->
    <!-- <section class="community-hero">
        <div class="container">
          <h1>Community Feed</h1>
          <p class="hero-description">
            Connect with like-minded people, share your thoughts, and discover interesting content from our community members.
          </p>
        </div>
      </section> -->

    <!-- Search and Filter -->
    <section class="search-section">
      <div class="container">
        <div class="search-container">
          <div class="search-box">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="搜索帖子..."
              @input="filterPosts"
            />
            <button class="search-button">
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
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>

          <div class="filter-options">
            <!-- <label>Filter by:</label> -->
            <select v-model="selectedCategory" @change="filterPosts">
              <option value="all">所有类别</option>
              <option value="discussion">讨论</option>
              <option value="question">问题</option>
              <option value="showcase">案例</option>
              <option value="event">动态</option>
            </select>

            <select v-model="sortBy" @change="filterPosts">
              <option value="recent">最新</option>
              <option value="popular">最热</option>
              <option value="comments">最多评论</option>
            </select>
          </div>
        </div>

        <div
          class="active-filters"
          v-if="searchQuery || selectedCategory !== 'all'"
        >
          <p>Active filters:</p>
          <div class="filter-tags">
            <span class="filter-tag" v-if="searchQuery">
              Search: "{{ searchQuery }}"
              <button @click="clearSearch">×</button>
            </span>
            <span class="filter-tag" v-if="selectedCategory !== 'all'">
              Category: {{ getCategoryName(selectedCategory) }}
              <button @click="clearCategory">×</button>
            </span>
          </div>
          <button class="clear-all" @click="clearAllFilters">Clear All</button>
        </div>
      </div>
    </section>

    <!-- Create Post Button (Mobile) -->
    <div class="floating-action-button" @click="showCreatePostModal = true">
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
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </div>

    <!-- Main Content -->
    <section class="main-content">
      <div class="container">
        <div class="content-layout">
          <!-- Left Sidebar (Desktop) -->
          <aside class="sidebar left-sidebar">
            <div class="sidebar-section">
              <h3>Categories</h3>
              <ul class="category-list">
                <li
                  :class="{ active: selectedCategory === 'all' }"
                  @click="selectCategory('all')"
                >
                  <span class="category-icon all">
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
                      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                      <polyline points="2 17 12 22 22 17"></polyline>
                      <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                  </span>
                  All Posts
                </li>
                <li
                  :class="{ active: selectedCategory === 'discussion' }"
                  @click="selectCategory('discussion')"
                >
                  <span class="category-icon discussion">
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
                        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                      ></path>
                    </svg>
                  </span>
                  Discussions
                </li>
                <li
                  :class="{ active: selectedCategory === 'question' }"
                  @click="selectCategory('question')"
                >
                  <span class="category-icon question">
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
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </span>
                  Questions
                </li>
                <li
                  :class="{ active: selectedCategory === 'showcase' }"
                  @click="selectCategory('showcase')"
                >
                  <span class="category-icon showcase">
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
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </span>
                  Showcases
                </li>
                <li
                  :class="{ active: selectedCategory === 'event' }"
                  @click="selectCategory('event')"
                >
                  <span class="category-icon event">
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
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </span>
                  Events
                </li>
              </ul>
            </div>

            <div class="sidebar-section">
              <h3>Create Post</h3>
              <button
                class="create-post-button"
                @click="showCreatePostModal = true"
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
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                New Post
              </button>
            </div>
          </aside>

          <!-- Posts Feed -->
          <div class="posts-feed">
            <div v-if="isLoading" class="loading-indicator">
              <div class="spinner"></div>
              <p>Loading posts...</p>
            </div>

            <div v-else-if="filteredPosts.length === 0" class="no-results">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h2>No posts found</h2>
              <p>
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
              <button class="reset-button" @click="clearAllFilters">
                Reset Filters
              </button>
            </div>

            <div v-else class="posts-list">
              <div
                v-for="post in filteredPosts"
                :key="post.id"
                class="post-card"
              >
                <div class="post-header">
                  <div class="post-author">
                    <img
                      :src="post.author.avatar"
                      :alt="post.author.name"
                      class="author-avatar"
                    />
                    <div class="author-info">
                      <h3 class="author-name">{{ post.author.name }}</h3>
                      <span class="post-date">{{
                        formatDate(post.createdAt)
                      }}</span>
                    </div>
                  </div>
                  <div class="post-category" :class="post.category">
                    {{ getCategoryName(post.category) }}
                  </div>
                </div>

                <div class="post-content">
                  <h2 class="post-title" @click="openPost(post.id)">
                    {{ post.title }}
                  </h2>
                  <p class="post-excerpt">{{ post.content }}</p>

                  <div
                    v-if="post.image"
                    class="post-image"
                    @click="openPost(post.id)"
                  >
                    <img :src="post.image" :alt="post.title" />
                  </div>

                  <div class="post-tags" v-if="post.tags && post.tags.length">
                    <span v-for="tag in post.tags" :key="tag" class="post-tag">
                      #{{ tag }}
                    </span>
                  </div>
                </div>

                <div class="post-actions">
                  <button
                    class="action-button like-button"
                    :class="{ active: post.isLiked }"
                    @click="toggleLike(post.id)"
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
                      <path
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                      ></path>
                    </svg>
                    <span>{{ post.likes }}</span>
                  </button>

                  <button
                    class="action-button comment-button"
                    @click="openPost(post.id)"
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
                      <path
                        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                      ></path>
                    </svg>
                    <span>{{ post.comments.length }}</span>
                  </button>

                  <button
                    class="action-button share-button"
                    @click="sharePost(post.id)"
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
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    <span>分享</span>
                  </button>

                  <button
                    class="action-button save-button"
                    :class="{ active: post.isSaved }"
                    @click="toggleSave(post.id)"
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
                      <path
                        d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
                      ></path>
                    </svg>
                    <span>收藏</span>
                  </button>
                </div>

                <!-- Preview of comments -->
                <div
                  class="post-comments-preview"
                  v-if="post.comments.length > 0"
                >
                  <div
                    class="comment-preview"
                    v-for="(comment, index) in post.comments.slice(0, 2)"
                    :key="index"
                  >
                    <img
                      :src="comment.author.avatar"
                      :alt="comment.author.name"
                      class="comment-avatar"
                    />
                    <div class="comment-content">
                      <div class="comment-author">
                        {{ comment.author.name }}
                      </div>
                      <div class="comment-text">{{ comment.text }}</div>
                    </div>
                  </div>

                  <button
                    v-if="post.comments.length > 2"
                    class="view-all-comments"
                    @click="openPost(post.id)"
                  >
                    View all {{ post.comments.length }} comments
                  </button>
                </div>
              </div>

              <!-- Load More Button -->
              <div class="load-more-container" v-if="hasMorePosts">
                <button
                  class="load-more-button"
                  @click="loadMorePosts"
                  :disabled="isLoadingMore"
                >
                  <span v-if="isLoadingMore">
                    <div class="spinner small"></div>
                    Loading...
                  </span>
                  <span v-else>Load More Posts</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Right Sidebar (Desktop) -->
          <aside class="sidebar right-sidebar">
            <div class="sidebar-section">
              <h3>Trending Topics</h3>
              <ul class="trending-list">
                <li
                  v-for="topic in trendingTopics"
                  :key="topic.id"
                  @click="searchByTopic(topic.tag)"
                >
                  <div class="trending-topic">
                    <span class="trending-tag">#{{ topic.tag }}</span>
                    <span class="trending-count">{{ topic.posts }} posts</span>
                  </div>
                </li>
              </ul>
            </div>

            <div class="sidebar-section">
              <h3>Active Members</h3>
              <ul class="members-list">
                <li
                  v-for="member in activeMembers"
                  :key="member.id"
                  @click="viewProfile(member.id)"
                >
                  <div class="member-item">
                    <img
                      :src="member.avatar"
                      :alt="member.name"
                      class="member-avatar"
                    />
                    <div class="member-info">
                      <div class="member-name">{{ member.name }}</div>
                      <div class="member-status">{{ member.status }}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="sidebar-section">
              <h3>Upcoming Events</h3>
              <div class="events-list">
                <div
                  v-for="event in upcomingEvents"
                  :key="event.id"
                  class="event-item"
                  @click="viewEvent(event.id)"
                >
                  <div class="event-date">
                    <span class="event-day">{{
                      formatEventDay(event.date)
                    }}</span>
                    <span class="event-month">{{
                      formatEventMonth(event.date)
                    }}</span>
                  </div>
                  <div class="event-details">
                    <div class="event-title">{{ event.title }}</div>
                    <div class="event-location">{{ event.location }}</div>
                    <div class="event-attendees">
                      {{ event.attendees }} attending
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- Create Post Modal -->
    <div
      class="modal-overlay"
      v-if="showCreatePostModal"
      @click="showCreatePostModal = false"
    >
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>创建新帖子</h2>
          <button class="close-modal" @click="showCreatePostModal = false">
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label for="post-title">标题</label>
            <input
              type="text"
              id="post-title"
              v-model="newPost.title"
              placeholder="为您的帖子输入标题"
            />
          </div>

          <div class="form-group">
            <label for="post-category">类别</label>
            <select id="post-category" v-model="newPost.category">
              <option value="discussion">讨论</option>
              <option value="question">问题</option>
              <option value="showcase">案例</option>
              <option value="event">动态</option>
            </select>
          </div>

          <div class="form-group">
            <label for="post-content">内容</label>
            <textarea
              id="post-content"
              v-model="newPost.content"
              placeholder="分享你的想法..."
              rows="5"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="post-tags">标签 (逗号分隔)</label>
            <input
              type="text"
              id="post-tags"
              v-model="newPost.tagsInput"
              placeholder="例如技术、设计、帮助"
            />
          </div>

          <div class="form-group">
            <label>添加图像 (可选)</label>
            <div class="image-upload">
              <div v-if="newPost.imagePreview" class="image-preview">
                <img :src="newPost.imagePreview" alt="Preview" />
                <button class="remove-image" @click="removeImage">
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
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <button
                v-else
                class="upload-image-button"
                @click="triggerImageUpload"
              >
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
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                点击上传
              </button>
              <input
                type="file"
                ref="imageInput"
                style="display: none"
                @change="handleImageUpload"
                accept="image/*"
              />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="cancel-button" @click="showCreatePostModal = false">
            取消
          </button>
          <button
            class="submit-button"
            @click="createPost"
            :disabled="!isPostValid"
          >
            <span v-if="isSubmitting">
              <div class="spinner small white"></div>
              正在发布
            </span>
            <span v-else>发布</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Post Detail Modal -->
    <div
      class="modal-overlay"
      v-if="showPostDetailModal"
      @click="showPostDetailModal = false"
    >
      <div class="modal-content post-detail-modal" @click.stop>
        <div class="modal-header">
          <button class="back-button" @click="showPostDetailModal = false">
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
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Feed
          </button>
          <button class="close-modal" @click="showPostDetailModal = false">
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="modal-body" v-if="currentPost">
          <div class="post-detail-header">
            <div class="post-author">
              <img
                :src="currentPost.author.avatar"
                :alt="currentPost.author.name"
                class="author-avatar"
              />
              <div class="author-info">
                <h3 class="author-name">{{ currentPost.author.name }}</h3>
                <span class="post-date">{{
                  formatDate(currentPost.createdAt)
                }}</span>
              </div>
            </div>
            <div class="post-category" :class="currentPost.category">
              {{ getCategoryName(currentPost.category) }}
            </div>
          </div>

          <div class="post-detail-content">
            <h2 class="post-title">{{ currentPost.title }}</h2>
            <p class="post-text">{{ currentPost.content }}</p>

            <div v-if="currentPost.image" class="post-image full">
              <img :src="currentPost.image" :alt="currentPost.title" />
            </div>

            <div
              class="post-tags"
              v-if="currentPost.tags && currentPost.tags.length"
            >
              <span v-for="tag in currentPost.tags" :key="tag" class="post-tag">
                #{{ tag }}
              </span>
            </div>

            <div class="post-actions">
              <button
                class="action-button like-button"
                :class="{ active: currentPost.isLiked }"
                @click="toggleLike(currentPost.id)"
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
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  ></path>
                </svg>
                <span>{{ currentPost.likes }}</span>
              </button>

              <button class="action-button comment-button active">
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
                    d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                  ></path>
                </svg>
                <span>{{ currentPost.comments.length }}</span>
              </button>

              <button
                class="action-button share-button"
                @click="sharePost(currentPost.id)"
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
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                <span>分享</span>
              </button>

              <button
                class="action-button save-button"
                :class="{ active: currentPost.isSaved }"
                @click="toggleSave(currentPost.id)"
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
                  <path
                    d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
                  ></path>
                </svg>
                <span>Save</span>
              </button>
            </div>
          </div>

          <div class="post-comments">
            <h3>Comments ({{ currentPost.comments.length }})</h3>

            <div class="comment-form">
              <img
                :src="currentUser.avatar"
                :alt="currentUser.name"
                class="comment-avatar"
              />
              <div class="comment-input-container">
                <textarea
                  v-model="newComment"
                  placeholder="Write a comment..."
                  rows="2"
                  @input="autoResizeCommentInput"
                  ref="commentInput"
                ></textarea>
                <button
                  class="post-comment-button"
                  :disabled="!newComment.trim()"
                  @click="addComment"
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
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>

            <div class="comments-list">
              <div
                class="comment"
                v-for="(comment, index) in currentPost.comments"
                :key="index"
              >
                <img
                  :src="comment.author.avatar"
                  :alt="comment.author.name"
                  class="comment-avatar"
                />
                <div class="comment-content">
                  <div class="comment-header">
                    <div class="comment-author">{{ comment.author.name }}</div>
                    <div class="comment-date">
                      {{ formatDate(comment.createdAt) }}
                    </div>
                  </div>
                  <div class="comment-text">{{ comment.text }}</div>
                  <div class="comment-actions">
                    <button
                      class="comment-like"
                      :class="{ active: comment.isLiked }"
                      @click="toggleCommentLike(currentPost.id, index)"
                    >
                      Like · {{ comment.likes }}
                    </button>
                    <button
                      class="comment-reply"
                      @click="replyToComment(index)"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <!-- <footer class="main-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>CommunityHub</h3>
            <p>Connect, share, and grow with our community</p>
          </div>
          <div class="footer-section">
            <h4>Explore</h4>
            <ul>
              <li><a href="#">Discussions</a></li>
              <li><a href="#">Questions</a></li>
              <li><a href="#">Showcases</a></li>
              <li><a href="#">Events</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Guidelines</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Connect</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 CommunityHub. All rights reserved.</p>
        </div>
      </div>
    </footer> -->
  </div>
</template>
  
  <script setup>
import { ref, computed, onMounted, nextTick } from "vue";

// State variables
const searchQuery = ref("");
const selectedCategory = ref("all");
const sortBy = ref("recent");
const posts = ref([]);
const trendingTopics = ref([]);
const activeMembers = ref([]);
const upcomingEvents = ref([]);
const isLoading = ref(true);
const isLoadingMore = ref(false);
const hasMorePosts = ref(true);
const showMobileMenu = ref(false);
const showCreatePostModal = ref(false);
const showPostDetailModal = ref(false);
const currentPost = ref(null);
const newComment = ref("");
const commentInput = ref(null);
const imageInput = ref(null);
const isSubmitting = ref(false);
const page = ref(1);

// Current user (would come from auth in a real app)
const currentUser = ref({
  id: "current-user",
  name: "张小化",
  avatar: "src/assets/2.svg?height=50&width=50",
});

// New post form data
const newPost = ref({
  title: "",
  category: "discussion",
  content: "",
  tagsInput: "",
  imagePreview: null,
  imageFile: null,
});

// Computed properties
const filteredPosts = computed(() => {
  let result = [...posts.value];

  // Filter by category
  if (selectedCategory.value !== "all") {
    result = result.filter((post) => post.category === selectedCategory.value);
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        (post.tags &&
          post.tags.some((tag) => tag.toLowerCase().includes(query)))
    );
  }

  // Sort results
  switch (sortBy.value) {
    case "recent":
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case "popular":
      result.sort((a, b) => b.likes - a.likes);
      break;
    case "comments":
      result.sort((a, b) => b.comments.length - a.comments.length);
      break;
  }

  return result;
});

const isPostValid = computed(() => {
  return newPost.value.title.trim() && newPost.value.content.trim();
});

// Fetch data on mount
onMounted(() => {
  fetchPosts();
  fetchTrendingTopics();
  fetchActiveMembers();
  fetchUpcomingEvents();

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (showMobileMenu.value && !event.target.closest(".main-header")) {
      showMobileMenu.value = false;
    }
  });

  // Implement infinite scroll
  window.addEventListener("scroll", handleScroll);
});

// Methods
const fetchPosts = async () => {
  try {
    // Simulate API call
    setTimeout(() => {
      const newPosts = [
        {
          id: "1",
          title: "提升摄影技巧的小贴士",
          content:
            "我练习摄影已有两年左右，想分享一些帮助我进步的心得。首先，理解你的相机设置；其次，练习构图技巧；第三，学会有效修图。你还有什么建议可以补充吗？",
          image: "src/assets/2.svg?height=500&width=800",
          category: "讨论",
          author: {
            id: "user1",
            name: "亚历克斯·约翰逊",
            avatar: "src/assets/2.svg?height=50&width=50",
          },
          createdAt: "2025-03-15T14:30:00Z",
          likes: 42,
          isLiked: false,
          isSaved: false,
          tags: ["摄影", "技巧", "新手"],
          comments: [
            {
              author: {
                id: "user2",
                name: "莎拉·米勒",
                avatar: "src/assets/2.svg?height=50&width=50",
              },
              text: "好建议！我想补充光线非常重要。理解自然光能让照片效果大不相同。",
              createdAt: "2025-03-15T15:45:00Z",
              likes: 8,
              isLiked: false,
            },
            {
              author: {
                id: "user3",
                name: "迈克尔·陈",
                avatar: "src/assets/2.svg?height=50&width=50",
              },
              text: "我发现从不同角度对同一主体拍摄大量照片，能帮你找到最佳构图。",
              createdAt: "2025-03-15T16:20:00Z",
              likes: 5,
              isLiked: false,
            },
          ],
        },
        {
          id: "2",
          title: "如何优化网站移动端适配？",
          content:
            "我为小企业建了个网站，但发现在手机上显示效果不佳。有哪些让网站适配移动设备的最佳实践？有什么推荐的工具或框架吗？",
          image: null,
          category: "提问",
          author: {
            id: "user4",
            name: "艾米丽·罗德里格斯",
            avatar: "src/assets/2.svg?height=50&width=50",
          },
          createdAt: "2025-03-14T10:15:00Z",
          likes: 18,
          isLiked: false,
          isSaved: true,
          tags: ["网页开发", "移动端", "响应式"],
          comments: [
            {
              author: {
                id: "user5",
                name: "大卫·金",
                avatar: "src/assets/2.svg?height=50&width=50",
              },
              text: "建议采用移动优先策略！先设计小屏幕布局，再扩展到更大屏幕。同时使用CSS媒体查询根据屏幕尺寸调整布局。",
              createdAt: "2025-03-14T11:30:00Z",
              likes: 12,
              isLiked: true,
            },
          ],
        },
        {
          id: "3",
          title: "我的最新UI设计项目展示",
          content:
            "刚完成一个金融应用仪表盘设计，目标是将复杂数据以清晰直观的界面呈现。使用了低饱和度主色搭配重点信息强调色。期待大家的反馈！",
          image: "src/assets/2.svg?height=500&width=800",
          category: "作品展示",
          author: {
            id: "user6",
            name: "乔丹·泰勒",
            avatar: "src/assets/2.svg?height=50&width=50",
          },
          createdAt: "2025-03-13T09:45:00Z",
          likes: 76,
          isLiked: true,
          isSaved: false,
          tags: ["设计", "用户界面", "仪表盘"],
          comments: [
            {
              author: {
                id: "user7",
                name: "奥利维亚·威尔逊",
                avatar: "src/assets/2.svg?height=50&width=50",
              },
              text: "看起来太棒了！布局非常清爽，信息层级组织得也很好。",
              createdAt: "2025-03-13T10:20:00Z",
              likes: 9,
              isLiked: false,
            },
            {
              author: {
                id: "user8",
                name: "诺亚·马丁内斯",
                avatar: "src/assets/2.svg?height=50&width=50",
              },
              text: "优秀作品！考虑过移动端屏幕如何适配吗？",
              createdAt: "2025-03-13T11:05:00Z",
              likes: 4,
              isLiked: false,
            },
            {
              author: {
                id: "user9",
                name: "索菲亚·李",
                avatar: "src/assets/2.svg?height=50&width=50",
              },
              text: "金融应用的配色方案很完美——专业又不单调。做得很好！",
              createdAt: "2025-03-13T13:40:00Z",
              likes: 6,
              isLiked: false,
            },
          ],
        },
        {
          id: "4",
          title: "社区活动：2025年网页开发趋势研讨会",
          content:
            "我们将举办社区活动讨论2025年网页开发最新趋势，主题包括AI集成、WebAssembly以及前端框架的未来发展。提供茶点！请提前报名以便我们安排。",
          image: "src/assets/2.svg?height=500&width=800",
          category: "活动",
          author: {
            id: "user10",
            name: "社区团队",
            avatar: "src/assets/2.svg?height=50&width=50",
          },
          createdAt: "2025-03-12T16:00:00Z",
          likes: 34,
          isLiked: false,
          isSaved: false,
          tags: ["活动", "网页开发", "交流会"],
          comments: [
            {
              author: {
                id: "user11",
                name: "利亚姆·约翰逊",
                avatar: "src/assets/2.svg?height=50&width=50",
              },
              text: "非常期待！会有实操工作坊环节吗？",
              createdAt: "2025-03-12T17:15:00Z",
              likes: 3,
              isLiked: false,
            },
            {
              author: {
                id: "user12",
                name: "艾娃·布朗",
                avatar: "src/assets/2.svg?height=50&width=50",
              },
              text: "已报名！等不及和大家交流学习这些主题了。",
              createdAt: "2025-03-12T18:30:00Z",
              likes: 2,
              isLiked: false,
            },
          ],
        },
        {
          id: "5",
          title: "学习数据科学的推荐资源？",
          content:
            "我是一名想转行数据科学的软件开发人员。对于有编程经验但统计学知识有限的人，你会推荐哪些学习资源？有什么特别有帮助的课程、书籍或实践项目吗？",
          image: null,
          category: "提问",
          author: {
            id: "user13",
            name: "瑞恩·帕克",
            avatar: "src/assets/2.svg?height=50&width=50",
          },
          createdAt: "2025-03-11T13:20:00Z",
          likes: 29,
          isLiked: false,
          isSaved: false,
          tags: ["数据科学", "学习", "职业发展"],
          comments: [
            {
              author: {
                id: "user14",
                name: "艾玛·戴维斯",
                avatar: "src/assets/2.svg?height=50&width=50",
              },
              text: "推荐先学习Wes McKinney的《利用Python进行数据分析》和斯坦福大学的在线统计课程，这两者都适合程序员转型数据科学。",
              createdAt: "2025-03-11T14:45:00Z",
              likes: 15,
              isLiked: false,
            },
            {
              author: {
                id: "user15",
                name: "卢卡斯·加西亚",
                avatar: "src/assets/2.svg?height=50&width=50",
              },
              text: "Kaggle对实践非常有用。从他们的入门竞赛和教程开始。《Scikit-Learn与TensorFlow机器学习实战》这本书也很棒。",
              createdAt: "2025-03-11T15:30:00Z",
              likes: 12,
              isLiked: false,
            },
          ],
        },
      ];

      posts.value = newPosts;
      isLoading.value = false;
    }, 1500);
  } catch (error) {
    console.error("Error fetching posts:", error);
    isLoading.value = false;
  }
};

const fetchTrendingTopics = () => {
  // Simulate API call
  setTimeout(() => {
    trendingTopics.value = [
      { id: 1, tag: "design", posts: 128 },
      { id: 2, tag: "webdev", posts: 96 },
      { id: 3, tag: "productivity", posts: 84 },
      { id: 4, tag: "ai", posts: 72 },
      { id: 5, tag: "career", posts: 65 },
    ];
  }, 800);
};

const fetchActiveMembers = () => {
  // Simulate API call
  setTimeout(() => {
    activeMembers.value = [
      {
        id: "user1",
        name: "Alex Johnson",
        avatar: "src/assets/2.svg?height=50&width=50",
        status: "Online now",
      },
      {
        id: "user6",
        name: "Jordan Taylor",
        avatar: "src/assets/2.svg?height=50&width=50",
        status: "Online now",
      },
      {
        id: "user4",
        name: "Emily Rodriguez",
        avatar: "src/assets/2.svg?height=50&width=50",
        status: "Active today",
      },
      {
        id: "user7",
        name: "Olivia Wilson",
        avatar: "src/assets/2.svg?height=50&width=50",
        status: "Active today",
      },
      {
        id: "user14",
        name: "Emma Davis",
        avatar: "src/assets/2.svg?height=50&width=50",
        status: "Active today",
      },
    ];
  }, 1000);
};

const fetchUpcomingEvents = () => {
  // Simulate API call
  setTimeout(() => {
    upcomingEvents.value = [
      {
        id: "event1",
        title: "Web Development Trends 2025",
        date: "2025-04-15T18:00:00Z",
        location: "Tech Hub Downtown",
        attendees: 42,
      },
      {
        id: "event2",
        title: "UX Design Workshop",
        date: "2025-04-22T17:30:00Z",
        location: "Creative Space Co-working",
        attendees: 28,
      },
      {
        id: "event3",
        title: "AI in Everyday Applications",
        date: "2025-05-05T19:00:00Z",
        location: "Innovation Center",
        attendees: 35,
      },
    ];
  }, 1200);
};

const loadMorePosts = async () => {
  if (isLoadingMore.value || !hasMorePosts.value) return;

  isLoadingMore.value = true;
  page.value++;

  // Simulate API call
  setTimeout(() => {
    const morePosts = [
      {
        id: "6",
        title: "零基础学习JavaScript的心路历程",
        content:
          "半年前我对编程一无所知，如今我用JavaScript开发出了第一个交互式网页应用！想和大家分享对我有效的方法、踩过的坑，以及这段旅程中收获的经验，希望能帮助其他初学者。",
        image: "src/assets/2.svg?height=500&width=800",
        category: "讨论",
        author: {
          id: "user16",
          name: "杰米·史密斯",
          avatar: "src/assets/2.svg?height=50&width=50",
        },
        createdAt: "2025-03-10T11:00:00Z",
        likes: 53,
        isLiked: false,
        isSaved: false,
        tags: ["javascript", "新手", "学习心得"],
        comments: [
          {
            author: {
              id: "user17",
              name: "泰勒·约翰逊",
              avatar: "src/assets/2.svg?height=50&width=50",
            },
            text: "太鼓舞人心了！我刚开始学编程，看到半年能取得这样的进步真的很受激励。",
            createdAt: "2025-03-10T12:15:00Z",
            likes: 7,
            isLiked: false,
          },
        ],
      },
      {
        id: "7",
        title: "数字产品的可持续设计实践",
        content:
          "作为设计师，我们应该考虑数字产品对环境的影响。从降低服务器负载到优化图片、减少不必要的动画效果，这里分享我实践过的一些让设计更可持续的方法。",
        image: null,
        category: "讨论",
        author: {
          id: "user18",
          name: "哈珀·威廉姆斯",
          avatar: "src/assets/2.svg?height=50&width=50",
        },
        createdAt: "2025-03-09T15:40:00Z",
        likes: 38,
        isLiked: false,
        isSaved: false,
        tags: ["设计", "可持续性", "最佳实践"],
        comments: [],
      },
    ];

    posts.value = [...posts.value, ...morePosts];
    isLoadingMore.value = false;

    // Check if we have more posts to load
    if (page.value >= 3) {
      hasMorePosts.value = false;
    }
  }, 1500);
};

const handleScroll = () => {
  // Load more posts when user scrolls near the bottom
  if (isLoading.value || isLoadingMore.value || !hasMorePosts.value) return;

  const scrollPosition = window.innerHeight + window.scrollY;
  const documentHeight = document.body.offsetHeight;

  if (scrollPosition >= documentHeight - 500) {
    loadMorePosts();
  }
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const filterPosts = () => {
  // This function is called when filters change
  // The actual filtering is handled by the computed property
};

const clearSearch = () => {
  searchQuery.value = "";
  filterPosts();
};

const clearCategory = () => {
  selectedCategory.value = "all";
  filterPosts();
};

const clearAllFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "all";
  sortBy.value = "recent";
  filterPosts();
};

const selectCategory = (category) => {
  selectedCategory.value = category;
  filterPosts();
};

const getCategoryName = (category) => {
  const categoryMap = {
    discussion: "Discussion",
    question: "Question",
    showcase: "Showcase",
    event: "Event",
    all: "All Categories",
  };

  return categoryMap[category] || category;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 7) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } else if (diffDay > 0) {
    return `${diffDay}d ago`;
  } else if (diffHour > 0) {
    return `${diffHour}h ago`;
  } else if (diffMin > 0) {
    return `${diffMin}m ago`;
  } else {
    return "Just now";
  }
};

const formatEventDay = (dateString) => {
  const date = new Date(dateString);
  return date.getDate();
};

const formatEventMonth = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short" });
};

const toggleLike = (postId) => {
  const post = posts.value.find((p) => p.id === postId);
  if (post) {
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
  }

  // If the post is currently open in the detail view, update that too
  if (currentPost.value && currentPost.value.id === postId) {
    currentPost.value.isLiked = post.isLiked;
    currentPost.value.likes = post.likes;
  }
};

const toggleSave = (postId) => {
  const post = posts.value.find((p) => p.id === postId);
  if (post) {
    post.isSaved = !post.isSaved;
  }

  // If the post is currently open in the detail view, update that too
  if (currentPost.value && currentPost.value.id === postId) {
    currentPost.value.isSaved = post.isSaved;
  }
};

const toggleCommentLike = (postId, commentIndex) => {
  const post = posts.value.find((p) => p.id === postId);
  if (post && post.comments[commentIndex]) {
    const comment = post.comments[commentIndex];
    comment.isLiked = !comment.isLiked;
    comment.likes += comment.isLiked ? 1 : -1;
  }

  // If the post is currently open in the detail view, update that too
  if (
    currentPost.value &&
    currentPost.value.id === postId &&
    currentPost.value.comments[commentIndex]
  ) {
    const comment = currentPost.value.comments[commentIndex];
    comment.isLiked = !comment.isLiked;
    comment.likes += comment.isLiked ? 1 : -1;
  }
};

const sharePost = (postId) => {
  // In a real app, implement sharing functionality
  alert(`Sharing post ${postId}`);
};

const openPost = (postId) => {
  const post = posts.value.find((p) => p.id === postId);
  if (post) {
    currentPost.value = JSON.parse(JSON.stringify(post)); // Clone to avoid reference issues
    showPostDetailModal.value = true;

    // Reset comment input
    newComment.value = "";

    // Focus comment input after modal is shown
    nextTick(() => {
      if (commentInput.value) {
        commentInput.value.focus();
      }
    });
  }
};

const addComment = () => {
  if (!newComment.value.trim() || !currentPost.value) return;

  const comment = {
    author: {
      id: currentUser.value.id,
      name: currentUser.value.name,
      avatar: currentUser.value.avatar,
    },
    text: newComment.value.trim(),
    createdAt: new Date().toISOString(),
    likes: 0,
    isLiked: false,
  };

  // Add to current post in modal
  currentPost.value.comments.unshift(comment);

  // Also add to the post in the main list
  const post = posts.value.find((p) => p.id === currentPost.value.id);
  if (post) {
    post.comments.unshift(comment);
  }

  // Clear input
  newComment.value = "";

  // Reset textarea height
  if (commentInput.value) {
    commentInput.value.style.height = "auto";
  }
};

const replyToComment = (commentIndex) => {
  if (!currentPost.value || !currentPost.value.comments[commentIndex]) return;

  const comment = currentPost.value.comments[commentIndex];
  newComment.value = `@${comment.author.name} `;

  // Focus comment input
  nextTick(() => {
    if (commentInput.value) {
      commentInput.value.focus();
    }
  });
};

const autoResizeCommentInput = () => {
  const textarea = commentInput.value;
  if (!textarea) return;

  textarea.style.height = "auto";
  textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
};

const searchByTopic = (tag) => {
  searchQuery.value = tag;
  filterPosts();
};

const viewProfile = (userId) => {
  // In a real app, navigate to user profile
  console.log("View profile:", userId);
};

const viewEvent = (eventId) => {
  // In a real app, navigate to event details
  console.log("View event:", eventId);
};

const triggerImageUpload = () => {
  if (imageInput.value) {
    imageInput.value.click();
  }
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Check if file is an image
  if (!file.type.startsWith("image/")) {
    alert("Please select an image file");
    return;
  }

  // Create URL for preview
  // newPost : {
  //   alert('Please select an image file');
  //   return;
  // }

  // Create URL for preview
  newPost.value.imagePreview = URL.createObjectURL(file);
  newPost.value.imageFile = file;
};

const removeImage = () => {
  newPost.value.imagePreview = null;
  newPost.value.imageFile = null;

  // Reset file input
  if (imageInput.value) {
    imageInput.value.value = "";
  }
};

const createPost = async () => {
  if (!isPostValid.value) return;

  isSubmitting.value = true;

  // Process tags
  const tags = newPost.value.tagsInput
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  // Create new post object
  const post = {
    id: `new-${Date.now()}`,
    title: newPost.value.title,
    content: newPost.value.content,
    image: newPost.value.imagePreview,
    category: newPost.value.category,
    author: {
      id: currentUser.value.id,
      name: currentUser.value.name,
      avatar: currentUser.value.avatar,
    },
    createdAt: new Date().toISOString(),
    likes: 0,
    isLiked: false,
    isSaved: false,
    tags: tags,
    comments: [],
  };

  // Simulate API call
  setTimeout(() => {
    // Add post to the beginning of the list
    posts.value.unshift(post);

    // Reset form
    newPost.value = {
      title: "",
      category: "discussion",
      content: "",
      tagsInput: "",
      imagePreview: null,
      imageFile: null,
    };

    // Close modal
    showCreatePostModal.value = false;
    isSubmitting.value = false;

    // Show success message
    alert("Post created successfully!");
  }, 1500);
};
</script>
  
  <style>
/* Base Styles */
:root {
  --primary-color: #4FA673;
  --primary-light: #4FA673;
  --primary-dark: #65ce91;
  --secondary-color: #10b981;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --background-light: #f9fafb;
  --background-white: #ffffff;
  --accent-color: #f59e0b;

  /* Category colors */
  --discussion-color: #4FA673;
  --question-color: #f59e0b;
  --showcase-color: #10b981;
  --event-color: #8b5cf6;

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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--background-light);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

h1,
h2,
h3,
h4 {
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-primary);
}

a {
  color: var(--primary-color);
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

.main-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h2 {
  color: var(--primary-color);
  font-size: 1.5rem;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--text-secondary);
  padding: 0.5rem;
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

.nav-link:hover,
.nav-link.active {
  color: var(--primary-color);
  text-decoration: none;
}

.nav-link.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
}

/* Hero Section */
.community-hero {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.community-hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: white;
}

.hero-description {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  opacity: 0.9;
}

/* Search Section */
.search-section {
  background-color: var(--background-white);
  padding: 2rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-box {
  display: flex;
  flex: 1;
  max-width: 500px;
}

.search-box input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  font-size: 1rem;
}

.search-button {
  background-color: var(--primary-color);
  color: white;
  padding: 0 1rem;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button:hover {
  background-color: var(--primary-dark);
}

.filter-options {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-options label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.filter-options select {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  background-color: white;
  font-size: 0.9rem;
}

.active-filters {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.active-filters p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-tag {
  background-color: #f0f0f0;
  padding: 0.5rem 0.75rem;
  border-radius: 50px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-tag button {
  background: none;
  border: none;
  font-size: 1.2rem;
  line-height: 1;
  color: var(--text-secondary);
}

.clear-all {
  background: none;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.clear-all:hover {
  background-color: #f0f0f0;
}

/* Floating Action Button (Mobile) */
.floating-action-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 90;
  display: none;
}

.floating-action-button:hover {
  background-color: var(--primary-dark);
}

/* Main Content Layout */
.main-content {
  padding: 2rem 0;
}

.content-layout {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  gap: 2rem;
}

/* Sidebar Styles */
.sidebar {
  position: sticky;
  top: 80px;
  height: calc(100vh - 100px);
  overflow-y: auto;
}

.sidebar-section {
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--box-shadow);
}

.sidebar-section h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.category-list {
  list-style: none;
}

.category-list li {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
}

.category-list li:hover {
  background-color: #f0f0f0;
}

.category-list li.active {
  background-color: rgba(59, 130, 246, 0.1);
  color: var(--primary-color);
  font-weight: 500;
}

.category-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 0.75rem;
}

.category-icon.all {
  background-color: rgba(107, 114, 128, 0.1);
  color: var(--text-secondary);
}

.category-icon.discussion {
  background-color: rgba(59, 130, 246, 0.1);
  color: var(--discussion-color);
}

.category-icon.question {
  background-color: rgba(245, 158, 11, 0.1);
  color: var(--question-color);
}

.category-icon.showcase {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--showcase-color);
}

.category-icon.event {
  background-color: rgba(139, 92, 246, 0.1);
  color: var(--event-color);
}

.create-post-button {
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.create-post-button:hover {
  background-color: var(--primary-dark);
}

.trending-list {
  list-style: none;
}

.trending-list li {
  margin-bottom: 1rem;
  cursor: pointer;
}

.trending-topic {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.trending-tag {
  font-weight: 500;
  color: var(--primary-color);
}

.trending-count {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.members-list {
  list-style: none;
}

.members-list li {
  margin-bottom: 1rem;
  cursor: pointer;
}

.member-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.member-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.member-name {
  font-weight: 500;
}

.member-status {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-item {
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
}

.event-item:hover {
  background-color: #f0f0f0;
}

.event-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  height: 50px;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--border-radius);
  padding: 0.5rem;
}

.event-day {
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1;
}

.event-month {
  font-size: 0.8rem;
  text-transform: uppercase;
}

.event-title {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.event-location,
.event-attendees {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

/* Posts Feed */
.posts-feed {
  min-height: 500px;
}

.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(59, 130, 246, 0.2);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.spinner.small {
  width: 20px;
  height: 20px;
  border-width: 2px;
  margin-right: 0.5rem;
  margin-bottom: 0;
}

.spinner.white {
  border-color: rgba(255, 255, 255, 0.2);
  border-top-color: white;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.no-results {
  text-align: center;
  padding: 3rem 0;
  color: var(--text-secondary);
}

.no-results svg {
  margin-bottom: 1rem;
  color: var(--text-secondary);
}

.no-results h2 {
  margin-bottom: 1rem;
}

.reset-button {
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  margin-top: 1.5rem;
  font-weight: 500;
}

.reset-button:hover {
  background-color: var(--primary-dark);
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post-card {
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
}

.post-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.post-date {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.post-category {
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
}

.post-category.discussion {
  background-color: rgba(59, 130, 246, 0.1);
  color: var(--discussion-color);
}

.post-category.question {
  background-color: rgba(245, 158, 11, 0.1);
  color: var(--question-color);
}

.post-category.showcase {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--showcase-color);
}

.post-category.event {
  background-color: rgba(139, 92, 246, 0.1);
  color: var(--event-color);
}

.post-content {
  padding: 1.5rem;
}

.post-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
}

.post-title:hover {
  color: var(--primary-color);
}

.post-excerpt {
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.post-image {
  margin-bottom: 1.5rem;
  border-radius: var(--border-radius);
  overflow: hidden;
  cursor: pointer;
}

.post-image img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.post-image:hover img {
  transform: scale(1.02);
}

.post-image.full img {
  max-height: none;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.post-tag {
  font-size: 0.8rem;
  color: var(--primary-color);
}

.post-actions {
  display: flex;
  border-top: 1px solid #f0f0f0;
}

.action-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: none;
  color: var(--text-secondary);
  transition: var(--transition);
}

.action-button:hover {
  background-color: #f9fafb;
  color: var(--text-primary);
}

.action-button.active {
  color: var(--primary-color);
}

.like-button.active svg {
  fill: var(--primary-color);
  stroke: var(--primary-color);
}

.save-button.active svg {
  fill: var(--accent-color);
  stroke: var(--accent-color);
}

.post-comments-preview {
  padding: 1rem 1.5rem;
  background-color: #f9fafb;
  border-top: 1px solid #f0f0f0;
}

.comment-preview {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.comment-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.comment-content {
  flex: 1;
}

.comment-author {
  font-weight: 500;
  font-size: 0.9rem;
}

.comment-text {
  font-size: 0.9rem;
  color: var(--text-primary);
}

.view-all-comments {
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 0.9rem;
  padding: 0;
  text-align: left;
}

.load-more-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.load-more-button {
  background-color: white;
  border: 1px solid #ddd;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  color: var(--text-primary);
  display: flex;
  align-items: center;
}

.load-more-button:hover {
  background-color: #f0f0f0;
}

.load-more-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
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
  padding: 1rem;
}

.modal-content {
  background-color: white;
  border-radius: var(--border-radius);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-content.post-detail-modal {
  max-width: 800px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h2 {
  font-size: 1.5rem;
  margin: 0;
}

.close-modal {
  background: none;
  border: none;
  color: var(--text-secondary);
  padding: 0.5rem;
  margin: -0.5rem;
  border-radius: 50%;
}

.close-modal:hover {
  background-color: #f0f0f0;
  color: var(--text-primary);
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.back-button:hover {
  color: var(--text-primary);
}

.modal-body {
  padding: 1.5rem;
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
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-family: inherit;
}

.form-group textarea {
  resize: vertical;
}

.image-upload {
  border: 2px dashed #ddd;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  text-align: center;
}

.image-preview {
  position: relative;
}

.image-preview img {
  max-width: 100%;
  max-height: 200px;
  border-radius: var(--border-radius);
}

.remove-image {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-image-button {
  background: none;
  border: none;
  color: var(--primary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #f0f0f0;
}

.cancel-button {
  background-color: white;
  border: 1px solid #ddd;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  color: var(--text-primary);
}

.cancel-button:hover {
  background-color: #f0f0f0;
}

.submit-button {
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  display: flex;
  align-items: center;
}

.submit-button:hover {
  background-color: var(--primary-dark);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Post Detail Styles */
.post-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.post-detail-content {
  margin-bottom: 2rem;
}

.post-detail-content .post-title {
  font-size: 1.5rem;
  cursor: default;
}

.post-detail-content .post-title:hover {
  color: var(--text-primary);
}

.post-detail-content .post-text {
  margin-bottom: 1.5rem;
  white-space: pre-line;
}

.post-comments h3 {
  margin-bottom: 1.5rem;
}

.comment-form {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.comment-input-container {
  flex: 1;
  position: relative;
}

.comment-input-container textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 3rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-family: inherit;
  resize: none;
}

.post-comment-button {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  background: none;
  border: none;
  color: var(--primary-color);
  padding: 0.5rem;
  border-radius: 50%;
}

.post-comment-button:disabled {
  color: #ddd;
  cursor: not-allowed;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comment {
  display: flex;
  gap: 1rem;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.comment-date {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.comment-actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.comment-like,
.comment-reply {
  background: none;
  border: none;
  font-size: 0.8rem;
  color: var(--text-secondary);
  padding: 0;
}

.comment-like:hover,
.comment-reply:hover {
  color: var(--text-primary);
}

.comment-like.active {
  color: var(--primary-color);
}

/* Footer */
.main-footer {
  background-color: #1e40af;
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

/* Responsive Styles */
@media (max-width: 1200px) {
  .content-layout {
    grid-template-columns: 220px 1fr 250px;
    gap: 1.5rem;
  }
}

@media (max-width: 992px) {
  .content-layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: none;
  }

  .floating-action-button {
    display: flex;
  }
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .main-nav {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background-color: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .main-nav.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .community-hero h1 {
    font-size: 2rem;
  }

  .search-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-box {
    max-width: 100%;
    width: 100%;
  }

  .filter-options {
    width: 100%;
    justify-content: space-between;
  }

  .post-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .post-category {
    align-self: flex-start;
  }

  .post-actions {
    flex-wrap: wrap;
  }

  .action-button {
    flex: 1 0 50%;
  }
}

@media (max-width: 480px) {
  .main-header .container {
    padding: 0 1rem;
  }

  .community-hero {
    padding: 2rem 0;
  }

  .community-hero h1 {
    font-size: 1.75rem;
  }

  .active-filters {
    flex-direction: column;
    align-items: flex-start;
  }

  .post-content {
    padding: 1rem;
  }

  .modal-content {
    max-height: 100vh;
    border-radius: 0;
  }

  .comment-form {
    flex-direction: column;
  }

  .comment-avatar {
    width: 40px;
    height: 40px;
  }
}
</style>