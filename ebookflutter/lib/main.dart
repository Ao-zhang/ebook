import 'package:ebookflutter/pages/home/mall.dart';
import 'package:ebookflutter/router/application.dart';
import 'package:ebookflutter/router/routers.dart';
import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'model/user_info.dart';


void main() {
  // ignore: missing_required_param
  runApp(ChangeNotifierProvider(
    builder: (context) => UserInfoModel(),
    child: MyApp(),
    // create: (context) => UserInfoModel(),
  ));
  // runApp(MyApp());
}

class MyApp extends StatelessWidget {
  MyApp(){
    final router=Router();
    Routers.configureRoutes(router);
    Application.router=router;
  }
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    if(context==null)
    print("context failed");
    return MaterialApp(
      title: 'Ebook 云墨阁',
      // home: MallMainView(),
      onGenerateRoute: Application.router.generator,
   
      theme: ThemeData(
  
        primarySwatch: Colors.orange,
       
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
       home: MallMainView(),
      //home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
