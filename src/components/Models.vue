<template>
    <div ref="container" class="canvas-container"></div>
  </template>
    
    <script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  import * as THREE from "three";
  import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  const container = ref(null);
  let scene, camera, renderer, mixer;
  
  // 初始化场景
  function initScene() {
    // 1. 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x808080); // HEX格式的中间灰
  
    // 2. 创建相机
    camera = new THREE.PerspectiveCamera(
      75,
      container.value.clientWidth / container.value.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
  
    // 3. 创建渲染器（开启抗锯齿）
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // 允许透明（如果需要）
    });
    renderer.setSize(container.value.clientWidth, container.value.clientHeight);
    container.value.appendChild(renderer.domElement);
  
    // 4. 增强光照系统
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // 增强环境光强度
    scene.add(ambientLight);
  
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // 增强主光源强度
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    // 可选：添加辅助光
    // 半球光（天空光+地面反射光）
    // 四向平行光阵列
    const lightPositions = [
      [5, 5, 5], // 右上前
      [-5, 5, 5], // 左上前
      [0, 5, -5], // 正后方
      [0, -5, 0], // 下方补光
    ];
    lightPositions.forEach((pos) => {
      const light = new THREE.DirectionalLight(0xffffff, 0.5);
      light.position.set(...pos);
  
      // 启用阴影（可选）
      light.castShadow = false;
      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 1024;
  
      scene.add(light);
    });
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    // 5. 加载并提亮模型
    const loader = new GLTFLoader();

    const modelBase64 = '/src/assets/h.glb'

    const dataURI = `${modelBase64}`;
  loader.load(
    dataURI,
    (gltf) => {
      // 遍历模型材质并提亮
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          // 方法1：直接提升材质亮度
          if (child.material) {
            child.material.emissiveIntensity = 0.5; // 增加自发光强度
            child.material.needsUpdate = true;
          }
          // 方法2：调整颜色映射
          child.material.toneMapped = false; // 禁用色调映射
          child.material.color.multiplyScalar(10); // 提升颜色亮度
        }
      });
      const model = gltf.scene;

      // 第一步：计算初始包围盒
      const box = new THREE.Box3().expandByObject(model);
      const size = box.getSize(new THREE.Vector3());

      // 第二步：自动缩放计算
      const targetSize = 5; // 目标尺寸（单位：米）
      const scaleFactor = targetSize / Math.max(size.x, size.y, size.z);
      model.scale.set(scaleFactor, scaleFactor, scaleFactor);
      // 第三步：重新计算位置
      box.getCenter(model.position); // 获取模型原始中心点
      model.position.multiplyScalar(-scaleFactor); // 抵消缩放带来的位移
      // 第四步：场景布局
      scene.add(model);
      // 第五步：相机视角适配
      const cameraDistance = calculateCameraDistance(model, camera);
      camera.position.set(cameraDistance, cameraDistance / 2, cameraDistance);
      camera.lookAt(model.position);
      scene.add(gltf.scene);
      // 播放动画（如果有）
      if (gltf.animations?.length) {
        mixer = new THREE.AnimationMixer(gltf.scene);
        mixer.clipAction(gltf.animations[0]).play();
      }
    },
    undefined,
    (error) => {
      console.error("Error loading model:", error);
    }
  );
}

// 相机角度适配
function calculateCameraDistance(model, camera) {
  const box = new THREE.Box3().expandByObject(model);
  const size = box.getSize(new THREE.Vector3());
  const fov = (camera.fov * Math.PI) / 180;
  return Math.max(size.x, size.z) / (2 * Math.tan(fov / 2));
}
// 动画循环
function animate() {
  requestAnimationFrame(animate);
  if (mixer) mixer.update(0.016); // 更新动画
  renderer.render(scene, camera);
}

// 响应式调整
function onWindowResize() {
  camera.aspect = container.value.clientWidth / container.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
}

onMounted(() => {
  initScene();
  animate();
  window.addEventListener("resize", onWindowResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", onWindowResize);
  // 清理资源
  scene.traverse((child) => {
    if (child.isMesh) {
      child.geometry.dispose();
      child.material.dispose();
    }
  });
  renderer.dispose();
});
</script>
  
  <style>
.canvas-container {
  width: 100%;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}
</style>
  