const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const user = require('../../../services/user.js');
const app = getApp();

Page({
  data: {
    userInfo: {},
    showLoginDialog: false,
    showLogoutDialog:false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {

  },
  onShow: function () {
   // debugger;
    this.setData({
      userInfo: app.globalData.userInfo,
    });
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },

  onUserInfoClick: function () {
    //debugger;
    if (this.data.userInfo.u_id) {
      this.exitLogin();
    } else {
      this.showLoginDialog();
    }
  },

  showLoginDialog() {
    this.setData({
      showLoginDialog: true
    })
  },

  showLogoutDialog() {
    this.setData({
      showLogoutDialog: true
    })
  },

  onCloseLoginDialog() {
    this.setData({
      showLoginDialog: false
    })
  },

  onCloseLogoutDialog() {
    this.setData({
      showLogoutDialog: false
    })
  },

  onDialogBody() {
    // 阻止冒泡
  },

  onLogin() {
   // debugger;
    wx.redirectTo({
      url: '/pages/auth/login/login',
    })
  },


  onRegister(){
    wx.redirectTo({
      url: '/pages/auth/register/register',
    })
  },

  onOrderInfoClick: function (event) {
    wx.navigateTo({
      url: '/pages/ucenter/order/order',
    })
  },

  onSectionItemClick: function (event) {

  },

  // TODO 移到个人信息页面
  exitLogin: function () {
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('sessionid');
          wx.removeStorageSync('userInfo');
          app.globalData.userInfo = {//用户信息
            u_nickname: '点击登录',
            avatar: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
          };
          app.globalData.sessionid='';
          app.globalData.userLogged=false;
          wx.switchTab({
            url: '/pages/index/index'
          });
        }
      }
    })

  }
})