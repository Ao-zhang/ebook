package com.org.ebook.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@Entity
@Table(name = "orderitems")
@IdClass(com.org.ebook.entity.OrderItemID.class)
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
// @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "OrderItemId")
public class OrderItem implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @JoinColumn(name = "ord_id")
    private Integer ord_id;
    @Id
    @JsonBackReference
    @JoinColumn(name = "b_id")
    private Integer b_id;
    private Integer book_num;

    public OrderItem(Integer ord_id,Integer b_id,Integer book_num){
        this.ord_id=ord_id;
        this.b_id=b_id;
        this.book_num=book_num;
    }
    public OrderItem(){
    }
}
