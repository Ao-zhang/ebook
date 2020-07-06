package com.org.ebook.entity;

import lombok.Data;

import java.io.Serializable;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Data
@Entity
@Table(name="cart")
@IdClass(com.org.ebook.entity.CartID.class)
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
public class Cart implements Serializable{
    private static final long serialVersionUID = 1L;
//    @Id
//    @GeneratedValue(strategy= GenerationType.IDENTITY)
//    private Integer id;
//    @OneToOne(cascade = {CascadeType.MERGE,CascadeType.REFRESH},optional = false)
//    @JoinColumn( "u_id")
//    private User customer;
    @Id
    @JoinColumn(name="u_id")
    private Integer u_id;
    @Id
    @JoinColumn(name="b_id")
    private Integer b_id;
    private Integer book_num;

}
