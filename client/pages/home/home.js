//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
      userInfo: {},
      logged: false,
      takeSession: false,
      requestResult: '',
      month: getMonth(),
      weekDate: getWeekDate(),
      selectedIndex: 0,
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