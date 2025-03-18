<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="logo">
        <a href="/library" class="logo-text">
          <img src="../assets/headlogo.png" alt="">
        </a>
      </div>
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="高级感前端"
          @keyup.enter="handleSearch"
        />
        <button v-if="searchQuery" class="clear-btn" @click="clearSearch">
          ×
        </button>
        <button class="search-btn" @click="handleSearch">
          <SearchIcon class="search-icon" />
        </button>
      </div>
      <div class="header-actions">
        <span @click="navigateTo('create')">创作中心</span>
        <span @click="navigateTo('business')">业务合作</span>
      </div>
    </header>

    <!-- 主体内容 -->
    <div class="main-container">
      <!-- 左侧导航栏 -->
      <aside class="sidebar">
        <div
          class="sidebar-item"
          :class="{ active: activeNav === 'discover' }"
          @click="setActiveNav('discover')"
        >
          <HomeIcon />
          <span>发现</span>
        </div>
        <div
          class="sidebar-item"
          :class="{ active: activeNav === 'publish' }"
          @click="setActiveNav('publish')"
        >
          <PlusCircleIcon />
          <span>发布</span>
        </div>
        <div
          class="sidebar-item"
          :class="{ active: activeNav === 'notifications' }"
          @click="setActiveNav('notifications')"
        >
          <BellIcon />
          <span>通知</span>
          <div v-if="hasNewNotifications" class="notification-badge"></div>
        </div>
        <div
          class="sidebar-item"
          :class="{ active: activeNav === 'profile' }"
          @click="setActiveNav('profile')"
        >
          <UserIcon />
          <span>我</span>
        </div>
      </aside>

      <!-- 内容区域 -->
      <main class="content">
        <!-- 发现页面 -->
        <div v-if="activeNav === 'discover'">
          <!-- 内容分类标签 -->
          <div class="content-tabs">
            <div class="tabs-left">
              <div
                v-for="tab in tabs"
                :key="tab.id"
                class="tab"
                :class="{ active: activeTab === tab.id }"
                @click="setActiveTab(tab.id)"
              >
                {{ tab.name }}
              </div>
            </div>
            <div class="tabs-right">
              <div class="dropdown" @click="toggleSortDropdown">
                <span>{{ currentSort }}</span>
                <ChevronDownIcon class="dropdown-icon" />

                <!-- 排序下拉菜单 -->
                <div v-if="showSortDropdown" class="sort-dropdown">
                  <div
                    v-for="sort in sortOptions"
                    :key="sort.id"
                    class="sort-option"
                    :class="{ active: currentSort === sort.name }"
                    @click.stop="selectSort(sort.name)"
                  >
                    {{ sort.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 内容卡片网格 -->
          <div class="card-grid">
            <div
              v-for="(card, index) in filteredCards"
              :key="index"
              class="card"
              @click="openCardDetail(card)"
            >
              <div class="card-image">
                <img :src="card.image" :alt="card.title" />
                <div
                  v-if="card.isVideo"
                  class="video-icon"
                  @click.stop="playVideo(card, index)"
                >
                  <PlayIcon v-if="!card.isPlaying" />
                  <PauseIcon v-else />
                </div>
                <!-- 视频播放器 -->
                <div v-if="card.isVideo && card.isPlaying" class="video-player">
                  <video
                    ref="videoRefs"
                    controls
                    autoplay
                    @ended="stopVideo(index)"
                  >
                    <source src="../assets/v/1.mp4" type="video/mp4" />
                    您的浏览器不支持视频标签
                  </video>
                </div>
              </div>
              <div class="card-title">{{ card.title }}</div>
              <div class="card-author">
                <img
                  :src="card.authorAvatar"
                  alt="author"
                  class="author-avatar"
                  @click.stop="navigateToProfile(card.authorName)"
                />
                <span class="author-name">{{ card.authorName }}</span>
                <div
                  class="likes"
                  :class="{ liked: card.isLiked }"
                  @click.stop="toggleLike(index)"
                >
                  <HeartIcon />
                  <span>{{ card.likes }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 加载更多 -->
          <div
            class="load-more"
            v-if="filteredCards.length > 0"
            @click="loadMore"
          >
            <div v-if="isLoading" class="loading-spinner"></div>
            <span v-else>加载更多</span>
          </div>

          <!-- 无搜索结果 -->
          <div
            v-if="searchQuery && filteredCards.length === 0"
            class="no-results"
          >
            没有找到与 "{{ searchQuery }}" 相关的内容
          </div>
        </div>

        <!-- 发布页面 -->
        <div v-else-if="activeNav === 'publish'" class="publish-page">
          <h2>发布新内容</h2>
          <div class="publish-form">
            <div class="form-group">
              <label>标题</label>
              <input
                type="text"
                v-model="newPost.title"
                placeholder="请输入标题..."
              />
            </div>
            <div class="form-group">
              <label>内容</label>
              <textarea
                v-model="newPost.content"
                placeholder="分享你的前端技巧和经验..."
              ></textarea>
            </div>
            <div class="form-group">
              <label>上传图片/视频</label>
              <div class="upload-area" @click="triggerFileUpload">
                <PlusIcon />
                <span>点击上传</span>
                <input
                  type="file"
                  ref="fileInput"
                  style="display: none"
                  accept="image/*,video/*"
                  @change="handleFileUpload"
                />
              </div>
              <div v-if="newPost.image" class="preview">
                <img :src="newPost.image" alt="Preview" />
                <button class="remove-btn" @click="removeUpload">×</button>
              </div>
            </div>
            <div class="form-actions">
              <button class="cancel-btn" @click="setActiveNav('discover')">
                取消
              </button>
              <button class="publish-btn" @click="publishPost">发布</button>
            </div>
          </div>
        </div>

        <!-- 通知页面 -->
        <div
          v-else-if="activeNav === 'notifications'"
          class="notifications-page"
        >
          <h2>通知</h2>
          <div v-if="notifications.length > 0" class="notification-list">
            <div
              v-for="(notification, index) in notifications"
              :key="index"
              class="notification-item"
              :class="{ unread: !notification.read }"
            >
              <img
                :src="notification.avatar"
                alt="User"
                class="notification-avatar"
              />
              <div class="notification-content">
                <div class="notification-text">
                  <span class="notification-user">{{ notification.user }}</span>
                  {{ notification.action }}
                </div>
                <div class="notification-time">{{ notification.time }}</div>
              </div>
            </div>
          </div>
          <div v-else class="empty-notifications">暂无通知</div>
        </div>

        <!-- 个人资料页面 -->
        <div v-else-if="activeNav === 'profile'" class="profile-page">
          <div class="profile-header">
            <img
              src="../assets/2.svg?height=80&width=80"
              alt="Profile"
              class="profile-avatar"
            />
            <div class="profile-info">
              <h2>用户名</h2>
              <p>前端开发爱好者</p>
              <div class="profile-stats">
                <div class="stat">
                  <div class="stat-value">42</div>
                  <div class="stat-label">关注</div>
                </div>
                <div class="stat">
                  <div class="stat-value">128</div>
                  <div class="stat-label">粉丝</div>
                </div>
                <div class="stat">
                  <div class="stat-value">56</div>
                  <div class="stat-label">获赞</div>
                </div>
              </div>
            </div>
            <button class="edit-profile-btn">编辑资料</button>
          </div>

          <div class="profile-tabs">
            <div
              class="profile-tab"
              :class="{ active: activeProfileTab === 'posts' }"
              @click="activeProfileTab = 'posts'"
            >
              我的笔记
            </div>
            <div
              class="profile-tab"
              :class="{ active: activeProfileTab === 'collections' }"
              @click="activeProfileTab = 'collections'"
            >
              收藏
            </div>
            <div
              class="profile-tab"
              :class="{ active: activeProfileTab === 'likes' }"
              @click="activeProfileTab = 'likes'"
            >
              点赞
            </div>
          </div>

          <div class="profile-content">
            <div v-if="userPosts.length > 0" class="card-grid">
              <div v-for="(post, index) in userPosts" :key="index" class="card">
                <div class="card-image">
                  <img :src="post.image" :alt="post.title" />
                  <div v-if="post.isVideo" class="video-icon">
                    <PlayIcon />
                  </div>
                </div>
                <div class="card-title">{{ post.title }}</div>
                <div class="card-author">
                  <div class="likes">
                    <HeartIcon />
                    <span>{{ post.likes }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="empty-content">暂无内容</div>
          </div>
        </div>
      </main>
    </div>

    <!-- 底部导航 -->
    <footer class="footer">
      <div
        class="footer-item"
        :class="{ active: activeNav === 'discover' }"
        @click="setActiveNav('discover')"
      >
        <HomeIcon />
        <span>发现</span>
      </div>
      <div
        class="footer-item"
        :class="{ active: activeNav === 'search' }"
        @click="setActiveNav('search')"
      >
        <SearchIcon />
        <span>搜索</span>
      </div>
      <div
        class="footer-item"
        :class="{ active: activeNav === 'publish' }"
        @click="setActiveNav('publish')"
      >
        <PlusCircleIcon />
        <span>发布</span>
      </div>
      <div
        class="footer-item"
        :class="{ active: activeNav === 'notifications' }"
        @click="setActiveNav('notifications')"
      >
        <BellIcon />
        <span>通知</span>
        <div v-if="hasNewNotifications" class="notification-badge-mobile"></div>
      </div>
      <div
        class="footer-item"
        :class="{ active: activeNav === 'profile' }"
        @click="setActiveNav('profile')"
      >
        <UserIcon />
        <span>我</span>
      </div>
    </footer>

    <!-- 卡片详情弹窗 -->
    <div
      v-if="showCardDetail"
      class="card-detail-modal"
      @click="closeCardDetail"
    >
      <div class="card-detail-content" @click.stop>
        <button class="close-modal" @click="closeCardDetail">×</button>
        <div class="card-detail-image">
          <img :src="selectedCard.image" :alt="selectedCard.title" />
          <div
            v-if="selectedCard.isVideo"
            class="video-icon-large"
            @click="playDetailVideo"
          >
            <PlayIcon v-if="!detailVideoPlaying" />
            <PauseIcon v-else />
          </div>
          <div
            v-if="selectedCard.isVideo && detailVideoPlaying"
            class="detail-video-player"
          >
            <video
              ref="detailVideo"
              controls
              autoplay
              @ended="detailVideoPlaying = false"
            >
              <source src="../assets/v/1.mp4" type="video/mp4" />
              您的浏览器不支持视频标签
            </video>
          </div>
        </div>
        <div class="card-detail-info">
          <h2>{{ selectedCard.title }}</h2>
          <div class="card-detail-author">
            <img
              :src="selectedCard.authorAvatar"
              alt="author"
              class="author-avatar-large"
            />
            <div class="author-info">
              <div class="author-name-large">{{ selectedCard.authorName }}</div>
              <div class="post-time">2小时前</div>
            </div>
            <button class="follow-btn">关注</button>
          </div>
          <div class="card-detail-content-text">
            这是一篇关于{{
              selectedCard.title
            }}的详细内容。这里可以展示更多的文字描述、代码片段或者教程步骤。
            <br /><br />
            前端开发是创建Web用户界面的过程。它涉及到HTML、CSS和JavaScript的使用，以确保用户能够看到并与数据进行交互。
            <br /><br />
            #前端开发 #CSS技巧 #JavaScript
          </div>
          <div class="card-detail-actions">
            <div
              class="detail-action-item"
              :class="{ active: selectedCard.isLiked }"
              @click="toggleDetailLike"
            >
              <HeartIcon />
              <span>{{ selectedCard.likes }}</span>
            </div>
            <div class="detail-action-item">
              <MessageSquareIcon />
              <span>评论</span>
            </div>
            <div class="detail-action-item">
              <BookmarkIcon />
              <span>收藏</span>
            </div>
            <div class="detail-action-item">
              <ShareIcon />
              <span>分享</span>
            </div>
          </div>

          <!-- 评论区 -->
          <div class="comments-section">
            <h3>评论 (3)</h3>
            <div class="comment-list">
              <div class="comment-item">
                <img
                  src="../assets/2.svg?height=80&width=80"
                  alt="User"
                  class="comment-avatar"
                />
                <div class="comment-content">
                  <div class="comment-user">前端小王子</div>
                  <div class="comment-text">这个技巧太棒了，学到了很多！</div>
                  <div class="comment-actions">
                    <span class="comment-time">1小时前</span>
                    <span class="comment-like">
                      <HeartIcon />
                      <span>12</span>
                    </span>
                    <span class="comment-reply">回复</span>
                  </div>
                </div>
              </div>
              <div class="comment-item">
                <img
                  src="../assets/2.svg?height=80&width=80"
                  alt="User"
                  class="comment-avatar"
                />
                <div class="comment-content">
                  <div class="comment-user">CSS大师</div>
                  <div class="comment-text">
                    我也在用这个方法，效果确实不错！
                  </div>
                  <div class="comment-actions">
                    <span class="comment-time">30分钟前</span>
                    <span class="comment-like">
                      <HeartIcon />
                      <span>5</span>
                    </span>
                    <span class="comment-reply">回复</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="comment-input">
              <input type="text" placeholder="添加评论..." />
              <button>发送</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import {
  Search as SearchIcon,
  Home as HomeIcon,
  PlusCircle as PlusCircleIcon,
  Bell as BellIcon,
  User as UserIcon,
  ChevronDown as ChevronDownIcon,
  Play as PlayIcon,
  Pause as PauseIcon,
  Heart as HeartIcon,
  Plus as PlusIcon,
  MessageSquare as MessageSquareIcon,
  Bookmark as BookmarkIcon,
  Share as ShareIcon,
} from "lucide-vue-next";

// 状态管理
const searchQuery = ref("");
const activeNav = ref("discover");
const activeTab = ref("all");
const activeProfileTab = ref("posts");
const showSortDropdown = ref(false);
const currentSort = ref("综合");
const isLoading = ref(false);
const hasNewNotifications = ref(true);
const showCardDetail = ref(false);
const selectedCard = ref(null);
const detailVideoPlaying = ref(false);
const videoRefs = ref([]);
const fileInput = ref(null);

// 新帖子表单
const newPost = ref({
  title: "",
  content: "",
  image: null,
  isVideo: false,
});

// 分类标签
const tabs = ref([
  { id: "all", name: "全部" },
  { id: "articles", name: "图文" },
  { id: "videos", name: "视频" },
  { id: "users", name: "用户" },
]);

// 排序选项
const sortOptions = ref([
  { id: "comprehensive", name: "综合" },
  { id: "latest", name: "最新" },
  { id: "popular", name: "最热" },
]);

// 模拟数据
const cards = ref([
  {
    title: "Top5系列 国外天花板级创意网站欣赏",
    image: "/placeholder.svg?height=200&width=300",
    authorName: "Super站长",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    likes: "1386",
    isVideo: true,
    isPlaying: false,
    isLiked: false,
  },
  {
    title: "【CSS+JS】如何将网页渲染玩出高级感?",
    image: "/placeholder.svg?height=200&width=300",
    authorName: "山羊の前端小窝",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    likes: "1756",
    isVideo: true,
    isPlaying: false,
    isLiked: false,
  },
  {
    title: "几个让人大开眼界的CSS高级技巧",
    image: "/placeholder.svg?height=200&width=300",
    authorName: "程序猿DD",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    likes: "182",
    isVideo: true,
    isPlaying: false,
    isLiked: false,
  },
  {
    title: "分享一些前端WEB界面 后台界面设计图",
    image: "/placeholder.svg?height=200&width=300",
    authorName: "山羊AI+前端设计小乐",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    likes: "470",
    isVideo: false,
    isLiked: false,
  },
  {
    title: "一个项目，让你拥有全网几乎所有动画效果",
    image: "/placeholder.svg?height=200&width=300",
    authorName: "程序员三千",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    likes: "9656",
    isVideo: true,
    isPlaying: false,
    isLiked: false,
  },
  {
    title: "超炫酷的图片轮播效果！轻松实现流畅动效",
    image: "/placeholder.svg?height=200&width=300",
    authorName: "新潮达人",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    likes: "643",
    isVideo: true,
    isPlaying: false,
    isLiked: false,
  },
  {
    title: "【CSS+GASP】这设死的高级感～炫到爆的视差感",
    image: "/placeholder.svg?height=200&width=300",
    authorName: "小鹿叮",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    likes: "95",
    isVideo: false,
    isLiked: false,
  },
  {
    title: "前端特效大合集",
    image: "/placeholder.svg?height=200&width=300",
    authorName: "brizer",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    likes: "2448",
    isVideo: true,
    isPlaying: false,
    isLiked: false,
  },
  {
    title: "高级前端开发面试题，你会几道？",
    image: "/placeholder.svg?height=200&width=300",
    authorName: "一条一个momo酱",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    likes: "26",
    isVideo: false,
    isLiked: false,
  },
  {
    title: "程序员没睡醒？5个技巧做酷炫个人网站",
    image: "/placeholder.svg?height=200&width=300",
    authorName: "数字游侠人",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    likes: "2125",
    isVideo: true,
    isPlaying: false,
    isLiked: false,
  },
]);

// 模拟通知数据
const notifications = ref([
  {
    user: "Super站长",
    avatar: "../assets/2.svg?height=80&width=80",
    action: "点赞了你的笔记《CSS高级动画效果实现》",
    time: "2小时前",
    read: false,
  },
  {
    user: "山羊の前端小窝",
    avatar: "../assets/2.svg?height=80&width=80",
    action: "关注了你",
    time: "昨天",
    read: false,
  },
  {
    user: "程序猿DD",
    avatar: "../assets/2.svg?height=80&width=80",
    action: "评论了你的笔记：这个教程太棒了，学到很多！",
    time: "3天前",
    read: true,
  },
]);

// 模拟用户帖子
const userPosts = ref([
  {
    title: "CSS Grid布局完全指南",
    image: "../assets/2.svg?height=200&width=300",
    likes: "128",
    isVideo: false,
  },
  {
    title: "JavaScript异步编程技巧",
    image: "../assets/images/24.png",
    likes: "76",
    isVideo: true,
  },
  {
    title: "React Hooks最佳实践",
    image: "../assets/2.svg?height=200&width=300",
    likes: "95",
    isVideo: false,
  },
]);

// 计算属性：过滤后的卡片
const filteredCards = computed(() => {
  let result = [...cards.value];

  // 根据搜索关键词过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (card) =>
        card.title.toLowerCase().includes(query) ||
        card.authorName.toLowerCase().includes(query)
    );
  }

  // 根据标签过滤
  if (activeTab.value === "videos") {
    result = result.filter((card) => card.isVideo);
  } else if (activeTab.value === "articles") {
    result = result.filter((card) => !card.isVideo);
  }

  // 根据排序方式排序
  if (currentSort.value === "最新") {
    // 这里只是模拟，实际应用中应该有时间戳
    result = [...result].reverse();
  } else if (currentSort.value === "最热") {
    result = [...result].sort((a, b) => parseInt(b.likes) - parseInt(a.likes));
  }

  return result;
});

// 方法：设置活动导航
function setActiveNav(nav) {
  activeNav.value = nav;

  // 如果切换到通知页面，标记所有通知为已读
  if (nav === "notifications") {
    hasNewNotifications.value = false;
    notifications.value.forEach((notification) => {
      notification.read = true;
    });
  }
}

// 方法：设置活动标签
function setActiveTab(tab) {
  activeTab.value = tab;
}

// 方法：切换排序下拉菜单
function toggleSortDropdown() {
  showSortDropdown.value = !showSortDropdown.value;
}

// 方法：选择排序方式
function selectSort(sort) {
  currentSort.value = sort;
  showSortDropdown.value = false;
}

// 方法：处理搜索
function handleSearch() {
  console.log("搜索:", searchQuery.value);
  // 这里可以添加实际的搜索逻辑
}

// 方法：清除搜索
function clearSearch() {
  searchQuery.value = "";
}

// 方法：切换点赞状态
function toggleLike(index) {
  const card = cards.value[index];
  card.isLiked = !card.isLiked;

  // 更新点赞数
  const likes = parseInt(card.likes);
  card.likes = card.isLiked ? (likes + 1).toString() : (likes - 1).toString();
}

// 方法：播放视频
async function playVideo(card, index) {
  // 先停止所有其他视频
  cards.value.forEach((c, i) => {
    if (i !== index) {
      c.isPlaying = false;
    }
  });

  // 切换当前视频的播放状态
  card.isPlaying = !card.isPlaying;

  // 如果开始播放，等待DOM更新后获取视频元素并播放
  if (card.isPlaying) {
    await nextTick();
    const videoElement = videoRefs.value[index];
    if (videoElement) {
      try {
        await videoElement.play();
      } catch (error) {
        console.error("视频播放失败:", error);
        card.isPlaying = false;
      }
    }
  }
}

// 方法：停止视频
function stopVideo(index) {
  cards.value[index].isPlaying = false;
}

// 方法：加载更多内容
function loadMore() {
  isLoading.value = true;

  // 模拟加载更多内容
  setTimeout(() => {
    // 复制前5个卡片并修改一些数据
    const newCards = cards.value.slice(0, 5).map((card) => ({
      ...card,
      title: "新内容: " + card.title,
      likes: Math.floor(Math.random() * 1000).toString(),
      isLiked: false,
      isPlaying: false,
    }));

    // 添加到卡片列表
    cards.value = [...cards.value, ...newCards];
    isLoading.value = false;
  }, 1000);
}

// 方法：导航到其他页面
function navigateTo(page) {
  console.log("导航到:", page);
  // 这里可以添加实际的导航逻辑
}

// 方法：导航到用户资料页
function navigateToProfile(username) {
  console.log("查看用户资料:", username);
  // 这里可以添加实际的导航逻辑
}

// 方法：打开卡片详情
function openCardDetail(card) {
  selectedCard.value = { ...card };
  showCardDetail.value = true;
}

// 方法：关闭卡片详情
function closeCardDetail() {
  showCardDetail.value = false;
  detailVideoPlaying.value = false;
  selectedCard.value = null;
}

// 方法：播放详情页视频
async function playDetailVideo() {
  detailVideoPlaying.value = !detailVideoPlaying.value;

  if (detailVideoPlaying.value) {
    await nextTick();
    const videoElement = document.querySelector(".detail-video-player video");
    if (videoElement) {
      try {
        await videoElement.play();
      } catch (error) {
        console.error("视频播放失败:", error);
        detailVideoPlaying.value = false;
      }
    }
  }
}

// 方法：切换详情页点赞状态
function toggleDetailLike() {
  if (selectedCard.value) {
    selectedCard.value.isLiked = !selectedCard.value.isLiked;

    // 更新点赞数
    const likes = parseInt(selectedCard.value.likes);
    selectedCard.value.likes = selectedCard.value.isLiked
      ? (likes + 1).toString()
      : (likes - 1).toString();

    // 同步更新原卡片数据
    const index = cards.value.findIndex(
      (card) =>
        card.title === selectedCard.value.title &&
        card.authorName === selectedCard.value.authorName
    );

    if (index !== -1) {
      cards.value[index].isLiked = selectedCard.value.isLiked;
      cards.value[index].likes = selectedCard.value.likes;
    }
  }
}

// 方法：触发文件上传
function triggerFileUpload() {
  fileInput.value.click();
}

// 方法：处理文件上传
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // 检查文件类型
  newPost.value.isVideo = file.type.startsWith("video/");

  // 创建文件预览URL
  newPost.value.image = URL.createObjectURL(file);
}

// 方法：移除上传
function removeUpload() {
  newPost.value.image = null;
  newPost.value.isVideo = false;
  fileInput.value.value = "";
}

// 方法：发布帖子
function publishPost() {
  if (!newPost.value.title) {
    alert("请输入标题");
    return;
  }

  if (!newPost.value.image) {
    alert("请上传图片或视频");
    return;
  }

  // 创建新帖子
  const newCard = {
    title: newPost.value.title,
    image: newPost.value.image,
    authorName: "用户名", // 假设当前登录用户
    authorAvatar: "/placeholder.svg?height=40&width=40",
    likes: "0",
    isVideo: newPost.value.isVideo,
    isPlaying: false,
    isLiked: false,
  };

  // 添加到卡片列表的开头
  cards.value.unshift(newCard);

  // 添加到用户帖子列表
  userPosts.value.unshift({
    title: newPost.value.title,
    image: newPost.value.image,
    likes: "0",
    isVideo: newPost.value.isVideo,
  });

  // 重置表单
  newPost.value = {
    title: "",
    content: "",
    image: null,
    isVideo: false,
  };

  // 返回发现页面
  setActiveNav("discover");

  // 显示成功提示
  alert("发布成功！");
}

// 监听点击事件，关闭排序下拉菜单
onMounted(() => {
  document.addEventListener("click", () => {
    showSortDropdown.value = false;
  });
});
</script>
  
  <style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 顶部导航栏 */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background-color: white;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-text {
  color: white;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 14px;
  img {
    width: 150px;
  }
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 16px;
  padding: 6px 12px;
  width: 300px;
  position: relative;
}

.search-bar input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
}

