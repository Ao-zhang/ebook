package com.org.ebook.Repository;

import com.org.ebook.entity.OrderInfo;
import net.sf.json.JSONArray;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

public interface OrderRepository extends JpaRepository<OrderInfo,Integer> {
    @Query("select info from OrderInfo info where info.u_id=:u_id order by info.ord_time desc ")
    List<OrderInfo> getOrdersbyUid(@Param("u_id")Integer u_id);
    @Query("select info from OrderInfo info order by info.ord_time desc ")
    List<OrderInfo> getOrdersbyUid();
    @Query("select info from OrderInfo info where info.u_id=:u_id and info.ord_time>=:time1 and info.ord_time<=:time2 order by info.ord_time desc ")
    List<OrderInfo> getOrdersByUser_idAndTime(@Param("u_id")Integer u_id, @Param("time1")Timestamp early, @Param("time2")Timestamp later);
    @Query("select info from OrderInfo info where  info.ord_time>=:time1 and info.ord_time<=:time2 order by info.ord_time desc")
    List<OrderInfo> getOrdersByUser_idAndTime( @Param("time1")Timestamp early, @Param("time2")Timestamp later);
    @Query(value = "select * from orders where ord_id in :ord_ids and u_id=:u_id order by ord_time desc",nativeQuery = true)
    List<OrderInfo> findByOrd_id(@Param("u_id")Integer u_id,@Param("ord_ids") List<Integer> ord_ids);
    @Query(value = "select * from orders where ord_id in :ord_ids order by ord_time desc",nativeQuery = true)
    List<OrderInfo> findByOrd_id(@Param("ord_ids") List<Integer> ord_ids);

    @Query(value = "select b_id, b_title,sum(book_num)as sold_num from orderitems natural join books group by b_id order by sold_num desc limit :num",
            nativeQuery = true)
    List<Map<String,Object>> getTopTotal(@Param("num") Integer num);

    @Query(value="select b_id, b_title,sum(book_num)as sold_num " +
            "from (select * from orders as os where os.ord_time>=:early and os.ord_time <=:later) as ords natural join orderitems natural join books group by b_id order by sold_num desc limit :num",nativeQuery = true)
    List<Map<String,Object>> getTopPeriod(@Param("num")Integer num, @Param("early") Timestamp early, @Param("later") Timestamp later);

    @Query(value="select u_id,u_name,sum(book_num*price) as pay " +
            "from (select * from orders as os natural join users where os.ord_time<=:later and os.ord_time >=:early) as ords natural join orderitems natural join books group by u_id order by pay desc limit :num",nativeQuery = true)
    List<Map<String,Object>> getTopConsume(@Param("num")Integer num, @Param("early") Timestamp early, @Param("later") Timestamp later);

    @Query(value="select u_id,u_name,sum(book_num*price) as pay " +
            "from  orders natural join users natural join orderitems natural join books group by u_id order by pay desc limit :num",nativeQuery = true)
    List<Map<String,Object>> getTopConsume(@Param("num")Integer num);

    @Query(value = "select b_id,b_title,price,sum(book_num) as tot_num,sum(book_num*price) as tot_price " +
            "from (select * from orders  where u_id=:u_id and ord_time >= :early and ord_time<= :later ) as ords natural join orderitems natural join books group by b_id " +
            "order by tot_price desc",nativeQuery = true)
    List<Map<String,Object>> getPersonalConsume(@Param("u_id")Integer u_id,@Param("early") Timestamp early, @Param("later") Timestamp later);

}
