//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
      userInfo: {},
      logged: false,
      takeSession: false,
      requestResult: ''
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
  }
})
