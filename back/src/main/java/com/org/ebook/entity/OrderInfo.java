package com.org.ebook.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.springframework.context.annotation.Lazy;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "ord_id")
public class OrderInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    //插入时直接使用mysql的自增设置，故不需要自己设定id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer ord_id;

    @JoinColumn(name = "u_id")//设置外键
    private Integer u_id;
    private Integer addr_id;
    private Double tot_cost;
    private Timestamp ord_time;
    @Transient
    @OneToMany(cascade = CascadeType.REMOVE,fetch = FetchType.LAZY,orphanRemoval = true)
    private List<OrderItem> items=new ArrayList<OrderItem>();

    private Integer status=1;//初始状态已下单
    private String comment;
//    public OrderInfo(Integer u_id){
//        this.buyer.setU_id(u_id);
//    }
}
