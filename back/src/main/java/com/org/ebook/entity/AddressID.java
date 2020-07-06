package com.org.ebook.entity;

import java.io.Serializable;


import lombok.Data;

@Data
public class AddressID implements Serializable{
    private static final long serialVersionUID = 1L;
    private Integer addr_id;
    private Integer u_id;
}
