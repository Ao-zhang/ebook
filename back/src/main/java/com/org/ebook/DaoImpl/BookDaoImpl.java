package com.org.ebook.DaoImpl;

import java.util.List;
import java.util.Optional;

import com.org.ebook.Dao.BookDao;
import com.org.ebook.Repository.BookImgRepository;
import com.org.ebook.Repository.BookRepository;
import com.org.ebook.entity.Book;
import com.org.ebook.entity.BookImg;
import org.apache.commons.beanutils.PropertyUtilsBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;


@Repository
public class BookDaoImpl implements BookDao {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookImgRepository bookImgRepository;

    @Override
//    public List<Book> getBooks(){return bookRepository.getBooks();}
    public Page<Book> getBooks(Pageable pageable){
        Page<Book> books=bookRepository.getBooks(pageable);
        for (Book book : books) {
            if(book.getImg_src()==null){
                Optional<BookImg> bookimg=bookImgRepository.findById(book.getB_id());
                if(bookimg.isPresent()){
                    book.setImg_src(bookimg.get().getImg());;
                }
            }
        }
        return books;
    }

    @Override
    public Book findOne(Integer id){
        Book book=bookRepository.getOne(id);
        if(book!=null){
            if(book.getImg_src()==null){
                Optional<BookImg> bookimg=bookImgRepository.findById(book.getB_id());
                if(bookimg.isPresent()){
                    book.setImg_src(bookimg.get().getImg());;
                }
            }
        }
        return book;
    }
    @Override
    public Book insertBook(Book book){
        BookImg bookImg=new BookImg();

        bookImg.setImg(book.getImg_src());
        book.setImg_src(null);

        Book abook=bookRepository.save(book);
        bookImg.setId(abook.getB_id());
        bookImgRepository.save(bookImg);

        book.setImg_src(bookImg.getImg());
        return book;
    }

    @Override
    public Boolean updateStorenum(Integer b_id,Integer store_num){
        if(bookRepository.findById(b_id)==null){
            return false;
        }
        bookRepository.updateStorenum(store_num, b_id);

        return true;
    }

    @Override
    public Page<Book> searchBooks(Pageable pageable,String keywords){
        Page<Book> books=bookRepository.searchBooks(keywords,pageable);
        for (Book book : books) {
            if(book.getImg_src()==null){
                Optional<BookImg> bookimg=bookImgRepository.findById(book.getB_id());
                if(bookimg.isPresent()){
                    book.setImg_src(bookimg.get().getImg());;
                }
            }
        }
        return books;
    }

    @Override
    public List<Integer> searchBooksByTitle(String keyword){
        return bookRepository.searchBooksByTitle(keyword);
    }

    @Override
    public Boolean deleteBook(Integer b_id){
        if(bookRepository.findById(b_id)!=null){
            bookRepository.deleteBookByB_id(b_id);
            bookImgRepository.deleteById(b_id);
            return true;
        }
        else return false;

    }

}
