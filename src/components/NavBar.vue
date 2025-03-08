<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="navbar-container">
      <div class="navbar-logo">
        <h1>BioVerse</h1>
      </div>
      <div class="navbar-links">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/models" class="nav-link">3D模型</router-link>
        <router-link to="/qa" class="nav-link">知识问答</router-link>
        <router-link to="/about" class="nav-link">关于我们</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease;
  padding: 20px 0;
}

.navbar-scrolled {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  padding: 15px 0;
}

.navbar-container {
  max-width: 90%;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo h1 {
  color: white;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.navbar-links {
  display: flex;
  gap: 8rem;
  margin-right: 5%;
  font-weight: bold;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  transition: opacity 0.3s ease;
  opacity: 0.8;
}

.nav-link:hover {
  opacity: 1;
}

@media (max-width: 768px) {
  .navbar-container {
    padding: 0 1rem;
  }
  
  .navbar-logo h1 {
    font-size: 1.5rem;
  }
  
  .navbar-links {
    gap: 1rem;
  }
  
  .nav-link {
    font-size: 1rem;
  }
}
</style>