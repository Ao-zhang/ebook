import 'package:ebookflutter/constant/constants.dart';
import 'package:ebookflutter/entity/book_entity.dart';
import 'package:ebookflutter/entity/cart_list_entity.dart';
import 'package:ebookflutter/event/refresh_event.dart';
import 'package:ebookflutter/service/cart_service.dart';
import 'package:ebookflutter/service/home_service.dart';
import 'package:ebookflutter/util/navigator_util.dart';
import 'package:ebookflutter/util/shared_preferences_util.dart';
import 'package:ebookflutter/util/toast_util.dart';
import 'package:ebookflutter/widgets/cached_image.dart';
import 'package:ebookflutter/widgets/cart_number.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:dio/dio.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert' as convert;

class BookDetail extends StatefulWidget {
  int b_id;

  BookDetail({Key key, @required this.b_id}) : super(key: key);

  @override
  _BookDetailState createState() => _BookDetailState();
}

class _BookDetailState extends State<BookDetail> {
  int b_id;
  var _bulidfuture;
  BookEntity bookinfo;
  HomeService _bookService = HomeService();
  BookEntity _BookDetail;
  var parameters;
  int _specificationIndex=0;
  int _number=1;
  CartService cartService=CartService();

  var isCollected=false;

  @override
  void initState() {
    super.initState();
    b_id = widget.b_id;
    var params = {"b_id": b_id};
    print("BookDetail_initState");
    _bulidfuture=
        _bookService.getABookData(params, (successData) => {
          bookinfo=successData
      });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Scaffold(
        appBar: AppBar(
          title: Text(Constants.GOODS_DETAIL),
          centerTitle: true,
        ),
        body: FutureBuilder(
            future:_bulidfuture,
            builder: (BuildContext context, AsyncSnapshot asyncSnapshot) {
              switch (asyncSnapshot.connectionState) {
                case ConnectionState.none:
                case ConnectionState.waiting:
                  return Container(
                    child: Center(
                      child: SpinKitFoldingCube(
                        size: 40.0,
                        color: Colors.deepOrangeAccent,
                      ),
                    ),
                  );
                default:
                  if (asyncSnapshot.hasError)
                    return Container(
                      child: Center(
                        child: Text(
                          Constants.SERVER_EXCEPTION,
                          style: TextStyle(fontSize: 16.0),
                        ),
                      ),
                    );
                  else
                    return _detailView();
              }
            }),
        bottomNavigationBar: BottomAppBar(
          child: Container(
            height: 50.0,
            child: Row(
              children: <Widget>[
                Expanded(
                    flex: 1,
                    child: Container(
                      color: Colors.white,
                      child: InkWell(
                        onTap: () => _collection(),
                        child: Icon(
                          Icons.star_border,
                          color: isCollected
                              ? Colors.deepOrangeAccent
                              : Colors.grey,
                          size: 30.0,
                        ),
                      ),
                    )),
                Expanded(
                    flex: 1,
                    child: Container(
                      color: Colors.white,
                      child: InkWell(
                        child: Icon(
                          Icons.add_shopping_cart,
                          color: Colors.deepOrangeAccent,
                          size: 30.0,
                        ),
                      ),
                    )),
                Expanded(
                    flex: 2,
                    child: Container(
                      color: Colors.deepOrangeAccent,
                      child: InkWell(
                          onTap: () => openBottomSheet(
                              context, bookinfo, 1),
                          child: Center(
                            child: Text(
                              Constants.ADD_CART,
                              style: TextStyle(
                                  color: Colors.white, fontSize: 14.0),
                            ),
                          )),
                    )),
                Expanded(
                  flex: 2,
                  child: Container(
                      color: Colors.red,
                      child: InkWell(
                          onTap: () => openBottomSheet(
                              context, bookinfo, 2),
                          child: Center(
                            child: Text(
                              Constants.BUY,
                              style: TextStyle(
                                  color: Colors.white, fontSize: 14.0),
                            ),
                          ))),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  openBottomSheet(BuildContext context, BookEntity bookinfo, int showType) {
    showModalBottomSheet(
        context: context,
        builder: (BuildContext context) {
          return SizedBox(
            width: double.infinity,
            height: ScreenUtil().setHeight(630.0),
            child: Container(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Container(
                    margin: EdgeInsets.all(ScreenUtil().setWidth(20.0)),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: <Widget>[
                        CachedImageView(
                            ScreenUtil().setWidth(120.0),
                            ScreenUtil().setWidth(120.0),
                            bookinfo.img_src),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Text(
                              Constants.PRICE + "：" + "${bookinfo.price}",
                              style: TextStyle(
                                  color: Colors.black54,
                                  fontSize: ScreenUtil().setSp(24.0)),
                            ),
                            Padding(
                              padding: EdgeInsets.only(
                                  top: ScreenUtil().setHeight(10.0)),
                            ),
                            Text(Constants.ALREAD_SELECTED +
                                "：" +
                                (_specificationIndex==0?"":bookinfo.b_title))
                          ],
                        ),
                        Expanded(
                            child: Container(
                          alignment: Alignment.centerRight,
                          child: IconButton(
                            icon: Icon(Icons.delete),
                            onPressed: () {
                              Navigator.pop(context);
                            },
                          ),
                        )),
                      ],
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.all(ScreenUtil().setWidth(10.0)),
                    child: Text(
                      Constants.SPECIFICATIONS,
                      style: TextStyle(
                          color: Colors.black54,
                          fontSize: ScreenUtil().setSp(30.0)),
                    ),
                  ),
                  Wrap(
                      children:
                          _specificationsWidget(bookinfo.b_title)),
                  Padding(
                    padding: EdgeInsets.only(
                        top: ScreenUtil().setHeight(10.0)),
                  ),
                  Container(
                    margin: EdgeInsets.all(ScreenUtil().setWidth(10.0)),
                    child: Text(
                      Constants.NUMBER,
                      style: TextStyle(
                          color: Colors.black54,
                          fontSize: ScreenUtil().setSp(30.0)),
                    ),
                  ),
                  Container(
                      margin:
                          EdgeInsets.all(ScreenUtil().setWidth(10.0)),
                      height: ScreenUtil().setHeight(80),
                      alignment: Alignment.centerLeft,
                      child: CartNumberView(_number, (value){
                       _number=value;},if_bookdetail: true,
                       )),
                  Expanded(
                      child: Stack(
                    alignment: Alignment.bottomLeft,
                    children: <Widget>[
                      SizedBox(
                        height: ScreenUtil().setHeight(100.0),
                        width: double.infinity,
                        child: InkWell(
                            onTap: () => showType == 1 ? _addCart() : _buy(),
                            child: Container(
                              alignment: Alignment.center,
                              color: Colors.deepOrangeAccent,
                              child: Text(
                                showType == 1 ? Constants.ADD_CART : Constants.BUY,
                                style: TextStyle(
                                    color: Colors.white,
                                    fontSize: ScreenUtil().setSp(30.0)),
                              ),
                            )),
                      ),
                    ],
                  ))
                ],
              ),
            ),
          );
        });
  }

  List<Widget> _specificationsWidget(String specifications) {
    List<Widget> specificationsWidget = List();
      specificationsWidget.add(Container(
          padding: EdgeInsets.all(ScreenUtil().setWidth(10.0)),
          child: InkWell(
            child: Chip(
              label: Text(
                specifications,
                style: TextStyle(
                    color: 0 == _specificationIndex
                        ? Colors.white
                        : Colors.black54,
                    fontSize: ScreenUtil().setSp(24.0)),
              ),
              backgroundColor: 0 == _specificationIndex
                  ? Colors.deepOrangeAccent
                  : Colors.grey,
            ),
          )));
    
    return specificationsWidget;
  }

  _addCart() {
    SharedPreferencesUtils.getUSER().then((value) async {
      if (value !=null) {// 说明已经登录了
      Cart newitem=Cart(
        value.u_id,bookinfo.b_id,_number
      );
        List<Cart> cart=value.carts;
        int index=-1;
        for(int i=0;i<cart.length;i++){
          if(cart[i].b_id==newitem.b_id){
            newitem.book_num+=cart[i].book_num;
            index=i;
            break;
          }
        }
        if(index==-1){
          cart.add(newitem);
        }
        else{
          cart[index]=newitem;
        }
        value.carts=cart;
        SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
        SharedPreferencesUtils.user =value;
        String userjson=convert.jsonEncode(value);
        await sharedPreferences.setString("user", userjson);
        
          ToastUtil.showToast(Constants.ADD_CART_SUCCESS);
          Navigator.of(context).pop(); //隐藏弹出框
          eventBus.fire(RefreshEvent());
      
      } else {
        NavigatorUtils.goLogin(context);
      }
    });
  }

  _buy() {
  }

  _collection() {
  }

  _addOrDeleteCollect() {
  }

  Widget _detailView() {
    return Stack(
      alignment: AlignmentDirectional.bottomCenter,
      children: <Widget>[
        ListView(
          children: <Widget>[
            Container(
            height: ScreenUtil().setHeight(400.0),
            alignment: Alignment.center,
            child: Image.network(
              bookinfo.img_src,
              fit: BoxFit.fill,
              height: ScreenUtil().setHeight(400.0),
              ),
        ),
            Divider(
              height: 2.0,
              color: Colors.grey,
            ),
            Padding(
              padding: EdgeInsets.only(top: 10.0),
            ),
            Container(
              margin: EdgeInsets.only(left: 10.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    bookinfo.b_title,
                    style: TextStyle(
                        fontSize: 26.0,
                        color: Colors.black54,
                        fontWeight: FontWeight.bold),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 6.0),
                  ),
                  Text(
                   "作者："+bookinfo.author,
                    style: TextStyle(fontSize: 24.0, color: Colors.black,fontStyle: FontStyle.italic),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 4.0),
                  ),
                  Text(
                   "简介："+bookinfo.description,
                    style: TextStyle(fontSize: 16.0, color: Colors.grey),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 4.0),
                  ),
                  Container(
                    alignment: Alignment.centerRight,
                    child:Text(
                      "种类："+bookinfo.category,
                      style: TextStyle(
                        fontSize: 20.0, 
                        color: Colors.orange,
                        fontWeight: FontWeight.w500
                      ),
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 4.0),
                  ),
                  Container(
                    alignment: Alignment.centerRight,
                    child:Text(
                   "库存："+bookinfo.store_num.toString(),
                    style: TextStyle(fontSize: 15.0, color: Colors.purple),
                  ),
                  ),
                  // Text(
                  //  "库存："+bookinfo.store_num.toString(),
                  //   style: TextStyle(fontSize: 15.0, color: Colors.purple),
                  // ),
                  Padding(
                    padding: EdgeInsets.only(top: 4.0),
                  ),
                  Row(
                    children: <Widget>[
                      Text(
                        "原价：${bookinfo.price + 3}",
                        textAlign: TextAlign.right,
                        style: TextStyle(
                            color: Colors.grey,
                            fontSize: 17.0,
                            decoration: TextDecoration.lineThrough),
                      ),
                      Padding(
                        padding: EdgeInsets.only(left: 10.0),
                      ),
                      Text(
                        "现价：${bookinfo.price}",
                        textAlign: TextAlign.right,
                        style: TextStyle(
                            color: Colors.deepOrangeAccent, fontSize: 17.0),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            Padding(
              padding: EdgeInsets.only(top: 4.0),
            )
          ],
        ),
      ],
    );
  }
}
