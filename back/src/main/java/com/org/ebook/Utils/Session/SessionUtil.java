package com.org.ebook.Utils.Session;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.util.Iterator;

import static com.org.ebook.Constant.Constant.*;

public class SessionUtil {

    public static Boolean IFadmin(){
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if(requestAttributes!=null){
            HttpServletRequest httpServletRequest=requestAttributes.getRequest();
            HttpSession httpSession=httpServletRequest.getSession();

            if(httpSession!=null){
                Integer u_type=(Integer) httpSession.getAttribute(USER_TYPE);
                //u_type>0 表示用户为管理员
                return u_type!=null && u_type>0;
            }
        }
        return false;
    }

    public static JSONObject getUser() throws JSONException {
        ServletRequestAttributes requestAttributes=(ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if(requestAttributes!=null){
            HttpServletRequest httpServletRequest=requestAttributes.getRequest();
            HttpSession httpSession=httpServletRequest.getSession();

            if(httpSession!=null){
                JSONObject result=new JSONObject();
                result.put(USER_ID, (Integer)httpSession.getAttribute(USER_ID));
                result.put(USERNAME,(String)httpSession.getAttribute(USERNAME));
                result.put(USER_TYPE,(Integer)httpSession.getAttribute(USER_TYPE));
                result.put(AVATAR,(String)httpSession.getAttribute(AVATAR));
                return result;
            }
        }
        return null;
    }

    public static void setSesison(JSONObject datas) throws JSONException {
        ServletRequestAttributes requestAttributes=(ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if(requestAttributes!=null) {
            System.out.println(requestAttributes);
            HttpServletRequest httpServletRequest = requestAttributes.getRequest();
            HttpSession httpSession = httpServletRequest.getSession();
            for(Iterator iterator=datas.keys();iterator.hasNext();){
                String key=(String)iterator.next();
                Object value=datas.get(key);
                httpSession.setAttribute(key,value);
            }
        }
    }

    public static Boolean removeSession(){
        ServletRequestAttributes requestAttributes=(ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if(requestAttributes!=null) {
            HttpServletRequest httpServletRequest = requestAttributes.getRequest();
            HttpSession httpSession = httpServletRequest.getSession();

            if(httpSession!=null){
                httpSession.invalidate();
            }
        }
        return true;
    }
}
