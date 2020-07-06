
import 'package:dio/dio.dart';
import 'package:ebookflutter/config/api.dart';
import 'package:ebookflutter/constant/constants.dart';
import 'package:ebookflutter/util/http_util.dart';


typedef OnSuccessList<T>(List<T> banners);
typedef OnFail(String message);
typedef OnSuccess<T>(T onSuccess);

class GoodsService {
  


  Future addCart(Map<String, dynamic> parameters, OnSuccess onSuccess,
      {OnFail onFail, Options options}) async {
    try {
      var response;
      if (options == null) {
        response =
            await HttpUtil.instance.post(Api.SaveCart, parameters: parameters);
      } else {
        response = await HttpUtil.instance
            .post(Api.SaveCart, parameters: parameters, options: options);
      }
      if (response['errno'] == 0) {
        onSuccess(Constants.SUCCESS);
      } else {
        onFail(response['errmsg']);
      }
    } catch (e) {
      print(e);
      onFail(Constants.SERVER_EXCEPTION);
    }
  }

}
