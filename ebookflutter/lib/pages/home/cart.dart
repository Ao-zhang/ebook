import 'package:common_utils/common_utils.dart';
import 'package:ebookflutter/constant/constants.dart';
import 'package:ebookflutter/entity/book_entity.dart';
import 'package:ebookflutter/entity/cart_list_entity.dart';
import 'package:ebookflutter/entity/cartlistitem_entity.dart';
import 'package:ebookflutter/entity/user_entity.dart';
import 'package:ebookflutter/event/login_event.dart';
import 'package:ebookflutter/event/order_commit_Event.dart';
import 'package:ebookflutter/event/refresh_event.dart';
import 'package:ebookflutter/service/cart_service.dart';
import 'package:ebookflutter/util/navigator_util.dart';
import 'package:ebookflutter/util/shared_preferences_util.dart';
import 'package:ebookflutter/widgets/cached_image.dart';
import 'package:ebookflutter/widgets/cart_number.dart';
import 'package:flutter/material.dart';
import 'dart:convert' as convert;
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CartView extends StatefulWidget {
  @override
  _CartViewState createState() => _CartViewState();
}

class _CartViewState extends State<CartView>with WidgetsBindingObserver {
  AppLifecycleState _lastLifecycleState;

  CartService cartService=CartService();
  List<Cart> cartList=[];
  List<BookEntity> booksinfo=[];
  List<Cartlistitem> listdatas=[];
  // CartListEntity cartListEntity;
  bool isLogin = false;
  bool isAllCheck = true;
  double tot_cost = 0.0;
  UserEntity userinfo;
  int u_id=0;
  bool if_build=false;

  @override
  void deactivate() {
    // TODO: implement deactivate
    super.deactivate();
    print('deactivate');
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    print('state changed :$state');
    if(state==AppLifecycleState.inactive){//后台运行的时候保存购物车的数据到数据库之中
      _saveCart();
    }
  }

  @override
  void initState() {
    super.initState();
     //_getListdatas();
    WidgetsBinding.instance.addObserver(this);
  }

