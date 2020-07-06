package com.org.ebook.Utils.Message;

import net.sf.json.JSONObject;

public class Message {
    private Integer status;
    private String info;
    private JSONObject datas;

    Message(MessageCode code,JSONObject data){
        this.status=code.getStatus();
        this.info=code.getInfo();
        this.datas=data;
    }

    Message(MessageCode code,String extra,JSONObject data){
        this.status=code.getStatus();
        this.info=extra;
        this.datas=data;
    }

    Message(MessageCode code){
        this.status=code.getStatus();
        this.info=code.getInfo();
        this.datas=null;
    }

    Message(MessageCode code,String extra){
        this.status=code.getStatus();
        this.info=extra;
        this.datas=null;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public JSONObject getDatas() {
        return datas;
    }

    public void setDatas(JSONObject datas) {
        this.datas = datas;
    }
}
