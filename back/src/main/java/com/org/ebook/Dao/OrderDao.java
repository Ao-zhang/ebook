package com.org.ebook.Dao;

import com.org.ebook.entity.Address;
import com.org.ebook.entity.OrderInfo;
import com.org.ebook.entity.OrderItem;
import net.sf.json.JSONArray;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

public interface OrderDao {
    OrderInfo saveOrd(OrderInfo orderInfo);
    void saveOrditem(OrderItem orderItem);
    Address getOneAddress(Integer u_id,Integer a_id);
    Address getOneAddress(Integer a_id);
    List<OrderInfo> getOrderInfos(Integer u_id);
    List<OrderInfo> getOrderInfos();
    List<OrderInfo> getOrderInfosByTime(Integer u_id, Timestamp early,Timestamp later);
    List<OrderInfo> getOrderInfosByTime( Timestamp early, Timestamp later);
    List<OrderItem> getOrderItemsByb_id(Integer b_id);
    List<OrderItem> getOrderItems(Integer ord_id);
    List<Map<String,Object>> findOrderItems(Integer ord_id);
    List<OrderInfo> findByOrd_id(Integer u_id,List<Integer> ord_ids);
    List<OrderInfo> findByOrd_id(List<Integer> ord_ids);
    Address saveAnAddr(Address address);
    Boolean updateStorenum(Integer b_id,Integer store_num);
    List<Map<String,Object>> getTopSellerTotal(Integer num);
    List<Map<String,Object>> getTopSellerPeriod(Integer num,Timestamp early,Timestamp later);
    List<Integer> getOrd_idsByB_id(List<Integer> b_ids);
    List<Map<String,Object>> getTopConsume(Integer num,Timestamp early,Timestamp later);
    List<Map<String,Object>> getTopConsume(Integer num);
    List<Map<String,Object>> getPersonalConsume(Integer u_id,Timestamp early,Timestamp later);
}
