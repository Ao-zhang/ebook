import 'package:ebookflutter/constant/constants.dart';
import 'package:json_annotation/json_annotation.dart';

import 'cart_list_entity.dart';


part 'user_entity.g.dart';


@JsonSerializable()
class UserEntity extends Object {
  @JsonKey(name: 'u_id')
  int u_id;

  @JsonKey(name: 'u_name')
  String u_name;

  @JsonKey(name: 'u_type')
  int u_type;

  @JsonKey(name: 'u_gender')
  String u_gender;

  @JsonKey(name: 'u_nickname')
  String u_nickname;

  @JsonKey(name: 'u_phone')
  String u_phone;

  @JsonKey(name: 'u_email')
  String u_email;
  
  @JsonKey(name: 'avatar')
  String avatar;

  @JsonKey(name:"carts")
  List<Cart> carts;

  // @JsonKey(name:'token')
  // String token=Constants.TOKEN;

  UserEntity(this.u_id,this.u_name,this.u_type,this.u_gender,this.u_nickname,
  this.u_phone,this.u_email,this.avatar,this.carts);


  factory UserEntity.fromJson(Map<String, dynamic> srcJson) => _$UserEntityFromJson(srcJson);

  Map<String, dynamic> toJson() => _$UserEntityToJson(this);

}


// @JsonSerializable()
// class UserInfo extends Object {

//   @JsonKey(name: 'nickName')
//   String nickName;

//   @JsonKey(name: 'avatarUrl')
//   String avatarUrl;

//   UserInfo(this.nickName,this.avatarUrl,);

//   factory UserInfo.fromJson(Map<String, dynamic> srcJson) => _$UserInfoFromJson(srcJson);

//   Map<String, dynamic> toJson() => _$UserInfoToJson(this);

// }


