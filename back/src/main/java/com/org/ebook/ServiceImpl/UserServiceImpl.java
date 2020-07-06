package com.org.ebook.ServiceImpl;

import com.org.ebook.Dao.UserDao;
import com.org.ebook.Service.UserService;
import com.org.ebook.entity.Address;
import com.org.ebook.entity.AddressID;
import com.org.ebook.entity.User;
import com.org.ebook.entity.UserAvatar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public Boolean register(User user){return userDao.register(user);}

    @Override
    public User checkuser(String u_name,String u_password){
        return userDao.checkuser(u_name,u_password);
    }

    @Override
    public  User findUser(Integer u_id){
        return userDao.findUser(u_id);
    }

    @Override
    public Boolean changeType(Integer u_type, Integer u_id){

        return userDao.changeType(u_type, u_id);
    }
    @Override
    public User changeInfo(String u_nickname,String u_phone,String u_email,String u_gender,Integer u_id){
        return userDao.changeInfo(u_nickname, u_phone, u_email, u_gender, u_id);
    }
    @Override
    public UserAvatar UpAvatar(Integer u_id, String icon){
        return userDao.UpAvatar(u_id,icon);
    }
    @Override
    public Address getDefAddr(AddressID addressID){return userDao.getDefAddr(addressID);}
    @Override
    public List<Address> getAddrsByUid(Integer u_id){return userDao.getAddrsByUid(u_id);}
    @Override
    public Page<User> getallUsers(Pageable pageable){
        return userDao.getallUsers(pageable);
    }
}
