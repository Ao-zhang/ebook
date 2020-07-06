package com.org.ebook.entity;

import lombok.Data;

import javax.persistence.*;

import org.springframework.context.annotation.Lazy;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name="users")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer u_id;
    @Transient
    private UserAvatar avatar;
    private String u_name;
    private String u_password;
    //if user type =-1, he is forbidden
    private Integer u_type;
    private String u_nickname;
    private String u_gender;
    private String u_phone;
    private String u_email;
    private Integer def_addr_id=-1;
    @Transient
    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,orphanRemoval = true)
    //拥有mappedBy注解的实体类为关系被维护端，双向关联需要用此注解
    //mappedBy="company"中的company是Employee中的company属性,因为循环依赖，所以删除了mappedby
    //orphanRemoval为true,表示会先直接删除对应的子表数据，级联更新此配置最为关键
    private List<OrderInfo> orders=new ArrayList<OrderInfo>();
//    @OneToOne(mappedBy = "customer",cascade = CascadeType.ALL,fetch = FetchType.LAZY,orphanRemoval = true)
//    private Cart cart;
    @Transient
    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,orphanRemoval = true)
    private List<Cart> carts=new ArrayList<Cart>();


}
