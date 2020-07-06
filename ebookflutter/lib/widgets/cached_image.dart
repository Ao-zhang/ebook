import 'package:ebookflutter/constant/constants.dart';
import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class CachedImageView extends StatelessWidget {
  double width;
  double height;
  String url;

  CachedImageView(this.width, this.height, this.url);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: this.width,
      height: this.height,
      alignment: Alignment.center,
      child: CachedNetworkImage(
        imageUrl: this.url,
        fit: BoxFit.fill,
        width: this.width,
        height: this.height,
        placeholder: (BuildContext context, String url) {
          return Container(
            width: this.width,
            color: Colors.grey[350],
            height: this.height,
            alignment: Alignment.center,
            child: Text(
              Constants.LOADING,
              style: TextStyle(
                  fontSize: ScreenUtil().setSp(26.0),
                  color: Colors.white),
            ),
          );
        },
      ),
    );
  }
}

class CachedImageViewLocal extends StatelessWidget {
  double width;
  double height;
  String url;

  CachedImageViewLocal(this.width, this.height, this.url);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: this.width,
      height: this.height,
      alignment: Alignment.center,
       child: Image(
        image:new AssetImage(this.url),
        fit: BoxFit.fill,
        width: this.width,
        height: this.height
        ),
    );
  }
}

