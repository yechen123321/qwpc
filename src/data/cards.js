import { ref } from 'vue';

// 卡片数据
const cards = ref([
  {
    id: '1',
    title: 'Top5系列 国外天花板级创意网站欣赏',
    image: '/placeholder.svg?height=200&width=300',
    authorName: 'Super站长',
    authorAvatar: '/placeholder.svg?height=40&width=40',
    likes: '1386',
    isVideo: true,
    isPlaying: false,
    isLiked: false
  },
  {
    id: '2',
    title: '【CSS+JS】如何将网页渲染玩出高级感?',
    image: '/placeholder.svg?height=200&width=300',
    authorName: '山羊の前端小窝',
    authorAvatar: '/placeholder.svg?height=40&width=40',
    likes: '1756',
    isVideo: true,
    isPlaying: false,
    isLiked: false
  },
  {
    id: '3',
    title: '几个让人大开眼界的CSS高级技巧',
    image: '/placeholder.svg?height=200&width=300',
    authorName: '程序猿DD',
    authorAvatar: '/placeholder.svg?height=40&width=40',
    likes: '182',
    isVideo: true,
    isPlaying: false,
    isLiked: false
  },
  {
    id: '4',
    title: '分享一些前端WEB界面 后台界面设计图',
    image: '/placeholder.svg?height=200&width=300',
    authorName: '山羊AI+前端设计小乐',
    authorAvatar: '/placeholder.svg?height=40&width=40',
    likes: '470',
    isVideo: false,
    isLiked: false
  },
  {
    id: '5',
    title: '一个项目，让你拥有全网几乎所有动画效果',
    image: '/placeholder.svg?height=200&width=300',
    authorName: '程序员三千',
    authorAvatar: '/placeholder.svg?height=40&width=40',
    likes: '9656',
    isVideo: true,
    isPlaying: false,
    isLiked: false
  },
  {
    id: '6',
    title: '超炫酷的图片轮播效果！轻松实现流畅动效',
    image: '/placeholder.svg?height=200&width=300',
    authorName: '新潮达人',
    authorAvatar: '/placeholder.svg?height=40&width=40',
    likes: '643',
    isVideo: true,
    isPlaying: false,
    isLiked: false
  },
  {
    id: '7',
    title: '【CSS+GASP】这设死的高级感～炫到爆的视差感',
    image: '/placeholder.svg?height=200&width=300',
    authorName: '小鹿叮',
    authorAvatar: '/placeholder.svg?height=40&width=40',
    likes: '95',
    isVideo: false,
    isLiked: false
  },
  {
    id: '8',
    title: '前端特效大合集',
    image: '/placeholder.svg?height=200&width=300',
    authorName: 'brizer',
    authorAvatar: '/placeholder.svg?height=40&width=40',
    likes: '2448',
    isVideo: true,
    isPlaying: false,
    isLiked: false
  },
  {
    id: '9',
    title: '高级前端开发面试题，你会几道？',
    image: '/placeholder.svg?height=200&width=300',
    authorName: '一条一个momo酱',
    authorAvatar: '/placeholder.svg?height=40&width=40',
    likes: '26',
    isVideo: false,
    isLiked: false
  },
  {
    id: '10',
    title: '程序员没睡醒？5个技巧做酷炫个人网站',
    image: '/placeholder.svg?height=200&width=300',
    authorName: '数字游侠人',
    authorAvatar: '/placeholder.svg?height=40&width=40',
    likes: '2125',
    isVideo: true,
    isPlaying: false,
    isLiked: false
  }
]);

// 获取所有卡片
export function getCards() {
  return cards.value;
}

// 根据条件过滤卡片
export function filterCards(searchQuery = '', activeTab = 'all', sortType = '综合') {
  let result = [...cards.value];
  
  // 根据搜索关键词过滤
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    result = result.filter(card => 
      card.title.toLowerCase().includes(query) || 
      card.authorName.toLowerCase().includes(query)
    );
  }
  
  // 根据标签过滤
  if (activeTab === 'videos') {
    result = result.filter(card => card.isVideo);
  } else if (activeTab === 'articles') {
    result = result.filter(card => !card.isVideo);
  }
  
  // 根据排序方式排序
  if (sortType === '最新') {
    // 这里只是模拟，实际应用中应该有时间戳
    result = [...result].reverse();
  } else if (sortType === '最热') {
    result = [...result].sort((a, b) => parseInt(b.likes) - parseInt(a.likes));
  }
  
  return result;
}

// 根据ID获取卡片
export function getCardById(id) {
  return cards.value.find(card => card.id === id);
}

// 添加卡片
export function addCard(card) {
  cards.value.unshift(card);
}

// 更新卡片点赞状态
export function updateCardLike(id, isLiked, likes) {
  const index = cards.value.findIndex(card => card.id === id);
  if (index !== -1) {
    cards.value[index].isLiked = isLiked;
    cards.value[index].likes = likes;
  }
}

// 更新卡片播放状态
export function updateCardPlayingState(id, isPlaying) {
  // 先停止所有视频
  if (isPlaying) {
    cards.value.forEach(card => {
      card.isPlaying = false;
    });
  }
  
  // 更新指定卡片的播放状态
  const index = cards.value.findIndex(card => card.id === id);
  if (index !== -1) {
    cards.value[index].isPlaying = isPlaying;
  }
}

// 加载更多卡片
export function loadMoreCards() {
  // 模拟加载更多内容
  const newCards = cards.value.slice(0, 5).map(card => ({
    ...card,
    id: Date.now() + Math.random().toString(),
    title: '新内容: ' + card.title,
    likes: Math.floor(Math.random() * 1000).toString(),
    isLiked: false,
    isPlaying: false
  }));
  
  // 添加到卡片列表
  cards.value = [...cards.value, ...newCards];
  
  return newCards;
}