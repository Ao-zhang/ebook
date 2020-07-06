import 'package:ebookflutter/router/application.dart';
import 'package:ebookflutter/router/routers.dart';
import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';

class NavigatorUtils {
  static goMallMainPage(BuildContext context) {
    Application.router.navigateTo(context, Routers.home,
        transition: TransitionType.inFromRight, replace: true);
  }



  static goRegister(BuildContext context) {
    Application.router.navigateTo(context, Routers.register,
        transition: TransitionType.inFromRight);
  }

  static goLogin(BuildContext context) {
    Application.router.navigateTo(context, Routers.login,
        transition: TransitionType.inFromRight);
  }

  static goBookDetails(BuildContext context, int b_id) {
    Application.router.navigateTo(
        context, Routers.bookDetail + "?b_id=$b_id",
        transition: TransitionType.inFromRight);
  }

  static popRegister(BuildContext context) {
    Application.router.pop(context);
  }

  static goFillInOrder(BuildContext context) {
    Application.router.navigateTo(context, Routers.commitorder,
        transition: TransitionType.inFromRight);
  }


  static submitOrderSuccessPop(BuildContext context) {
    Application.router.navigateTo(context, Routers.home,
        clearStack: true, transition: TransitionType.inFromRight);
  }
}
