<template>
  <div class="app-container">
    <!-- Main content area -->
    <main class="main-content">
      <!-- Era display with transitions -->
      <transition 
        :name="transitionName" 
        mode="out-in"
        @before-leave="beforeLeave"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <EraDisplay 
          :key="currentEraIndex" 
          :era="geologicalData[currentEraIndex]" 
        />
      </transition>
      
      <!-- Era navigation buttons -->
      <!-- <div class="navigation-buttons">
        <button 
          @click="prevEra" 
          class="nav-button prev-button"
          :disabled="currentEraIndex === 0"
          :class="{ 'disabled': currentEraIndex === 0 }"
        >
          <ChevronLeft class="icon" />
        </button>
        
        <div class="era-label">
          <span>{{ geologicalData[currentEraIndex].name }}</span>
        </div>
        
        <button 
          @click="nextEra" 
          class="nav-button next-button"
          :disabled="currentEraIndex === geologicalData.length - 1"
          :class="{ 'disabled': currentEraIndex === geologicalData.length - 1 }"
        >
          <ChevronRight class="icon" />
        </button>
      </div> -->
    </main>
    
    <!-- Fixed timeline at the bottom -->
    <div class="timeline-container">
      <div class="timeline-content">
        <h2 class="timeline-title">地质时间轴</h2>
        
        <!-- Timeline -->
        <div class="timeline">
          <!-- Timeline track -->
          <div class="timeline-track"></div>
          
          <!-- Timeline eras -->
          <div class="timeline-eras">
            <div 
              v-for="(era, index) in geologicalData" 
              :key="era.id"
              class="era-segment"
              :style="{ 
                width: `${era.duration / 5.4}%`,
                backgroundColor: era.color,
                opacity: index === currentEraIndex ? 1 : 0.5
              }"
              @click="goToEra(index)"
            >
              <!-- Era label -->
              <div class="era-name">
                {{ era.name }}
              </div>
              
              <!-- Era dot -->
              <div 
                class="era-dot"
                :class="index === currentEraIndex ? 'active' : ''"
                :style="{ 
                  backgroundColor: era.color,
                  left: index === 0 ? '0%' : index === geologicalData.length - 1 ? '100%' : '50%',
                  transform: index === 0 ? 'translateY(-50%)' : 
                            index === geologicalData.length - 1 ? 'translate(-100%, -50%)' : 
                            'translate(-50%, -50%)'
                }"
              ></div>
            </div>
          </div>
          
          <!-- Current era indicator -->
          <div 
            class="era-indicator"
            :style="{ left: `${handlePosition}%` }"
          >
            <div 
              class="indicator-dot"
              :style="{ backgroundColor: geologicalData[currentEraIndex].color }"
            ></div>
          </div>
        </div>
        
        <!-- Timeline years -->
        <div class="timeline-years">
          <span>541百万年前</span>
          <span>现在</span>
        </div>
      </div>
    </div>
    
    <!-- Bottom spacer to prevent content from being hidden behind the fixed timeline -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import EraDisplay from '../components/EraDisplay.vue';
import { geologicalData } from '../data/data.js';

const currentEraIndex = ref(0);
const transitionName = ref('slide-right');
const handlePosition = ref(0);

// Calculate handle position based on current era
const updateHandlePosition = () => {
  let position = 0;
  for (let i = 0; i < currentEraIndex.value; i++) {
    position += geologicalData[i].duration / 5.4;
  }
  
  // Add half of the current era's width (except for first and last)
  if (currentEraIndex.value > 0 && currentEraIndex.value < geologicalData.length - 1) {
    position += (geologicalData[currentEraIndex.value].duration / 5.4) / 2;
  } else if (currentEraIndex.value === geologicalData.length - 1) {
    position = 100;
  }
  
  handlePosition.value = position;
};

// Navigation functions
const nextEra = () => {
  if (currentEraIndex.value < geologicalData.length - 1) {
    transitionName.value = 'slide-left';
    currentEraIndex.value++;
  }
};

const prevEra = () => {
  if (currentEraIndex.value > 0) {
    transitionName.value = 'slide-right';
    currentEraIndex.value--;
  }
};

const goToEra = (index) => {
  if (index === currentEraIndex.value) return;
  
  transitionName.value = index > currentEraIndex.value ? 'slide-left' : 'slide-right';
  currentEraIndex.value = index;
};

// Watch for era changes to update handle position
watch(currentEraIndex, () => {
  updateHandlePosition();
});

// Animation hooks
const beforeLeave = (el) => {
  el.style.position = 'absolute';
  el.style.width = '100%';
  el.style.height = '100%';
};

const enter = (el) => {
  el.style.position = 'absolute';
  el.style.width = '100%';
  el.style.height = '100%';
};

const afterEnter = (el) => {
  el.style.position = '';
  el.style.width = '';
  el.style.height = '';
};

// Initialize
onMounted(() => {
  updateHandlePosition();
});
</script>

<style>
/* Base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #000;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
}

/* App container */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

/* Main content */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Navigation buttons */
.navigation-buttons {
  position: absolute;
  bottom: 112px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 16px;
  z-index: 20;
  padding: 0 16px;
}

.nav-button {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  color: white;
  border: none;
  border-radius: 50%;
  padding: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.icon {
  width: 24px;
  height: 24px;
}

.era-label {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  color: white;
  border-radius: 9999px;
  padding: 12px 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.era-label span {
  font-size: 14px;
  font-weight: 500;
}

/* Timeline */
.timeline-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 30;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
}

.timeline-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8px 16px;
}

.timeline-title {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}

.timeline {
  position: relative;
  height: 64px;
  margin-bottom: 8px;
}

.timeline-track {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.2);
}

.timeline-eras {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 1px;
  display: flex;
}

.era-segment {
  height: 100%;
  position: relative;
  cursor: pointer;
}

.era-name {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 12px;
  font-weight: 500;
  transition: opacity 0.3s;
  opacity: 0;
  color: white;
}

.era-segment:hover .era-name {
  opacity: 1;
}

.era-dot {
  position: absolute;
  top: 50%;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  transition: transform 0.3s;
}

.era-dot.active {
  transform: translate(-50%, -50%) scale(1.5) !important;
}

.era-indicator {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 24px;
  width: 24px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.5s;
}

.indicator-dot {
  height: 8px;
  width: 8px;
  border-radius: 50%;
}

.timeline-years {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 4px;
}

/* Bottom spacer */
.bottom-spacer {
  height: 128px;
}

/* Transition animations */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(5%);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-5%);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-5%);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(5%);
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* Media queries for responsiveness */
@media (max-width: 768px) {
  .navigation-buttons {
    bottom: 96px;
  }
  
  .icon {
    width: 20px;
    height: 20px;
  }
  
  .era-label {
    padding: 8px 16px;
  }
  
  .timeline {
    height: 48px;
  }
  
  .bottom-spacer {
    height: 96px;
  }
}
</style>