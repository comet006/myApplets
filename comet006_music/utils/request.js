//发送ajax请求
/*
* 1、封装功能函数
*   1、功能点明确
*   2、函数内部应该保留固定代码（静态的
*   3、将动态的数据抽取成形参，由使用者根据自身的情况动态的传入实参
*   4、一个良好的功能函数应该设置形参的默认值(es6的形参默认值)
*  2、封装功能组件
*   1、功能点明确
*   2、函数内部应该保留固定代码（静态的
*   3、将动态的数据抽取成props形参，由使用者根据自身的情况以标签属性的形式动态的传入props数据
*   4、一个良好的组件应该设置组件的必要性及数据类型
*     props:{
*       msg:{
*         required:true,
*         default:默认值,
*         type:Sting
*       }
*     }
* */

import config from './config.js'//引入专门用来配置服务器的js

export default  (url,data={},method='GET') => {

  /*2、失败.request.js拿到的数据需要返到index.js*/
  /*
  let result;
  wx.request({
    url,
    data,
    method,
    success: (res) => {
      console.log('请求成功:',res);
      result = res;
    },
    fail:(err) => {
      console.log('请求失败:',err);
    }
  })
  return result; //结果undefined
  */ //拿到的结果在request.js中，不是想要的

  return new Promise((resolve,reject) => {    //
    //1.new Promise初始Promise实例的状态为pending
    wx.request({
      url: config.host+ url,
      //url: config.mobileHost+ url,
      data,
      method,
      header: {
        cookie: wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1):''//返回包含MUSIC_U的下标
      },
      success: (res) => {
        //console.log('请求成功:', res);
        if(data.isLogin){//登录请求
          //将用户的cookie存入至本地
          wx.setStorage({
            key: 'cookies',
            data:res.cookies
          })
        }
        resolve(res.data);//修改Promise为成功状态resolved，返回res.data
      },
      fail:(err) => {
        //console.log('请求失败:',err);
        reject(err);//修改Promise为失败状态rejected
      }
    })
  })
}