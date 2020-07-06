package com.org.ebook.Controller;

import com.org.ebook.Service.BookService;
import com.org.ebook.Service.CartService;
import com.org.ebook.Service.OrderService;
import com.org.ebook.Service.UserService;
import com.org.ebook.Utils.Session.SessionUtil;
import com.org.ebook.entity.*;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;

import static com.org.ebook.Constant.Constant.*;

@RestController
public class OrderController {
    @Autowired
    OrderService orderService;

    @Autowired
    CartService cartService;

    @Autowired
    UserService userService;

    @Autowired
    BookService bookService;

    @RequestMapping("/buy")
//    public Boolean saveorder(@RequestBody Map<String,Object> params){
    public Boolean saveorder(@RequestBody JSONObject params){
        System.out.println("save an order");
        System.out.println("params:"+params);

        JSONObject addr=JSONObject.fromObject(params.get("address")) ;
        JSONObject oinfo=JSONObject.fromObject(params.get("ordinfo")) ;
        JSONArray items=JSONArray.fromObject(params.get(ORDITEMS));//orditems
//address
        System.out.println("save address");
        Address newaddr=new Address();
        newaddr.setCon_name(addr.getString("con_name"));
        newaddr.setCon_phone(addr.getString("con_phone"));
        newaddr.setProvince(addr.getString("province"));
        newaddr.setCity(addr.getString("city"));
        newaddr.setTown(addr.getString("town"));
        newaddr.setStreet(addr.getString("street"));
        newaddr.setDetail_info(addr.getString("detail_info"));
        newaddr.setU_id(addr.getInt("u_id"));



        Address readdr=orderService.saveAnAddr(newaddr);
        Integer addr_id=readdr.getAddr_id();
        System.out.println(readdr);
        System.out.println(addr_id);
//ordinfo
        System.out.println("save order infomation");
        Date date = new Date();
        Timestamp nousedate = new Timestamp(date.getTime());
        OrderInfo orderInfo=new OrderInfo();
        orderInfo.setOrd_time(nousedate);
        orderInfo.setAddr_id(addr_id);
        orderInfo.setU_id(newaddr.getU_id());
        orderInfo.setComment(oinfo.getString("comment"));
        orderInfo.setStatus(0);
        orderInfo.setTot_cost(oinfo.getDouble("tot_cost"));
        System.out.println(orderInfo);
        OrderInfo reorderInfo=orderService.saveOrd(orderInfo);
        Integer ord_id=reorderInfo.getOrd_id();
        System.out.println(reorderInfo);
//orderitems
        System.out.println("save orderitems");
        Iterator<JSONObject> it = items.iterator();
        while(it.hasNext()){
            JSONObject item=it.next();
            System.out.println(item);
            Integer b_id=item.getInt(BOOK_ID);
            Integer book_num=item.getInt(BOOK_NUM);
            Integer rest_num=item.getInt("rest_num");
            System.out.println("rest_num:" +rest_num);
            OrderItem oritem=new OrderItem(ord_id,b_id,book_num);
            orderService.saveOrditem(oritem);
            orderService.updateStorenum(b_id,rest_num);
        }
        //清空购物车
        cartService.deleteCartbyUid(newaddr.getU_id());
        return true;

    }

    //提供用户id，找出其购物车信息
    @RequestMapping("/getcart")
    public List<Cart> getCart(@RequestBody Map<String, Integer> param){
        System.out.println("get one's chart");
        Integer u_id=param.get("u_id");
        return cartService.getCart(u_id);
    }

//for web front ,wx can't get session
    @RequestMapping("/addCarts")
    public  Boolean addCart(@RequestBody List<Cart> params){
        System.out.println("in addCarts");
        JSONObject user=SessionUtil.getUser();
        System.out.println(user);
        Integer u_id=user.getInt(USER_ID);
        cartService.deleteCartbyUid(u_id);
        for (Integer i=0;i<params.size();i++) {
            Cart cart=params.get(i);
            System.out.println(cart);
            cartService.addCart(cart);
        }
        return true;
    }
//for wx and mobile
    @RequestMapping("/addToCarts")
    public  Boolean addCart(@RequestBody JSONObject params){
        System.out.println("in addCarts");
        Integer u_id=Integer.valueOf(params.getInt(USER_ID));
        cartService.deleteCartbyUid(u_id);
        JSONArray carts=params.getJSONArray("cart");
//        List<String> carts=Arrays.asList(params.get("cart").split(","));
        System.out.println(carts);
        for (Integer i=0;i<carts.size();i++) {
            JSONObject c= JSONObject.fromObject(carts.get(i)) ;
            System.out.println(c);
            Cart cart=(Cart)JSONObject.toBean(c,Cart.class);
            System.out.println(cart);
            cartService.addCart(cart);
        }
        return true;
    }

