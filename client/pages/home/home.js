//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
      userInfo: {},
      logged: false,
      takeSession: false,
      requestResult: getListData(),
      month: getMonth(),
      weekDate: getWeekDate(),
      selectedIndex: 0,
      clickedItem:{}
  },
  onPullDownRefresh: function(e){
    console.log("下拉刷新");
    // wx.startPullDownRefresh();
    wx.showNavigationBarLoading() //在标题栏中显示加载

    var that = this;
    setTimeout(function () {
      // complete
      that.setData({
        requestResult: getListData()
      })
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },
  onReachBottom: function(){
    console.log("加载更多");
    wx.showLoading({
      title: 'loading',
      mask:true
    });
    var data = getListData();
    for(var i=0;i<data.length;i++){
      data[i].id = parseInt(Math.random()*899+100);
    }
    var data2 = this.data.requestResult.concat(data);
    var that = this;
    setTimeout(function(){
      that.setData({
        requestResult:data2
      });
      wx.hideLoading();
    },1500);
  },
  joinAct:function(e){
    console.log("参加");
  },
  actExplode: function(e){
    console.log("活动性情");
  },
  joinNumExp:function(e){
    console.log("参加用户说明");
  },
  staffIntroduced: function (e) {
    wx.navigateTo({
      url: '../staffIntro/staffIntro',
    })
  },
  gymDetail: function () {
    wx.navigateTo({
      url: '../fitness/fitness'
    })
  },
  dateButtonTap: function(e){
    // console.log(e);
    var index = e.currentTarget.dataset.index;
    this.setData({
      selectedIndex: index,
    });
  },
  showAllAct: function(e){
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var oldActData, newActData2;
    oldActData = this.data.requestResult[index].activities;
    
    var rand = parseInt(Math.random()*3);
    newActData2 = getListData()[rand].activities;
    for (var i = 0; i < newActData2.length; i++){
      newActData2[i].actId = parseInt(Math.random() * 899 + 100, 10);
    }
    this.data.requestResult[index].activities = oldActData.concat(newActData2);
    this.data.clickedItem[id] = 1 ;
    this.setData({
      requestResult: this.data.requestResult,
      clickedItem: this.data.clickedItem
    })
    console.log(this.data);
  },
  chooseDate:function(){
    //选择课程表日期
    wx.showLoading({
      title: 'loading',
    })
    var that = this;
    var data = getListData();
    var num = parseInt(Math.random()*3+1);
    for(var i=0;i<num;i++){
      var item = data.pop();
      data.unshift(item);
    }
    setTimeout(function(){
      that.setData({
        requestResult: data
      })
      wx.hideLoading();
    },500)
  }
})

//日期列表获取时间数据
function getWeekDate(){
  var date = new Date();
  var data = [{ },{ },{ },{ },{ },{ },{ }];
  var week = date.getDay();
  for(var i=0;i<data.length;i++){
    var key = week+i>6? week+i-7:week+i;
    data[i].week = ["日", "一", "二", "三", "四", "五", "六"][key];
    data[i].day = getDay(i)+"号";
  }
  return data;
}
//获取未来7天日期
function getDay(day) {
  var today = new Date();

  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds); //注意，这行是关键代码  
  return today.getDate();
}    
//获取月份
function getMonth(){
  var month = (new Date().getMonth()+1)+"月";
  return month.toString();
}
//获取列表数据
function getListData(){
  var data = [
    { id: 110, name: "嘉州健身训练中心", distance: "100", activities: [{actId:1,actName: "有氧健身操", room: "瑜伽大教室", time: "14:00-15:00", joinNum: 1 }, { actName: "瑜伽拉筋舒展训练",room: "瑜伽大教室2", time: "14:00-15:00", joinNum: 5}]},
    { id: 111, name: "蜂狂运动中心", distance: "1500", activities: [{actId:2,actName: "TR悬挂训练", room: "蜂狂大教室", time: "17:00-19:00", joinNum: 25 }, { actName: "森吧有氧健身操",room: "蜂狂大教室2", time: "14:00-15:00", joinNum: 33 }] },
    { id: 112, name: "燃爆点训练中心", distance: "2800", activities: [{ actId: 3,actName: "HIIT有氧减脂训练营", room: "爆点大教室", time: "21:00-22:00", joinNum: 35 }, { actName: "HipHop风格舞蹈课堂",room: "爆点大教室2", time: "14:00-15:00", joinNum: 22 }] }
  ];
  return data;
}
