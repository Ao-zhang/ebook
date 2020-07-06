part of 'book_entity.dart';

BookEntity _$BookEntityFromJson(Map<String, dynamic> json) {
  return BookEntity(
      json['b_id'] as int,
      json['b_title'] as String,
      json['category'] as String,
      json['author'] as String,
      (json['price'] as num)?.toDouble(),
      json['description'] as String,
      json['store_num'] as int,
      json['img_src'] as String);
}

Map<String, dynamic> _$BookEntityToJson(BookEntity instance) =>
    <String, dynamic>{
      'b_id': instance.b_id,
      'b_title': instance.b_title,
      'category': instance.category,
      'author': instance.author,
      'price': instance.price,
      'description': instance.description,
      'store_num': instance.store_num,
      'img_src': instance.img_src
    };