package com.org.ebook.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class CartID implements Serializable{
    private static final long serialVersionUID = 1L;
    private Integer u_id;
    private Integer b_id;
}
