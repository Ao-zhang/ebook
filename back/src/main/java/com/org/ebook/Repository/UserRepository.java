package com.org.ebook.Repository;

import java.util.List;

import javax.transaction.Transactional;

import com.org.ebook.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User,Integer> {
    @Query("from User where u_name=:u_name and u_password=:u_password")
    User checkuser(@Param("u_name")String u_name,@Param("u_password")String u_password);
    @Query("from User where u_id=:u_id")
    User findUser(@Param("u_id") Integer u_id);
    @Query("select u from User u")
    Page<User> getUsers(Pageable pageable);
    @Query("from User where u_name=:u_name")
    List<User> findByU_name(@Param("u_name") String u_name);
    @Query("from User where u_id=:u_id")
    List<User> findByU_id(@Param("u_id") Integer u_id);
    @Modifying
    @Transactional
    @Query(value = "update users set u_type = :u_type where u_id = :u_id",nativeQuery = true)
    void updateTypeByid(@Param("u_type")Integer u_type,@Param("u_id")Integer u_id);
    @Modifying
    @Transactional
    @Query(value = "update users set u_nickname = :u_nickname,u_phone=:u_phone,u_email=:u_email ,u_gender=:u_gender where u_id = :u_id",
    nativeQuery = true)
    void updateInfoByid(@Param("u_nickname")String u_nickname,@Param("u_phone")String u_phone,@Param("u_email")String u_email,@Param("u_gender")String u_gender,@Param("u_id")Integer u_id);
//    @Query("select u from User u where u.u_id !=:u_id")
//    List<User>
    // @Modifying
    // @Transactional
    // @Query(value = "update users set u_phone = :u_phone where u_id = :u_id",nativeQuery = true)
    // void updatePhoneByid(@Param("u_phone")String u_phone,@Param("u_id")Integer u_id);
    // @Modifying
    // @Transactional
    // @Query(value = "update users set u_email = :u_email where u_id = :u_id",nativeQuery = true)
    // void updateEmailByid(@Param("u_email")String u_email,@Param("u_id")Integer u_id);
    // @Modifying
    // @Transactional
    // @Query(value = "update users set u_gender = :u_gender where u_id = :u_id",nativeQuery = true)
    // void updateGenderByid(@Param("u_nickname")String u_gender,@Param("u_id")Integer u_id);
}
