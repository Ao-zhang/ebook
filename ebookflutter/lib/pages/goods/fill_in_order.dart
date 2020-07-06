import 'package:ebookflutter/constant/constants.dart';
import 'package:ebookflutter/entity/address_entity.dart';
import 'package:ebookflutter/entity/cart_list_entity.dart';
import 'package:ebookflutter/entity/cartlistitem_entity.dart';
import 'package:ebookflutter/entity/user_entity.dart';
import 'package:ebookflutter/event/refresh_event.dart';
import 'package:ebookflutter/service/cart_service.dart';
import 'package:common_utils/common_utils.dart';
import 'package:ebookflutter/util/navigator_util.dart';
import 'package:ebookflutter/util/shared_preferences_util.dart';
import 'package:ebookflutter/widgets/cached_image.dart';
import 'package:ebookflutter/widgets/item_text.dart';
import 'package:flutter/material.dart';

import 'package:flutter_screenutil/flutter_screenutil.dart';

import 'dart:convert' as convert;

import 'package:fluttertoast/fluttertoast.dart';
import 'package:shared_preferences/shared_preferences.dart';




class FillInOrderView extends StatefulWidget {

  FillInOrderView();

  @override
  _FillInOrderViewState createState() => _FillInOrderViewState();
}

class _FillInOrderViewState extends State<FillInOrderView> {

  TextEditingController _controller = TextEditingController();
  // var token;
  Future future;
  // Options options = Options();
  Address checkedAddress=new Address(conName:"陈平安",conPhone: "10000",province: "Shanghai",city:"Minhang",town:"Wujin",street: "DonchuanRoad", detailInfo: "800 X30"   );
  List<Cartlistitem> listdatas=[];
  double _tot_cost=0;
  CartService cartService=CartService();
  // UserEntity userinfo=null;

  @override
  void initState() {
    super.initState();
      _getFillInOrder();
  }

  _getFillInOrder() {
    var listorders=SharedPreferencesUtils.ordertocommit;
    double tot_cost=0;
    for(int i=0;i<listorders.length;i++){
      tot_cost+=listorders[i].totPrice;
    }
    setState(() {
      listdatas=listorders;
      _tot_cost=NumUtil.getNumByValueDouble(tot_cost, 2);
    });
  }

   _showToast(message) {
    Fluttertoast.showToast(
        msg: message,
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.CENTER,
        timeInSecForIosWeb: 1,
        backgroundColor: Colors.deepOrangeAccent,
        textColor: Colors.white,
        fontSize: ScreenUtil().setSp(28.0));
  }


  @override
  Widget build(BuildContext context) {
    print("订单长度： $listdatas.length");
    return FutureBuilder(
        future: future,
        builder: (BuildContext context
         , AsyncSnapshot asyncSnapshot
        ) {
                return _contentWidget();
        });
  }

