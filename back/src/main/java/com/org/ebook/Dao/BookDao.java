package com.org.ebook.Dao;


import com.org.ebook.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

// import java.util.List;

public interface BookDao {
//    List<Book> getBooks();
    Page<Book> getBooks(Pageable pageable);
    Page<Book> searchBooks(Pageable pageable,String keywords);
    Book findOne(Integer id);
    Book insertBook(Book book);
    Boolean updateStorenum(Integer b_id,Integer store_num);
    Boolean deleteBook(Integer b_id);
    List<Integer> searchBooksByTitle(String keyword);

}
