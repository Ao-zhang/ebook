import React from 'react';
import {List, Card, message} from 'antd';
import {Link} from 'react-router-dom'
import {PlusCircleFilled,HeartFilled} from '@ant-design/icons';
const { Meta } = Card;


export class Books extends React.Component{
    constructor(props) {
        super(props);

    }
    onAddtoCart=(b_id)=>{
        let u=localStorage.getItem("user");
        let user=JSON.parse(u);
        let cart=user.carts;
        debugger;
        let index=cart.findIndex(it=>it.b_id===b_id);
        let book_num=1;
        if(index>=0){
            book_num+=cart[index].book_num;
            cart[index].book_num=book_num;
        }
        else{
            cart.push({u_id:user.u_id,b_id:b_id,book_num:book_num});
        }

        user.carts=cart;
        localStorage.setItem("user",JSON.stringify(user));
        message.success("添加成功！");
    }

    render() {
        return (
            <div className={'Bookslist'}>
                <List grid={{ gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 5,
                    xxl: 5,}}
                      // header={<h4 className={'bookhead'}>精选书目</h4>}
                      dataSource={this.props.booksinfo}
                      renderItem={item => (
                          <List.Item
                              actions={[
                              <HeartFilled key="liked" title="like"/>,
                              <PlusCircleFilled
                                  key="add_to_cart" title="add to cart" onClick={()=>{
                                      if(item.store_num>0)
                                      this.onAddtoCart(item.b_id);
                                      else message.info("已售罄！");
                                  }
                                  }/>
                          ]}>
                              <Link to={{
                                  pathname:'/bookdetail/'+item.b_id,
                                  // bookinfo:item,
                              }}>
                                  {/*<Link to={'/bookdetail/:item.id'}>*/}
                                  <Card
                                      hoverable='true'
                                      bordered
                                      cover={<img alt="example" src={item.img_src} className={'bookImg'}/>}
                                      className={'BookCards'}

                                  >
                                      <Meta title={item.b_title} description={'¥'+item.price} /></Card>
                              </Link>
                          </List.Item>
                      )}
                />
            </div>
        );
    }

}
