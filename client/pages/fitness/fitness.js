//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var id = 1;
Page({
  data: {
    imgUrls: [
              'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
              'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
              'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    commentData:getComList(),
    commentState:0,
    courseList:getCourses(),
    staffList: getStaffs()
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
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
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 18,
          name: "蜂狂运动中心",
          address: "南庄正吉利广场五楼斯蒂芬李会计",
          success:function(res){
            console.log(res);
          }
        })
      }
    })
    console.log(1);
  },
  showComment:function(){
    this.setData({
      commentState: !this.data.commentState
    })
  }
})
function getComList(){
  var  data = [];
  var word = "色彩从当代建筑、路标、人行横道以及运动场馆中获取灵感，由此引发出大胆的颜色表达激活了色彩，与单调乏味的周边环境形成鲜明的对比。强调大胆的阴影和高光。引出意想不到且充满活力的颜色。调色板以一些基础色为基准，通过填充光谱来为Android、Web 和 iOS 环境提供一套完整可用的颜色。基础色的饱和度是 500。";
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
    var item = {id:id, img: "", name: name, comment: comment, date: time };
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
  var data = [];
  var num = parseInt(Math.random() * 7 + 3);
  for (var i = 0; i < num; i++) {
      var namesKey = parseInt(Math.random() * names.length);
      var professionalKey = parseInt(Math.random() * professional.length);
      data.push({ name: names[namesKey], professional: professional[professionalKey] })
  }
  console.log(data);
  return data;
}