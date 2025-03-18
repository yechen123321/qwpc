import { ref } from 'vue';

// 用户数据
const user = ref({
  username: '用户名',
  bio: '前端开发爱好者',
  avatar: '/placeholder.svg?height=80&width=80',
  stats: {
    following: 42,
    followers: 128,
    likes: 56
  }
});

// 用户帖子
const userPosts = ref([
  {
    id: '1',
    title: 'CSS Grid布局完全指南',
    image: '/placeholder.svg?height=200&width=300',
    likes: '128',
    isVideo: false
  },
  {
    id: '2',
    title: 'JavaScript异步编程技巧',
    image: '/placeholder.svg?height=200&width=300',
    likes: '76',
    isVideo: true
  },
  {
    id: '3',
    title: 'React Hooks最佳实践',
    image: '/placeholder.svg?height=200&width=300',
    likes: '95',
    isVideo: false
  }
]);

// 用户收藏
const userCollections = ref([]);

// 用户点赞
const userLikes = ref([]);

// 获取用户信息
export function getUserInfo() {
  return user.value;
}

// 获取用户帖子
export function getUserPosts() {
  return userPosts.value;
}

// 获取用户收藏
export function getUserCollections() {
  return userCollections.value;
}

// 获取用户点赞
export function getUserLikes() {
  return userLikes.value;
}

// 添加用户帖子
export function addUserPost(post) {
  userPosts.value.unshift(post);
}