  _getListdatas(){
     SharedPreferencesUtils.getUSER().then((user) async{
      if (user == null &&mounted) {
        setState(() {
          isLogin = false;
          listdatas=[];
          cartList=[];
          booksinfo=[];
        });
      } else if(mounted){
        
        this.setState(() {
          isLogin=true;
          userinfo=user;
          u_id=user.u_id;
          cartList=user.carts;
        });

        var cartlistdata=user.carts;
        if(cartlistdata!=null && cartlistdata.length>0){
        List<Map<String,dynamic>> b_ids=[];
        // bool flag=false;//判断是否加入了新书
        for(int i=0;i<cartList.length;i++){
          Map<String,dynamic> item={"b_id":cartList[i].b_id};
          // if(!flag&&listdatas.contains((element)=>{element.b_id==cartList[i].b_id})){
          //   flag=true;
          // }
          b_ids.add(item);
        }
        // if(flag=true)
        cartService.getbooksinfo(b_ids, ( datas  ) {
          this.setState(() {booksinfo=datas;});
          this._listdata(cartlistdata);
        },(onFail) {
          print(onFail);
          _showToast(onFail);
        });
      }

      }
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

  _listdata(cart){
    if(booksinfo.length==0 || cart.length==0){
        this.setState(() {listdatas=[];});
        return;
    }
    List<Cartlistitem> result=[];
    double tot_price=0;
    for(int i=0;i<cart.length;i++){
      int book_num=cart[i].book_num;
      int b_id=cart[i].b_id;
      int index=-1;
      for(int i=0;i<cart.length;i++){
        if(cart[i].b_id==b_id){
          index=i;
          break;
        }
      }
      if(index<0){
        return;
      }
      else{
        Cartlistitem item=Cartlistitem();
        item.bId=b_id;
        item.imgSrc= booksinfo[index].img_src;
        item.bTitle= booksinfo[index].b_title;
        item.author= booksinfo[index].author;
        item.totPrice=  NumUtil.getNumByValueDouble(booksinfo[index].price*book_num, 2);
        item.price=  booksinfo[index].price;
        item.description=  booksinfo[index].description;
        item.bookNum=  book_num;
        item.storeNum=  booksinfo[index].store_num;
        item.index=  index;
        item.checked=  true;
        result.add(item);
        tot_price+=book_num*booksinfo[index].price;
      }
    }
    this.setState(() {listdatas=result;tot_cost=NumUtil.getNumByValueDouble(tot_price, 2);});
    //return result;
  }

  _refreshEvent() {
    if(!if_build && mounted){//第一次
        this._getListdatas();
        this.setState(() {
          if_build=true;
        });
    }

    eventBus
        .on<RefreshEvent>()
        .listen((RefreshEvent refreshEvent) => _getListdatas());
    loginEventBus.on<LoginEvent>().listen((LoginEvent loginEvent) {
        if (loginEvent.isLogin && mounted) {
          setState(() {
            isLogin = true;
            cartList=loginEvent.user.carts;
            userinfo=loginEvent.user;
            u_id=loginEvent.user.u_id;
          });
          _getListdatas();
        } else if(mounted) {
          setState(() {
            isLogin = false;
          });
        }
      });
     
  }

  


  @override
  Widget build(BuildContext context) {
    _refreshEvent();
    // print("is login?");
    // print(isLogin);
    // print(listdatas);
    // print(booksinfo.length);
    // print(cartList.length);
    // print(listdatas.length);
    // List<Cartlistitem> listdatas;
    if(isLogin&&booksinfo.length>0 && cartList.length>0 &&listdatas.length==0){
      listdatas=this._listdata(cartList);
    }
    // print(listdatas.length);
    // else listdatas=listitems;
    return Scaffold(
        appBar: AppBar(
          title: Text(Constants.CART),
          centerTitle: true,
        ),
        body:  isLogin ?
        Container(
                child: listdatas!=null &&listdatas.length != 0
                    ? Stack(
                        alignment: Alignment.bottomCenter,
                        children: <Widget>[
                          ListView.builder(
                              itemCount: listdatas.length,
                              itemBuilder: (BuildContext context, int index) {
                                print("_getCartItemView itemBuilder");
                                return _getCartItemView(index);
                              }),
                          Container(
                            height: ScreenUtil().setHeight(120.0),
                            decoration: ShapeDecoration(
                                shape: Border(
                                    top: BorderSide(
                                        color: Colors.grey, width: 1.0))),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: <Widget>[
                                Checkbox(
                                    value: isAllCheck,
                                    activeColor: Colors.deepOrangeAccent,
                                    onChanged: (bool) {
                                      _setCartItemCheck(bool);
                                    }),
                                Container(
                                  width:
                                      ScreenUtil().setWidth(200.0),
                                  child: Text(Constants.TOTAL_MONEY +
                                      "$tot_cost"),
                                ),
                                Expanded(
                                    child: Container(
                                  margin: EdgeInsets.only(
                                      right: ScreenUtil()
                                          .setWidth(30.0)),
                                  alignment: Alignment.centerRight,
                                  child: RaisedButton(
                                    onPressed: () {
                                      _fillInOrder();
                                    },
                                    color: Colors.deepOrangeAccent,
                                    child: Text(
                                      Constants.SETTLEMENT,
                                      style: TextStyle(
                                          color: Colors.white,
                                          fontSize: ScreenUtil()
                                              .setSp(26.0)),
                                    ),
                                  ),
                                ))
                              ],
                            ),
                          )
                        ],
                      )
                    : Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            Image.asset(
                              "images/no_data.png",
                              height: 80,
                              width: 80,
                            ),
                            Padding(
                              padding: EdgeInsets.only(top: 10.0),
                            ),
                            Text(
                              Constants.NO_DATA_TEXT,
                              style: TextStyle(
                                  fontSize: 16.0,
                                  color: Colors.deepOrangeAccent),
                            )
                          ],
                        ),
                      ),
              ):Container(
                child: Center(
                  child: RaisedButton(
                    color: Colors.deepOrangeAccent,
                    onPressed: () {
                      NavigatorUtils.goLogin(context);
                    },
                    child: Text(
                      Constants.LOGIN,
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: ScreenUtil().setSp(30.0)),
                    ),
                  ),
                ),
              )
    );
  }

  _fillInOrder() {
    List<Cartlistitem> checked_orders=[];
    bool if_overstore_num=false;
    for(int i=0;i<listdatas.length;i++){
      if(listdatas[i].checked){
        checked_orders.add(listdatas[i]);
        if(listdatas[i].bookNum>listdatas[i].storeNum){
          if_overstore_num=true;
        }
      }
    }
    if(checked_orders.length>0){
      if(if_overstore_num){
        _showToast("商品数量超过库存了！请调整后再购买！");
        return;
      }
      SharedPreferencesUtils.ordertocommit=checked_orders;
      // orderCommitEventBus.fire(OrderCommitEvent(checked_orders));
      NavigatorUtils.goFillInOrder(context);
    }
    else{
      _showToast("请选择至少一件商品！");
    }
    
  }

   Widget _getCartItemView(int index) {
    print("_getCartItemView${index}");

    return Container(
      height: ScreenUtil().setHeight(180.0),
      width: double.infinity,
      child: InkWell(
        //长按删除
        onLongPress: () => _deleteDialog(index),
        child: Card(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Checkbox(
                  value: listdatas[index].checked ?? true,
                  activeColor: Colors.deepOrangeAccent,
                  onChanged: (bool) {
                    _checkCart(index, bool);
                  }),
              CachedImageView(
                  ScreenUtil().setWidth(140.0),
                  ScreenUtil().setWidth(140.0),
                  listdatas[index].imgSrc),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text(
                    listdatas[index].bTitle,
                    style: TextStyle(
                        fontSize: ScreenUtil().setSp(24.0),
                        color: Colors.black54),
                  ),
                  Padding(
                      padding: EdgeInsets.only(
                          top: ScreenUtil().setHeight(10.0))),
                  Text(
                    "¥${listdatas[index].price}",
                    style: TextStyle(
                        fontSize: ScreenUtil().setSp(24.0),
                        color: Colors.grey),
                  )
                ],
              ),
              Expanded(
                  child: Container(
                    padding: EdgeInsets.only(right: ScreenUtil().setWidth(20.0)),
                alignment: Alignment.centerRight,
                child: CartNumberView(listdatas[index].bookNum, (value) {
                  _updateCart(index, value);//更新book_num
                },if_bookdetail: false,),
              ))
            ],
          ),
        ),
      ),
    );
  }

  _updateCart(int index, int number) async {
    var cart=cartList;
    var listdata=listdatas;
    var user=userinfo;
    double tot_cost_t=tot_cost-listdata[index].totPrice;
    cart[index].book_num=number;
    listdata[index].bookNum=number;
    listdata[index].totPrice=NumUtil.getNumByValueDouble(listdata[index].bookNum*listdata[index].price,2) ;
    tot_cost_t+=listdata[index].totPrice;
    user.carts=cart;
    if(mounted)
    this.setState(() {
      cartList=cart;
      listdatas=listdata;
      userinfo=user;
      tot_cost=NumUtil.getNumByValueDouble(tot_cost_t,2);
    });
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    SharedPreferencesUtils.user =user;
    String userjson=convert.jsonEncode(user);
    await sharedPreferences.setString("user", userjson);
  }

  _checkCart(int index, bool isCheck) {
    var new_listdatas=listdatas;
    new_listdatas[index].checked=isCheck;
    setState(() {
      listdatas=new_listdatas;
      isAllCheck = _checkedAll();
    });
   // listdatas[index].checked=isCheck;
  }

  _deleteDialog(int index) {
    return showDialog<void>(
        context: context,
        barrierDismissible: true,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text(Constants.TIPS),
            content: Text(Constants.DELETE_CART_ITEM_TIPS),
            actions: <Widget>[
              FlatButton(
                onPressed: () {
                  Navigator.pop(context);
                },
                child: Text(
                  Constants.CANCEL,
                  style: TextStyle(color: Colors.black54),
                ),
              ),
              FlatButton(
                onPressed: () {
                  _deleteGoods(index);
                },
                child: Text(
                  Constants.CONFIRM,
                  style: TextStyle(color: Colors.deepOrangeAccent),
                ),
              )
            ],
          );
        });
  }

  _deleteGoods(int index) async {
      var cart=cartList;
    var listdata=listdatas;
    var user=userinfo;
    cart.removeAt(index);
    listdata.removeAt(index);
    // listdata[index].bookNum=number;
    user.carts=cart;
    this.setState(() {
      cartList=cart;
      listdatas=listdata;
      userinfo=user;
    });
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    SharedPreferencesUtils.user =user;
    String userjson=convert.jsonEncode(user);
    await sharedPreferences.setString("user", userjson);
    Navigator.pop(context);//关闭dialog
  }

    bool _checkedAll() {
    for (int i = 0; i < listdatas.length; i++) {
      if (listdatas[i].checked == null || !listdatas[i].checked) {
        return false;
      }
    }
    return true;
  }

   _setCartItemCheck(bool checked) {
    setState(() {
      isAllCheck = checked;
      for (int i = 0; i < listdatas.length; i++) {
        listdatas[i].checked = checked;
      }
    });
  }
    _getTotalAmount() {
    double amount = 0;
    // for (int i = 0; i < _cartList.length; i++) {
    //   if (_cartList[i].checked) {
    //     amount += (_cartList[i].price * _cartList[i].number);
    //   }
    // }
    return amount;
  }

  _saveCart(){
    if(isLogin){
       Map<String,dynamic> params={};
      params["u_id"]=userinfo.u_id;
      var acart=convert.jsonDecode(convert.jsonEncode(cartList));
      params["cart"]= acart;
      cartService.addCart(params, (onSuccess) => {print(onSuccess)},onFail: (message) => {print(message)},);
    }
   
  }

}

