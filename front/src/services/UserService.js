import {postRequest} from "../util/ajax";
import {message} from "antd";
import {history} from "../util/history";
import {apiUrl} from '../constant';

// const apiUrl="http://localhost:8080";

export const login=(data)=>{
    const url=`${apiUrl}/login`;
    debugger;
    const callback = (data) => {
        debugger;
        if(data.status >= 0 && data.status!=500) {
            localStorage.setItem('user', JSON.stringify(data.datas));
            history.push("/");
            window.location="/";
            message.success(data.info);
        }
        else{
            if(data.info){
                message.error(data.info);
            }
            else{
                message.error("账户或密码错误！")
            }
        }
    };
    postRequest(url, data, callback);
}

export const logout=()=>{
    const url=`${apiUrl}/logout`;

    const callback=(data)=>{
        if(data.status==0){
            localStorage.removeItem("user");
             // history.push("/login");
            window.location="/login";
            message.success(data.info)
        }
        else {
            message.error(data.info);
        }
    };
    postRequest(url,{},callback);
}

export const checkSession=(callback)=>{
    const url = `${apiUrl}/checkSession`;
    postRequest(url, {}, callback);
}

export const register=(data)=>{
    const url=`${apiUrl}/register`;
    debugger;
    const callback = (data) => {
        debugger;
        if(data) {
            // localStorage.setItem('user', JSON.stringify(data.data));
            // history.push("/login");
            window.location="/login";
            message.success("注册成功");
        }
        else{
            message.error("注册失败，账号已存在或网络异常！");
        }
    };
    postRequest(url, data, callback);
}

export const upLoadAvatar=(data)=>{
    const url=`${apiUrl}/uploadAvatar`;

    const callback = (flag) => {
        if(flag) {
            // localStorage.setItem('user', JSON.stringify(data.data));
            // history.push("/login");
            // window.location="/login";
            message.success("上传成功！");
            let u=localStorage.getItem("user");
            let user=JSON.parse(u);
            user.avatar=data.avatar;
            debugger;
            localStorage.setItem("user",JSON.stringify(user));
        }
        else{
            message.error("上传失败！");
        }
    };
    postRequest(url, data, callback);
}
export const upLoadInfo=(data)=>{
    const url=`${apiUrl}/changeInfo`;

    const callback = (info) => {
        if(info!=null) {
            // localStorage.setItem('user', JSON.stringify(data.data));
            // history.push("/login");
            // window.location="/login";
            message.success("编辑成功！");
            let u=localStorage.getItem("user");
            let user=JSON.parse(u);
            user.u_nickname=data.u_nickname;
            user.u_phone=data.u_phone;
            user.u_email=data.u_email;
            user.u_gender=data.u_gender;
            debugger;
            localStorage.setItem("user",JSON.stringify(user));
        }
        else{
            message.error("上传失败！");
        }
    };
    postRequest(url, data, callback);
}
export const getUsers=(page, callback) => {
    const url = `${apiUrl}/getAllUsers`;
    postRequest(url,page, callback);
};
export const changeType=(json, callback) => {
    const url = `${apiUrl}//changeType`;
    postRequest(url,json, callback);
};