  _contentWidget() {
    return Scaffold(
      appBar: AppBar(
        title: Text(Constants.FILL_IN_ORDER),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            _addressWidget(),
            Divider(
              height: ScreenUtil().setHeight(1.0),
              color: Colors.grey[350],
            ),
            _couponWidget(),
            Divider(
              height: ScreenUtil().setHeight(1.0),
              color: Colors.grey[350],
            ),
            _remarkWidget(),
            Divider(
              height: ScreenUtil().setHeight(1.0),
              color: Colors.grey[350],
            ),
            ItemTextView(
                Constants.GOODS_TOTAL, "¥${_tot_cost}"),
            Divider(
              height: ScreenUtil().setHeight(1.0),
              color: Colors.grey,
            ),
            ItemTextView(
                Constants.FREIGHT, "免运费包邮"),
            Divider(
              height: ScreenUtil().setHeight(1.0),
              color: Colors.grey[350],
            ),
            Column(
              children: _goodsItems(listdatas),
            )
          ],
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        child: Container(
          margin: EdgeInsets.only(left: ScreenUtil().setWidth(20.0)),
          height: ScreenUtil().setHeight(100.0),
          child: Row(
            children: <Widget>[
              Expanded(
                  child: Text("实付：¥${_tot_cost}")),
              InkWell(
                onTap: () => _submitOrder(),
                child: Container(
                  alignment: Alignment.center,
                  width: ScreenUtil().setWidth(200.0),
                  height: double.infinity,
                  color: Colors.deepOrangeAccent,
                  child: Text(
                    Constants.PAY,
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: ScreenUtil().setSp(28.0)),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  List<Widget> _goodsItems(List<Cartlistitem> goods) {
    List<Widget> widgets = List();
    for (int i = 0; i < goods.length; i++) {
      widgets.add(_goodsItem(goods[i]));
      widgets.add(Divider(
        height: ScreenUtil().setHeight(1.0),
        color: Colors.grey[350],
      ));
    }
    return widgets;
  }

    Widget _couponWidget() {
    return Container(
      width: double.infinity,
      height: ScreenUtil().setHeight(100),
      margin: EdgeInsets.only(top: ScreenUtil().setHeight(10.0)),
      padding: EdgeInsets.only(
          left: ScreenUtil().setWidth(20.0),
          right: ScreenUtil().setWidth(20.0)),
      child: Row(
        children: <Widget>[
          // _fillInOrderEntity.availableCouponLength == 0
               Text(
                  Constants.NOT_AVAILABLE_COUPON,
                  style: TextStyle(
                      color: Colors.black54,
                      fontSize: ScreenUtil().setSp(26.0)),
                )
              // : Text(
              //     Strings.COUPON,
              //     style: TextStyle(
              //         color: Colors.black54,
              //         fontSize: ScreenUtil.instance.setSp(26.0)),
              //   )
              ,
          Expanded(
              child: Container(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: <Widget>[
                Text(
                  "${0}元",
                  style: TextStyle(
                      color: Colors.grey,
                      fontSize: ScreenUtil().setSp(24.0)),
                ),
                Padding(
                  padding:
                      EdgeInsets.only(left: ScreenUtil().setWidth(10.0)),
                ),
                Icon(
                  Icons.arrow_forward_ios,
                  color: Colors.grey,
                )
              ],
            ),
          ))
        ],
      ),
    );
  }

  Widget _goodsItem(Cartlistitem checkedGoods) {
    return Container(
      padding: EdgeInsets.only(
          left: ScreenUtil().setWidth(20.0),
          right: ScreenUtil().setWidth(20.0)),
      height: ScreenUtil().setHeight(180.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          CachedImageView(ScreenUtil().setWidth(140),
              ScreenUtil().setWidth(140), checkedGoods.imgSrc),
          Padding(
            padding: EdgeInsets.only(left: ScreenUtil().setWidth(10.0)),
          ),
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                checkedGoods.bTitle,
                style: TextStyle(
                    color: Colors.black54,
                    fontSize: ScreenUtil().setSp(26.0)),
              ),
              Padding(
                  padding:
                      EdgeInsets.only(top: ScreenUtil().setHeight(6.0))),
              Text(
                checkedGoods.author,
                style: TextStyle(
                    color: Colors.grey,
                    fontSize: ScreenUtil().setSp(22.0)),
              ),
              Padding(
                  padding: EdgeInsets.only(
                      top: ScreenUtil().setHeight(20.0))),
              Text(
                "¥${checkedGoods.price}",
                style: TextStyle(
                    color: Colors.deepOrangeAccent,
                    fontSize: ScreenUtil().setSp(26.0)),
              )
            ],
          ),
          Expanded(
              child: Container(
            alignment: Alignment.centerRight,
            child: Text("X${checkedGoods.bookNum}"),
          ))
        ],
      ),
    );
  }

  Widget _remarkWidget() {
    return Container(
      height: ScreenUtil().setHeight(80),
      width: double.infinity,
      alignment: Alignment.center,
      margin: EdgeInsets.only(top: ScreenUtil().setHeight(10.0)),
      padding: EdgeInsets.only(
          left: ScreenUtil().setWidth(20.0),
          right: ScreenUtil().setWidth(20.0)),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Text(
            Constants.REMARK,
            style: TextStyle(
                color: Colors.black54,
                fontSize: ScreenUtil().setSp(26.0)),
          ),
          Expanded(
              child: Container(
            margin: EdgeInsets.only(left: ScreenUtil().setWidth(10.0)),
            height: ScreenUtil().setHeight(80.0),
            alignment: Alignment.centerLeft,
            child: TextField(
              maxLines: 1,
              decoration: InputDecoration(
                hintText: Constants.REMARK,
                //border: OutlineInputBorder(borderSide: BorderSide.none),
                hintStyle: TextStyle(
                    color: Colors.grey[350],
                    fontSize: ScreenUtil().setSp(26.0)),
                hasFloatingPlaceholder: false,
                enabledBorder: UnderlineInputBorder(
                    borderSide: BorderSide(
                        color: Colors.transparent,
                        width: ScreenUtil().setHeight(1.0))),
                focusedBorder: UnderlineInputBorder(
                    borderSide: BorderSide(
                        color: Colors.transparent,
                        width: ScreenUtil().setHeight(1.0))),
              ),
              style: TextStyle(
                  color: Colors.black54,
                  fontSize: ScreenUtil().setSp(26.0)),
              controller: _controller,
            ),
          ))
        ],
      ),
    );
  }


