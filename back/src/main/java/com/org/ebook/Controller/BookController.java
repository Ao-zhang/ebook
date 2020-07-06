package com.org.ebook.Controller;

import com.org.ebook.Service.BookService;
import com.org.ebook.entity.Book;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.domain.Page;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import static com.org.ebook.Constant.Constant.*;

@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping("/getBooks")
    public List<Book> getBooks(@RequestBody Map<String,Integer> params){
        Integer PageNum=params.get("pagenum");
        Integer PageContentNum=params.get("size");
        if(PageNum<=0||PageContentNum<=0){
            PageNum=1;
            PageContentNum=12;
        }
        Pageable pageable= PageRequest.of(PageNum-1,PageContentNum,Sort.by(Sort.Direction.ASC,"b_id"));//b_id指entity中的变量，非数据库中变量名

        return  bookService.getBooks(pageable).getContent();
    }
    @RequestMapping("/searchbooks")
    public List<Book> searchBooks(@RequestBody Map<String,String> params){
        Integer PageNum=Integer.valueOf(params.get("pagenum")) ;
        Integer PageContentNum=Integer.valueOf(params.get("size"));
        String keyword=params.get("keyword");
        if(PageNum<=0||PageContentNum<=0){
            PageNum=1;
            PageContentNum=12;
        }
        Pageable pageable= PageRequest.of(PageNum-1,PageContentNum,Sort.by(Sort.Direction.ASC,"b_id"));
        return bookService.searchBooks(pageable,keyword).getContent();
    }

    @RequestMapping("/getBook")
    public Book getBook(@RequestBody Map<String, String> params){
        String b_id=params.get("b_id");
        System.out.println(b_id+" in controller");
        Integer bookid=Integer.parseInt(b_id);
        System.out.println(bookid+" convert success");
        return bookService.findBookById(bookid);
    }
    @RequestMapping(value="/updatestore")
    public Boolean updateStorenum(@RequestBody Map<String, String> params) {
        System.out.println("Update store");
        Integer b_id=Integer.valueOf(params.get("b_id"));
        Integer store_num=Integer.valueOf(params.get("store_num"));
        return bookService.updateStorenum(b_id, store_num);

    }
    @RequestMapping(value="/insertbook")
    public Book insertBook(@RequestBody Map<String, String> params) {
        System.out.println("insert book");
        Book book=new Book();
        for(String key:params.keySet()){
            switch(key){
                case BOOK_ID:book.setB_id(Integer.valueOf(params.get(key)));
                    break;
                case BOOKTITLE:book.setB_title(params.get(key));break;
                case CATEGORY:book.setCategory(params.get(key));break;
                case AUTHOR:book.setAuthor(params.get(key));break;
                case PRICE:book.setPrice(Double.valueOf(params.get(key)) );break;
                case DESCRIPTION:book.setDescription(params.get(key));break;
                case STORENUM:book.setStore_num(Integer.valueOf(params.get(key)));break;
                case IMGSRC:book.setImg_src(params.get(key));break;
                default:
                    break;
            }
        }
        System.out.println(book);
        return bookService.insertBook(book);
    }

    @RequestMapping("/deleteBook")
    public Boolean deleteBook(@RequestBody Map<String, Integer> params) {
        Integer b_id=params.get(BOOK_ID);
        return bookService.deleteBook(b_id);
    }

    @RequestMapping("/findBooksbyid")
    public List<Book> findBooksbyid(@RequestBody  Map<String, List> params){
        System.out.println("in findBooksbyid");
        List<Book> result=new ArrayList<Book>();
        JSONArray id_list=JSONArray.fromObject(params.get("b_ids"));
        System.out.println(id_list);
        Iterator<JSONObject> it=id_list.iterator();
        while (it.hasNext()){
            JSONObject item=it.next();
            Integer b_id=item.getInt(BOOK_ID);
            Book book=bookService.findBookById(b_id);

            result.add(book);
        }
        return result;
    }

}
