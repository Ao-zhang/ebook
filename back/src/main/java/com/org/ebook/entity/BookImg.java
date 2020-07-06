package com.org.ebook.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;



import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Document(collection = "bookimg")
public class BookImg {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;
    private String img;
}
