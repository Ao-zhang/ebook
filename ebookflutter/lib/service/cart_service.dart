import 'package:dio/dio.dart';
import 'package:ebookflutter/config/api.dart';
import 'package:ebookflutter/constant/constants.dart';
import 'package:ebookflutter/entity/book_entity.dart';
import 'package:ebookflutter/entity/cartlistitem_entity.dart';
import 'package:ebookflutter/util/http_util.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert' as convert;

typedef OnSuccessList<T>(List<T> banners);
typedef OnFail(String message);
typedef OnSuccess<T>(T onSuccess);
// typedef OnGetBookSuccess()

class CartService{
  Future addCart(Map<String, dynamic> parameters, OnSuccess onSuccess,
      {OnFail onFail}) async {
    try {
      var response;
  
        response =
            await HttpUtil.instance.post(Api.SaveCart, parameters: parameters);
     
      if (response==true) {
        onSuccess(Constants.SUCCESS);
      } else {
        onFail("购物车保存失败");
      }
    } catch (e) {
      print(e);
      onFail(Constants.SERVER_EXCEPTION);
    }
  }

Future commitOrder (Map<String, dynamic> parameters, OnSuccess onSuccess,
      {OnFail onFail}) async {
    try {
      var response;
  
        response =
            await HttpUtil.instance.post(Api.BuyUrl, parameters: parameters);
     
      if (response==true) {
        onSuccess(Constants.SUCCESS);
      } else {
        onFail("订单提交失败");
      }
    } catch (e) {
      print(e);
      onFail(Constants.SERVER_EXCEPTION);
    }
  }
  
  

  Future getbooksinfo(List<Map<String,dynamic>> params, OnSuccessList onSuccess,
      OnFail onFail) async {
    try {
      var response;
      // var json=convert.jsonEncode(params);
       Map<String, dynamic> map = Map();
      // map.putIfAbsent("b_ids", () => convert.jsonEncode(params));
     map.putIfAbsent("b_ids", () => params);
      print(map);
        response =
            await HttpUtil.instance.post(Api.GetBooksByIds, parameters: map);
      print(response);
      if (response.length>0) {
        BookListEntity bookListEntity =
            BookListEntity.fromJson(response);
        onSuccess(bookListEntity.booksEntitys);
      } else {
        print(response['msg']);
        onFail(response['msg']);
      }
  
    } catch (e) {
      print(e);
      onFail(Constants.SERVER_EXCEPTION);
    }
  }
}
