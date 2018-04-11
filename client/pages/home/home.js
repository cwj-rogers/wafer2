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
  },
  onPullDownRefresh: function(e){
    console.log("下拉刷新");
    // wx.startPullDownRefresh();
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  onReachBottom: function(){
    wx.showLoading({
      title: 'loading',
      mask:true
    });
    var data = this.data.requestResult;
    var data2 = data.concat(data);
    var that = this;
    setTimeout(function(){
      that.setData({
        requestResult:data2
      });
      wx.hideLoading();
    },3000);
    console.log(data2);
    console.log("加载更多");
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
    var showActData = this.data.requestResult[index].activities;
    this.data.requestResult[index].activities = showActData.concat(showActData);
    this.setData({
      requestResult: this.data.requestResult
    })
    console.log(this.data.requestResult);
  }
})

//获取格式化时间数据
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
    { id: 110, name: "嘉州健身训练中心", distance: "100", activities: [{actId:1,actName: "有氧健身操", room: "瑜伽大教室", time: "14:00-15:00", joinNum: 1 }, { actName: "有氧健身操",room: "瑜伽大教室2", time: "14:00-15:00", joinNum: 5}]},
    { id: 112, name: "蜂狂运动中心", distance: "1500", activities: [{actId:2,actName: "有氧健身操", room: "蜂狂大教室", time: "17:00-19:00", joinNum: 25 }, { actName: "有氧健身操",room: "蜂狂大教室2", time: "14:00-15:00", joinNum: 33 }] },
    { id: 113, name: "燃爆点训练中心", distance: "2800", activities: [{ actId: 3,actName: "有氧健身操", room: "爆点大教室", time: "21:00-22:00", joinNum: 35 }, { actName: "有氧健身操",room: "爆点大教室2", time: "14:00-15:00", joinNum: 22 }] }
  ];
  return data;
}