    @RequestMapping("/getChoosedAddress")
    public Address getAnAddress(@RequestBody Map<String,Integer> params){
        Integer u_id=params.get(USER_ID);//u_id
        Integer a_id=params.get(ADDRESSID);//address_id
        return orderService.getOneAddress(u_id,a_id);
    }

    @RequestMapping("/getOrders")
    public JSONArray getOrderByUid(@RequestBody Map<String,String> params){
        String uid=params.get(USER_ID);
        Integer u_id=0;
        if(uid!=null){
            u_id=Integer.valueOf(uid);
        }
        //u_id
        String keyword=params.get("keyword");
        String time1=params.get("early");
        String time2=params.get("later");
        JSONArray result=new JSONArray();
        Timestamp early=null,later=null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if(time1!=null){
            try {
                Date t1 = sdf.parse(time1);
                early=new Timestamp(t1.getTime());
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        if(time2!=null){
            try {
                Date t2 = sdf.parse(time2);
                later=new Timestamp(t2.getTime());
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        if(early!=null || later!=null){
            System.out.println("通过时间查找"+early+" "+later);
            if(early==null){
                early=new Timestamp(1999,12,31,0,0,0,0);
            }
            if(later==null){
                Date date = new Date();
                later=new Timestamp(date.getTime());
            }
            List<OrderInfo> orderInfos=u_id!=0? orderService.getOrderInfosByTime(u_id,early,later):orderService.getOrderInfosByTime(early,later);
            for(int i=0;i<orderInfos.size();i++){
                OrderInfo info=orderInfos.get(i);
                Integer ord_id=info.getOrd_id();
                Integer addr_id=info.getAddr_id();
//                List<OrderItem> items=orderService.getOrderItems(ord_id);
                List<Map<String,Object>> items=orderService.findOrderItems(ord_id);
                Address address=u_id!=0?orderService.getOneAddress(u_id,addr_id):orderService.getOneAddress(addr_id);
//                JSONArray newitems=JSONArray.fromObject(items);
                JSONObject object=new JSONObject();
                object.put("address",address);
                object.put("orditems",items);
                object.put("orderinfo",info);
                result.add(object);
            }
            return result;
        }
        else if(keyword!=null && keyword!=""){
            System.out.println("find by keyword  "+keyword);
            Pageable pageable= PageRequest.of(0,20, Sort.by(Sort.Direction.ASC,"b_id"));
//            List<Book> books=bookService.searchBooks(pageable,keyword).getContent();
            List<Integer> b_ids=bookService.searchBooksByTitle(keyword);
            List<Integer> ord_ids=orderService.getOrd_idsByB_id(b_ids);
            System.out.println("ord_ids: "+ord_ids);
            List<OrderInfo> orderInfos=u_id!=0?orderService.findByOrd_id(u_id,ord_ids):orderService.findByOrd_id(ord_ids);
            System.out.println(orderInfos);
            for(int i=0;i<orderInfos.size();i++){
                OrderInfo info=orderInfos.get(i);
                Integer ord_id=info.getOrd_id();
                Integer addr_id=info.getAddr_id();
//                List<OrderItem> items=orderService.getOrderItems(ord_id);
                List<Map<String,Object>> items=orderService.findOrderItems(ord_id);
                System.out.println(items);
                Address address=u_id!=0?orderService.getOneAddress(u_id,addr_id):orderService.getOneAddress(addr_id);
                System.out.println(address);
//                JSONArray newitems=JSONArray.fromObject(items);
                JSONObject object=new JSONObject();
                object.put("address",address);
                object.put("orditems",items);
                object.put("orderinfo",info);
                result.add(object);
            }
            return result;
        }
        else{
            System.out.println("find by u_id");
            List<OrderInfo> orderInfos=u_id!=0?orderService.getOrderInfos(u_id):orderService.getOrderInfos();
            for(int i=0;i<orderInfos.size();i++){
                OrderInfo info=orderInfos.get(i);
                Integer ord_id=info.getOrd_id();
                Integer addr_id=info.getAddr_id();
//                List<OrderItem> items=orderService.getOrderItems(ord_id);
                List<Map<String,Object>> items=orderService.findOrderItems(ord_id);
                Address address=u_id!=0?orderService.getOneAddress(u_id,addr_id):orderService.getOneAddress(addr_id);
//                JSONArray newitems=JSONArray.fromObject(items);
                JSONObject object=new JSONObject();
                object.put("address",address);
                object.put("orditems",items);
                object.put("orderinfo",info);
                result.add(object);
            }
            return result;
        }
//
    }

    @RequestMapping("/getTopSeller")
    public JSONArray getTopSeller(@RequestBody Map<String,String> params){
        String n=params.get("num");
        String time1=params.get("early");
        String time2=params.get("later");
        Integer num=7;//default case
        JSONArray result;
        if(n!=null){
            num=Integer.valueOf(n);
        }
        Timestamp early=null,later=null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if(time1!=null){
            try {
                Date t1 = sdf.parse(time1);
                early=new Timestamp(t1.getTime());
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        if(time2!=null){
            try {
                Date t2 = sdf.parse(time2);
                later=new Timestamp(t2.getTime());
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        if(early!=null || later!=null){
            System.out.println("通过时间查找"+early+" "+later);
            if(early==null){
                early=new Timestamp(1999,12,31,0,0,0,0);
            }
            if(later==null){
                Date date = new Date();
                later=new Timestamp(date.getTime());
            }
            result=JSONArray.fromObject(orderService.getTopSellerPeriod(num,early,later));
        }
        else result= JSONArray.fromObject(orderService.getTopSellerTotal(num));

//        JSONArray result= JSONArray.fromObject(orderService.getTopSellerTotal(num));

        return result;
    }

//    @RequestMapping("/getTopSellerPeriod")
//    public JSONArray getTopSellerPeriod(@RequestBody Map<String,String> params){
//        String time1=params.get("early");
//        String time2=params.get("later");
//        Integer num=Integer.valueOf(params.get("num"));
//        Timestamp early=null,later=null;
//        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//        if(time1!=null){
//            try {
//                Date t1 = sdf.parse(time1);
//                early=new Timestamp(t1.getTime());
//            } catch (ParseException e) {
//                e.printStackTrace();
//            }
//        }
//        if(time2!=null){
//            try {
//                Date t2 = sdf.parse(time2);
//                later=new Timestamp(t2.getTime());
//            } catch (ParseException e) {
//                e.printStackTrace();
//            }
//        }
//
//        if(early!=null || later!=null){
//            System.out.println("通过时间查找"+early+" "+later);
//            if(early==null){
//                early=new Timestamp(1999,12,31,0,0,0,0);
//            }
//            if(later==null){
//                Date date = new Date();
//                later=new Timestamp(date.getTime());
//            }
//        }
//        JSONArray array=JSONArray.fromObject(orderService.getTopSellerPeriod(num,early,later));
//        return array;
//    }

    @RequestMapping("/getTopConsume")
    public JSONArray getTopConsume(@RequestBody Map<String,String> params){
        String n=params.get("num");
        String time1=params.get("early");
        String time2=params.get("later");
        Integer num=7;//default case
        JSONArray result;
        if(n!=null){
            num=Integer.valueOf(n);
        }
        Timestamp early=null,later=null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if(time1!=null){
            try {
                Date t1 = sdf.parse(time1);
                early=new Timestamp(t1.getTime());
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        if(time2!=null){
            try {
                Date t2 = sdf.parse(time2);
                later=new Timestamp(t2.getTime());
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        if(early!=null || later!=null){
            System.out.println("通过时间查找"+early+" "+later);
            if(early==null){
                early=new Timestamp(1999,12,31,0,0,0,0);
            }
            if(later==null){
                Date date = new Date();
                later=new Timestamp(date.getTime());
            }
            result=JSONArray.fromObject(orderService.getTopConsume(num,early,later));
        }
        else result= JSONArray.fromObject(orderService.getTopConsume(num));


        return result;
    }
    @RequestMapping("/getPersonalConsume")
    public JSONArray getPersonalConsume(@RequestBody Map<String,String> params){
        String time1=params.get("early");
        String time2=params.get("later");
        Integer u_id=Integer.valueOf(params.get(USER_ID));
        JSONArray result;

        Timestamp early=null,later=null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if(time1!=null){
            try {
                Date t1 = sdf.parse(time1);
                early=new Timestamp(t1.getTime());
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        if(time2!=null){
            try {
                Date t2 = sdf.parse(time2);
                later=new Timestamp(t2.getTime());
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        if(early==null){
            Date date = new Date();
            Calendar c = Calendar.getInstance();
            c.setTime(date);
            c.add(Calendar.MONTH,-1);//一个月前
            date=c.getTime();
            early=new Timestamp(date.getTime());
        }
        if(later==null){
            Date date = new Date();
            later=new Timestamp(date.getTime());
        }
        System.out.println("搜索时间范围： early "+early+" later "+later);

        result= JSONArray.fromObject(orderService.getPersonalConsume(u_id,early,later));


        return result;
    }

}
