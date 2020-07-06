import 'package:ebookflutter/entity/book_entity.dart';
import 'package:ebookflutter/util/navigator_util.dart';
import 'package:ebookflutter/widgets/cached_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class BooksView extends StatelessWidget {
  List<BookEntity> bookList;

  BooksView(this.bookList);

  @override
  Widget build(BuildContext context) {
    if(this.bookList==null)
    return Container(
      padding: EdgeInsets.all(5.0),
      child: Text("books is loading"),
    );
    else return Container(
      padding: EdgeInsets.all(5.0),
      child: GridView.builder(
          shrinkWrap: true,
          itemCount: this.bookList.length,
          physics: NeverScrollableScrollPhysics(),
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2, childAspectRatio: 0.90),
          itemBuilder: (BuildContext context, int index) {
            return _getGridViewItem(context,bookList[index]);
          }),
    );
  }

  _goGoodsDetail(BuildContext context, BookEntity book) {
    NavigatorUtils.goBookDetails(context, book.b_id);
  }

  Widget _getGridViewItem(BuildContext context, BookEntity book) {
    return Container(
      child: InkWell(
        onTap: () => _goGoodsDetail(context, book),
        child: Card(
          elevation: 2.0,
          margin: EdgeInsets.all(6.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
              Container(
                  margin: EdgeInsets.all(5.0),
                  child: CachedImageView(
                      ScreenUtil().setHeight(200.0),
                      ScreenUtil().setHeight(200.0),
                      book.img_src)),
              Padding(
                padding: EdgeInsets.only(top: 4.0),
              ),
              Container(
                padding: EdgeInsets.only(left: 4.0, top: 4.0),
                alignment: Alignment.centerLeft,
                child: Text(
                  book.b_title,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(color: Colors.black54, fontSize: 14.0),
                ),
              ),
              Padding(
                padding: EdgeInsets.only(top: 4.0),
              ),
              Container(
                padding: EdgeInsets.only(left: 4.0, top: 4.0),
                alignment: Alignment.center,
                child: Text(
                  "￥${book.price}",
                  style: TextStyle(color: Colors.red, fontSize: 12.0),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
