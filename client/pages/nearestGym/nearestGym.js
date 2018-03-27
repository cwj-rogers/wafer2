Page({
  data:{
    msg:"hello world"
  },
  gymDetail: function(){
    wx.navigateTo({
      url: '../fitness/fitness'
    })
  }
})