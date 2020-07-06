import 'package:ebookflutter/constant/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:cached_network_image/cached_network_image.dart';


class CategoryMenu extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(Constants.CATEGORY),
          centerTitle: true,
        ),
        body:  Container(
               child: Text("..need to add"),
              ),
    );
  }
}
 