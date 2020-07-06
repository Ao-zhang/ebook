// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'orditem_entity.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************


Orditem _$OrditemFromJson(Map<String, dynamic> json) {
  return Orditem(
      json['b_id'] as int,
      json['book_num'] as int,
      json['rest_num'] as int,);
      
}

Map<String, dynamic> _$OrditemToJson(Orditem instance) => <String, dynamic>{
      'b_id': instance.b_id,
      'book_num': instance.book_num,
      'rest_num':instance.rest_num,
    };