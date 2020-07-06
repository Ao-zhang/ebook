package com.org.ebook.Utils.Message;


import net.sf.json.JSONObject;

public class MessageUtil {
    public static final Integer SUCCESS = 0;
    public static final Integer ERROR = -1;
    public static final Integer LOGIN_ERROR = -100;
    public static final Integer NOT_LOGGED_ERROR = -101;

    public static final String SUCCESS_INFO = "成功！";
    public static final String LOGIN_SUCCESS_INFO = "登录成功！";
    public static final String LOGIN_USER_FORBIDDEN_INFO = "您的账户已经被禁用！";
    public static final String LOGOUT_SUCCESS_INFO = "登出成功！";
    public static final String LOGOUT_ERR_INFO = "登出异常！";
    public static final String ERROR_INFO = "错误！";
    public static final String LOGIN_USER_ERROR_INFO = "用户名或密码错误，请重新输入！";
    public static final String NOT_LOGGED_IN_ERROR_INFO = "登录失效，请重新登录！";

    public static Message makeMessage(MessageCode code, JSONObject data){
        return new Message(code,data);
    }
    public static Message makeMessage(MessageCode code, String info, JSONObject data){
        return new Message(code,info,data);
    }
    public static Message makeMessage(MessageCode code){
        return new Message(code);
    }
    public static Message makeMessage(MessageCode code,  String info){
        return new Message(code,info);
    }
}