.clear-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #999;
}

.search-btn {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 5px;
}

.search-icon {
  width: 18px;
  height: 18px;
  color: #666;
}

.header-actions {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #333;
}

.header-actions span {
  cursor: pointer;
}

.header-actions span:hover {
  color: #ff2e51;
}

/* 主体内容 */
.main-container {
  display: flex;
  flex: 1;
}

/* 侧边栏 */
.sidebar {
  width: 80px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

.sidebar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  width: 100%;
  cursor: pointer;
  color: #666;
  font-size: 12px;
  position: relative;
}

.sidebar-item.active {
  color: #ff2e51;
}

.sidebar-item svg {
  width: 22px;
  height: 22px;
  margin-bottom: 4px;
}

.notification-badge {
  position: absolute;
  top: 8px;
  right: 20px;
  width: 8px;
  height: 8px;
  background-color: #ff2e51;
  border-radius: 50%;
}

.notification-badge-mobile {
  position: absolute;
  top: 8px;
  right: 25px;
  width: 8px;
  height: 8px;
  background-color: #ff2e51;
  border-radius: 50%;
}

/* 内容区域 */
.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.content-tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.tabs-left {
  display: flex;
  gap: 20px;
}

.tab {
  font-size: 14px;
  color: #666;
  cursor: pointer;
  padding-bottom: 4px;
}

