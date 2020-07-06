class Api{
  static const String API_URL = "http://192.168.1.107:8080/"; //whiyon个
  static const String GetBooksUrl = API_URL+'getBooks';
  static const String LoginUrl = API_URL+'login';
  static const String GetABookUrl = API_URL+'getBook';
  static const String GetRelatedBook = API_URL+'getBooks';
  static const String RegisterUrl=API_URL+'register';
  static const String LogoutUrl=API_URL+'logout';
  static const String SaveCart=API_URL+'addToCarts';

  static const String GetBooksByIds=API_URL+'findBooksbyid';
  static const String BuyUrl=API_URL+'buy';

}
