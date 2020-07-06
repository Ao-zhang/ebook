import 'dart:convert';

import 'package:ebookflutter/constant/constants.dart';
import 'package:ebookflutter/entity/user_entity.dart';
import 'package:ebookflutter/event/login_event.dart';
import 'package:ebookflutter/service/user_service.dart';
import 'package:ebookflutter/util/navigator_util.dart';
import 'package:ebookflutter/util/shared_preferences_util.dart';
import 'package:ebookflutter/widgets/ebook_icon.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert' as convert;

class LoginView extends StatefulWidget {
  @override
  _LoginViewState createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  TextEditingController _accountTextControl = TextEditingController();
  TextEditingController _passwordTextControl = TextEditingController();
  UserService userService = UserService();
  UserEntity userEntity;
  bool _autovalidator = false;
  final registerFormKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.deepOrangeAccent,
      body: SafeArea(
        child: Container(
            alignment: Alignment.centerLeft,
            child: Center(
                child: SingleChildScrollView(
              child: Container(
                margin: EdgeInsets.fromLTRB(ScreenUtil().setWidth(30.0), 0,
                    ScreenUtil().setWidth(30.0), 0),
                height: ScreenUtil().setHeight(800.0),
                decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(10.0)),
                child: Form(
                  key: registerFormKey,
                  child: Column(
                    children: <Widget>[
                      Padding(
                          padding: EdgeInsets.only(
                              top: ScreenUtil().setHeight(60.0))),
                      Container(
                        margin:
                            EdgeInsets.all(ScreenUtil().setWidth(30.0)),
                        child: TextFormField(
                          maxLines: 1,
                          maxLength: 15,
                          autovalidate: _autovalidator,
                          keyboardType: TextInputType.phone,
                          validator: _validatorAccount,
                          decoration: InputDecoration(
                            icon: Icon(
                              Icons.account_circle,
                              color: Colors.deepOrangeAccent,
                              size: ScreenUtil().setWidth(60.0),
                            ),
                            hintText: Constants.ACCOUNT_HINT,
                            hintStyle: TextStyle(
                                color: Colors.grey,
                                fontSize: ScreenUtil().setSp(28.0)),
                            labelStyle: TextStyle(
                                color: Colors.black54,
                                fontSize: ScreenUtil().setSp(28.0)),
                            labelText: Constants.ACCOUNT,
                          ),
                          controller: _accountTextControl,
                        ),
                      ),
                      Container(
                        margin:
                            EdgeInsets.all(ScreenUtil().setWidth(30.0)),
                        child: TextFormField(
                          maxLines: 1,
                          maxLength: 12,
                          obscureText: true,
                          autovalidate: _autovalidator,
                          validator: __validatorPassWord,
                          decoration: InputDecoration(
                            icon: Icon(
                              EbookIcon.PASS_WORD,
                              color: Colors.deepOrangeAccent,
                              size: ScreenUtil().setWidth(60.0),
                            ),
                            hintText: Constants.PASSWORD_HINT,
                            hintStyle: TextStyle(
                                color: Colors.grey,
                                fontSize: ScreenUtil().setSp(28.0)),
                            labelStyle: TextStyle(
                                color: Colors.black54,
                                fontSize: ScreenUtil().setSp(28.0)),
                            labelText: Constants.PASSWORD,
                          ),
                          controller: _passwordTextControl,
                        ),
                      ),
                      Container(
                          margin: EdgeInsets.all(
                              ScreenUtil().setWidth(30.0)),
                          child: SizedBox(
                            height: ScreenUtil().setHeight(80.0),
                            width: ScreenUtil().setWidth(600.0),
                            child: RaisedButton(
                              onPressed: _login,
                              color: Colors.deepOrangeAccent,
                              child: Text(
                                Constants.LOGIN,
                                style: TextStyle(
                                    color: Colors.white,
                                    fontSize: ScreenUtil().setSp(28.0)),
                              ),
                            ),
                          )),
                      Container(
                        margin:
                            EdgeInsets.all(ScreenUtil().setWidth(20.0)),
                        alignment: Alignment.centerRight,
                        child: InkWell(
                          onTap: () => _register(),
                          child: Text(
                            Constants.NOW_REGISTER,
                            style: TextStyle(
                                color: Colors.deepOrangeAccent,
                                fontSize: ScreenUtil().setSp(24.0)),
                          ),
                        ),
                      )
                    ],
                  ),
                ),
              ),
            ))),
      ),
    );
  }

  _register() {
    NavigatorUtils.goRegister(context);
  }

  String _validatorAccount(String value) {
    if (value == null || value.length < 3) {
      return Constants.ACCOUNT_RULE;
    }
    return null;
  }

  String __validatorPassWord(String value) {
    if (value == null || value.length < 6) {
      return Constants.PASSWORD_HINT;
    }
    return null;
  }


  _login() {
    if (registerFormKey.currentState.validate()) {
      registerFormKey.currentState.save();
      Map<String, dynamic> map = Map();
      map.putIfAbsent("u_name", () => _accountTextControl.text.toString());
      map.putIfAbsent("u_password", () => _passwordTextControl.text.toString());
      userService.login(map, (success) {
        print(success);
        userEntity = success;
        userEntity.avatar=userEntity.avatar.split(',')[1];//显示需要摒除data:image/png;base64,的信息
        _saveUserInfo();
        _showToast(Constants.LOGIN_SUCESS);
//        Provider.of<UserInfoModel>(context, listen: true)
//            .updateInfo(userEntity);
        loginEventBus.fire(LoginEvent(true,user: userEntity));
        Navigator.pop(context);
      }, (onFail) {
        print(onFail);
        _showToast(onFail);
      });
    } else {
      setState(() {
        _autovalidator = true;
      });
    }
  }

  _showToast(message) {
    Fluttertoast.showToast(
        msg: message,
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.CENTER,
        timeInSecForIosWeb: 1,
        backgroundColor: Colors.deepOrangeAccent,
        textColor: Colors.white,
        fontSize: ScreenUtil().setSp(28.0));
  }

  _saveUserInfo() async {
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    SharedPreferencesUtils.user = userEntity;
    String userjson=convert.jsonEncode(userEntity);
    await sharedPreferences.setString("user", userjson);
    // await sharedPreferences.setInt(Constants.TOKEN, userEntity.u_id);
    // await sharedPreferences.setString(
    //     Constants.AVATAR, userEntity.avatar);
    // await sharedPreferences.setString(
    //     Constants.NICKNAME, userEntity.u_nickname);
  }
}
