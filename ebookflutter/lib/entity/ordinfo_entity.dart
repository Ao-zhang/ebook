class Orderinfo {
  int uId;
  double totCost;
  String comment;

  Orderinfo({this.uId, this.totCost, this.comment});

  Orderinfo.fromJson(Map<String, dynamic> json) {
    uId = json['u_id'];
    totCost = json['tot_cost'];
    comment = json['comment'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['u_id'] = this.uId;
    data['tot_cost'] = this.totCost;
    data['comment'] = this.comment;
    return data;
  }
}