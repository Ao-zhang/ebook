var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

var app = getApp();

Page({
  data: {
    checkedGoodsList: [],
    address:{},
    goodsTotalPrice: 0.00, //商品总价
    orderTotalPrice: 0.00,  //订单总价
    actualPrice: 0.00,     //实际需要支付的总价
  },
  onLoad: function (options) {

  },
  getCheckoutInfo: function () {
    let that = this;
    let checkedBooks=app.globalData.orders;
    let address=app.globalData.address;
    let tot_cost=0;
    for(let i=0;i<checkedBooks.length;i++){
      tot_cost+=checkedBooks[i].price*checkedBooks[i].book_num;
    }
    this.setData({
      checkedGoodsList:checkedBooks,
      address:address,
      orderTotalPrice:tot_cost.toFixed(2),
      goodsTotalPrice: tot_cost.toFixed(2), //商品总价
      actualPrice: tot_cost.toFixed(2), 
    });
    wx.hideLoading();
  },
  selectAddress() {
    
  },
  addAddress() {
   
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示
    wx.showLoading({
      title: '加载中...',
    })
    this.getCheckoutInfo();

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  submitOrder: function () {
    var that=this;
    let userInfo=wx.getStorageSync('userInfo');
    let address=that.data.address;
    let checkedBooks=that.data.checkedGoodsList;
    address.u_id=userInfo.u_id;
    let orderinfo={
      u_id:userInfo.u_id,
      tot_cost:that.data.actualPrice,
      comment:"微信小程序购买"
    };
    let orderitems=[];
    for(let i=0;i<checkedBooks.length;i++){
      let book_num=checkedBooks[i].book_num;
      let b_id=checkedBooks[i].b_id;
      let rest_num=checkedBooks[i].store_num-book_num;
      if(rest_num<0){
        util.showErrorToast("库存不足,请检查库存后再下单");
      }
      orderitems.push({
        b_id:b_id,book_num:book_num,rest_num:rest_num
      })
    }
    let data={
      address:address,
      ordinfo:orderinfo,
      orditems:orderitems
    };
    util.post(api.BuyUrl,data).then
        ((res)=>{
         // debugger;
          if(res.data.status){
            util.showErrorToast("购买失败")
            
          }
          else{
            wx.showToast({
              title: '购买成功',
            });
            userInfo.carts=app.globalData.cart;
            wx.setStorageSync('userInfo', userInfo);
            app.globalData.cart=[];
            app.globalData.orders=[];
            wx.switchTab({
              url: '/pages/cart/cart',
            });
          }
        });
  }
})