  Widget _addressWidget() {
    return Container(
      height: ScreenUtil().setHeight(120.0),
      margin: EdgeInsets.all(ScreenUtil().setWidth(10.0)),
      padding: EdgeInsets.only(
          left: ScreenUtil().setWidth(20.0),
          right: ScreenUtil().setWidth(20.0)),
      child: 
           InkWell(
              onTap: () {
                // NavigatorUtils.goAddress(context).then((value) {
                //   print(value.toString());
                //   Map<String, dynamic> srcJson = new Map();
                //   srcJson = FluroConvertUtil.stringToMap(value);
                //   setState(() {
                //     _fillInOrderEntity.checkedAddress =
                //         CheckedAddress.fromJson(srcJson);
                //   });
                // });
              },
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: <Widget>[
                          Text(
                            checkedAddress.conName,
                            style: TextStyle(
                                color: Colors.black54,
                                fontSize: ScreenUtil().setSp(28.0)),
                          ),
                          Padding(
                            padding: EdgeInsets.only(
                                left: ScreenUtil().setHeight(20.0)),
                          ),
                          Text(
                            checkedAddress.conPhone,
                            style: TextStyle(
                                color: Colors.black54,
                                fontSize: ScreenUtil().setSp(26.0)),
                          ),
                        ],
                      ),
                      Padding(
                        padding: EdgeInsets.only(
                            top: ScreenUtil().setHeight(10.0)),
                      ),
                      Text(
                        checkedAddress.province +
                          checkedAddress.city +
                          checkedAddress.town +
                          checkedAddress.street+
                          checkedAddress.detailInfo,
                        style: TextStyle(
                            color: Colors.black54,
                            fontSize: ScreenUtil().setSp(26.0)),
                      ),
                    ],
                  ),
                  Expanded(
                      child: Container(
                    alignment: Alignment.centerRight,
                    child: Icon(
                      Icons.arrow_forward_ios,
                      color: Colors.grey,
                    ),
                  ))
                ],
              ),
            )
          // : InkWell(
          //     onTap: () {
          //       NavigatorUtils.goAddress(context);
          //     },
          //     child: Row(
          //       crossAxisAlignment: CrossAxisAlignment.center,
          //       children: <Widget>[
          //         Text(
          //           Strings.PLEASE_SELECT_ADDRESS,
          //           style: TextStyle(
          //               color: Colors.grey,
          //               fontSize: ScreenUtil.instance.setSp(30.0)),
          //         ),
          //         Expanded(
          //             child: Container(
          //           alignment: Alignment.centerRight,
          //           child: Icon(
          //             Icons.arrow_forward_ios,
          //             color: Colors.grey,
          //           ),
          //         ))
          //       ],
          //     ),
          //   ),
    );
  }

  _submitOrder() async {//提交订单
    Map<String,dynamic> address_to_commit=convert.jsonDecode(convert.jsonEncode(checkedAddress));
    SharedPreferencesUtils.getUSER().then((user)  {
      UserEntity userinfo=user;
      List<Cart> carts=userinfo.carts;
      address_to_commit["u_id"]=userinfo.u_id;
      Map<String,dynamic> ordinfo={};
      ordinfo["comment"]=_controller.text;
      ordinfo["tot_cost"]=_tot_cost;
      List<Map<String,dynamic>> orditems=[];
      for(int i=0;i<listdatas.length;i++){
        Map<String,dynamic> item={};
        item["b_id"]=listdatas[i].bId;
        item["book_num"]=listdatas[i].bookNum;
        item["rest_num"]=listdatas[i].storeNum-listdatas[i].bookNum;
        for(int j=0;j<carts.length;j++){      //更新购物车
          if(carts[j].b_id==listdatas[i].bId){
            carts.removeAt(j);
            break;
          }
        }
        orditems.add(item);
      }
      userinfo.carts=carts;
      Map<String,dynamic> params={};
      params["address"]=address_to_commit;
      params["ordinfo"]=ordinfo;
      params["orditems"]=orditems;
      cartService.commitOrder(params,(success) async {
        _showToast("购买成功！");
        
        SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
        SharedPreferencesUtils.user =userinfo;
        String userjson=convert.jsonEncode(userinfo);
        await sharedPreferences.setString("user", userjson);
        eventBus.fire(RefreshEvent());
        NavigatorUtils.submitOrderSuccessPop(context);
      },onFail: (e){
        _showToast("下单失败");
        print("下单失败: $e");
      });
    });
  }
}
