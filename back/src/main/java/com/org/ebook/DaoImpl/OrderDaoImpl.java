package com.org.ebook.DaoImpl;

import com.org.ebook.Dao.OrderDao;
import com.org.ebook.Repository.AddressRepository;
import com.org.ebook.Repository.BookRepository;
import com.org.ebook.Repository.OrderItemRepository;
import com.org.ebook.Repository.OrderRepository;
import com.org.ebook.entity.Address;
import com.org.ebook.entity.OrderInfo;
import com.org.ebook.entity.OrderItem;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@Repository
public class OrderDaoImpl implements OrderDao {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    OrderItemRepository orderItemRepository;
    @Autowired
    AddressRepository addressRepository;
    @Autowired
    BookRepository bookRepository;
    @Override
    public OrderInfo saveOrd(OrderInfo orderInfo){
        return orderRepository.save(orderInfo);
    }
    @Override
    public void saveOrditem(OrderItem orderItem){
        System.out.println(orderItem);
        orderItemRepository.save(orderItem);
    }
    @Override
    public Address getOneAddress(Integer u_id, Integer a_id){
        return addressRepository.findByUser_idAndAddress_id(u_id, a_id);
    }
    @Override
    public Address getOneAddress(Integer a_id){
        return addressRepository.findByUser_idAndAddress_id(a_id);
    }
    @Override
    public Address saveAnAddr(Address address){
        return addressRepository.save(address);
    }
    @Override
    public Boolean updateStorenum(Integer b_id,Integer store_num){
        bookRepository.updateStorenum(b_id,store_num);
        return true;
    }
    @Override
    public List<OrderInfo> getOrderInfos(Integer u_id){
       return orderRepository.getOrdersbyUid(u_id);
//        return orderRepository.findInfos(u_id);
    }
    @Override
    public List<OrderInfo> getOrderInfos(){
        return orderRepository.getOrdersbyUid();
//        return orderRepository.findInfos(u_id);
    }
    @Override
    public List<OrderItem> getOrderItems(Integer ord_id){
        return orderItemRepository.getOrderItemsByOrd_id(ord_id);
    }
    @Override
    public List<Map<String,Object>> findOrderItems(Integer ord_id){return orderItemRepository.findOrderItemsByOrd_id(ord_id);}
    @Override
    public List<OrderInfo> getOrderInfosByTime(Integer u_id, Timestamp early, Timestamp later){
        return orderRepository.getOrdersByUser_idAndTime(u_id, early, later);
    }
    @Override
    public List<OrderInfo> getOrderInfosByTime( Timestamp early, Timestamp later){
        return orderRepository.getOrdersByUser_idAndTime( early, later);
    }
    @Override
    public List<OrderItem> getOrderItemsByb_id(Integer b_id){
        return orderItemRepository.getOrderItemsByOrd_idAndB_id( b_id);
    }
    @Override
    public List<OrderInfo> findByOrd_id(Integer u_id,List<Integer> ord_ids){
        return orderRepository.findByOrd_id(u_id,ord_ids);
    }
    @Override
    public List<OrderInfo> findByOrd_id(List<Integer> ord_ids){
//        System.out.println("in search key Dao"+ord_ids);
        return orderRepository.findByOrd_id(ord_ids);
    }

    @Override
    public List<Map<String,Object>> getTopSellerTotal(Integer num){
        return orderRepository.getTopTotal(num);
    }
    @Override
    public List<Map<String,Object>> getTopSellerPeriod(Integer num,Timestamp early,Timestamp later){
        return orderRepository.getTopPeriod(num,early,later);
    }
    @Override
    public List<Integer> getOrd_idsByB_id(List<Integer> b_ids){
        return orderItemRepository.getOrd_idsByB_id(b_ids);
    }

    @Override
    public  List<Map<String,Object>> getTopConsume(Integer num,Timestamp early,Timestamp later){
        return orderRepository.getTopConsume( num, early, later);
    }
    @Override
    public  List<Map<String,Object>> getTopConsume(Integer num){
        return orderRepository.getTopConsume(num);
    }
    @Override
    public List<Map<String,Object>> getPersonalConsume(Integer u_id,Timestamp early,Timestamp later){
        return orderRepository.getPersonalConsume(u_id, early, later);
    }
}
