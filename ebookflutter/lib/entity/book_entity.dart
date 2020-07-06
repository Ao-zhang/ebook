import 'package:json_annotation/json_annotation.dart';

part 'book_entity.g.dart';

class BookListEntity{
  List<BookEntity> booksEntitys;

  BookListEntity(this.booksEntitys);

  factory BookListEntity.fromJson(List<dynamic> parseJson) {
    List<BookEntity> booksEntitys;
    booksEntitys = parseJson.map((i) => BookEntity.fromJson(i)).toList();
    return BookListEntity(booksEntitys);
  }
}

@JsonSerializable()
class BookEntity extends Object{
    @JsonKey(name: 'b_id')
  int b_id;

  @JsonKey(name: 'b_title')
  String b_title;

  @JsonKey(name: 'category')
  String category;

  @JsonKey(name: 'author')
  String author;

  @JsonKey(name: 'price')
  double price;

  @JsonKey(name: 'description')
  String description;

  @JsonKey(name: 'store_num')
  int store_num;

  @JsonKey(name: 'img_src')
  String img_src;

  BookEntity(
    this.b_id,
    this.b_title,
    this.category,
    this.author,
    this.price,
    this.description,
    this.store_num,
    this.img_src
  );

  factory BookEntity.fromJson(Map<String, dynamic> srcJson) =>
      _$BookEntityFromJson(srcJson);

  Map<String, dynamic> toJson() => _$BookEntityToJson(this);
}