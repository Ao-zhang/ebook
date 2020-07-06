import 'package:ebookflutter/constant/constants.dart';
import 'package:ebookflutter/entity/banner_entity.dart';
import 'package:ebookflutter/entity/book_entity.dart';
import 'package:ebookflutter/pages/home/new_book.dart';
import 'package:ebookflutter/pages/home/swiper.dart';
import 'package:ebookflutter/service/home_service.dart';
import 'package:ebookflutter/util/toast_util.dart';
import 'package:flutter/material.dart';
import 'package:flutter_easyrefresh/bezier_bounce_footer.dart';
import 'package:flutter_easyrefresh/bezier_circle_header.dart';
import 'package:flutter_easyrefresh/easy_refresh.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  HomeService _homeService = HomeService();
  // HomeEntity _homeEntity;
  List<MallBanner> banners;
  List<BookEntity> books;
  EasyRefreshController _controller = EasyRefreshController();


  @override
  void initState() {
    super.initState();
    _queryHomeData();
  }

  _queryHomeData() {
    // _homeService.queryHomeData((success) {
      List<MallBanner> Banners=new List();
      for(int i=1;i<=4;i++){
        String url='images/Carousel/book'+i.toString()+".jpg";
        MallBanner a=new MallBanner(i,url);
        Banners.add(a);
      }
      setState(() {
        banners=Banners;
      });

      // get the first 10 books to show
      _homeService.getBooksData(1,(successDatas){
        setState(() {
          books=successDatas;
        });
      _controller.finishRefresh();
      },onFail: (error){
         ToastUtil.showToast(error);
      _controller.finishRefresh();});
      }
    

  // _goSearchGoods() {
  //   NavigatorUtils.goSearchGoods(context);
  // }

  @override
  Widget build(BuildContext context) {
    
    ScreenUtil.init(context,width: 750, height: 1334,allowFontScaling: true);
    //设置字体大小根据系统的“字体大小”辅助选项来进行缩放,默认为false
    return Scaffold(
        //key: ObjectKey("home"),
        appBar: AppBar(
          title: Text(Constants.MALL),
          centerTitle: true,
          actions: <Widget>[
            IconButton(
                icon: Icon(
                  Icons.search,
                  color: Colors.white,
                ),
                onPressed: () => {})
                // _goSearchGoods())
          ],
        ),
        body: contentWidget());
  }

  Widget contentWidget() {
    return 
    // _homeEntity == null
    //     ? LoadingDialog()
    //     : 
        Container(
            child: EasyRefresh(
              controller: _controller,
              header: BezierCircleHeader(backgroundColor: Colors.deepOrange),
              footer: BezierBounceFooter(backgroundColor: Colors.deepOrange),
              enableControlFinishRefresh: true,
              enableControlFinishLoad: false,
              child: SingleChildScrollView(
                  child: Column(
                children: <Widget>[
                  SwiperView(banners, banners.length,
                      ScreenUtil().setHeight(360.0)),
                  Padding(
                    padding: EdgeInsets.only(top: 10.0),
                  ),
                  Container(
                    height: 40.0,
                    alignment: Alignment.center,
                    child: Text(Constants.NEW_PRODUCT),
                  ),
                  BooksView(this.books),
                  
                ],
              )),
              onRefresh: () async {
                // _queryHomeData();
                _controller.finishRefresh();
              },
            ),
          );
  }
}