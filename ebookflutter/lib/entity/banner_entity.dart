import 'package:json_annotation/json_annotation.dart';

part 'banner_entity.g.dart';
@JsonSerializable()
class MallBanner extends Object {

  @JsonKey(name: 'id')
  int id;

  @JsonKey(name: 'url')
  String url;


  MallBanner(this.id,this.url);

  factory MallBanner.fromJson(Map<String, dynamic> srcJson) => _$MallBannerFromJson(srcJson);

  Map<String, dynamic> toJson() => _$MallBannerToJson(this);

}
