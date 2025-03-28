<template>
  <div class="video-detail-container">
    <header class="detail-header">
      <div class="header-left">
        <button class="back-button" @click="goBack">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="#333"
              d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
            />
          </svg>
        </button>
      </div>
      <h1 class="header-title">{{ videoData.title }}</h1>
      <div class="header-right"></div>
    </header>
    <!-- 视频播放区域 -->
    <div class="video-player" style="margin-top: 50px">
      <video
        ref="videoPlayer"
        :src="videoData.videoUrl"
        controls
        playsinline
        webkit-playsinline
        x5-playsinline
        class="video-element"
        @play="handlePlay"
        @pause="handlePause"
      ></video>
      <div v-if="showPlayButton" class="play-button" @click="playVideo">
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path fill="white" d="M8,5.14V20.14L19,12.14L8,5.14Z" />
        </svg>
      </div>
    </div>

    <!-- 视频信息 -->
    <div class="video-info">
      <h1 class="video-title">{{ videoData.title }}</h1>
      <div class="meta-info">
        <span class="views">{{ formatViews(videoData.views) }}次播放</span>
        <span class="date">{{ formatDate(videoData.createdAt) }}</span>
      </div>
      <div class="author-info">
        <img
          :src="videoData.author.avatar"
          class="author-avatar"
          alt="作者头像"
        />
        <span class="author-name">{{ videoData.author.name }}</span>
        <button class="follow-btn" @click="toggleFollow">
          {{ isFollowing ? "已关注" : "+ 关注" }}
        </button>
      </div>
      <div class="video-desc">
        {{ videoData.description }}
      </div>
      <div class="tags">
        <span v-for="tag in videoData.tags" :key="tag" class="tag">{{
          tag
        }}</span>
      </div>
    </div>

    <!-- 目录/章节 -->
    <div
      class="chapter-section"
      v-if="videoData.chapters && videoData.chapters.length > 0"
    >
      <h2 class="section-title">目录</h2>
      <div class="chapter-list">
        <div
          v-for="chapter in videoData.chapters"
          :key="chapter.time"
          class="chapter-item"
          @click="jumpToTime(chapter.time)"
        >
          <span class="chapter-time">{{ formatTime(chapter.time) }}</span>
          <span class="chapter-title">{{ chapter.title }}</span>
        </div>
      </div>
    </div>

    <!-- 互动区域 -->
    <div class="action-bar">
      <div class="action-item" @click="toggleLike">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            :fill="isLiked ? '#ff2442' : '#666'"
            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
          />
        </svg>
        <span :style="{ color: isLiked ? '#ff2442' : '#666' }">{{
          videoData.likes
        }}</span>
      </div>
      <div class="action-item" @click="toggleCollect">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            :fill="isCollected ? '#ff9500' : '#666'"
            d="M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z"
          />
        </svg>
        <span :style="{ color: isCollected ? '#ff9500' : '#666' }">收藏</span>
      </div>
      <div class="action-item" @click="showSharePanel = true">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="#666"
            d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"
          />
        </svg>
        <span>分享</span>
      </div>
    </div>

    <!-- 推荐视频 -->
    <div class="recommend-section">
      <h2 class="section-title">相关推荐</h2>
      <div class="recommend-list">
        <div
          v-for="video in recommendedVideos"
          :key="video.id"
          class="recommend-item"
          @click="goToVideo(video.id)"
        >
          <img :src="video.cover" class="recommend-cover" alt="推荐视频封面" />
          <div class="recommend-info">
            <h3 class="recommend-title">{{ video.title }}</h3>
            <div class="recommend-meta">
              <span class="recommend-author">{{ video.author.name }}</span>
              <span class="recommend-views"
                >{{ formatViews(video.views) }}次播放</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分享面板 -->
    <div
      v-if="showSharePanel"
      class="share-overlay"
      @click="showSharePanel = false"
    >
      <div class="share-panel" @click.stop>
        <h3>分享到</h3>
        <div class="share-platforms">
          <div class="platform-item">
            <svg viewBox="0 0 24 24" width="40" height="40">
              <path
                fill="#07C160"
                d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z"
              />
            </svg>
            <span>微信</span>
          </div>
          <div class="platform-item">
            <svg viewBox="0 0 24 24" width="40" height="40">
              <path
                fill="#FF2442"
                d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"
              />
            </svg>
            <span>朋友圈</span>
          </div>
          <div class="platform-item">
            <svg viewBox="0 0 24 24" width="40" height="40">
              <path
                fill="#FF9500"
                d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"
              />
            </svg>
            <span>其他</span>
          </div>
        </div>
        <button class="cancel-btn" @click="showSharePanel = false">取消</button>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 视频数据
const videoData = ref({
  id: route.params.id,
  title: "宇宙大爆炸理论详解",
  videoUrl: "src/assets/v/1.mp4",
  cover: "https://picsum.photos/800/450?random=1",
  views: 12500,
  likes: 842,
  createdAt: "2025-03-15T14:30:00Z",
  description:
    "本视频详细解释了宇宙大爆炸理论，包括宇宙的起源、膨胀过程以及相关证据。内容涵盖宇宙微波背景辐射、哈勃定律、元素丰度等重要科学发现，适合对天文学感兴趣的观众观看学习。",
  author: {
    id: "author1",
    name: "天文科普馆",
    avatar: "https://picsum.photos/100/100?random=10",
  },
  tags: ["宇宙", "天文", "科学", "科普"],
  chapters: [
    { time: 0, title: "开场介绍" },
    { time: 120, title: "宇宙大爆炸理论概述" },
    { time: 240, title: "关键证据：宇宙微波背景" },
    { time: 360, title: "哈勃定律与宇宙膨胀" },
    { time: 480, title: "元素丰度的观测证据" },
    { time: 600, title: "总结与思考" },
  ],
});

