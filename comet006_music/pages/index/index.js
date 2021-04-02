import request from '../../utils/request.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],//轮播图数据
    recommendList:[],//推荐歌单
    topList:[],//排行榜数据
  },

/**
 * 生命周期函数--监听页面加载
 */

/*1、未组件化做法
   onLoad: function (options){
      wx.request({
        url: 'http://localhost:3000/banner',
        data: {type: 2} /!*2表示iphone*!/,
        success: (res) => {
          console.log('请求成功:',res);
        },
        fail:(err) => {
          console.log('请求失败:',err);
        }
      })
   }，
*/

/*
//2、失败。 request.js拿到的数据需要返到index.js,直接通过将request拿到的结果赋值给result不成功。其中异步任务请求没有成功就返回了return值，导致返回的始终是undefined
onLoad: function (options){

  let result = request('http://localhost:3000/banner',{type:2});
  console.log('结果数据：',result)
 },
 */

//3、使用promise，并配合async,await封装数据，最终达到效果
  onLoad: async function (options) {
    let bannerListData = await request('/banner',{type:2})    //await:等待异步任务，搭配async使用,返回的是promise的实例
    this.setData({
      bannerList:bannerListData.banners
    })

    //获取推荐歌单数据
    let recommendListData = await request('/personalized?limit=10',{limit:10})
    this.setData({
      recommendList:recommendListData.result
    })

    //获取排行榜数据
    /*
    * 需求分析：
    *   1、需要根据idx的值获取对应的数据
    *   2、idx的取值范围为0-20，我们需要0-4
    *   3、需要发送5次请求
    *
    * */
    let index = 0;
    let resultArr =[];
    while (index <5){
      let topListData = await request('/top/list',{idx:index++});
      //还需要把取得的值放在自己定义的数组里{name:xxx,tracks:三个数}
      // 数组方法：splice(会修改原数组，可以对指定的数组进行增删改) slice（不会修改原数组）
      let topListItem = {name:topListData.playlist.name,tracks:topListData.playlist.tracks.slice(0,3)};
      resultArr.push(topListItem);  //将得到的数据存到resultArr
      //更新topList的状态值,放在此处更新会导致发送请求的过程页面长时间白屏，用户体验差
      this.setData({
        topList:resultArr
      })
    }
    /*//更新topList的状态值,放在此处更新会导致发送请求的过程页面长时间白屏，用户体验差
    this.setData({
      topList:resultArr
    })*/
  },

  //跳转到recommendSong页面的回调
  toRecommendSong(){
    wx.navigateTo({
      url: '/songPackage/pages/recommendSong/recommendSong'
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