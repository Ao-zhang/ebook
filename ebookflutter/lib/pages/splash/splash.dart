import 'package:ebookflutter/util/navigator_util.dart';
import 'package:flutter/material.dart';


class SplashView extends StatefulWidget {
  @override
  _SplashViewState createState() => _SplashViewState();
}

class _SplashViewState extends State<SplashView> {
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration(seconds: 3), () {
      NavigatorUtils.goMallMainPage(context);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: Colors.deepOrangeAccent,
        child: Image.asset(
          "images/splash.png",
          width: double.infinity,
          height: double.infinity,
          fit: BoxFit.fill,
        ),
      ),
    );
  }
}