// 推荐视频数据
const recommendedVideos = ref([
  {
    id: "video-2",
    title: "黑洞的形成与特性",
    cover: "https://picsum.photos/300/200?random=2",
    views: 9800,
    author: { name: "宇宙探索" },
  },
  {
    id: "video-3",
    title: "太阳系行星全解析",
    cover: "https://picsum.photos/300/200?random=3",
    views: 7600,
    author: { name: "天文科普馆" },
  },
  {
    id: "video-4",
    title: "暗物质与暗能量之谜",
    cover: "https://picsum.photos/300/200?random=4",
    views: 11200,
    author: { name: "科学前沿" },
  },
]);

// 交互状态
const isLiked = ref(false);
const isCollected = ref(false);
const isFollowing = ref(false);
const showSharePanel = ref(false);
const showPlayButton = ref(true);
const videoPlayer = ref(null);

// 格式化播放量
const formatViews = (views) => {
  if (views >= 10000) {
    return (views / 10000).toFixed(1) + "万";
  }
  return views;
};

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

// 格式化时间
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// 播放视频
const playVideo = () => {
  videoPlayer.value.play();
  showPlayButton.value = false;
};

// 视频播放事件
const handlePlay = () => {
  showPlayButton.value = false;
};

// 视频暂停事件
const handlePause = () => {
  showPlayButton.value = true;
};

// 跳转到指定时间
const jumpToTime = (seconds) => {
  videoPlayer.value.currentTime = seconds;
  playVideo();
};

// 点赞/取消点赞
const toggleLike = () => {
  isLiked.value = !isLiked.value;
  if (isLiked.value) {
    videoData.value.likes += 1;
  } else {
    videoData.value.likes -= 1;
  }
};

// 收藏/取消收藏
const toggleCollect = () => {
  isCollected.value = !isCollected.value;
};

// 关注/取消关注作者
const toggleFollow = () => {
  isFollowing.value = !isFollowing.value;
};

// 跳转到其他视频
const goToVideo = (id) => {
  router.push({ name: "VideoDetail", params: { id } });
};

// 初始化加载数据
onMounted(() => {
  // 这里应该是API请求获取视频详情
  console.log("加载视频详情:", route.params.id);
});
</script>
  
  <style scoped>
/* 新增header样式 */
.detail-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.header-left {
  width: 60px;
}

.back-button {
  padding: 8px;
  border: none;
  background: none;
  cursor: pointer;
}

.back-button svg {
  vertical-align: middle;
}

.header-title {
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 20px;
}

.header-right {
  width: 60px;
}

.video-detail-container {
  max-width: 100%;
  padding-bottom: 20px;
  background-color: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
}

/* 视频播放器样式 */
.video-player {
  position: relative;
  width: 100%;
  background-color: #000;
}

.video-element {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  display: block;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

/* 视频信息样式 */
.video-info {
  padding: 15px;
  background-color: #fff;
  margin-bottom: 10px;
}

.video-title {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.meta-info {
  display: flex;
  margin-bottom: 15px;
  font-size: 12px;
  color: #999;
}

.meta-info span {
  margin-right: 15px;
}

.author-info {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.author-name {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.follow-btn {
  padding: 5px 12px;
  background-color: #07c160;
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 12px;
}

.video-desc {
  margin-bottom: 15px;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.tags {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  padding: 3px 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  background-color: #f0f0f0;
  border-radius: 3px;
  font-size: 12px;
  color: #666;
}

/* 章节样式 */
.section-title {
  margin: 0 15px 10px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.chapter-section {
  background-color: #fff;
  padding: 15px 0;
  margin-bottom: 10px;
}

.chapter-list {
  padding: 0 15px;
}

.chapter-item {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
}

.chapter-item:last-child {
  border-bottom: none;
}

.chapter-time {
  width: 50px;
  font-size: 12px;
  color: #999;
}

.chapter-title {
  flex: 1;
  font-size: 14px;
  color: #333;
}

/* 互动栏样式 */
.action-bar {
  display: flex;
  justify-content: space-around;
  padding: 15px 0;
  background-color: #fff;
  margin-bottom: 10px;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #666;
}

.action-item span {
  margin-top: 5px;
}

/* 推荐视频样式 */
.recommend-section {
  background-color: #fff;
  padding: 15px 0;
}

.recommend-list {
  padding: 0 15px;
}

.recommend-item {
  display: flex;
  margin-bottom: 15px;
}

.recommend-item:last-child {
  margin-bottom: 0;
}

.recommend-cover {
  width: 120px;
  height: 80px;
  border-radius: 4px;
  object-fit: cover;
  margin-right: 10px;
}

.recommend-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.recommend-title {
  margin: 0;
  font-size: 14px;
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.recommend-meta {
  font-size: 12px;
  color: #999;
}

.recommend-meta span {
  margin-right: 10px;
}

/* 分享面板样式 */
.share-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 100;
}

.share-panel {
  background-color: #fff;
  border-radius: 12px 12px 0 0;
  padding: 20px;
}

.share-panel h3 {
  margin: 0 0 20px;
  text-align: center;
  font-size: 16px;
  color: #333;
}

.share-platforms {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.platform-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.platform-item span {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}

.cancel-btn {
  width: 100%;
  padding: 12px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  color: #333;
}

/* 响应式调整 */
@media (max-width: 375px) {
  .video-title {
    font-size: 16px;
  }

  .recommend-cover {
    width: 100px;
    height: 70px;
  }

  .recommend-title {
    font-size: 13px;
  }
}
</style>