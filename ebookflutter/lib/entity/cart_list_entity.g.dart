// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'cart_list_entity.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************


Cart _$CartFromJson(Map<String, dynamic> json) {
  return Cart(
      json['u_id'] as int,
      json['b_id'] as int,
      json['book_num'] as int);
      
}

Map<String, dynamic> _$CartToJson(Cart instance) => <String, dynamic>{
      'u_id': instance.u_id,
      'b_id': instance.b_id,
      'book_num': instance.book_num,
    };
