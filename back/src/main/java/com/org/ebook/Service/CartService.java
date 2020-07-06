package com.org.ebook.Service;

import java.util.List;

import com.org.ebook.entity.Cart;

public interface CartService {
    List<Cart> getCart(Integer u_id);
    void addCart(Cart cart);
    void deleteCartbyUid(Integer u_id);
}
