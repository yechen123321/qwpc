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
          position: [8.4807, -13.2372], // 塞拉利昂
          icon: 1,
          qu: "塞拉利昂原始森林",
          nums: 1200,
        },
        {
          position: [6.3077, -10.7985], // 利比里亚
          icon: 2,
          qu: "利比里亚森林",
          nums: 1500,
        },
        {
          position: [7.9465, -5.2931], // 科特迪瓦
          icon: 3,
          qu: "科特迪瓦森林",
          nums: 1800,
        },
        {
          position: [5.6058, -0.1866], // 加纳
          icon: 4,
          qu: "加纳森林",
          nums: 1300,
        },
        {
          position: [9.6409, -13.5769], // 几内亚
          icon: 5,
          qu: "几内亚森林",
          nums: 1400,
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