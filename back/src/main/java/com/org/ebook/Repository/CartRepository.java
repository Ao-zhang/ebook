package com.org.ebook.Repository;

import java.util.List;

import com.org.ebook.entity.Cart;
import com.org.ebook.entity.CartID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;


public interface CartRepository extends JpaRepository<Cart, CartID> {
    // @Query("select ")// ？0表示占位符，0对应第一个参数，？1对应第二个参数，与mysql query传参不同
    // List<Cart> findByU_id(Integer u_id);//findby变量名不能出现“_”,所以可以采用自定义
    // //这里也可以直接修改entity中的变量名u_id为uid，然后直接调用jpa的findByUid，从而可以不用谢@Query

    @Query("select c from Cart c where c.u_id=:u_id")
    List<Cart> findByUid(@Param("u_id")Integer u_id);
    @Modifying
    @Transactional
    @Query("delete  from Cart c where c.u_id=:u_id")
    void deleteByUser_id(@Param("u_id")Integer u_id);
}
