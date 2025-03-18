import { ref } from 'vue';

// 通知数据
const notifications = ref([
  {
    id: '1',
    user: 'Super站长',
    avatar: '/placeholder.svg?height=40&width=40',
    action: '点赞了你的笔记《CSS高级动画效果实现》',
    time: '2小时前',
    read: false
  },
  {
    id: '2',
    user: '山羊の前端小窝',
    avatar: '/placeholder.svg?height=40&width=40',
    action: '关注了你',
    time: '昨天',
    read: false
  },
  {
    id: '3',
    user: '程序猿DD',
    avatar: '/placeholder.svg?height=40&width=40',
    action: '评论了你的笔记：这个教程太棒了，学到很多！',
    time: '3天前',
    read: true
  }
]);

// 获取所有通知
export function getNotifications() {
  return notifications.value;
}

// 检查是否有未读通知
export function hasUnreadNotifications() {
  return notifications.value.some(notification => !notification.read);
}

// 标记所有通知为已读
export function markAllAsRead() {
  notifications.value.forEach(notification => {
    notification.read = true;
  });
}

// 添加新通知
export function addNotification(notification) {
  notifications.value.unshift({
    id: Date.now().toString(),
    read: false,
    ...notification
  });
}