var qqMap = require("../../utils/qqmap-wx-jssdk.js");
var id = 1;
var qqMapSDK;//qq地图实例
var pageIndex = 1;
Page({
  data:{
    msg:"hello world",
    requestResult:[],
    id:1,
    requestEnd:0
  },
  onLoad: function () {
    // 实例化API核心类
    qqMapSDK = new qqMap({
      key: 'O7FBZ-NOMK3-Z273F-YPX4A-ZFKOZ-HEBKR'
    });
    wx.removeStorageSync('gymListCache');
    this.searchCacheModule({});
  },
  onShow: function () {
        
  },
  onPullDownRefresh:function(e){
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function(){
      that.setData({
        requestResult:getData(5)
      })
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    },1500)
  },
  onReachBottom:function(){
    //加载更多
    wx.showLoading({
      title: '加载中',
    });
    // 走缓存模块,获取数据
    this.searchCacheModule();
    wx.hideLoading();
  },
  searchCacheModule:function(){
    //提示没有更多数据
    if(this.data.requestEnd==1){
      wx.showToast({
        title: '没有更多!',
        icon: "none"
      })
      return;
    }

    var list = wx.getStorageSync('gymListCache');
    console.log(list);
    if(list.length>0){
      //缓存中还有数据
      var item5 = list.splice(0,5);
      wx.setStorageSync('gymListCache', list);
      //插入新数据
      var list = item5.length > 0 ? this.data.requestResult.concat(item5) : this.data.requestResult;
      console.log('reachBottom', list);
      this.setData({
        requestResult: list
      })
    }else{
      //发起新的请求
      var that = this;
      qqMapSDK.search({
        keyword: "健身房",
        page_size: 20,
        page_index: pageIndex,
        address_format: 'short',
        success: function (res) {
          pageIndex++;
          if (res.data.length <= 0) {
            wx.showToast({
              title: '没有更多!',
              icon: "none"
            })
            that.setData({requestEnd:1});
          }
          console.log(pageIndex, res);
          //处理获取的数据
          var list = res.data;
          for (var i = 0; i < list.length; i++) {
            var distance = list[i]._distance;
            distance = distance >= 1000 ? (distance / 1000).toFixed(1) + "km" : distance + "m";
            list[i].distance = distance
          }
          //取出5条数据
          var item5 = list.splice(0, 5);
          //剩余的15条放缓存
          wx.setStorageSync('gymListCache', list);
          //插入数据
          var list = item5.length > 0 ? that.data.requestResult.concat(item5) : that.data.requestResult;
          that.setData({
            requestResult: list
          })
        }
      })
    }
  },
  gymDetail: function (e) {
    var key = e.currentTarget.dataset.key;
    var location = e.currentTarget.dataset.location;
    var data = this.data.requestResult[key];
    console.log(key,data);
    if (!data){
      return;
    }
    wx.setStorageSync('fitnessDetail', data);
    wx.navigateTo({
      url: '../fitness/fitness?location=' + location
    })
  },
  smartOrder:function(){
    //智能排序
    
  },
  nearest: function(){
    wx.showLoading({
      title: 'loading',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    var data = this.data.requestResult;
    var sortData;
    for(var i=0;i<data.length;i++){
      for(var j=i+1;j<data.length;j++){
        if (data[i]._distance > data[j]._distance) {
          var mid = data[i];
          data[i] = data[j];
          data[j] = mid;
        }
      }
    }
    console.log(data);
    var that = this;
    setTimeout(function(){
      wx.hideLoading();
      that.setData({
        requestResult:data
      });
    },1000)
  }
})

//模拟数据
function getData(time){
  var gyms = ["领尚健身俱乐部", "宝力来健身俱乐部(铂金店)", "君健运动健身俱乐部", "巴厘星空健身俱乐部", "美力传说健身俱乐部", "万达广场古德菲力健身俱乐部","杰菲健身俱乐部(陈村店)"];
  var tags = ["wifi","停车场","健身餐","环境好","器材齐全","帅哥美女多","课程丰富","教练nice","设施破旧","人多器材少","上课质量差","推销多","会员太贵","停车不方便"];
  var addrs = ["佛山市顺德区大良新城祥和路兴顺路路口嘉信城市广场F3", "广佛路和华环球贸易广场2层A73", "南海区城市广场C座B区3楼", "三水区广海大道中52号","机场路17号华南国际医疗器材产业中心1栋1201"];
  var data = [];
  for(var i=0;i<time;i++){
    id++;
    var gym = gyms[parseInt(Math.random()*(gyms.length) )];
    var addr = addrs[parseInt(Math.random() * (addrs.length))];
    var dist = parseInt(Math.random()*10000+100,10);
    dist = dist>=1000? Math.round(dist/100)*100:dist;
    var tag = [];
    for (var t = 0; t < parseInt(Math.random() * 10);t++){
        tag.push(tags[parseInt(Math.random()*tags.length)]);
    }

    data.push({ id: id, distance: dist, gymName: gym, tags: tag, addr: addr, img: ""});
  }
  // console.log(data);
  return data;
}