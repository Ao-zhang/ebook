package com.org.ebook.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class OrderItemID implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer ord_id;
    private Integer b_id;
}
