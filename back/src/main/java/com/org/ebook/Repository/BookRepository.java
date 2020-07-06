package com.org.ebook.Repository;

import com.org.ebook.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;


public interface BookRepository extends JpaRepository<Book,Integer> {
//    @Query("select b from Book b")
//    List<Book> getBooks();
    @Query("select b from Book b")
    Page<Book> getBooks(Pageable pageable);
    @Modifying
    @Transactional
    @Query(value = "update books set store_num=:store_num where b_id=:b_id",nativeQuery = true)
    void updateStorenum(@Param("b_id")Integer b_id,@Param("store_num")Integer store_num);
    @Query(value="select b from Book b where b.b_title like %?1%")
    Page<Book> searchBooks(String keywords,Pageable pageable);
    @Modifying
    @Transactional
    @Query("delete from Book b where b.b_id=:b_id")
    void deleteBookByB_id(@Param("b_id") Integer b_id);

    @Query(value = "select b.b_id from Book b where b.b_title like %?1%")
    List<Integer> searchBooksByTitle(String keyword);
}
