
part of 'banner_entity.dart';

MallBanner _$MallBannerFromJson(Map<String, dynamic> json) {
  return MallBanner(
      json['id'] as int,
      json['url'] as String);
}

Map<String, dynamic> _$MallBannerToJson(MallBanner instance) =>
    <String, dynamic>{
      'id': instance.id,
      'url': instance.url,
    };