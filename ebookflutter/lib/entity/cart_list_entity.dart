import 'package:json_annotation/json_annotation.dart';

part 'cart_list_entity.g.dart';




@JsonSerializable()
class Cart extends Object{
  @JsonKey(name:"u_id")
  int u_id;

  @JsonKey(name:"b_id")
  int b_id;

  @JsonKey(name:"book_num")
  int book_num;

  Cart(
    this.u_id,
    this.b_id,
    this.book_num,
  );

    factory Cart.fromJson(Map<String, dynamic> srcJson) =>
      _$CartFromJson(srcJson);

  Map<String, dynamic> toJson() => _$CartToJson(this);
}