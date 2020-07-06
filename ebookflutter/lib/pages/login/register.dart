import 'package:ebookflutter/constant/constants.dart';
import 'package:ebookflutter/service/user_service.dart';
import 'package:ebookflutter/util/navigator_util.dart';
import 'package:ebookflutter/widgets/ebook_icon.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:fluttertoast/fluttertoast.dart';

class RegisterView extends StatefulWidget {
  @override
  _RegisterViewState createState() => _RegisterViewState();
}

class _RegisterViewState extends State<RegisterView> {
  TextEditingController _accountTextControl = TextEditingController();
  TextEditingController _passwordTextControl = TextEditingController();
  TextEditingController _nicknameTextControl = TextEditingController();
  TextEditingController _genderTextControl = TextEditingController();
  TextEditingController _phoneTextControl = TextEditingController();
  TextEditingController _emailTextControl = TextEditingController();
  UserService userService = UserService();
  bool _autovalidator = false;
  final registerFormKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.deepOrangeAccent,
      body: SafeArea(
          child: Container(
        child: Center(
          child: Container(
            margin: EdgeInsets.fromLTRB(
                ScreenUtil().setWidth(30.0), 0, ScreenUtil().setWidth(30.0), 0),
            height: ScreenUtil().setHeight(700.0),
            decoration: BoxDecoration(
                color: Colors.white, borderRadius: BorderRadius.circular(10.0)),
            child: Form(
              key: registerFormKey,
              child: Column(
                children: <Widget>[
                  Padding(
                      padding: EdgeInsets.only(
                          top: ScreenUtil().setHeight(60.0))),
                  Container(
                    margin: EdgeInsets.all(ScreenUtil().setWidth(30.0)),
                    child: TextFormField(
                      maxLines: 1,
                      maxLength: 11,
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
                    margin: EdgeInsets.all(ScreenUtil().setWidth(30.0)),
                    child: TextFormField(
                      maxLines: 1,
                      maxLength: 12,
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
                    margin: EdgeInsets.all(ScreenUtil().setWidth(30.0)),
                    child: TextFormField(
                      maxLines: 1,
                      maxLength: 12,
                      autovalidate: _autovalidator,
                      validator: __validatornickname,
                      decoration: InputDecoration(
                        // icon: Icon(
                        //   EbookIcon.,
                        //   color: Colors.deepOrangeAccent,
                        //   size: ScreenUtil().setWidth(60.0),
                        // ),
                        hintText: Constants.PASSWORD_HINT,
                        hintStyle: TextStyle(
                            color: Colors.grey,
                            fontSize: ScreenUtil().setSp(28.0)),
                        labelStyle: TextStyle(
                            color: Colors.black54,
                            fontSize: ScreenUtil().setSp(28.0)),
                        labelText: Constants.PASSWORD,
                      ),
                      controller: _nicknameTextControl,
                    ),
                  ),

                  //--------------------------more need to add
                  Container(
                      margin:
                          EdgeInsets.all(ScreenUtil().setWidth(30.0)),
                      child: SizedBox(
                        height: ScreenUtil().setHeight(80.0),
                        width: ScreenUtil().setWidth(600.0),
                        child: RaisedButton(
                          onPressed: _register,
                          color: Colors.deepOrangeAccent,
                          child: Text(
                            Constants.REGISTER,
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: ScreenUtil().setSp(28.0)),
                          ),
                        ),
                      )),
                ],
              ),
            ),
          ),
//
        ),
      )),
    );
  }

  String _validatorAccount(String value) {
    if (value == null || value.length < 5) {
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

  String __validatornickname(String value){
    if(value==null)
      return _accountTextControl.text.toString();
    else if(value.length>12)
      return Constants.OVERFLOW;
  }

  _showToast(String message) {
    Fluttertoast.showToast(
        msg: message,
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.CENTER,
        timeInSecForIosWeb: 1,
        backgroundColor: Colors.deepOrangeAccent,
        textColor: Colors.white,
        fontSize: ScreenUtil().setSp(28.0));
  }

  _register() {
    if (registerFormKey.currentState.validate()) {
      registerFormKey.currentState.save();
      Map<String, dynamic> map = Map();
      map.putIfAbsent("u_name", () => _accountTextControl.text.toString());
      map.putIfAbsent("u_password", () => _passwordTextControl.text.toString());
      map.putIfAbsent("u_nickname", () => _nicknameTextControl.text.toString());

      userService.register(map, (success) {
        print(success);
        _showToast(Constants.REGISTER_SUCCESS);
        NavigatorUtils.popRegister(context);
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
}
