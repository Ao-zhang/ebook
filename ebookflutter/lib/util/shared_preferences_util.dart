import 'package:ebookflutter/entity/cartlistitem_entity.dart';
import 'package:ebookflutter/entity/user_entity.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:ebookflutter/constant/constants.dart';
import 'dart:convert' as convert;
class SharedPreferencesUtils {
   static UserEntity user=null;
   static List<Cartlistitem> ordertocommit=null;
  
  static Future getUSER() async {
    if (user==null) {
      SharedPreferences sharedPreferences =
          await SharedPreferences.getInstance();
    String userjson = sharedPreferences.get("user") ?? null;
    if(userjson!=null){
        Map<String,dynamic> json=convert.jsonDecode(userjson);
        user=UserEntity.fromJson(json);
      }
    }
    return user;
  }

  static Future getUSERID() async {
    if (user==null) {
      SharedPreferences sharedPreferences =
          await SharedPreferences.getInstance();
    String userjson = sharedPreferences.get("user") ?? null;
    if(userjson!=null){
      Map<String,dynamic> json=convert.jsonDecode(userjson);
      user=UserEntity.fromJson(json);
    }
    
     if(user==null)
      return null;
    }
    
    else return user.u_id;
  }
  static Future getAvatar() async {
    if(user==null){
       SharedPreferences sharedPreferences =
          await SharedPreferences.getInstance();
    String userjson = sharedPreferences.get("user") ?? null;
    if(userjson!=null){
      Map<String,dynamic> json=convert.jsonDecode(userjson);
      user=UserEntity.fromJson(json);
    }
     if(user==null)
      return null;
    }
    return user.avatar;
  }

  static Future getUserName() async {
    if(user!=null){
       SharedPreferences sharedPreferences =
          await SharedPreferences.getInstance();
     String userjson = sharedPreferences.get("user") ?? null;
    if(userjson==null){
      Map<String,dynamic> json=convert.jsonDecode(userjson);
      user=UserEntity.fromJson(json);
    }
     if(user==null)
      return null;
    }
    return user.u_nickname;
  }

  static  getOrder(){
    return ordertocommit;
  }
}