package com.org.ebook.Repository;

import com.org.ebook.entity.BookImg;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
public interface BookImgRepository extends MongoRepository<BookImg,Integer>{
    
}