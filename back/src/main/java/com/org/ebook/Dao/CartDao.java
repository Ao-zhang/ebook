package com.org.ebook.Dao;

import java.util.List;

import com.org.ebook.entity.Cart;

public interface CartDao {
    List<Cart> getCart(Integer u_id);
    void addCart(Cart cart);
    void deleteCartbyUid(Integer u_id);
}
