import React from 'react';
import {Layout, List, Card, Row, message, PageHeader, Col, Button, InputNumber, Modal, Popconfirm,} from "antd";
import {add_to_Cart, getBook} from "../services/BookService";
import {PlusOutlined,MinusOutlined } from '@ant-design/icons';
import Sidebars from "../Component/Sidebars";
import "../css/Cart.css"
import * as BookSER from "../services/BookService";
import * as OrderSER from "../services/OrderService";
const { Sider, Footer, Content } = Layout;
const { Meta } = Card;

const address={
    con_name:"maidang",
    con_phone:"10086",
    province:"Hubei",
    city:"Jingzhou",
    town:"Shashi",
    street:"BeijingRoad",
    detail_info:"1-1-1"
}

class CartPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            collapsed:false,
            user:{},
            visible: false,
            confirmLoading: false,
            booksinfo:[],
            listdatas:[],
            tot_cost:0
        }
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        //提交订单
        let booksinfo=this.state.booksinfo;
        let u=localStorage.getItem("user");
        let user=JSON.parse(u);
        let cart=user.carts;
        let newaddress=address;
        newaddress["u_id"]=user.u_id;
        let orderinfo={
            u_id:user.u_id,
            tot_cost:this.state.tot_cost,
            comment:"无" //时间戳后台获得
        };
        let orderitems=[];
        for(let i=0;i<cart.length;i++){
            let book_num=cart[i].book_num;
            let b_id=cart[i].b_id;
            let index=booksinfo.findIndex(b=>b.b_id===b_id);
            let rest_num=booksinfo[index].store_num-book_num;
            debugger;
            if(rest_num<0){
                message.error("请检查库存后再下订单")
                return;
            }
            orderitems.push({
                b_id:b_id,book_num:book_num,rest_num:rest_num
            });
        }
        let data={
            address:newaddress,
            ordinfo:orderinfo,
            orditems:orderitems
        };
    debugger;
        const callback=(data)=>{
            if(data.status){
                message.error("订单提交失败");
            }
            else{
                message.success("订单提交成功");
                debugger;
                user.carts=[];
                localStorage.setItem("user",JSON.stringify(user));
                // this.setState({cart:cart});
                this.listbooks([]);
                // OrderSER.addtoCart(cart,callback);
            }
        }
        OrderSER.buy(data,callback);



        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 1000);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };
    componentDidMount() {
        let u=localStorage.getItem("user");
        let user=JSON.parse(u);
        let cart=user.carts;
        debugger;
        this.setState({user:user,cart:cart});

        let b_ids=[];
        for(let i=0;i<cart.length;i++){
            b_ids.push({b_id:cart[i].b_id});
        }

        const callback=(data)=>{
            if(data.status){
                message.error("获取书籍信息失败");
            }
            else{
                this.setState({booksinfo:data});
                this.listbooks(cart);
            }
        };

        if(b_ids.length){
            let json={b_ids:b_ids};
            BookSER.getBooksByIds(json,callback);
        }
        // this.listbooks(cart);
    }

    listbooks=(cart)=>{
        let booksinfo=this.state.booksinfo;
        if(!cart.length ||!booksinfo.length){
            this.setState({listdatas:[]});
            return;
        }
        let result=[];
        let tot_price=0;
        for(let i=0;i<cart.length;i++){
            let book_num=cart[i].book_num;
            let b_id=cart[i].b_id;
            let index=booksinfo.findIndex(b=>b.b_id===b_id);
            if(index<0){
                return;
                // const callback=(data)=>{
                //     if(data.status){
                //         message.error("get book info failed")
                //     }
                //     else{
                //         booksinfo.add(data);
                //         this.setState({booksinfo:booksinfo});
                //     }
                // }
            }
            else{
                let aitem={
                    b_id:b_id,
                    img_src:booksinfo[index].img_src,
                    b_title:booksinfo[index].b_title,
                    author:booksinfo[index].author,
                    price:(booksinfo[index].price*book_num).toFixed(2),
                    description:booksinfo[index].description,
                    book_num:book_num,
                    index:index
                };
                result.push(aitem);
                tot_price+=book_num*booksinfo[index].price;
            }
        }
        this.setState({listdatas:result,tot_cost:tot_price});
    };
    onMinus=(b_id)=>{
        console.log("remove ++");
        debugger;
        let u=localStorage.getItem("user");
        let user=JSON.parse(u);
        let cart=user.carts;
        let index=cart.findIndex(it=>it.b_id===b_id);
        let book_num=cart[index].book_num-1;

        if(book_num==0){
            message.error("can't minus more");
            return;
        }
        cart[index].book_num=book_num;
        user.carts=cart;
        localStorage.setItem("user",JSON.stringify(user));
        // this.setState({cart:cart});
        this.listbooks(cart);
    };
    onAdd=(b_id)=>{
        let u=localStorage.getItem("user");
        let user=JSON.parse(u);
        let cart=user.carts;
        let index=cart.findIndex(it=>it.b_id===b_id);
        let book_num=cart[index].book_num+1;
        cart[index].book_num=book_num;
        user.carts=cart;
        localStorage.setItem("user",JSON.stringify(user));
        // this.setState({cart:cart});
        this.listbooks(cart);
    };
    onChange=(b_id,num)=>{
        let u=localStorage.getItem("user");
        let user=JSON.parse(u);
        let cart=user.carts;
        let index=cart.findIndex(it=>it.b_id===b_id);
        let book_num=num;
        cart[index].book_num=book_num;
        user.carts=cart;
        localStorage.setItem("user",JSON.stringify(user));
        // this.setState({cart:cart});
        this.listbooks(cart);
    };
    onRemove=(b_id)=>{
        let u=localStorage.getItem("user");
        let user=JSON.parse(u);
        let cart=user.carts;
        let index=cart.findIndex(it=>it.b_id===b_id);
        cart.splice(index,1);
        user.carts=cart;
        localStorage.setItem("user",JSON.stringify(user));
        // this.setState({cart:cart});
        this.listbooks(cart);
    }
    onSubmit=()=>{
        let u=localStorage.getItem("user");
        let user=JSON.parse(u);
        let cart=user.carts;
        if(cart.length){
            this.showModal();
        }
        else{
            message.error("请添加书籍后再下订单！")
        }
    }
    onSave=()=>{
        let u=localStorage.getItem("user");
        let user=JSON.parse(u);
        let cart=user.carts;
        const callback=(data)=>{
            if(data.status){
                message.error("保存失败");
            }
            else{
                message.success("保存成功，已经保存到数据库中！");
            }
        }
        OrderSER.addtoCart(cart,callback);
    }

    render() {
        return (
            <Layout className="layout">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <Sidebars
                        collapsed={this.state.collapsed}
                        toggle={this.toggle}
                        index={'4'}
                    />
                </Sider>
                <Content  style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 780,
                }}>
                    <PageHeader
                        className="site-page-header"
                        onBack={() => window.history.back()}
                        title={"您的购物车"}
                        subTitle="读书破万卷，下笔如有神~"
                    />
                    <Row justify="center">
                        <Col span={18}>
                            <List
                                itemLayout="vertical"
                                size="large"
                                dataSource={this.state.listdatas}
                                renderItem={item => (
                                    <List.Item
                                        key={item.b_id}
                                        extra={
                                            <img
                                                width={340}
                                                height={270}
                                                alt="logo"
                                                src={item.img_src}
                                            />
                                        }
                                    >
                                        <List.Item.Meta
                                            title={<a href={"/bookdetail/"+item.b_id}>{item.b_title}</a>}
                                            description={<p>
                                                <b>{item.author}</b><br/>
                                                {item.description}<br/>
                                                <b>Price: </b>{" "+item.price}
                                            </p> }

                                        />
                                        <br/><br/>
                                        <div className="MenuCartcontrol">
                                            <Button type="primary" shape="circle"  size="middle" icon={<MinusOutlined/>} onClick={()=>{this.onMinus(item.b_id)}}/>
                                            <InputNumber min={1} max={this.state.booksinfo[item.index].store_num} onChange={value => {this.onChange(item.b_id,value)}} value={item.book_num}/>
                                            <Button type="primary" shape="circle"  size="middle" icon={<PlusOutlined/>} onClick={()=>this.onAdd(item.b_id)}/>
                                        </div>
                                        <br/><br/>
                                        <div className="MenuCartcontrol">
                                            <Button type="primary" shape="round"  size="middle" onClick={()=>this.onRemove(item.b_id)}>移除</Button>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row><br/><br/>
                    <Row>
                        <Col offset={14}>
                            <div className="MenuCartcontrol">
                                <Button type="primary" shape="round"  size="middle" onClick={this.onSave}>保存购物车</Button>
                            </div>
                        </Col>
                        <Col offset={2}>
                            <div className="MenuCartcontrol">
                                <Popconfirm title="确认提交订单？" onConfirm={this.onSubmit} >
                                    <Button type="primary" shape="round"  size="middle" >提交订单</Button>
                                </Popconfirm>

                            </div>
                        </Col>
                    </Row>
                    <Modal
                        title="确认信息"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.handleCancel}
                    >
                        <Card bordered={true} title={"收件地址"}>
                            <p><b>联系人：</b> {address.con_name}</p>
                            <p><b>手机：</b> {address.con_phone}</p>
                            <p><b>省份：</b> {address.province}</p>
                            <p><b>城市：</b> {address.city}</p>
                            <p><b>城镇：</b> {address.town}</p>
                            <p><b>街道：</b> {address.street}</p>
                            <p><b>详细地址：</b> {address.detail_info}</p>
                        </Card>
                        <p style={{float:"right"}}>
                            <b style={{color:"red"}}>合计：</b>{this.state.tot_cost.toFixed(2)}
                        </p>
                    </Modal>
                    <Footer style={{ textAlign: 'center' }}>
                        ©e-Book<br/>云墨阁
                    </Footer>
                </Content>
            </Layout>
        );
    }
}
export default CartPage;
