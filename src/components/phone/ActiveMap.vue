<template>
  <div class="map-container">
    <div id="map-container" style="width: 100%; height: 80vh"></div>

    <!-- 信息面板 -->
    <div v-if="selectedPoint" class="info-panel">
      <div class="header">
        <h2>{{ selectedPoint.name }}</h2>
        <button class="close-btn" @click="selectedPoint = null">×</button>
      </div>

      <!-- 图片轮播 -->
      <div class="carousel">
        <img
          v-for="(img, index) in selectedPoint.images"
          :key="index"
          :src="img"
          :class="{ active: currentImageIndex === index }"
        />
      </div>

      <!-- 基本信息 -->
      <div class="meta-info">
        <div class="rating">
          <span class="stars">★★★★☆</span>
          {{ selectedPoint.properties.rating }}
        </div>
        <p>{{ selectedPoint.description }}</p>
        <div class="tags">
          <span v-for="tag in selectedPoint.tags" :key="tag">{{ tag }}</span>
        </div>
      </div>

      <!-- 活动信息 -->
      <div class="events" v-if="selectedPoint.events.length">
        <h3>
          近期活动 <span class="badge">{{ selectedPoint.events.length }}</span>
        </h3>
        <div class="event-list">
          <div
            v-for="event in selectedPoint.events"
            :key="event.id"
            class="event-item"
          >
            <div class="event-time">
              <span class="date">{{ event.date }}</span>
              <span class="time">{{ event.time }}</span>
            </div>
            <div class="event-content">
              <h4>{{ event.title }}</h4>
              <p>{{ event.content }}</p>
              <a
                v-if="event.registration"
                :href="event.registration"
                target="_blank"
                class="reg-btn"
              >
                立即报名
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- 导航面板 -->
      <div class="navigation">
        <h3>路线规划</h3>
        <div class="transport-modes">
          <button
            v-for="mode in transportModes"
            :key="mode.value"
            :class="{ active: currentMode === mode.value }"
            @click="currentMode = mode.value"
          >
            {{ mode.label }}
          </button>
        </div>
        <div class="route-info" v-if="currentRoute">
          <p>距离: {{ currentRoute.distance }}</p>
          <p>预计耗时: {{ currentRoute.duration }}</p>
          <button @click="startNavigation" class="nav-btn">🚩 开始导航</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, onMounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { mockPoints, mockUserLocation, mockTrafficData } from "./mockData.js";

const map = ref(null);
const selectedPoint = ref(null);
const currentImageIndex = ref(0);
const currentMode = ref("driving");
const currentRoute = ref(null);

// 交通方式选项
const transportModes = [
  { label: "驾车", value: "driving" },
  { label: "公交", value: "transit" },
  { label: "步行", value: "walking" },
];

// 初始化地图
const initMap = async () => {
  try {
    const AMap = await AMapLoader.load({
      key: "e4aca150aefe0ddb39f37ce94eafddf9",
      version: "2.0",
      plugins: ["AMap.Geolocation", "AMap.Marker", "AMap.InfoWindow"],
    });

    // 创建地图实例
    map.value = new AMap.Map("map-container", {
      zoom: 13,
      center: mockUserLocation.position,
    });

    // 添加用户位置标记
    new AMap.Marker({
      position: mockUserLocation.position,
      content: '<div class="user-marker">📍</div>',
      offset: new AMap.Pixel(-10, -30),
    }).addTo(map.value);

    // 添加POI标记
    mockPoints.forEach((point) => {
      const marker = new AMap.Marker({
        position: point.position,
        content: createMarkerContent(point),
        offset: new AMap.Pixel(-15, -45),
      });

      marker.on("click", () => {
        selectedPoint.value = point;
        currentRoute.value =
          mockTrafficData.routes[point.id]?.[currentMode.value];
        showInfoWindow(point);
      });

      marker.addTo(map.value);
    });
  } catch (error) {
    console.error("地图初始化失败:", error);
  }
};

const createMarkerContent = (point) => {
  return `
    <div class="custom-marker">
      <div class="marker-icon ${point.type}">
        <div class="marker-icon-content">
          ${getIconByType(point.type)}
        </div>
      </div>
      <div class="marker-label">${point.name}</div>
    </div>
  `
}

