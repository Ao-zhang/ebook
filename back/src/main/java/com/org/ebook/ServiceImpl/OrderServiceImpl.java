package com.org.ebook.ServiceImpl;

import com.org.ebook.Dao.OrderDao;
import com.org.ebook.Service.OrderService;
import com.org.ebook.entity.Address;
import com.org.ebook.entity.OrderInfo;
import com.org.ebook.entity.OrderItem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;


@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderDao orderDao;
    @Override
    public OrderInfo saveOrd(OrderInfo orderInfo){
        return orderDao.saveOrd(orderInfo);
    }
    @Override
    public void saveOrditem(OrderItem orderItem){
        orderDao.saveOrditem(orderItem);
    }
    @Override
    public Address getOneAddress(Integer u_id, Integer a_id){
        return orderDao.getOneAddress(u_id, a_id);
    }
    @Override
    public Address getOneAddress( Integer a_id){
        return orderDao.getOneAddress(a_id);
    }
    @Override
    public Address saveAnAddr(Address address){
        return orderDao.saveAnAddr(address);
    }
    @Override
    public Boolean updateStorenum(Integer b_id,Integer store_num){
        return orderDao.updateStorenum(b_id, store_num);
    }
    @Override
    public List<OrderInfo> getOrderInfos(Integer u_id){
        return orderDao.getOrderInfos(u_id);
    }
    @Override
    public List<OrderInfo> getOrderInfos(){
        return orderDao.getOrderInfos();
    }
    @Override
    public List<OrderItem> getOrderItems(Integer ord_id){
        return orderDao.getOrderItems(ord_id);
    }
    @Override
    public List<Map<String,Object>> findOrderItems(Integer ord_id){return orderDao.findOrderItems(ord_id);}
    @Override
    public List<OrderInfo> getOrderInfosByTime(Integer u_id, Timestamp early, Timestamp later){
        return orderDao.getOrderInfosByTime(u_id, early, later);
    }
    @Override
    public List<OrderInfo> getOrderInfosByTime( Timestamp early, Timestamp later){
        return orderDao.getOrderInfosByTime( early, later);
    }
    @Override
    public List<OrderItem> getOrderItemsByb_id(Integer b_id){
        return orderDao.getOrderItemsByb_id( b_id);
    }
    @Override
    public List<OrderInfo> findByOrd_id(Integer u_id,List<Integer> ord_ids){
        System.out.println("in search ket Service ");
        return orderDao.findByOrd_id(u_id, ord_ids);
    }
    @Override
    public List<OrderInfo> findByOrd_id(List<Integer> ord_ids){
//        System.out.println("in search ket Service ");
        return orderDao.findByOrd_id( ord_ids);
    }
    @Override
    public List<Map<String,Object>> getTopSellerTotal(Integer num){ return orderDao.getTopSellerTotal(num); }
    @Override
    public List<Map<String,Object>> getTopSellerPeriod(Integer num,Timestamp early,Timestamp later){
        return orderDao.getTopSellerPeriod(num,early,later);
    }
    @Override
    public List<Integer> getOrd_idsByB_id(List<Integer> b_ids){
        return orderDao.getOrd_idsByB_id(b_ids);
    }
    @Override
    public  List<Map<String,Object>> getTopConsume(Integer num,Timestamp early,Timestamp later){
        return orderDao.getTopConsume( num, early, later);
    }
    @Override
    public  List<Map<String,Object>> getTopConsume(Integer num){
        return orderDao.getTopConsume( num);
    }
    @Override
    public List<Map<String,Object>> getPersonalConsume(Integer u_id,Timestamp early,Timestamp later){
        return orderDao.getPersonalConsume(u_id, early, later);
    }
}
