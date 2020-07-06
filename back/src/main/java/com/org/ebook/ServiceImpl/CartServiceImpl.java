package com.org.ebook.ServiceImpl;

import java.util.List;

import com.org.ebook.Dao.CartDao;
import com.org.ebook.Service.CartService;
import com.org.ebook.entity.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    CartDao cartDao;
    @Override
    public List<Cart> getCart(Integer u_id){
        return cartDao.getCart(u_id);
    }
    @Override
    public  void addCart(Cart cart){
        cartDao.addCart(cart);
    }
    @Override
    public void deleteCartbyUid(Integer u_id){
        cartDao.deleteCartbyUid(u_id);
    }
}
