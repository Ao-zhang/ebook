package com.org.ebook.DaoImpl;

import com.org.ebook.Dao.UserDao;
import com.org.ebook.Repository.AddressRepository;
import com.org.ebook.Repository.UserAvatarRepository;
import com.org.ebook.Repository.UserRepository;

import com.org.ebook.entity.Address;
import com.org.ebook.entity.AddressID;
import com.org.ebook.entity.User;
import com.org.ebook.entity.UserAvatar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserAvatarRepository userAvatarRepository;

    @Autowired
    AddressRepository addressRepository;

    @Override
    public Boolean register(User user){
        List<User> oldusers=userRepository.findByU_name(user.getU_name());
        if(oldusers.size()!=0){
            return false;
        }
        User auser=userRepository.save(user);
        if(user.getAvatar()!=null){
            UserAvatar avatar=user.getAvatar();
            avatar.setId(auser.getU_id());
            userAvatarRepository.save(avatar);
        }
        return true;
    }

    @Override
    public User checkuser(String u_name,String u_password){
        User user=userRepository.checkuser(u_name, u_password);
        Optional<UserAvatar> avatar=userAvatarRepository.findById(user.getU_id());
//        return userRepository.checkuser(u_name,u_password);
        if(avatar.isPresent()){
            System.out.println("not null "+user.getU_id());
            user.setAvatar(avatar.get());
        }
        else{
            user.setAvatar(null);
            System.out.println("It's Null");
        }
        return user;
    }

    @Override
    public User findUser(Integer u_id){
        return userRepository.findUser(u_id);
    }
    @Override
    public Boolean changeType(Integer u_type, Integer u_id){
        if(userRepository.findByU_id(u_id).size()==0){
            return false;
        }
        userRepository.updateTypeByid(u_type, u_id);
        return true;
    }
    @Override
    public User changeInfo(String u_nickname,String u_phone,String u_email,String u_gender,Integer u_id){
        userRepository.updateInfoByid(u_nickname, u_phone, u_email, u_gender, u_id);
        User auser=userRepository.findUser(u_id);
        return auser;
    }
    @Override
    public UserAvatar UpAvatar(Integer u_id,String icon){
        UserAvatar avatar=new UserAvatar();
        avatar.setId(u_id);
        avatar.setIcon(icon);
        return userAvatarRepository.save(avatar);
    }

    @Override
    public Address getDefAddr(AddressID addressID){
        return addressRepository.findById(addressID).get();
    }
    @Override
    public List<Address> getAddrsByUid(Integer u_id){
        return addressRepository.findByUser_id(u_id);
    }
    @Override
    public Page<User> getallUsers(Pageable pageable){
        //only check info, don't need avatar
        Page<User> users=userRepository.getUsers(pageable);
//        System.out.println(users);
        return users;
    }
}
