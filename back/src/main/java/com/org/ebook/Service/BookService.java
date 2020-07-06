package com.org.ebook.Service;

import com.org.ebook.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface BookService {
//    List<Book> getBooks();
    Page<Book> getBooks(Pageable pageable);
    Page<Book> searchBooks(Pageable pageable,String keywords);
    Book findBookById(Integer id);
    Book insertBook(Book book);
    Boolean updateStorenum(Integer b_id,Integer store_num);
    Boolean deleteBook(Integer b_id);
    List<Integer> searchBooksByTitle(String keyword);
}
