package com.org.ebook.DaoImpl;

import java.util.List;

import com.org.ebook.Dao.CartDao;
import com.org.ebook.Repository.CartRepository;
import com.org.ebook.entity.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CartDaoImpl implements CartDao {
    @Autowired
    CartRepository cartRepository;
    @Override
    public List<Cart> getCart(Integer u_id){
        return cartRepository.findByUid(u_id);
    }
    @Override
    public  void addCart(Cart cart){
        cartRepository.save(cart);
    }
    @Override
    public void deleteCartbyUid(Integer u_id){
        cartRepository.deleteByUser_id(u_id);
    }
}
