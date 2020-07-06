package com.org.ebook.Repository;

import com.org.ebook.entity.OrderItem;
import com.org.ebook.entity.OrderItemID;
import net.sf.json.JSON;
import net.sf.json.JSONArray;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface OrderItemRepository extends JpaRepository<OrderItem, OrderItemID> {
    @Query("select it from OrderItem it where it.ord_id=:ord_id")
    List<OrderItem> getOrderItemsByOrd_id(@Param("ord_id")Integer ord_id);
    @Query("select it from OrderItem it where  it.b_id=:b_id")
    List<OrderItem> getOrderItemsByOrd_idAndB_id(@Param("b_id")Integer b_id);

    @Query("select distinct it.ord_id from OrderItem it where it.b_id in :b_ids")
    List<Integer> getOrd_idsByB_id(@Param("b_ids") List<Integer> b_ids);

    @Query(value = "select b_id,b_title,author,price,book_num,price*book_num as tot_price from orderitems natural join books where ord_id = :ord_id",nativeQuery = true)
    List<Map<String,Object>> findOrderItemsByOrd_id(@Param("ord_id")Integer ord_id);
}
