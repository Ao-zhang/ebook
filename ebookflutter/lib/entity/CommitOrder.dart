import 'package:ebookflutter/entity/orditem_entity.dart';

import 'address_entity.dart';
import 'ordinfo_entity.dart';

class Commitorder {
	Address address;
	Orderinfo ordinfo;
	List<Orditem> orditems;

	Commitorder({this.address, this.ordinfo, this.orditems});

	Commitorder.fromJson(Map<String, dynamic> json) {
		address = json['address'] != null ? new Address.fromJson(json['address']) : null;
		ordinfo = json[' ordinfo'] != null ? new Orderinfo.fromJson(json[' ordinfo']) : null;
		if (json['orditems'] != null) {
			orditems = new List<Orditem>();
			json['orditems'].forEach((v) { orditems.add(new Orditem.fromJson(v)); });
		}
	}

	Map<String, dynamic> toJson() {
		final Map<String, dynamic> data = new Map<String, dynamic>();
		if (this.address != null) {
      data['address'] = this.address.toJson();
    }
		if (this.ordinfo != null) {
      data[' ordinfo'] = this.ordinfo.toJson();
    }
		if (this.orditems != null) {
      data['orditems'] = this.orditems.map((v) => v.toJson()).toList();
    }
		return data;
	}
}