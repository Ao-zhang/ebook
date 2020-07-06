import 'package:ebookflutter/pages/goods/book_detail.dart';
import 'package:ebookflutter/pages/goods/fill_in_order.dart';
import 'package:ebookflutter/pages/home/mall.dart';
import 'package:ebookflutter/pages/login/login.dart';
import 'package:ebookflutter/pages/login/register.dart';
import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';

final homeHandler = new Handler(
    handlerFunc: (BuildContext context, Map<String, List<String>> parameters) {
  return MallMainView();
});

var loginHandler = Handler(
    handlerFunc: (BuildContext context, Map<String, List<String>> parameters) {
  return LoginView();
});

var registerHandler = Handler(
    handlerFunc: (BuildContext context, Map<String, List<String>> parameters) {
  return RegisterView();
});

var bookDetailsHandler = Handler(
    handlerFunc: (BuildContext context, Map<String, List<Object>> parameters) {
  var b_id = int.parse(parameters["b_id"].first);
  return BookDetail(b_id: b_id);
});

var fillInOrderHandler = Handler(
    handlerFunc: (BuildContext context, Map<String, List<String>> parameters) {
  return FillInOrderView();
});