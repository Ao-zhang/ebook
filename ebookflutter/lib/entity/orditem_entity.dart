import 'package:json_annotation/json_annotation.dart';

part 'orditem_entity.g.dart';




@JsonSerializable()
class Orditem extends Object{

  @JsonKey(name:"b_id")
  int b_id;

  @JsonKey(name:"book_num")
  int book_num;
  
  @JsonKey(name:"rest_num")
  int rest_num;

  Orditem(
    this.b_id,
    this.book_num,
    this.rest_num,
  );

    factory Orditem.fromJson(Map<String, dynamic> srcJson) =>
      _$OrditemFromJson(srcJson);

  Map<String, dynamic> toJson() => _$OrditemToJson(this);
}