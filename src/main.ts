import { createApp, Component } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import router from "./router";
import App from "./App.vue";

// 确保 lucide-vue-next 已正确安装
import * as LucideIcons from "lucide-vue-next";

const app = createApp(App);

// 注册 ElementPlus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component as Component);
}

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

// 挂载应用
app.mount("#app");