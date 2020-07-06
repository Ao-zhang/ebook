
import 'package:ebookflutter/constant/constants.dart';
import 'package:ebookflutter/entity/banner_entity.dart';
import 'package:ebookflutter/widgets/cached_image.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_swiper/flutter_swiper.dart';
import 'package:flutter/material.dart';

class SwiperView extends StatelessWidget{
  List<MallBanner> bannerdata=new List();
  int size;
  double viewHeight;

   SwiperView(this.bannerdata, this.size, this.viewHeight);

   @override
  Widget build(BuildContext context) {
    return Container(
      height: viewHeight,
      width: double.infinity,
      child: bannerdata == null || bannerdata.length == 0
          ? Container(
              height: ScreenUtil().setHeight(400.0),
              color: Colors.grey[200],
              alignment: Alignment.center,
              child: Text(Constants.NO_DATA_TEXT),
            )
          : Swiper(
              onTap: (index) {
              //   NavigatorUtils.goWebView(
              //       context, bannerdata[index].name, bannerData[index].link);
              // 
              },
              itemCount: bannerdata.length,
              scrollDirection: Axis.horizontal,
              //滚动方向，设置为Axis.vertical如果需要垂直滚动
              loop: true,
              //无限轮播模式开关
              index: 0,
              //初始的时候下标位置
              autoplay: true,
              itemBuilder: (BuildContext buildContext, int index) {
                print(bannerdata[index].url);
                return CachedImageViewLocal(
                    double.infinity, double.infinity, bannerdata[index].url);
              },
              duration: 10000,
              pagination: SwiperPagination(
                  alignment: Alignment.bottomCenter,
                  builder: DotSwiperPaginationBuilder(
                      size: 8.0,
                      color: Colors.white,
                      activeColor: Colors.deepOrangeAccent))
            )
    );
  }
}
