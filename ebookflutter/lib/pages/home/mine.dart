import 'dart:typed_data';

import 'package:ebookflutter/constant/constants.dart';
import 'package:ebookflutter/event/login_event.dart';
import 'package:ebookflutter/service/user_service.dart';
import 'package:ebookflutter/util/navigator_util.dart';
import 'package:ebookflutter/util/shared_preferences_util.dart';
import 'package:ebookflutter/util/toast_util.dart';
import 'package:ebookflutter/widgets/ebook_icon.dart';
import 'package:ebookflutter/widgets/icon_text_arrow.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'dart:convert';

class MineView extends StatefulWidget {
  @override
  _MineViewState createState() => _MineViewState();
}

class _MineViewState extends State<MineView> {
  bool isLogin = false;
  Uint8List avatar64;
  var nickName;
  UserService _userService = UserService();
  bool if_build=false;

  @override
  void initState() {
    super.initState();
    _getUserInfo();
  }

  _refreshEvent() {
    if(!if_build &&mounted){
      _getUserInfo();
      setState(() {
        if_build=true;
      });
    }
  
      loginEventBus.on<LoginEvent>().listen((LoginEvent loginEvent) {
      if (loginEvent.isLogin &&mounted) {
        setState(() {
          isLogin = true;
          avatar64 =  Base64Decoder().convert(loginEvent.user.avatar);
          nickName = loginEvent.user.u_nickname;
        });
      } else if(mounted){
        setState(() {
          isLogin = false;
        });
      }
    });
    
  }

  _getUserInfo() {
    SharedPreferencesUtils.getUSER().then((value)async  {
      if(value!=null &&mounted){
        setState(() {
          isLogin = true;
          avatar64 =  Base64Decoder().convert(value.avatar);
          nickName = value.u_nickname;
        });
        loginEventBus.fire(LoginEvent(true,user: value));
      }    
    });

  }

