var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();

Page({
  data: {
    listdatas: [],
    booksinfo:[],
    tot_cost:0,
    cart:[],
    isEditCart: false,
    checkedAllStatus: true,
    editCartList: []
  },

  listbooks:function(cart){
    //console.log("in list books");
   // debugger;
    let booksinfo=this.data.booksinfo;
    if(!cart.length ||!booksinfo.length){
      this.setData({listdatas:[]});
      return;
    }
    let result=[];
    let tot_price=0;
    for(let i=0;i<cart.length;i++){
      let book_num=cart[i].book_num;
      let b_id=cart[i].b_id;
      let index=-1;
      for(let i=0;i<cart.length;i++){
        if(cart[i].b_id==b_id){
          index=i;
          break;
        }
      }
      if(index<0){
        return;
      }
      else{
        let aitem={
          b_id:b_id,
          img_src:booksinfo[index].img_src,
          b_title:booksinfo[index].b_title,
          author:booksinfo[index].author,
          tot_price:(booksinfo[index].price*book_num).toFixed(2),
          price:booksinfo[index].price,
          description:booksinfo[index].description,
          book_num:book_num,
          store_num:booksinfo[index].store_num,
          index:index,
          checked:true
        };
        result.push(aitem);
        tot_price+=book_num*booksinfo[index].price;
      }
    }
    this.setData({
      listdatas:result,tot_cost:tot_price.toFixed(2)
    });
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示
  //     debugger;
        var that=this;
        let userInfo=wx.getStorageSync('userInfo');
        let cart =userInfo.carts;
        that.setData({userInfo:userInfo,cart:cart});
        let b_ids=[];
        for(let i=0;i<cart.length;i++){
          b_ids.push({b_id:cart[i].b_id});
        }
    
        if(b_ids.length){
          let json={b_ids:b_ids};
          util.post(api.GetBooksByIds,json).then
        ((res)=>{
  //        debugger;
          if(res.data.status){
            util.showErrorToast({
              title: "获取书籍信息失败",
            })
          }
          else{
            that.setData({booksinfo:res.data});
            that.listbooks(cart);
          }
        });
        }
        else{
          this.setData({booksinfo:[],listdatas:[],tot_cost:0,isEditCart: false,
            checkedAllStatus: true,});
        }
  },
  onHide: function () {
    // 页面隐藏
    // var that=this;
    let userInfo=wx.getStorageSync('userInfo');
    let cart =userInfo.carts;
  //  debugger;
    util.post(api.SaveCart,{cart:cart,u_id:userInfo.u_id}).then
    ((res)=>{
    //  debugger;
      if(res.data.status){
        util.showErrorToast({
          title: "购物车保存失败",
        });
       
      }
      else{
        
      }
    });
  },
  onUnload: function () {
    // 页面关闭
    let userInfo=wx.getStorageSync('userInfo');
    let cart =userInfo.carts;
   // debugger;
    util.post(api.SaveCart,{cart:cart,u_id:userInfo.u_id}).then
    ((res)=>{
   //   debugger;
      if(res.data.status){
        wx.showToast({
          title: "购物车保存失败",
        });
        console.log("购物车保存失败"+res.data);
      }
      else{
        wx.showToast({
          title: "购物车保存成功",
        });
      }
    });
  },

  isCheckedAll: function () {
    //判断购物车商品已全选
    return this.data.listdatas.every(function (element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
  },
  checkedItem: function (event) {
    let itemIndex = event.target.dataset.itemIndex;
    let that = this;
    let tot_cost=parseFloat(that.data.tot_cost) ;
    let tmpCartData =that.data.listdatas.map(function (element, index, array) {
      //debugger;
        if (index == itemIndex){
          if(element.checked){
            tot_cost-=element.price*element.book_num;
          }else{
            tot_cost+=element.price*element.book_num;
          }
          element.checked = !element.checked;
        }
        return element;
      });

      that.setData({
        listdatas: tmpCartData,
        tot_cost:tot_cost.toFixed(2),
        checkedAllStatus: that.isCheckedAll(),
      });
  },
  getCheckedGoodsCount: function(){
    let checkedGoodsCount = 0;
    this.data.listdatas.forEach(function (v) {
      if (v.checked === true) {
        checkedGoodsCount += v.book_num;
      }
    });
    console.log(checkedGoodsCount);
    return checkedGoodsCount;
  },
  checkedAll: function () {
    let that = this;
    let tot_cost=0 ;
  //  debugger;
    let checkedAllStatus = that.isCheckedAll();
    let tmpCartData = this.data.listdatas.map(function (v) {
      if(!checkedAllStatus){
        tot_cost+=v.price*v.book_num;
      }
        v.checked = !checkedAllStatus;
        return v;
    });
    that.setData({
      listdatas: tmpCartData,
      tot_cost:tot_cost,
      checkedAllStatus: !checkedAllStatus,
    });
  },

  editCart: function () {
    var that = this;
    if (this.data.isEditCart) {
      this.setData({
        isEditCart: !this.data.isEditCart
      });
    } else {
      //编辑状态
      let tmpCartList = this.data.listdatas.map(function (v) {
        v.checked = false;
        return v;
      });
      this.setData({
       // editCartList: this.data.listdatas,
        listdatas: tmpCartList,
        isEditCart: !this.data.isEditCart,
        checkedAllStatus:false,
      });
    }

  },
  cutNumber: function (event) {
  //  debugger;
    var that =this;
    let itemIndex = event.target.dataset.itemIndex;//与store里cart应该同步
    let tmpdatalist=that.data.listdatas;
    let cartItem = tmpdatalist[itemIndex];
    let number = (cartItem.book_num - 1 > 1) ? cartItem.book_num- 1 : 1;
    cartItem.book_num = number;
    tmpdatalist[itemIndex]=cartItem;
    this.setData({
      listdatas: tmpdatalist
    }); 
    let userInfo=wx.getStorageSync('userInfo');
    let cart =userInfo.carts; 
    cart[itemIndex].book_num=number;
    userInfo.carts=cart;
    wx.setStorageSync('userInfo', userInfo);
  },
  addNumber: function (event) {
  //  debugger;
    var that=this;
    let itemIndex = event.target.dataset.itemIndex;//与store里cart应该同步
    let tmpdatalist=that.data.listdatas;
    let cartItem = tmpdatalist[itemIndex];
    let number = cartItem.book_num+ 1;
    cartItem.book_num = number;
    tmpdatalist[itemIndex]=cartItem;
    this.setData({
      listdatas: tmpdatalist
    });
    let userInfo=wx.getStorageSync('userInfo');
    let cart =userInfo.carts; 
    cart[itemIndex].book_num=number;
    userInfo.carts=cart;
    wx.setStorageSync('userInfo', userInfo);
  },
  checkoutOrder: function () {
    //获取已选择的商品
    let that = this;

    var checkedGoods = this.data.listdatas.filter(function (element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
  //  debugger;
    if (checkedGoods.length <= 0) {
      return false;
    }
    
    app.globalData.orders=checkedGoods;
    let userInfo=wx.getStorageSync('userInfo');
    var uncheckedGoods = this.data.listdatas.filter(function (element, index, array) {
      if (element.checked == false) {
        return true;
      } else {
        return false;
      }
    });
    var remaincart=uncheckedGoods.map(function(element,index,array){
      return {u_id:userInfo.u_id,b_id:element.b_id,book_num:element.book_num};
    })
    app.globalData.cart=remaincart;
    wx.navigateTo({
      url: '../shopping/checkout/checkout'
    })
  },
  deleteCart: function () {
    //获取已选择的商品
    let that = this;
  //  debugger;
    let tot_cost=0;
    let unchooseditems = this.data.listdatas.filter(function (element, index, array) {
      if (element.checked == false) {//保留没有被选择的
        tot_cost+=element.price*element.book_num;
        return true;
      } else {
        return false;
      }
    });
    this.setData({listdatas:unchooseditems,tot_cost:tot_cost});
    let userInfo=wx.getStorageSync('userInfo');
    let cart=unchooseditems.map(function(element,index,array){
        return {u_id:userInfo.u_id,b_id:element.b_id,book_num:element.book_num};
    });
    userInfo.carts=cart;
    wx.setStorageSync('userInfo', userInfo);
  }

})