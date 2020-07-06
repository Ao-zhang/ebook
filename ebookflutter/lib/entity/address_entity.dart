class Address {
  String conName;
  String conPhone;
  String province;
  String city;
  String town;
  String street;
  String detailInfo;

  Address(
      {this.conName,
      this.conPhone,
      this.province,
      this.city,
      this.town,
      this.street,
      this.detailInfo});

  Address.fromJson(Map<String, dynamic> json) {
    conName = json['con_name'];
    conPhone = json['con_phone'];
    province = json['province'];
    city = json['city'];
    town = json['town'];
    street = json['street'];
    detailInfo = json['detail_info'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['con_name'] = this.conName;
    data['con_phone'] = this.conPhone;
    data['province'] = this.province;
    data['city'] = this.city;
    data['town'] = this.town;
    data['street'] = this.street;
    data['detail_info'] = this.detailInfo;
    return data;
  }
}