.tab.active {
  color: #000;
  font-weight: bold;
  border-bottom: 2px solid #ff2e51;
}

.tabs-right .dropdown {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  position: relative;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  margin-left: 4px;
}

.sort-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 120px;
  z-index: 10;
  margin-top: 8px;
}

.sort-option {
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
}

.sort-option:hover {
  background-color: #f5f5f5;
}

.sort-option.active {
  color: #ff2e51;
  font-weight: 500;
}

/* 卡片网格 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
}

.card-image {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  z-index: 2;
}

.video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.video-player video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-title {
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-author {
  display: flex;
  align-items: center;
  padding: 0 10px 10px;
}

.author-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 6px;
  cursor: pointer;
}

.author-name {
  font-size: 12px;
  color: #666;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.likes {
  display: flex;
  align-items: center;
  color: #999;
  font-size: 12px;
  cursor: pointer;
}

.likes.liked {
  color: #ff2e51;
}

.likes svg {
  width: 14px;
  height: 14px;
  margin-right: 4px;
}

/* 加载更多 */
.load-more {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  cursor: pointer;
  color: #666;
  font-size: 14px;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #ff2e51;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 无搜索结果 */
.no-results {
  text-align: center;
  padding: 40px 0;
  color: #666;
  font-size: 14px;
}

/* 底部导航 */
.footer {
  display: none;
  justify-content: space-around;
  padding: 10px 0;
  background-color: white;
  border-top: 1px solid #f0f0f0;
  position: sticky;
  bottom: 0;
  z-index: 100;
}

.footer-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #666;
  position: relative;
}

