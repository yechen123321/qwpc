import { createApp, Component } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import router from "./router";
import App from "./App.vue";
import Antd from "ant-design-vue";
import VueAMap, { initAMapApiLoader } from "@vuemap/vue-amap";
import '@vuemap/vue-amap/dist/style.css'
import "ant-design-vue/dist/reset.css";
// 确保 lucide-vue-next 已正确安装
import * as LucideIcons from "lucide-vue-next";

const app = createApp(App);
app.use(Antd);
// 注册 ElementPlus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component as Component);
}
// 高德地图全局配置
initAMapApiLoader({
  key: "e4aca150aefe0ddb39f37ce94eafddf9",
  securityJsCode: "3355637d8322b0877af48e7dbd8111f4",
  plugins: [
    'AMap.Geolocation',
    'AMap.Marker',
    'AMap.InfoWindow',
    'AMap.Loca'  // Loca需要单独处理
  ],
})

// 注册 Lucide 图标
type LucideIconComponent = Component & ((props: any) => any);
Object.entries(LucideIcons).forEach(([name, component]) => {
  if (typeof component === "function" && "render" in component) {
    app.component(name, component as LucideIconComponent);
  }
});

// 使用 ElementPlus 和 路由
app.use(ElementPlus);
app.use(router);
app.use(VueAMap);
// 挂载应用
app.mount("#app");