const getIconByType = (type) => {
  const icons = {
    theme_park: '🎢',
    park: '🌳',
    cultural: '🏯'
  }
  return icons[type] || '📍'
}
// 显示信息窗口
const showInfoWindow = (point) => {
  const infoWindow = new AMap.InfoWindow({
    content: `<div class="map-infowindow">
                  <h4>${point.name}</h4>
                  <p>${point.description}</p>
                  <div class="tags">${point.tags
                    .map((t) => `<span>${t}</span>`)
                    .join("")}</div>
                </div>`,
    offset: new AMap.Pixel(0, -45),
  });
  infoWindow.open(map.value, point.position);
};

// 开始导航
const startNavigation = () => {
  if (!selectedPoint.value) return;

  const from = mockUserLocation.position.join(",");
  const to = selectedPoint.value.position.join(",");

  window.open(
    `https://uri.amap.com/navigation?from=${from}&to=${to}&mode=${currentMode.value}`
  );
};

// 初始化
onMounted(initMap);
</script>
  
  <style scoped>
.amap-logo,
.amap-copyright {
  display: none !important;
  opacity: 0 !important;
}
/* 隐藏比例尺控件 */
.amap-scalecontrol {
  display: none !important;
}

.meta-info, .events, .navigation {
    padding: 1.5rem;
}
  #map-container {
    height: 150vh !important;
  }
.map-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

/* 信息面板整体样式 */
.info-panel {
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  width: 380px;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 999;
  transform: translateY(-10px);
  opacity: 0;
  animation: panelSlideIn 0.4s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

@keyframes panelSlideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 头部样式 */
.header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 16px 16px 0 0;
}

.header h2 {
  color: white;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

/* 图片轮播 */
.carousel {
  height: 220px;
  border-radius: 12px;
  overflow: hidden;
  margin: 1rem;
  position: relative;
}

.carousel img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease-in-out, transform 0.5s ease;
  transform: scale(0.95);
}

.carousel img.active {
  opacity: 1;
  transform: scale(1);
}

/* 标签样式 */
.tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 1rem 0;
}

.tags span {
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, #6b8dd6 0%, #8e37d7 100%);
  color: white;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(107, 141, 214, 0.2);
}

/* 活动列表 */
.event-item {
  padding: 1rem;
  margin: 0.5rem 0;
  background: rgba(245, 245, 245, 0.6);
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(5px);
}

.event-item:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateX(5px);
}

.event-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 1rem;
  background: rgba(79, 172, 254, 0.1);
  border-radius: 8px;
}

/* 导航按钮组 */
.transport-modes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin: 1rem 0;
}

.transport-modes button {
  padding: 0.75rem;
  border: none;
  border-radius: 10px;
  background: rgba(79, 172, 254, 0.1);
  color: #4facfe;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.transport-modes button.active {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(79, 172, 254, 0.3);
}

/* 主导航按钮 */
.nav-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.nav-btn::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transform: rotate(45deg);
  transition: all 0.5s ease;
}

.nav-btn:hover {
  box-shadow: 0 8px 24px rgba(79, 172, 254, 0.4);
  transform: translateY(-2px);
}

.nav-btn:hover::after {
  left: 150%;
}

/* 自定义标记容器 */
:deep(.custom-marker) {
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 标记图标动画 */
.marker-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  box-shadow: 0 4px 12px rgba(79, 172, 254, 0.3);
  transform: translateY(0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.marker-icon::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  animation: ripple 2s infinite;
}

@keyframes ripple {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* 不同类型标记配色 */
.marker-icon.theme_park {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

.marker-icon.park {
  background: linear-gradient(135deg, #69f0ae 0%, #00e676 100%);
  box-shadow: 0 4px 12px rgba(105, 240, 174, 0.3);
}

.marker-icon.cultural {
  background: linear-gradient(135deg, #ffd54f 0%, #ffc107 100%);
  box-shadow: 0 4px 12px rgba(255, 213, 79, 0.3);
}

/* 悬停效果 */
:deep(.custom-marker):hover .marker-icon {
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 8px 24px rgba(79, 172, 254, 0.4);
}

/* 标记文字标签 */
.marker-label {
  position: absolute;
  top: 48px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: all 0.3s ease;
}

:deep(.custom-marker):hover .marker-label {
  opacity: 1;
  transform: translate(-50%, 5px);
}

/* 当前选中标记特效 */
.marker-icon.active {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(79, 172, 254, 0.4);
  }
  70% {
    box-shadow: 0 0 0 12px rgba(79, 172, 254, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(79, 172, 254, 0);
  }
}

/* 标记图标内容 */
.marker-icon-content {
  color: white;
  font-size: 18px;
  position: relative;
  z-index: 1;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .info-panel {
    width: 90%;
    right: 5%;
    top: 1rem;
  }

  .carousel {
    height: 180px;
  }
}
</style>