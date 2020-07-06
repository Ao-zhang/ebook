import 'package:ebookflutter/event/cart_number_event.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

typedef OnNumberChange(int number);

class CartNumberView extends StatefulWidget {
  OnNumberChange onNumberChange;
  var _number;
  var if_bookdetail;

  CartNumberView(this._number, this.onNumberChange,{this.if_bookdetail});


  @override
  _CartNumberViewState createState() => _CartNumberViewState();
}

class _CartNumberViewState extends State<CartNumberView> {
  var goodsNumber;
  OnNumberChange onNumberChange;

  @override
  void initState() {
    super.initState();
    goodsNumber = widget._number;
    onNumberChange = widget.onNumberChange;
  }

  _listener() {
    cartNumberEventBus.on<CartNumberEvent>().listen((CartNumberEvent cartNumberEvent) {
      setState(() {
        goodsNumber = cartNumberEvent.number;
      });
    });
    if(!widget.if_bookdetail){//从book_detail界面用的时候，widget的number会延迟刷新，但是cart不会，但是cart还需要在cart自己数据刷新后更新数字（从详情界面添加书会改变数字大小）
      setState(() {
        goodsNumber = widget._number;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
   
    print("CartNumberView");
    _listener();
    //  goodsNumber = widget._number;
    return Container(
      width: ScreenUtil().setWidth(150),
      height: ScreenUtil().setWidth(50),
      child: Row(
        children: <Widget>[
          InkWell(
              onTap: () => _reduce(),
              child: Container(
                width: ScreenUtil().setWidth(50),
                height: double.infinity,
                alignment: Alignment.center,
                decoration: ShapeDecoration(
                    shape: Border(
                        left: BorderSide(color: Colors.grey, width: 1.0),
                        top: BorderSide(color: Colors.grey, width: 1.0),
                        right: BorderSide(color: Colors.grey, width: 1.0),
                        bottom: BorderSide(color: Colors.grey, width: 1.0))),
                child: Text(
                  "-",
                  style: TextStyle(
                      color: Colors.black54,
                      fontSize: ScreenUtil().setSp(26.0)),
                ),
              )),
          Container(
            alignment: Alignment.center,
            height: double.infinity,
            width: ScreenUtil().setWidth(50),
            decoration: ShapeDecoration(
                shape: Border(
                    top: BorderSide(color: Colors.grey, width: 1.0),
                    bottom: BorderSide(color: Colors.grey, width: 1.0))),
            child: Text(
              "${goodsNumber}",
              style: TextStyle(
                  color: Colors.black54,
                  fontSize: ScreenUtil().setSp(26.0)),
            ),
          ),
          InkWell(
              onTap: () => _add(),
              child: Container(
                alignment: Alignment.center,
                width: ScreenUtil().setWidth(50),
                height: double.infinity,
                decoration: ShapeDecoration(
                    shape: Border(
                        left: BorderSide(color: Colors.grey, width: 1.0),
                        top: BorderSide(color: Colors.grey, width: 1.0),
                        right: BorderSide(color: Colors.grey, width: 1.0),
                        bottom: BorderSide(color: Colors.grey, width: 1.0))),
                child: Text(
                  "+",
                  style: TextStyle(
                      color: Colors.black54,
                      fontSize: ScreenUtil().setSp(26.0)),
                ),
              )),
        ],
      ),
    );
  }

  _reduce() {
    if (goodsNumber > 1) {
      setState(() {
        goodsNumber = goodsNumber - 1;
      });
    }
    print("${widget._number}");
    onNumberChange(goodsNumber);
  }

  _add() {
    setState(() {
      goodsNumber = goodsNumber + 1;
    });
    print("${goodsNumber}");
    onNumberChange(goodsNumber);
  }
}
