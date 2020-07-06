/**
 * 用户相关服务
 */
const util = require('../utils/util.js');
const api = require('../config/api.js');

const app=getApp();

/**
 * 判断用户是否登录
 */
function checkLogin(){
  if (!app.globalData.userLogged){//尚未登录
    wx.redirectTo({
      url: '/pages/auth/login/login',
    })
  }
}

 function Login(data){
  // debugger;
  util.post(api.LoginUrl,data).then(
    res=>{
     // debugger;
      if(res.data.status=='0'){
        app.globalData.userLogged=true;//确定登录状态
   
        app.globalData.userInfo=res.data.datas;
        wx.setStorageSync("sessionid", res.header["Set-Cookie"]); //存储cookie
        wx.setStorageSync("userInfo", res.data.datas);
        wx.switchTab({
          url: '/pages/index/index',
        })
      }else{
        wx.showModal({
          title: '错误信息',
          content:res.data.info?res.data.info:"账号或密码错误",
          showCancel: false
        });
      }
    }
  )
}

module.exports={
  checkLogin,
  Login
}