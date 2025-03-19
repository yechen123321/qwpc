<template>
  <div class="box xian-map">
    <div id="container"></div>
  </div>
</template>

  <script>
export default {
  data() {
    return {
      currentMap: null,
      mapList: [
        {
          position: [2.3522, 48.8566], // Paris, France
          icon: 1,
          qu: "巴黎地区",
          nums: 6500,
        },
        {
          position: [-73.935242, 40.73061], // New York City, USA
          icon: 2,
          qu: "纽约市",
          nums: 5800,
        },
        {
          position: [139.6503, 35.6762], // Tokyo, Japan
          icon: 3,
          qu: "东京地区",
          nums: 5200,
        },
        {
          position: [151.2093, -33.8688], // Sydney, Australia
          icon: 4,
          qu: "悉尼地区",
          nums: 3400,
        },
        {
          position: [31.2357, 30.0444], // Cairo, Egypt
          icon: 5,
          qu: "开罗地区",
          nums: 3800,
        },
        {
          position: [-0.1278, 51.5074], // London, UK
          icon: 6,
          qu: "伦敦地区",
          nums: 4200,
        },
        {
          position: [116.4074, 39.9042], // Beijing, China
          icon: 7,
          qu: "北京市",
          nums: 6000,
        },
        {
          position: [-43.1729, -22.9068], // Rio de Janeiro, Brazil
          icon: 8,
          qu: "里约热内卢地区",
          nums: 3100,
        },
        {
          position: [77.1025, 28.7041], // Delhi, India
          icon: 9,
          qu: "德里地区",
          nums: 4500,
        },
        {
          position: [37.6173, 55.7558], // Moscow, Russia
          icon: 10,
          qu: "莫斯科地区",
          nums: 2900,
        },
        {
          position: [12.4964, 41.9028], // Rome, Italy
          icon: 11,
          qu: "罗马地区",
          nums: 4000,
        },
        {
          position: [-122.4194, 37.7749], // San Francisco, USA
          icon: 12,
          qu: "旧金山地区",
          nums: 3200,
        },
        {
          position: [135.5023, 34.6937], // Osaka, Japan
          icon: 13,
          qu: "大阪地区",
          nums: 2800,
        },
        {
          position: [36.8219, -1.2864], // Nairobi, Kenya
          icon: 14,
          qu: "内罗毕地区",
          nums: 2200,
        },
        {
          position: [18.4241, -33.9249], // Cape Town, South Africa
          icon: 15,
          qu: "开普敦地区",
          nums: 2500,
        },
        {
          position: [-99.1332, 19.4326], // Mexico City, Mexico
          icon: 16,
          qu: "墨西哥城地区",
          nums: 3700,
        },
        {
          position: [100.5018, 13.7563], // Bangkok, Thailand
          icon: 17,
          qu: "曼谷地区",
          nums: 3900,
        },
        {
          position: [55.2708, 25.2048], // Dubai, UAE
          icon: 18,
          qu: "迪拜地区",
          nums: 4300,
        },
        {
          position: [114.0579, 22.5431], // Hong Kong, China
          icon: 19,
          qu: "香港特别行政区",
          nums: 4800,
        },
        {
          position: [-79.3832, 43.6532], // Toronto, Canada
          icon: 20,
          qu: "多伦多地区",
          nums: 3000,
        },
      ],
    };
  },
  mounted() {
    setTimeout(() => {
      this.initMap();
    }, 300);
  },
  methods: {
    initMap() {
      var map = new AMap.Map("container", {
        // center: [108.939645, 34.314207], //西安未央路
        center: [160.141409, -45.319025], 
        // layers: [new AMap.TileLayer.Satellite(),new AMap.TileLayer.RoadNet()],
        layers: [],
        mapStyle: "amap://styles/659e7a0818b4892e919457b29948695c",
        zoom: 1,
      });
      this.currentMap = map;

      var heatmap;
      var points = this.mapList.map((item) => ({
        lng: item.position[0],
        lat: item.position[1],
        count: item.nums, // Scale down for heat map intensity
      }));

      map.plugin(["AMap.HeatMap"], function () {
        //加载热力图插件
        //在地图对象叠加热力图
        heatmap = new AMap.HeatMap(map, {
          radius: 100, // 热力图中单个点的半径，默认：30，单位：pixel
          opacity: [0, 0.8], // 热力图透明度数组，取值范围[0,1]，0表示完全透明，1表示不透明，默认：[0,1]
          // 热力图的渐变区间，热力图按照设置的颜色及间隔显示热力图
          gradient: {
            0.5: "blue",
            0.65: "rgb(117,211,248)",
            0.7: "rgb(0, 255, 0)",
            0.9: "#ffea00",
            1.0: "red",
          },
        });
        heatmap.setDataSet({ data: points, max: 100 }); //设置热力图数据集
      });

      var infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(0, -40),
      });

      for (var i = 0; i < this.mapList.length; i += 1) {
        var center = this.mapList[i].position;
        // 根据nums的大小添加不同颜色及大小的圆
        if (this.mapList[i].nums > 500) {
          var circleRadius = 25;
          var circleColr = "";
        } else if (this.mapList[i].nums > 400 && this.mapList[i].nums <= 500) {
          var circleRadius = 22;
          var circleColr = "";
        } else if (this.mapList[i].nums > 300 && this.mapList[i].nums <= 400) {
          var circleRadius = 19;
          var circleColr = "";
        } else if (this.mapList[i].nums > 200 && this.mapList[i].nums <= 300) {
          var circleRadius = 16;
          var circleColr = "";
        } else if (this.mapList[i].nums > 100 && this.mapList[i].nums <= 200) {
          var circleRadius = 13;
          var circleColr = "";
        } else if (this.mapList[i].nums > 50 && this.mapList[i].nums <= 100) {
          var circleRadius = 10;
          var circleColr = "";
        } else if (this.mapList[i].nums > 0 && this.mapList[i].nums <= 50) {
          var circleRadius = 7;
          var circleColr = "";
        }

        // 将圆点标记添加到地图上
        var circleMarker = new AMap.CircleMarker({
          center: center,
          radius: circleRadius, //3D视图下，CircleMarker半径不要超过64px
          strokeColor: circleColr,
          strokeWeight: 2,
          strokeOpacity: 0.5,
          // fillColor:circleColr,
          fillColor: "rgba(0,0,0, 0.1)",
          fillOpacity: 0.5,
          zIndex: 10,
          bubble: true,
          cursor: "pointer",
          clickable: true,
        });
        circleMarker.setMap(map);

        //信息窗体内容及点击事件
        circleMarker.content = `<div class="info_yuanjiao">
                      <div class="quyuName">${this.mapList[i].qu}</div>
                      <div class="num">
                          <div class="icn"></div>
                          <div class="label">流入人员：</div>
                          <div class="value">${this.mapList[i].nums}</div>
                      </div>
                  </div>`;
        //鼠标点击marker弹出自定义的信息窗体
        circleMarker.on("click", markerClick);
      }
      function markerClick(e) {
        infoWindow.setContent(e.target.content);
        infoWindow.open(map, e.target.getCenter());
      }
    },
    // 放大
    setBigView() {
      this.currentMap.zoomIn();
    },
    // 缩小
    setSmallView() {
      this.currentMap.zoomOut();
    },
  },
  components: {},
  beforeDestroy() {},
};
</script>
  <style lang=scss scoped>
#container {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}
</style>