  @override
  Widget build(BuildContext context) {
    _refreshEvent();
    return Scaffold(
      appBar: AppBar(
        title: Text(Constants.MINE),
        centerTitle: true,
      ),
      body: Column(
        children: <Widget>[
          Container(
            height: ScreenUtil().setHeight(160.0),
            width: double.infinity,
            color: Colors.deepOrangeAccent,
            alignment: Alignment.center,
            child: isLogin
                ? Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[
                      Container(
                        width: ScreenUtil().setWidth(100),
                        height: ScreenUtil().setHeight(100),
                        margin: EdgeInsets.only(
                            left: ScreenUtil().setWidth(30.0)),
                        child: CircleAvatar(
                          radius: ScreenUtil().setWidth(50),
                          foregroundColor: Colors.deepOrangeAccent,
                          child: Image.memory(avatar64),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.only(
                            left: ScreenUtil().setWidth(10.0)),
                      ),
                      Text(
                        nickName,
                        style: TextStyle(
                            fontSize: ScreenUtil().setSp(26.0),
                            color: Colors.white),
                      ),
                      Expanded(
                        child: InkWell(
                            onTap: () => _loginOutDialog(),
                            child: Offstage(
                              offstage: !isLogin,
                              child: Container(
                                padding: EdgeInsets.only(right: ScreenUtil().setWidth(30)),
                                alignment: Alignment.centerRight,
                                child: Text(
                                  Constants.LOGIN_OUT,
                                  style: TextStyle(
                                      fontSize:
                                          ScreenUtil().setSp(26),
                                      color: Colors.white),
                                ),
                              ),
                            )),
                      ),
                    ],
                  )
                : InkWell(
                    onTap: () => _toLogin(),
                    child: Text(
                      Constants.CLICK_LOGIN,
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: ScreenUtil().setSp(30.0)),
                    ),
                  ),
          ),
          Padding(
            padding:
                EdgeInsets.only(top: ScreenUtil().setHeight(20.0)),
          ),
          IconTextArrowView(
              EbookIcon.ORDER, Constants.ORDER, Colors.deepPurpleAccent, order),
          Divider(
            height: ScreenUtil().setHeight(1.0),
            color: Color(0xffd3d3d3),
          ),
          IconTextArrowView(
              EbookIcon.COUPON, Constants.COUPON, Colors.green, mineCoupon),
          Divider(
            height: ScreenUtil().setHeight(1.0),
            color: Color(0xffd3d3d3),
          ),
          IconTextArrowView(
              EbookIcon.COLLECTION, Constants.COLLECTION, Colors.red, collect),
          Divider(
            height: ScreenUtil().setHeight(1.0),
            color: Color(0xffd3d3d3),
          ),
          IconTextArrowView(
              EbookIcon.ADDRESS, Constants.ADDRESS, Colors.amber, address),
          Divider(
            height: ScreenUtil().setHeight(1.0),
            color: Color(0xffd3d3d3),
          ),
          IconTextArrowView(
              EbookIcon.FOOTPRINT,Constants.FOOTPRINT, Colors.pink, footprint),
          Divider(
            height: ScreenUtil().setHeight(1.0),
            color: Color(0xffd3d3d3),
          ),
          IconTextArrowView(EbookIcon.FEED_BACK, Constants.FEED_BACK,
              Colors.blueAccent, feedbackCallback),
          Divider(
            height: ScreenUtil().setHeight(1.0),
            color: Color(0xffd3d3d3),
          ),
          IconTextArrowView(
              EbookIcon.ABOUT_US, Constants.ABOUT_US, Colors.teal, aboutUs),
          Divider(
            height: ScreenUtil().setHeight(1.0),
            color: Color(0xffd3d3d3),
          ),
        ],
      ),
    );
  }

  _loginOutDialog() {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text(
              Constants.TIPS,
              style: TextStyle(
                  fontSize: ScreenUtil().setSp(30),
                  color: Colors.black54),
            ),
            content: Text(
              Constants.LOGIN_OUT_TIPS,
              style: TextStyle(
                  fontSize: ScreenUtil().setSp(30),
                  color: Colors.black54),
            ),
            actions: <Widget>[
              FlatButton(
                onPressed: () {
                  Navigator.pop(context);
                },
                child: Text(
                  Constants.CANCEL,
                  style: TextStyle(color: Colors.black54),
                ),
              ),
              FlatButton(
                onPressed: () => _loginOut(),
                child: Text(
                  Constants.CONFIRM,
                  style: TextStyle(color: Colors.deepOrangeAccent),
                ),
              )
            ],
          );
        });
  }

  _loginOut() {
    _userService.loginOut((success) {
      loginEventBus.fire(LoginEvent(false));
    }, (error) {
      loginEventBus.fire(LoginEvent(false));
      ToastUtil.showToast(error);
    });
    Navigator.pop(context);
  }

  void feedbackCallback() {
    if (isLogin) {
      // NavigatorUtils.goFeedback(context);
    } else {
      _toLogin();
    }
  }

  void mineCoupon() {
    if (isLogin) {
      // NavigatorUtils.goCoupon(context);
    } else {
      _toLogin();
    }
  }

  void footprint() {
    if (isLogin) {
      // NavigatorUtils.goFootprint(context);
    } else {
      _toLogin();
    }
  }

  void collect() {
    if (isLogin) {
      // NavigatorUtils.goCollect(context);
    } else {
      _toLogin();
    }
  }

  void address() {
    if (isLogin) {
      // NavigatorUtils.goAddress(context);
    } else {
      _toLogin();
    }
  }

  void aboutUs() {
    if (isLogin) {
      // NavigatorUtils.goAboutUs(context);
    } else {
      _toLogin();
    }
  }

  void order() {
    if (isLogin) {
      // NavigatorUtils.goOrder(context);
    } else {
      _toLogin();
    }
  }

  _toLogin() {
    NavigatorUtils.goLogin(context);
  }
}
