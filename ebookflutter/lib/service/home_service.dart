

import 'package:ebookflutter/config/api.dart';
import 'package:ebookflutter/constant/constants.dart';
import 'package:ebookflutter/entity/book_entity.dart';
import 'package:ebookflutter/service/cart_service.dart';
import 'package:ebookflutter/util/http_util.dart';

typedef OnSuccessList<T>(List<T> successDatas);

typedef OnFail(String message);

typedef OnSuccess<T>(T successData);

class HomeService {

  Future getBooksData(int pagenum,OnSuccessList onSuccess, {OnFail onFail}) async {
    try {
      var params={
        "pagenum":pagenum,
        "size":10
      };
      var response = await HttpUtil.instance.post(Api.GetBooksUrl,parameters: params);
      if (response.length>0) {
       // responseList = response['data'];
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

  Future getABookData(Map<String, dynamic> parameters,OnSuccess onSuccess,{OnFail onFail} ) async {
    try{
      var response=
        await HttpUtil.instance.post(Api.GetABookUrl,parameters: parameters);
        if(response!=null){
            BookEntity bookEntity=BookEntity.fromJson(response);
            onSuccess(bookEntity);
        }
    }catch(e){
      print(e);
      onFail(Constants.SERVER_EXCEPTION);
    }
  }


}
