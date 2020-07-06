//index.js
//获取应用实例
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const app = getApp()

Page({
  data: {
    banner:[
      "../../../../../static/Carousel/book1.jpg",
      "../../../../../static/Carousel/book2.jpg",
      "../../../../../static/Carousel/book3.jpg",
      "../../../../../static/Carousel/book4.jpg"
    ],
    hotbooks:[],
    newbooks:[],
    topics:[],
    pagenum:1,
    size:12
  },
  //分享信息
  onShareAppMessage: function () {
    return {
      title: 'ebook云墨阁',
      desc: 'SJTU 2020 web 大作业',
      path: '/pages/index/index'
    }
  },
  //事件处理函数
  bindViewTap: function() {
    
  },
  onLoad: function () {
    let that=this;
    let params={
      pagenum:this.data.pagenum,
      size:this.data.size
    };
    util.post(api.GetBooksUrl,params).then(function(res){
      //debugger;
      let newbooks=res.data.slice(0,4);
      let hotbooks=res.data.slice(4,7);
      let topics=res.data.slice(7,10);
      let floorbooks=res.data.slice(10,12);
      that.setData({
        hotbooks:hotbooks,
        newbooks:newbooks,
        topics:topics
      })
    })
  },
})
