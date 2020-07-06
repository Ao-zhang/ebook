const apiUrl = "http://localhost:8080/";

module.exports={
  GetBooksUrl: apiUrl + 'getBooks',//获取书籍数据接口
  LoginUrl:apiUrl+'login',//登录
  GetABookUrl:apiUrl+'getBook',//获取一本书籍
  GetRelatedBook:apiUrl+'getBooks',//后期修改后台后需要改动
  GetBooksByIds:apiUrl+'findBooksbyid',//通过一组book_ids获取book信息
  BuyUrl:apiUrl+'buy',//买书
  SaveCart:apiUrl+'addToCarts',//保存购物车
}