package com.org.ebook.Dao;

import com.org.ebook.entity.Address;
import com.org.ebook.entity.AddressID;
import com.org.ebook.entity.User;
import com.org.ebook.entity.UserAvatar;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserDao {
    Boolean register(User user);
    User checkuser(String u_name,String u_password);
    User findUser(Integer u_id);
    Boolean changeType(Integer u_type, Integer u_id);
    User changeInfo(String u_nickname,String u_phone,String u_email,String u_gender,Integer u_id);
    UserAvatar UpAvatar(Integer u_id, String icon);
    Address getDefAddr(AddressID addressID);
    List<Address> getAddrsByUid(Integer u_id);
    Page<User> getallUsers(Pageable pageable);
}
