import request from '../../utils/request'

let startY = 0;//手指起始的坐标
let moveY = 0;//手指移动的坐标
let moveDistance = 0;//手指移动的距离

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform:'translateY(0)',
    coverTransition:'',
    userInfo:{}, //用户信息
    recentPlayList:[]   //用户播放记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载用户信息
    let userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      //更新userInfo的状态
      this.setData({
        userInfo:JSON.parse(userInfo)
      })

      //获取用户播放记录
      this.getUserRecentPlayList(this.data.userInfo.userId)
    }
  },

  //获取用户的播放记录的功能函数
  async getUserRecentPlayList(userId){
    let recentPlayListData = await request('/user/record',{uid: userId,type: 0});
    //因为allData中没有唯一的元素，wx:key无法设置，这里给allData中添加一个id属性
    let index = 0;
    //map对数组进行加工
    let recentPlayList = recentPlayListData.allData.splice(0,10).map(item => {
      item.id = index++;//拿十条播放记录,并为他们挨个添加id属性
      return item;
    })
    this.setData({
      recentPlayList:recentPlayList
    })
  },

  //手指移动设置
  handleTouchStart(event){
    this.setData({
      coverTransition:''//取消移动时的过渡效果
    })
    //获取手指起始坐标
    startY = event.touches[0].clientY;//通过touches方法，得到第一个触摸的手指的坐标
  },
  //移动手指
  handleTouchMove(event){
    moveY = event.touches[0].clientY;
    moveDistance = moveY - startY;

    if(moveDistance <= 0){
      return;
    }
    if(moveDistance >= 80){
      moveDistance = 80;
    }
    //动态更新coverTransform的状态值
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`//es6,要用``而不是''
    })
  },
  //松开手指
  handleTouchEnd(){
    this.setData({
      coverTransform: `translateY(0rpx)`,
      coverTransition: 'transform 0.5s linear'//添加回弹的过渡效果
    })
  },

  //跳转至登录login页面的回调
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})