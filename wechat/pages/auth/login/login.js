// pages/auth/login/login.js
const service=require("../../../services/user.js");
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:"",
    errorMessage:""
  },
  bindUsernameInput:function(event){
    this.setData({username:event.detail.value})
  },
  bindPasswordInput: function (event) {
    this.setData({
      password: event.detail.value
    });
  },
  clearInput: function (e) {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: ''
        });
        break;
      case 'clear-password':
        this.setData({
          password: ''
        });
        break;
      case 'clear-code':
        this.setData({
          code: ''
        });
        break;
    }
  },
  Login:function(){
    var that=this;
    if (that.data.password.length < 1 || that.data.username.length < 1){
      wx.showModal({
        title: '错误信息',
        content: '请输入用户名和密码',
        showCancel: false
      });
      return false;
    }
   
    let data={
      u_name:that.data.username,
      u_password:that.data.password
    };
    service.Login(JSON.stringify(data));
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
})