.footer-item.active {
  color: #ff2e51;
}

.footer-item svg {
  width: 20px;
  height: 20px;
  margin-bottom: 4px;
}

/* 卡片详情弹窗 */
.card-detail-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 20px;
}

.card-detail-content {
  background-color: white;
  border-radius: 12px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
}

.close-modal {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  z-index: 10;
}

.card-detail-image {
  position: relative;
  width: 100%;
  height: 400px;
}

.card-detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-icon-large {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  z-index: 2;
}

.detail-video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.detail-video-player video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-detail-info {
  padding: 20px;
}

.card-detail-info h2 {
  font-size: 20px;
  margin-bottom: 15px;
}

.card-detail-author {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.author-avatar-large {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.author-info {
  flex: 1;
}

.author-name-large {
  font-size: 16px;
  font-weight: 500;
}

.post-time {
  font-size: 12px;
  color: #999;
}

.follow-btn {
  background-color: #ff2e51;
  color: white;
  border: none;
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
}

.card-detail-content-text {
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 20px;
}

.card-detail-actions {
  display: flex;
  border-top: 1px solid #f0f0f0;
  padding-top: 15px;
  margin-bottom: 20px;
}

.detail-action-item {
  display: flex;
  align-items: center;
  margin-right: 30px;
  color: #666;
  cursor: pointer;
}

.detail-action-item.active {
  color: #ff2e51;
}

.detail-action-item svg {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

/* 评论区 */
.comments-section {
  border-top: 1px solid #f0f0f0;
  padding-top: 20px;
}

.comments-section h3 {
  font-size: 16px;
  margin-bottom: 15px;
}

.comment-list {
  margin-bottom: 20px;
}

.comment-item {
  display: flex;
  margin-bottom: 15px;
}

.comment-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-content {
  flex: 1;
}

.comment-user {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
}

.comment-text {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.comment-actions {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #999;
}

.comment-time {
  margin-right: 15px;
}

.comment-like {
  display: flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
}

.comment-like svg {
  width: 12px;
  height: 12px;
  margin-right: 3px;
}

.comment-reply {
  cursor: pointer;
}

.comment-input {
  display: flex;
  margin-top: 15px;
}

.comment-input input {
  flex: 1;
  border: 1px solid #eee;
  border-radius: 20px;
  padding: 8px 15px;
  outline: none;
  font-size: 14px;
}

.comment-input button {
  background-color: #ff2e51;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 15px;
  margin-left: 10px;
  font-size: 14px;
  cursor: pointer;
}

/* 发布页面 */
.publish-page {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
}

.publish-page h2 {
  margin-bottom: 20px;
  font-size: 18px;
}

.publish-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  outline: none;
}

.form-group textarea {
  min-height: 150px;
  resize: vertical;
}

.upload-area {
  border: 1px dashed #ccc;
  border-radius: 8px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
}

.upload-area svg {
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
}

.preview {
  position: relative;
  margin-top: 10px;
}

.preview img {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
}

.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #666;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.publish-btn {
  background-color: #ff2e51;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

/* 通知页面 */
.notifications-page {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
}

.notifications-page h2 {
  margin-bottom: 20px;
  font-size: 18px;
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.notification-item {
  display: flex;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.notification-item.unread {
  background-color: #fff0f2;
}

.notification-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.notification-content {
  flex: 1;
}

.notification-text {
  font-size: 14px;
  margin-bottom: 5px;
}

.notification-user {
  font-weight: 500;
}

.notification-time {
  font-size: 12px;
  color: #999;
}

.empty-notifications {
  text-align: center;
  padding: 40px 0;
  color: #666;
  font-size: 14px;
}

/* 个人资料页面 */
.profile-page {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}

.profile-info {
  flex: 1;
}

.profile-info h2 {
  font-size: 18px;
  margin-bottom: 5px;
}

.profile-info p {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.profile-stats {
  display: flex;
  gap: 20px;
}

.stat {
  text-align: center;
}

.stat-value {
  font-weight: 500;
}

.stat-label {
  font-size: 12px;
  color: #666;
}

.edit-profile-btn {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
}

.profile-tabs {
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.profile-tab {
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  color: #666;
}

.profile-tab.active {
  color: #ff2e51;
  border-bottom: 2px solid #ff2e51;
}

.empty-content {
  text-align: center;
  padding: 40px 0;
  color: #666;
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-actions {
    display: none;
  }

  .search-bar {
    width: 200px;
  }

  .sidebar {
    display: none;
  }

  .footer {
    display: flex;
  }

  .card-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 10px;
  }

  .card-image {
    height: 140px;
  }

  .card-detail-content {
    flex-direction: column;
    width: 95%;
  }

  .card-detail-image {
    height: 250px;
  }
}

@media (min-width: 769px) {
  .footer {
    display: none;
  }
}
</style>