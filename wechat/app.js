//app.js
App({
  onLaunch: function () {
    try{
     // debugger;
      if(wx.getStorageSync('userInfo')){
        this.globalData.userInfo = wx.getStorageSync('userInfo');
        this.globalData.userLogged=true;
      }
      this.globalData.sessionid = wx.getStorageSync('sessionid');
    }catch(e){
      console.log(e);
    }
  },
  globalData: {
    userInfo: {//用户信息
      u_nickname: '点击登录',
      avatar: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    },
    userLogged:false,//用户是否登录
    sessionid: '',
    address:{
      con_name:"maidang",
      con_phone:"10086",
      province:"Hubei",
      city:"Jingzhou",
      town:"Shashi",
      street:"BeijingRoad",
      detail_info:"1-1-1"
    }
  }
})