package com.org.ebook.ServiceImpl;

import com.org.ebook.Dao.BookDao;
import com.org.ebook.Service.BookService;
import com.org.ebook.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;

    @Override
    public Book findBookById(Integer id){
        return bookDao.findOne(id);
    }

    @Override
//    public List<Book> getBooks(){return bookDao.getBooks();}
    public Page<Book> getBooks(Pageable pageable){return bookDao.getBooks(pageable);}

    @Override
    public Page<Book> searchBooks(Pageable pageable,String keywords){return bookDao.searchBooks(pageable,keywords);}

    @Override
    public Book insertBook(Book book){return bookDao.insertBook(book);}
    @Override
    public Boolean updateStorenum(Integer b_id,Integer store_num){
        return bookDao.updateStorenum(b_id, store_num);
    }
    @Override
    public Boolean deleteBook(Integer b_id){
        return bookDao.deleteBook(b_id);
    }

    @Override
    public List<Integer> searchBooksByTitle(String keyword){
        return bookDao.searchBooksByTitle(keyword);
    }
}
