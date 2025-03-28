// 模拟数据模块 (mockData.js)
export const mockPoints = [
    {
      id: 'WH001',
      name: '芜湖方特旅游区',
      position: [118.407526, 31.345472], // 精确坐标
      type: 'theme_park',
      description: '亚洲规模较大的高科技主题公园，包含多个主题园区',
      properties: {
        rating: 4.8,
        contact: '0553-5889988',
        opening: '09:00-17:30',
        area: '48万平方米'
      },
      events: [
        {
          id: 'EV202404001',
          title: '春日环保嘉年华',
          date: '2024-04-20 至 2024-05-05',
          time: '每天10:00-20:00',
          content: '包含废旧物品艺术创作、环保知识竞赛等系列活动',
          organizer: '芜湖市文旅局',
          registration: 'https://www.example.com/event1'
        }
      ],
      images: [
        'https://picsum.photos/400/300?theme-park',
        'https://picsum.photos/400/300?amusement'
      ],
      tags: ['主题乐园', '亲子活动', '环保教育']
    },
    {
      id: 'WH002',
      name: '镜湖公园',
      position: [118.380793, 31.333419], // 镜湖精确坐标
      type: 'park',
      description: '芜湖市中心天然湖泊公园，城市生态绿肺',
      properties: {
        rating: 4.6,
        area: '230公顷',
        ecosystem: '水域生态系统示范区'
      },
      events: [
        {
          id: 'EV202404002',
          title: '湿地保护科普展',
          date: '2024-04-22 至 2024-04-28',
          time: '09:00-17:00',
          content: '展示长江流域湿地生态保护成果',
          organizer: '芜湖市环保局'
        }
      ],
      images: [
        'https://picsum.photos/400/300?lake',
        'https://picsum.photos/400/300?wetland'
      ],
      tags: ['城市公园', '生态保护', '科普教育']
    },
    {
      id: 'WH003',
      name: '鸠兹古镇',
      position: [118.429165, 31.332805], // 古镇精确坐标
      type: 'cultural',
      description: '徽商文化发源地，国家4A级旅游景区',
      properties: {
        builtYear: 2016,
        architectureStyle: '徽派建筑',
        culturalRelics: 120
      },
      events: [
        {
          id: 'EV202404003',
          title: '传统手工艺体验日',
          date: '2024-04-27',
          time: '13:30-16:00',
          content: '竹编/木雕非遗技艺现场教学',
          quota: 30,
          fee: '免费'
        }
      ],
      images: [
        'https://picsum.photos/400/300?ancient-town',
        'https://picsum.photos/400/300?architecture'
      ],
      tags: ['文化遗产', '非遗体验', '历史教育']
    },
    // 更多模拟点位...
    {
      id: 'WH010',
      name: '芜湖市科技馆',
      position: [118.391702, 31.318572], // 科技馆坐标
      type: 'museum',
      description: '国家二级科技馆，常设生态科技主题展区',
      properties: {
        openDays: '周二至周日',
        exhibitionArea: '1.2万㎡',
        specialExhibit: '长江生态保护专题展'
      },
      events: [
        {
          id: 'EV202404010',
          title: 'AI环保创意大赛',
          date: '2024-04-25 至 2024-05-10',
          content: '青少年人工智能环保解决方案竞赛',
          ageLimit: '12-18岁',
          prize: '一等奖：科技创新基金5000元'
        }
      ],
      images: [
        'https://picsum.photos/400/300?science',
        'https://picsum.photos/400/300?technology'
      ],
      tags: ['科技教育', '创新竞赛', '环保科技']
    }
  ]
  
  // 模拟用户定位数据
  export const mockUserLocation = {
    enable: true,
    position: [118.393258, 31.322512], // 芜湖市中心坐标
    address: '安徽省芜湖市镜湖区北京中路',
    timestamp: new Date().getTime()
  }
  
  // 模拟交通数据
  export const mockTrafficData = {
    lastUpdate: '2024-04-15 09:30:00',
    routes: {
      WH001: {
        driving: {
          distance: '8.5公里',
          duration: '25分钟',
          toll: 0,
          congestion: '畅通'
        },
        transit: {
          lines: ['轨道交通2号线', '公交15路'],
          duration: '40分钟',
          fare: '6元'
        }
      }
    }
  }