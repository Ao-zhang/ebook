import 'package:ebookflutter/config/api.dart';
import 'package:ebookflutter/constant/constants.dart';
import 'package:ebookflutter/entity/user_entity.dart';
import 'package:ebookflutter/util/http_util.dart';

typedef OnSuccess<T>(T data);

typedef OnFail(String message);

class UserService {
  Future register(Map<String, dynamic> parameters, OnSuccess onSuccess,
      OnFail onFail) async {
    try {
      var response =
          await HttpUtil.instance.post(Api.RegisterUrl, parameters: parameters);
      if (response['errno'] == 0) {
        onSuccess("");
      } else {
        onFail(response['errmsg']);
      }
    } catch (e) {
      print(e);
      onFail(Constants.SERVER_EXCEPTION);
    }
  }

  Future login(Map<String, dynamic> parameters, OnSuccess onSuccess,
      OnFail onFail) async {
    try {
      var response =
          await HttpUtil.instance.post(Api.LoginUrl, parameters: parameters);
          // print(response);
      if (response['status'] == 0) {
        UserEntity userEntity = UserEntity.fromJson(response['datas']);
        onSuccess(userEntity);
      } else {
        onFail(response['errmsg']);
      }
    } catch (e) {
      print(e);
      onFail(Constants.SERVER_EXCEPTION);
    }
  }

  Future loginOut(OnSuccess onSuccess, OnFail onFail) async {
    try {
      var response = await HttpUtil.instance.post(Api.LogoutUrl);
      if (response['status'] == 0) {
        onSuccess(Constants.SUCCESS);
      } else {
        onFail(response['msg']);
      }
    } catch (e) {
      print(e);
      onFail(Constants.SERVER_EXCEPTION);
    }
  }
}

