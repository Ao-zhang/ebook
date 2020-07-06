// pages/bookdetail/bookdetail.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    b_id:0,
    bookinfo:{},
    relatedBook:[],
    cartnum:0,
    number: 1,
    openAttr: false,
    checkedSpecText: '请选择规格数量',
    noCollectImage: "/static/images/icon_collect.png",
    hasCollectImage: "/static/images/icon_collect_checked.png",
    collectBackImage: "/static/images/icon_collect.png"
  },
  switchAttrPop: function () {
    if (this.data.openAttr == false) {
      this.setData({
        openAttr: !this.data.openAttr
      });
    }
  },
  closeAttr: function () {
    this.setData({
      openAttr: false,
    });
  },

  getBookInfo:function(){
    let that=this;
    util.post(api.GetABookUrl,{b_id:that.data.b_id}).then
    ((res)=>{
  
      that.setData({
        bookinfo:res.data
      });
    });
  },


  changeSpecInfo: function () {
    let checkedNameValue = this.getCheckedSpecValue();

    //设置选择的信息
    let checkedValue = checkedNameValue.filter(function (v) {
      if (v.valueId != 0) {
        return true;
      } else {
        return false;
      }
    }).map(function (v) {
      return v.valueText;
    });
    if (checkedValue.length > 0) {
      this.setData({
        'checkedSpecText': checkedValue.join('　')
      });
    } else {
      this.setData({
        'checkedSpecText': '请选择规格数量'
      });
    }

  },

  openCartpage:function(){
    wx.switchTab({
      url: '/pages/cart/cart',
    });
  },

  addToCart:function(){
    /*let userInfo=app.globalData.userInfo;
    let cart =userInfo.carts;*/
    let userInfo=wx.getStorageSync('userInfo');
    let cart =userInfo.carts;
    let b_id=this.data.bookinfo.b_id;
    let index=-1;
    for(let i=0;i<cart.length;i++){
      if(cart[i].b_id==b_id){
        index=i;break;
      }
    }
    if(index==-1){
      let item={u_id:userInfo.u_id,b_id:b_id,book_num:this.data.number};
      cart.push(item);
    }
    else{
      let number=this.data.number+cart[index].book_num;
      cart[index]={u_id:userInfo.u_id,b_id:b_id,book_num:number};
    }
    let cart_num=cart.length;
    this.setData({cartnum:cart_num});
    userInfo.carts=cart;
   // app.globalData.userInfo=userInfo;
   wx.setStorageSync('userInfo',userInfo)
    wx.showToast({
      title: '加入购物车成功',
    })
    
  },

  cutNumber: function () {
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
  },
  addNumber: function () {
    this.setData({
      number: this.data.number + 1
    });
  },
  openCartPage: function () {
    wx.switchTab({
      url: '/pages/cart/cart',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!app.globalData.userLogged){
      wx.redirectTo({
        url: '/pages/auth/login/login',
      })
    }
    let cart=wx.getStorageSync('userInfo').carts;
    debugger;

    let num=cart.length;
      this.setData({
        cartnum:num,
        b_id:parseInt(options.id)
      });
      var that =this;
      this.getBookInfo();
   //   this.getRelatedBook();
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