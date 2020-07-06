import 'package:ebookflutter/router/router_handlers.dart';
import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';

class Routers {
  static String root = "/";
  static String home = "/home";
  static String categoryGoodsList = "/categoryBooksList";
  static String bookDetail = "/bookDetail";
  static String login = "/login";
  static String register = "/register";
  static String commitorder="/commiteOrder";

  static void configureRoutes(Router router){
   router.notFoundHandler = new Handler(
        handlerFunc: (BuildContext context, Map<String, List<String>> params) {
      print('404');
    });

  router.define(home, handler: homeHandler);
  router.define(login, handler:loginHandler);
  router.define(register,handler:registerHandler);
  router.define(bookDetail, handler: bookDetailsHandler);
  router.define(commitorder, handler: fillInOrderHandler);
  }
}
