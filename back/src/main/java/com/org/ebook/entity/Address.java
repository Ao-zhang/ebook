package com.org.ebook.entity;

import java.io.Serializable;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@Entity
@Table(name="address")
//@IdClass(com.org.ebook.entity.AddressID.class)
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
public class Address implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer addr_id;
//    @Id
    private Integer u_id;
    private String con_name;
    private String con_phone;
    private String province;
    private String city;
    private String town;
    private String street;
    private String detail_info;
}
