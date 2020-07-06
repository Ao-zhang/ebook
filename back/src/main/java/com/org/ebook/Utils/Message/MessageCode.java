package com.org.ebook.Utils.Message;

public enum MessageCode {
    SUCCESS(MessageUtil.SUCCESS,MessageUtil.SUCCESS_INFO),
    ERROR(MessageUtil.ERROR,MessageUtil.ERROR_INFO),
    LOGIN_ERROR(MessageUtil.LOGIN_ERROR,MessageUtil.LOGIN_USER_ERROR_INFO),
    LOGIN_FORBIDDEN(MessageUtil.LOGIN_ERROR,MessageUtil.LOGIN_USER_FORBIDDEN_INFO),
    NOT_LOGGED_ERROR(MessageUtil.NOT_LOGGED_ERROR,MessageUtil.NOT_LOGGED_IN_ERROR_INFO),
    LOGIN_SUCCESS(MessageUtil.SUCCESS,MessageUtil.LOGIN_SUCCESS_INFO),
    LOGOUT_SUCCESS(MessageUtil.SUCCESS,MessageUtil.LOGOUT_SUCCESS_INFO),
    LOGOUT_ERROR(MessageUtil.ERROR,MessageUtil.LOGOUT_ERR_INFO);


    private Integer status;
    private String info;

    public Integer getStatus(){return status;}

    public String getInfo() {
        return info;
    }
    private MessageCode(Integer status,String info){
        this.status=status;
        this.info=info;
    }
}
