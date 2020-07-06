package com.org.ebook.Controller;

import com.org.ebook.Service.CartService;
import com.org.ebook.Service.UserService;
import com.org.ebook.Utils.Message.Message;
import com.org.ebook.Utils.Message.MessageCode;
import com.org.ebook.Utils.Message.MessageUtil;
import com.org.ebook.Utils.Session.SessionUtil;
import com.org.ebook.entity.*;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.print.DocFlavor.STRING;

import static com.org.ebook.Constant.Constant.*;


@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private CartService cartService;

    @RequestMapping("/checkuser")
    public User checkuser(@RequestParam("u_name")String u_name,@RequestParam("u_password")String u_password){
        System.out.println("check user");
        System.out.println("name: "+u_name+" password: "+u_password );
        return userService.checkuser(u_name,u_password);
    }

    @RequestMapping("/register")
//    public Boolean register(@RequestBody User user){
    public Boolean register(@RequestBody Map<String,String> params){
        System.out.println("register");
        User user=new User();
        for(String key:params.keySet()){
            switch (key){
                case USERNAME:user.setU_name(params.get(key));
                        break;
                case PASSWORD:user.setU_password(params.get(key)); break;
                //case USER_TYPE:user.setU_type(Integer.valueOf(params.get(key))); break;
                case NICKNAME:user.setU_nickname(params.get(key)); break;
                case USERGENDER:user.setU_gender(params.get(key)); break;
                case PHONENUMBER:user.setU_phone(params.get(key)); break;
                case E_MAIL:user.setU_email(params.get(key)); break;
                default:
                    break;
            }
        }
        user.setU_type(0);//register type =0,represent normal user

        System.out.println(user);
        return userService.register(user);
    }

    @RequestMapping("/login")
    public Message login(@RequestBody Map<String,String> params) throws JSONException {
        System.out.println("log in");
        String u_name=params.get(USERNAME);
        String u_password=params.get(PASSWORD);
        System.out.println("name: "+u_name+" password: "+u_password );
        User cur_user=userService.checkuser(u_name,u_password);
        
        if(cur_user!=null ){//用户存在
            System.out.println(cur_user);
            //用户被禁用了
            if(cur_user.getU_type()<0){
                return MessageUtil.makeMessage(MessageCode.LOGIN_FORBIDDEN);
            }
            if(cur_user.getAvatar()==null){
                UserAvatar fakeavatar=new UserAvatar();
                fakeavatar.setId(cur_user.getU_id());
                fakeavatar.setIcon(null);
                cur_user.setAvatar(fakeavatar);
            }
            List<Cart> cart=cartService.getCart(cur_user.getU_id());
            if(cart.size()>0){
                cur_user.setCarts(cart);
            }
            JSONObject data=JSONObject.fromObject(cur_user);
            //返回数据去除密码
            data.remove(PASSWORD);

            JSONObject object1=data.getJSONObject(AVATAR);
            data.remove(AVATAR);
            data.put(AVATAR,object1.get("icon"));

            SessionUtil.setSesison(data);
            return MessageUtil.makeMessage(MessageCode.SUCCESS,MessageUtil.LOGIN_SUCCESS_INFO,data);
        }
        //用户不存在
        return MessageUtil.makeMessage(MessageCode.LOGIN_ERROR);
    }

    @RequestMapping("/logout")
    public Message logout(){
        System.out.println("log out");
        Boolean status=SessionUtil.removeSession();
        if(status){
            return MessageUtil.makeMessage(MessageCode.SUCCESS,MessageUtil.LOGOUT_SUCCESS_INFO);
        }
        return MessageUtil.makeMessage(MessageCode.ERROR,MessageUtil.LOGOUT_ERR_INFO);
    }

    @RequestMapping("/checkSession")
    public Message checkSession(){
        System.out.println("check session");
        JSONObject user=SessionUtil.getUser();

        if(user.size()==0){
            return MessageUtil.makeMessage(MessageCode.NOT_LOGGED_ERROR);
        }
        return MessageUtil.makeMessage(MessageCode.SUCCESS,MessageUtil.LOGIN_SUCCESS_INFO,user);
    }

    @RequestMapping("/changeType")
    public Boolean changeUserType(@RequestBody Map<String,String> params) {
        System.out.println("change type");
        Integer u_id=Integer.valueOf(params.get(USER_ID)) ;
        Integer u_type=Integer.valueOf(params.get(USER_TYPE));
        System.out.println("id is "+u_id+" and type is "+u_type);

        return userService.changeType(u_type, u_id);
    }
    @RequestMapping("/changeInfo")
    public JSONObject changeInfo(@RequestBody Map<String,String> params){
        System.out.println("change info");
        Integer u_id=Integer.valueOf(params.get(USER_ID));
        String u_phone=params.get(PHONENUMBER);
        String u_email=params.get(E_MAIL);
        String u_nickname=params.get(NICKNAME);
        String u_gender=params.get(USERGENDER);
        User user=userService.changeInfo(u_nickname, u_phone, u_email, u_gender, u_id);
        JSONObject userinfo=new JSONObject();
        userinfo.put(NICKNAME, user.getU_nickname());
        userinfo.put(PHONENUMBER,user.getU_phone());
        userinfo.put(E_MAIL,user.getU_email());
        userinfo.put(USERGENDER,user.getU_gender());
        return userinfo;
    }

    @RequestMapping("/uploadAvatar")
    public Boolean UpAvatar(@RequestBody Map<String,String> params){
        System.out.println("upload Avatar");
        Integer u_id=Integer.valueOf(params.get(USER_ID));
        String avatar=params.get(AVATAR);
        UserAvatar n_avatar=userService.UpAvatar(u_id,avatar);
        if(n_avatar!=null) return true;
        else return false;
    }
    @RequestMapping("/getDefAddress")
    public Address getdefaddress(@RequestBody Map<String,String> params){
        System.out.println("get default address");
        Integer u_id=Integer.valueOf(params.get(USER_ID));
        Integer addr_id=Integer.valueOf(params.get(ADDRESSID));
        AddressID addressid=new AddressID();
        addressid.setU_id(u_id);
        addressid.setAddr_id(addr_id);
        return userService.getDefAddr(addressid);
    }
    @RequestMapping("/getAddresses")
    public List<Address> getaddresses(@RequestBody Map<String,String> params){
        System.out.println("get  addresses");
        Integer u_id=Integer.valueOf(params.get(USER_ID));
        return userService.getAddrsByUid(u_id);
    }
    @RequestMapping("/getAllUsers")
    public List<User>  getallUsers(@RequestBody Map<String,Integer> params){
        System.out.println("get all users");
        Integer PageNum=params.get("pagenum");
        Integer PageContentNum=params.get("size");
        if(PageNum<=0||PageContentNum<=0){
            PageNum=1;
            PageContentNum=12;
        }
        Pageable pageable= PageRequest.of(PageNum-1,PageContentNum,Sort.by(Sort.Direction.ASC,"u_id"));
        return userService.getallUsers(pageable).getContent();
    }



}
