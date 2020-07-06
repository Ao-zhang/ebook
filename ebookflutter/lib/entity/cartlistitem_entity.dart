class Cartlistdatas{
  List<Cartlistitem> listdatas;

  Cartlistdatas(this.listdatas);


  factory Cartlistdatas.fromJson(List<dynamic> parseJson) {
    List<Cartlistitem> listEntitys;
    listEntitys = parseJson.map((i) => Cartlistitem.fromJson(i)).toList();
    return Cartlistdatas(listEntitys);
  }
}



class Cartlistitem {
  int bId;
  String imgSrc;
  String bTitle;
  String author;
  double totPrice;
  double price;
  String description;
  int bookNum;
  int storeNum;
  int index;
  bool checked;

  Cartlistitem(
      {this.bId,
      this.imgSrc,
      this.bTitle,
      this.author,
      this.totPrice,
      this.price,
      this.description,
      this.bookNum,
      this.storeNum,
      this.index,
      this.checked});

  Cartlistitem.fromJson(Map<String, dynamic> json) {
    bId = json['b_id'];
    imgSrc = json['img_src'];
    bTitle = json['b_title'];
    author = json['author'];
    totPrice = json['tot_price'];
    price = json['price'];
    description = json['description'];
    bookNum = json['book_num'];
    storeNum = json['store_num'];
    index = json['index'];
    checked = json['checked'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['b_id'] = this.bId;
    data['img_src'] = this.imgSrc;
    data['b_title'] = this.bTitle;
    data['author'] = this.author;
    data['tot_price'] = this.totPrice;
    data['price'] = this.price;
    data['description'] = this.description;
    data['book_num'] = this.bookNum;
    data['store_num'] = this.storeNum;
    data['index'] = this.index;
    data['checked'] = this.checked;
    return data;
  }
}