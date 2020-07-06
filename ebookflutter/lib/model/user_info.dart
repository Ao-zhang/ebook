import 'package:ebookflutter/entity/user_entity.dart';
import 'package:flutter/material.dart';


class UserInfoModel with ChangeNotifier {
  UserEntity userEntity;

  updateInfo(UserEntity userEntity) {
    this.userEntity = userEntity;
    notifyListeners();
  }
}
