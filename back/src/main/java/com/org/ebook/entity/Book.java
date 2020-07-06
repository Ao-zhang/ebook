package com.org.ebook.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

//用来省略不必要的set，get函数，简化代码
@Data
@Entity
//指定对应表名
@Table(name = "books")
// json 序列化时忽略 bean 中的一些不需要转化的属性
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "b_id")
public class Book implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    //插入时直接使用mysql的自增设置，故不需要自己设定id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer b_id;
    private String b_title;
    private String category;
    private String author;
    private Double price;
    private String description;
    private Integer store_num;
    private String img_src;
    @Transient
    @OneToMany(cascade =CascadeType.REMOVE,fetch = FetchType.LAZY,orphanRemoval = true)
    //拥有mappedBy注解的实体类为关系被维护端，双向关联需要用此注解
    //mappedBy="company"中的company是Employee中的company属性
    //orphanRemoval为true,表示会先直接删除对应的子表数据，级联更新此配置最为关键
    private List<OrderItem> orderItems=new ArrayList<OrderItem>();

    @Transient
    @OneToMany(cascade =CascadeType.REMOVE,fetch = FetchType.LAZY,orphanRemoval = true)
    private List<Cart> inCart=new ArrayList<Cart>();

}
