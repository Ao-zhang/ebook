

import 'package:ebookflutter/event/login_event.dart';
import 'package:ebookflutter/pages/home/cart.dart';
import 'package:ebookflutter/pages/home/category.dart';
import 'package:ebookflutter/pages/home/home_page.dart';
import 'package:ebookflutter/pages/home/mine.dart';
import 'package:ebookflutter/util/navigator_util.dart';
import 'package:ebookflutter/util/shared_preferences_util.dart';
import 'package:flutter/material.dart';
import 'package:ebookflutter/constant/constants.dart';
class MallMainView extends StatefulWidget {
  @override
  _MallMainViewState createState() => _MallMainViewState();
}

class _MallMainViewState extends State<MallMainView> {
  int _selectedIndex = 0;
  bool _isLogin=false;
  String avatar;
  String u_name;
  static const TextStyle optionStyle =
      TextStyle(fontSize: 30, fontWeight: FontWeight.bold);
  List<Widget> _list = List();


  @override
  void initState() {
    SharedPreferencesUtils.getUSERID().then(
      (u_id)=>{
        if(u_id==0){
         NavigatorUtils.goLogin(this.context)
        }
      }
    );
    super.initState();
    _list
      ..add(HomePage())
      ..add(CategoryMenu())
      ..add(CartView())
      ..add(MineView());
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    if(context==null)
    print("context failed");
    return Scaffold(
        body: IndexedStack(
          index: _selectedIndex,
          children: _list,
        ),
        bottomNavigationBar: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              title: Text(Constants.HOME),
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.category),
              title: Text(Constants.CATEGORY),
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.shopping_cart),
              title: Text(Constants.SHOP_CAR),
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person),
              title: Text(Constants.MINE),
            ),
          ],
          key: UniqueKey(),
          currentIndex: _selectedIndex,
          selectedItemColor: Colors.deepOrangeAccent,
          unselectedItemColor: Colors.grey,
          onTap: _onItemTapped,
        ),
    );
  }
}
