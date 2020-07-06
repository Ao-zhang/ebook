import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class IconTextArrowView extends StatelessWidget {
  final IconData iconData;
  final title;
  final VoidCallback callback;
  final Color color;

  IconTextArrowView(
    this.iconData,
    this.title,
    this.color,
    this.callback,
  );

  @override
  Widget build(BuildContext context) {
    return Container(
        height: ScreenUtil().setHeight(100.0),
        width: double.infinity,
        child: InkWell(
          onTap:callback,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Container(
                margin: EdgeInsets.only(left: 10.0),
                child: Icon(
                  iconData,
                  size: ScreenUtil().setWidth(40.0),
                  color: color,
                ),
              ),
              Padding(
                padding: EdgeInsets.only(
                    left: ScreenUtil().setWidth(20.0)),
              ),
              Text(
                title,
                style: TextStyle(
                    fontSize: ScreenUtil().setSp(26.0),
                    color: Colors.black54),
              ),
              Expanded(
                child: Container(
                  alignment: Alignment.centerRight,
                  margin: EdgeInsets.only(
                      right: ScreenUtil().setWidth(30.0)),
                  child: Icon(
                    Icons.arrow_forward_ios,
                    color: Colors.grey,
                    size: ScreenUtil().setWidth(30),
                  ),
                ),
              )
            ],
          ),
        ));
  }
}
