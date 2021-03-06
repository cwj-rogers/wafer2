//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var qqMap = require('../../utils/qqmap-wx-jssdk.js')

var id = 1;
var qqMapSDK;
Page({
  data: {
    imgUrls: [
              'https://gdp.alicdn.com/imgextra/i4/67780177/TB2pO_WmgMPMeJjy1XbXXcwxVXa_!!67780177.jpg',
              'https://gdp.alicdn.com/imgextra/i3/67780177/TB27GnuhvBNTKJjSszbXXaFrFXa_!!67780177.jpg',
              'https://gdp.alicdn.com/imgextra/i4/67780177/TB2OwK8hvBNTKJjSszcXXbO2VXa_!!67780177.jpg',
              'https://gdp.alicdn.com/imgextra/i2/67780177/TB26uhQijihSKJjy0FeXXbJtpXa_!!67780177.jpg',
              'https://gdp.alicdn.com/imgextra/i4/67780177/TB2flzZmbsTMeJjSszhXXcGCFXa_!!67780177.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    fitnessInfo:{},
    commentData:getComList(),
    commentState:0,
    courseList:getCourses(),
    staffList: getStaffs(),
    location:{},
  },
  onLoad:function(pageOptions){
    console.log('options',pageOptions);
    var location = pageOptions.location.split(',');
    this.setData({ location: location});
    // 实例化API核心类
    qqMapSDK = new qqMap({
      key: 'O7FBZ-NOMK3-Z273F-YPX4A-ZFKOZ-HEBKR'
    });
  },
  onReady:function(){
    var location = this.data.location;
    var data = wx.getStorageSync('fitnessDetail');
    this.setData({
      fitnessInfo: data
    })
  },
  changeIndicatorDots: function (e) {
    //轮播
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    //轮播
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    //轮播
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    //轮播
    this.setData({
      duration: e.detail.value
    })
  },

  onReachBottom:function(e){
    var state = this.data.commentState;
    if(state==1){
      wx.showLoading({
        title: 'loading',
      })
      var that = this;
      setTimeout(function(){
        var data = that.data.commentData.concat(getComList());
        that.setData({
          commentData:data
        })
        wx.hideLoading();
      },1000)
    }
  },
  staffIntroduced:function (e){
    wx.navigateTo({
      url: '../staffIntro/staffIntro',
    })
  },
  showInMap: function(e){
    var data = this.data.fitnessInfo;
    wx.openLocation({
      latitude: data.location.lat,
      longitude: data.location.lng,
      scale: 18,
      name: data.title,
      address: data.ad_info.province + data.ad_info.city + data.ad_info.district + data.address,
      success: function (res) {
        // console.log(res);
      }
    })
  },
  showComment:function(){
    this.setData({
      commentState: !this.data.commentState
    })
  }
})
// 场地介绍
function getComList(){
  var  data = [];
  var word = "色彩从当代建筑、路标、人行横道以及运动场馆中获取灵感，由此引发出大胆的颜色表达激活了色彩，与单调乏味的周边环境形成鲜明的对比。强调大胆的阴影和高光。引出意想不到且充满活力的颜色。调色板以一些基础色为基准，通过填充光谱来为Android、Web 和 iOS 环境提供一套完整可用的颜色。基础色的饱和度是 500。";
  var images = ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1238230017,401697596&fm=27&gp=0.jpg', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1144323510,3505414405&fm=27&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4240200847,3042528776&fm=27&gp=0.jpg', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2045902294,488115984&fm=27&gp=0.jpg', 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3807064336,2594442662&fm=27&gp=0.jpg', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=704125818,1642270018&fm=27&gp=0.jpg'];
  for(var i=0; i<5; i++){
    var num = parseInt(Math.random()*(word.length-3));
    var name = word.substr(num,3);
    var time = util.formatTime(new Date());
    var comment = '';
    var num2 = parseInt(Math.random() * 10 + 3);
    for (var j = 0; j < num2; j++){
      var num2 = parseInt(Math.random() * (word.length - 5));
      comment = comment.concat(word.substr(num2,5));
    }
    var imagesKey = parseInt(Math.random() * images.length);
    var item = {id:id, img: "", name: name, comment: comment, date: time, images:images[imagesKey] };
    data.push(item);
    id++;
  }
  return data;
}
// 获取课程
function getCourses(){
  var classes = ["普拉提","蜜桃臀练成","腹肌大爆炸","HipHop舞蹈","燃脂搏击","胸背力量","Zumba","尊巴","踏板操","瑜伽","莱美杠铃操","TABATA冲击","腹肌撕裂","高能燃脂","有氧搏击操"];
  var weekday = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  var data = [];
  var num = parseInt(Math.random()*7+3);
  for(var i=0;i<num;i++){
    var foo = (function(){
      var start = parseInt(Math.random()*6);
      var end = start + parseInt(Math.random() * 3+1);
      var classKey = parseInt(Math.random() * classes.length);
      var timeline = weekday.slice(start, end);
      timeline = timeline.join(',');
      data.push({name:classes[classKey],weekday:timeline})
    });
    foo();
  }
  return data;
}
// 获取员工列表
function getStaffs(){
  var names = ["lisa", "Mary", "Lucy", "Jack", "Rogers", "Cwjackk", "Zumba", "Amaze", "Terry", "Tonymi", "David", "Alisha", "Curry", "Tracy"];
  var professional = ["普拉提教练", "蜜桃臀练成教练", "腹肌大爆炸教练", "HipHop舞蹈教练", "燃脂搏击教练", "胸背力量教练", "Zumba教练", "尊巴教练", "踏板操教练", "瑜伽教练"];
  var images = ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1238230017,401697596&fm=27&gp=0.jpg', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1144323510,3505414405&fm=27&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4240200847,3042528776&fm=27&gp=0.jpg', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2045902294,488115984&fm=27&gp=0.jpg', 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3807064336,2594442662&fm=27&gp=0.jpg','https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=704125818,1642270018&fm=27&gp=0.jpg'];
  var data = [];
  var num = parseInt(Math.random() * 7 + 3);
  for (var i = 0; i < num; i++) {
      var namesKey = parseInt(Math.random() * names.length);
      var professionalKey = parseInt(Math.random() * professional.length);
      var imagesKey = parseInt(Math.random() * images.length);
      data.push({ name: names[namesKey], professional: professional[professionalKey],images:images[imagesKey] })
  }
  // console.log(data);
  return data;
}