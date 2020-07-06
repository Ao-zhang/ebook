// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_entity.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserEntity _$UserEntityFromJson(Map<String, dynamic> json) {
  var list=json['carts'] as List;
  List<Cart> cart=list.map((i)=>Cart.fromJson(i)).toList();
  return UserEntity(
    json['u_id'] as int,
    json['u_name'] as String,
    json['u_type'] as int,
    json['u_gender'] as String,
    json['u_nickname'] as String,
    json['u_phone'] as String,
    json['u_email'] as String,
    json['avatar'] as String,
    cart
  );
}

Map<String, dynamic> _$UserEntityToJson(UserEntity instance) =>
    <String, dynamic>{
      'u_id': instance.u_id,
       'u_name': instance.u_name,
       'u_type':instance.u_type,
       'u_gender':instance.u_gender,
       'u_nickname':instance.u_nickname,
       'u_phone':instance.u_phone,
       'u_email':instance.u_email,
       'avatar':instance.avatar,
       'carts':instance.carts
       };

