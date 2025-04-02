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
          position: [0, 90], // 北极点海域
          icon: 1,
          qu: "北冰洋中心区",
          nums: 7200,
        },
        {
          position: [-4.5, 80], // 斯瓦尔巴群岛海域
          icon: 2,
          qu: "北极冰缘区",
          nums: 6800,
        },
        {
          position: [-30, 65], // 格陵兰海
          icon: 3,
          qu: "北极冷水团",
          nums: 6100,
        },
        {
          position: [0, 0], // 大西洋赤道区
          icon: 4,
          qu: "赤道逆流带",
          nums: 5500,
        },
        {
          position: [-40, -45], // 南大西洋
          icon: 5,
          qu: "南大西洋暖流区",
          nums: 4900,
        },
        {
          position: [80, -60], // 南极印度洋扇区
          icon: 6,
          qu: "南极绕极流东段",
          nums: 5300,
        },
        {
          position: [-60, -65], // 威德尔海
          icon: 7,
          qu: "南极底层水形成区",
          nums: 6600,
        },
        {
          position: [165, -77], // 罗斯海
          icon: 8,
          qu: "南极磷虾富集区",
          nums: 7100,
        },
        {
          position: [-120, -68], // 阿蒙森海
          icon: 9,
          qu: "西南极冰架前沿",
          nums: 6900,
        },
        {
          position: [50, -67], // 普里兹湾
          icon: 10,
          qu: "南极陆坡流区",
          nums: 6300,
        },
        {
          position: [15, -70], // 毛德皇后地沿岸
          icon: 11,
          qu: "南极冰间湖区",
          nums: 5800,
        },
        {
          position: [-90, -62], // 南极半岛西侧
          icon: 12,
          qu: "企鹅繁殖海域",
          nums: 7400,
        },
        {
          position: [110, -66], // 戴维斯海
          icon: 13,
          qu: "南极冷水团核心",
          nums: 6700,
        },
        {
          position: [170, -76], // 罗斯冰架前沿
          icon: 14,
          qu: "冰架崩解监测区",
          nums: 7200,
        },
        {
          position: [-30, -55], // 斯科舍海
          icon: 15,
          qu: "极锋辐合带",
          nums: 6100,
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